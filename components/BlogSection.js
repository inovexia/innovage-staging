import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { posts, formatDate } from '@/lib/posts';

/** Home "latest from the blog": one featured story plus a stacked list of recent posts. */
export default function BlogSection() {
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 3);

  return (
    <section className="section bs-section">
      <div className="container">
        <div className="bs-head">
          <div>
            <span className="eyebrow" data-reveal>Insights</span>
            <h2 className="h2" data-reveal data-delay="60">
              Latest from <span className="grad-text">our blog</span>
            </h2>
            <p className="lead" data-reveal data-delay="120">
              Practical thinking on software, automation, design and growing your business with technology.
            </p>
          </div>
          <Link href="/blog" className="btn btn-ghost bs-all" data-reveal data-delay="160" data-magnetic>
            View all articles <Icon name="arrow" size={18} />
          </Link>
        </div>

        <div className="bs-grid">
          <article className="bs-feature" data-reveal data-delay="120">
            <Link href={`/blog/${featured.slug}`} className="bs-cover-link" aria-label={featured.title} />
            <Image src={featured.image} alt="" fill sizes="(max-width: 960px) 100vw, 700px" className="bs-feature-img" />
            <div className="bs-shade" aria-hidden="true" />
            <span className="bs-badge">
              <span className="pulse" /> Featured · {featured.category}
            </span>
            <div className="bs-feature-body">
              <div className="bs-meta">
                <span>{formatDate(featured.date)}</span>
                <i />
                <span>{featured.read} read</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className="bs-read">
                Read article
                <span className="bs-read-icon"><Icon name="arrowUpRight" size={18} /></span>
              </span>
            </div>
          </article>

          <div className="bs-list">
            {recent.map((p, i) => (
              <article key={p.slug} className="bs-item spot" data-reveal data-delay={180 + i * 90}>
                <Link href={`/blog/${p.slug}`} className="bs-cover-link" aria-label={p.title} />
                <div className="bs-thumb">
                  <Image src={p.image} alt="" fill sizes="(max-width: 640px) 40vw, 200px" />
                </div>
                <div className="bs-item-body">
                  <div className="bs-meta">
                    <span className="bs-cat">{p.category}</span>
                    <i />
                    <span>{p.read} read</span>
                  </div>
                  <h3>{p.title}</h3>
                  <span className="bs-date">{formatDate(p.date)}</span>
                </div>
                <span className="bs-arrow" aria-hidden="true">
                  <Icon name="arrowUpRight" size={18} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
