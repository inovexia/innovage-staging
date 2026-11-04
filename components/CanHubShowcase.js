import Link from 'next/link';
import Icon from './Icon';
import Counter from './Counter';
import CanHubStage from './CanHubStage';
import Rich from './Rich';

// Content comes from "canhub" in content/pages/home.json.
export default function CanHubShowcase({ badge, label, title, subtitle, text, highlights, primaryButton, secondaryButton }) {
  return (
    <section className="section th-section" aria-label={label}>
      <div className="container">
        <div className="th-feature">
          <div className="th-glow" aria-hidden="true" />
          <div className="th-grid">
            <div className="th-copy">
              {label && (
                <p className="th-label" data-reveal>
                  {badge && (
                    <span className="th-new">
                      <Icon name="spark" size={13} /> {badge}
                    </span>
                  )}
                  {label}
                </p>
              )}
              <h2 className="th-title" data-reveal data-delay="60">
                <Rich text={title} />
              </h2>
              <p className="th-sub" data-reveal data-delay="120">
                <Rich text={subtitle} em />
              </p>
              <p className="lead" data-reveal data-delay="180">{text}</p>
              <dl className="th-stats">
                {highlights.map((h, i) => (
                  <div key={h.label} className="th-stat spot" data-reveal data-delay={220 + i * 70}>
                    <dt>{typeof h.value === 'number' ? <Counter value={h.value} suffix={h.suffix} /> : h.value}</dt>
                    <dd>{h.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="btn-row" data-reveal data-delay="300">
                <Link href={primaryButton.href} className="btn btn-primary" data-magnetic>
                  {primaryButton.label} <Icon name="arrow" size={18} />
                </Link>
                <Link href={secondaryButton.href} className="btn btn-ghost" data-magnetic>
                  {secondaryButton.label}
                </Link>
              </div>
            </div>

            <CanHubStage />
          </div>
        </div>
      </div>
    </section>
  );
}
