import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: 'We', speed: 0.6, size: 'text-5xl md:text-8xl', color: 'text-[hsl(var(--foreground))]', weight: 'font-light', italic: false },
  { text: 'believe', speed: 1.2, size: 'text-6xl md:text-9xl', color: 'gradient-text', weight: 'font-bold', italic: false },
  { text: 'great', speed: 0.4, size: 'text-4xl md:text-7xl', color: 'text-[hsl(var(--muted-foreground))]', weight: 'font-light', italic: true },
  { text: 'design', speed: 1.6, size: 'text-7xl md:text-[10rem]', color: 'text-[hsl(var(--foreground))]', weight: 'font-bold', italic: false },
  { text: 'is', speed: 0.5, size: 'text-3xl md:text-6xl', color: 'text-[hsl(var(--muted-foreground)/0.4)]', weight: 'font-light', italic: false },
  { text: 'never', speed: 0.9, size: 'text-5xl md:text-8xl', color: 'text-[hsl(var(--foreground))]', weight: 'font-medium', italic: false },
  { text: 'finished', speed: 1.4, size: 'text-6xl md:text-9xl', color: 'gradient-text', weight: 'font-bold', italic: false },
];

const LINES = [
  'Design is not decoration — it is intention made visible.',
  'Every pixel, every frame, every interaction carries meaning.',
  'We work at the intersection of beauty and purpose.',
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<HTMLDivElement[]>([]);
  const layerBgRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Far background layer moves slowest
      gsap.to(layerBgRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Mid layer
      gsap.to(layerMidRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Each word moves at its own parallax speed
      wordRefs.current.forEach((word, i) => {
        const speed = WORDS[i]?.speed ?? 1;
        const dir = i % 2 === 0 ? 1 : -1;

        gsap.fromTo(
          word,
          { x: dir * 120 * speed, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: word,
              start: 'top 90%',
              once: true,
            },
          }
        );

        // Subtle y parallax as you scroll past
        gsap.to(word, {
          yPercent: -10 * speed * dir,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: speed * 0.6,
          },
        });
      });

      // Lines reveal
      const lines = linesRef.current?.querySelectorAll('.manifesto-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: linesRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Far background — large faded circle */}
      <div
        ref={layerBgRef}
        className="absolute inset-0 -inset-y-[20%] pointer-events-none"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(185 40% 8% / 0.8) 0%, transparent 65%)',
          }}
        />
        {/* Subtle cross grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      {/* Mid layer — decorative shapes */}
      <div ref={layerMidRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-12 left-[10%] w-32 h-32 border border-[hsl(var(--primary)/0.15)] rotate-12"
          style={{ borderRadius: '4px' }}
        />
        <div
          className="absolute bottom-24 right-[8%] w-24 h-24 border border-[hsl(var(--accent)/0.15)] rounded-full"
        />
        <div
          className="absolute top-1/2 right-[15%] w-2 h-2 rounded-full"
          style={{ background: 'hsl(var(--primary) / 0.4)' }}
        />
        <div
          className="absolute top-1/3 left-[20%] w-1 h-1 rounded-full"
          style={{ background: 'hsl(var(--accent) / 0.5)' }}
        />
      </div>

      {/* Word cloud — layered at different speeds */}
      <div className="relative z-10 px-8 max-w-7xl mx-auto mb-24">
        <p className="section-label mb-16">Our Belief</p>

        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-4 leading-none">
          {WORDS.map((word, i) => (
            <div
              key={i}
              ref={el => { if (el) wordRefs.current[i] = el; }}
              className={`${word.size} ${word.weight} ${
                word.color.startsWith('gradient-text') ? '' : word.color
              } display-text shrink-0`}
              style={{
                opacity: 0,
                fontStyle: word.italic ? 'italic' : 'normal',
              }}
            >
              {word.color === 'gradient-text' ? (
                <span className="gradient-text">{word.text}</span>
              ) : (
                word.text
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Manifesto lines */}
      <div
        ref={linesRef}
        className="relative z-10 px-8 max-w-7xl mx-auto border-t border-[hsl(var(--border))] pt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LINES.map((line, i) => (
            <div key={i} className="manifesto-line" style={{ opacity: 0 }}>
              <span
                className="font-mono text-xs text-[hsl(var(--primary))] block mb-3"
                style={{ letterSpacing: '0.2em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
