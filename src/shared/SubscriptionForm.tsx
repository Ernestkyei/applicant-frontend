
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  ArrowRight,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Smartphone,
  AlertCircle,
  Calendar,
  Globe,
  MapPin,
  Home,
  ChevronRight,
  Check,
  PhoneCall,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Package {
  name: string;
  price: number;
  code: string;
  features: string[];
  highlight: boolean;
}

export interface FormData {
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

interface SubscriptionFormProps {
  pkg: Package;
  onSubscribe: (data: FormData) => void | Promise<void>;
  loading: boolean;
}

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const MOMO_NETWORKS = [
  "MTN MoMo",
  "Vodafone Cash",
  "AirtelTigo Money",
];

const PERSONAL_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "dateOfBirth",
  "gender",
  "nationality",
  "address",
  "city",
] as const;

type PersonalField = (typeof PERSONAL_FIELDS)[number];

export default function SubscriptionForm({
  pkg,
  onSubscribe,
  loading,
}: SubscriptionFormProps) {
  const [step, setStep] = useState<"details" | "payment">("details");
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "Ghana",
    paymentMethod: "mobile_money",
    momoNetwork: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
        return value.trim() ? "" : "First name is required";

      case "lastName":
        return value.trim() ? "" : "Last name is required";

      case "email":
        if (!value.trim()) return "Email is required";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }

        return "";

      case "phoneNumber":
        if (!value.trim()) return "Phone number is required";

        if (!/^[0-9+\-\s()]{10,15}$/.test(value.trim())) {
          return "Please enter a valid phone number";
        }

        return "";

      case "dateOfBirth":
        if (!value) return "Date of birth is required";

        if (value > new Date().toISOString().slice(0, 10)) {
          return "Date of birth cannot be in the future";
        }

        return "";

      case "gender":
        return value ? "" : "Please select your gender";

      case "nationality":
        return value.trim() ? "" : "Nationality is required";

      case "address":
        return value.trim() ? "" : "Address is required";

      case "city":
        return value.trim() ? "" : "City is required";

      case "momoNetwork":
        return value ? "" : "Please select your mobile money network";

      default:
        return "";
    }
  };

  const handleBlur = (name: string) => {
    setTouched((previous) => ({ ...previous, [name]: true }));

    const value = formData[name as keyof FormData];

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    PERSONAL_FIELDS.forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors((previous) => {
      const updated = { ...previous };

      PERSONAL_FIELDS.forEach((field) => {
        delete updated[field];
      });

      return { ...updated, ...newErrors };
    });

    setTouched((previous) => ({
      ...previous,
      ...Object.fromEntries(
        PERSONAL_FIELDS.map((field) => [field, true]),
      ),
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentStep = (): boolean => {
    const error = validateField("momoNetwork", formData.momoNetwork);

    setErrors((previous) => ({
      ...previous,
      momoNetwork: error,
    }));

    setTouched((previous) => ({
      ...previous,
      momoNetwork: true,
    }));

    return error === "";
  };

  const handleNext = () => {
    if (loading) return;

    setSubmitError("");

    if (validateStep()) {
      setStep("payment");
    }
  };

  const handleBack = () => {
    if (loading) return;

    setSubmitError("");
    setStep("details");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setSubmitError("");

    if (!validateStep() || !validatePaymentStep()) {
      setStep("details");
      return;
    }

    const submission: FormData = {
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender.trim().toUpperCase(),
      nationality: formData.nationality.trim(),
      email: formData.email.trim().toLowerCase(),
      phoneNumber: formData.phoneNumber.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      country: formData.country.trim(),
      paymentMethod: "mobile_money",
      momoNetwork: formData.momoNetwork,
    };

    console.log("Submitting admission subscription", {
      packageCode: pkg.code,
      gender: submission.gender,
      paymentMethod: submission.paymentMethod,
      momoNetwork: submission.momoNetwork,
    });

    try {
      await onSubscribe(submission);
    } catch (error: unknown) {
      console.error("Subscription submission failed:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not start your payment. Please try again.",
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitError("");

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));

    setSubmitError("");
  };

  const getStepNumber = () => (step === "details" ? 1 : 2);

  const renderError = (name: string) => {
    if (!errors[name] || !touched[name]) return null;

    return (
      <p className="flex items-center gap-1 text-xs text-red-500">
        <AlertCircle className="h-3 w-3 shrink-0" />
        {errors[name]}
      </p>
    );
  };

  const renderTextField = (
    name: PersonalField,
    label: string,
    placeholder: string,
    Icon: typeof User,
    options?: {
      type?: string;
      autoComplete?: string;
      max?: string;
    },
  ) => (
    <div key={name} className="space-y-1.5">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-slate-700"
      >
        {label} <span className="text-red-500">*</span>
      </Label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <Input
          id={name}
          name={name}
          type={options?.type ?? "text"}
          autoComplete={options?.autoComplete}
          max={options?.max}
          value={formData[name]}
          onChange={handleInputChange}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          aria-invalid={Boolean(errors[name] && touched[name])}
          aria-describedby={
            errors[name] && touched[name] ? `${name}-error` : undefined
          }
          className="h-11 rounded-xl border-slate-200 bg-slate-50/50 pl-10 focus-visible:ring-[#14213D]"
        />
      </div>

      {renderError(name)}
    </div>
  );

  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-2xl shadow-slate-200/60 transition-all duration-300">
      <CardContent className="p-0">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#14213D] to-[#1F3A5F] px-6 py-8 sm:px-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl" />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Complete Your Subscription
              </h3>

              <p className="mt-1.5 text-sm text-blue-200/80">
                Get your access code after payment confirmation
              </p>
            </div>

            <Badge className="shrink-0 border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
              Step {getStepNumber()} of 2
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-6 sm:px-8">
          <div className="mx-auto flex max-w-md items-center justify-between">
            {[
              { step: 1, label: "Personal" },
              { step: 2, label: "Payment" },
            ].map((item) => {
              const isActive = getStepNumber() === item.step;
              const isCompleted = getStepNumber() > item.step;

              return (
                <div key={item.step} className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      isActive
                        ? "scale-110 bg-[#14213D] text-white shadow-lg ring-4 ring-[#14213D]/10"
                        : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "border border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      item.step
                    )}
                  </div>

                  <div
                    className={`hidden sm:block ${
                      isActive ? "text-[#14213D]" : "text-slate-400"
                    }`}
                  >
                    <p className="text-xs font-medium">{item.label}</p>
                    <p className="text-[10px] text-slate-400">
                      {item.step === 1 ? "Your details" : "Mobile Money"}
                    </p>
                  </div>

                  {item.step < 2 && (
                    <ChevronRight className="hidden h-4 w-4 text-slate-300 sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-8 sm:px-8">
          <form onSubmit={handleSubmit} noValidate>
            {step === "details" && (
              <div className="space-y-6">
                {/* Access code notice */}
                <div className="rounded-xl border border-blue-100/80 bg-blue-50/80 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-blue-100 p-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        No Password Needed
                      </p>

                      <p className="text-xs leading-5 text-blue-600/80">
                        You will receive an{" "}
                        <strong>Access Code</strong> after your payment is
                        confirmed, allowing you to access your application.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Names */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderTextField(
                    "firstName",
                    "First Name",
                    "Enter your first name",
                    User,
                    { autoComplete: "given-name" },
                  )}

                  {renderTextField(
                    "lastName",
                    "Last Name",
                    "Enter your last name",
                    User,
                    { autoComplete: "family-name" },
                  )}
                </div>

                {/* Email and phone */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderTextField(
                    "email",
                    "Email Address",
                    "you@example.com",
                    Mail,
                    {
                      type: "email",
                      autoComplete: "email",
                    },
                  )}

                  {renderTextField(
                    "phoneNumber",
                    "Phone Number",
                    "0244-123-456",
                    Phone,
                    { type: "tel", autoComplete: "tel" },
                  )}
                </div>

                {/* Date of birth and gender */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderTextField(
                    "dateOfBirth",
                    "Date of Birth",
                    "Select your date of birth",
                    Calendar,
                    {
                      type: "date",
                      autoComplete: "bday",
                      max: new Date().toISOString().slice(0, 10),
                    },
                  )}

                  {/* Modern gender selector */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Gender <span className="text-red-500">*</span>
                    </Label>

                    <div
                      className="grid grid-cols-2 gap-3"
                      role="group"
                      aria-label="Select gender"
                    >
                      {GENDER_OPTIONS.map((option) => {
                        const isSelected =
                          formData.gender === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            disabled={loading}
                            aria-pressed={isSelected}
                            onClick={() =>
                              handleSelectChange("gender", option.value)
                            }
                            className={`flex h-11 items-center justify-between gap-2 rounded-xl border-2 px-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14213D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 ${
                              isSelected
                                ? "border-[#14213D] bg-blue-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <span
                              className={`text-sm font-medium ${
                                isSelected
                                  ? "text-[#14213D]"
                                  : "text-slate-600"
                              }`}
                            >
                              {option.label}
                            </span>

                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                isSelected
                                  ? "border-[#14213D] bg-[#14213D] text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {renderError("gender")}
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  {renderTextField(
                    "nationality",
                    "Nationality",
                    "e.g. Ghanaian",
                    Globe,
                    { autoComplete: "country-name" },
                  )}
                </div>

                {/* Address and city */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderTextField(
                    "address",
                    "Address",
                    "Enter your street address",
                    Home,
                    { autoComplete: "street-address" },
                  )}

                  {renderTextField(
                    "city",
                    "City",
                    "e.g. Accra",
                    MapPin,
                    { autoComplete: "address-level2" },
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-[#14213D] font-semibold text-white hover:bg-[#0F1A30]"
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-6">
                {/* Package summary */}
                <div className="rounded-xl border border-amber-100/80 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#14213D] p-2.5">
                        <Smartphone className="h-5 w-5 text-amber-400" />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Selected Package
                        </p>
                        <p className="font-bold text-slate-900">
                          {pkg.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">Total</p>
                      <p className="text-2xl font-bold text-[#14213D]">
                        GHS {pkg.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Money selection */}
                <div>
                  <Label className="mb-3 block text-sm font-medium text-slate-700">
                    Select Mobile Money Network{" "}
                    <span className="text-red-500">*</span>
                  </Label>

                  <div className="grid grid-cols-1 gap-3">
                    {MOMO_NETWORKS.map((network) => {
                      const isSelected = formData.momoNetwork === network;

                      return (
                        <label
                          key={network}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                            isSelected
                              ? "border-[#14213D] bg-blue-50/50 shadow-md"
                              : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/30"
                          } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                        >
                          <input
                            type="radio"
                            name="momoNetwork"
                            value={network}
                            checked={isSelected}
                            disabled={loading}
                            onChange={(e) =>
                              handleSelectChange(
                                "momoNetwork",
                                e.target.value,
                              )
                            }
                            className="sr-only"
                          />

                          <div
                            className={`rounded-lg p-2.5 ${
                              isSelected
                                ? "bg-[#14213D] text-white"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <PhoneCall className="h-5 w-5" />
                          </div>

                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                isSelected
                                  ? "text-[#14213D]"
                                  : "text-slate-700"
                              }`}
                            >
                              {network}
                            </p>

                            <p className="text-xs text-slate-400">
                              Pay with {network}
                            </p>
                          </div>

                          {isSelected && (
                            <Check className="h-5 w-5 text-[#14213D]" />
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {renderError("momoNetwork")}
                </div>

                {/* Security notice */}
                <div className="flex items-start gap-3 rounded-xl border border-emerald-100/80 bg-emerald-50/80 p-4">
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      Secure Payment + Access Code
                    </p>

                    <p className="text-xs leading-5 text-emerald-600/80">
                      Your access code should only be issued after the
                      backend confirms successful payment.
                    </p>
                  </div>
                </div>

                {/* Submission error */}
                {submitError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={loading}
                    className="h-12 flex-1 rounded-xl"
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 flex-[2] rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 font-semibold text-white hover:from-amber-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <PhoneCall className="h-4 w-4" />
                        Pay GHS {pkg.price} via Mobile Money
                      </span>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    After payment verification, follow the instructions
                    to receive your access code.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}