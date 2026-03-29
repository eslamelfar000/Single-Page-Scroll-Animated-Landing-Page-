import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 8, suffix: 'yrs', label: 'Years of Craft' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 40, suffix: '+', label: 'Global Clients' },
];

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        itemRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: index * 0.1 }
      );

      tl.fromTo(
        { val: 0 },
        { val: stat.value },
        {
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            if (numRef.current) {
              numRef.current.textContent = Math.round(this.targets()[0].val).toString();
            }
          },
        },
        '-=0.5'
      );
    }, itemRef);

    return () => ctx.revert();
  }, [stat.value, index]);

  return (
    <div ref={itemRef} className="text-center" style={{ opacity: 0 }}>
      <div className="counter-number mb-2">
        <span ref={numRef}>0</span>
        <span style={{ color: 'hsl(var(--primary))', fontFamily: 'inherit' }}>{stat.suffix}</span>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))] tracking-widest uppercase">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="py-32 px-8 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, hsl(185 40% 8% / 0.8) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.5)] to-transparent mb-20"
          style={{ transformOrigin: 'left center' }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div
          className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent mt-20"
        />
      </div>
    </section>
  );
}
