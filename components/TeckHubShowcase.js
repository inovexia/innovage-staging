import Link from 'next/link';
import Icon from './Icon';
import Counter from './Counter';
import TeckHubStage from './TeckHubStage';

const highlights = [
  { value: 'OCR', label: 'Receipts coded to CRA GIFI' },
  { value: 2, label: 'Filing pipelines, business and personal' },
  { value: 10, suffix: '+', label: 'Modules in one portal' },
  { value: 100, suffix: '%', label: 'White-label, your branding' },
];

export default function TeckHubShowcase() {
  return (
    <section className="section th-section">
      <div className="th-glow" aria-hidden="true" />
      <div className="container th-grid">
        <div className="th-copy">
          <span className="eyebrow" data-reveal>Our Product</span>
          <h2 className="th-title" data-reveal data-delay="60">
            TeckHub<span className="grad-text">360</span>
          </h2>
          <p className="th-sub" data-reveal data-delay="120">
            The portal Canadian accounting firms <em>run filing season on.</em>
          </p>
          <p className="lead" data-reveal data-delay="180">
            A white-label client portal built for Canadian accounting firms — document intake, OCR that maps receipts to
            CRA GIFI codes, GST/HST and personal filing pipelines, financial invoices and payroll, under your own branding.
          </p>
          <dl className="th-stats">
            {highlights.map((h, i) => (
              <div key={h.label} className="th-stat spot" data-reveal data-delay={220 + i * 70}>
                <dt>{typeof h.value === 'number' ? <Counter value={h.value} suffix={h.suffix} /> : h.value}</dt>
                <dd>{h.label}</dd>
              </div>
            ))}
          </dl>
          <div className="btn-row" data-reveal data-delay="300">
            <Link href="/teckhub360" className="btn btn-primary" data-magnetic>
              Explore TeckHub360 <Icon name="arrow" size={18} />
            </Link>
            <Link href="/contact" className="btn btn-ghost" data-magnetic>
              Book a demo
            </Link>
          </div>
        </div>

        <TeckHubStage />
      </div>
    </section>
  );
}
