import {
  CheckCircle2,
  CreditCard,
  FileText,
  Key,
  Calendar,
  Receipt,
  ShieldCheck,
} from "lucide-react";

export default function Payment() {
  const payment = {
    packageName: "Undergraduate",
    academicCycle: "2026/2027",
    amount: "GHS 200.00",
    status: "Paid",
    paymentMethod: "Mobile Money",
    transactionId: "TXN-20260913-00125",
    paymentDate: "13 September 2026",
    accessCode: "ACC-7K92-X4QM",
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      <div className="max-w-[900px] mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Applicant Portal</span>
          <span>/</span>
          <span className="text-gray-600">Payment</span>
        </div>

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#1A1E24]">
            Payment
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View your application package and payment information.
          </p>
        </div>

        {/* Payment Status */}
        <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
          <div className="p-6 md:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2
                    size={25}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold text-gray-400">
                    Payment Status
                  </p>

                  <h2 className="text-lg font-semibold text-gray-800 mt-0.5">
                    Payment Completed
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Your application payment has been successfully processed.
                  </p>
                </div>
              </div>

              <span className="w-fit px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                PAID
              </span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
          <div className="px-6 md:px-7 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F3A5F]/10 flex items-center justify-center">
                <CreditCard
                  size={18}
                  className="text-[#1F3A5F]"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Payment Details
                </h2>

                <p className="text-xs text-gray-500 mt-0.5">
                  Details of your application payment.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Package
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1">
                {payment.packageName}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Academic Cycle
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1">
                {payment.academicCycle}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Amount Paid
              </p>

              <p className="text-lg font-semibold text-[#1F3A5F] mt-1">
                {payment.amount}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Payment Method
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1">
                {payment.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Transaction ID
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1 break-all">
                {payment.transactionId}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Payment Date
              </p>

              <div className="flex items-center gap-2 mt-1">
                <Calendar
                  size={14}
                  className="text-gray-400"
                />

                <p className="text-sm font-medium text-gray-800">
                  {payment.paymentDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Code */}
        <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
          <div className="px-6 md:px-7 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <Key
                  size={18}
                  className="text-amber-600"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Application Access Code
                </h2>

                <p className="text-xs text-gray-500 mt-0.5">
                  Your access code was generated after successful payment.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-7">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
                Access Code
              </p>

              <p className="text-2xl md:text-3xl font-bold tracking-[0.18em] text-[#1F3A5F] mt-3">
                {payment.accessCode}
              </p>

              <p className="text-xs text-gray-500 mt-3">
                Keep this code safe. It is used to access your application.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 md:p-7 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={19}
                className="text-green-600 mt-0.5"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Payment Completed
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Your payment has been confirmed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck
                size={19}
                className="text-[#1F3A5F] mt-0.5"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Application Unlocked
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  You can access your application.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Receipt
                size={19}
                className="text-gray-500 mt-0.5"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Payment Recorded
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Your transaction has been recorded.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-6 pt-5">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <FileText size={16} />
              View Payment Receipt
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}