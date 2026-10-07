import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import BlogCard from '@/components/BlogCard';
import { posts } from '@/lib/posts';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Blog',
  description: 'Insights on custom software, automation, web design and digital product strategy from the Innovage team.',
  path: '/blog',
});

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights &"
        accent="Ideas"
        text="Practical thinking on software, automation, design and growing your business with technology."
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="section">
        <div className="container">
          <BlogCard post={featured} featured priority />
          <div className="post-grid">
            {rest.map((p, i) => (
              <BlogCard key={p.slug} post={p} delay={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Have a Project in Mind?" text="Turn the ideas in these articles into a plan for your business. We'll help you explore the right approach." />
    </>
  );
}
