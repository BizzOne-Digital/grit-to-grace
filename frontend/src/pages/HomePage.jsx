import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import WhoWeServeSection from '../components/home/WhoWeServeSection';
import MissionSection from '../components/home/MissionSection';
import FounderSection from '../components/home/FounderSection';
import FaithSection from '../components/home/FaithSection';
import ServicesSection from '../components/home/ServicesSection';
import PricingSection from '../components/home/PricingSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <WhoWeServeSection />
      <MissionSection />
      <FounderSection />
      <FaithSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
