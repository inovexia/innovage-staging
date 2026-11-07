import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { formatDate } from '@/lib/posts';

export default function BlogCard({ post, featured = false, delay = 0, priority = false, linkLabel = 'Read article' }) {
  return (
    <article className={`post spot ${featured ? 'post-featured' : ''}`} data-reveal data-delay={delay} data-tilt={featured ? undefined : ''}>
      <Link href={`/blog/${post.slug}`} className="post-link" aria-label={post.title} />
      <div className="post-thumb">
        <Image
          src={post.image}
          alt=""
          fill
          priority={priority}
          sizes={featured ? '(max-width: 960px) 100vw, (max-width: 2200px) 54vw, 1100px' : '(max-width: 640px) 100vw, (max-width: 1080px) 50vw, (max-width: 2200px) 34vw, 700px'}
        />
        <span className="post-cat">{post.category}</span>
      </div>
      <div className="post-body">
        <div className="post-meta">
          {formatDate(post.date)} · {post.read} read
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="link-arrow">
          {linkLabel} <Icon name="arrow" size={16} />
        </span>
      </div>
    </article>
  );
}
