import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import BlogCard from '@/components/BlogCard';
import FAQ from '@/components/FAQ';
import Rich from '@/components/Rich';
import { posts } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';
import content from '@/content/pages/blog.json';

export const metadata = pageMeta({ path: '/blog' });

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const { hero, cardLinkLabel } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} crumbs={[{ label: 'Blog' }]} />

      <section className="section">
        <div className="container">
          <BlogCard post={featured} featured priority linkLabel={cardLinkLabel} />
          <div className="post-grid">
            {rest.map((p, i) => (
              <BlogCard key={p.slug} post={p} delay={(i % 3) * 90} linkLabel={cardLinkLabel} />
            ))}
          </div>
        </div>
      </section>

      <FAQ title={<Rich text={content.faq.title} />} items={content.faq.items} />

      <CTASection {...content.cta} />
    </>
  );
}
