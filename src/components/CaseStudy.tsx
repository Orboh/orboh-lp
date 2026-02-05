import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { CaseStudyCard } from './CaseStudyCard';

export const WHAT_WE_CAN_DO_SECTION_ID = 'what-we-can-do';

export function WhatWeCanDoSection() {
  const { locale } = useLocale();
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
      className="px-8 md:px-16 lg:px-24 py-24 bg-stone-100 text-stone-900"
    >
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-stone-500 text-sm tracking-widest mb-4">
          {t.eyebrow}
        </p>
        <h2
          className="text-3xl md:text-4xl font-light text-stone-900 mb-12 md:mb-16"
          style={{ letterSpacing: '-0.01em' }}
        >
          {t.title}
        </h2>

        <div className="grid md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-8 md:gap-16 items-start">
          <aside
            className="flex gap-2 md:flex-col md:gap-1 max-w-full md:max-w-xs overflow-x-auto pb-2 md:pb-0 -mx-2 md:mx-0 px-2 md:px-0"
            aria-label="Case study list"
          >
            {demos.map((demo, index) => (
              <button
                key={demo.number}
                type="button"
                onMouseEnter={() => handleHover(index)}
                onFocus={() => handleClick(index)}
                onClick={() => handleClick(index)}
                className={`whitespace-nowrap py-2 px-3 rounded-full md:rounded-md text-sm md:text-base transition-colors ${
                  activeIndex === index
                    ? 'bg-stone-800 text-stone-50 font-medium'
                    : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                <span className="text-stone-400 text-sm mr-2">{demo.number}</span>
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
              isActive
              transitionDirection={direction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
