'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { process } from '@/lib/data';
import ModelScene from './three/ModelScene';

/**
 * Pinned process section: the section sticks to the viewport while the page
 * scroll drives the active step (wheel, trackpad, keys and touch all work).
 * The step list slides inside its own frame and the left column shows a 3D
 * model for the active step. Normal scrolling resumes after the last step.
 */
const STEP_VH = 70; // scroll distance per step, in viewport heights

export default function ProcessShowcase({ eyebrow, title, text, children }) {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [offset, setOffset] = useState(0);

  // scroll position -> progress / active step
  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(Math.max(-r.top / span, 0), 1) : 0;
      setProgress(p);
      setActive(Math.min(Math.floor(p * process.length), process.length - 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // keep the active step centred inside the list frame
  useEffect(() => {
    const measure = () => {
      const frame = frameRef.current;
      const list = listRef.current;
      const step = list?.children[active];
      if (!frame || !step) return;
      const centre = step.offsetTop + step.offsetHeight / 2;
      const max = Math.max(list.scrollHeight - frame.clientHeight, 0);
      setOffset(Math.min(Math.max(centre - frame.clientHeight / 2, 0), max));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  // clicking a step scrolls the page to that step's slot
  const goTo = useCallback((i) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const span = wrap.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / process.length) * span, behavior: 'smooth' });
  }, []);

  return (
    <section ref={wrapRef} className="process-pin" style={{ height: `${100 + STEP_VH * (process.length - 1)}vh` }}>
      <div className="process-sticky">
        <div className="container process-grid">
          <div className="process-left">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="h2">{title}</h2>
            {text && <p className="lead process-lead">{text}</p>}
            <div className="process-stage">
              <ModelScene set="process" active={active} className="process-scene" zoom={6.6} />
              <div className="stage-caption" aria-live="polite">
                <span className="stage-count">
                  {String(active + 1).padStart(2, '0')}
                  <small> / {String(process.length).padStart(2, '0')}</small>
                </span>
                <span className="stage-title">{process[active].title}</span>
              </div>
            </div>
            {children}
          </div>

          <div className="process-frame" ref={frameRef}>
            <div className="timeline-track" aria-hidden="true">
              <div className="timeline-fill" style={{ transform: `scaleY(${progress})` }} />
            </div>
            <ol className="process-steps" ref={listRef} style={{ transform: `translateY(${-offset}px)` }}>
              {process.map((s, i) => (
                <li key={s.title} className={`step ${i <= active ? 'lit' : ''} ${i === active ? 'current' : ''}`}>
                  <button type="button" className="step-dot" onClick={() => goTo(i)} aria-label={`Go to step ${i + 1}: ${s.title}`}>
                    {String(i + 1).padStart(2, '0')}
                  </button>
                  <div className="step-card" onClick={() => goTo(i)}>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="process-dots" aria-hidden="true">
          {process.map((s, i) => (
            <span key={s.title} className={i === active ? 'on' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}
