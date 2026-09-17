import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocaleProvider } from '@/contexts/LocaleContext';
import type { Locale } from '@/i18n/translations';
import { JA_PREFIX } from '@/i18n/routing';
import { HomePage } from '@/pages/HomePage';
import { HumanoidHackPage } from '@/pages/HumanoidHackPage';
import { HumanoidHackHackathonPage } from '@/pages/HumanoidHackHackathonPage';
import { FleetSeekPage } from '@/pages/FleetSeekPage';
import { HiringPage } from '@/pages/HiringPage';
import { AgriPage } from '@/pages/AgriPage';
import { InsightsIndexPage } from '@/pages/InsightsIndexPage';
import { ShenzhenRoboticsPage } from '@/pages/insights/ShenzhenRoboticsPage';
import { OkraHarvestPage } from '@/pages/insights/OkraHarvestPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/**
 * One route table, rendered twice: English at the root and Japanese under
 * /ja. Keeping the locale in the URL is what makes the Japanese pages exist
 * as separate, indexable documents.
 */
function LocaleRoutes({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="fleetseek" element={<FleetSeekPage />} />
        <Route path="humanoidhack" element={<HumanoidHackPage />} />
        <Route path="humanoidhack/hackathon" element={<HumanoidHackHackathonPage />} />
        <Route path="hiring" element={<HiringPage />} />
        <Route path="agri" element={<AgriPage />} />
        <Route path="insights" element={<InsightsIndexPage />} />
        {locale === 'ja' && (
          <Route path="insights/shenzhen-robotics" element={<ShenzhenRoboticsPage />} />
        )}
        {locale === 'ja' && <Route path="insights/okra-harvest" element={<OkraHarvestPage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LocaleProvider>
  );
}

/** Router-agnostic route tree, shared by the browser and the prerenderer. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path={`/${JA_PREFIX}/*`} element={<LocaleRoutes locale="ja" />} />
      <Route path="/*" element={<LocaleRoutes locale="en" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
