import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles, Phone, Star } from 'lucide-react';
import ChapterVideoBackground from './ChapterVideoBackground';
import { useDeviceProfile } from '../hooks/useDeviceProfile';

const EXPO_OUT = [0.16, 1, 0.3, 1];

function HeroChapter({ lang, t, onOpenBooking }) {
  const sectionRef = useRef(null);
  const { isMobile, isWeakOrSaveData } = useDeviceProfile();
  const useStaticMobile = isMobile || isWeakOrSaveData;
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  // Parallax on desktop only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const whatsappUrl = `https://wa.me/966599530955?text=${encodeURIComponent(
    isAr ? 'مرحباً، أود حجز جلسة علاج طبيعي وتأهيل في مركز خطوط الصحة بجدة' : 'Hello, I would like to book a physical therapy consultation at Health Lines Center Jeddah'
  )}`;

  const heroFacts = isAr
    ? [
        { num: '٠١', title: 'كادر طبي متخصص', sub: 'نخبة من أخصائيات وأخصائيي العلاج الطبيعي المعتمدين' },
        { num: '٠٢', title: 'خطة علاجية مخصصة', sub: 'تشخيص سريري دقيق وفق أحدث البروتوكولات الدولية' },
        { num: '٠٣', title: 'أحدث الأجهزة والتقنيات', sub: 'فيلاشيب 3، مساج لمفاوي، وتأهيل حركي متقدم' },
        { num: '٠٤', title: 'أعلى معايير الخصوصية', sub: 'أجنحة نسائية مغلقة بالكامل لراحتك التامة' },
      ]
    : [
        { num: '01', title: 'Specialized Medical Team', sub: 'Elite certified physical therapists & clinical staff' },
        { num: '02', title: 'Tailored Recovery Plan', sub: 'Accurate clinical diagnosis & evidence-based protocols' },
        { num: '03', title: 'Advanced Technology', sub: 'VelaShape III, lymphatic detox & functional rehab' },
        { num: '04', title: '100% Private Setting', sub: 'Dedicated private closed suites for utmost peace' },
      ];

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-0"
    >
      {/* Primary Video Background — Serene, High-Definition, Zero Forced Zoom */}
      <ChapterVideoBackground
        videoSrc={['/videos/pt-hero-clinic.webm', '/videos/pt-hero-clinic.mp4']}
        posterSrc="/assets/hero-sanctuary.jpg"
        alt="Health Lines Rehabilitation Sanctuary Suite"
        glowClass="bg-[#9d237a]/25 dark:bg-[#9d237a]/35"
        glowSecondaryClass="bg-[#629131]/20 dark:bg-[#84cc16]/25"
        parallaxY={useStaticMobile ? null : bgY}
        priority={true}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 shell my-auto py-8 sm:py-14 flex flex-col items-center text-center">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center w-full"
          style={useStaticMobile ? undefined : { y: contentY, opacity }}
        >
          {/* Top World-Class Concierge Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="mb-5 sm:mb-6"
          >
            <button
              type="button"
              onClick={onOpenBooking}
              className="group cursor-pointer inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/12 hover:bg-white/20 dark:bg-black/30 dark:hover:bg-black/45 border border-white/25 hover:border-[#8cd63b] dark:border-white/15 dark:hover:border-lime-400 text-white backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.25)] transition-all duration-300"
            >
              {/* Pulsing Live Beacon */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8cd63b] opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8cd63b] shadow-[0_0_10px_#8cd63b]" />
              </span>

              {/* Concierge Text */}
              <span className="text-xs sm:text-sm font-medium tracking-wide text-white">
                {isAr
                  ? 'مركز خطوط الصحة · من قلب جدة، لجمال قوامكِ وعافيتكِ التامة'
                  : 'HEALTH LINES · From the Heart of Jeddah, to Your Vitality'}
              </span>

              {/* Sparkle Icon */}
              <Sparkles className="w-3.5 h-3.5 text-[#8cd63b] group-hover:rotate-12 transition-transform shrink-0" />
            </button>
          </motion.div>

          {/* Main Headline — Clean, Crisp, Zero White Halos/Shadows */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.16] mb-5 sm:mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <span className="text-white">{isAr ? 'قبل أول خطوة،' : 'Before the First Step,'}</span>
            <br />
            <em className="italic font-light bg-gradient-to-r from-fuchsia-200 via-pink-100 to-lime-200 bg-clip-text text-transparent">
              {isAr ? 'صحتكِ تبدأ هنا.' : 'Your Health Begins Here.'}
            </em>
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-100/90 leading-relaxed font-normal mb-8 sm:mb-10 px-3 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
            {isAr
              ? 'توازن. خفة. علم. تجدد. جلسات علاج طبيعي وتأهيل متقدم ونحت قوام في جدة، بخطة فردية بإشراف أخصائيات معتمدات في أجنحة خاصة تمنحكِ الراحة التامة.'
              : 'Balance. Lightness. Science. Renewal. Advanced physical therapy, rehabilitation, and body sculpting in Jeddah, tailored by certified specialists in completely private suites.'}
          </p>

          {/* World-Class Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none mb-9 sm:mb-11">
            {/* Primary Action Button — Rich Brand Gradient with Light Shimmer & Glow */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-9 sm:py-4.5 rounded-full bg-gradient-to-r from-[#9d237a] via-[#861365] to-[#5b872b] hover:from-[#aa1f83] hover:via-[#941771] hover:to-[#689932] text-white font-bold text-sm sm:text-base border border-white/25 shadow-[0_12px_35px_rgba(157,35,122,0.45),0_0_20px_rgba(140,214,59,0.25)] hover:shadow-[0_16px_45px_rgba(157,35,122,0.6),0_0_30px_rgba(140,214,59,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Subtle hover sweep shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <span className="relative z-10">{isAr ? 'احجز جلستك الآن' : 'Book Your Session Now'}</span>
              <ArrowIcon className="w-4 h-4 text-white relative z-10 transition-transform group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button — Sleek Frosted Glass WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:px-8 sm:py-4.5 rounded-full bg-white/10 hover:bg-white/18 dark:bg-black/35 dark:hover:bg-black/50 border border-white/25 dark:border-white/15 text-white font-semibold text-sm sm:text-base backdrop-blur-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
              </div>
              <span>{isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
            </a>

            {/* Direct Phone Call Button */}
            <a
              href="tel:0126918000"
              className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white/8 hover:bg-white/15 border border-white/15 text-white/90 hover:text-white font-mono text-xs backdrop-blur-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#8cd63b]" />
              <span>012 691 8000</span>
            </a>
          </div>

          {/* Verified Trust & Social Proof Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 dark:bg-black/35 border border-white/15 backdrop-blur-xl shadow-md text-white text-xs">
            {/* Stars */}
            <div className="flex items-center gap-0.5 text-amber-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-bold font-mono text-xs mr-1 text-white">4.9 / 5</span>
            </div>

            <span className="text-white/30 hidden sm:inline">|</span>

            {/* Overlapping Avatars */}
            <div className="flex -space-x-1.5 rtl:space-x-reverse items-center">
              <span className="w-5 h-5 rounded-full bg-[#861365] text-[10px] font-bold text-white flex items-center justify-center ring-1 ring-white/60">ط</span>
              <span className="w-5 h-5 rounded-full bg-[#5b872b] text-[10px] font-bold text-white flex items-center justify-center ring-1 ring-white/60">ع</span>
              <span className="w-5 h-5 rounded-full bg-[#9d237a] text-[10px] font-bold text-white flex items-center justify-center ring-1 ring-white/60">ر</span>
            </div>

            {/* Trust Slogan */}
            <span className="font-medium text-slate-100">
              {isAr ? '+١٥,٠٠٠ جلسة تأهيل ناجحة بجدة · أجنحة نسائية ١٠٠٪' : '+15,000 Successful Sessions in Jeddah · 100% Private'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Hero Facts Bottom Strip (01, 02, 03, 04) matching datails-sa.online */}
      <div className="relative z-10 w-full bg-gradient-to-r from-[#170a24]/92 via-[#2b0c33]/92 to-[#1a2e16]/92 dark:from-[#11051b]/95 dark:via-[#1e0828]/95 dark:to-[#121c0f]/95 text-white border-t border-white/10 backdrop-blur-xl">
        <div className="shell py-5 sm:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-white/10">
            {heroFacts.map((fact, idx) => (
              <div key={idx} className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#8cd63b] shrink-0">
                  {fact.num}
                </span>
                <div className="flex flex-col min-w-0 text-right rtl:text-right ltr:text-left">
                  <span className="text-sm font-bold text-white tracking-wide">
                    {fact.title}
                  </span>
                  <span className="text-xs text-slate-300 line-clamp-1">
                    {fact.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroChapter);
