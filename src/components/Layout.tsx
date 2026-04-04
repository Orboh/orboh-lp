import type { ReactNode } from 'react';
import { Header } from './Header/Header';

const fontFamily = "'Noto Sans JP', sans-serif";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen bg-zinc-50"
      style={{ fontFamily }}
    >
      <Header />
      {children}
    </div>
  );
}
