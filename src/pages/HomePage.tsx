import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { RaaSSection } from '@/components/RaaS';
import { RoboNetSection } from '@/components/RoboNet';
import { DemoVideoSection } from '@/components/DemoVideo';
import { WhitepaperSection } from '@/components/Whitepaper';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';

const LOOM_VIDEO_URL = 'https://www.loom.com/embed/d99c9192aa50466f881a330a0813f732';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <RaaSSection />
      <RoboNetSection />
      <DemoVideoSection videoUrl={LOOM_VIDEO_URL} />
      <WhitepaperSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
