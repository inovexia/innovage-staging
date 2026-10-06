'use client';

import { useEffect, useRef, useState } from 'react';
import { process } from '@/lib/data';

export default function ProcessTimeline() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      setProgress(p);
      const steps = el.querySelectorAll('.step');
      let a = 0;
      steps.forEach((s, i) => {
        if (s.getBoundingClientRect().top < mid) a = i;
      });
      setActive(a);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <div className="timeline-track" aria-hidden="true">
        <div className="timeline-fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
      <ol>
        {process.map((s, i) => (
          // reveal attrs live on children: React rewrites the li's className as `active` changes
          <li key={s.title} className={`step ${i <= active ? 'lit' : ''} ${i === active ? 'current' : ''}`}>
            <span className="step-dot" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="step-card spot" data-reveal>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
