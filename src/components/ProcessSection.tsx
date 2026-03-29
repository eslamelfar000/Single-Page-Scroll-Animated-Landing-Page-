import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your world. Research, interviews, competitive landscape — we map the territory before drawing a single line.',
    icon: '◎',
    color: 'hsl(185 100% 55%)',
    offsetY: 0,
  },
  {
    number: '02',
    title: 'Define',
    description: 'Strategy crystallises into a creative brief. A clear vision, articulate direction, and shared language for what success looks like.',
    icon: '▱',
    color: 'hsl(340 85% 62%)',
    offsetY: 60,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Ideas become artefacts. Rapid exploration, refined execution. Every decision is intentional — nothing is accidental.',
    icon: '◈',
    color: 'hsl(270 60% 60%)',
    offsetY: 20,
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'We ship with care. Handoffs are thorough, launch support is real, and the relationship doesn\'t end at delivery.',
    icon: '✦',
    color: 'hsl(150 60% 45%)',
    offsetY: 80,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Deepest background parallax
      gsap.to(bgLayerRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Mid layer — opposite direction
      gsap.to(midLayerRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Heading parallax
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Cards: each one starts at its own offset and slides into place
      cardRefs.current.forEach((card, i) => {
        const step = STEPS[i];
        if (!card || !step) return;

        // Reveal
        gsap.fromTo(
          card,
          { y: 80 + step.offsetY, opacity: 0, scale: 0.96 },
          {
            y: step.offsetY,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );

        // Parallax at individual depths as you scroll through
        const parallaxAmount = 20 + i * 10;
        gsap.to(card, {
          y: step.offsetY - parallaxAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5 + i * 0.2,
          },
        });
      });

      // Connector line animates in
      gsap.fromTo(
        '.process-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
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
      className="relative py-32 overflow-hidden"
      style={{ background: 'hsl(222 25% 4%)' }}
    >
      {/* Deep background layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 -inset-y-[30%] pointer-events-none"
      >
        {/* Large ambient gradient blobs */}
        <div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(185 40% 8% / 0.9) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(340 30% 8% / 0.9) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        {/* Large number watermark */}
        <p
          className="absolute bottom-0 right-8 display-text leading-none select-none"
          style={{
            fontSize: 'clamp(12rem, 30vw, 24rem)',
            fontWeight: 700,
            color: 'hsl(var(--foreground) / 0.015)',
            lineHeight: 1,
          }}
        >
          04
        </p>
      </div>

      {/* Mid layer — floating shapes */}
      <div ref={midLayerRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 right-[12%] w-48 h-48 border border-[hsl(var(--primary)/0.08)] rotate-12"
          style={{ borderRadius: '4px' }}
        />
        <div
          className="absolute bottom-16 left-[8%] w-36 h-36 border border-[hsl(var(--accent)/0.08)] rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0 }} className="mb-20">
          <p className="section-label mb-4">How We Work</p>
          <h2
            className="display-text"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700 }}
          >
            Our creative<br />
            <span className="gradient-text">process</span>
          </h2>
        </div>

        {/* Connector line */}
        <div className="hidden md:block mb-0 relative h-px mb-[-1px] z-20">
          <div
            className="process-connector h-px"
            style={{
              background: 'linear-gradient(to right, hsl(185 100% 55% / 0.3), hsl(340 85% 62% / 0.3), hsl(270 60% 60% / 0.3), hsl(150 60% 45% / 0.3))',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={el => { if (el) cardRefs.current[i] = el; }}
              className="relative p-8 border border-[hsl(var(--border))] group"
              style={{
                borderRadius: '4px',
                background: 'hsl(222 25% 5%)',
                opacity: 0,
                willChange: 'transform',
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: step.color }}
              />

              {/* Number */}
              <span
                className="font-mono text-xs tracking-widest block mb-6"
                style={{ color: `${step.color}60` }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                className="text-4xl mb-6 font-serif transition-transform duration-500 group-hover:scale-110"
                style={{ color: step.color }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-4 transition-colors duration-300"
                style={{ fontFamily: 'var(--app-font-serif)' }}
              >
                <span className="group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {step.title}
                </span>
              </h3>

              {/* Description */}
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {step.description}
              </p>

              {/* Corner dot */}
              <div
                className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: step.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
