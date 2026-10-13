/**
 * Smart Local AI Matching Engine for Health Lines Center
 * Handles Arabic normalization, dialect variations, root/stem heuristics,
 * multi-keyword scoring, and contextual clinical fallbacks.
 */

import { CHATBOT_KNOWLEDGE_AR, CHATBOT_KNOWLEDGE_EN, CLINIC_INFO } from '../data/chatbotKnowledge.js';

/**
 * Normalizes Arabic text for flexible matching:
 * - Strips tashkeel & tatweel
 * - Unifies alef variations (أ, إ, آ, ٱ -> ا)
 * - Unifies taa marbuta (ة -> ه)
 * - Unifies yaa / alef maqsura (ى -> ي)
 * - Unifies hamzas on carrier (ؤ -> و, ئ -> ي)
 * - Cleans punctuation & excessive spaces
 */
export function normalizeArabic(str = '') {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel/diacritics
    .replace(/\u0640/g, '') // Remove tatweel (kashida)
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[؟?،!.,;:()[\]{}"'`~\\/+\-*#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Normalizes English text
 */
export function normalizeEnglish(str = '') {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strips common Arabic prefixes (ال, و, ب, ف) from a token to reach the base noun
 */
export function stripArabicPrefixes(word) {
  if (!word || word.length <= 3) return [word];
  const variations = [word];

  // Strip 'ال'
  if (word.startsWith('ال') && word.length > 3) {
    variations.push(word.slice(2));
  }
  // Strip 'وال'
  if (word.startsWith('وال') && word.length > 4) {
    variations.push(word.slice(3));
  }
  // Strip 'و'
  if (word.startsWith('و') && word.length > 3) {
    variations.push(word.slice(1));
  }
  // Strip 'بال'
  if (word.startsWith('بال') && word.length > 4) {
    variations.push(word.slice(3));
  }

  return Array.from(new Set(variations));
}

/**
 * Tokenizes text into normalized word stems
 */
export function tokenizeQuery(text, lang = 'ar') {
  const norm = lang === 'ar' ? normalizeArabic(text) : normalizeEnglish(text);
  const rawTokens = norm.split(' ').filter((t) => t.length > 1);

  if (lang !== 'ar') return rawTokens;

  const allTokens = [];
  for (const t of rawTokens) {
    allTokens.push(...stripArabicPrefixes(t));
  }
  return Array.from(new Set(allTokens));
}

/**
 * Intelligent Matching Function
 * Returns the best matched answer object, category, confidence score, and WhatsApp CTA.
 */
export function matchUserQuery(rawQuery, lang = 'ar') {
  if (!rawQuery || !rawQuery.trim()) return null;

  const isAr = lang === 'ar';
  const knowledgeBase = isAr ? CHATBOT_KNOWLEDGE_AR : CHATBOT_KNOWLEDGE_EN;
  const normalizedQuery = isAr ? normalizeArabic(rawQuery) : normalizeEnglish(rawQuery);
  const queryTokens = tokenizeQuery(rawQuery, lang);

  let bestEntry = null;
  let highestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;

    // 1. Direct Question Match (Highest Weight)
    if (entry.questions && Array.isArray(entry.questions)) {
      for (const q of entry.questions) {
        const normQ = isAr ? normalizeArabic(q) : normalizeEnglish(q);
        if (normQ === normalizedQuery) {
          score += 25; // Exact match
        } else if (normalizedQuery.includes(normQ) || normQ.includes(normalizedQuery)) {
          score += 15; // Strong substring match
        }
      }
    }

    // 2. Multi-word & Single Keyword Match
    if (entry.keywords && Array.isArray(entry.keywords)) {
      for (const kw of entry.keywords) {
        const normKw = isAr ? normalizeArabic(kw) : normalizeEnglish(kw);
        
        // Exact keyword found inside the user's sentence
        if (normalizedQuery.includes(normKw)) {
          // Weight multi-word keywords higher (e.g. "اسفل الظهر" vs "ظهر")
          score += normKw.includes(' ') ? 8 : 4;
        }

        // Token-level matching with prefix stripping
        for (const token of queryTokens) {
          if (token === normKw) {
            score += 3;
          } else if (normKw.length > 3 && token.length > 3 && (normKw.includes(token) || token.includes(normKw))) {
            score += 1.5;
          }
        }
      }
    }

    // 3. Title match
    const normTitle = isAr ? normalizeArabic(entry.title) : normalizeEnglish(entry.title);
    for (const token of queryTokens) {
      if (normTitle.includes(token)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  // Threshold for acceptable confidence
  const CONFIDENCE_THRESHOLD = 3;

  if (bestEntry && highestScore >= CONFIDENCE_THRESHOLD) {
    return {
      id: bestEntry.id,
      category: bestEntry.category,
      title: bestEntry.title,
      reply: bestEntry.answer,
      whatsappPrompt: bestEntry.whatsappText || (isAr
        ? `السلام عليكم، أود حجز موعد واستشارة بخصوص: (${bestEntry.title})`
        : `Hello, I would like to book a consultation regarding: (${bestEntry.title})`),
      score: highestScore,
      isFallback: false
    };
  }

  // Fallback with thoughtful medical empathy & instant WhatsApp concierge
  return {
    id: 'fallback',
    category: 'general',
    title: isAr ? 'استشارة طبية خاصة' : 'Clinical Consultation',
    reply: isAr
      ? `شكراً لاستفساركِ وثقتكِ بنا في مركز خطوط الصحة 🌸

بخصوص سؤالكِ: "${rawQuery.trim()}"، يسعدنا تقديم استشارة سريرية مفصلة تتناسب بدقة مع احتياجكِ وظروف حالتكِ الصحية.

أخصائياتنا المعتمدات متواجدات للإجابة المباشرة وتنسيق الكشف الأنسب لكِ في أجنحتنا النسائية المغلقة. يمكنكِ الضغط على زر الواتساب بالأسفل لمتابعة محادثتكِ مع الأخصائية فوراً.`
      : `Thank you for reaching out to Health Lines Center 🌸

Regarding your inquiry: "${rawQuery.trim()}", our certified female clinical specialists are ready to provide thorough guidance tailored specifically to your case.

Please click the WhatsApp button below to transfer your question directly to our medical concierge desk.`,
    whatsappPrompt: isAr
      ? `السلام عليكم، أود الاستفسار من الأخصائية بخصوص: (${rawQuery.trim()})`
      : `Hello, I would like to consult the specialist regarding: (${rawQuery.trim()})`,
    score: 0,
    isFallback: true
  };
}
