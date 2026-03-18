"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductPreview } from "@/components/ProductPreview";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustedBy } from "@/components/TrustedBy";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Docs } from "@/components/Docs";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { StarBackground } from "@/components/StarBackground";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-blue-500/30 overflow-x-hidden">
      <StarBackground />
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <TrustedBy />
        <ProductPreview />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Docs />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>

      {/* Global Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
