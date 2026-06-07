import type { IssueOption } from "@/lib/issues";
import { IssueIcon } from "@/components/IssueIcon";

type IssueCardProps = {
  option: IssueOption;
  selected: boolean;
  onSelect: (id: IssueOption["id"]) => void;
};

export function IssueCard({ option, selected, onSelect }: IssueCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(option.id)}
      className={`flex w-full min-h-[5.5rem] items-start gap-4 rounded-2xl border-2 bg-council-teal-light p-4 text-left transition-colors ${
        selected
          ? "border-council-teal shadow-sm ring-2 ring-council-teal ring-offset-2"
          : "border-council-teal/60 hover:border-council-teal"
      }`}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-council-teal/30 bg-white text-council-teal"
        aria-hidden="true"
      >
        <IssueIcon name={option.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="text-base font-semibold text-council-navy">{option.label}</span>
          {selected && (
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-council-teal bg-white text-xs font-bold text-council-teal"
              aria-hidden="true"
            >
              ✓
            </span>
          )}
        </span>
        <span className="mt-1 block text-sm text-text-muted">{option.description}</span>
      </span>
    </button>
  );
}
