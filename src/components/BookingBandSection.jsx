import React, { memo } from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';

function BookingBandSection({ lang, t }) {
  const isAr = lang === 'ar' || t?.langCode === 'العربية';

  const whatsappUrl = `https://wa.me/966599530955?text=${encodeURIComponent(
    isAr ? 'مرحباً، أود الاستفسار وحجز استشارة في مركز خطوط الصحة بجدة' : 'Hello, I would like to book a consultation at Health Lines Center Jeddah'
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="shell">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-[#1b0826] via-[#481245] to-[#1d3514] text-white p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Subtle Decorative Ambient Rings */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full border-[40px] border-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border-[40px] border-[#8cd63b]/10 pointer-events-none" />

          {/* Left Column: Copy */}
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#8cd63b] mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'جاهزون لاستقبالك في جدة' : 'Ready to Serve You in Jeddah'}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-[1.25] tracking-tight mb-4">
              {isAr ? 'ابدأ جلسات العلاج الطبيعي والتأهيل اليوم' : 'Begin Your Physical Therapy Today'}
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {isAr
                ? 'اشرح حالتك وسنساعدك في ترتيب التقييم السريري والجلسة العلاجية المناسبة لك بكل سهولة وخصوصية.'
                : 'Share your condition and our clinical team will coordinate your comprehensive assessment and tailored therapy with utmost ease.'}
            </p>
          </div>

          {/* Right Column: Actions (Phone & WhatsApp) */}
          <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 shrink-0">
            {/* Call Button */}
            <a
              href="tel:0126918000"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white text-[#170a24] hover:bg-slate-100 font-bold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="w-8 h-8 rounded-full bg-[#9d237a]/15 text-[#861365] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-right rtl:text-right ltr:text-left leading-tight">
                <span className="block text-[11px] text-[#503f63] font-normal">
                  {isAr ? 'اتصل الآن' : 'Call Now'}
                </span>
                <span className="font-mono text-sm sm:text-base">012 691 8000</span>
              </div>
            </a>

            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#25D366]/25 transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>{isAr ? 'ابدأ محادثة واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(BookingBandSection);
