import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import BlogCard from '@/components/BlogCard';
import ArticleAside from '@/components/ArticleAside';
import Icon from '@/components/Icon';
import { posts, getPost, formatDate, slugify } from '@/lib/posts';
import { pageMeta, SITE_URL as SITE } from '@/lib/seo';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    image: { url: `/images/og/blog-${post.image.split('/').pop().replace('.webp', '.jpg')}`, width: 1200, height: 630, alt: post.title },
    openGraph: { publishedTime: post.date, authors: [post.author.name], section: post.category },
  });
}

function Block({ b }) {
  if (b.h2) return <h2 id={slugify(b.h2)}>{b.h2}</h2>;
  if (b.p) return <p>{b.p}</p>;
  if (b.quote) return <blockquote>{b.quote}</blockquote>;
  if (b.ul) return <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (b.ol) return <ol>{b.ol.map((li) => <li key={li}>{li}</li>)}</ol>;
  return null;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = post.body.filter((b) => b.h2).map((b) => ({ id: slugify(b.h2), text: b.h2 }));
  const idx = posts.indexOf(post);
  const related = [...posts.slice(idx + 1), ...posts.slice(0, idx)].slice(0, 3);
  const prev = posts[idx - 1];
  const next = posts[idx + 1];
  const initials = post.author.name.split(' ').map((w) => w[0]).join('').slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: SITE + post.image,
    author: { '@type': 'Organization', name: 'Innovage' },
    publisher: { '@type': 'Organization', name: 'Innovage Softwares Inc.' },
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={post.category} title={post.title} crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}>
        <div className="article-meta" data-reveal data-delay="160">
          <span className="avatar" aria-hidden="true">{initials}</span>
          <span>
            <strong>{post.author.name}</strong>
            <small>{post.author.role}</small>
          </span>
          <span className="meta-sep" aria-hidden="true" />
          <span>
            <strong>{formatDate(post.date)}</strong>
            <small>{post.read} read</small>
          </span>
        </div>
      </PageHero>

      <section className="section article-section">
        <div className="container">
          <figure className="article-cover" data-reveal>
            <Image src={post.image} alt={`${post.title} — cover illustration`} width={1600} height={900} priority sizes="(max-width: 1240px) 100vw, 1192px" />
          </figure>

          <div className="article-grid">
            <article className="article-body">
              <p className="article-intro">{post.excerpt}</p>
              {post.body.map((b, i) => (
                <Block key={i} b={b} />
              ))}

              <nav className="post-nav" aria-label="More articles">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="post-nav-link">
                    <small><Icon name="arrow" size={14} className="flip" /> Previous</small>
                    <span>{prev.title}</span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="post-nav-link next">
                    <small>Next <Icon name="arrow" size={14} /></small>
                    <span>{next.title}</span>
                  </Link>
                )}
              </nav>
            </article>

            <ArticleAside headings={headings} url={`${SITE}/blog/${post.slug}`} title={post.title} />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head left">
            <span className="eyebrow" data-reveal>Keep reading</span>
            <h2 className="h2" data-reveal data-delay="60">More from the <span className="grad-text">Blog</span></h2>
          </div>
          <div className="post-grid">
            {related.map((p, i) => (
              <BlogCard key={p.slug} post={p} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
