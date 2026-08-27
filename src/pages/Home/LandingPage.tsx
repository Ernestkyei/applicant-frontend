import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Header } from "../../components/common/Header";

// FIX: Define heroImage - Use a placeholder image
const heroImage = "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&h=400&fit=crop";

const PROGRAMS = [
  "BSc Computer Science",
  "BSc Nursing",
  "BA Economics",
  "BSc Civil Engineering",
  "LLB Law",
  "BSc Pharmacy",
  "BSc Business Administration",
  "BA Sociology",
];

function checkEligibility(aggregate: number, program: string): boolean {
  const cutoffs: Record<string, number> = {
    "BSc Computer Science": 12,
    "BSc Nursing": 10,
    "BA Economics": 14,
    "BSc Civil Engineering": 12,
    "LLB Law": 8,
    "BSc Pharmacy": 9,
    "BSc Business Administration": 15,
    "BA Sociology": 18,
  };
  const cutoff = cutoffs[program] ?? 15;
  return aggregate <= cutoff;
}

function EligibilityChecker() {
  const [aggregate, setAggregate] = useState("");
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [result, setResult] = useState<boolean | null>(null);

  const handleCheck = () => {
    const agg = parseInt(aggregate, 10);
    if (!agg || isNaN(agg)) return;
    setResult(checkEligibility(agg, program));
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-7 shadow-lg w-[380px]">
      <div className="text-[10.5px] text-amber-700 tracking-wider mb-1.5 font-medium">
        ELIGIBILITY CHECK
      </div>
      <div className="text-[17px] font-semibold text-gray-900 mb-4">
        See where you stand — before you apply.
      </div>

      <label className="text-xs text-gray-600 font-medium">WASSCE aggregate</label>
      <input
        value={aggregate}
        onChange={(e) => setAggregate(e.target.value.replace(/\D/g, ""))}
        placeholder="e.g. 12"
        className="w-full mt-1.5 mb-4 px-3 py-2.5 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="text-xs text-gray-600 font-medium">Program</label>
      <select
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        className="w-full mt-1.5 mb-5 px-3 py-2.5 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {PROGRAMS.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <button
        onClick={handleCheck}
        className="w-full py-3 bg-blue-900 text-white rounded-md font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-blue-800 transition"
      >
        Check my eligibility <ArrowRight size={15} />
      </button>

      {result !== null && (
        <div
          className={`mt-4 px-4 py-3.5 rounded-md flex items-center gap-2.5 ${
            result ? "bg-green-50 border border-green-700" : "bg-red-50 border border-red-700"
          }`}
        >
          {result ? <CheckCircle2 size={20} className="text-green-700" /> : <XCircle size={20} className="text-red-700" />}
          <div className="text-sm text-gray-900 font-medium">
            {result
              ? `You likely qualify for ${program}.`
              : `Your aggregate is above the typical cutoff for ${program}.`}
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="text-3xl font-semibold text-amber-700 leading-none">{number}</div>
      <div>
        <div className="text-sm font-semibold text-gray-900 mb-1">{title}</div>
        <div className="text-sm text-gray-600 leading-relaxed max-w-[280px]">{text}</div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />

      {/* Hero with Background Image */}
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%', 
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center px-6 md:px-12 py-12 md:py-16 max-w-[1200px] mx-auto gap-10 lg:gap-14 w-full">
          <div className="max-w-[460px] text-center lg:text-left">
            <div className="text-[11px] text-amber-400 tracking-[0.1em] mb-3 font-medium">
              2026/2027 ADMISSIONS NOW OPEN
            </div>
            <h1 className="text-3xl md:text-[38px] font-bold text-white leading-tight mb-4">
              Apply with confidence. Track every step.
            </h1>
            <p className="text-sm md:text-[14px] text-gray-200 leading-relaxed mb-6">
              One portal to check your eligibility, submit your documents, and follow your application
              from submission to decision — no guesswork, no queueing at the registrar's office.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/subscription"
                className="bg-amber-600 text-white border-none px-6 py-3 rounded-md text-xs cursor-pointer flex items-center justify-center gap-2 hover:bg-amber-700 transition"
              >
                <Send size={15} /> Subscribe to get your access code
              </Link>
              <Link
                to="/auth/login"
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-md text-sm font-semibold cursor-pointer hover:bg-white/30 transition flex items-center gap-2"
              >
                Sign in
              </Link>
            </div>
          </div>
          <EligibilityChecker />
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white px-6 md:px-12 py-16 md:py-[70px] border-y border-gray-200 w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-2xl md:text-[24px] font-semibold text-gray-900 mb-8 md:mb-11">
            How it works
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Step number="01" title="Subscribe" text="Choose a package and pay through our secure Paystack checkout to receive your access code." />
            <Step number="02" title="Unlock the form" text="Enter your access code to unlock the application form and start filling it in." />
            <Step number="03" title="Submit documents" text="Upload your WASSCE results, ID, and passport photo — we'll tell you if anything's missing." />
            <Step number="04" title="Track your decision" text="Follow your application status live, from submitted to under review to final decision." />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 md:px-12 py-8 text-center w-full">
        <div className="text-[11px] text-gray-500 font-mono">© 2026 Admissions Registry — Admission Eligibility System</div>
      </footer>
    </div>
  );
}