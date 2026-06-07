export type IssueType =
  | "stitch-in-time"
  | "poor-quality-repair"
  | "leak-damp"
  | "heating-hot-water"
  | "door-window-lock"
  | "communal-repair"
  | "other";

export type IssueOption = {
  id: IssueType;
  label: string;
  description: string;
  icon: "stitch" | "quality" | "leak" | "heating" | "door" | "communal" | "other";
};

export const ISSUE_OPTIONS: IssueOption[] = [
  {
    id: "stitch-in-time",
    label: "Stitch in Time",
    description: "Small repair concern before it becomes a bigger problem",
    icon: "stitch",
  },
  {
    id: "poor-quality-repair",
    label: "Poor-quality recent repair",
    description: "A recent repair was not done well",
    icon: "quality",
  },
  {
    id: "leak-damp",
    label: "Leak or damp concern",
    description: "Water, damp or mould in your home",
    icon: "leak",
  },
  {
    id: "heating-hot-water",
    label: "Heating or hot water",
    description: "Boiler, radiators or hot water problems",
    icon: "heating",
  },
  {
    id: "door-window-lock",
    label: "Door, window or lock",
    description: "Doors, windows or locks that need fixing",
    icon: "door",
  },
  {
    id: "communal-repair",
    label: "Communal repair issue",
    description: "Shared areas in your block or estate",
    icon: "communal",
  },
  {
    id: "other",
    label: "Other repair concern",
    description: "Something else that needs attention",
    icon: "other",
  },
];

export function getIssueLabel(id: IssueType): string {
  return ISSUE_OPTIONS.find((option) => option.id === id)?.label ?? id;
}
