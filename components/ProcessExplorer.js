'use client';

import { useEffect, useRef, useState } from 'react';
import { process } from '@/lib/data';
import Icon from './Icon';

const pad = (n) => String(n).padStart(2, '0');

/**
 * "How we work" as a step picker: the visitor chooses a stage (click, tap or
 * arrow keys) and the panel beside it shows the detail. Nothing is tied to
 * page scroll, so the page scrolls normally past it.
 */
export default function ProcessExplorer({ title, text, children }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const step = process[active];
  const last = process.length - 1;

  // on narrow screens the tabs are a horizontal strip: keep the active one in view
  useEffect(() => {
    const tab = tabsRef.current[active];
    const strip = tab?.parentElement;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const select = (i, focus) => {
    const next = Math.min(Math.max(i, 0), last);
    setActive(next);
    if (focus) tabsRef.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const keys = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key], true);
  };

  return (
    <section className="section pe-section">
      <div className="container">
        <div className="pe-head">
          <div>
            <h2 className="h2" data-reveal>{title}</h2>
            {text && <p className="lead" data-reveal data-delay="80">{text}</p>}
          </div>
          {children && <div data-reveal data-delay="140">{children}</div>}
        </div>

        <div className="pe-grid" data-reveal data-delay="120">
          <div className="pe-tabs" role="tablist" aria-label="Process stages" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {process.map((s, i) => (
              <button
                key={s.title}
                ref={(el) => (tabsRef.current[i] = el)}
                type="button"
                role="tab"
                id={`pe-tab-${i}`}
                aria-selected={i === active}
                aria-controls="pe-panel"
                tabIndex={i === active ? 0 : -1}
                className={`pe-tab ${i === active ? 'on' : ''} ${i < active ? 'done' : ''}`}
                onClick={() => select(i)}
              >
                <span className="pe-num">{pad(i + 1)}</span>
                <span className="pe-name">{s.title}</span>
                <Icon name="chevron" size={16} />
              </button>
            ))}
          </div>

          <div className="pe-panel" id="pe-panel" role="tabpanel" aria-labelledby={`pe-tab-${active}`}>
            <div className="pe-progress" aria-hidden="true">
              {process.map((s, i) => (
                <span key={s.title} className={i <= active ? 'on' : ''} />
              ))}
            </div>
            <div className="pe-body" key={active}>
              <span className="pe-big" aria-hidden="true">{pad(active + 1)}</span>
              <small className="pe-stage">Stage {active + 1} of {process.length}</small>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {step.deliverables && (
                <>
                  <strong className="pe-label">What you get</strong>
                  <ul className="pe-list">
                    {step.deliverables.map((d) => (
                      <li key={d}><Icon name="check" size={14} /> {d}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="pe-nav">
              <button type="button" className="pe-btn" onClick={() => select(active - 1)} disabled={active === 0} aria-label="Previous stage">
                <Icon name="arrow" size={16} />
              </button>
              <span>
                {active < last ? <>Next: <b>{process[active + 1].title}</b></> : <>And then we keep going.</>}
              </span>
              <button type="button" className="pe-btn next" onClick={() => select(active + 1)} disabled={active === last} aria-label="Next stage">
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
