import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    number: '01',
    title: 'Visual Identity',
    subtitle: 'The face of your brand',
    description: 'Every brand is a promise. We design the symbols, colours, and systems that make yours unmistakable in a crowded world.',
    color1: 'hsl(185 80% 10%)',
    color2: 'hsl(185 60% 6%)',
    accent: 'hsl(185 100% 55%)',
    icon: '◎',
  },
  {
    number: '02',
    title: 'Digital Worlds',
    subtitle: 'Experiences that live online',
    description: 'Websites and web apps designed with the obsessive attention to detail that makes them feel inevitable — never just functional.',
    color1: 'hsl(270 40% 10%)',
    color2: 'hsl(270 30% 6%)',
    accent: 'hsl(270 70% 65%)',
    icon: '▣',
  },
  {
    number: '03',
    title: 'Motion Stories',
    subtitle: 'The art of the moving image',
    description: 'Brand films, animated UIs, interactive 3D — we make things move in ways that make people feel something real.',
    color1: 'hsl(340 40% 10%)',
    color2: 'hsl(340 30% 6%)',
    accent: 'hsl(340 85% 62%)',
    icon: '◐',
  },
  {
    number: '04',
    title: 'Strategy & Voice',
    subtitle: 'Words that cut through noise',
    description: 'Positioning, messaging, tone of voice — the invisible architecture beneath every great brand. We help you find your words.',
    color1: 'hsl(45 40% 8%)',
    color2: 'hsl(45 30% 5%)',
    accent: 'hsl(45 90% 60%)',
    icon: '✦',
  },
];

export default function CardSwiperSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      if (!section || !wrapper) return;

      // Pin the section during the swipe sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${CARDS.length * 600}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
        },
      });

      // Initial state: cards stacked, slight scale/rotate differences
      cardRefs.current.forEach((card, i) => {
        const stackOffset = i * 6;
        const stackRotate = (i - (CARDS.length - 1) / 2) * 2;
        gsap.set(card, {
          y: stackOffset,
          rotate: stackRotate,
          scale: 1 - i * 0.02,
          zIndex: CARDS.length - i,
        });
      });

      // Each card sweeps out to the left as you scroll
      CARDS.forEach((_, i) => {
        if (i === CARDS.length - 1) return; // last card stays

        tl.to(
          cardRefs.current[i],
          {
            x: '-120%',
            y: -40,
            rotate: -15,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          i * 1
        );

        // Cards below rise up slightly as the top card leaves
        for (let j = i + 1; j < CARDS.length; j++) {
          tl.to(
            cardRefs.current[j],
            {
              y: (j - i - 1) * 6,
              scale: 1 - (j - i - 1) * 0.02,
              rotate: ((j - i - 1) - (CARDS.length - i - 2) / 2) * 2,
              duration: 1,
              ease: 'power2.inOut',
            },
            i * 1
          );
        }
      });

      // Heading and label appear
      gsap.fromTo(
        headingRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
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
      style={{ minHeight: '100vh', background: 'hsl(222 25% 4%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, hsl(185 50% 6% / 0.9) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <p className="section-label mb-4">What We Make</p>
          <h2
            className="display-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 700 }}
          >
            Swipe through our<br />
            <span className="gradient-text">disciplines</span>
          </h2>
        </div>

        {/* Card stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={wrapperRef}
            className="relative"
            style={{ height: '420px' }}
          >
            {[...CARDS].reverse().map((card, revI) => {
              const i = CARDS.length - 1 - revI;
              return (
                <div
                  key={card.number}
                  ref={el => { if (el) cardRefs.current[i] = el; }}
                  className="swipe-card"
                  style={{
                    background: `linear-gradient(145deg, ${card.color1} 0%, ${card.color2} 100%)`,
                    border: `1px solid ${card.accent}20`,
                  }}
                >
                  {/* Card content */}
                  <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
                    {/* Corner glow */}
                    <div
                      className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, ${card.accent}20 0%, transparent 70%)`,
                      }}
                    />

                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <span
                        className="font-mono text-xs tracking-widest"
                        style={{ color: `${card.accent}80` }}
                      >
                        {card.number} / {String(CARDS.length).padStart(2, '0')}
                      </span>
                      <span
                        className="text-4xl"
                        style={{ color: card.accent, opacity: 0.6 }}
                      >
                        {card.icon}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <p
                        className="text-xs tracking-widest uppercase mb-3"
                        style={{ color: `${card.accent}90` }}
                      >
                        {card.subtitle}
                      </p>
                      <h3
                        className="display-text text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--foreground))]"
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-sm">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom bar */}
                    <div
                      className="h-px w-full"
                      style={{ background: `linear-gradient(to right, ${card.accent}60, transparent)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right info panel */}
          <div className="hidden lg:flex flex-col gap-6">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border border-[hsl(var(--border))] transition-all duration-300"
                style={{ borderRadius: '6px', background: 'hsl(222 25% 5%)' }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: card.accent }}
                >
                  {card.number}
                </span>
                <div
                  className="h-4 w-px"
                  style={{ background: 'hsl(var(--border))' }}
                />
                <span className="text-sm text-[hsl(var(--foreground)/0.7)]">{card.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
