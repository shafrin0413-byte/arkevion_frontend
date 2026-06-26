import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/sections/HeroSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ClientsTestimonials from '../components/sections/ClientsTestimonials';
import ContactCTA from '../components/sections/ContactCTA';

export default function Home() {
  useLenis();

  return (
    <PageTransition>
      <HeroSection />
      <WhyChooseUs />
      <ClientsTestimonials />
      <ContactCTA />
    </PageTransition>
  );
}
