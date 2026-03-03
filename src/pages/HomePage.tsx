import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { WhatWeCanDoSection } from '@/components/CaseStudy';
import { TeleoperationSection } from '@/components/HowItWorks';
import { DemoVideoSection } from '@/components/DemoVideo';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';

const LOOM_VIDEO_URL = 'https://www.loom.com/embed/d99c9192aa50466f881a330a0813f732';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <WhatWeCanDoSection />
      <TeleoperationSection />
      <DemoVideoSection videoUrl={LOOM_VIDEO_URL} />
      <CTASection />
      <Footer />
    </Layout>
  );
}
