import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { label: "Typography", desc: "Precision-crafted type systems", icon: "Aa" },
  { label: "Motion", desc: "Every frame is intentional", icon: "◐" },
  { label: "Texture", desc: "Physical feel in digital spaces", icon: "▣" },
  { label: "Colour", desc: "Emotion through palette", icon: "◉" },
  { label: "Space", desc: "Breathing room that communicates", icon: "□" },
  {
    label: "Detail",
    desc: "The invisible craft that makes it sing",
    icon: "✦",
  },
  { label: "Texture", desc: "Physical feel in digital spaces", icon: "▣" },
  { label: "Texture", desc: "Physical feel in digital spaces", icon: "▣" },
  { label: "Typography", desc: "Precision-crafted type systems", icon: "Aa" },
];

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Calculate scroll distance
      const totalWidth = track.scrollWidth - section.offsetWidth + 100;

      // Pinned horizontal scroll
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + 200}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // Heading animation
      gsap.fromTo(
        ".showcase-label",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative"
      style={{ height: "100vh" }}
    >
      <div className="h-full flex flex-col justify-center px-8">
        <div className="mb-12">
          <p
            className="section-label mb-4 showcase-label"
            style={{ opacity: 0 }}
          >
            Our Principles
          </p>
          <h2
            className="display-text showcase-label"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              opacity: 0,
            }}
          >
            The craft behind
            <br />
            <span className="gradient-text">the work</span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="horizontal-scroll-container"
          style={{ paddingRight: "10vw" }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="shrink-0 w-72 h-80 border border-[hsl(var(--border))] relative overflow-hidden group"
              style={{
                borderRadius: "4px",
                background: i % 2 === 0 ? "hsl(222 25% 6%)" : "hsl(222 25% 4%)",
              }}
            >
              {/* Top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent group-hover:from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-transparent group-hover:to-transparent transition-all duration-700"
                style={{
                  background:
                    i % 3 === 0
                      ? "hsl(var(--primary)/0.3)"
                      : i % 3 === 1
                        ? "hsl(var(--accent)/0.3)"
                        : "hsl(270 60% 60% / 0.3)",
                }}
              />

              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div
                    className="text-4xl mb-6 font-serif"
                    style={{
                      color:
                        i % 3 === 0
                          ? "hsl(var(--primary))"
                          : i % 3 === 1
                            ? "hsl(var(--accent))"
                            : "hsl(270 60% 60%)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.label}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-8 flex items-center gap-3 text-[hsl(var(--muted-foreground))]">
          <div className="flex gap-1">
            <div className="w-6 h-6 border border-[hsl(var(--border))] flex items-center justify-center text-xs">
              ←
            </div>
            <div className="w-6 h-6 border border-[hsl(var(--border))] flex items-center justify-center text-xs">
              →
            </div>
          </div>
          <span className="text-xs tracking-wider uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
