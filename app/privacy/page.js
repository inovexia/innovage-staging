import PageHero from '@/components/PageHero';

export const metadata = { title: 'Privacy Policy' };

// TODO: paste the legal copy from the current WordPress "Privacy Policy" page
export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy" accent="Policy" crumbs={[{ label: 'Privacy Policy' }]} />
      <section className="section">
        <div className="container prose">
          <p>Privacy policy content goes here.</p>
        </div>
      </section>
    </>
  );
}
