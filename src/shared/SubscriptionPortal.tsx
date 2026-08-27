import { useState } from "react";
import { Header } from "@/components/common/Header";
import PackageCard from "../shared/PackageCard";
import SubscriptionForm from "../shared/SubscriptionForm";
import GeneratedCode from "../shared/GeneratedCode";

const PACKAGES = [
  { 
    name: "Undergraduate", 
    price: 200, 
    code: "UNDERGRAD", 
    features: [
      "First-degree programs (BSc, BA, LLB)", 
      "Document upload & tracking", 
      "Email status updates"
    ], 
    highlight: false 
  },
  { 
    name: "Postgraduate", 
    price: 300, 
    code: "POSTGRAD", 
    features: [
      "Masters & MPhil programs", 
      "Priority document review", 
      "Direct registrar support line"
    ], 
    highlight: true 
  },
  { 
    name: "International", 
    price: 400, 
    code: "INTERNATIONAL", 
    features: [
      "Non-Ghanaian applicants", 
      "Priority document review", 
      "Direct registrar support line"
    ], 
    highlight: false 
  },
];

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
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  paymentMethod: string;
}

export default function SubscriptionPortal() {
  const [selected, setSelected] = useState<Package>(PACKAGES[0]);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSelect = (pkg: Package) => {
    setSelected(pkg);
    setSubscribed(false);
  };

  const handleSubscribe = async (formData: FormData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form Data:', formData);
    console.log('Selected Package:', selected);
    setLoading(false);
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {!subscribed ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Choose Your Package
              </h1>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                Select a package, create your account, and complete payment to get your access code.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {PACKAGES.map((pkg) => (
                <PackageCard 
                  key={pkg.code} 
                  pkg={pkg} 
                  selected={selected.code === pkg.code} 
                  onSelect={handleSelect} 
                />
              ))}
            </div>

            <SubscriptionForm 
              pkg={selected} 
              onSubscribe={handleSubscribe} 
              loading={loading} 
            />
          </>
        ) : (
          <GeneratedCode pkg={selected} />
        )}
      </div>
    </div>
  );
}