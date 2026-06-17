import { NextResponse } from "next/server";
import { getCategoryBySlug } from "@/lib/categories";
import { saveConcern } from "@/lib/db";
import { sendConcernEmail, type EmailAttachment } from "@/lib/email";
import { getRecipientsForCategory } from "@/lib/routing";
import type { ConcernSubmission } from "@/lib/types";

export const runtime = "nodejs";

const RESIDENT_SUCCESS_MESSAGE =
  "Thank you. Your repair concern has been submitted and will be reviewed by the repairs team.";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024; // 20 MB total

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parsePhotoLinks(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((link) => link.trim())
    .filter((link) => link.length > 0);
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error("[concerns] Failed to parse form data", error);
    return NextResponse.json(
      { ok: false, message: "We could not read your submission. Please try again." },
      { status: 400 },
    );
  }

  const categorySlug = getString(formData, "category");
  const category = getCategoryBySlug(categorySlug);
  const residentName = getString(formData, "name");
  const description = getString(formData, "description");

  // Validation — these prevent a save, so the resident sees an error.
  if (!category || !residentName || !description) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Please choose a concern type and provide your name and a description.",
      },
      { status: 400 },
    );
  }

  // Collect uploaded photos as email attachments.
  const attachments: EmailAttachment[] = [];
  const photoFilenames: string[] = [];
  let totalBytes = 0;

  const files = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  for (const file of files) {
    photoFilenames.push(file.name);
    if (file.size > MAX_ATTACHMENT_BYTES) {
      console.warn(
        `[concerns] Skipping attachment "${file.name}" (${file.size} bytes) — exceeds per-file limit`,
      );
      continue;
    }
    if (totalBytes + file.size > MAX_TOTAL_ATTACHMENT_BYTES) {
      console.warn(
        `[concerns] Skipping attachment "${file.name}" — total attachment size limit reached`,
      );
      continue;
    }
    const content = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content });
    totalBytes += file.size;
  }

  const submission: ConcernSubmission = {
    categorySlug: category.slug,
    categoryTitle: category.title,
    residentName,
    residentEmail: getString(formData, "email"),
    residentPhone: getString(formData, "phone"),
    address: getString(formData, "address"),
    referenceNumber: getString(formData, "reference"),
    description,
    photoLinks: parsePhotoLinks(getString(formData, "photoLinks")),
    photoFilenames,
  };

  // Step 1: Save the submission. A failure here is fatal — show an error.
  let saved;
  try {
    saved = await saveConcern(submission);
    console.info(
      `[concerns] Saved submission ${saved.id} (category: ${saved.categoryTitle})`,
    );
  } catch (error) {
    console.error("[concerns] Failed to save submission", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Sorry, we could not submit your concern right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }

  // Step 2 & 3: Notify the relevant team. Email failure must NOT fail the
  // submission — log it and still report success to the resident.
  try {
    const recipients = getRecipientsForCategory(saved.categorySlug);
    const result = await sendConcernEmail(saved, recipients, attachments);
    console.info(
      `[concerns] Notification email sent for ${saved.id} to ${recipients.join(", ")} (email id: ${result.id ?? "unknown"})`,
    );
  } catch (error) {
    console.error(
      `[concerns] Submission ${saved.id} saved but notification email FAILED`,
      error,
    );
  }

  return NextResponse.json(
    { ok: true, message: RESIDENT_SUCCESS_MESSAGE, id: saved.id },
    { status: 201 },
  );
}
