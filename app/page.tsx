import Link from "next/link";
import { CONCERN_CATEGORIES } from "@/lib/categories";

const steps = [
  {
    number: "1",
    title: "Choose your concern",
    description: "Select the option that best describes your issue.",
  },
  {
    number: "2",
    title: "Tell us what happened",
    description: "Provide details and upload photos if available.",
  },
  {
    number: "3",
    title: "We will review it",
    description:
      "Your concern will be sent to the appropriate team for investigation.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Branding */}
      <header className="bg-white">
        <div className="mx-auto flex max-w-5xl justify-center px-6 py-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/croydon-housing-logo.svg"
            alt="Croydon Housing"
            className="h-16 w-auto"
          />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        {/* Header */}
        <section className="pt-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Report a Repair Concern
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-teal-800">
            Need to tell us about a repair problem?
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            Whether a repair has not been completed properly, keeps recurring,
            has caused further damage, or you are unhappy with the outcome, we
            will guide you through the process and make sure the right team
            receives your concern.
          </p>

          {/* Illustration */}
          <div className="mx-auto mt-8 max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/repairs-illustration.svg"
              alt="A maintenance worker carrying out repairs at a home"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="mt-14">
          <h2 className="text-center text-xl font-bold text-slate-900">
            How it works
          </h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 text-lg font-bold text-white">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Repair concern categories */}
        <section className="mt-14">
          <h2 className="text-center text-xl font-bold text-slate-900">
            What is your concern about?
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONCERN_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/report?concern=${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 active:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl"
                >
                  {category.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Primary button */}
        <div className="mt-12 text-center">
          <Link
            href="/report"
            className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Start your report
          </Link>
        </div>

        {/* Emergency panel */}
        <section
          role="alert"
          className="mt-12 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold text-amber-900">
            <span aria-hidden="true">⚠️</span>
            Urgent Repairs and Gas Emergencies
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-amber-900">
            If you have an urgent repair, such as no heating in cold weather or a
            major leak, please call our Repairs Service Team on{" "}
            <a href="tel:02087266101" className="font-semibold underline">
              020 8726 6101
            </a>
            .
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-amber-900">
            If you smell gas or think there may be a gas leak, do not use this
            form. Call the National Gas Emergency Service immediately on{" "}
            <a href="tel:0800111999" className="underline">
              0800 111 999
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
