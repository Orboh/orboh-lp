import { Link } from 'react-router-dom';
import { ArrowRight } from './ui';

export interface CaseStudyFeature {
  /** Retained so translations.ts is untouched; this design shows no icons. */
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyCardProps {
  number: string;
  title: string;
  quote: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: readonly CaseStudyFeature[];
  /** Route this case study has a full page for, if any */
  linkTo?: string;
  linkLabel?: string;
  /** Whether this card is the active (top) card in the stack */
  isActive?: boolean;
  /** Direction the card should animate from when changing */
  transitionDirection?: 'up' | 'down' | null;
}

export function CaseStudyCard({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  linkTo,
  linkLabel,
  transitionDirection = null,
  quote: _quote,
  isActive: _isActive,
}: CaseStudyCardProps) {
  const directionClass =
    transitionDirection === 'up'
      ? 'animate-card-up'
      : transitionDirection === 'down'
        ? 'animate-card-down'
        : '';

  return (
    <article className={directionClass}>
      {/* Full bleed, shown as shot: no inset, no border, no grey filter that
          lifts on hover. */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="block aspect-[21/9] w-full object-cover"
      />

      <div className="border-t border-ink pt-4">
        <p className="type-label text-muted">{number}</p>
        <h3 className="type-display text-xl md:text-2xl text-ink mt-3.5">{title}</h3>
      </div>

      <p className="mt-6 text-[19px] leading-[1.95] text-muted max-w-2xl">{description}</p>

      {linkTo && linkLabel && (
        <p className="mt-5">
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 text-accent text-sm font-medium border-b border-accent pb-0.5"
          >
            {linkLabel}
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </p>
      )}

      {/* Ruled columns, not icon tiles. */}
      <dl className="mt-9 grid sm:grid-cols-3 border-t border-hairline">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="py-5 sm:pr-7 border-b border-hairline sm:border-b-0 sm:border-r sm:last:border-r-0 sm:[&:not(:first-child)]:pl-7"
          >
            <dt className="text-sm font-medium text-ink">{feature.title}</dt>
            <dd className="mt-2.5 text-[17px] leading-[1.85] text-muted">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
