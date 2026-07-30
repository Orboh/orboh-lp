import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/i18n/translations';

// Drop portrait files into src/assets/team/ and register them here, e.g.:
// import miyajima from '@/assets/team/miyajima.webp';
// const PHOTOS: Record<string, string | undefined> = { CEO: miyajima, ... };
const PHOTOS: Record<string, string | undefined> = {
  CEO: undefined,
  CTO: undefined,
  COO: undefined,
};

export function TeamSection() {
  const { locale } = useLocale();
  const t = translations[locale].team;

  return (
    <section id="team" className="px-8 md:px-16 lg:px-24 py-24 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-orange-600 text-xs tracking-widest uppercase mb-4">{t.eyebrow}</p>
        <h2 className="font-mono text-3xl md:text-4xl font-normal text-zinc-900 mb-5" style={{ letterSpacing: '-0.02em' }}>
          {t.title}
        </h2>
        <p className="text-zinc-600 text-sm md:text-base max-w-2xl mb-12 leading-relaxed">{t.lead}</p>

        <div className="grid md:grid-cols-3 gap-4">
          {t.members.map((member) => (
            <div key={member.role} className="rounded border border-zinc-200 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] bg-zinc-100">
                {PHOTOS[member.role] ? (
                  <img
                    src={PHOTOS[member.role]}
                    alt={member.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-5xl text-zinc-300">
                    {member.initials}
                  </span>
                )}
              </div>
              <div className="p-7 flex flex-col gap-4 flex-1">
                <div>
                  <p className="text-orange-600 text-xs tracking-widest uppercase mb-2">{member.role}</p>
                  <h3 className="text-lg font-medium text-zinc-900">{member.name}</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">{member.nameSub}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {member.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-zinc-600 text-sm leading-relaxed">
                      <span className="text-orange-600 shrink-0 mt-0.5">・</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
