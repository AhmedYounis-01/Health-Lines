import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

function ServicesSection({ lang, t, onOpenBooking }) {
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  const services = isAr
    ? [
        {
          num: '01',
          title: 'تأهيل ما بعد الجلطات والتأهيل العصبي',
          desc: 'تدريبات تدريجية دقيقة لإعادة التوصيل العصبي وتحسين التوازن والمشي والاعتماد على النفس.',
          category: 'neuro',
        },
        {
          num: '02',
          title: 'علاج العصب السابع وشلل الوجه',
          desc: 'تمارين تحفيزية متخصصة ومساج علاجي لاستعادة مرونة وتناسق عضلات الوجه والتعبير الطبيعي.',
          category: 'neuro',
        },
        {
          num: '03',
          title: 'آلام الظهر والرقبة والانزلاق الغضروفي',
          desc: 'تخفيف ضغط الفقرات وتسكين آلام الديسك وعرق النسا والشد العضلي عبر تقنيات العلاج اليدوي.',
          category: 'spine',
        },
        {
          num: '04',
          title: 'خشونة وآلام المفاصل وإصابات الركبة',
          desc: 'برامج تقوية واستعادة مرونة الغضاريف والمفاصل وتسهيل المشي وصعود الدرج بكل خفة.',
          category: 'joints',
        },
        {
          num: '05',
          title: 'التأهيل بعد العمليات الجراحية والكسور',
          desc: 'بروتوكولات متابعة دقيقة لتسريع التئام الأنسجة ومنع التيبس واستعادة المدى الحركي الطبيعي.',
          category: 'postop',
        },
        {
          num: '06',
          title: 'نحت القوام وتقنية فيلاشيب (VelaShape III)',
          desc: 'شد الجلد المترهل وتنسيق منحنيات الجسم وتفتيت السيلوليت بتقنية طبية معتمدة وآمنة تماماً.',
          category: 'velashape',
        },
        {
          num: '07',
          title: 'التصريف والمساج اللمفاوي الطبي المتقدم',
          desc: 'تحفيز الدورة اللمفاوية وتصريف احتباس السوائل وتخفيف التورمات بعد العمليات والولادة.',
          category: 'lymphatic',
        },
        {
          num: '08',
          title: 'العلاج الطبيعي لكبار السن واستعادة التوازن',
          desc: 'جلسات آمنة تراعي صحة وقدرة كبار السن لتقوية العضلات ومنع السقوط والحفاظ على النشاط اليومي.',
          category: 'joints',
        },
        {
          num: '09',
          title: 'علاج آلام الأبهر والشد العضلي المزمن',
          desc: 'تفكيك العقد العضلية بين لوحي الكتف وتخفيف الشد المزمن في أعلى الظهر لتحسين التنفس والراحة.',
          category: 'spine',
        },
      ]
    : [
        {
          num: '01',
          title: 'Post-Stroke & Neurological Rehabilitation',
          desc: 'Progressive neuromuscular conditioning to restore balance, gait, motor control, and daily independence.',
          category: 'neuro',
        },
        {
          num: '02',
          title: 'Bell’s Palsy & Facial Nerve Therapy',
          desc: 'Specialized neuromuscular retraining and stimulation to restore natural facial expression and muscle tone.',
          category: 'neuro',
        },
        {
          num: '03',
          title: 'Spine, Disc Herniation & Cervical Pain',
          desc: 'Clinical manual decompression eliminating compressed nerve roots, sciatica, and neck-shoulder tension.',
          category: 'spine',
        },
        {
          num: '04',
          title: 'Joint Arthrosis & Knee Rehabilitation',
          desc: 'Cartilage protection protocols, synovial fluid mobilization, and targeted strengthening for pain-free mobility.',
          category: 'joints',
        },
        {
          num: '05',
          title: 'Post-Operative & Fracture Recovery',
          desc: 'Structured surgical rehab preventing joint stiffness, reducing scar tissue, and accelerating safe recovery.',
          category: 'postop',
        },
        {
          num: '06',
          title: 'Body Contouring & VelaShape III',
          desc: 'FDA-cleared deep dermal remodeling, cellulite reduction, and circumference tightening with zero surgery.',
          category: 'velashape',
        },
        {
          num: '07',
          title: 'Advanced Medical Lymphatic Drainage',
          desc: 'Specialized lymphatic stimulation eliminating post-surgical edema, heavy-limb sensations, and fluid retention.',
          category: 'lymphatic',
        },
        {
          num: '08',
          title: 'Geriatric Physical Therapy & Balance',
          desc: 'Gentle, empowering functional therapy designed to prevent falls, build bone density, and preserve vitality.',
          category: 'joints',
        },
        {
          num: '09',
          title: 'Thoracic Trigger Point & Scapular Pain',
          desc: 'Decompressing myofascial knots between the scapulae, relieving breath restriction and chronic upper-back strain.',
          category: 'spine',
        },
      ];

  return (
    <section id="services-grid" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#9d237a]/5 to-transparent">
      <div className="shell">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9d237a]/12 dark:bg-fuchsia-400/15 border border-[#9d237a]/25 text-xs font-semibold text-[#861365] dark:text-fuchsia-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'خدماتنا العلاجية والتأهيلية' : 'Our Clinical Services'}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#170a24] dark:text-white leading-[1.25] tracking-tight">
              {isAr ? 'رعاية متخصصة لكل مرحلة' : 'Specialized Care for Every Stage'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#503f63] dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'برامج علاجية وتأهيلية مبنية حول أحدث الأبحاث الطبية، مع أهداف واضحة ومتابعة دقيقة تضمن نتائج ملموسة.'
              : 'Structured rehabilitation and wellness programs tailored to each patient’s physical capacity with clear measurable recovery milestones.'}
          </p>
        </div>

        {/* 3-Column Responsive Service Grid matching datails-sa.online */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((srv, idx) => (
            <motion.article
              key={idx}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={onOpenBooking}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/75 hover:bg-white/95 dark:bg-[#2b1236]/65 dark:hover:bg-[#381647]/85 border border-[#9d237a]/15 hover:border-[#9d237a]/35 dark:border-white/10 dark:hover:border-fuchsia-400/40 shadow-sm hover:shadow-xl hover:shadow-[#9d237a]/10 dark:hover:shadow-black/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Number + Top Right Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-[#861365] dark:text-fuchsia-300 group-hover:text-[#629131] dark:group-hover:text-lime-400 transition-colors">
                    {srv.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#9d237a]/10 dark:bg-white/10 flex items-center justify-center text-[#861365] dark:text-fuchsia-300 group-hover:bg-[#629131] group-hover:text-white dark:group-hover:bg-lime-400 dark:group-hover:text-slate-950 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#170a24] dark:text-white mb-3 group-hover:text-[#861365] dark:group-hover:text-fuchsia-200 transition-colors leading-snug">
                  {srv.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-[#503f63] dark:text-slate-300 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-6 pt-4 border-t border-[#9d237a]/10 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#355e0d] dark:text-lime-400">
                <span>{isAr ? 'احجز جلستك الآن' : 'Book Session'}</span>
                <span className="text-[11px] text-[#503f63] dark:text-slate-400 font-normal">
                  {isAr ? 'تقييم سريري شامل' : 'Clinical Evaluation'}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesSection);

