import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { WhyFDESection, HowWeWorkSection } from '@/components/FDE';
import { WhatWeCanDoSection } from '@/components/CaseStudy';
import { RaaSSection } from '@/components/RaaS';
import { HumanoidHackPromoSection } from '@/components/HumanoidHackPromo';
import { DemoVideoSection } from '@/components/DemoVideo';
import { NotesSection } from '@/components/Notes';
import { TeamSection } from '@/components/Team';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';
import { useSeo } from '@/seo/useSeo';

// Autoplay muted and without the Loom top bar, so the frame is all video.
const LOOM_VIDEO_URL =
  'https://www.loom.com/embed/d99c9192aa50466f881a330a0813f732?autoplay=1&muted=true&hideEmbedTopBar=true&hide_owner=true&hide_share=true&hide_title=true';

export function HomePage() {
  // No scroll reset here: the footer's "/#team" anchor has to keep working.
  useSeo('');

  return (
    <Layout>
      <HeroSection />
      <WhyFDESection />
      <DemoVideoSection videoUrl={LOOM_VIDEO_URL} />
      <HowWeWorkSection />
      <WhatWeCanDoSection />
      <RaaSSection />
      <NotesSection />
      <HumanoidHackPromoSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
