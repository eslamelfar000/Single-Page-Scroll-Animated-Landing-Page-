import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, hsl(222 25% 4% / 0.95) 0%, transparent 100%)', backdropFilter: 'blur(2px)' }}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))]" style={{ boxShadow: '0 0 20px hsl(185 100% 50% / 0.5)' }} />
        <span className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--foreground))]">Luminis</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['work', 'services', 'about', 'contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="nav-link"
          >
            {item}
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollTo('contact')}
        className="btn-primary text-xs py-2 px-5"
      >
        <span>Start a Project</span>
      </button>
    </nav>
  );
}
