import { useState, useRef, useEffect } from 'react';
import { useLocale, useLocaleHref } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { CaseStudyCard } from './CaseStudyCard';
import { SectionHeading, sectionPad, sectionInner } from './ui';

export const WHAT_WE_CAN_DO_SECTION_ID = 'what-we-can-do';

/**
 * Case studies that have grown into a page of their own, keyed by the demo
 * number in translations.ts. Without this the okra work dead-ends in a card.
 */
const DEMO_PAGES: Record<string, string> = { '01': '/agri' };

export function WhatWeCanDoSection() {
  const { locale } = useLocale();
  const l = useLocaleHref();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const activeIndexRef = useRef(0);
  const animationTimeoutRef = useRef<number | null>(null);
  const prefersFinePointerRef = useRef(true);

  const t = translations[locale].caseStudy;
  const demos = t.demos;

  // Keep refs in sync with state and pointer type
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => {
      prefersFinePointerRef.current = mq.matches;
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Clear any running animation timeouts on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const animateToIndex = (nextIndex: number) => {
    const current = activeIndexRef.current;
    if (nextIndex === current) return;

    // Cancel any in-flight stepped animation
    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    const target = nextIndex;

    const step = () => {
      const now = activeIndexRef.current;
      if (now === target) return;

      const dir: 'up' | 'down' = target > now ? 'up' : 'down';
      const next = dir === 'up' ? now + 1 : now - 1;

      setDirection(dir);
      activeIndexRef.current = next;
      setActiveIndex(next);

      if (next !== target) {
        animationTimeoutRef.current = window.setTimeout(step, 120);
      } else {
        animationTimeoutRef.current = null;
      }
    };

    step();
  };

  const handleHover = (nextIndex: number) => {
    // Only use hover on devices with a fine pointer (desktops/laptops)
    if (!prefersFinePointerRef.current) return;
    animateToIndex(nextIndex);
  };

  const handleClick = (nextIndex: number) => {
    animateToIndex(nextIndex);
  };

  return (
    <section
      id={WHAT_WE_CAN_DO_SECTION_ID}
      className={`${sectionPad} py-20 md:py-24 bg-canvas`}
    >
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} className="mb-14" />

        <div className="grid md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-10 md:gap-14 items-start">
          <aside
            className="flex gap-6 md:flex-col md:gap-0 max-w-full md:max-w-xs overflow-x-auto pb-2 md:pb-0"
            aria-label="Case study list"
          >
            {demos.map((demo, index) => (
              <button
                key={demo.number}
                type="button"
                onMouseEnter={() => handleHover(index)}
                onFocus={() => handleClick(index)}
                onClick={() => handleClick(index)}
                className={`whitespace-nowrap text-left text-sm transition-colors pb-2.5 md:pb-0 md:py-3.5 md:pl-4 border-b-2 md:border-b-0 md:border-l-2 ${
                  activeIndex === index
                    ? 'border-accent text-ink font-medium'
                    : 'border-hairline text-muted hover:text-ink'
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted mr-2.5">
                  {demo.number}
                </span>
                {demo.title}
              </button>
            ))}
          </aside>

          <div className="case-study-card-container overflow-hidden">
            <CaseStudyCard
              key={demos[activeIndex].number}
              number={demos[activeIndex].number}
              title={demos[activeIndex].title}
              quote={demos[activeIndex].quote}
              description={demos[activeIndex].description}
              imageSrc={demos[activeIndex].imageSrc}
              imageAlt={demos[activeIndex].imageAlt}
              features={demos[activeIndex].features}
              linkTo={
                DEMO_PAGES[demos[activeIndex].number]
                  ? l(DEMO_PAGES[demos[activeIndex].number])
                  : undefined
              }
              linkLabel={
                DEMO_PAGES[demos[activeIndex].number]
                  ? locale === 'ja'
                    ? '農業でのヒューマノイド実装を見る'
                    : 'See humanoid robots in agriculture'
                  : undefined
              }
              isActive
              transitionDirection={direction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
