'use client';

import { useEffect, useRef, useState } from 'react';

/** Table of contents with scroll-spy: highlights the section currently being read. */
export default function LegalToc({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    let raf = 0;
    const update = () => {
      raf = 0;
      // the active section is the last one whose heading has passed the reading line
      const line = window.innerHeight * 0.3;
      let current = els[0]?.id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
        else break;
      }
      // at the very bottom, the last section wins even if it is short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1]?.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  // keep the highlighted link visible when the TOC itself scrolls
  useEffect(() => {
    const link = listRef.current?.querySelector(`a[href="#${active}"]`);
    const box = listRef.current?.closest('.legal-toc');
    if (!link || !box || box.scrollHeight <= box.clientHeight) return;
    const l = link.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    if (l.top < b.top || l.bottom > b.bottom) box.scrollTo({ top: box.scrollTop + l.top - b.top - b.height / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <nav className="toc" aria-label="Table of contents">
      <h4>Table of Contents</h4>
      <ol ref={listRef}>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={active === i.id ? 'on' : ''} aria-current={active === i.id ? 'location' : undefined}>
              {i.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
