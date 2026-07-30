import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/Hero';
import { RaaSSection } from '@/components/RaaS';
import { FleetSeekSection } from '@/components/FleetSeek';
import { HumanoidHackPromoSection } from '@/components/HumanoidHackPromo';
import { DemoVideoSection } from '@/components/DemoVideo';
import { WhitepaperSection } from '@/components/Whitepaper';
import { TeamSection } from '@/components/Team';
import { CTASection } from '@/components/CTA';
import { Footer } from '@/components/Footer/Footer';

const LOOM_VIDEO_URL = 'https://www.loom.com/embed/d99c9192aa50466f881a330a0813f732';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <RaaSSection />
      <FleetSeekSection />
      <DemoVideoSection videoUrl={LOOM_VIDEO_URL} />
      <HumanoidHackPromoSection />
      <WhitepaperSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </Layout>
  );
}
