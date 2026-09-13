// src/components/home/FeaturesSection.tsx

import { Activity, ShieldCheck, Compass } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Activity,
      title: "Real-time tracking",
      text: "Monitor each stage of your application with clarity and confidence.",
    },
    {
      icon: ShieldCheck,
      title: "Secure submissions",
      text: "Keep your academic records, documents, and updates protected in one place.",
    },
    {
      icon: Compass,
      title: "Guided process",
      text: "Follow simple next steps with clear status updates and reminders.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Why choose us
          </p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Built for a smoother admissions journey
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}