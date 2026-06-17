export type ConcernSubmission = {
  categorySlug: string;
  categoryTitle: string;
  residentName: string;
  residentEmail: string;
  residentPhone: string;
  address: string;
  referenceNumber: string;
  description: string;
  /** Resident-supplied photo URLs. */
  photoLinks: string[];
  /** Names of uploaded photo attachments. */
  photoFilenames: string[];
};

export type SavedConcern = ConcernSubmission & {
  id: string;
  submittedAt: Date;
};
