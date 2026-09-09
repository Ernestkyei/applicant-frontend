// src/components/home/StepsSection.tsx

import { Shield, Clock, FileCheck, Award, CheckCircle, Sparkles } from "lucide-react";

type StepColor = "blue" | "amber" | "green" | "purple";

const steps = [
  {
    number: "01",
    title: "Subscribe",
    text: "Choose a package and pay securely through Paystack to receive your access code.",
    icon: Shield,
    color: "blue" as StepColor,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    features: ["Multiple payment options", "Instant access code delivery", "Secure transaction"],
  },
  {
    number: "02",
    title: "Unlock the form",
    text: "Enter your access code to unlock the application form and start filling it in.",
    icon: Clock,
    color: "amber" as StepColor,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    features: ["Real-time validation", "Auto-save progress", "Guided form filling"],
  },
  {
    number: "03",
    title: "Submit documents",
    text: "Upload your WASSCE results, ID, and passport photo — we'll track everything.",
    icon: FileCheck,
    color: "green" as StepColor,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
    features: ["Multiple file formats", "Secure storage", "Instant confirmation"],
  },
  {
    number: "04",
    title: "Track your decision",
    text: "Follow your application status live, from submitted to final decision.",
    icon: Award,
    color: "purple" as StepColor,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    features: ["Real-time updates", "Email notifications", "Status timeline"],
  },
] as const;

export default function StepsSection() {
  const getStepColorClasses = (color: StepColor) => {
    const classes = {
      blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100 border-blue-100",
      amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100 border-amber-100",
      green: "bg-green-50 text-green-600 group-hover:bg-green-100 border-green-100",
      purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100 border-purple-100",
    };
    return classes[color];
  };

  return (
    <section className="bg-white px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-3 border border-amber-200/50">
            <Sparkles className="h-3 w-3" />
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            How it <span className="text-amber-500">works</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Four simple steps to get your application started and track it through to decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const colorClass = getStepColorClasses(step.color);

            return (
              <div
                key={step.number}
                className="group relative flex flex-col rounded-2xl bg-white hover:shadow-2xl hover:shadow-gray-100/80 transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-amber-200 overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-3 text-4xl font-bold text-white/30 select-none">
                    {step.number}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className={`p-2.5 rounded-xl ${colorClass} transition-all duration-300 mb-3 w-fit`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{step.text}</p>
                  
                  <ul className="space-y-1">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-amber-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}