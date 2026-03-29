import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bigTextRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.footer-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-bottom',
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[hsl(var(--border))]">
      {/* Big brand text */}
      <div
        ref={bigTextRef}
        className="py-16 px-8 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <p
          className="display-text text-center"
          style={{
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            fontWeight: 700,
            color: 'hsl(var(--foreground) / 0.04)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          LUMINIS
        </p>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom border-t border-[hsl(var(--border))] px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 footer-item" style={{ opacity: 0 }}>
            <div
              className="w-5 h-5 rounded-full"
              style={{ background: 'hsl(var(--primary))', boxShadow: '0 0 10px hsl(185 100% 55% / 0.4)' }}
            />
            <span className="text-sm font-semibold tracking-widest uppercase">Luminis Studio</span>
          </div>

          <div className="flex items-center gap-8">
            {['Work', 'Services', 'About', 'Contact'].map(link => (
              <button
                key={link}
                className="footer-item nav-link"
                style={{ opacity: 0 }}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              >
                {link}
              </button>
            ))}
          </div>

          <p className="text-xs text-[hsl(var(--muted-foreground))] footer-item" style={{ opacity: 0 }}>
            © 2026 Luminis Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
