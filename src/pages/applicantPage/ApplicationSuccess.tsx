import { Bell, CheckCircle2, Clock, FileCheck, FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";

import { PRIMARY_COLOR, PRIMARY_HOVER_COLOR } from "./constants";
import type { ApplicationSuccessProps } from "./types";

export function ApplicationSuccess({
  applicationReference,
}: ApplicationSuccessProps) {
  return (
    <div className="bg-white border border-[#E4E7EB] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 md:px-10 pt-10 pb-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-[25px] md:text-[28px] font-semibold text-[#1A1E24]">
          Application Submitted Successfully
        </h1>

        <p className="text-sm text-gray-500 max-w-[520px] mx-auto mt-3 leading-relaxed">
          Your application has been successfully submitted and is now being processed by the Admissions Registry.
        </p>
      </div>

      <div className="px-6 md:px-10 pb-6">
        <div
          className="rounded-xl border p-5 text-center"
          style={{
            backgroundColor: `${PRIMARY_COLOR}06`,
            borderColor: `${PRIMARY_COLOR}20`,
          }}
        >
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
            Application Reference
          </p>

          <p
            className="text-xl md:text-2xl font-bold tracking-wide mt-2"
            style={{ color: PRIMARY_COLOR }}
          >
            {applicationReference}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Please keep this reference number for future enquiries about your application.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-7">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">What happens next?</h3>
            <p className="text-xs text-gray-500 mt-1">
              Your application will go through the following process.
            </p>
          </div>

          <div className="p-5 space-y-5">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${PRIMARY_COLOR}12` }}
              >
                <FileCheck size={16} style={{ color: PRIMARY_COLOR }} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">Application Received</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Your application and the information you provided have been received by the Admissions Registry.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-yellow-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">Application Under Review</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  The Admissions team will review your application and verify the information provided.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Bell size={16} className="text-gray-500" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">Admission Decision</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  You will be notified when a decision has been made regarding your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-yellow-200 bg-yellow-50 rounded-xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-yellow-600" />

            <div>
              <p className="text-sm font-semibold text-gray-800">Application Status</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Your application is waiting for review.
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1.5 rounded-full w-fit">
            Pending Review
          </span>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-1 py-3.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <FileText size={16} />
            View Application
          </button>

          <Link
            to="/"
            className="flex-1 py-3.5 rounded-xl text-white text-sm font-semibold transition flex items-center justify-center gap-2"
            style={{ backgroundColor: PRIMARY_COLOR }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = PRIMARY_HOVER_COLOR;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = PRIMARY_COLOR;
            }}
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 md:px-10 py-5 text-center">
        <p className="text-xs text-gray-400">Need help with your application?</p>

        <button
          type="button"
          className="text-xs font-semibold mt-1 hover:underline"
          style={{ color: PRIMARY_COLOR }}
        >
          Contact Admissions Support
        </button>
      </div>
    </div>
  );
}
