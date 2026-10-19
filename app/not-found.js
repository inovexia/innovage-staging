import Link from 'next/link';
import PageHero from '@/components/PageHero';
import content from '@/content/pages/not-found.json';

export default function NotFound() {
  const { hero, button } = content;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} />
      <section className="section">
        <div className="container">
          <Link href={button.href} className="btn btn-primary">{button.label}</Link>
        </div>
      </section>
    </>
  );
}
