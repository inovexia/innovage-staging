'use client';

import Link from 'next/link';
import { useState } from 'react';
import { solutions } from '@/lib/data';
import Icon from './Icon';
import ModelScene from './three/ModelScene';

export default function SolutionsList() {
  const [active, setActive] = useState(0);

  return (
    <div className="solutions">
      <ul className="solutions-list">
        {solutions.map((s, i) => (
          <li
            key={s.title}
            className={i === active ? 'active' : ''}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Link href={s.href} data-reveal data-delay={i * 70}>
              <span className="sol-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="sol-title">{s.title}</span>
              <Icon name="arrowUpRight" size={26} className="sol-arrow" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="solutions-panel spot" data-reveal data-delay="120">
        <ModelScene set="solutions" active={active} className="sol-scene" />
        {solutions.map((s, i) => (
          <div key={s.title} className={`sol-detail ${i === active ? 'show' : ''}`} aria-hidden={i !== active}>
            <span className="sol-big">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <Link href={s.href} className="link-arrow" tabIndex={i === active ? 0 : -1}>
              {s.cta} <Icon name="arrow" size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
