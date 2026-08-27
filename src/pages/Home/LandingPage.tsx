// src/pages/Home/LandingPage.tsx

import { Link } from "react-router-dom";
import { Send, ArrowRight,  Shield, Clock, FileCheck, Award } from "lucide-react";
import { Header } from "../../components/common/Header";
import heroImage from "../../assets/background.jpg";

const steps = [
  {
    number: "01",
    title: "Subscribe",
    text: "Choose a package and pay securely through Paystack to receive your access code.",
    icon: Shield,
    color: "blue",
  },
  {
    number: "02",
    title: "Unlock the form",
    text: "Enter your access code to unlock the application form and start filling it in.",
    icon: Clock,
    color: "amber",
  },
  {
    number: "03",
    title: "Submit documents",
    text: "Upload your WASSCE results, ID, and passport photo — we'll track everything.",
    icon: FileCheck,
    color: "green",
  },
  {
    number: "04",
    title: "Track your decision",
    text: "Follow your application status live, from submitted to final decision.",
    icon: Award,
    color: "purple",
  },
] as const;

export default function LandingPage() {


  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 py-20 md:py-28 max-w-[900px] mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm text-amber-400 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider mb-6 border border-amber-500/20">
  
            2026/2027 ADMISSIONS NOW OPEN
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Apply with confidence. <br />
            <span className="text-amber-400">Track every step.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-200/90 leading-relaxed max-w-2xl mb-10">
            One portal to check your eligibility, submit your documents, and follow your application
            from submission to decision — no guesswork, no queueing at the registrar's office.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/subscription"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              <Send size={18} /> 
              Get Started
            </Link>
            <Link
              to="/access-code"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Enter Access Code
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white px-6 md:px-12 py-20 md:py-24 w-full">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-sm font-semibold tracking-wider uppercase mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How it <span className="text-amber-500">works</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Four simple steps to get your application started and track it through to decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const colorClasses = {
                blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
                amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
                green: "bg-green-50 text-green-600 group-hover:bg-green-100",
                purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
              };

              return (
                <div
                  key={step.number}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`p-4 rounded-xl ${colorClasses[step.color]} transition-all duration-300 mb-4`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl font-bold text-gray-200 mb-1">{step.number}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 md:px-12 py-16 w-full">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start your <span className="text-amber-400">application journey</span>?
          </h2>
          <p className="text-gray-300 text-base mb-8 max-w-lg mx-auto">
            Subscribe now to get your access code and begin your application today.
          </p>
          <Link
            to="/subscription"
            className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 md:px-12 py-8 text-center w-full border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 font-mono">© 2026 Admissions Registry — Admission Eligibility System</p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}