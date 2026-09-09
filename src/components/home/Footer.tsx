export default function Footer() {
  return (
    <footer className="bg-slate-900 px-6 py-8 text-slate-300 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">Admission Eligibility System</p>
          <p className="text-sm text-slate-400">Making applications clear, secure, and accessible.</p>
        </div>
        <div className="flex gap-5 text-sm">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/access-code" className="hover:text-white">Access Code</a>
          <a href="/subscription" className="hover:text-white">Subscribe</a>
        </div>
      </div>
    </footer>
  );
}
