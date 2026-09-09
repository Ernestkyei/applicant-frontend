// src/pages/Home/LandingPage.tsx

import { useState, useEffect, useRef } from "react";
import { Header } from "../../components/common/Header";
import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import StepsSection from "../../components/home/StepsSection";
import FeaturesSection from "../../components/home/FeaturesSection"
import TestimonialsSection from "../../components/home/TestimonialsSection";
import GallerySection from "../../components/home/GallerySection";
import CTASection from "../../components/home/GallerySection";
import Footer from "../../components/home/Footer";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounts();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounts = () => {
    const targetValues = [10000, 95, 24, 100];
    const duration = 2000;
    const steps = 60;
    const increment = targetValues.map((val) => val / steps);
    let current = [0, 0, 0, 0];
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = current.map((c, i) => Math.min(c + increment[i], targetValues[i]));
      setCounts(current.map((c) => Math.round(c)));
      
      if (step >= steps) {
        clearInterval(interval);
        setCounts(targetValues);
      }
    }, duration / steps);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />
      <HeroSection isVisible={isVisible} />
      <StatsSection ref={statsRef} counts={counts} />
      <StepsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <GallerySection />
      <CTASection />
      <Footer />
    </div>
  );
}