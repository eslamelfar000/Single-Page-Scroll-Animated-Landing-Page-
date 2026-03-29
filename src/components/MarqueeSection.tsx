import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TAGS_1 = ['Branding', '✦', 'Motion Design', '✦', 'Web Development', '✦', 'UX Strategy', '✦', '3D Art', '✦', 'Visual Identity', '✦'];
const TAGS_2 = ['Creative Direction', '✦', 'Art Direction', '✦', 'Digital Innovation', '✦', 'Interaction Design', '✦', 'Brand Strategy', '✦'];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-12 overflow-hidden border-y border-[hsl(var(--border))]" style={{ opacity: 0 }}>
      {/* First marquee row */}
      <div className="relative overflow-hidden mb-4">
        <div className="marquee-track">
          {[...TAGS_1, ...TAGS_1].map((tag, i) => (
            <span
              key={i}
              className={`mx-6 text-sm tracking-widest uppercase shrink-0 ${
                tag === '✦'
                  ? 'text-[hsl(var(--primary))]'
                  : 'text-[hsl(var(--muted-foreground))]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Second marquee row */}
      <div className="relative overflow-hidden">
        <div className="marquee-track marquee-track-reverse">
          {[...TAGS_2, ...TAGS_2].map((tag, i) => (
            <span
              key={i}
              className={`mx-6 text-sm tracking-widest uppercase shrink-0 font-light ${
                tag === '✦'
                  ? 'text-[hsl(var(--accent))]'
                  : 'text-[hsl(var(--muted-foreground)/0.6)]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
