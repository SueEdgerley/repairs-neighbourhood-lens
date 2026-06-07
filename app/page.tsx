import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { RepairsHeroIllustration } from "@/components/RepairsHeroIllustration";
import { HomeIssueTile } from "@/components/HomeIssueTile";
import { ISSUE_OPTIONS } from "@/lib/issues";

const steps = [
  {
    icon: "🔍",
    title: "Choose your concern",
    detail: "Select the option that best describes your repair concern.",
  },
  {
    icon: "📷",
    title: "Tell us what happened",
    detail: "Provide details and upload photos if available.",
  },
  {
    icon: "✓",
    title: "We will review it",
    detail: "Your concern will be sent to the appropriate team for investigation.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="home" />
      <main id="main-content" className="mx-auto max-w-lg px-4 py-8 sm:px-6 sm:py-10">
        <section aria-labelledby="welcome-heading" className="space-y-4 text-center">
          <h1 id="welcome-heading" className="text-3xl font-bold leading-tight text-council-navy sm:text-4xl">
            Report a Repair Concern
          </h1>
          <p className="text-left text-lg leading-relaxed text-text">
            <strong className="block text-council-navy">Need to tell us about a repair problem?</strong>
            Whether a repair has not been completed properly, keeps recurring, has caused further damage,
            or you are unhappy with the outcome, we will guide you through the process and make sure the
            right team receives your concern.
          </p>
        </section>

        <div className="mt-6 flex justify-center" aria-hidden="true">
          <RepairsHeroIllustration />
        </div>

        <section aria-labelledby="categories-heading" className="mt-10 space-y-4">
          <h2 id="categories-heading" className="text-xl font-bold text-council-navy">
            What type of concern is this?
          </h2>
          <p className="text-base text-text-muted">
            Choose the option that best matches your situation. All concerns are treated equally.
          </p>
          <ul className="space-y-3">
            {ISSUE_OPTIONS.map((option) => (
              <li key={option.id}>
                <HomeIssueTile option={option} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="steps-heading" className="mt-10 space-y-4">
          <h2 id="steps-heading" className="text-xl font-bold text-council-navy">
            How it works
          </h2>
          <ol className="space-y-4">
            {steps.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-council-teal-light text-xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-council-navy">
                    <span className="sr-only">Step {index + 1}: </span>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10">
          <Link
            href="/report"
            className="flex min-h-14 w-full items-center justify-center rounded-xl bg-council-blue px-6 py-4 text-lg font-semibold text-white no-underline shadow-sm transition-colors hover:bg-blue-700"
          >
            Start your report
          </Link>
        </div>

        <aside
          aria-labelledby="emergency-heading"
          className="mt-8 rounded-2xl border-2 border-amber-500 bg-amber-50 p-5"
        >
          <h2 id="emergency-heading" className="text-lg font-bold text-amber-950">
            Urgent Repairs and Gas Emergencies
          </h2>
          <p className="mt-3 text-base leading-relaxed text-amber-950">
            If you have an urgent repair, such as no heating in cold weather or a major leak, please
            contact our repairs line straight away.
          </p>
          <p className="mt-3 text-base leading-relaxed text-amber-950">
            If you smell gas or think there may be a gas leak, do not use this form — call the National
            Gas Emergency Service immediately on{" "}
            <a href="tel:0800111999" className="font-bold text-amber-950 underline">
              0800 111 999
            </a>
            .
          </p>
        </aside>
      </main>
    </>
  );
}
