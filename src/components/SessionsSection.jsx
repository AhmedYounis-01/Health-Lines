import React, { memo } from 'react';
import { Activity } from 'lucide-react';

function SessionsSection({ lang, t, onOpenBooking }) {
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  const showcaseItems = isAr
    ? [
        {
          num: '01',
          title: 'تأهيل العمود الفقري واستعادة الحركة',
          sub: 'دعم آمن للحركة وخطة تدريجية تحت إشراف نخبة من الأخصائيات',
          image: '/assets/therapy-female-spine.webp',
          isMain: true,
        },
        {
          num: '02',
          title: 'نحت القوام وتقنية فيلاشيب (VelaShape III)',
          sub: 'جلسات دقيقة لشد البشرة وتنسيق القوام وتفتيت السيلوليت',
          image: '/assets/velashape-female-contour.webp',
          isMain: false,
        },
        {
          num: '03',
          title: 'المساج والتصريف اللمفاوي الطبي المتقدم',
          sub: 'تنشيط الدورة اللمفاوية وتخفيف احتباس السوائل بعد العمليات',
          image: '/assets/lymphatic-female-drainage.webp',
          isMain: false,
        },
        {
          num: '04',
          title: 'استعادة الحيوية والتأهيل الحركي المتقدم',
          sub: 'برامج فردية تعيد لجسدك خفته ومرونته ونشاطه اليومي',
          image: '/assets/bodyscience-female-vitality.webp',
          isMain: false,
        },
      ]
    : [
        {
          num: '01',
          title: 'Spinal Decompression & Posture Rehab',
          sub: 'Evidence-based manual protocols restoring full spinal mobility',
          image: '/assets/therapy-female-spine.webp',
          isMain: true,
        },
        {
          num: '02',
          title: 'Body Contouring & VelaShape III',
          sub: 'FDA-cleared deep tissue remodeling and skin smoothing',
          image: '/assets/velashape-female-contour.webp',
          isMain: false,
        },
        {
          num: '03',
          title: 'Advanced Medical Lymphatic Drainage',
          sub: 'Specialized strokes clearing post-op edema and toxins',
          image: '/assets/lymphatic-female-drainage.webp',
          isMain: false,
        },
        {
          num: '04',
          title: 'Deep Vitality & Functional Movement',
          sub: 'Targeted strengthening rejuvenating daily energy and mobility',
          image: '/assets/bodyscience-female-vitality.webp',
          isMain: false,
        },
      ];

  const mainItem = showcaseItems[0];
  const sideItems = showcaseItems.slice(1);

  return (
    <section id="sessions" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="shell">
        {/* Showcase Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#629131]/12 dark:bg-lime-400/15 border border-[#629131]/25 text-xs font-semibold text-[#355e0d] dark:text-lime-300 mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>{isAr ? 'جلسات باحتراف داخل المركز' : 'Professional Clinical Sessions'}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#170a24] dark:text-white leading-[1.25] tracking-tight">
              {isAr ? (
                <>
                  كل حركة محسوبة.
                  <br />
                  <span className="text-[#861365] dark:text-fuchsia-300">وكل تقدم يستحق المتابعة.</span>
                </>
              ) : (
                <>
                  Every Movement Measured.
                  <br />
                  <span className="text-[#861365] dark:text-fuchsia-300">Every Progress Celebrated.</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#503f63] dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'صور توضح طبيعة أجنحتنا وجلسات التأهيل: بيئة علاجية راقية، أجهزة متطورة، واهتمام فائق يضمن خصوصيتك وراحتك التامة.'
              : 'Glimpse inside our specialized suites: safe clinical support, state-of-the-art equipment, and 100% private care tailored to you.'}
          </p>
        </div>

        {/* Showcase Asymmetric Grid matching datails-sa.online */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Main Large Card (Left side / 7 cols) */}
          <div className="lg:col-span-7">
            <figure
              onClick={onOpenBooking}
              className="group cursor-pointer relative h-[380px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden shadow-lg border border-[#9d237a]/15 dark:border-white/10"
            >
              <img
                src={mainItem.image}
                alt={mainItem.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92] dark:brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12041d]/90 via-[#12041d]/30 to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between gap-4 text-white">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#8cd63b] text-slate-950 font-bold font-mono text-xs mb-2">
                    {mainItem.num}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 text-white">
                    {mainItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    {mainItem.sub}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Side Stacked Cards (Right side / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 justify-between">
            {sideItems.map((item, idx) => (
              <figure
                key={idx}
                onClick={onOpenBooking}
                className="group cursor-pointer relative h-[175px] sm:h-[180px] rounded-3xl overflow-hidden shadow-md border border-[#9d237a]/15 dark:border-white/10 flex-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92] dark:brightness-[0.78]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12041d]/90 via-[#12041d]/25 to-transparent" />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3 text-white">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#8cd63b] text-slate-950 font-bold font-mono text-[11px] mb-1">
                      {item.num}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-200 line-clamp-1">
                      {item.sub}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SessionsSection);
