import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    cursorRef.current = cursor as HTMLDivElement;
    followerRef.current = follower as HTMLDivElement;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.set(cursor, {
        x: mouseX,
        y: mouseY,
      });
    };

    const onMouseEnterInteractive = () => {
      cursor.classList.add('cursor-hover');
      gsap.to(follower, { scale: 1.5, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      cursor.classList.remove('cursor-hover');
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    const ticker = gsap.ticker.add(() => {
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      gsap.set(follower, { x: followerX, y: followerY });
    });

    const interactiveEls = document.querySelectorAll('a, button, .project-card, .service-item');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);
}
