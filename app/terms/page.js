import PageHero from '@/components/PageHero';

export const metadata = { title: 'Terms & Condition' };

// TODO: paste the legal copy from the current WordPress "Terms & Condition" page
export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms &" accent="Condition" crumbs={[{ label: 'Terms & Condition' }]} />
      <section className="section">
        <div className="container prose">
          <p>Terms and conditions content goes here.</p>
        </div>
      </section>
    </>
  );
}
