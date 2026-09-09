// src/components/home/HeroSection.tsx

import { Link } from "react-router-dom";
import { 
  Send, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import heroImage from "../../assets/background.jpg";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        
        {/* Decorative gradient circles with image blur effect */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full px-6 md:px-12 py-12">
          <div className="max-w-[900px] mx-auto">
            {/* Animated badge */}
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm text-amber-400 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider mb-4 border border-amber-500/30 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Sparkles className="h-3 w-3 animate-pulse" />
              2026/2027 ADMISSIONS NOW OPEN
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Apply with confidence. <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Track every step.</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-200/90 leading-relaxed max-w-2xl mb-6 transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              One portal to check your eligibility, submit your documents, and follow your application
              from submission to decision — no guesswork, no queueing at the registrar's office.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-3 items-start transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/subscription"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1"
              >
                <Send size={18} /> 
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/access-code"
                className="group bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                Enter Access Code
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center gap-2 text-gray-300 text-sm ml-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}