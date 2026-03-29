import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: 'Luminis didn\'t just build us a website. They created a new way of seeing our brand. The result exceeded every expectation.',
    author: 'Sofia Andersen',
    role: 'CEO, Aether Technologies',
    initials: 'SA',
    color: 'hsl(185 100% 55%)',
    layerOffset: -30,
  },
  {
    quote: 'The motion work was unlike anything I\'d seen. Every animation felt deliberate — like the product was breathing. Our users felt it instantly.',
    author: 'James Okafor',
    role: 'Head of Product, Solara',
    initials: 'JO',
    color: 'hsl(340 85% 62%)',
    layerOffset: 40,
  },
  {
    quote: 'A team of genuine artists. They pushed back when our ideas were wrong and fought for the right solution. Rare and invaluable.',
    author: 'Clara Meier',
    role: 'Founder, Nox Gallery',
    initials: 'CM',
    color: 'hsl(270 60% 60%)',
    layerOffset: -10,
  },
];

function TestimonialCard({ item, index }: { item: typeof TESTIMONIALS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal on scroll
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Individual parallax depth — each card at different speed
      const parallaxSpeed = 0.4 + index * 0.25;
      const section = document.querySelector('.testimonials-section');
      if (section) {
        gsap.to(cardRef.current, {
          y: item.layerOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: parallaxSpeed,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, item.layerOffset]);

  return (
    <div
      ref={cardRef}
      className="relative p-8 md:p-10 border border-[hsl(var(--border))] group"
      style={{
        borderRadius: '4px',
        background: 'hsl(222 25% 5%)',
        opacity: 0,
        willChange: 'transform',
      }}
    >
      {/* Quote mark — decorative */}
      <div
        className="absolute -top-4 left-8 text-6xl font-serif leading-none"
        style={{ color: `${item.color}20` }}
      >
        "
      </div>

      {/* Accent top border animated */}
      <div
        className="absolute top-0 left-0 w-12 h-0.5 group-hover:w-full transition-all duration-700"
        style={{ background: item.color }}
      />

      <blockquote className="text-base md:text-lg text-[hsl(var(--foreground)/0.85)] leading-relaxed mb-8 italic font-light"
        style={{ fontFamily: 'var(--app-font-serif)' }}
      >
        "{item.quote}"
      </blockquote>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
        >
          {item.initials}
        </div>
        <div>
          <p className="text-sm font-semibold">{item.author}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-wider">{item.role}</p>
        </div>

        {/* Stars */}
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: item.color, fontSize: '0.6rem' }}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgFarRef = useRef<HTMLDivElement>(null);
  const bgNearRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Far background drifts up slowly
      gsap.to(bgFarRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Near bg layer moves faster — creates depth
      gsap.to(bgNearRef.current, {
        yPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
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
      className="testimonials-section relative py-32 overflow-hidden"
    >
      {/* FAR background layer */}
      <div
        ref={bgFarRef}
        className="absolute inset-0 -inset-y-[25%] pointer-events-none"
      >
        {/* Ambient blobs */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, hsl(185 40% 8% / 0.9) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Dashed circle decoration */}
        <svg
          className="absolute top-8 right-[5%] opacity-[0.04]"
          width="300" height="300" viewBox="0 0 300 300"
        >
          <circle cx="150" cy="150" r="130" stroke="white" strokeWidth="1" strokeDasharray="6 10" fill="none" />
          <circle cx="150" cy="150" r="90" stroke="white" strokeWidth="0.5" strokeDasharray="3 14" fill="none" />
        </svg>
      </div>

      {/* NEAR background layer — large text watermark */}
      <div
        ref={bgNearRef}
        className="absolute inset-0 -inset-y-[20%] pointer-events-none flex items-center overflow-hidden"
      >
        <p
          className="display-text w-full text-center select-none"
          style={{
            fontSize: 'clamp(8rem, 22vw, 20rem)',
            fontWeight: 700,
            color: 'hsl(var(--foreground) / 0.02)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          TRUST
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        <div ref={headingRef} style={{ opacity: 0 }} className="mb-20">
          <p className="section-label mb-4">Client Stories</p>
          <div className="flex items-end justify-between gap-8">
            <h2
              className="display-text"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700 }}
            >
              Words from<br />
              <span className="gradient-text">those we served</span>
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs hidden md:block leading-relaxed">
              We measure success by the relationships we build and the results we deliver together.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom flourish */}
        <div className="flex items-center justify-center gap-4 mt-20">
          <div className="h-px flex-1 max-w-[200px] bg-[hsl(var(--border))]" />
          <span className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase">Trusted by 40+ studios worldwide</span>
          <div className="h-px flex-1 max-w-[200px] bg-[hsl(var(--border))]" />
        </div>
      </div>
    </section>
  );
}
