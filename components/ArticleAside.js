'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from './Icon';

/** Sticky article sidebar: table of contents with scroll-spy, share links and a CTA. */
export default function ArticleAside({ headings, url, title }) {
  const [active, setActive] = useState(headings[0]?.id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const enc = encodeURIComponent;
  return (
    <aside className="article-aside">
      {headings.length > 0 && (
        <nav className="toc" aria-label="On this page">
          <h4>On this page</h4>
          <ol>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className={active === h.id ? 'on' : ''}>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="share">
        <h4>Share</h4>
        <div className="share-row">
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
            in
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
            𝕏
          </a>
          <a href={`mailto:?subject=${enc(title)}&body=${enc(url)}`} aria-label="Share by email">
            <Icon name="mail" size={16} />
          </a>
          <button type="button" onClick={copy} aria-label="Copy link">
            {copied ? <Icon name="check" size={16} /> : <Icon name="link" size={16} />}
          </button>
        </div>
        {copied && <span className="copied" role="status">Link copied</span>}
      </div>

      <div className="aside-cta">
        <h4>Planning a project?</h4>
        <p>Book a free consultation and we&apos;ll help you find the right approach.</p>
        <Link href="/contact" className="btn btn-primary btn-sm">
          Book a Free Consultation <Icon name="arrow" size={16} />
        </Link>
      </div>
    </aside>
  );
}
