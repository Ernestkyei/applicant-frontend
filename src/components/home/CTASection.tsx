export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-slate-900/10 p-8 text-center text-white shadow-xl backdrop-blur-sm md:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100">Ready to begin?</p>
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">Start your application today</h2>
        <p className="mx-auto max-w-2xl text-base text-amber-50/90 md:text-lg">
          Submit your details, track your status, and receive updates as your application moves through each stage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/subscription"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-50"
          >
            Get started
          </a>
          <a
            href="/access-code"
            className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            I have an access code
          </a>
        </div>
      </div>
    </section>
  );
}
