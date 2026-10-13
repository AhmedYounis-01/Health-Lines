import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  MessageCircle, 
  ShieldCheck, 
  ChevronDown,
  ArrowUpRight,
  Clock,
  MapPin,
  Heart,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { matchUserQuery } from '../utils/chatbotEngine.js';
import { CLINIC_INFO } from '../data/chatbotKnowledge.js';

export default function LocalChatBot({ lang = 'ar' }) {
  const isAr = lang === 'ar';
  const clinicPhone = CLINIC_INFO.whatsapp;
  
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedPrompt, setHasDismissedPrompt] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      title: isAr ? 'أهلاً بكِ في مركز خطوط الصحة 🌸' : 'Welcome to Health Lines Center 🌸',
      text: isAr
        ? `أهلاً وسهلاً بكِ في مركز خطوط الصحة للسيدات بجدة 🌸
أنا د. لين، مساعدتكِ الطبية الذكية. 

يسعدني الرد الفوري على كل استفساراتكِ حول:
• جلسات العلاج الطبيعي وآلام الظهر والعمود الفقري والمفاصل
• نحت القوام وشد الترهلات بجهاز فيلاشيب III الأمريكي
• المساج والتصريف اللمفاوي الطبي بعد عمليات الشفط والشد
• صحة المرأة والتأهيل بعد الولادة وقاع الحوض
• أوقات العمل، الموقع بجدة، وحجز موعدكِ السريري

تفضلي بكتابة استفساركِ أو اختاري من الموضوعات المقترحة أدناه:`
        : `Welcome to Health Lines Center for Women in Jeddah 🌸
I am Dr. Leen, your smart clinical assistant.

I am here 24/7 to answer your questions regarding:
• Physical therapy for spine, neck & joint rehabilitation
• VelaShape III non-surgical body sculpting & cellulite care
• Post-operative manual lymphatic drainage (MLD)
• Women’s pelvic health & postpartum recovery
• Location, opening hours & direct WhatsApp bookings

Feel free to ask any question or tap a suggested topic below:`,
      whatsappPrompt: isAr
        ? 'السلام عليكم، أود الاستفسار وحجز موعد استشارة في مركز خطوط الصحة.'
        : 'Hello, I would like to inquire and book a consultation at Health Lines Center.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Show gentle welcome speech bubble after 2.5s if not opened yet
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasDismissedPrompt) {
        setShowWelcomeBubble(true);
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, [isOpen, hasDismissedPrompt]);

  // Quick prompt chips
  const quickChips = isAr ? [
    { label: '🦴 آلام الظهر والديسك', text: 'عندي الم في اسفل الظهر وديسك وعرق نسا' },
    { label: '✨ نحت القوام (فيلاشيب III)', text: 'كيف يشتغل جهاز فيلاشيب لنحت القوام وشد الترهلات؟' },
    { label: '💧 مساج التصريف اللمفاوي', text: 'سويت عملية شفط دهون ومحتاجة مساج تصريف لمفاوي للوقاية من التليف' },
    { label: '🌸 صحة المرأة وقاع الحوض', text: 'هل تقدمون علاج للانفصال العضلي وسلس البول بعد الولادة؟' },
    { label: '🛡️ الخصوصية والكادر النسائي', text: 'هل المركز نسائي ١٠٠٪ وجميع الأخصائيات سيدات؟' },
    { label: '📍 الموقع وأوقات الدوام', text: 'وين موقع المركز في جدة ومتى ساعات العمل؟' },
    { label: '💳 طريقة الحجز والأسعار', text: 'كيف احجز موعد كشف وبكم الجلسات وهل تقبلون التأمين؟' }
  ] : [
    { label: '🦴 Spine & Back Pain', text: 'I have lower back pain, disc issues, and sciatica' },
    { label: '✨ VelaShape III Sculpting', text: 'How does VelaShape III reduce cellulite and tighten loose skin?' },
    { label: '💧 Post-Op Lymphatic Drainage', text: 'I had liposuction surgery and need lymphatic drainage to prevent fibrosis' },
    { label: '🌸 Women’s Pelvic Health', text: 'Do you offer pelvic floor and diastasis recti therapy after childbirth?' },
    { label: '🛡️ 100% Female Sanctuary', text: 'Is the center strictly female-only with licensed women therapists?' },
    { label: '📍 Location & Hours', text: 'Where is the clinic located in Jeddah and what are the opening hours?' },
    { label: '💳 Booking & Pricing', text: 'How do I book an appointment and what are the consultation details?' }
  ];

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowWelcomeBubble(false);
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend = null) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Realistic natural AI doctor thinking pause
    setTimeout(() => {
      const match = matchUserQuery(userText, lang);
      const botMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        title: match?.title || (isAr ? 'استشارة طبية' : 'Clinical Consultation'),
        text: match?.reply || '',
        whatsappPrompt: match?.whatsappPrompt || (isAr
          ? `السلام عليكم، أود الاستفسار من الأخصائية بخصوص: (${userText})`
          : `Hello, I would like to consult the specialist regarding: (${userText})`),
        isFallback: match?.isFallback || false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  const handleTransferToWhatsApp = (customPrompt = null) => {
    const text = customPrompt || (isAr
      ? 'السلام عليكم، أود الاستفسار وحجز موعد استشارة في مركز خطوط الصحة.'
      : 'Hello, I would like to inquire and book an appointment at Health Lines Center.');
    const url = `https://wa.me/${clinicPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'bot',
        title: isAr ? 'محادثة جديدة 🌸' : 'New Session 🌸',
        text: isAr
          ? 'تم بدء محادثة جديدة. أهلاً بكِ مجدداً في مركز خطوط الصحة للسيدات بجدة 🌸 كيف يمكنني مساعدتكِ اليوم؟'
          : 'New conversation started. Welcome back to Health Lines Center for Women in Jeddah 🌸 How can I help you today?',
        whatsappPrompt: isAr
          ? 'السلام عليكم، أود الاستفسار وحجز موعد في مركز خطوط الصحة.'
          : 'Hello, I would like to inquire and book an appointment at Health Lines Center.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Area on Bottom-Right */}
      <aside aria-label="AI Clinic Assistant" className="fixed bottom-6 right-6 z-50 flex items-center">
        
        {/* Floating Interactive Pill Label (Desktop & Tablet) */}
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, x: 14, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.04, x: -2 }}
            className="hidden md:flex items-center gap-3 ml-3.5 px-4 py-2 rounded-full bg-[#0e0918]/90 border border-fuchsia-500/40 hover:border-lime-400 text-white shadow-[0_10px_35px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 group/pill cursor-pointer"
          >
            <div className="flex flex-col text-right rtl:text-left">
              <div className="flex items-center gap-1.5 justify-end rtl:justify-start">
                <span className="text-xs font-semibold tracking-wide text-white group-hover/pill:text-lime-300 transition-colors">
                  {isAr ? 'استشيري د. لين' : 'Ask Dr. Leen'}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-fuchsia-300/90 font-mono leading-none">
                {isAr ? 'مساعدة طبية ذكية 24/7' : 'Smart Clinic AI 24/7'}
              </span>
            </div>

            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400" />
            </span>
          </motion.button>
        )}

        {/* Proactive Greeting Bubble on first visit */}
        <AnimatePresence>
          {showWelcomeBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute bottom-20 right-0 sm:right-2 w-72 sm:w-80 p-4 rounded-2xl bg-[#120a1f]/95 border border-fuchsia-500/40 text-white shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl z-50 text-right rtl:text-right"
            >
              <button
                type="button"
                onClick={() => {
                  setShowWelcomeBubble(false);
                  setHasDismissedPrompt(true);
                }}
                className="absolute top-2.5 left-2.5 rtl:left-2.5 rtl:right-auto p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9d237a] to-lime-500 flex items-center justify-center">
                  <Stethoscope className="w-3.5 h-3.5 text-white" />
                </div>
                <h4 className="text-xs font-semibold text-lime-300">
                  {isAr ? 'د. لين ترحب بكِ 🌸' : 'Dr. Leen Welcomes You 🌸'}
                </h4>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {isAr
                  ? 'أهلاً بكِ في مركز خطوط الصحة! هل تحتاجين مساعدة في اختيار جلسة العلاج الطبيعي أو نحت القوام المناسبة لكِ؟'
                  : 'Welcome to Health Lines! Need help choosing the right physical therapy or body sculpting treatment?'}
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowWelcomeBubble(false);
                  setIsOpen(true);
                }}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#629131] hover:brightness-110 text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-950/50 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-lime-300" />
                <span>{isAr ? 'ابدأي الاستشارة الآن' : 'Start Consultation Now'}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Circular Main Chatbot Button */}
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowWelcomeBubble(false);
          }}
          aria-label={isAr ? 'المساعد الطبي الذكي لمركز خطوط الصحة' : 'Health Lines AI Medical Assistant'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: isOpen ? 90 : [0, -6, 6, 0] }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7c1a60] via-[#9d237a] to-[#629131] text-white flex items-center justify-center shadow-[0_12px_40px_rgba(157,35,122,0.55)] hover:shadow-[0_16px_50px_rgba(157,35,122,0.8)] border-2 border-fuchsia-400/40 cursor-pointer group/btn"
        >
          {/* Radial aura glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-lime-400 opacity-40 blur-sm animate-pulse pointer-events-none" />

          {/* Outer ping ring */}
          <span className="absolute -inset-2 rounded-full border border-fuchsia-400/35 animate-ping pointer-events-none" />

          {/* Specular glass reflection overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/25 pointer-events-none" />

          {isOpen ? (
            <X className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 drop-shadow-md text-white transition-transform duration-300" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md transition-transform duration-300 group-hover/btn:scale-110" />
              <Sparkles className="w-3.5 h-3.5 text-lime-300 absolute -top-1 -right-1.5 animate-pulse" />
            </div>
          )}

          {/* Active online green dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-lime-400 border-2 border-[#0c0912] rounded-full shadow-md z-20" />
        </motion.button>
      </aside>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[430px] max-w-[440px] h-[610px] max-h-[84vh] rounded-3xl glass-notch border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col bg-[#110a1c]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-fuchsia-950/70 via-[#1a0e2a] to-lime-950/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#9d237a] to-[#629131] flex items-center justify-center border-2 border-white/20 shadow-md">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 border-2 border-[#120d1c] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-white text-sm">
                      {isAr ? 'د. لين · المساعد الطبي الذكي' : 'Dr. Leen · Smart Clinic AI'}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-lime-400" />
                  </div>
                  <p className="text-[11px] text-lime-300 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block animate-pulse" />
                    <span>{isAr ? 'مركز خطوط الصحة · كادر نسائي ١٠٠٪' : 'Health Lines · 100% Female Sanctuary'}</span>
                  </p>
                </div>
              </div>

              {/* Actions in Header */}
              <div className="flex items-center gap-1">
                {/* Direct WhatsApp Transfer */}
                <button
                  type="button"
                  onClick={() => handleTransferToWhatsApp()}
                  title={isAr ? 'تحويل فوري إلى الواتساب' : 'Direct WhatsApp Concierge'}
                  className="p-2 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title={isAr ? 'بدء محادثة جديدة' : 'Reset Chat'}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Close Drawer */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips Bar */}
            <div className="px-3 py-2 border-b border-white/5 bg-black/40 overflow-x-auto scrollbar-none flex gap-1.5">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip.text)}
                  className="px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap bg-white/[0.04] hover:bg-fuchsia-950/50 border border-white/10 hover:border-fuchsia-500/40 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Message Thread List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isBot
                          ? 'bg-[#1e1430]/95 border border-white/10 text-slate-100 rounded-tl-sm shadow-md'
                          : 'bg-gradient-to-r from-[#9d237a] to-fuchsia-700 text-white rounded-tr-sm shadow-md'
                      }`}
                    >
                      {/* Optional Title for Bot Card */}
                      {isBot && msg.title && (
                        <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/10 text-xs font-semibold text-lime-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                          <span>{msg.title}</span>
                        </div>
                      )}

                      <div className="whitespace-pre-line font-light">
                        {msg.text}
                      </div>

                      {/* Bot Message WhatsApp Direct Transfer CTA */}
                      {isBot && msg.whatsappPrompt && (
                        <div className="mt-3 pt-2.5 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => handleTransferToWhatsApp(msg.whatsappPrompt)}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:brightness-110 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-white" />
                            <span>
                              {isAr
                                ? 'تأكيد الحجز والاستشارة عبر الواتساب'
                                : 'Confirm Booking via WhatsApp'}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">
                      {msg.time}
                    </span>
                  </motion.div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#9d237a] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce delay-150" />
                    <span className="w-2 h-2 rounded-full bg-[#9d237a] animate-bounce delay-300" />
                  </div>
                  <span className="text-[11px] font-mono text-lime-300/80">
                    {isAr ? 'د. لين تبحث في السجلات الطبية...' : 'Dr. Leen is consulting clinical data...'}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/10 bg-black/50 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isAr
                    ? 'اكتبي سؤالكِ هنا (مثال: ألم أسفل الظهر، فيلاشيب، الموقع...)'
                    : 'Type your question (e.g. lower back, VelaShape, location...)'
                }
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-400/70 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label={isAr ? 'إرسال' : 'Send'}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#629131] hover:from-fuchsia-600 hover:to-lime-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
