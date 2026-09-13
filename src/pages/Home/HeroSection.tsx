// src/pages/Home/LandingPage.tsx

import { useState, useEffect } from "react";
import HeroSection from "../../components/home/HeroSection";
import StepsSection from "../../components/home/StepsSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import GallerySection from "../../components/home/GallerySection";
import CTASection from "../../components/home/CTASection";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <HeroSection isVisible={isVisible} />
      <StepsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <GallerySection />
      <CTASection />
    </div>
  );
}