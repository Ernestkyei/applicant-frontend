export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Testimonials</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Applicants love the clarity</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["The dashboard made my application stress-free and easy to follow.", "Ama K.", "2026 applicant"],
            ["I always knew exactly what to do next. It felt organized and transparent.", "Kojo A.", "Postgraduate applicant"],
            ["The upload process and status tracking were simple, fast, and reliable.", "Naa S.", "International applicant"],
          ].map(([quote, name, role]) => (
            <div key={name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 text-amber-500">★★★★★</div>
              <p className="mb-6 text-sm leading-6 text-slate-700">“{quote}”</p>
              <div>
                <p className="font-semibold text-slate-900">{name}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
