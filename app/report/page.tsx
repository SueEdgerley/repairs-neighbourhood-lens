import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ReportForm } from "./ReportForm";

function ReportLoading() {
  return (
    <>
      <SiteHeader showBackLink />
      <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <p className="text-base text-text-muted">Loading report form…</p>
      </main>
    </>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportLoading />}>
      <ReportForm />
    </Suspense>
  );
}
