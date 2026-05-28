import Link from "next/link";

type SiteHeaderProps = {
  showBackLink?: boolean;
};

export function SiteHeader({ showBackLink = false }: SiteHeaderProps) {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="text-sm font-medium text-text-muted">Croydon Council</p>
          <Link href="/" className="text-lg font-bold text-council-navy no-underline hover:underline">
            Repairs Neighbourhood Lens
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
