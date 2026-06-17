import { Resend } from "resend";
import type { SavedConcern } from "./types";

export type EmailAttachment = {
  filename: string;
  content: Buffer;
};

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(date);
}

function formatPhotos(concern: SavedConcern): string {
  const lines = [
    ...concern.photoLinks,
    ...concern.photoFilenames.map((name) => `${name} (attached to this email)`),
  ];
  return lines.length > 0 ? lines.join("\n") : "None provided";
}

export function buildSubject(concern: SavedConcern): string {
  return `New Repair Concern: ${concern.categoryTitle}`;
}

export function buildEmailText(concern: SavedConcern): string {
  return [
    "A new repair concern has been submitted through the Repairs Concern App.",
    "",
    "Concern Category:",
    concern.categoryTitle,
    "",
    "Resident Details:",
    `Name: ${concern.residentName || "Not provided"}`,
    `Email: ${concern.residentEmail || "Not provided"}`,
    `Phone: ${concern.residentPhone || "Not provided"}`,
    `Address: ${concern.address || "Not provided"}`,
    "",
    "Repair Details:",
    `Reference Number: ${concern.referenceNumber || "Not provided"}`,
    "Description:",
    concern.description || "Not provided",
    "",
    "Photos:",
    formatPhotos(concern),
    "",
    "Submitted:",
    formatSubmittedAt(concern.submittedAt),
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildEmailHtml(concern: SavedConcern): string {
  const text = buildEmailText(concern);
  return `<pre style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #0f172a;">${escapeHtml(
    text,
  )}</pre>`;
}

/**
 * Sends the repair concern notification email. Throws on failure so the caller
 * can log it without affecting the resident-facing success response.
 */
export async function sendConcernEmail(
  concern: SavedConcern,
  recipients: string[],
  attachments: EmailAttachment[] = [],
): Promise<{ id: string | null }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  const from =
    process.env.REPAIRS_FROM_EMAIL ??
    "Repairs Concern App <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: recipients,
    subject: buildSubject(concern),
    text: buildEmailText(concern),
    html: buildEmailHtml(concern),
    replyTo: concern.residentEmail || undefined,
    attachments: attachments.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
    })),
  });

  if (error) {
    throw new Error(`Resend failed to send email: ${error.message}`);
  }

  return { id: data?.id ?? null };
}
