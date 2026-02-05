import { LocaleProvider } from '@/contexts/LocaleContext';
import { HomePage } from '@/pages/HomePage';

export default function App() {
  return (
    <LocaleProvider>
      <HomePage />
    </LocaleProvider>
  );
}
