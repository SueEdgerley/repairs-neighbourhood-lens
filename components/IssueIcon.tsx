import type { IssueOption } from "@/lib/issues";

type IssueIconProps = {
  name: IssueOption["icon"];
  className?: string;
};

export function IssueIcon({ name, className = "h-7 w-7" }: IssueIconProps) {
  const shared = `${className} shrink-0`;

  switch (name) {
    case "stitch":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v4M8 7h8M6 11h12M8 15h8M12 19v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "quality":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 17l.9-5.4L4.2 7.7l5.4-.8L12 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "leak":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3c-4 6-7 9-7 12a7 7 0 1014 0c0-3-3-6-7-12z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "heating":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2v20M8 6v12M16 6v12M4 10v4M20 10v4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "door":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "communal":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 21h18M5 21V9l7-4 7 4v12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "other":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
