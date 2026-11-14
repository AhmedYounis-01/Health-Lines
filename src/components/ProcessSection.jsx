import React, { memo } from 'react';
import { Compass } from 'lucide-react';

function ProcessSection({ lang, t }) {
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  const steps = isAr
    ? [
        {
          step: '1',
          title: 'شاركنا تفاصيل الحالة واحتياجك',
          desc: 'تواصل هاتفياً أو عبر واتساب واشرح لنا ما تشعر به لتحديد التخصص الأنسب لحالتك.',
        },
        {
          step: '2',
          title: 'نحدد الخدمة والموعد الملائم لك',
          desc: 'نرتب موعد الجلسة ونوضح لك كل تفاصيل الكشف المبدئي وخطة التقييم السريري.',
        },
        {
          step: '3',
          title: 'نبدأ خطة التعافي ومتابعة النتائج',
          desc: 'تستقبلك الأخصائية في جناح خاص ويبدأ التقييم الدقيق والبرنامج العلاجي فوراً.',
        },
      ]
    : [
        {
          step: '1',
          title: 'Share Your Case Details & Goals',
          desc: 'Contact us via phone or WhatsApp to describe your symptoms, pain points, and therapeutic goals.',
        },
        {
          step: '2',
          title: 'Select the Program & Appointment',
          desc: 'We coordinate your session schedule and outline expectations for your comprehensive clinical intake.',
        },
        {
          step: '3',
          title: 'Begin Recovery & Measure Milestones',
          desc: 'Meet your dedicated certified therapist in a private suite to launch evidence-based rehabilitation.',
        },
      ];

  return (
    <section id="process" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="shell">
        {/* Section Header Centered */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#629131]/12 dark:bg-lime-400/15 border border-[#629131]/25 text-xs font-semibold text-[#355e0d] dark:text-lime-300 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{isAr ? 'رحلة بسيطة ومريحة' : 'A Straightforward Path'}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#170a24] dark:text-white leading-[1.25] tracking-tight">
            {isAr ? 'من التواصل إلى أول جلسة' : 'From Contact to Your First Session'}
          </h2>
        </div>

        {/* 3-Step Process Grid matching datails-sa.online */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="relative p-7 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#250d30]/60 border border-[#9d237a]/15 dark:border-white/10 shadow-sm hover:shadow-lg transition-all flex flex-col items-start"
            >
              {/* Step Badge */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#861365] to-[#629131] text-white flex items-center justify-center text-xl font-bold font-mono shadow-md mb-6">
                {st.step}
              </div>

              {/* Step Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#170a24] dark:text-white mb-3 leading-snug">
                {st.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-[#503f63] dark:text-slate-300 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProcessSection);
