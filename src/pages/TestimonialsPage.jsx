import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import SectionHeader from '../components/ui/SectionHeader';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactCTA from '../components/sections/ContactCTA';

export default function TestimonialsPage() {
  useLenis();

  return (
    <PageTransition>
      <PageHeroBanner className="pt-28 pb-0 bg-white">
        <div className="container-pad pt-8">
          <SectionHeader
            tag="Client Reviews"
            title="What Our Clients Say"
            subtitle="Real results, real stories — from businesses that trusted us to deliver."
          />
        </div>
      </PageHeroBanner>
      <TestimonialsSection />
      <ContactCTA />
    </PageTransition>
  );
}
