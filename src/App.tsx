import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { HomePage } from '@/pages/HomePage';
import { HumanoidHackPage } from '@/pages/HumanoidHackPage';
import { HumanoidHackHackathonPage } from '@/pages/HumanoidHackHackathonPage';
import { FleetSeekPage } from '@/pages/FleetSeekPage';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleetseek" element={<FleetSeekPage />} />
          <Route path="/humanoidhack" element={<HumanoidHackPage />} />
          <Route path="/humanoidhack/hackathon" element={<HumanoidHackHackathonPage />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}
