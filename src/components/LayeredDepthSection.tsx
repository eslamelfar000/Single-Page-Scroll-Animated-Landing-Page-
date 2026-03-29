import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Five depth layers, each moving at its own parallax rate
// Layer 0 = deepest (moves slowest), Layer 4 = closest (moves fastest)

export default function LayeredDepthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer0 = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const layer4 = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Layer parallax speeds — deeper = slower
      const layers = [
        { ref: layer0, speed: 0.1 },
        { ref: layer1, speed: 0.25 },
        { ref: layer2, speed: 0.45 },
        { ref: layer3, speed: 0.7 },
        { ref: layer4, speed: 1.1 },
      ];

      layers.forEach(({ ref, speed }) => {
        gsap.to(ref.current, {
          yPercent: -(speed * 50),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: speed * 1.5,
          },
        });
      });

      // Content parallax (middle speed)
      gsap.to(contentRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Content reveal
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.depth-reveal') ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '140vh', background: 'hsl(222 25% 3%)' }}
    >
      {/* LAYER 0 — far background: large gradient nebula */}
      <div
        ref={layer0}
        className="absolute inset-0"
        style={{
          top: '-20%', bottom: '-20%',
          background: 'radial-gradient(ellipse 120% 80% at 40% 50%, hsl(185 60% 8% / 1) 0%, hsl(222 25% 3%) 70%)',
        }}
      />

      {/* LAYER 1 — far-mid: large dashed circle ring */}
      <div
        ref={layer1}
        className="absolute"
        style={{ top: '5%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px' }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" className="opacity-[0.07]">
          <circle cx="400" cy="400" r="380" stroke="hsl(185 100% 55%)" strokeWidth="1" strokeDasharray="8 16" />
          <circle cx="400" cy="400" r="280" stroke="hsl(340 85% 62%)" strokeWidth="0.5" strokeDasharray="4 20" />
          <circle cx="400" cy="400" r="160" stroke="hsl(185 100% 55%)" strokeWidth="0.5" strokeDasharray="2 12" />
        </svg>
      </div>

      {/* LAYER 2 — mid: floating geometric shapes */}
      <div
        ref={layer2}
        className="absolute inset-0"
        style={{ top: '-10%', bottom: '-10%' }}
      >
        {/* Top-left blob */}
        <div
          className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(185 100% 40% / 0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Bottom-right blob */}
        <div
          className="absolute bottom-[20%] right-[8%] w-56 h-56 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(340 85% 50% / 0.10) 0%, transparent 70%)',
            filter: 'blur(25px)',
          }}
        />
        {/* Square outline top-right */}
        <div
          className="absolute top-[10%] right-[15%] w-32 h-32 border border-[hsl(185_100%_55%/0.12)] rotate-45"
        />
        {/* Square outline bottom-left */}
        <div
          className="absolute bottom-[25%] left-[12%] w-20 h-20 border border-[hsl(340_85%_62%/0.1)] rotate-12"
        />
      </div>

      {/* LAYER 3 — near-mid: abstract art cards */}
      <div
        ref={layer3}
        className="absolute"
        style={{ top: '8%', right: '6%', width: '300px' }}
      >
        <div
          className="w-full aspect-[3/4] border border-[hsl(185_100%_55%/0.15)] relative overflow-hidden"
          style={{ borderRadius: '8px', background: 'hsl(222 30% 6%)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, hsl(185 60% 12% / 0.9) 0%, hsl(340 40% 8% / 0.9) 100%)',
            }}
          />
          {/* Inner grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(hsl(185 100% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(185 100% 55%) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-16 h-16 rounded-full border-2 border-[hsl(185_100%_55%/0.4)]"
              style={{ boxShadow: '0 0 30px hsl(185 100% 55% / 0.2), inset 0 0 20px hsl(185 100% 55% / 0.1)' }}
            />
            <div className="w-8 h-px bg-[hsl(185_100%_55%/0.4)]" />
            <p className="text-xs tracking-[0.3em] uppercase text-[hsl(185_100%_55%/0.5)]">Visual</p>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, hsl(185 100% 55% / 0.4), transparent)' }}
          />
        </div>

        {/* Small card beneath */}
        <div
          className="mt-4 p-4 border border-[hsl(var(--border))] flex items-center gap-3"
          style={{ borderRadius: '6px', background: 'hsl(222 25% 6%)' }}
        >
          <div className="w-2 h-2 rounded-full bg-[hsl(185_100%_55%)]" style={{ boxShadow: '0 0 8px hsl(185 100% 55% / 0.8)' }} />
          <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-wider">Multi-layer depth</p>
        </div>
      </div>

      {/* LAYER 3b — near-mid left: second card cluster */}
      <div
        ref={layer3}
        className="absolute"
        style={{ top: '30%', left: '4%', width: '220px' }}
      >
        <div
          className="w-full aspect-square border border-[hsl(340_85%_62%/0.15)] relative overflow-hidden"
          style={{ borderRadius: '8px', background: 'hsl(222 30% 6%)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 70%, hsl(340 60% 15% / 0.8) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl" style={{ color: 'hsl(340 85% 62% / 0.25)', fontFamily: 'serif' }}>◈</span>
          </div>
          <div
            className="absolute top-3 left-3 text-xs font-mono tracking-widest"
            style={{ color: 'hsl(340 85% 62% / 0.4)' }}
          >
            02
          </div>
        </div>
      </div>

      {/* LAYER 4 — closest: small floating particles */}
      <div
        ref={layer4}
        className="absolute inset-0 pointer-events-none"
        style={{ top: '-15%', bottom: '-15%' }}
      >
        {[
          { top: '20%', left: '30%', size: 4, color: 'hsl(185 100% 55%)' },
          { top: '55%', left: '60%', size: 3, color: 'hsl(340 85% 62%)' },
          { top: '35%', left: '75%', size: 2, color: 'hsl(185 100% 55%)' },
          { top: '70%', left: '25%', size: 3, color: 'hsl(340 85% 62%)' },
          { top: '15%', left: '55%', size: 2, color: 'hsl(185 100% 70%)' },
          { top: '80%', left: '70%', size: 4, color: 'hsl(185 100% 55%)' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* CENTER CONTENT (mid layer) */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ top: '5%' }}
      >
        <div className="text-center px-8 max-w-3xl">
          <p className="section-label mb-8 depth-reveal" style={{ opacity: 0 }}>Depth & Dimension</p>
          <h2
            className="display-text mb-8 depth-reveal"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 700, opacity: 0 }}
          >
            Five layers of<br />
            <span className="gradient-text">reality</span>
          </h2>
          <p
            className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed max-w-lg mx-auto mb-10 depth-reveal"
            style={{ opacity: 0 }}
          >
            Like a great painting, the best digital work lives in layers. Each element occupies its own plane — and together they form something that breathes.
          </p>
          <button
            className="btn-primary depth-reveal"
            style={{ opacity: 0 }}
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Explore the Craft</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
