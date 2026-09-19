import type { ReactNode } from 'react';
import { Header } from './Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Type and canvas now come from the tokens in index.css, so there is no
  // inline font-family to keep in sync here.
  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      {children}
    </div>
  );
}
