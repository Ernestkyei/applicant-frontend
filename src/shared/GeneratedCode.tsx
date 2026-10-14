
import { useState } from "react";

interface GeneratedCodeProps {
  pkg: {
    name: string;
    price: number;
    code: string;
    features?: string[];
    highlight?: boolean;
  };
  accessCode: string;
  verifyPayment?: (reference: string) => Promise<any>;
}

export default function GeneratedCode({
  pkg,
  accessCode,
  verifyPayment,
}: GeneratedCodeProps) {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerifyPayment = async () => {
    if (!verifyPayment) {
      setMessage("Payment verification is not configured yet.");
      return;
    }

    if (!reference.trim()) {
      setMessage("Please enter your payment reference.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await verifyPayment(reference.trim());

      const result = response?.data ?? response;
      const status = String(result?.status ?? "").toLowerCase();

      if (
        result?.verified === true ||
        result?.success === true ||
        status === "success" ||
        status === "successful" ||
        status === "completed" ||
        status === "paid"
      ) {
        setVerified(true);
        setMessage("Payment verification completed.");
      } else {
        setVerified(false);
        setMessage(
          result?.message ??
            "Payment has not been confirmed. Please try again."
        );
      }
    } catch (error) {
      setVerified(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to verify payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setMessage("Access code copied.");
    } catch {
      setMessage("Could not copy the code. Please select and copy it manually.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        {verified ? "Subscription Confirmed" : "Complete Your Subscription"}
      </h2>

      <p className="mt-2 text-gray-600">
        Package: <strong>{pkg.name}</strong>
      </p>

      <p className="mt-1 text-gray-600">
        Amount: <strong>GHS {pkg.price}</strong>
      </p>

      {!verified ? (
        <div className="mt-6 space-y-4">
          <label
            htmlFor="payment-reference"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Reference
          </label>

          <input
            id="payment-reference"
            type="text"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="Enter your payment reference"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="button"
            onClick={handleVerifyPayment}
            disabled={loading || !verifyPayment}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Payment"}
          </button>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">
            Your Access Code
          </h3>

          <p className="mt-2 break-all font-mono text-lg text-green-900">
            {accessCode}
          </p>

          <button
            type="button"
            onClick={handleCopyCode}
            className="mt-4 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
          >
            Copy Access Code
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 text-sm text-gray-700" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

