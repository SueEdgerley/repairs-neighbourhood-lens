import Link from "next/link";
import type { IssueOption } from "@/lib/issues";
import { IssueIcon } from "@/components/IssueIcon";

type HomeIssueTileProps = {
  option: IssueOption;
};

export function HomeIssueTile({ option }: HomeIssueTileProps) {
  return (
    <Link
      href={`/report?issueType=${option.id}`}
      className="flex min-h-[6.5rem] w-full items-start gap-4 rounded-2xl border-2 border-council-teal/60 bg-council-teal-light p-4 text-left no-underline transition-colors hover:border-council-teal focus-visible:ring-2 focus-visible:ring-council-teal focus-visible:ring-offset-2"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-council-teal/30 bg-white text-council-teal"
        aria-hidden="true"
      >
        <IssueIcon name={option.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold text-council-navy">{option.label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-text-muted">{option.description}</span>
      </span>
    </Link>
  );
}
