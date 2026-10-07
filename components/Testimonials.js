'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/data';
import Icon from './Icon';

const DURATION = 7000; // ms each testimonial stays up while autoplaying

/**
 * Stacked card deck that auto-advances (a progress bar on the active client
 * drives the timing). Pauses on hover/focus and off-screen, supports swipe,
 * arrows and the client list; no autoplay with reduced motion.
 */
export default function Testimonials() {
  const n = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef(null);
  const dragX = useRef(null);

  const go = (i) => setActive(((i % n) + n) % n);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduced;

  const onPointerDown = (e) => (dragX.current = e.clientX);
  const onPointerUp = (e) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section ref={ref} className="section tm-section" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="tm-bg" aria-hidden="true">
        <span className="tm-orb a" />
        <span className="tm-orb b" />
        <span className="tm-mark">&ldquo;</span>
      </div>

      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-reveal>Testimonials</span>
          <h2 className="h2" data-reveal data-delay="60">
            Don&apos;t take <span className="grad-text">our word for it.</span>
          </h2>
          <p className="lead" data-reveal data-delay="120">
            Long-term partnerships are the best measure of our work. Here&apos;s what the businesses we build with say.
          </p>
        </div>

        <div
          className="tm-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* card deck */}
          <div
            className="tm-deck"
            data-reveal
            data-delay="120"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (dragX.current = null)}
          >
            <div className="tm-ring" aria-hidden="true" />
            {testimonials.map((t, i) => {
              const offset = (i - active + n) % n;
              return (
                <figure
                  key={t.client}
                  className="tm-card"
                  data-offset={offset}
                  aria-hidden={offset !== 0}
                  onClick={() => offset !== 0 && go(i)}
                >
                  <span className="tm-quote-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" width="44" height="44">
                      <path d="M20 10C11 13 6 20 6 29v9h14V24h-7c0-5 3-9 9-11l-2-3zm22 0c-9 3-14 10-14 19v9h14V24h-7c0-5 3-9 9-11l-2-3z" fill="currentColor" />
                    </svg>
                  </span>
                  <blockquote>
                    {offset === 0 ? (
                      <p key={active} aria-live="polite">
                        {t.quote.split(' ').map((w, wi) => (
                          <span key={wi} className="tm-word" style={{ '--i': wi }}>
                            {w}{' '}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p>{t.quote}</p>
                    )}
                  </blockquote>
                  <figcaption>
                    <span className="tm-logo">
                      <Image src={t.logo} alt="" width={120} height={44} />
                    </span>
                    <span>
                      <strong>{t.client}</strong>
                      <small>{t.category}</small>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* client list + controls */}
          <div className="tm-side" data-reveal data-delay="200">
            <ul className="tm-tabs">
              {testimonials.map((t, i) => (
                <li key={t.client}>
                  <button
                    type="button"
                    className={`tm-tab ${i === active ? 'on' : ''}`}
                    aria-current={i === active}
                    onClick={() => go(i)}
                  >
                    <span className="tm-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tm-tab-text">
                      <strong>{t.client}</strong>
                      <small>{t.category}</small>
                    </span>
                    <Icon name="arrowUpRight" size={18} className="tm-tab-arrow" />
                    {i === active && !reduced && (
                      <span
                        key={active}
                        className="tm-progress"
                        style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? 'running' : 'paused' }}
                        onAnimationEnd={() => go(active + 1)}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tm-controls">
              <span className="tm-count">
                <b>{String(active + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
              </span>
              <div className="tm-arrows">
                <button type="button" className="tm-arrow" aria-label="Previous testimonial" onClick={() => go(active - 1)}>
                  <Icon name="arrow" size={18} className="flip" />
                </button>
                <button type="button" className="tm-arrow" aria-label="Next testimonial" onClick={() => go(active + 1)}>
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
