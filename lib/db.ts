import { neon } from "@neondatabase/serverless";

export type PhotoDetail = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  dataBase64: string;
};

export type SubmissionRecord = {
  id: string;
  resident_name: string | null;
  address: string;
  contact_details: string | null;
  issue_type: string;
  description: string;
  photo_details: PhotoDetail[] | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type NewSubmission = {
  residentName?: string;
  address: string;
  contactDetails?: string | null;
  issueType: string;
  description: string;
  photoDetails?: PhotoDetail[];
};

let schemaReady: Promise<void> | null = null;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(databaseUrl);
}

export async function ensureSubmissionsTable() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();

      await sql`
        CREATE TABLE IF NOT EXISTS repairs_submissions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          resident_name TEXT,
          address TEXT NOT NULL,
          contact_details TEXT,
          issue_type TEXT NOT NULL,
          description TEXT NOT NULL,
          photo_details JSONB,
          status TEXT NOT NULL DEFAULT 'new',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        ALTER TABLE repairs_submissions
        ADD COLUMN IF NOT EXISTS photo_details JSONB
      `;
    })();
  }

  await schemaReady;
}

export async function saveSubmission(input: NewSubmission): Promise<SubmissionRecord> {
  await ensureSubmissionsTable();

  const sql = getSql();
  const photoDetails =
    input.photoDetails && input.photoDetails.length > 0
      ? JSON.stringify(input.photoDetails)
      : null;

  const rows = await sql`
    INSERT INTO repairs_submissions (
      resident_name,
      address,
      contact_details,
      issue_type,
      description,
      photo_details,
      status,
      updated_at
    )
    VALUES (
      ${input.residentName?.trim() || null},
      ${input.address.trim()},
      ${input.contactDetails?.trim() || null},
      ${input.issueType},
      ${input.description.trim()},
      ${photoDetails}::jsonb,
      'new',
      NOW()
    )
    RETURNING
      id,
      resident_name,
      address,
      contact_details,
      issue_type,
      description,
      photo_details,
      status,
      created_at,
      updated_at
  `;

  const submission = rows[0] as SubmissionRecord | undefined;

  if (!submission) {
    throw new Error("Submission could not be saved.");
  }

  return submission;
}
