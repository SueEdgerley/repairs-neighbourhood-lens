"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CONCERN_CATEGORIES, getCategoryBySlug } from "@/lib/categories";

type Status = "idle" | "submitting" | "success" | "error";

function inputClasses() {
  return "w-full rounded-xl border border-slate-300 p-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600";
}

function ReportForm() {
  const searchParams = useSearchParams();
  const initialCategory = getCategoryBySlug(searchParams.get("concern"))?.slug ?? "";

  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/concerns", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage(
          data.message ??
            "Thank you. Your repair concern has been submitted and will be reviewed by the repairs team.",
        );
      } else {
        setStatus("error");
        setMessage(
          data.message ??
            "Sorry, we could not submit your concern right now. Please try again shortly.",
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Sorry, we could not submit your concern right now. Please try again shortly.",
      );
    }
  }

  if (status === "success") {
    return (
      <section className="mx-auto max-w-2xl rounded-2xl border border-teal-100 bg-white p-8 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-3xl"
        >
          ✅
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Concern submitted
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">{message}</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          Back to home
        </Link>
      </section>
    );
  }

  const submitting = status === "submitting";

  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Tell us about your repair concern
      </h1>
      <p className="mt-3 text-slate-600">
        Provide as much detail as you can. Fields marked with{" "}
        <span className="text-red-600">*</span> are required.
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {message}
        </div>
      )}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-800">
            Concern category <span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClasses()}
          >
            <option value="" disabled>
              Select the option that best describes your issue
            </option>
            {CONCERN_CATEGORIES.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.icon} {option.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-800">
            Your name <span className="text-red-600">*</span>
          </label>
          <input id="name" name="name" required className={inputClasses()} placeholder="Full name" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-800">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClasses()}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-800">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={inputClasses()}
              placeholder="07000 000000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-slate-800">
            Property address
          </label>
          <input
            id="address"
            name="address"
            className={inputClasses()}
            placeholder="Address where the repair relates to"
          />
        </div>

        <div>
          <label htmlFor="reference" className="mb-1.5 block text-sm font-medium text-slate-800">
            Repair reference number
          </label>
          <input
            id="reference"
            name="reference"
            className={inputClasses()}
            placeholder="If you have one (optional)"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-800">
            Description of your concern <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            className={`${inputClasses()} min-h-36`}
            placeholder="Tell us what has happened"
          />
        </div>

        <div>
          <label htmlFor="photos" className="mb-1.5 block text-sm font-medium text-slate-800">
            Upload photos
          </label>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-teal-800"
          />
          <p className="mt-1 text-xs text-slate-500">
            Optional. You can attach photos of the issue.
          </p>
        </div>

        <div>
          <label htmlFor="photoLinks" className="mb-1.5 block text-sm font-medium text-slate-800">
            Photo links
          </label>
          <textarea
            id="photoLinks"
            name="photoLinks"
            className={`${inputClasses()} min-h-20`}
            placeholder="Optional. Paste links to photos, one per line."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? "Submitting…" : "Submit concern"}
        </button>
      </form>
    </section>
  );
}

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/croydon-housing-logo.svg"
              alt="Croydon Housing"
              className="h-12 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-teal-700 hover:text-teal-900"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="px-6 py-10">
        <Suspense
          fallback={
            <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-slate-500">Loading…</p>
            </section>
          }
        >
          <ReportForm />
        </Suspense>
      </div>
    </main>
  );
}
