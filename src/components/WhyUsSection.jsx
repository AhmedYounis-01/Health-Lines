import React, { memo } from 'react';
import { Check, HeartPulse, Sparkles } from 'lucide-react';
import TestimonialsSlider from './TestimonialsSlider';

function WhyUsSection({ lang, t, onOpenBooking }) {
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  const checkItems = isAr
    ? [
        {
          title: 'تقييم سريري شامل ومفصل',
          desc: 'تحديد أهداف علاجية واقعية ودقيقة قبل البدء بأي جلسة.',
        },
        {
          title: 'خطة علاجية فردية ومتكاملة',
          desc: 'برنامج مخصص يتناسب مع قدرات جسدك ونمط حياتك اليومي.',
        },
        {
          title: 'أحدث الأجهزة والتقنيات الطبية',
          desc: 'أجهزة فيلاشيب 3، ومعدات تأهيل متطورة معتمدة دولياً.',
        },
        {
          title: 'خصوصية نسائية تامة ૧٠٠٪',
          desc: 'أجنحة خاصة مغلقة وكادر أخصائيات معتمدات لراحتك التامة.',
        },
      ]
    : [
        {
          title: 'Comprehensive Clinical Assessment',
          desc: 'Realistic, measurable milestones established prior to initiating therapy.',
        },
        {
          title: 'Individualized Treatment Roadmap',
          desc: 'Tailored protocols designed around your physical capacity and lifestyle.',
        },
        {
          title: 'World-Class FDA-Cleared Technology',
          desc: 'Advanced VelaShape III, decompression tables, and rehabilitation tools.',
        },
        {
          title: '100% Private Dedicated Suites',
          desc: 'Completely private treatment rooms with certified female therapists.',
        },
      ];

  return (
    <section id="why" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#629131]/5 to-transparent">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Media Column (Left side / 6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#9d237a]/20 dark:border-white/10 group">
              <img
                src="/assets/about-sanctuary-suite.webp"
                alt="Health Lines Sanctuary Suite Jeddah"
                loading="lazy"
                className="w-full h-[360px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.94] dark:brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12041d]/85 via-transparent to-transparent" />
              {/* Floating Media Note */}
              <div className="absolute bottom-6 inset-x-6 p-4 sm:p-5 rounded-2xl bg-white/85 dark:bg-[#250d30]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#629131] text-white flex items-center justify-center shrink-0 shadow-md">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <div>
                  <b className="block text-sm sm:text-base font-bold text-[#170a24] dark:text-white">
                    {isAr ? 'الرعاية في بيئة متكاملة' : 'Care in a Dedicated Sanctuary'}
                  </b>
                  <span className="text-xs text-[#503f63] dark:text-slate-300">
                    {isAr ? 'لأن الراحة جزء أساسي من رحلة التعافي' : 'Because peace of mind is vital to physical restoration'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Column (Right side / 6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9d237a]/12 dark:bg-fuchsia-400/15 border border-[#9d237a]/25 text-xs font-semibold text-[#861365] dark:text-fuchsia-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'لماذا تختار مركز خطوط الصحة؟' : 'Why Choose Health Lines?'}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#170a24] dark:text-white leading-[1.25] tracking-tight mb-5">
              {isAr ? (
                <>
                  معك من أول تقييم
                  <br />
                  <span className="text-[#861365] dark:text-fuchsia-300">حتى كل خطوة أفضل</span>
                </>
              ) : (
                <>
                  With You From First Evaluation
                  <br />
                  <span className="text-[#861365] dark:text-fuchsia-300">To Every Better Step</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#3b2a4c] dark:text-slate-200 leading-relaxed font-medium mb-8">
              {isAr
                ? 'نعمل بمنهجية سريرية واضحة ومحترمة؛ نشرح لك تفاصيل الخطة، نتابع الاستجابة الجسدية في كل جلسة، ونكيّف البرنامج بما يلائم تسارع تعافيك.'
                : 'We operate with clinical transparency and respect; clearly outlining your recovery milestones, measuring session-by-session response, and evolving treatments dynamically.'}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full mb-8">
              {checkItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 dark:bg-[#250d30]/50 border border-[#9d237a]/10 dark:border-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-[#629131]/20 text-[#355e0d] dark:text-lime-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#170a24] dark:text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#503f63] dark:text-slate-300 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#861365] to-[#629131] hover:opacity-95 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>{isAr ? 'ابدأ رحلة عافيتك معنا الآن' : 'Begin Your Healing Journey'}</span>
              <span>←</span>
            </button>
          </div>
        </div>

        {/* Real Patient Ratings & Testimonials Interactive Carousel */}
        <TestimonialsSlider lang={lang} t={t} />
      </div>
    </section>
  );
}

export default memo(WhyUsSection);
