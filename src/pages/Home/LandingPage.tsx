// src/pages/Home/LandingPage.tsx

import { useState, useEffect } from "react";
import { Header } from "../../components/common/Header";
import HeroSection from "../../components/home/HeroSection";
import StepsSection from "../../components/home/StepsSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import GallerySection from "../../components/home/GallerySection";
import CTASection from "../../components/home/CTASection";
import Footer from "../../components/home/Footer";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />
      <HeroSection isVisible={isVisible} />

      <div id="how-it-works" className="scroll-mt-28">
        <StepsSection />
      </div>

      <div id="programs" className="scroll-mt-28">
        <FeaturesSection />
      </div>

      <TestimonialsSection />
      <GallerySection />
      <CTASection />
      <Footer />
    </div>
  );
}