import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { WhatWeCanDoSection } from '@/components/CaseStudy';
import { TeleoperationSection } from '@/components/HowItWorks';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <WhatWeCanDoSection />
      <TeleoperationSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
