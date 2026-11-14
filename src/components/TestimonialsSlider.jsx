import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquareHeart, Sparkles } from 'lucide-react';

export function TestimonialsSlider({ lang, t }) {
  const isAr = lang === 'ar' || t?.langCode === 'العربية';
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const testimonials = isAr
    ? [
        {
          id: 1,
          name: 'سارة الغامدي',
          role: 'مراجعة قسم العمود الفقري',
          program: 'تأهيل الانزلاق الغضروفي وعرق النسا',
          stars: 5,
          text: 'بعد معاناة شهور مع آلام الديسك وصعوبة الجلوس، بدأت برنامج العلاج اليدوي في مركز خطوط الصحة. من رابع جلسة خف الألم بنسبة 80%، والأجنحة النسائية الخاصة تمنح راحة وخصوصية تامة لا توصف.',
          date: 'قبل أسبوعين',
          verified: true,
          initials: 'س.غ',
          color: 'from-[#9d237a] to-[#861365]',
        },
        {
          id: 2,
          name: 'نورة الشهري',
          role: 'مراجعة نحت القوام',
          program: 'جلسات فيلاشيب III لشد الترهلات',
          stars: 5,
          text: 'نتائج تقنية فيلاشيب 3 كانت واضحة جداً من ثاني جلسة في شد ترهلات البطن بعد الولادة وتفتيت السيلوليت. الأجهزة متطورة جداً والعيادة نظيفة وراقية، والأخصائية كانت دقيقة وصبورة جداً.',
          date: 'قبل 3 أسابيع',
          verified: true,
          initials: 'ن.ش',
          color: 'from-[#629131] to-[#4d7c1b]',
        },
        {
          id: 3,
          name: 'م. عبد الرحمن باوزير',
          role: 'مراجع التأهيل الحركي',
          program: 'علاج تيبس مفصل الكتف المتجمد',
          stars: 5,
          text: 'كنت عاجزاً عن رفع ذراعي بالكامل بسبب تيبس حاد في الكتف. البروتوكول العلاجي وتمارين الاستطالة السريرية ساعدتني على استعادة المدى الحركي الطبيعي كاملاً وبدون أي تدخل جراحي.',
          date: 'قبل شهر',
          verified: true,
          initials: 'ع.ب',
          color: 'from-[#1b0826] to-[#481245]',
        },
        {
          id: 4,
          name: 'فاطمة العتيبي',
          role: 'مراجعة التصريف اللمفاوي',
          program: 'برنامج المساج والتصريف بعد الجراحة',
          stars: 5,
          text: 'أفضل مركز للمساج اللمفاوي الطبي في جدة بعد العمليات الجراحية. التورمات واحتباس السوائل خفت بسرعة مذهلة، ولمست احترافية ويد خفيفة جداً من الأخصائية. ممتنة جداً لهذا الكادر الراقي.',
          date: 'قبل شهر ونصف',
          verified: true,
          initials: 'ف.ع',
          color: 'from-[#861365] to-[#629131]',
        },
        {
          id: 5,
          name: 'د. ريم العمودي',
          role: 'مراجعة التأهيل العصبي',
          program: 'برنامج تحفيز عضلات الوجه والعصب السابع',
          stars: 5,
          text: 'أشكر كادر خطوط الصحة على البرنامج العلاجي المكثف لتحفيز عضلات الوجه. استعدت تعبيراتي والابتسامة الطبيعية في وقت قياسي وبمتابعة يومية حريصة واهتمام بأدق التفاصيل.',
          date: 'قبل شهرين',
          verified: true,
          initials: 'ر.ع',
          color: 'from-[#4d7c1b] to-[#8cd63b]',
        },
        {
          id: 6,
          name: 'هيفاء السبيعي',
          role: 'مراجعة صحة المرأة',
          program: 'تأهيل عضلات قاع الحوض والانفصال العضلي',
          stars: 5,
          text: 'تجربتي مع برنامج صحة المرأة بعد الولادة كانت استثنائية. استعدت قوة عضلات البطن وثقتي بحركتي اليومية في بيئة مريحة وخصوصية نسائية مطلقة. أنصح به كل سيدة.',
          date: 'قبل شهرين',
          verified: true,
          initials: 'هـ.س',
          color: 'from-[#9d237a] to-[#629131]',
        },
      ]
    : [
        {
          id: 1,
          name: 'Sarah Al-Ghamdi',
          role: 'Spine & Posture Patient',
          program: 'Decompression & Sciatica Rehabilitation',
          stars: 5,
          text: 'After months of persistent lumbar and sciatica pain, I began manual decompression therapy at Health Lines. By session four, my pain dropped by 80%. The private closed suites offered serene comfort and complete privacy.',
          date: '2 weeks ago',
          verified: true,
          initials: 'SG',
          color: 'from-[#9d237a] to-[#861365]',
        },
        {
          id: 2,
          name: 'Noura Al-Shehri',
          role: 'Body Contouring Client',
          program: 'VelaShape III Skin Firming & Cellulite Protocol',
          stars: 5,
          text: 'The VelaShape III results were noticeable from session two in toning postpartum abdominal laxity and smoothing tissue. Pristine modern equipment, tranquil suites, and deeply attentive certified female specialists.',
          date: '3 weeks ago',
          verified: true,
          initials: 'NS',
          color: 'from-[#629131] to-[#4d7c1b]',
        },
        {
          id: 3,
          name: 'Eng. Abdulrahman Bawazir',
          role: 'Orthopedic Rehabilitation',
          program: 'Frozen Shoulder & Rotator Cuff Recovery',
          stars: 5,
          text: 'Acute shoulder stiffness severely limited my mobility. The targeted manual release protocols and dynamic stretches helped me regain full range of motion completely without surgical intervention.',
          date: '1 month ago',
          verified: true,
          initials: 'AB',
          color: 'from-[#1b0826] to-[#481245]',
        },
        {
          id: 4,
          name: 'Fatima Al-Otaibi',
          role: 'Lymphatic Drainage Patient',
          program: 'Post-Operative Fluid Detox & Edema Protocol',
          stars: 5,
          text: 'Without doubt the best medical lymphatic clinic in Jeddah for post-op care. Fluid retention and edema subsided astonishingly fast. Incredibly gentle hands and exemplary clinical dedication.',
          date: '1.5 months ago',
          verified: true,
          initials: 'FO',
          color: 'from-[#861365] to-[#629131]',
        },
        {
          id: 5,
          name: 'Dr. Reem Al-Amoudi',
          role: 'Neurological Recovery',
          program: "Bell's Palsy Neuromuscular Facial Protocol",
          stars: 5,
          text: 'My heartfelt appreciation to the Health Lines clinical team for their intensive neuromuscular stimulation protocol. I restored my natural smile and facial symmetry in record time with diligent daily care.',
          date: '2 months ago',
          verified: true,
          initials: 'RA',
          color: 'from-[#4d7c1b] to-[#8cd63b]',
        },
        {
          id: 6,
          name: 'Haifa Al-Subaie',
          role: "Women's Health Client",
          program: 'Postpartum Pelvic Floor & Core Diastasis Protocol',
          stars: 5,
          text: 'My recovery journey with the specialized postpartum protocol was transformative. I regained core stability and physical confidence in an exclusively private, welcoming sanctuary environment.',
          date: '2 months ago',
          verified: true,
          initials: 'HS',
          color: 'from-[#9d237a] to-[#629131]',
        },
      ];

  const total = testimonials.length;

  // Slide navigation
  const scrollToIndex = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      setActiveIndex(clamped);
      const container = sliderRef.current;
      if (!container) return;
      const cards = container.children;
      if (cards[clamped]) {
        cards[clamped].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    },
    [total]
  );

  const handlePrev = () => {
    scrollToIndex(activeIndex === 0 ? total - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(activeIndex === total - 1 ? 0 : activeIndex + 1);
  };

  // Sync activeIndex during native scroll or drag
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.offsetWidth || 340;
      const newIndex = Math.round(Math.abs(scrollLeft) / (cardWidth + 24));
      setActiveIndex(Math.max(0, Math.min(total - 1, newIndex)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [total]);

  // Handle user submitting interactive rating
  const handleRatingSubmit = (score) => {
    setUserRating(score);
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
    }, 2400);
  };

  return (
    <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#9d237a]/15 dark:border-white/10 relative">
      {/* Header Row: Title & Circular Navigation Arrows (Matching reference design) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9d237a]/10 dark:bg-fuchsia-400/12 border border-[#9d237a]/20 text-xs font-semibold text-[#861365] dark:text-fuchsia-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'تقييمات مراجعينا المعتمدة' : 'Verified Patient Reviews'}</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-normal text-[#170a24] dark:text-white tracking-tight leading-tight">
            {isAr ? 'آراء وتجارب مراجعينا في جدة' : 'Client Testimonials & Ratings'}
          </h3>

          <p className="text-xs sm:text-sm text-[#503f63] dark:text-slate-300 mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-amber-500 dark:text-amber-400 font-mono">
              ★ 4.9 / 5
            </span>
            <span>·</span>
            <span>{isAr ? 'أكثر من ١٥,٠٠٠ جلسة تأهيل ناجحة' : '+15,000 Successful Clinical Sessions'}</span>
          </p>
        </div>

        {/* Right side controls: Interactive Rate Button + Prev / Next Arrows */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Interactive Rating CTA Button */}
          <button
            type="button"
            onClick={() => setShowRatingModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#629131]/12 dark:bg-lime-400/15 hover:bg-[#629131]/20 border border-[#629131]/30 text-xs font-bold text-[#355e0d] dark:text-lime-300 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{isAr ? 'شاركينا تقييمكِ' : 'Rate Your Visit'}</span>
          </button>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={isAr ? 'التقييم السابق' : 'Previous review'}
            className="w-11 h-11 rounded-full border border-[#9d237a]/20 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-[#170a24] dark:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Next Arrow Button (Active Solid Accent matching uploaded design) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={isAr ? 'التقييم التالي' : 'Next review'}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-[#861365] to-[#629131] hover:brightness-110 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-[#9d237a]/20 hover:scale-105 active:scale-95"
          >
            {isAr ? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track (Draggable, Touch Swipeable, Smooth Snapping) */}
      <div
        ref={sliderRef}
        className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={item.id}
              onClick={() => scrollToIndex(idx)}
              className={`snap-center shrink-0 w-[86vw] sm:w-[360px] md:w-[380px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative select-none ${
                isCurrent
                  ? 'bg-white/95 dark:bg-[#200829]/95 border-2 border-[#9d237a] dark:border-fuchsia-400/80 shadow-[0_16px_40px_rgba(157,35,122,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] scale-[1.01]'
                  : 'bg-white/70 dark:bg-[#180520]/75 border border-[#9d237a]/12 dark:border-white/10 hover:border-[#9d237a]/35 hover:bg-white/90 dark:hover:bg-[#1f0928]/90 shadow-sm'
              }`}
            >
              <div>
                {/* Top Row: 5 Stars + Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.stars)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#355e0d] dark:text-lime-300 px-2 py-0.5 rounded-full bg-[#629131]/10 dark:bg-lime-400/10">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isAr ? 'تقييم موثق' : 'Verified'}</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#2d1b3e] dark:text-slate-200 leading-relaxed font-normal mb-6 line-clamp-4">
                  "{item.text}"
                </p>
              </div>

              {/* Bottom: Author info, Avatar & Program tag */}
              <div className="pt-4 border-t border-[#9d237a]/10 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Monogram / Avatar badge */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm ring-2 ring-white/20`}>
                    {item.initials}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#170a24] dark:text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#861365] dark:text-fuchsia-300 font-medium truncate">
                      {item.role}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-mono">
                  {item.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
        {testimonials.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => scrollToIndex(dotIdx)}
            aria-label={`Go to slide ${dotIdx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              dotIdx === activeIndex
                ? 'w-7 bg-gradient-to-r from-[#9d237a] to-[#629131]'
                : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Interactive Rate Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRatingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl p-7 bg-white dark:bg-[#1e0728] border border-[#9d237a]/20 dark:border-white/15 shadow-2xl text-center relative overflow-hidden"
            >
              {!ratingSubmitted ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#9d237a]/12 dark:bg-fuchsia-400/15 text-[#861365] dark:text-fuchsia-300 flex items-center justify-center mx-auto mb-4">
                    <MessageSquareHeart className="w-6 h-6" />
                  </div>

                  <h4 className="text-xl font-bold text-[#170a24] dark:text-white mb-2">
                    {isAr ? 'كيف كانت تجربتكِ في مركز خطوط الصحة؟' : 'How was your experience at Health Lines?'}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#503f63] dark:text-slate-300 mb-6">
                    {isAr
                      ? 'رأيكِ يلهمنا ويساعدنا في الحفاظ على أعلى معايير الرعاية والخصوصية الطبية.'
                      : 'Your honest feedback inspires our team and upholds our clinical excellence.'}
                  </p>

                  {/* Star Selection Row */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onMouseEnter={() => setHoverRating(starNum)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRatingSubmit(starNum)}
                        className="p-1 transition-transform hover:scale-125 cursor-pointer"
                        aria-label={`Rate ${starNum} stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            starNum <= (hoverRating || userRating)
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </>
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 rounded-full bg-[#629131]/20 text-[#355e0d] dark:text-lime-300 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#170a24] dark:text-white mb-2">
                    {isAr ? 'شكراً لتقييمكِ الرائع!' : 'Thank You For Your Review!'}
                  </h4>
                  <p className="text-sm text-[#503f63] dark:text-slate-300">
                    {isAr
                      ? `تم تسجيل تقييمكِ بنجاح (${userRating} من 5 نجوم). دمتِ بأتم الصحة والعافية.`
                      : `Your rating (${userRating} out of 5 stars) was recorded. Wishing you radiant health.`}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(TestimonialsSlider);
