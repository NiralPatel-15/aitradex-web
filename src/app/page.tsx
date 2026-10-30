import Navbar from "@/components/landing/Navbar/Navbar";
import Hero from "@/components/landing/Hero/Hero";
import Trusted from "@/components/landing/Trusted/Trusted";
import Market from "@/components/landing/Market/Market";
import Why from "@/components/landing/Why/Why";
import Features from "@/components/landing/Features/Features";
import AI from "@/components/landing/AI/AI";
import Investment from "@/components/landing/Investment/Investment";
import Security from "@/components/landing/Security/Security";
import Testimonials from "@/components/landing/Testimonials/Testimonials";
import FAQ from "@/components/landing/FAQ/FAQ";
import CTA from "@/components/landing/CTA/CTA";
import Footer from "@/components/landing/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Market />
      <Why />
      <Features />
      <AI />
      <Investment />
      <Security />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}