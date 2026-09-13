import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function StatusPage() {
  const application = {
    reference: "ADM-20260913-1042",
    submittedOn: "13 September 2026",
    program: "BSc Computer Science",
    academicYear: "2026/2027",
    status: "Under Review",
    statusTone: "warning",
    nextAction: "Your application is being reviewed by the admissions office.",
    checklist: [
      { label: "Application submitted", complete: true },
      { label: "Documents verified", complete: true },
      { label: "Academic review in progress", complete: true },
      { label: "Final decision pending", complete: false },
    ],
  };

  const stages = [
    {
      title: "Application Submitted",
      detail: "Your application and supporting details were received.",
      complete: true,
    },
    {
      title: "Initial Screening",
      detail: "The admissions team is checking submitted information.",
      complete: true,
    },
    {
      title: "Academic Review",
      detail: "Your programme eligibility is being evaluated.",
      complete: true,
    },
    {
      title: "Admission Decision",
      detail: "Final outcome will be communicated once review is complete.",
      complete: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      <div className="max-w-[980px] mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Applicant Portal</span>
          <span>/</span>
          <span className="text-gray-600">Application Status</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#1A1E24]">
            Application Status
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Track the progress of your admission application.
          </p>
        </div>

        <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-6">
          <div className="p-6 md:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                  <Clock3 size={24} className="text-amber-600" />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400">
                    Current Status
                  </p>

                  <h2 className="text-xl font-semibold text-gray-800 mt-1">
                    {application.status}
                  </h2>
                </div>
              </div>

              <span className="w-fit px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                IN PROGRESS
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-[#E4E7EB] bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Next update</p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {application.nextAction}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
              Reference
            </p>
            <p className="mt-3 text-lg font-semibold text-[#1F3A5F] break-all">
              {application.reference}
            </p>
          </div>

          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
              Submitted
            </p>
            <p className="mt-3 text-lg font-semibold text-gray-800">
              {application.submittedOn}
            </p>
          </div>

          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
              Programme
            </p>
            <p className="mt-3 text-lg font-semibold text-gray-800">
              {application.program}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#1F3A5F]/10 flex items-center justify-center">
                <FileText size={18} className="text-[#1F3A5F]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800">Progress Timeline</h3>
                <p className="text-xs text-gray-500 mt-0.5">Review milestones</p>
              </div>
            </div>

            <div className="space-y-5">
              {stages.map((stage, index) => (
                <div key={stage.title} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        stage.complete
                          ? "bg-[#1F3A5F] border-[#1F3A5F] text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {stage.complete ? <CheckCircle2 size={16} /> : index + 1}
                    </div>

                    {index < stages.length - 1 && (
                      <div className="w-px h-10 bg-gray-200 mt-2" />
                    )}
                  </div>

                  <div className="pt-0.5">
                    <p className="text-sm font-semibold text-gray-800">{stage.title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <ShieldCheck size={18} className="text-green-600" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800">Checklist</h3>
                <p className="text-xs text-gray-500 mt-0.5">Application readiness</p>
              </div>
            </div>

            <div className="space-y-3">
              {application.checklist.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                  <span className="text-sm text-gray-700">{item.label}</span>

                  {item.complete ? (
                    <span className="inline-flex items-center gap-1 text-green-700 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      Done
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-700 text-xs font-semibold">
                      <AlertCircle size={14} />
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Academic Year</span>
                <span className="font-semibold text-gray-800">{application.academicYear}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1F3A5F] text-white text-sm font-semibold hover:bg-[#274772] transition"
          >
            View Application
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Contact Admissions
          </button>
        </div>
      </div>
    </div>
  );
}
