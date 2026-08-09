import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { WhyFDESection, HowWeWorkSection } from '@/components/FDE';
import { WhatWeCanDoSection } from '@/components/CaseStudy';
import { RaaSSection } from '@/components/RaaS';
import { HumanoidHackPromoSection } from '@/components/HumanoidHackPromo';
import { DemoVideoSection } from '@/components/DemoVideo';
import { TeamSection } from '@/components/Team';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';
import { useSeo } from '@/seo/useSeo';

const LOOM_VIDEO_URL = 'https://www.loom.com/embed/d99c9192aa50466f881a330a0813f732';

export function HomePage() {
  // No scroll reset here: the footer's "/#team" anchor has to keep working.
  useSeo('');

  return (
    <Layout>
      <HeroSection />
      <WhyFDESection />
      <HowWeWorkSection />
      <WhatWeCanDoSection />
      <RaaSSection />
      <DemoVideoSection videoUrl={LOOM_VIDEO_URL} />
      <HumanoidHackPromoSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
