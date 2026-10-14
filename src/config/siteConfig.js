/**
 * Centralized Clinic Configuration & Single Source of Truth
 * Health Lines Center | مركز خطوط الصحة للعلاج الطبيعي ونحت القوام - جدة
 */

export const siteConfig = {
  name: {
    ar: 'مركز خطوط الصحة للعلاج الطبيعي ونحت القوام',
    en: 'Health Lines Center | Physical Therapy & Body Contouring',
    shortAr: 'خطوط الصحة',
    shortEn: 'Health Lines',
  },
  contact: {
    phone: '0126918000',
    displayPhone: '012 691 8000',
    whatsappNumber: '966599530955',
    displayWhatsapp: '+966 59 953 0955',
    email: 'info@healthlinescenter.com',
  },
  location: {
    city: { ar: 'جدة', en: 'Jeddah' },
    district: { ar: 'حي الروضة', en: 'Al Rawdah' },
    address: {
      ar: 'جدة - حي الروضة - المملكة العربية السعودية',
      en: 'Al Rawdah District, Jeddah, Saudi Arabia',
    },
    googleMapsUrl: 'https://maps.app.goo.gl/o9go6Z1e452RcqRh8',
  },
  hours: {
    ar: 'السبت - الخميس: 10:00 ص - 10:00 م',
    en: 'Saturday – Thursday: 10:00 AM – 10:00 PM',
  },
  social: {
    instagram: 'https://www.instagram.com/healthlinescenter/',
  },

  /**
   * Builds an encoded WhatsApp URL with safety against trailing spaces and encoding issues
   */
  buildWhatsAppUrl(customMessage = '') {
    const text = (customMessage || '').trim();
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${this.contact.whatsappNumber}${encoded ? `?text=${encoded}` : ''}`;
  },

  /**
   * Generates a structured bilingual consultation booking template
   */
  buildBookingMessage({ name, phone, service, date, notes } = {}, lang = 'ar') {
    const isAr = lang === 'ar';
    if (isAr) {
      return `السلام عليكم، أود حجز موعد استشارة في مركز خطوط الصحة:
الاسم: ${name || 'لم يحدد'}
الجوال: ${phone || 'لم يحدد'}
الخدمة المطلوبة: ${service || 'استشارة عامة'}
التاريخ المفضل: ${date || 'في أقرب وقت'}
ملاحظات: ${notes || 'لا يوجد'}`;
    }
    return `Hello Health Lines Center, I would like to schedule a consultation:
Name: ${name || 'N/A'}
Phone: ${phone || 'N/A'}
Service: ${service || 'General Consultation'}
Preferred Date: ${date || 'Earliest available'}
Notes: ${notes || 'None'}`;
  },

  /**
   * Generates a department or treatment specific inquiry message
   */
  buildConditionInquiry(conditionTitle, lang = 'ar') {
    const isAr = lang === 'ar';
    if (isAr) {
      return `السلام عليكم، أود الاستفسار وحجز استشارة وجلسة علاجية في مركز خطوط الصحة بخصوص: (${conditionTitle}). هل يمكن تزويدي بالمواعيد المتاحة؟`;
    }
    return `Hello, I would like to inquire and book a therapeutic consultation at Health Lines Center regarding: (${conditionTitle}). What appointment slots are available?`;
  },
};

export default siteConfig;
