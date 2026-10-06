import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="Page" accent="Not Found" text="The page you're looking for doesn't exist or has moved." />
      <section className="section">
        <div className="container">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
