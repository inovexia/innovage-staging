import Link from 'next/link';
import PageHero from './PageHero';
import Icon from './Icon';
import LegalToc from './LegalToc';

const EMAIL = 'enquiry@innovagesoft.com';

// Body blocks: { p } | { ul: [] } | { contact: true }
function Block({ b, subject }) {
  if (b.ul) return <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (b.contact)
    return (
      <p>
        If you would like to contact us to understand more about this {subject} or wish to contact us concerning any
        matter relating to individual rights and your Personal Information, you may do so via the{' '}
        <Link href="/contact">contact form</Link> or send an email to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    );
  return <p>{b.p}</p>;
}

/** Legal document layout: sticky table of contents + numbered, linkable sections. */
export default function LegalPage({ title, accent, text, crumb, intro, sections, subject, contactTitle }) {
  return (
    <>
      <PageHero title={title} accent={accent} text={text} crumbs={[{ label: crumb }]} />
      <section className="section">
        <div className="container legal-grid">
          <aside className="legal-toc">
            <LegalToc items={sections.map((s) => ({ id: s.id, title: s.title }))} />
          </aside>

          <article className="prose legal-body">
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? 'legal-lead' : undefined}>{p}</p>
            ))}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal-section">
                <h2>
                  <span>{String(i + 1).padStart(2, '0')}</span> {s.title}
                </h2>
                {s.body.map((b, j) => (
                  <Block key={j} b={b} subject={subject} />
                ))}
              </section>
            ))}
            <div className="legal-contact">
              <span className="svc-icon"><Icon name="mail" /></span>
              <div>
                <strong>{contactTitle}</strong>
                <p>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or use our contact form.</p>
              </div>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Contact us <Icon name="arrow" size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
