import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ContactCTA from '../components/sections/ContactCTA';

export default function HomePage() {
  useLenis();

  return (
    <PageTransition>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactCTA />
    </PageTransition>
  );
}
