import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Digital", "Creative", "Motion", "Future"];

interface HeroSectionProps {
  shouldAnimate?: boolean;
}

export default function HeroSection({
  shouldAnimate = false,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Orbs parallax
      gsap.to(orbRef.current, {
        yPercent: -40,
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(orb2Ref.current, {
        yPercent: -20,
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Only play intro animation when shouldAnimate is true
      if (shouldAnimate) {
        const tl = gsap.timeline();

        // Animate each word line
        wordRefs.current.forEach((word, i) => {
          tl.fromTo(
            word,
            { yPercent: 120, opacity: 0, rotateX: -15 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.1,
              ease: "power4.out",
            },
            i * 0.12,
          );
        });

        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        );

        tl.fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.4",
        );

        tl.fromTo(
          scrollTextRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.3",
        );
      }

      // Headline exits on scroll
      gsap.to(headlineRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden lg:pt-32"
      style={{ perspective: "1000px" }}
    >
      {/* Background gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 -inset-y-[20%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(185 60% 8% / 0.8) 0%, hsl(222 25% 3%) 70%)",
        }}
      />

      {/* Orbs */}
      <div
        ref={orbRef}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(185 100% 50% / 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(340 85% 62% / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(hsl(185 100% 55% / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(185 100% 55% / 0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div
        ref={headlineRef}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <p className="section-label mb-8 hero-cta" style={{ opacity: 0 }}>
          Creative Studio — Est. 2026
        </p>

        <div className="overflow-hidden mb-2" style={{ perspective: "800px" }}>
          <h1
            className="display-text"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", fontWeight: 700 }}
          >
            {WORDS.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span
                  ref={(el) => {
                    if (el) wordRefs.current[i] = el;
                  }}
                  className={i % 2 === 1 ? "gradient-text" : ""}
                  style={{ display: "block", opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl max-w-xl mx-auto mt-8 leading-relaxed"
          style={{ opacity: 0 }}
        >
          We craft immersive digital experiences that blur the line between art
          and technology.
        </p>

        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            className="btn-primary hero-cta"
            style={{ opacity: 0 }}
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>Explore Work</span>
            <span className="text-lg">→</span>
          </button>
          <button
            className="btn-outline hero-cta"
            style={{ opacity: 0 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollTextRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="scroll-indicator-dot w-1 h-1 rounded-full bg-[hsl(var(--primary))]" />
          <div
            className="scroll-indicator-dot w-1 h-1 rounded-full bg-[hsl(var(--primary)/0.5)]"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="scroll-indicator-dot w-1 h-1 rounded-full bg-[hsl(var(--primary)/0.2)]"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
        <span className="section-label" style={{ fontSize: "0.6rem" }}>
          Scroll
        </span>
      </div>

      {/* Year badge */}
      <div className="absolute top-24 right-8 text-[hsl(var(--muted-foreground))] text-xs tracking-widest hidden lg:block">
        <span
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          2026 — Present
        </span>
      </div>
    </section>
  );
}
