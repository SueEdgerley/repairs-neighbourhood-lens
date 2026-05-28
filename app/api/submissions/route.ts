import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";
import { ISSUE_OPTIONS, type IssueType } from "@/lib/issues";

type SubmissionBody = {
  issueType?: string;
  address?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
};

const VALID_ISSUE_TYPES = new Set<string>(ISSUE_OPTIONS.map((option) => option.id));

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

  try {
    const submission = await saveSubmission({
      residentName: body.contactName,
      address,
      contactDetails: buildContactDetails(body),
      issueType,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your repair concern has been received.",
        submission: {
          id: submission.id,
          status: submission.status,
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
