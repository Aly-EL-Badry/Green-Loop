import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        {/* Decorative green rotated rectangle - spans from hero right to sponsors left */}
        <div
          className="absolute top-[20%] w-[140vh] h-[140vh] bg-eco-100 rounded-3xl z-0 pointer-events-none"
          style={{ transform: "rotate(45deg)", right: "calc(-10% - 200px)" }}
        />
        <HeroSection />
        <SponsorsSection />
      </div>
      <Footer />
    </>
  );
}
