import { NextResponse } from "next/server";
import { saveSubmission, type PhotoDetail } from "@/lib/db";
import { ISSUE_OPTIONS, type IssueType } from "@/lib/issues";

type SubmissionPhoto = {
  fileName?: string;
  mimeType?: string;
  sizeBytes?: number;
  dataBase64?: string;
};

type SubmissionBody = {
  issueType?: string;
  address?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  photos?: SubmissionPhoto[];
};

const VALID_ISSUE_TYPES = new Set<string>(ISSUE_OPTIONS.map((option) => option.id));
const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function isValidIssueType(value: string): value is IssueType {
  return VALID_ISSUE_TYPES.has(value);
}

function buildContactDetails(body: SubmissionBody): string | null {
  const parts: string[] = [];

  if (body.contactPhone?.trim()) {
    parts.push(`Phone: ${body.contactPhone.trim()}`);
  }

  if (body.contactEmail?.trim()) {
    parts.push(`Email: ${body.contactEmail.trim()}`);
  }

  return parts.length > 0 ? parts.join("\n") : null;
}

function normalizePhotos(photos: SubmissionPhoto[] | undefined): PhotoDetail[] | undefined {
  if (!photos || photos.length === 0) {
    return undefined;
  }

  if (photos.length > MAX_PHOTOS) {
    throw new Error(`You can upload up to ${MAX_PHOTOS} photos.`);
  }

  const normalized: PhotoDetail[] = [];

  for (const photo of photos) {
    const fileName = photo.fileName?.trim() ?? "";
    const mimeType = photo.mimeType?.trim() ?? "";
    const dataBase64 = photo.dataBase64?.trim() ?? "";
    const sizeBytes = photo.sizeBytes ?? 0;

    if (!fileName || !mimeType || !dataBase64) {
      throw new Error("One or more photos are missing required details.");
    }

    if (!mimeType.startsWith("image/")) {
      throw new Error("Only image files can be uploaded.");
    }

    if (sizeBytes > MAX_FILE_SIZE_BYTES) {
      throw new Error("Each photo must be 5 MB or smaller.");
    }

    normalized.push({
      fileName,
      mimeType,
      sizeBytes,
      dataBase64,
    });
  }

  return normalized;
}

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: SubmissionBody;

  try {
    body = (await request.json()) as SubmissionBody;
  } catch {
    return validationError("Request body must be valid JSON.");
  }

  const issueType = body.issueType?.trim() ?? "";
  const address = body.address?.trim() ?? "";
  const description = body.description?.trim() ?? "";

  if (!issueType) {
    return validationError("Please choose the type of repair concern.");
  }

  if (!isValidIssueType(issueType)) {
    return validationError("The repair concern type is not valid.");
  }

  if (!address) {
    return validationError("Please enter your address.");
  }

  if (!description) {
    return validationError("Please describe what is happening.");
  }

  let photoDetails: PhotoDetail[] | undefined;

  try {
    photoDetails = normalizePhotos(body.photos);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Photo details are not valid.";
    return validationError(message);
  }

  try {
    const submission = await saveSubmission({
      residentName: body.contactName,
      address,
      contactDetails: buildContactDetails(body),
      issueType,
      description,
      photoDetails,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your repair concern has been received.",
        submission: {
          id: submission.id,
          status: submission.status,
          photoCount: submission.photo_details?.length ?? 0,
          createdAt: submission.created_at,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save repair submission:", error);

    const message =
      error instanceof Error && error.message.includes("DATABASE_URL")
        ? "The repairs service is not configured yet. Please try again later."
        : "We could not save your report right now. Please try again in a few minutes.";

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
