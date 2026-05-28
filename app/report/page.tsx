"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { IssueCard } from "@/components/IssueCard";
import { ISSUE_OPTIONS, type IssueType, getIssueLabel } from "@/lib/issues";

type FormState = {
  issueType: IssueType | "";
  address: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

const initialFormState: FormState = {
  issueType: "",
  address: "",
  description: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
};

const fieldClassName =
  "mt-2 block w-full min-h-12 rounded-xl border-2 border-border bg-white px-4 py-3 text-base text-text placeholder:text-slate-400";

export default function ReportPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [issueError, setIssueError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "issueType") {
      setIssueError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!form.issueType) {
      setIssueError("Please choose the type of repair concern.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueType: form.issueType,
          address: form.address,
          description: form.description,
          contactName: form.contactName,
          contactPhone: form.contactPhone,
          contactEmail: form.contactEmail,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitError(data.error ?? "We could not save your report right now. Please try again.");
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("We could not save your report right now. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted && form.issueType) {
    return (
      <>
        <SiteHeader showBackLink />
        <main id="main-content" className="mx-auto max-w-lg px-4 py-8 sm:px-6 sm:py-10">
          <section
            aria-labelledby="success-heading"
            className="rounded-2xl border-2 border-council-teal bg-council-teal-light p-6"
          >
            <h1 id="success-heading" className="text-2xl font-bold text-council-navy">
              Thank you. Your repair concern has been received.
            </h1>
            <p className="mt-3 text-base text-text">
              You told us about:{" "}
              <strong>{getIssueLabel(form.issueType)}</strong>
            </p>
            <p className="mt-2 text-sm text-text-muted">
              We have saved your report and will review it soon.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSubmitError("");
                  setForm(initialFormState);
                }}
                className="flex min-h-12 items-center justify-center rounded-xl border-2 border-council-navy bg-white px-4 py-3 text-base font-semibold text-council-navy hover:bg-slate-50"
              >
                Report another concern
              </button>
              <Link
                href="/"
                className="flex min-h-12 items-center justify-center rounded-xl bg-council-blue px-4 py-3 text-base font-semibold text-white no-underline hover:bg-blue-700"
              >
                Back to home
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader showBackLink />
      <main id="main-content" className="mx-auto max-w-lg px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight text-council-navy">Report a concern</h1>
          <p className="text-base text-text-muted">
            Choose the option that best matches your issue, then tell us a bit more. It only takes
            a few minutes.
          </p>
        </header>

        {form.issueType === "stitch-in-time" && (
          <aside
            aria-labelledby="stitch-info-heading"
            className="mt-6 rounded-2xl border-2 border-council-teal bg-council-teal-light p-5"
          >
            <h2 id="stitch-info-heading" className="text-lg font-bold text-council-navy">
              Stitch in time
            </h2>
            <p className="mt-2 text-base text-text">
              Tell us about small repair concerns before they become bigger problems.
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Use this for non-urgent early warning issues. If someone is at risk or your home is
              unsafe, please call our repairs line instead.
            </p>
          </aside>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-8" noValidate>
          <fieldset>
            <legend className="text-lg font-bold text-council-navy">
              What type of concern is this?
              <span className="ml-1 font-normal text-red-700" aria-hidden="true">
                *
              </span>
            </legend>
            <p id="issue-type-hint" className="mt-1 text-sm text-text-muted">
              Tap a card to select your concern. You can change your choice at any time.
            </p>
            <div
              role="radiogroup"
              aria-required="true"
              aria-invalid={issueError ? "true" : "false"}
              aria-describedby={issueError ? "issue-type-error issue-type-hint" : "issue-type-hint"}
              className="mt-4 space-y-3"
            >
              {ISSUE_OPTIONS.map((option) => (
                <IssueCard
                  key={option.id}
                  option={option}
                  selected={form.issueType === option.id}
                  onSelect={(id) => updateField("issueType", id)}
                />
              ))}
            </div>
            {issueError && (
              <p id="issue-type-error" role="alert" className="mt-3 text-sm font-medium text-red-700">
                {issueError}
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="address" className="block text-base font-semibold text-text">
              Your address
              <span className="ml-1 font-normal text-red-700" aria-hidden="true">
                *
              </span>
            </label>
            <p id="address-hint" className="mt-1 text-sm text-text-muted">
              Include your flat or house number and postcode.
            </p>
            <input
              id="address"
              name="address"
              type="text"
              required
              autoComplete="street-address"
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              aria-describedby="address-hint"
              className={fieldClassName}
              placeholder="e.g. 12 Example Road, Croydon, CR0 1AA"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-base font-semibold text-text">
              What is happening?
              <span className="ml-1 font-normal text-red-700" aria-hidden="true">
                *
              </span>
            </label>
            <p id="description-hint" className="mt-1 text-sm text-text-muted">
              Describe the problem in your own words. Include when you first noticed it.
            </p>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              aria-describedby="description-hint"
              className={`${fieldClassName} min-h-[8rem] resize-y`}
              placeholder="For example: a small damp patch appeared on the bedroom ceiling last week."
            />
          </div>

          <fieldset className="space-y-5 rounded-2xl border border-border bg-white p-5">
            <legend className="px-1 text-lg font-bold text-council-navy">Your contact details</legend>
            <p className="text-sm text-text-muted">
              Optional for now — we may use these to get back to you once this service is live.
            </p>

            <div>
              <label htmlFor="contactName" className="block text-base font-semibold text-text">
                Your name
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                autoComplete="name"
                value={form.contactName}
                onChange={(event) => updateField("contactName", event.target.value)}
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="contactPhone" className="block text-base font-semibold text-text">
                Phone number
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.contactPhone}
                onChange={(event) => updateField("contactPhone", event.target.value)}
                className={fieldClassName}
                placeholder="e.g. 07XXX XXXXXX"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-base font-semibold text-text">
                Email address
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={form.contactEmail}
                onChange={(event) => updateField("contactEmail", event.target.value)}
                className={fieldClassName}
                placeholder="e.g. you@example.com"
              />
            </div>
          </fieldset>

          {submitError && (
            <p role="alert" className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="min-h-14 w-full rounded-xl bg-council-blue px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending report…" : "Send report"}
          </button>
        </form>
      </main>
    </>
  );
}
