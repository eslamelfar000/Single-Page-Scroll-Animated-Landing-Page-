import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./hooks/useLenis";
import { useCursor } from "./hooks/useCursor";
import LoadingScreen from "./components/LoadingScreen";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import LayeredDepthSection from "./components/LayeredDepthSection";
import WorkSection from "./components/WorkSection";
import PhilosophySection from "./components/PhilosophySection";
import CardSwiperSection from "./components/CardSwiperSection";
import ServicesSection from "./components/ServicesSection";
import SplitRevealSection from "./components/SplitRevealSection";
import ProcessSection from "./components/ProcessSection";
import StatsSection from "./components/StatsSection";
import ShowcaseSection from "./components/ShowcaseSection";
import TestimonialsSection from "./components/TestimonialsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function AppContent({ loaded }: { loaded: boolean }) {
  useLenis();
  useCursor();

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Cursor />
      <Nav />
      <main>
        {/* 1. Hero — opening statement */}
        <HeroSection shouldAnimate={loaded} />

        {/* 2. Marquee band */}
        <MarqueeSection />

        {/* 3. Layered depth parallax — 5 independent layers */}
        <LayeredDepthSection />

        {/* 4. Work — project grid */}
        <WorkSection />

        {/* 5. Philosophy — word-cloud parallax */}
        <PhilosophySection />

        {/* 6. Card swiper — pinned scroll through disciplines */}
        <CardSwiperSection />

        {/* 7. Services — list with hover FX */}
        <ServicesSection />

        {/* 8. Split reveal — two independent parallax panels */}
        <SplitRevealSection />

        {/* 9. Process — staggered depth cards */}
        <ProcessSection />

        {/* 10. Stats — counting numbers */}
        <StatsSection />

        {/* 11. Horizontal showcase */}
        <ShowcaseSection />

        {/* 12. Testimonials — layered parallax quotes */}
        <TestimonialsSection />

        {/* 13. About */}
        <AboutSection />

        {/* 14. Contact */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
      className="overflow-hidden"
        style={{
          visibility: loaded ? "visible" : "hidden",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <AppContent loaded={loaded} />
      </div>
    </>
  );
}

export default App;
