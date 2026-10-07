import Icon from './Icon';

/** Accordion FAQ list (native <details>, so it works without JavaScript). */
export default function FAQ({ id, eyebrow = 'FAQ', title, items }) {
  return (
    <section id={id} className="section">
      <div className="container faq-wrap">
        <div className="section-head left">
          <span className="eyebrow" data-reveal>{eyebrow}</span>
          <h2 className="h2" data-reveal data-delay="60">{title}</h2>
        </div>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q} className="faq spot" data-reveal data-delay={i * 60} open={i === 0}>
              <summary>
                {f.q}
                <span className="faq-icon" aria-hidden="true"><Icon name="chevron" size={18} /></span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
