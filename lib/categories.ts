export type ConcernCategory = {
  slug: string;
  title: string;
  icon: string;
  description: string;
};

export const CONCERN_CATEGORIES: ConcernCategory[] = [
  {
    slug: "quality",
    title: "Quality",
    icon: "🔧",
    description: "A recent repair was not completed to a satisfactory standard.",
  },
  {
    slug: "professionalism",
    title: "Professionalism",
    icon: "👷",
    description:
      "The operatives were rude, behaved unprofessionally, or left a mess behind.",
  },
  {
    slug: "awaiting-appointment",
    title: "Awaiting Appointment",
    icon: "📅",
    description: "I am waiting to receive an appointment date for my repair.",
  },
  {
    slug: "missed-appointment",
    title: "Missed Appointment",
    icon: "⏰",
    description:
      "The contractor did not attend within the agreed appointment timeslot.",
  },
  {
    slug: "change-appointment",
    title: "Change an Appointment",
    icon: "🔄",
    description: "I need to rearrange an existing repair appointment.",
  },
  {
    slug: "repair-update",
    title: "Repair Update",
    icon: "ℹ️",
    description: "I would like an update on the progress of my repair.",
  },
  {
    slug: "something-else",
    title: "Something Else",
    icon: "💬",
    description: "Something else relating to a repair needs attention.",
  },
];

export function getCategoryBySlug(
  slug: string | null | undefined,
): ConcernCategory | undefined {
  if (!slug) return undefined;
  return CONCERN_CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryTitle(slug: string | null | undefined): string {
  return getCategoryBySlug(slug)?.title ?? "Something Else";
}
