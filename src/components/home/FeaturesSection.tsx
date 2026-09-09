export default function FeaturesSection() {
  return (
    <section className="bg-white px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Why choose us</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Built for a smoother admissions journey</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Real-time tracking", "Monitor each stage of your application with clarity and confidence."],
            ["Secure submissions", "Keep your academic records, documents, and updates protected in one place."],
            ["Guided process", "Follow simple next steps with clear status updates and reminders."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 h-12 w-12 rounded-xl bg-amber-100 text-2xl leading-[3rem] text-amber-700">✓</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
