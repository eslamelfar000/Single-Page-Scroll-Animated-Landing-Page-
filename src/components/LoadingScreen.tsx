import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);

  const LETTERS = 'LUMINIS'.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    // Start: everything invisible
    gsap.set(letterRefs.current, { y: 60, opacity: 0, rotateX: -90 });
    gsap.set([ring1Ref.current, ring2Ref.current], { scale: 0, opacity: 0, transformOrigin: 'center' });
    gsap.set(circleRef.current, { strokeDashoffset: 440, opacity: 0 });
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });

    // Phase 1: Rings expand in
    tl.to(ring1Ref.current, {
      scale: 1, opacity: 0.3, duration: 0.9, ease: 'expo.out',
    }, 0.2)
    .to(ring2Ref.current, {
      scale: 1, opacity: 0.15, duration: 1.1, ease: 'expo.out',
    }, 0.3)

    // Phase 2: Circle trace draws
    .to(circleRef.current, {
      opacity: 1, duration: 0.3,
    }, 0.4)
    .to(circleRef.current, {
      strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut',
    }, 0.5)

    // Phase 3: Letters fall in with stagger
    .to(letterRefs.current, {
      y: 0, opacity: 1, rotateX: 0,
      duration: 0.7, ease: 'back.out(2)',
      stagger: 0.06,
    }, 0.8)

    // Phase 4: Tagline
    .to(taglineRef.current, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
    }, 1.4);

    // Progress bar & counter
    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate() {
        const v = Math.round(progressObj.val);
        setCount(v);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${v}%`;
        }
      },
    }, 1.0);

    // Phase 5: Rings pulse
    tl.to([ring1Ref.current, ring2Ref.current], {
      scale: 1.08, opacity: 0, duration: 0.6, ease: 'power2.in',
      stagger: 0.1,
    }, 2.5);

    // Phase 6: Exit — letters scatter upward, circle shrinks
    tl.to(letterRefs.current, {
      y: -30, opacity: 0, duration: 0.5, ease: 'power3.in',
      stagger: 0.04,
    }, 2.6)
    .to(circleRef.current, {
      scale: 0, opacity: 0, duration: 0.5, ease: 'power3.in',
      transformOrigin: 'center',
    }, 2.65)
    .to(taglineRef.current, {
      opacity: 0, y: -10, duration: 0.4,
    }, 2.7)

    // Phase 7: Curtain wipe up
    .to(container, {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      },
    }, 2.9);

    // Rings rotate continuously
    gsap.to(ring1Ref.current, {
      rotation: 360, duration: 8, ease: 'none', repeat: -1,
      transformOrigin: 'center',
    });
    gsap.to(ring2Ref.current, {
      rotation: -360, duration: 12, ease: 'none', repeat: -1,
      transformOrigin: 'center',
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'hsl(222 25% 4%)' }}
    >
      {/* SVG geometric backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer dashed ring */}
          <circle
            ref={ring1Ref}
            cx="200" cy="200" r="160"
            stroke="hsl(185 100% 55%)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          {/* Mid ring */}
          <circle
            ref={ring2Ref}
            cx="200" cy="200" r="120"
            stroke="hsl(340 85% 62%)"
            strokeWidth="0.5"
            strokeDasharray="2 12"
          />
          {/* Animated tracing circle */}
          <circle
            ref={circleRef}
            cx="200" cy="200" r="70"
            stroke="hsl(185 100% 55%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="440"
            strokeDashoffset="440"
            transform="rotate(-90 200 200)"
          />
        </svg>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Letters */}
        <div className="flex items-center gap-1 md:gap-2" style={{ perspective: '600px' }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={el => { if (el) letterRefs.current[i] = el; }}
              className="display-text font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 10vw, 6rem)',
                color: i === 0 || i === LETTERS.length - 1
                  ? 'hsl(185 100% 55%)'
                  : 'hsl(var(--foreground))',
                display: 'inline-block',
                lineHeight: 1,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="section-label text-center"
          style={{ letterSpacing: '0.4em', fontSize: '0.6rem' }}
        >
          Creative Studio — Crafting Digital Futures
        </p>
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-12 left-0 right-0 px-12 flex items-center gap-6">
        <div
          className="flex-1 h-px relative overflow-hidden"
          style={{ background: 'hsl(var(--border))' }}
        >
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 h-full"
            style={{
              width: '0%',
              background: 'linear-gradient(to right, hsl(185 100% 55%), hsl(340 85% 62%))',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-mono text-xs text-[hsl(var(--primary))] w-8 text-right shrink-0"
        >
          {count}
        </span>
      </div>

      {/* Corner dots */}
      {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-1 h-1 rounded-full`}
          style={{ background: 'hsl(var(--primary) / 0.4)' }}
        />
      ))}
    </div>
  );
}
