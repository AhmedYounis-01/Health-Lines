import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus } from 'lucide-react';

function FAQSection({ lang, t }) {
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  const [openIdx, setOpenIdx] = useState(0);

  const faqs = isAr
    ? [
        {
          q: 'هل أحتاج إلى تحويل طبي أو تقرير قبل حجز الجلسة؟',
          a: 'لا يشترط وجود تحويل طبي مسبق. يقوم أخصائياتنا بفحص وتقييم سريري شامل في الجلسة الأولى لتشخيص الحالة ووضع الخطة الملائمة. إذا كان لديك أي أشعة أو تقارير سابقة فمن المفيد إحضارها معك.',
        },
        {
          q: 'كم جلسة تحتاج الحالة لملاحظة التحسن والتعافي؟',
          a: 'يعتمد عدد الجلسات على التشخيص ونوع الحالة وشدتها، ويُحدد بدقة بعد التقييم الأولي. يلاحظ معظم عملائنا تحسناً وتراجعاً في الألم خلال أول ٣ إلى ٦ جلسات وفق التزامهم بالخطة العلاجية.',
        },
        {
          q: 'ما هي تقنية فيلاشيب 3 (VelaShape) وكيف تعمل لنحت القوام؟',
          a: 'هي تقنية طبية غير جراحية معتمدة من هيئة الغذاء والدواء، تجمع بين الأشعة تحت الحمراء، والتردد الراديوي ثنائي القطب (RF)، والمساج الميكانيكي لشد ترهلات الجلد، تفتيت السيلوليت، وتقليل محيط الجسم بدون أي فترة نقاهة.',
        },
        {
          q: 'ما هي فوائد المساج والتصريف اللمفاوي ومن يحتاجه؟',
          a: 'يساعد المساج اللمفاوي على تسريع تصريف السوائل المحتبسة بالجسم، تقليل الانتفاخ والتورمات الناتجة عن العمليات الجراحية أو الولادة، علاج ثقل الأطراف، وتحفيز الجهاز المناعي واستعادة الحيوية.',
        },
        {
          q: 'أين يقع مركز خطوط الصحة في جدة وما هي أوقات العمل؟',
          a: 'يقع مركزنا في جدة، طريق الأمير ماجد (السبعين) - حي الربوة - مركز العلي للأعمال (البرج الجنوبي) - الدور الرابع. نستقبلكم من السبت إلى الخميس من الساعة ٩:٠٠ صباحاً حتى ٩:٠٠ مساءً.',
        },
      ]
    : [
        {
          q: 'Do I need a doctor referral or previous reports prior to booking?',
          a: 'No prior medical referral is required. Our certified specialists conduct an in-depth clinical evaluation during your first session. If you possess recent imaging or medical records, you are encouraged to bring them.',
        },
        {
          q: 'How many sessions are typically required to feel noticeable improvement?',
          a: 'Duration varies based on condition chronicity and tissue response, established during intake. Most patients report substantial pain relief and mobility gains within 3 to 6 sessions.',
        },
        {
          q: 'What is VelaShape III and how does it remodel body contours?',
          a: 'VelaShape III is an FDA-cleared non-invasive system harmonizing infrared heat, bipolar radiofrequency, and vacuum massage to stimulate collagen remodeling, reduce cellulite, and sculpt circumference with zero downtime.',
        },
        {
          q: 'Who benefits from medical lymphatic drainage massage?',
          a: 'It is highly recommended for post-operative recovery (liposuction, cosmetic or orthopedic surgery), chronic water retention, lipedema/lymphedema symptoms, and immune stimulation.',
        },
        {
          q: 'Where is Health Lines Center located in Jeddah and what are the hours?',
          a: 'We are situated on Prince Majed Road (Al-Sabeen), Al-Rabwah, Al-Ali Business Center (South Tower, 4th Floor), Jeddah. Operating Saturday through Thursday from 9:00 AM to 9:00 PM.',
        },
      ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#9d237a]/5 to-transparent">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Description (4 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9d237a]/12 dark:bg-fuchsia-400/15 border border-[#9d237a]/25 text-xs font-semibold text-[#861365] dark:text-fuchsia-300 mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#170a24] dark:text-white leading-[1.25] tracking-tight mb-5">
              {isAr ? (
                <>
                  كل ما تحتاج معرفته
                  <br />
                  <span className="text-[#861365] dark:text-fuchsia-300">قبل الحجز</span>
                </>
              ) : (
                <>
                  Everything to Know
                  <br />
                  <span className="text-[#861365] dark:text-fuchsia-300">Before Booking</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#503f63] dark:text-slate-300 leading-relaxed font-medium">
              {isAr
                ? 'إجابات واضحة ومباشرة لأهم الأسئلة عن خدمات العلاج الطبيعي والتأهيل وجلسات نحت القوام بمركزنا بجدة.'
                : 'Clear, concise answers addressing your questions about our therapy protocols, specialized equipment, and clinical visits.'}
            </p>
          </div>

          {/* Right Column: Accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {faqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl border border-[#9d237a]/15 dark:border-white/10 bg-white/70 dark:bg-[#250d30]/60 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-right rtl:text-right ltr:text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#170a24] dark:text-white leading-snug">
                      {item.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#861365] text-white'
                          : 'bg-[#9d237a]/10 dark:bg-white/10 text-[#861365] dark:text-fuchsia-300'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#503f63] dark:text-slate-300 leading-relaxed border-t border-[#9d237a]/10 dark:border-white/10 pt-3">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQSection);

