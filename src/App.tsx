import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { HomePage } from '@/pages/HomePage';
import { HumanoidHackPage } from '@/pages/HumanoidHackPage';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/humanoidhack" element={<HumanoidHackPage />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}
