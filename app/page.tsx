export default function ReportPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-medium text-amber-700">
          Repairs - Neighbourhood Lens
        </p>

        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Tell us about a repair concern
        </h1>

        <p className="mb-8 text-slate-700">
          Use this form to tell us about a recent repair, poor-quality work,
          or a small issue that could become a bigger problem.
        </p>

        <form className="space-y-5">
          <input className="w-full rounded-xl border p-3" placeholder="Your name" />
          <input className="w-full rounded-xl border p-3" placeholder="Your address" />
          <input className="w-full rounded-xl border p-3" placeholder="Email or phone number" />

          <select className="w-full rounded-xl border p-3">
            <option>What is this about?</option>
            <option>Stitch in time concern</option>
            <option>Recent repair feedback</option>
            <option>Poor-quality repair</option>
            <option>Non-urgent repair issue</option>
            <option>Other</option>
          </select>

          <textarea
            className="min-h-36 w-full rounded-xl border p-3"
            placeholder="Please tell us what has happened"
          />

          <button className="rounded-xl bg-slate-900 px-5 py-3 text-white">
            Submit report
          </button>
        </form>
      </section>
    </main>
  );
}
