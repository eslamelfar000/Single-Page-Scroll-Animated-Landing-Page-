import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // Left visual layers
  const leftFarRef = useRef<HTMLDivElement>(null);
  const leftMidRef = useRef<HTMLDivElement>(null);
  const leftNearRef = useRef<HTMLDivElement>(null);

  // Right visual layers
  const rightFarRef = useRef<HTMLDivElement>(null);
  const rightMidRef = useRef<HTMLDivElement>(null);
  const rightNearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT PANEL: moves slower (feels further away)
      gsap.to(leftPanelRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // RIGHT PANEL: moves faster (feels closer)
      gsap.to(rightPanelRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // LEFT internal layers — multi-depth within the panel
      gsap.to(leftFarRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.3 },
      });
      gsap.to(leftMidRef.current, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to(leftNearRef.current, {
        yPercent: -35,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });

      // RIGHT internal layers
      gsap.to(rightFarRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
      });
      gsap.to(rightMidRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.0 },
      });
      gsap.to(rightNearRef.current, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
      });

      // Divider expands vertically
      gsap.fromTo(
        dividerRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Left content reveal
      gsap.fromTo(
        leftContentRef.current?.querySelectorAll('.split-reveal') ?? [],
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: leftPanelRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Right content reveal
      gsap.fromTo(
        rightContentRef.current?.querySelectorAll('.split-reveal') ?? [],
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: rightPanelRef.current,
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
      style={{ minHeight: '130vh', background: 'hsl(222 25% 4%)' }}
    >
      {/* The two panels side by side */}
      <div className="flex flex-col sm:flex-row min-h-screen relative">
        {/* ==================== LEFT PANEL ==================== */}
        <div
          ref={leftPanelRef}
          className="flex-1 relative overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          {/* Far layer: base gradient */}
          <div
            ref={leftFarRef}
            className="absolute inset-0"
            style={{
              top: '-20%', bottom: '-20%',
              background: 'linear-gradient(160deg, hsl(185 60% 7%) 0%, hsl(222 30% 4%) 100%)',
            }}
          />

          {/* Mid layer: geometric pattern */}
          <div
            ref={leftMidRef}
            className="absolute inset-0"
            style={{ top: '-10%', bottom: '-10%' }}
          >
            {/* Large circle */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[hsl(185_100%_55%/0.08)]"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[hsl(185_100%_55%/0.05)]"
            />
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(hsl(185 100% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(185 100% 55%) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Near layer: floating shapes */}
          <div
            ref={leftNearRef}
            className="absolute inset-0 pointer-events-none"
            style={{ top: '-5%' }}
          >
            <div
              className="absolute top-[15%] left-[20%] w-20 h-20 border border-[hsl(185_100%_55%/0.2)] rotate-45"
            />
            <div
              className="absolute bottom-[20%] right-[15%] w-4 h-4 rounded-full"
              style={{ background: 'hsl(185 100% 55% / 0.4)', boxShadow: '0 0 20px hsl(185 100% 55% / 0.3)' }}
            />
            <div
              className="absolute top-[60%] left-[10%] w-3 h-3 rotate-45"
              style={{ background: 'hsl(185 100% 55% / 0.2)' }}
            />
          </div>

          {/* Content */}
          <div
            ref={leftContentRef}
            className="relative z-10 flex flex-col justify-center h-full p-12 md:p-20"
          >
            <p className="section-label mb-8 split-reveal" style={{ opacity: 0 }}>The Vision</p>
            <h2
              className="display-text mb-8 split-reveal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, opacity: 0 }}
            >
              Crafted for<br />
              <span style={{
                background: 'linear-gradient(135deg, hsl(185 100% 55%), hsl(185 60% 40%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                those who notice
              </span>
            </h2>
            <p
              className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 max-w-sm split-reveal"
              style={{ opacity: 0 }}
            >
              We design for the critical eye. Every micro-detail — the space between letters, the weight of a shadow, the timing of a transition — is considered.
            </p>
            <div className="flex flex-col gap-4 split-reveal" style={{ opacity: 0 }}>
              {['Pixel-perfect execution', 'Sub-frame animation timing', 'Typographic obsession'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-4 h-px"
                    style={{ background: 'hsl(185 100% 55%)' }}
                  />
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== DIVIDER ==================== */}
        <div className="relative flex items-stretch z-20">
          <div
            ref={dividerRef}
            className="w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, hsl(185 100% 55% / 0.4) 20%, hsl(185 100% 55% / 0.6) 50%, hsl(185 100% 55% / 0.4) 80%, transparent)',
              transformOrigin: 'top center',
              boxShadow: '0 0 20px hsl(185 100% 55% / 0.2)',
            }}
          />
          {/* Center diamond */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
            style={{ background: 'hsl(185 100% 55%)', boxShadow: '0 0 12px hsl(185 100% 55%)' }}
          />
        </div>

        {/* ==================== RIGHT PANEL ==================== */}
        <div
          ref={rightPanelRef}
          className="flex-1 relative overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          {/* Far layer */}
          <div
            ref={rightFarRef}
            className="absolute inset-0"
            style={{
              top: '-20%', bottom: '-20%',
              background: 'linear-gradient(200deg, hsl(340 40% 7%) 0%, hsl(222 30% 4%) 100%)',
            }}
          />

          {/* Mid layer */}
          <div
            ref={rightMidRef}
            className="absolute inset-0"
            style={{ top: '-10%', bottom: '-10%' }}
          >
            <div
              className="absolute top-1/3 right-[20%] w-64 h-64 rounded-full border border-[hsl(340_85%_62%/0.08)]"
            />
            <svg
              className="absolute bottom-[15%] left-[10%] opacity-[0.06]"
              width="200" height="200" viewBox="0 0 200 200"
            >
              <polygon points="100,10 190,165 10,165" stroke="hsl(340 85% 62%)" strokeWidth="1" fill="none" />
              <polygon points="100,35 170,155 30,155" stroke="hsl(340 85% 62%)" strokeWidth="0.5" fill="none" />
            </svg>
          </div>

          {/* Near layer */}
          <div
            ref={rightNearRef}
            className="absolute inset-0 pointer-events-none"
            style={{ top: '-5%' }}
          >
            <div
              className="absolute top-[25%] right-[20%] w-16 h-16 rounded-full border border-[hsl(340_85%_62%/0.25)]"
            />
            <div
              className="absolute bottom-[30%] left-[20%] w-3 h-3 rounded-full"
              style={{ background: 'hsl(340 85% 62% / 0.5)', boxShadow: '0 0 16px hsl(340 85% 62% / 0.4)' }}
            />
          </div>

          {/* Content */}
          <div
            ref={rightContentRef}
            className="relative z-10 flex flex-col justify-center h-full p-12 md:p-20"
          >
            <p
              className="section-label mb-8 split-reveal"
              style={{ opacity: 0, color: 'hsl(340 85% 62%)' }}
            >
              The Practice
            </p>
            <h2
              className="display-text mb-8 split-reveal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, opacity: 0 }}
            >
              Built on<br />
              <span style={{
                background: 'linear-gradient(135deg, hsl(340 85% 62%), hsl(340 60% 45%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                real conviction
              </span>
            </h2>
            <p
              className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 max-w-sm split-reveal"
              style={{ opacity: 0 }}
            >
              We don't take briefs, we take positions. Your project succeeds when we believe in it as much as you do — that's when the real work begins.
            </p>
            <div className="grid grid-cols-2 gap-4 split-reveal" style={{ opacity: 0 }}>
              {[
                { label: 'Strategy first', icon: '▱' },
                { label: 'Craft always', icon: '◈' },
                { label: 'No templates', icon: '◎' },
                { label: 'Full ownership', icon: '✦' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 border border-[hsl(var(--border))]"
                  style={{ borderRadius: '4px', background: 'hsl(222 25% 6%)' }}
                >
                  <span style={{ color: 'hsl(340 85% 62%)', fontSize: '0.8rem' }}>{item.icon}</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
