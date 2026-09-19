import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';
import { SectionHeading, sectionPad, sectionInner } from './ui';
import miyajima from '@/assets/team/miyajima.webp';
import ueda from '@/assets/team/ueda.webp';
import uchiyama from '@/assets/team/uchiyama.webp';

const PHOTOS: Record<string, { src: string; position: string } | undefined> = {
  CEO: { src: miyajima, position: '50% 22%' },
  CTO: { src: ueda, position: '50% 18%' },
  COO: { src: uchiyama, position: '50% 30%' },
};

export function TeamSection() {
  const { locale } = useLocale();
  const t = translations[locale].team;

  return (
    <section id="team" className={`${sectionPad} py-20 md:py-24 bg-canvas`}>
      <div className={sectionInner}>
        <SectionHeading label={t.eyebrow} title={t.title} lead={t.lead} className="mb-14" />

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {t.members.map((member) => (
            <div key={member.role} className="flex flex-col">
              {/* Portrait fills its cell edge to edge. */}
              <div className="relative aspect-[4/5] bg-hairline overflow-hidden">
                {PHOTOS[member.role] ? (
                  <img
                    src={PHOTOS[member.role]!.src}
                    alt={member.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: PHOTOS[member.role]!.position }}
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center type-display text-4xl text-muted">
                    {member.initials}
                  </span>
                )}
              </div>

              <div className="border-t border-ink mt-5 pt-3.5">
                <p className="type-label text-muted">{member.role}</p>
                <h3 className="type-display text-lg text-ink mt-3">{member.name}</h3>
                <p className="text-muted text-xs mt-1">{member.nameSub}</p>
              </div>

              <ul className="mt-5 flex flex-col">
                {member.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-muted text-[17px] leading-[1.85] py-2.5 border-b border-hairline"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
