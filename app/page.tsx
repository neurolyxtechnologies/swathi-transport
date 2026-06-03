import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import CoverageMap from "@/components/sections/CoverageMap";
import WhyUs from "@/components/sections/WhyUs";
import FleetTata from "@/components/sections/FleetTata";
import Testimonials from "@/components/sections/Testimonials";
import TrackingDemo from "@/components/sections/TrackingDemo";
import QuoteForm from "@/components/sections/QuoteForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <CoverageMap />
        <WhyUs />
        <FleetTata />
        <Testimonials />
        <TrackingDemo />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
