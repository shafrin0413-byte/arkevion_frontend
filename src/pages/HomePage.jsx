import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import StatsSection from '../components/sections/StatsSection';
import ContactCTA from '../components/sections/ContactCTA';

export default function HomePage() {
  useLenis();

  return (
    <PageTransition>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUs />
      <ContactCTA />
    </PageTransition>
  );
}