import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: 'Elena Vasquez', role: 'Creative Director', initials: 'EV' },
  { name: 'Marcus Chen', role: 'Lead Developer', initials: 'MC' },
  { name: 'Aisha Okafor', role: 'Brand Strategist', initials: 'AO' },
  { name: 'Luca Romano', role: 'Motion Artist', initials: 'LR' },
];

const COLORS = [
  'hsl(185 100% 55%)',
  'hsl(340 85% 62%)',
  'hsl(270 60% 60%)',
  'hsl(150 60% 45%)',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big ambient text parallax
      gsap.to(bigTextRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Image block parallax
      gsap.to(imageBlockRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Text reveal
      const lines = textBlockRef.current?.querySelectorAll('.reveal-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBlockRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Team cards
      gsap.fromTo(
        '.team-card',
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Ambient large text */}
      <div
        ref={bigTextRef}
        className="absolute top-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <p
          className="display-text text-center"
          style={{
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            fontWeight: 700,
            color: 'hsl(var(--foreground) / 0.02)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          LUMINIS
        </p>
      </div>

      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Left: Text */}
          <div ref={textBlockRef}>
            <p className="section-label mb-8 reveal-line" style={{ opacity: 0 }}>About the Studio</p>
            <h2
              className="display-text mb-8 reveal-line"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, opacity: 0 }}
            >
              We are a collective of<br />
              <span className="gradient-text">obsessive makers</span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6 reveal-line" style={{ opacity: 0 }}>
              Founded in 2026, Luminis Studio was built on one belief: that great design
              has the power to change how people feel. We bring together strategists,
              designers, developers, and artists to create work that doesn't just look good
              — it resonates.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 reveal-line" style={{ opacity: 0 }}>
              We're based in London, working globally with brands that are ready to be
              remembered.
            </p>
            <div className="reveal-line" style={{ opacity: 0 }}>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Work With Us</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div ref={imageBlockRef} className="relative">
            <div
              className="relative h-80 lg:h-full overflow-hidden"
              style={{ borderRadius: '4px', minHeight: '400px' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(222 30% 8%) 0%, hsl(185 30% 12%) 50%, hsl(270 20% 8%) 100%)',
                }}
              />
              {/* Decorative geometric elements */}
              <div
                className="absolute top-12 left-12 w-32 h-32 border border-[hsl(var(--primary)/0.3)] rotate-45"
              />
              <div
                className="absolute bottom-12 right-12 w-24 h-24 border border-[hsl(var(--accent)/0.3)] rounded-full"
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[hsl(var(--primary))]"
                style={{ boxShadow: '0 0 40px 20px hsl(185 100% 55% / 0.15)' }}
              />
              {/* Cross hair */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[hsl(var(--border))]" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--border))]" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[hsl(var(--primary)/0.5)] rounded-full"
              />
              {/* Studio label */}
              <div className="absolute top-6 right-6 text-right">
                <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase">Est.</p>
                <p className="text-2xl font-serif text-[hsl(var(--primary)/0.6)]">2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <p className="section-label mb-8">Meet the Team</p>
          <div className="team-grid grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="team-card p-6 border border-[hsl(var(--border))] group hover:border-[hsl(var(--primary)/0.5)] transition-colors duration-300"
                style={{ opacity: 0, borderRadius: '4px' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                  style={{
                    background: `${COLORS[i]}20`,
                    color: COLORS[i],
                    border: `1px solid ${COLORS[i]}40`,
                  }}
                >
                  {member.initials}
                </div>
                <p className="font-semibold text-sm mb-1 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {member.name}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-wider">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
