// Blog posts live in content/blog-posts.json; this adds the derived fields (author, cover image, read time).
import content from '@/content/blog-posts.json';

const wordsIn = (b) => (b.p || b.h2 || b.quote || [...(b.ul || []), ...(b.ol || [])].join(' ')).split(/\s+/).length;
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const posts = content.posts.map((p) => ({
  ...p,
  author: content.author,
  image: `/images/blog/${p.slug}.webp`,
  read: `${Math.max(3, Math.round(p.body.reduce((n, b) => n + wordsIn(b), 0) / 200))} min`,
}));

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
