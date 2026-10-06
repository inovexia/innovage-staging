'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Site-wide interaction layer, re-bound on every route change:
 *  - [data-reveal]   fade/slide in when scrolled into view (optional data-delay in ms)
 *  - .spot           pointer-tracking spotlight via --mx/--my
 *  - [data-tilt]     subtle 3D tilt toward the pointer
 *  - [data-magnetic] buttons that lean toward the pointer
 *  - scroll progress bar + soft cursor glow
 */
export default function Effects() {
  const pathname = usePathname();
  const glowRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const delay = Number(el.dataset.delay || 0);
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('in');
          setTimeout(() => (el.style.transitionDelay = ''), delay + 900);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => {
      if (reduced) el.classList.add('in');
      else io.observe(el);
    });

    const cleanups = [() => io.disconnect()];

    if (fine && !reduced) {
      // Spotlight + tilt
      const onMove = (e) => {
        const glow = glowRef.current;
        if (glow) glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        const spot = e.target.closest?.('.spot');
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
          spot.style.setProperty('--my', `${e.clientY - r.top}px`);
        }
        const tilt = e.target.closest?.('[data-tilt]');
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.transform = `perspective(900px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-4px)`;
        }
      };
      const onOut = (e) => {
        const tilt = e.target.closest?.('[data-tilt]');
        if (tilt && !tilt.contains(e.relatedTarget)) tilt.style.transform = '';
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerout', onOut);
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerout', onOut);
      });

      // Magnetic buttons
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
        };
        const leave = () => (el.style.transform = '');
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        });
      });
    }

    // Scroll progress
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
}
