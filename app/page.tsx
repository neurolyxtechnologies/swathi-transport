import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import PTLDivision from "@/components/sections/PTLDivision";
import HowItWorks from "@/components/sections/HowItWorks";
import CoverageMap from "@/components/sections/CoverageMap";
import Technology from "@/components/sections/Technology";
import Strengths from "@/components/sections/Strengths";
import CoreValues from "@/components/sections/CoreValues";
import Customers from "@/components/sections/Customers";
import QuoteForm from "@/components/sections/QuoteForm";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PTLDivision />
        <HowItWorks />
        <CoverageMap />
        <Technology />
        <Strengths />
        <CoreValues />
        <Customers />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
