import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: '01',
    title: 'Brand Identity',
    description: 'Logo design, visual systems, typography, colour strategy — built for recognition and longevity.',
    tags: ['Strategy', 'Visual Design', 'Guidelines'],
  },
  {
    number: '02',
    title: 'Digital Experiences',
    description: 'Websites and web apps that combine beautiful design with buttery-smooth interactions.',
    tags: ['React', 'Animation', 'Accessibility'],
  },
  {
    number: '03',
    title: 'Motion & Film',
    description: 'Explainers, brand films, and animated UI — storytelling through movement.',
    tags: ['After Effects', '3D', 'Direction'],
  },
  {
    number: '04',
    title: 'Creative Direction',
    description: 'Strategic visual leadership for campaigns, product launches, and brand refresh initiatives.',
    tags: ['Campaigns', 'Art Direction', 'Concepts'],
  },
  {
    number: '05',
    title: 'UX Strategy',
    description: 'Research-driven design thinking that aligns beautiful interfaces with real user needs.',
    tags: ['Research', 'Prototyping', 'Testing'],
  },
];

function ServiceItem({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const item = itemRef.current;
      if (!item) return;

      const onEnter = () => {
        gsap.to(numberRef.current, { color: 'hsl(185 100% 55%)', duration: 0.3 });
        gsap.to(arrowRef.current, { x: 8, opacity: 1, duration: 0.3 });
      };

      const onLeave = () => {
        gsap.to(numberRef.current, { color: 'hsl(40 10% 40%)', duration: 0.3 });
        gsap.to(arrowRef.current, { x: 0, opacity: 0.3, duration: 0.3 });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      return () => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      };
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="service-item py-8 group px-4"
      style={{ opacity: 0 }}
    >
      <div className="flex items-start gap-8">
        <span
          ref={numberRef}
          className="font-mono text-xs tracking-widest mt-1 shrink-0 transition-colors duration-300"
          style={{ color: 'hsl(40 10% 40%)' }}
        >
          {service.number}
        </span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold tracking-tight group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
              {service.title}
            </h3>
            <span
              ref={arrowRef}
              className="text-[hsl(var(--primary))] text-lg"
              style={{ opacity: 0.3 }}
            >
              →
            </span>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4 max-w-lg">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] tracking-wider uppercase"
                style={{ borderRadius: '2px' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Parallax on left side image block
      gsap.to('.services-visual', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 px-8"
      style={{ background: 'hsl(222 25% 4%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left */}
          <div ref={leftRef} className="lg:col-span-2" style={{ opacity: 0 }}>
            <p className="section-label mb-6">What we do</p>
            <h2
              className="display-text mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700 }}
            >
              Services that<br />
              <span className="gradient-text">move people</span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 text-sm max-w-sm">
              We combine strategic thinking with craft excellence across every medium — physical and digital.
            </p>

            {/* Visual block */}
            <div
              className="services-visual relative h-64 overflow-hidden"
              style={{ borderRadius: '4px' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(185 40% 8%) 0%, hsl(185 40% 10%) 100%)',
                }}
              />
              {/* Geometric shapes */}
              <div
                className="absolute top-6 left-6 w-20 h-20 border border-[hsl(var(--primary)/0.4)] rotate-12"
                style={{ borderRadius: '2px' }}
              />
              <div
                className="absolute bottom-6 right-6 w-16 h-16 rounded-full border border-[hsl(var(--accent)/0.4)]"
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                style={{ background: 'radial-gradient(circle, hsl(185 100% 55% / 0.2) 0%, transparent 70%)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-serif text-[hsl(var(--primary)/0.3)] select-none">✦</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="lg:col-span-3">
            {SERVICES.map((service, i) => (
              <ServiceItem key={service.number} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
