/**
 * Comprehensive Knowledge Base for Health Lines Center Local AI Chatbot
 * Rich domain-specific data in Arabic and English covering all departments,
 * medical conditions, technologies, logistics, FAQs, and booking instructions.
 */

export const CLINIC_INFO = {
  nameAr: "مركز خطوط الصحة للعلاج الطبيعي وتأهيل القوام للسيدات",
  nameEn: "Health Lines Center for Physical Therapy & Body Contouring for Women",
  city: "جدة · المملكة العربية السعودية",
  phone: "0126918000",
  whatsapp: "966599530955",
  addressAr: "جدة - شارع الأمير ماجد (السبعين) - حي الربوة - مركز العلي للأعمال (البرج الجنوبي) - الدور الرابع",
  addressEn: "Jeddah - Prince Majed Road (Al-Sabeen) - Al-Rabwah District - Al-Ali Business Center (South Tower) - 4th Floor",
  hoursAr: "من السبت إلى الخميس: من ٩:٠٠ صباحاً إلى ٩:٠٠ مساءً (يوم الجمعة: مغلق)",
  hoursEn: "Saturday to Thursday: 9:00 AM – 9:00 PM (Friday: Closed)",
  googleMapsUrl: "https://maps.app.goo.gl/o9go6Z1e452RcqRh8",
  identityAr: "مركز نسائي متكامل ١٠٠٪ (كادر طبي وإداري وعميلات) بأجنحة خاصة مغلقة بالكامل ومرخص من وزارة الصحة السعودية.",
  identityEn: "100% women-only medical sanctuary with private closed suites, fully licensed by the Saudi Ministry of Health."
};

export const CHATBOT_KNOWLEDGE_AR = [
  // 1. Spine, Lower Back, Sciatica & Discs
  {
    id: "spine-back-sciatica",
    category: "therapy",
    title: "آلام الظهر والعمود الفقري وعرق النسا والديسك",
    keywords: [
      "ظهر", "ظهري", "اسفل الظهر", "عمود فقري", "ديسك", "انزلاق", "غضروف", "عرق النسا", 
      "فقرات", "عصب", "تنميل", "خدر", "ابهر", "لوح الكتف", "انضغاط", "سحب فقرات",
      "الظهر", "العمود الفقري", "الديسك", "الانزلاق", "عرق نسا"
    ],
    questions: [
      "عندي الم في اسفل الظهر",
      "هل تعالجون الانزلاق الغضروفي والديسك بدون جراحة؟",
      "عندي عرق النسا وتنميل بالرجل",
      "عندي الم في الابهر بين الاكتاف",
      "ظهري يعورني من الجلوس الطويل"
    ],
    answer: `نعم، نقدم بروتوكولات علاج يدوي سريرية متقدمة وتخفيف لضغط الفقرات بإشراف أخصائيات علاج طبيعي معتمدات من وزارة الصحة السعودية.

تشمل خطة العلاج:
• فك الضغط الميكانيكي عن جذور الأعصاب وعرق النسا
• تمارين تقوية عضلات الجذع العميقة واستقرار العمود الفقري
• تحرير التقلصات العضلية الحادة وإعادة المدى الحركي الطبيعي
• جلسات علاج يدوي متخصصة لعلاج آلام "الأبهر" وتشنجات لوح الكتف
• أجهزة السحب الفقري والتحفيز الكهربائي المهدئ للأعصاب

جميع الجلسات فردية وتتم في أجنحة نسائية مغلقة بالكامل لراحتكِ وخصوصيتكِ.`,
    whatsappText: "السلام عليكم، أود حجز موعد كشف واستشارة لعلاج آلام الظهر والعمود الفقري مع الأخصائية."
  },

  // 2. Neck & Shoulder & Headaches
  {
    id: "neck-shoulder-headache",
    category: "therapy",
    title: "آلام الرقبة وتيبس الأكتاف والصداع التوتري",
    keywords: [
      "رقبة", "رقبتي", "كتف", "كتفي", "اكتاف", "تيبس", "كتف متجمد", "صداع", "دوخة", 
      "فقرات عنقية", "ابهر الرقبة", "الرقبة", "الكتف", "الكتف المتجمد", "صداع عنقي"
    ],
    questions: [
      "رقبتي مشدودة وتعورني ومعها صداع",
      "عندي تيبس في الكتف ما اقدر ارفعه",
      "علاج الصداع العنقي والدوخة",
      "عندي كتف متجمد ومحدود الحركة"
    ],
    answer: `نقدم في المركز برنامجاً علاجياً دقيقاً لعلاج مشاكل الرقبة والكتف:
• تحرير الفقرات العنقية وتخفيف الشد على الأعصاب المغذية للرأس والأكتاف
• علاج تيبس الكتف (الكتف المتجمد / Frozen Shoulder) وإعادة المدى الحركي للذراع
• تخفيف الصداع التوتري المرتبط بتشنج عضلات الرقبة وقاعدة الجمجمة
• تمارين استعادة استقامة الرقبة والتخلص من الإجهاد المكتبي وجلسات الجوال

الجلسات تبدأ بتقييم سريري شامل لوضع خطة علاجية مريحة وفردية.`,
    whatsappText: "السلام عليكم، أود الاستفسار وحجز موعد لعلاج آلام الرقبة والكتف في مركز خطوط الصحة."
  },

  // 3. Knees, Joints & Cartilage
  {
    id: "knee-joints-mobility",
    category: "therapy",
    title: "خشونة الركبة والمفاصل وتأهيل الأربطة",
    keywords: [
      "ركبة", "ركبتي", "خشونة", "غضروف", "رباط", "صليبي", "صابونة", "طقطقة", "مفصل", 
      "مفاصل", "ورك", "كاحل", "مشية", "الركبة", "الخشونة", "المفاصل", "رجلي", "الدرج"
    ],
    questions: [
      "عندي خشونة في الركبة وصعوبة بالطلوع والنزول",
      "علاج طقطقة الركبة والم المفاصل",
      "تأهيل اصابة الرباط الصليبي والغضروف",
      "الم في صابونة الركبة عند الصلاة"
    ],
    answer: `بروتوكول تأهيل المفاصل والركبة في مركزنا يركز على استعادة حركتكِ الطبيعية ومشيتكِ اليومية بكل خفة:
• تخفيف الضغط والاحتكاك عن مفصل الركبة عبر تقوية عضلات الفخذ الرباعية
• تحسين ثبات صابونة الركبة وتصحيح ميكانيكا المشي وتوازن الجسم
• تقليل الالتهاب والتورم المفصلي باستخدام أحدث الأجهزة العلاجية والتمارين الحركية
• تأهيل ما بعد إصابات الأربطة والغضاريف للعودة للأنشطة بثقة ودون ألم عند الصلاة أو الدرج

الجلسة فردية وخاصة تماماً مع أخصائية معتمدة.`,
    whatsappText: "السلام عليكم، أود حجز كشف علاج طبيعي لخشونة وآلام الركبة والمفاصل."
  },

  // 4. VelaShape III & Body Contouring
  {
    id: "velashape-contouring",
    category: "velashape",
    title: "نحت القوام وتفتيت السيلوليت بجهاز فيلاشيب III",
    keywords: [
      "فيلاشيب", "فيلا شيب", "نحت", "قوام", "سيلوليت", "شد", "ترهلات", "ترهل", "بطن", 
      "خواصر", "خصر", "زنود", "افخاذ", "ارداف", "كرش", "دهون", "تفتيت", "velashape", 
      "نحت القوام", "شد البطن", "محيط الخصر"
    ],
    questions: [
      "كيف يشتغل جهاز فيلاشيب III؟",
      "هل فيلاشيب ينحت الخصر ويشد ترهل البطن؟",
      "هل جلسة فيلاشيب فيها الم او جراحة؟",
      "كم سم ينزل مقاس الخصر بعد الجلسات؟",
      "كم جلسة احتاج لنحت القوام؟"
    ],
    answer: `جهاز فيلاشيب III (VelaShape III) هو أحدث جهاز طبي أمريكي معتمد من FDA وهيئة الغذاء والدواء السعودية لنحت القوام وشد الجلد وتفتيت السيلوليت بدون جراحة.

آلية عمل الجهاز تدمج ٤ تقنيات متطورة في نفس الوقت:
1. أمواج الراديو فركونسي (Bi-polar RF): لشد الترهلات وتحفيز إنتاج الكولاجين الطبيعي
2. الأشعة تحت الحمراء (Infrared IR): لتسخين الخلايا الدهنية العميقة وتقليص حجمها
3. الشفط الميكانيكي (Vacuum) والبكرات: لتنشيط الدورة الدموية والتصريف اللمفاوي وتنعيم ملمس الجلد

المزايا:
• بدون جراحة وبدون أي تخدير وبدون ألم (شعور مساج دافئ ومريح)
• فترة النقاهة ٠ يوم: تخلصين جلستكِ وترجعين ليومكِ وحياتكِ فوراً
• نقص مقاس محيط الخصر بمعدل من ٢.٥ إلى ٤ سم
• عادة يتضمن الكورس ٦ إلى ١٢ جلسة حسب هدفكِ ونوع الترهل`,
    whatsappText: "السلام عليكم، أود حجز موعد واستشارة لجلسات نحت القوام وشد الجلد بجهاز فيلاشيب III."
  },

  // 5. Post-Op Lymphatic Drainage Massage
  {
    id: "lymphatic-drainage",
    category: "lymphatic",
    title: "المساج والتصريف اللمفاوي بعد عمليات الشفط والشد",
    keywords: [
      "لمفاوي", "تصريف", "مساج لمفاوي", "شفط", "عملية", "عمليات", "تليف", "تليفات", 
      "سوائل", "تورم", "كدمات", "تحجر", "كلاكيع", "شد جراحي", "نحت 360", "مشد", 
      "المساج اللمفاوي", "التصريف اللمفاوي", "بعد الشفط", "تجمع سوائل"
    ],
    questions: [
      "سويت عملية شفط دهون ومحتاجة مساج تصريف لمفاوي",
      "عندي سوائل متجمعة وتورم بعد العملية",
      "كيف اتجنب التليفات والتحجر بعد الشفط؟",
      "متى ابدأ جلسات المساج اللمفاوي بعد العملية؟"
    ],
    answer: `جلسات المساج والتصريف اللمفاوي الطبي بعد عمليات شفط الدهون والشد الجراحي هي خطوة أساسية لنجاح عمليتكِ وحماية النتيجة المنحوتة:

فوائد الجلسات:
• تصريف السوائل المحتبسة والوذمات المتجمعة تحت الجلد بأمان
• الوقاية من التليفات (Fibrosis) والكتل الصلبة أو التحجر تحت الجلد
• تسريع زوال الكدمات والانتفاخات وتخفيف الألم المصاحب للمشد
• مساعدة الجلد على الالتصاق والانسجام مع العضلات بشكل متناسق ومشدود

تُنفذ الجلسات بأيدي أخصائيات متخصصات ومؤهلات طبياً برقة وعناية تامة. يُنصح بالبدء بعد العملية بحسب توجيهات جراحكِ (غالباً من اليوم الخامس إلى العاشر).`,
    whatsappText: "السلام عليكم، أود حجز جلسات مساج وتصريف لمفاوي طبي بعد عملية جراحية."
  },

  // 6. Women's Health & Pelvic Floor
  {
    id: "women-pelvic-health",
    category: "pelvic",
    title: "صحة المرأة وعضلات قاع الحوض والتأهيل بعد الولادة",
    keywords: [
      "حوض", "قاع الحوض", "ولادة", "بعد الولادة", "نفاس", "سلس", "تسريب", "رحم", 
      "هبوط", "انفصال عضلي", "انفصال", "عضلات البطن", "كيجل", "قاع حوض", 
      "السلس البولي", "الانفصال العضلي", "عضلات الحوض"
    ],
    questions: [
      "عندي سلس بولي بعد الولادة وتسريب عند الكحة",
      "علاج هبوط الرحم بدون جراحة",
      "كيف اعالج الانفصال العضلي بعد الولادة؟",
      "تقوية عضلات قاع الحوض للسيدات",
      "بطني بارز وفيه فجوة بعد القيصرية"
    ],
    answer: `برنامج صحة المرأة في مركز خطوط الصحة مصمم خصيصاً لاحتياجات السيدات بعد الولادة ومختلف المراحل:

يشمل البرنامج:
• تقوية عضلات قاع الحوض لعلاج الضعف والارتخاء
• علاج السلس البولي الإجهادي والتحكم الطبيعي بدون تدخل جراحي
• تأهيل حالات هبوط الرحم غير الجراحي وتخفيف ثقل الحوض
• تمارين تأهيلية دقيقة لعلاج الانفصال العضلي (Diastasis Recti) واستعادة قوة البطن الداخلية

البرنامج يُنفذ في أجنحة نسائية مغلقة بالكامل بأعلى درجات الخصوصية والاحترام، بإشراف أخصائيات علاج طبيعي نسائي معتمدات.`,
    whatsappText: "السلام عليكم، أود حجز استشارة لبرنامج صحة المرأة وتأهيل عضلات الحوض والولادة."
  },

  // 7. Neuro & Balance Rehabilitation
  {
    id: "neuro-balance-rehab",
    category: "therapy",
    title: "التأهيل العصبي والاتزان وعلاج الدوخة والعصب السابع",
    keywords: [
      "عصبي", "اتزان", "دوخة", "توازن", "جلطة", "سكتة", "شلل", "شلل نصفي", "باركنسون", 
      "رعاش", "عصب سابع", "وجه", "العصب السابع", "التأهيل العصبي", "الدوخة"
    ],
    questions: [
      "علاج الدوخة وعدم الاتزان",
      "تأهيل حالات الجلطة والشلل النصفي",
      "علاج العصب السابع للوجه",
      "برامج التوازن العصبي الحركي"
    ],
    answer: `يوفر المركز برامج تأهيل عصبي متخصصة تركز على استعادة القدرات الوظيفية والاستقلالية:
• برامج إعادة الاتزان الدهليزي الحسي وتدريبات الثبات لتقليل الدوخة
• تأهيل ما بعد الجلطات الدماغية (السكتة) وتنشيط المرونة العصبية الحركية
• تمارين خاصة لتقليل تيبس العضلات والرعاش لمرضى الباركنسون
• تأهيل وتحفيز عضلات الوجه لحالات التهاب العصب السابع وإعادة تعبيرات الوجه الطبيعية

بإشراف أخصائيات متخصصات في التأهيل الحركي والعصبي.`,
    whatsappText: "السلام عليكم، أود الاستفسار وحجز استشارة لبرنامج التأهيل العصبي والاتزان."
  },

  // 8. Scoliosis & Posture Correction
  {
    id: "scoliosis-posture",
    category: "therapy",
    title: "علاج الجنف وتحدب الظهر واعوجاج القوام",
    keywords: [
      "جنف", "انحراف", "اعوجاج", "تحدب", "قوام", "ميلان", "كتف نازل", "سكوليوز", 
      "scoliosis", "الجنف", "التحدب", "استقامة الظهر", "تعديل القوام"
    ],
    questions: [
      "عندي انحراف او جنف في العمود الفقري",
      "علاج تحدب اعلى الظهر والرقبة المنحنية",
      "كيف اعدل قوام جسمي والكتف النازل؟"
    ],
    answer: `نقدم في المركز بروتوكولات تصحيح القوام وعلاج الجنف (Scoliosis):
• تقييم سريري ثلاثي الأبعاد لزوايا العمود الفقري ومستوى الأكتاف والحوض
• تمارين شروث (Schroth) المتخصصة لتعديل انحناءات العمود الفقري وإطالة الجانب المنكمش
• تقوية عضلات التثبيت العميقة للحد من تطور الانحناء وتخفيف آلام الظهر المصاحبة
• تصحيح التحدب الصدري (Kyphosis) واستعادة الرشاقة المعتدلة للقوام`,
    whatsappText: "السلام عليكم، أود حجز فحص كشف وتقييم لقوام الظهر وعلاج الجنف والتحدب."
  },

  // 9. Geriatric Care & Fall Prevention
  {
    id: "geriatric-care",
    category: "therapy",
    title: "تأهيل كبار السن وحفظ التوازن والوقاية من السقوط",
    keywords: [
      "كبار سن", "امي", "جدتي", "كبيرة في السن", "سقوط", "طيحة", "مشاية", "عكاز", 
      "ضعف عضلات", "هشاشة", "مشي", "كبار السن", "تأهيل المسنات"
    ],
    questions: [
      "برامج علاج طبيعي لكبار السن والوالدة",
      "تمارين حفظ التوازن والوقاية من السقوط للمسنات",
      "تأهيل المشي لكبيرة في السن بعد كسر او عملية"
    ],
    answer: `نولي رعاية خاصة وفائقة للأمهات وكبار السن في المركز:
• بيئة علاجية آمنة ومريحة وسهلة الوصول بالمصاعد
• تمارين تدريجية ناعمة لتقوية عضلات الساقين والحوض بدون إجهاد
• برامج متخصصة لتطوير التوازن والوقاية من السقوط والتعثر
• تدريب على المشي الصحيح والآمن باستخدام أو بدون وسائل مساعدة
• رعاية مفعمة بالدفء والاحترام من أخصائياتنا`,
    whatsappText: "السلام عليكم، أود الاستفسار عن برامج العلاج الطبيعي والتأهيل الحركي لكبار السن."
  },

  // 10. Sports Injuries & Active Women
  {
    id: "sports-injuries",
    category: "therapy",
    title: "إصابات الملاعب وتأهيل الرياضيات والنشاط البدني",
    keywords: [
      "رياضة", "اصابة", "تمزق", "جهد", "نادي", "جيم", "تمارين", "عضلة", "وتر", 
      "التواء", "كاحل", "اوتار", "رياضية", "الإصابات الرياضية"
    ],
    questions: [
      "عندي تمزق عضلي من تمارين الجيم",
      "التواء في الكاحل والم في الاوتار",
      "تأهيل اصابات التمارين للعودة للنادي"
    ],
    answer: `برنامج تأهيل الإصابات الرياضية للسيدات والفتيات:
• تسريع التئام التمزقات العضلية والتهابات الأوتار بأحدث الأجهزة العلاجية
• علاج التواء الكاحل وتقوية أربطة المفصل لمنع تكرار الإصابة
• إعادة التأهيل الوظيفي والحركي المخصص لنوع الرياضة أو تمارين الجيم
• نصائح وتدريبات إحماء وإطالة لمنع تجدد الإصابات أثناء التمرين`,
    whatsappText: "السلام عليكم، أود حجز موعد لتأهيل وعلاج إصابة رياضية / عضلية مع الأخصائية."
  },

  // 11. Advanced Modalities & Technologies
  {
    id: "technologies-modalities",
    category: "technology",
    title: "أجهزة وتقنيات العلاج الطبيعي بالمركز",
    keywords: [
      "اجهزة", "تقنيات", "شوك ويف", "صدمية", "موجات تصادمية", "ليزر", "اشعة تحت الحمراء", 
      "التراساوند", "سونار", "تيارات", "تحفيز كهربائي", "سحب فقرات", "shockwave", "tens"
    ],
    questions: [
      "ما هي الاجهزة المتوفرة في مركز خطوط الصحة؟",
      "هل عندكم جهاز موجات تصادمية شوك ويف؟",
      "ما فائدة الليزر والتحفيز الكهربائي؟"
    ],
    answer: `يضم المركز أحدث التجهيزات الطبية المعتمدة عالمياً:
• جهاز فيلاشيب III الأمريكي (VelaShape III) لنحت القوام وتفتيت السيلوليت
• جهاز الموجات التصادمية (Shockwave Therapy) لعلاج شوكة القدم والتهابات الأوتار المزمنة
• تقنية الأشعة تحت الحمراء (IR) للتسخين العميق للأنسجة وتنشيط الدورة الدموية
• جهاز الموجات فوق الصوتية (Ultrasound) لتسريع التئام الأنسجة وتقليل التورم
• وحدات التيارات الكهربائية العلاجية (TENS / EMS) لتسكين الألم وإعادة تأهيل العضلات
• طاولة سحب وتخفيف ضغط الفقرات الرقمية`,
    whatsappText: "السلام عليكم، أود الاستفسار عن الأجهزة والتقنيات العلاجية المتوفرة لحالتي."
  },

  // 12. Staff Credentials & 100% Privacy
  {
    id: "privacy-staff-credentials",
    category: "general",
    title: "الخصوصية التامة وهل الكادر نسائي بالكامل؟",
    keywords: [
      "كادر", "طاقم", "نسائي", "حريم", "بنات", "دكتورة", "اخصائية", "رجال", "خصوصية", 
      "مغلقة", "مقفلة", "ستر", "الكادر النسائي", "سيدات", "أجنحة خاصة"
    ],
    questions: [
      "هل المركز نسائي بالكامل؟",
      "هل الاخصائيات حريم ولا رجال؟",
      "هل الغرف مقفلة وفيها خصوصية؟",
      "هل يوجد اي رجال داخل المركز؟"
    ],
    answer: `نعم، ١٠٠٪ نسائي بالكامل وبأعلى معايير الخصوصية السعودية:
• جميع الكادر الطبي (أخصائيات ومساعدات) وموظفات الاستقبال من السيدات المؤهلات
• مصرحات ومرخصات رسمياً من وزارة الصحة وهيئة التخصصات الصحية السعودية
• لا يوجد أي تواجد رجالي في أقسام العيادات أو غرف العلاج
• جميع غرف الكشف والعلاج عبارة عن أجنحة خاصة مغلقة تماماً لراحتكِ واسترخائكِ التام وبما يضمن الستر والراحة الكاملة`,
    whatsappText: "السلام عليكم، أود حجز موعد استشارة خاصة في مركز خطوط الصحة النسائي."
  },

  // 13. Location, Working Hours & Parking
  {
    id: "location-hours-parking",
    category: "logistics",
    title: "موقع المركز بجدة وأوقات العمل والمواقف",
    keywords: [
      "موقع", "مكان", "وين", "فين", "عنوان", "جدة", "الربوة", "السبعين", "امير ماجد", 
      "اوقات", "ساعات", "دوام", "مواعيد", "تفتحون", "جمعة", "مواقف", "باركنج", "لوكيشن", 
      "الموقع", "ساعات العمل", "رقم التليفون"
    ],
    questions: [
      "وين موقعكم بجدة بالتفصيل؟",
      "متى اوقات الدوام وساعات العمل؟",
      "هل تفتحون يوم الجمعة؟",
      "هل متوفر مواقف سيارات؟"
    ],
    answer: `📍 **الموقع بالتفصيل:**
مدينة جدة - شارع الأمير ماجد (السبعين) - حي الربوة - مركز العلي للأعمال (البرج الجنوبي) - الدور الرابع.

⏰ **أوقات العمل:**
من السبت إلى الخميس: من ٩:٠٠ صباحاً حتى ٩:٠٠ مساءً مستمر.
(يوم الجمعة: مغلق للإجازة الأسبوعية)

🚗 **المواقف:**
متوفرة مواقف مريحة وسهلة حول مبنى المركز.

📞 **أرقام التواصل المباشرة:**
• هاتف العيادة: 0126918000
• واتساب الحجوزات: 0599530955`,
    whatsappText: "السلام عليكم، أود زيارة مركز خطوط الصحة بجدة وحجز موعد مناسب."
  },

  // 14. Booking Process, Evaluation & Insurance
  {
    id: "booking-pricing-evaluation",
    category: "booking",
    title: "طريقة الحجز والكشف والأسعار وطرق الدفع",
    keywords: [
      "حجز", "موعد", "كشف", "استشارة", "اسعار", "سعر", "بكم", "تكلفة", "باقة", "باقات", 
      "تأمين", "دفع", "فيزا", "مدى", "تقسيط", "الحجز", "الاسعار", "طريقة الحجز"
    ],
    questions: [
      "كيف احجز موعد؟",
      "بكم الكشف والجلسات؟",
      "هل تقبلون التأمين الطبي؟",
      "طرق الدفع المتوفرة"
    ],
    answer: `طريقة الحجز بسيطة وسريعة جداً:
1. يتم تحديد موعد الكشف المبدئي والتقييم السريري الشامل مع الأخصائية عبر الواتساب أو الاتصال
2. تقوم الأخصائية بفحص حالتكِ وقياس مدى الحركة أو مناطق الترهل وتحديد الخطة المناسبة وعدد الجلسات
3. يتوفر لدينا برامج وجلسات فردية وباقات علاجية متكاملة تتناسب مع احتياج كل عميلة

💳 **طرق الدفع والتأمين:**
• نقبل الدفع عبر (مدى، فيزا، ماستركارد، نقداً)
• المركز يقدم فواتير طبية تفصيلية معتمدة يمكنكِ رفعها لشركات التأمين الخاصة بكِ للمطالبة بالتعويض المالي (Reimbursement)`,
    whatsappText: "السلام عليكم، أود حجز موعد كشف وتقييم سريري في مركز خطوط الصحة ومعرفة المواعيد المتاحة."
  },

  // 15. Pregnancy & Postpartum Safety
  {
    id: "pregnancy-breastfeeding",
    category: "general",
    title: "الحمل والرضاعة والعلاجات المتاحة",
    keywords: [
      "حامل", "حمل", "رضاعة", "مرضع", "ولادة قيصرية", "ولادة طبيعية", "امان", "ينفع للحامل", 
      "الحامل", "المرضع", "القيصرية"
    ],
    questions: [
      "هل ينفع نحت القوام بالحمل؟",
      "هل العلاج الطبيعي آمن للحامل؟",
      "متى ابدأ بعد الولادة القيصرية أو الطبيعية؟"
    ],
    answer: `• **خلال فترة الحمل:**
نوفر جلسات علاج طبيعي متخصصة وآمنة تماماً لتخفيف آلام أسفل الظهر وثقل الحوض وتشنجات الساقين للحوامل بإشراف دقيق. (ملاحظة: أجهزة نحت القوام فيلاشيب لا تُستخدم أثناء فترة الحمل).

• **بعد الولادة:**
يمكن البدء ببرامج تأهيل قاع الحوض والانفصال العضلي بعد الولادة الطبيعية بعدة أسابيع، وللولادة القيصرية بعد التئام الجرح واستشارة طبيبكِ (غالباً بعد ٦ إلى ٨ أسابيع).
جلسات فيلاشيب لنحت وشد البطن آمنة وممتازة بعد الولادة والرضاعة.`,
    whatsappText: "السلام عليكم، أود الاستفسار عن العلاجات والبرامج المناسبة لمرحلة الحمل / بعد الولادة."
  },

  // 16. Pain, Safety & Results Timeline
  {
    id: "pain-safety-timeline",
    category: "general",
    title: "هل الجلسات مؤلمة ومتى تظهر النتائج؟",
    keywords: [
      "الم", "مؤلم", "يعور", "تخدير", "امان", "نتائج", "متى تبان", "كم يوم", "كم جلسة", 
      "مدة الجلسة", "وقت الجلسة", "الالم", "النتائج"
    ],
    questions: [
      "هل الجلسات مؤلمة؟",
      "متى تظهر نتيجة نحت القوام؟",
      "كم جلسة احتاج عشان يخف الم الظهر؟",
      "كم مدة الجلسة الواحدة؟"
    ],
    answer: `• **الراحة والأمان:**
جميع جلساتنا مريحة جداً وبدون ألم ولا تتطلب أي تخدير. جلسة فيلاشيب تعطي شعوراً دافئاً شبيهاً بالمساج العميق المريح، وجلسات العلاج الطبيعي والتصريف اللمفاوي تُجرى بتدرج ناعم يريح العضلات.

• **مدة الجلسة:**
تستغرق الجلسة عادة من ٤٥ إلى ٦٠ دقيقة حسب البروتوكول العلاجي ونوع الحالة.

• **ظهور النتائج:**
- **آلام الظهر والمفاصل:** يشعر معظم عميلاتنا بفارق وخفة ملحوظة من أول ٣ إلى ٦ جلسات.
- **نحت القوام (فيلاشيب III):** يبدأ التحسن في نعومة الجلد وشد الترهل بالظهور تدريجياً، مع قياسات ملحوظة بعد ٤ إلى ٦ جلسات.
- **التصريف اللمفاوي:** يخف التورم وثقل السوائل فوراً بعد كل جلسة.`,
    whatsappText: "السلام عليكم، أود حجز كشف لتحديد خطة العلاج المناسبة والنتائج المتوقعة لحالتي."
  },

  // 17. Greetings & Polite Salutations
  {
    id: "greetings",
    category: "greeting",
    title: "أهلاً بكِ في مركز خطوط الصحة للسيدات",
    keywords: [
      "سلام", "السلام", "مرحبا", "اهلا", "هلا", "صباح", "مساء", "الو", "هااي", "هاي", 
      "كيفك", "كيف الحال", "السلام عليكم", "صباح الخير", "مساء الخير"
    ],
    questions: [
      "السلام عليكم ورحمة الله",
      "مرحبا دكتورة",
      "صباح الخير",
      "مساء الخير"
    ],
    answer: `أهلاً وسهلاً بكِ في مركز خطوط الصحة للسيدات بجدة 🌸

أنا د. لين، مساعدتكِ الذكية المتواجدة على مدار الساعة للإجابة على كل استفساراتكِ ومساعدتكِ في:
• جلسات العلاج الطبيعي وتأهيل الظهر والمفاصل والرقبة
• نحت القوام وشد الجلد وجهاز فيلاشيب III
• جلسات المساج والتصريف اللمفاوي بعد عمليات الشفط والشد
• صحة المرأة والتأهيل بعد الولادة وقاع الحوض
• حجز موعدكِ المباشر مع الأخصائية عبر الواتساب

كيف أقدر أساعدكِ اليوم وما هي الشكوى التي تودين استشارتنا عنها؟`,
    whatsappText: "السلام عليكم، أود الاستفسار عن خدمات مركز خطوط الصحة."
  }
];

export const CHATBOT_KNOWLEDGE_EN = [
  {
    id: "spine-back-sciatica-en",
    category: "therapy",
    title: "Spine, Lower Back, Sciatica & Herniated Discs",
    keywords: ["spine", "back", "lower back", "disc", "herniated", "sciatica", "numbness", "posture", "vertebrae", "shoulder blade", "lumbago"],
    questions: [
      "I have lower back pain and sciatica",
      "Do you treat herniated discs without surgery?",
      "Can physical therapy fix neck and back spasms?",
      "Numbness running down my leg"
    ],
    answer: `Yes, we provide evidence-based clinical manual therapy and spinal decompression protocols supervised by licensed female specialists.

Our clinical programs include:
• Mechanical decompression for compressed nerve roots and sciatica
• Deep core stabilization and spinal alignment exercises
• Targeted myofascial trigger point release and restoration of mobility
• Corrective posture rehabilitation for chronic spasms
• Computerized traction and neuro-calming modalities

All treatments are 1-on-1 inside 100% private female suites.`,
    whatsappText: "Hello, I would like to book a physical therapy spine evaluation at Health Lines Center."
  },
  {
    id: "neck-shoulder-headache-en",
    category: "therapy",
    title: "Neck Pain, Frozen Shoulder & Tension Headaches",
    keywords: ["neck", "shoulder", "frozen shoulder", "headache", "stiffness", "cervical", "arms", "desk posture"],
    questions: [
      "Stiff neck with tension headaches",
      "Treatment for frozen shoulder and limited reach",
      "Cervical disc and arm numbness"
    ],
    answer: `Our dedicated upper-body clinical protocol addresses cervical and shoulder dysfunction:
• Cervical mobilization relieving pinched nerves and occipital tension
• Progressive capsular release for frozen shoulder to restore full arm elevation
• Relief for tension headaches caused by suboccipital spasms
• Ergonomic postural retraining for office and digital fatigue.`,
    whatsappText: "Hello, I would like to book a neck and shoulder therapy consultation."
  },
  {
    id: "knee-joints-mobility-en",
    category: "therapy",
    title: "Knee Osteoarthritis, Cartilage & Ligament Rehab",
    keywords: ["knee", "joint", "osteoarthritis", "cartilage", "acl", "meniscus", "clicking", "stair pain", "walking"],
    questions: [
      "Knee osteoarthritis and difficulty taking stairs",
      "Post-ACL surgery and ligament rehabilitation",
      "Clicking knees and joint swelling"
    ],
    answer: `Our lower-limb rehabilitation restores seamless, pain-free daily locomotion:
• Unloading knee joint stress by strengthening stabilizing quadriceps and glutes
• Patellar tracking correction and gait balance retraining
• Reducing joint effusion and inflammation using advanced clinical modalities
• Tailored rehab for meniscus and cruciate ligament recovery.`,
    whatsappText: "Hello, I would like to book a knee and joint rehabilitation evaluation."
  },
  {
    id: "velashape-contouring-en",
    category: "velashape",
    title: "VelaShape III Body Sculpting & Cellulite Reduction",
    keywords: ["velashape", "sculpt", "contouring", "cellulite", "firming", "fat", "tummy", "waist", "arms", "thighs", "flanks", "skin tightening", "inches"],
    questions: [
      "How does VelaShape III work?",
      "Can VelaShape eliminate cellulite and tighten loose skin?",
      "Is there any pain or downtime?",
      "How many centimeters will I lose?"
    ],
    answer: `VelaShape III is an FDA-cleared and Saudi SFDA-licensed medical technology for non-surgical body contouring, skin firming, and cellulite reduction.

It harnesses 4 technologies simultaneously:
1. Bi-polar Radiofrequency (RF): Stimulates collagen & tightens dermal tissue
2. Infrared Light (IR): Safely heats deep adipocyte layers
3. Pulsed Vacuum & Mechanical Rollers: Enhances lymphatic clearance & smooths skin

Highlights:
• 100% Non-invasive, zero anesthesia, comfortable warming massage sensation
• Zero downtime: return immediately to your daily routine
• Average circumference reduction of 2.5 to 4 cm
• Typical programs comprise 6 to 12 sessions tailored to your body goals.`,
    whatsappText: "Hello, I would like to inquire and book a VelaShape III body sculpting consultation."
  },
  {
    id: "lymphatic-drainage-en",
    category: "lymphatic",
    title: "Post-Surgical Manual Lymphatic Drainage Massage",
    keywords: ["lymphatic", "drainage", "massage", "lipo", "liposuction", "surgery", "post-op", "tummy tuck", "swelling", "fibrosis", "edema", "bruising", "faja"],
    questions: [
      "I had liposuction surgery and need manual lymphatic drainage",
      "How can I prevent fibrosis and hard lumps after surgery?",
      "When should I start lymphatic drainage after liposuction?"
    ],
    answer: `Manual Lymphatic Drainage (MLD) is an essential medical recovery protocol following liposuction, abdominoplasty, or body sculpting:

Key Clinical Benefits:
• Evacuates trapped interstitial edema and post-op fluid accumulations
• Effectively prevents subcutaneous fibrosis, nodules, and skin irregularities
• Accelerates clearance of bruising and reduces garment tension discomfort
• Helps skin re-adhere smoothly to the newly contoured muscle bed

Delivered by certified, highly experienced female lymphatic practitioners. Starting timeframe is typically 5 to 10 days post-op as cleared by your surgeon.`,
    whatsappText: "Hello, I would like to book clinical post-operative lymphatic drainage sessions."
  },
  {
    id: "women-pelvic-health-en",
    category: "pelvic",
    title: "Women's Health, Pelvic Floor & Postpartum Recovery",
    keywords: ["pelvic", "pelvic floor", "postpartum", "birth", "incontinence", "prolapse", "uterine", "diastasis", "kegel", "core", "leakage"],
    questions: [
      "Do you offer pelvic floor therapy for postpartum incontinence?",
      "Can uterine prolapse be treated without surgery?",
      "How do you treat diastasis recti after childbirth?"
    ],
    answer: `Our dedicated Women's Health Department specializes in evidence-based maternal and pelvic floor rehabilitation:

Programs cover:
• Pelvic floor muscle conditioning to alleviate weakness and laxity
• Non-surgical management of stress and urge urinary incontinence
• Supportive clinical protocols for mild/moderate uterine prolapse
• Precision functional training to close diastasis recti and restore core stability

Conducted with absolute discretion in closed, private women's suites by certified female physical therapists.`,
    whatsappText: "Hello, I would like to schedule a women's pelvic health and postpartum evaluation."
  },
  {
    id: "location-hours-en",
    category: "logistics",
    title: "Clinic Location in Jeddah, Operating Hours & Contact",
    keywords: ["location", "where", "address", "jeddah", "hours", "open", "time", "friday", "parking", "contact", "phone", "directions", "map"],
    questions: [
      "Where is Health Lines Center located in Jeddah?",
      "What are your opening hours?",
      "Are you open on Fridays?",
      "Is parking available?"
    ],
    answer: `📍 **Address & Directions:**
Jeddah - Prince Majed Road (Al-Sabeen) - Al-Rabwah District - Al-Ali Business Center (South Tower) - 4th Floor.

⏰ **Hours of Care:**
Saturday to Thursday: 9:00 AM – 9:00 PM continuous.
(Friday: Closed)

🚗 **Parking:**
Convenient dedicated parking surrounds the business center.

📞 **Direct Contact Lines:**
• Clinic Phone: +966 12 691 8000
• WhatsApp Concierge: +966 59 953 0955`,
    whatsappText: "Hello, I would like to schedule a visit to Health Lines Center in Jeddah."
  },
  {
    id: "privacy-staff-en",
    category: "general",
    title: "100% Female Medical Staff & Absolute Privacy",
    keywords: ["female", "women", "staff", "therapist", "doctor", "men", "privacy", "private", "confidentiality", "sanctuary"],
    questions: [
      "Is Health Lines Center strictly female-only?",
      "Are all therapists certified women?",
      "Are treatment suites fully private?"
    ],
    answer: `Yes, 100% female-only sanctuary:
• All clinical specialists, therapists, and coordinators are certified women
• Fully accredited and licensed by the Saudi Ministry of Health
• Zero male presence in clinical or treatment wings
• All sessions take place in dedicated, fully enclosed private suites ensuring complete modesty and tranquility.`,
    whatsappText: "Hello, I would like to book a private consultation at your female center."
  },
  {
    id: "booking-pricing-en",
    category: "booking",
    title: "Appointments, Clinical Evaluation & Payment",
    keywords: ["book", "appointment", "price", "cost", "how much", "consultation", "insurance", "visa", "mada", "card", "packages"],
    questions: [
      "How do I book an appointment?",
      "What is the cost of consultation?",
      "Do you accept health insurance?"
    ],
    answer: `Booking is straightforward and fast:
1. Schedule your initial clinical evaluation with our medical concierge via WhatsApp or phone.
2. The specialist performs a comprehensive assessment and outlines the exact treatment roadmap.
3. We offer single sessions and multi-session rehabilitation packages designed for comprehensive recovery.

💳 **Payment & Insurance:**
• We accept Mada, Visa, Mastercard, and Cash.
• We provide itemized, stamped medical invoices for insurance reimbursement submission.`,
    whatsappText: "Hello, I would like to book a clinical consultation at Health Lines Center."
  },
  {
    id: "greetings-en",
    category: "greeting",
    title: "Welcome to Health Lines Center for Women",
    keywords: ["hello", "hi", "hey", "welcome", "good morning", "good evening", "how are you"],
    questions: [
      "Hello Dr. Leen",
      "Good morning",
      "I need some help"
    ],
    answer: `Welcome to Health Lines Center for Women in Jeddah 🌸

I am Dr. Leen, your intelligent clinic assistant available 24/7. I can guide you through:
• Physical therapy & spine care
• VelaShape III body contouring & cellulite care
• Post-operative lymphatic drainage
• Women’s pelvic health & postpartum recovery
• Direct WhatsApp appointment booking

How may I assist you today?`,
    whatsappText: "Hello, I would like to inquire about Health Lines Center services."
  }
];
