import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PackageCard from "../shared/PackageCard";
import SubscriptionForm from "../shared/SubscriptionForm";
import GeneratedCode from "../shared/GeneratedCode";

import {
  createSubscription,
  getAvailablePackages,
} from "../endpoints/subscriptionEndpoint";

import { verifyPayment } from "../endpoints/paymentEndpoint";

interface Package {
  name: string;
  price: number;
  code: string;
  features: string[];
  highlight: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: string;
  momoNetwork: string;
}

const STORAGE_ACCESS_CODE = "accessCode";
const STORAGE_PACKAGE_CODE = "packageCode";
const STORAGE_PENDING_PACKAGE = "pendingPackageCode";

function readStorage(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode); ignore.
  }
}

function removeStorage(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function unwrapResponse(response: any): any {
  let result = response;

  for (let i = 0; i < 4; i++) {
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      result.data !== undefined
    ) {
      result = result.data;
    } else {
      break;
    }
  }

  return result;
}

function normalizePackages(response: any): Package[] {
  const result = unwrapResponse(response);

  const list = Array.isArray(result) ? result : result?.packages;

  if (!Array.isArray(list)) {
    throw new Error("The backend did not return a valid package list.");
  }

  return list
    .filter((pkg: any) => pkg.active !== false)
    .map((pkg: any) => ({
      name: String(pkg.name ?? pkg.title ?? ""),
      code: String(pkg.code ?? pkg.type ?? pkg.packageCode ?? ""),
      price: Number(pkg.price ?? 0),
      features: Array.isArray(pkg.features) ? pkg.features : [],
      highlight: Boolean(pkg.highlight),
    }))
    .filter(
      (pkg: Package) => pkg.name && pkg.code && Number.isFinite(pkg.price)
    );
}

function getPackage(value: any, packages: Package[]): Package | undefined {
  const code = String(
    value?.packageCode ??
      value?.package_code ??
      value?.package?.code ??
      value?.package?.type ??
      value?.subscription?.packageCode ??
      value?.subscription?.package_code ??
      value?.subscription?.package?.code ??
      value?.subscription?.package?.type ??
      value?.type ??
      value?.code ??
      ""
  ).toUpperCase();

  const name = String(
    value?.packageName ??
      value?.package_name ??
      value?.package?.name ??
      value?.subscription?.packageName ??
      value?.subscription?.package_name ??
      value?.subscription?.package?.name ??
      ""
  ).toLowerCase();

  return packages.find(
    (pkg) =>
      (code && pkg.code.toUpperCase() === code) ||
      (name && pkg.name.toLowerCase() === name)
  );
}

function getAccessCode(value: any): string | null {
  const candidate =
    value?.accessCode ??
    value?.access_code ??
    value?.subscription?.accessCode ??
    value?.subscription?.access_code ??
    value?.application?.accessCode ??
    value?.application?.access_code ??
    value?.payment?.accessCode ??
    value?.payment?.access_code;

  return typeof candidate === "string" && candidate.trim()
    ? candidate.trim()
    : null;
}

function isVerifiedPayment(value: any): boolean {
  const status = String(
    value?.paymentStatus ??
      value?.payment_status ??
      value?.transactionStatus ??
      value?.transaction_status ??
      value?.payment?.status ??
      value?.status ??
      ""
  ).toLowerCase();

  return (
    value?.verified === true ||
    value?.payment?.verified === true ||
    ["success", "successful", "paid", "completed"].includes(status)
  );
}

// The backend wraps its result in several layers
// ({ status, data: { ...paystack }, accessCode }), so check every layer.
function findAccessCode(response: any): string | null {
  let layer = response;

  for (let i = 0; i < 5 && layer && typeof layer === "object"; i++) {
    const code = getAccessCode(layer);
    if (code) return code;
    layer = layer.data;
  }

  return null;
}

function isVerifiedResponse(response: any): boolean {
  let layer = response;

  for (let i = 0; i < 5 && layer && typeof layer === "object"; i++) {
    if (isVerifiedPayment(layer)) return true;
    layer = layer.data;
  }

  return false;
}

function findPackageInResponse(
  response: any,
  packages: Package[]
): Package | undefined {
  let layer = response;

  for (let i = 0; i < 5 && layer && typeof layer === "object"; i++) {
    const match =
      getPackage(layer, packages) ?? getPackage(layer.metadata, packages);
    if (match) return match;
    layer = layer.data;
  }

  return undefined;
}

function getCheckoutUrl(value: any): string | null {
  const payment = value?.payment ?? value?.data?.payment ?? value;

  const candidate =
    payment?.authorizationUrl ??
    payment?.authorization_url ??
    payment?.checkoutUrl ??
    payment?.checkout_url;

  return typeof candidate === "string" && candidate.trim()
    ? candidate.trim()
    : null;
}

interface SubscriptionPortalProps {
  forceGeneratedCode?: boolean;
}

export default function SubscriptionPortal({
  forceGeneratedCode = false,
}: SubscriptionPortalProps) {
  const navigate = useNavigate();
  const verifiedReferenceRef = useRef<string | null>(null);

  const [packages, setPackages] = useState<Package[]>([]);
  const [selected, setSelected] = useState<Package | null>(null);

  const [packagesLoading, setPackagesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [subscribed, setSubscribed] = useState(false);
  const [accessCode, setAccessCode] = useState<string | null>(() =>
    forceGeneratedCode ? readStorage(STORAGE_ACCESS_CODE) : null
  );
  const [error, setError] = useState<string | null>(null);

  const shouldShowGeneratedCode = forceGeneratedCode || subscribed;

  // Load available packages from the backend.
  useEffect(() => {
    let cancelled = false;

    const loadPackages = async () => {
      setPackagesLoading(true);

      try {
        const response = await getAvailablePackages();
        const availablePackages = normalizePackages(response);

        if (cancelled) return;

        if (availablePackages.length === 0) {
          setError("No subscription packages are currently available.");
          return;
        }

        setPackages(availablePackages);

        setSelected((current) => {
          const storedCode = forceGeneratedCode
            ? readStorage(STORAGE_PACKAGE_CODE)
            : null;
          const preferred = storedCode ?? current?.code;

          return (
            availablePackages.find((pkg) => pkg.code === preferred) ??
            availablePackages[0]
          );
        });
      } catch (err: unknown) {
        if (cancelled) return;

        console.error("Failed to load subscription packages:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load subscription packages. Please try again."
        );
      } finally {
        if (!cancelled) {
          setPackagesLoading(false);
        }
      }
    };

    void loadPackages();

    return () => {
      cancelled = true;
    };
  }, [forceGeneratedCode]);

  const handleSelect = (pkg: Package) => {
    if (loading || verifying) return;

    setSelected(pkg);
    setSubscribed(false);
    setAccessCode(null);
    setError(null);
  };

  // Create subscription and initialize payment.
  const handleSubscribe = async (formData: FormData) => {
    if (loading || verifying || !selected) return;

    setLoading(true);
    setError(null);
    setAccessCode(null);
    setSubscribed(false);

    try {
      const response = await createSubscription({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        momoNetwork: formData.momoNetwork,
        type: selected.code,
      });

      const result = unwrapResponse(response);
      const checkoutUrl = getCheckoutUrl(result);

      if (!checkoutUrl) {
        console.error(
          "No checkout URL was returned by the subscription API:",
          result
        );

        setError(
          "Your subscription was received, but no checkout URL was returned. Please check the backend payment initialization."
        );

        return;
      }

      // Remember the chosen package so it can be shown after payment.
      writeStorage(STORAGE_PENDING_PACKAGE, selected.code);

      // Redirect the applicant to the payment provider.
      window.location.assign(checkoutUrl);
    } catch (err: unknown) {
      console.error("Subscription creation failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to initialize your subscription. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify payment after the applicant returns from checkout.
  const verifyReturnedPayment = useCallback(async () => {
    // Wait for packages so the correct package can be displayed after payment.
    if (packagesLoading) return;

    const params = new URLSearchParams(window.location.search);

    const reference =
      params.get("reference") ??
      params.get("trxref") ??
      params.get("transaction_reference");

    const callbackStatus = (
      params.get("status") ??
      params.get("payment_status") ??
      ""
    ).toLowerCase();

    if (!reference) {
      if (["cancelled", "canceled", "failed"].includes(callbackStatus)) {
        setError("Payment was cancelled or failed. You can try again.");
      }

      return;
    }

    // Prevent verifying the same reference twice (e.g. React StrictMode).
    if (verifiedReferenceRef.current === reference) return;
    verifiedReferenceRef.current = reference;

    setVerifying(true);
    setError(null);

    try {
      const response = await verifyPayment({ reference });

      if (!isVerifiedResponse(response)) {
        setAccessCode(null);
        setSubscribed(false);

        setError(
          "Payment has not been confirmed by the backend. If money was deducted, please contact support."
        );

        return;
      }

      const code = findAccessCode(response);

      if (!code) {
        setAccessCode(null);
        setSubscribed(false);

        setError(
          "Payment was verified, but no application access code was returned. Please contact support."
        );

        return;
      }

      const matchingPackage = findPackageInResponse(response, packages);
      const packageCode =
        matchingPackage?.code ?? readStorage(STORAGE_PENDING_PACKAGE);

      if (matchingPackage) {
        setSelected(matchingPackage);
      } else if (packageCode) {
        const stored = packages.find((pkg) => pkg.code === packageCode);
        if (stored) setSelected(stored);
      }

      // Persist so the generated-code page can display them after navigation.
      writeStorage(STORAGE_ACCESS_CODE, code);
      if (packageCode) writeStorage(STORAGE_PACKAGE_CODE, packageCode);
      removeStorage(STORAGE_PENDING_PACKAGE);

      setAccessCode(code);
      setSubscribed(true);

      // Remove callback parameters after successful verification.
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err: unknown) {
      console.error("Payment verification failed:", err);

      verifiedReferenceRef.current = null;

      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify your payment. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  }, [packages, packagesLoading]);

  useEffect(() => {
    void verifyReturnedPayment();
  }, [verifyReturnedPayment]);

  // After a verified payment, move to the generated-code page.
  useEffect(() => {
    if (!shouldShowGeneratedCode || forceGeneratedCode || !accessCode) {
      return;
    }

    navigate("/subscription/generated-code", { replace: true });
  }, [shouldShowGeneratedCode, forceGeneratedCode, accessCode, navigate]);

  // Opening the code page directly with no saved code sends the user back.
  useEffect(() => {
    if (forceGeneratedCode && !packagesLoading && !accessCode) {
      navigate("/subscription", { replace: true });
    }
  }, [forceGeneratedCode, packagesLoading, accessCode, navigate]);

  if (packagesLoading || verifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#14213D]" />

          <h2 className="text-lg font-semibold text-gray-900">
            {packagesLoading
              ? "Loading subscription packages"
              : "Verifying your payment"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {packagesLoading
              ? "Please wait while we retrieve the available packages."
              : "Please wait while confirms your transaction."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[900px] px-6 py-12">
        {!shouldShowGeneratedCode ? (
          <>
            <div className="mb-10 text-center">
              <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
                Choose Your Package
              </h1>

              <p className="mx-auto max-w-md text-sm text-gray-600">
                Select a package, provide your details, and complete payment to
                receive your access code.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {packages.length > 0 && (
              <>
                <div className="mb-10 flex flex-col gap-6 md:flex-row">
                  {packages.map((pkg) => (
                    <PackageCard
                      key={pkg.code}
                      pkg={pkg}
                      selected={selected?.code === pkg.code}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>

                {selected && (
                  <SubscriptionForm
                    pkg={selected}
                    onSubscribe={handleSubscribe}
                    loading={loading || verifying}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {accessCode && selected && (
              <GeneratedCode pkg={selected} accessCode={accessCode} />
            )}
          </>
        )}
      </div>
    </div>
  );
}