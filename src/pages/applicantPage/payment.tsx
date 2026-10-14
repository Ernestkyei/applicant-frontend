import { useEffect, useState } from "react";

import {
CheckCircle2,
CreditCard,
FileText,
Key,
Calendar,
Receipt,
ShieldCheck,
Loader2,
AlertCircle,
RefreshCw,
} from "lucide-react";

import { getMyPayments } from "../../endpoints/paymentEndpoint";
import { getMySubscription } from "../../endpoints/subscriptionEndpoint";

type PaymentRecord = {
packageName: string;
academicCycle: string;
amount: string;
status: string;
paymentMethod: string;
transactionId: string;
paymentDate: string;
accessCode: string;
};

type SubscriptionRecord = {
packageName: string;
academicCycle: string;
status: string;
startDate: string;
endDate: string;
};

const formatAmount = (amount: any, currency = "GHS") => {
if (amount == null || amount === "") return "—";

const numericAmount = Number(amount);

if (!Number.isFinite(numericAmount)) return "—";

return `${currency} ${numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (value: any) => {
if (!value) return "—";

const date = new Date(value);

if (Number.isNaN(date.getTime())) return "—";

return date.toLocaleDateString("en-GB", {
day: "numeric",
month: "long",
year: "numeric",
});
};

const unwrapResponse = (response: any) => {
let result = response;

for (let i = 0; i < 3; i++) {
if (
result &&
!Array.isArray(result) &&
typeof result === "object" &&
result.data !== undefined
) {
result = result.data;
} else {
break;
}
}

return result;
};

const mapPayment = (raw: any = {}): PaymentRecord => ({
packageName:
raw.packageName ??
raw.package?.name ??
raw.package?.packageName ??
raw.subscription?.package?.name ??
raw.subscription?.packageName ??
"—",

academicCycle:
raw.academicCycle ??
raw.cycle ??
raw.academicYear ??
raw.application?.academicCycle ??
"—",

amount: formatAmount(
raw.amount ?? raw.amountPaid ?? raw.totalAmount,
raw.currency ?? "GHS"
),

status: String(
raw.status ?? raw.paymentStatus ?? "pending"
).toLowerCase(),

paymentMethod:
raw.paymentMethod ??
raw.channel ??
raw.method ??
raw.provider ??
"—",

transactionId:
raw.transactionId ??
raw.reference ??
raw.transactionReference ??
raw.paymentReference ??
"—",

paymentDate: formatDate(
raw.paidAt ?? raw.createdAt ?? raw.paymentDate
),

accessCode:
raw.accessCode ??
raw.application?.accessCode ??
"—",
});

const mapSubscription = (raw: any = {}): SubscriptionRecord => ({
packageName:
raw.packageName ??
raw.package?.name ??
raw.package?.packageName ??
raw.plan?.name ??
raw.planName ??
"—",

academicCycle:
raw.academicCycle ??
raw.cycle ??
raw.academicYear ??
"—",

status: String(
raw.status ?? raw.subscriptionStatus ?? "unknown"
).toLowerCase(),

startDate: formatDate(
raw.startDate ?? raw.startedAt ?? raw.start_date
),

endDate: formatDate(
raw.endDate ?? raw.expiresAt ?? raw.end_date
),
});

const isSuccessfulPayment = (status: string) =>
["paid", "success", "successful", "completed"].includes(
status.toLowerCase()
);

const isFailedPayment = (status: string) =>
["failed", "cancelled", "canceled", "declined", "expired"].includes(
status.toLowerCase()
);

const getPaymentStatusLabel = (status: string) => {
if (isSuccessfulPayment(status)) return "Payment Completed";
if (isFailedPayment(status)) return "Payment Failed";

return "Payment Pending";
};

export default function Payment() {
const [payment, setPayment] = useState<PaymentRecord | null>(null);
const [subscription, setSubscription] =
useState<SubscriptionRecord | null>(null);

const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [subscriptionError, setSubscriptionError] =
useState<string | null>(null);

const loadPaymentDetails = async () => {
setLoading(true);
setError(null);
setSubscriptionError(null);

try {
  const [paymentResult, subscriptionResult] =
    await Promise.allSettled([
      getMyPayments({ page: 1, limit: 1 }),
      getMySubscription(),
    ]);

  if (paymentResult.status === "rejected") {
    throw paymentResult.reason;
  }

  const paymentResponse = unwrapResponse(
    paymentResult.value
  );

  const paymentList = Array.isArray(paymentResponse)
    ? paymentResponse
    : Array.isArray(paymentResponse?.payments)
      ? paymentResponse.payments
      : Array.isArray(paymentResponse?.items)
        ? paymentResponse.items
        : Array.isArray(paymentResponse?.results)
          ? paymentResponse.results
          : paymentResponse &&
              (paymentResponse.id ||
                paymentResponse.transactionId ||
                paymentResponse.reference)
            ? [paymentResponse]
            : [];

  if (paymentList.length === 0) {
    setPayment(null);
    setError("No payment record found for your account.");
  } else {
    setPayment(mapPayment(paymentList[0]));
  }

  if (subscriptionResult.status === "fulfilled") {
    const subscriptionResponse = unwrapResponse(
      subscriptionResult.value
    );

    const subscriptionData =
      subscriptionResponse?.subscription ??
      subscriptionResponse?.data?.subscription ??
      subscriptionResponse;

    if (
      subscriptionData &&
      typeof subscriptionData === "object" &&
      !Array.isArray(subscriptionData) &&
      (
        subscriptionData.id ||
        subscriptionData.packageName ||
        subscriptionData.package ||
        subscriptionData.plan ||
        subscriptionData.status
      )
    ) {
      setSubscription(mapSubscription(subscriptionData));
    } else {
      setSubscription(null);
    }
  } else {
    setSubscription(null);
    setSubscriptionError(
      "Subscription details are currently unavailable."
    );
  }
} catch (err: any) {
  setError(
    err?.message ?? "Unable to load your payment details."
  );
} finally {
  setLoading(false);
}

};

useEffect(() => {
void loadPaymentDetails();
}, []);

if (loading) {
return ( <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center"> <div className="flex items-center gap-2 text-gray-500 text-sm"> <Loader2 size={18} className="animate-spin" />
Loading payment details… </div> </div>
);
}

if (error || !payment) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-red-100 rounded-2xl p-6 text-center shadow-sm">
        <AlertCircle size={28} className="text-red-500 mx-auto" />

        <h2 className="text-base font-semibold text-gray-800 mt-3">Couldn't load payment</h2>

        <p className="text-sm text-gray-500 mt-1">{error || "No payment found for your account."}</p>

        <button
          type="button"
          onClick={() => void loadPaymentDetails()}
          className="mt-5 px-5 py-3 rounded-lg bg-[#1F3A5F] text-white text-sm font-semibold hover:bg-[#172D49] transition inline-flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}

const isPaid = isSuccessfulPayment(payment.status);
const isFailed = isFailedPayment(payment.status);

const statusColor = isPaid
? "bg-green-50 text-green-700"
: isFailed
? "bg-red-50 text-red-700"
: "bg-amber-50 text-amber-700";

const iconColor = isPaid
? "bg-green-50 text-green-600"
: isFailed
? "bg-red-50 text-red-600"
: "bg-amber-50 text-amber-600";

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
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#1A1E24]">Payment</h1>

        <p className="text-sm text-gray-500 mt-1">View your application package, payment and subscription information.</p>
      </div>

      {/* Payment Status */}
      <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
        <div className="p-6 md:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
                {isFailed ? <AlertCircle size={25} /> : <CheckCircle2 size={25} />}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-gray-400">Payment Status</p>

                <h2 className="text-lg font-semibold text-gray-800 mt-0.5">{getPaymentStatusLabel(payment.status)}</h2>

                <p className="text-xs text-gray-500 mt-1">
                  {isPaid ? "Your payment has been marked as successful." : isFailed ? "This payment was not completed successfully." : "Your payment has not yet been confirmed as successful."}
                </p>
              </div>
            </div>

            <span className={`w-fit px-4 py-2 rounded-full text-xs font-semibold ${statusColor}`}>{payment.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
        <div className="px-6 md:px-7 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1F3A5F]/10 flex items-center justify-center">
              <CreditCard size={18} className="text-[#1F3A5F]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800">Payment Details</h2>

              <p className="text-xs text-gray-500 mt-0.5">Details retrieved from your payment record.</p>
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
            Amount
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
            <Calendar size={14} className="text-gray-400" />
            <p className="text-sm font-medium text-gray-800">
              {payment.paymentDate}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Subscription Information */}
    <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
      <div className="px-6 md:px-7 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1F3A5F]/10 flex items-center justify-center">
            <Calendar size={18} className="text-[#1F3A5F]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Subscription Details
            </h2>

            <p className="text-xs text-gray-500 mt-0.5">
              Your current subscription information.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-7">
        {subscription ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Subscription Package
              </p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {subscription.packageName}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Academic Cycle
              </p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {subscription.academicCycle}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Subscription Status
              </p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {subscription.status.toUpperCase()}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                Start Date
              </p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {subscription.startDate}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                End Date
              </p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {subscription.endDate}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <AlertCircle
              size={19}
              className="text-amber-600 mt-0.5 shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Subscription details unavailable
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {subscriptionError ||
                  "No subscription information was returned for your account."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Access Code */}
    {payment.accessCode && payment.accessCode !== "—" && (
      <div className="bg-white border border-[#E4E7EB] rounded-2xl overflow-hidden shadow-sm mb-5">
        <div className="px-6 md:px-7 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
              <Key size={18} className="text-amber-600" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Application Access Code
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Access code returned with your payment record.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-7">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
              Access Code
            </p>

            <p className="text-2xl md:text-3xl font-bold tracking-[0.18em] text-[#1F3A5F] mt-3 break-all">
              {payment.accessCode}
            </p>

            <p className="text-xs text-gray-500 mt-3">
              Keep this code safe and do not share it publicly.
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Payment Confirmation */}
    <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 md:p-7 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="flex items-start gap-3">
          {isPaid ? (
            <CheckCircle2 size={19} className="text-green-600 mt-0.5" />
          ) : (
            <AlertCircle size={19} className="text-amber-600 mt-0.5" />
          )}

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {isPaid ? "Payment Confirmed" : "Payment Not Confirmed"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isPaid
                ? "The payment record indicates success."
                : "Application access should depend on backend payment verification."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck size={19} className="text-[#1F3A5F] mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Application Access
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Access permissions must be confirmed by the backend.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Receipt size={19} className="text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Payment Record
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Transaction details are displayed from the returned record.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-6 pt-5 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
        >
          <FileText size={16} />
          Print Payment Receipt
        </button>

        <button
          type="button"
          onClick={() => void loadPaymentDetails()}
          className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#1F3A5F] text-white text-sm font-semibold hover:bg-[#172D49] transition flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh Details
        </button>
      </div>
    </div>
  </div>
</div>

);
}
