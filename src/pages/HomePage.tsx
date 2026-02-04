import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { WhatWeCanDoSection } from '@/components/CaseStudy';
import { TeleoperationSection } from '@/components/HowItWorks';
import { DemoVideoSection } from '@/components/DemoVideo';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <WhatWeCanDoSection />
      <TeleoperationSection />
      <DemoVideoSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
