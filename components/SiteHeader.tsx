import Link from "next/link";
import { CroydonHousingLogo } from "@/components/CroydonHousingLogo";

type SiteHeaderProps = {
  showBackLink?: boolean;
  variant?: "home" | "default";
};

export function SiteHeader({ showBackLink = false, variant = "default" }: SiteHeaderProps) {
  if (variant === "home") {
    return (
      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-lg px-4 py-5 sm:px-6">
          <div className="flex justify-center rounded-2xl bg-white px-6 py-4">
            <Link href="/" aria-label="Croydon Housing home" className="no-underline">
              <CroydonHousingLogo className="h-16 w-auto max-w-full" priority />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="text-sm font-medium text-council-teal">Croydon Housing</p>
          <Link href="/" className="text-lg font-bold text-council-navy no-underline hover:underline">
            Report a Repair Concern
          </Link>
        </div>
        {showBackLink && (
          <Link
            href="/"
            className="min-h-11 shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-council-blue underline-offset-2 hover:underline"
          >
            Back to home
          </Link>
        )}
      </div>
    </header>
  );
}
