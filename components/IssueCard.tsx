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
      className={`flex w-full min-h-[4.5rem] items-start gap-4 rounded-xl border-2 bg-white p-4 text-left transition-colors ${
        selected
          ? "border-council-blue bg-blue-50 shadow-sm ring-2 ring-council-blue ring-offset-2"
          : "border-border hover:border-slate-400 hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
          selected ? "bg-council-blue text-white" : "bg-slate-100 text-council-navy"
        }`}
        aria-hidden="true"
      >
        <IssueIcon name={option.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="text-base font-semibold text-text">{option.label}</span>
          {selected && (
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-council-blue text-xs font-bold text-white"
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
