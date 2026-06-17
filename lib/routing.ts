/**
 * Email routing rules for repair concerns.
 *
 * Every submission currently goes to the internal repairs team
 * (REPAIRS_TEAM_EMAIL). The structure below is intentionally simple to extend:
 * add an entry to `CATEGORY_ROUTING` to direct specific concern categories to
 * different teams or managers in future, for example:
 *
 *   "quality": ["quality.manager@croydon.gov.uk"],
 *   "professionalism": ["contractor.manager@croydon.gov.uk"],
 *   "missed-appointment": ["scheduling.team@croydon.gov.uk"],
 *   "repair-update": ["internalrepairs@croydon.gov.uk"],
 *
 * Recipients returned by an override are used INSTEAD of the default team.
 */

function getDefaultRecipients(): string[] {
  const fallback = process.env.REPAIRS_TEAM_EMAIL;
  if (!fallback) {
    throw new Error("REPAIRS_TEAM_EMAIL environment variable is not set");
  }
  return [fallback];
}

/**
 * Per-category recipient overrides. Leave empty to send everything to the
 * default repairs team. Populate later to enable category-specific routing.
 */
const CATEGORY_ROUTING: Record<string, string[]> = {
  // "quality": ["quality.manager@croydon.gov.uk"],
  // "professionalism": ["contractor.manager@croydon.gov.uk"],
  // "missed-appointment": ["scheduling.team@croydon.gov.uk"],
  // "repair-update": ["internalrepairs@croydon.gov.uk"],
};

export function getRecipientsForCategory(categorySlug: string): string[] {
  const override = CATEGORY_ROUTING[categorySlug];
  if (override && override.length > 0) {
    return override;
  }
  return getDefaultRecipients();
}
