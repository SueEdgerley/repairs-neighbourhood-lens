import { neon } from "@neondatabase/serverless";
import type { ConcernSubmission, SavedConcern } from "./types";

function getConnectionString(): string {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  // Tolerate connection strings stored without an explicit scheme
  // (e.g. "//user:pass@host/db").
  if (raw.startsWith("postgres://") || raw.startsWith("postgresql://")) {
    return raw;
  }
  if (raw.startsWith("//")) {
    return `postgresql:${raw}`;
  }
  return `postgresql://${raw}`;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(sql: ReturnType<typeof neon>): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS repair_concerns (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          category_slug TEXT NOT NULL,
          category_title TEXT NOT NULL,
          resident_name TEXT NOT NULL,
          resident_email TEXT,
          resident_phone TEXT,
          address TEXT,
          reference_number TEXT,
          description TEXT NOT NULL,
          photo_links TEXT[] NOT NULL DEFAULT '{}',
          photo_filenames TEXT[] NOT NULL DEFAULT '{}',
          submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })().catch((error) => {
      // Reset so a later request can retry schema creation.
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

/**
 * Persists a repair concern submission. Throws if the save fails so callers can
 * surface an error to the resident.
 */
export async function saveConcern(
  submission: ConcernSubmission,
): Promise<SavedConcern> {
  const sql = neon(getConnectionString());
  await ensureSchema(sql);

  const rows = (await sql`
    INSERT INTO repair_concerns (
      category_slug,
      category_title,
      resident_name,
      resident_email,
      resident_phone,
      address,
      reference_number,
      description,
      photo_links,
      photo_filenames
    ) VALUES (
      ${submission.categorySlug},
      ${submission.categoryTitle},
      ${submission.residentName},
      ${submission.residentEmail},
      ${submission.residentPhone},
      ${submission.address},
      ${submission.referenceNumber},
      ${submission.description},
      ${submission.photoLinks},
      ${submission.photoFilenames}
    )
    RETURNING id, submitted_at
  `) as Array<{ id: string; submitted_at: string }>;

  const saved = rows[0];

  return {
    ...submission,
    id: saved.id,
    submittedAt: new Date(saved.submitted_at),
  };
}
