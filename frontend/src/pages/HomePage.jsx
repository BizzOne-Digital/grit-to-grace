import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import ServicesSection from '../components/home/ServicesSection';
import PricingSection from '../components/home/PricingSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
