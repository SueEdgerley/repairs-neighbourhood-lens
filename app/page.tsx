import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-lg px-4 py-8 sm:px-6 sm:py-10">
        <section aria-labelledby="welcome-heading" className="space-y-4">
          <h1 id="welcome-heading" className="text-3xl font-bold leading-tight text-council-navy">
            Need help with a repair?
          </h1>
          <p className="text-lg text-text-muted">
            Tell us about a repair concern in your home or shared areas. We will guide you through
            what to report and what happens next.
          </p>
        </section>

        <section
          aria-labelledby="stitch-heading"
          className="mt-8 rounded-2xl border-2 border-council-teal bg-council-teal-light p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-council-teal text-2xl text-white"
              aria-hidden="true"
            >
              ⏱
            </span>
            <div className="space-y-2">
              <h2 id="stitch-heading" className="text-xl font-bold text-council-navy">
                Stitch in time
              </h2>
              <p className="text-base text-text">
                Tell us about small repair concerns before they become bigger problems.
              </p>
              <p className="text-sm text-text-muted">
                This is for non-urgent early warning issues — things like a small crack, a dripping
                tap, or a loose tile. If you have an emergency, call us instead.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="steps-heading" className="mt-8 space-y-4">
          <h2 id="steps-heading" className="text-xl font-bold text-council-navy">
            How it works
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: "1",
                title: "Choose your concern",
                detail: "Pick the option that best describes your repair issue.",
              },
              {
                step: "2",
                title: "Tell us what is happening",
                detail: "Share a few details so we can understand the problem.",
              },
              {
                step: "3",
                title: "We will take it from there",
                detail: "Your report helps us spot patterns and respond sooner.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4 rounded-xl border border-border bg-white p-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-council-navy text-base font-bold text-white"
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-text">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 space-y-4">
          <Link
            href="/report"
            className="flex min-h-14 w-full items-center justify-center rounded-xl bg-council-blue px-6 py-4 text-lg font-semibold text-white no-underline shadow-sm transition-colors hover:bg-blue-700"
          >
            Report a repair concern
          </Link>
          <p className="text-center text-sm text-text-muted">
            For emergencies such as no heating in winter, a major leak, or a gas smell, please call
            our repairs line instead.
          </p>
        </div>
      </main>
    </>
  );
}
