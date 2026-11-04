'use client';

import { useState } from 'react';
import Icon from '../Icon';

const SWATCHES = [
  { name: 'Crimson', color: '#ed001c' },
  { name: 'Ocean', color: '#2563eb' },
  { name: 'Emerald', color: '#059669' },
  { name: 'Violet', color: '#7c3aed' },
  { name: 'Amber', color: '#d97706' },
];
const MODES = ['Dark', 'Light'];

/** Interactive white-label demo: pick an accent and mode, the mini portal re-skins live. */
export default function ThemePreview() {
  const [accent, setAccent] = useState(SWATCHES[0]);
  const [mode, setMode] = useState('Dark');

  return (
    <div className="tp-theme" data-reveal data-delay="120">
      <div className="tp-theme-controls">
        <div>
          <small>Brand colour</small>
          <div className="tp-swatches" role="radiogroup" aria-label="Brand colour">
            {SWATCHES.map((s) => (
              <button
                key={s.name}
                type="button"
                role="radio"
                aria-checked={accent.name === s.name}
                aria-label={s.name}
                className={`tp-swatch ${accent.name === s.name ? 'on' : ''}`}
                style={{ '--sw': s.color }}
                onClick={() => setAccent(s)}
              />
            ))}
          </div>
        </div>
        <div>
          <small>Theme</small>
          <div className="tp-modes" role="radiogroup" aria-label="Theme">
            {MODES.map((m) => (
              <button key={m} type="button" role="radio" aria-checked={mode === m} className={`tp-mode ${mode === m ? 'on' : ''}`} onClick={() => setMode(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`tp-portal ${mode === 'Light' ? 'light' : ''}`} style={{ '--accent': accent.color }} aria-label="Branded portal preview" role="img">
        <div className="tp-portal-bar">
          <span className="tp-logo">Y</span>
          <strong>Your Firm CPA</strong>
          <span className="tp-portal-user" />
        </div>
        <div className="tp-portal-body">
          <div className="tp-portal-welcome">
            <small>Welcome back</small>
            <strong>Your 2026 return checklist</strong>
          </div>
          <div className="tp-portal-progress">
            <span style={{ width: '67%' }} />
          </div>
          <ul>
            {['Bank statements — Q1', 'Fuel receipts', 'Payroll summary'].map((t, i) => (
              <li key={t}>
                <span className={`tp-dot ${i === 0 ? 'done' : ''}`}>{i === 0 && <Icon name="check" size={11} />}</span>
                {t}
              </li>
            ))}
          </ul>
          <span className="tp-portal-btn">Upload documents</span>
        </div>
      </div>
    </div>
  );
}
