import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ProcessShowcase from '@/components/ProcessShowcase';

export const metadata = {
  title: 'Process',
  description: 'Discover, Define, Design, Build, Validate, Launch, Evolve — the Innovage seven-step process.',
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Our Proven"
        accent="Process"
        text="Our proven process brings together business discovery, product strategy, UX/UI design, development, testing, deployment, and ongoing improvement."
        crumbs={[{ label: 'Process' }]}
      />

      <ProcessShowcase
        eyebrow="Seven steps"
        title={<>Discover <span className="grad-text">→</span> Evolve</>}
        text="At every stage, we work closely with you to reduce uncertainty, maintain visibility, and build technology that delivers real business value."
      />

      <CTASection />
    </>
  );
}
