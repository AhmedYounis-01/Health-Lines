import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { siteConfig } from '../config/siteConfig';

const EXPO_OUT = [0.16, 1, 0.3, 1];

export default function HeroContactDock({ t, lang = 'ar', onOpenBooking }) {
  const isAr = lang === 'ar';
  const dock = t?.heroDock || {};

  const whatsappText = isAr
    ? 'السلام عليكم، أود الاستفسار وحجز موعد استشارة في مركز خطوط الصحة للعلاج الطبيعي ونحت القوام.'
    : 'Hello, I would like to inquire and schedule a consultation at Health Lines Center.';

  const channels = [
    {
      id: 'booking',
      label: dock.booking || (isAr ? 'احجزي موعد' : 'Book Now'),
      ariaLabel: dock.booking || (isAr ? 'حجز موعد استشارة' : 'Book Consultation'),
      icon: Calendar,
      type: 'button',
      onClick: onOpenBooking,
      accentClass:
        'text-[#9d237a] dark:text-fuchsia-300 group-hover/item:bg-[#9d237a] group-hover/item:text-white dark:group-hover/item:bg-fuchsia-500',
    },
    {
      id: 'whatsapp',
      label: dock.whatsapp || (isAr ? 'واتساب' : 'WhatsApp'),
      ariaLabel: `${dock.whatsapp || 'WhatsApp'} — ${siteConfig.contact.displayWhatsapp}`,
      icon: MessageCircle,
      href: siteConfig.buildWhatsAppUrl(whatsappText),
      external: true,
      accentClass:
        'text-emerald-700 dark:text-emerald-300 group-hover/item:bg-emerald-600 group-hover/item:text-white',
    },
    {
      id: 'phone',
      label: dock.phone || (isAr ? 'اتصال' : 'Call'),
      ariaLabel: `${dock.phone || 'Call'} — ${siteConfig.contact.displayPhone}`,
      icon: Phone,
      href: `tel:${siteConfig.contact.phone}`,
      external: false,
      accentClass:
        'text-[#4d7c1b] dark:text-lime-300 group-hover/item:bg-[#629131] group-hover/item:text-white',
    },
    {
      id: 'instagram',
      label: dock.instagram || (isAr ? 'إنستغرام' : 'Instagram'),
      ariaLabel: dock.instagram || 'Instagram',
      icon: InstagramIcon,
      href: siteConfig.social.instagram,
      external: true,
      accentClass:
        'text-[#9d237a] dark:text-pink-300 group-hover/item:bg-gradient-to-tr group-hover/item:from-[#9d237a] group-hover/item:to-amber-500 group-hover/item:text-white',
    },
    {
      id: 'location',
      label: dock.location || (isAr ? 'الموقع' : 'Location'),
      ariaLabel: `${dock.location || 'Location'} — ${siteConfig.location.address[isAr ? 'ar' : 'en']}`,
      icon: MapPin,
      href: siteConfig.location.googleMapsUrl,
      external: true,
      accentClass:
        'text-[#4d7c1b] dark:text-lime-300 group-hover/item:bg-[#629131] group-hover/item:text-white',
    },
    {
      id: 'email',
      label: dock.email || (isAr ? 'البريد' : 'Email'),
      ariaLabel: `${dock.email || 'Email'} — ${siteConfig.contact.email}`,
      icon: Mail,
      href: `mailto:${siteConfig.contact.email}`,
      external: false,
      accentClass:
        'text-[#7c2d73] dark:text-purple-200 group-hover/item:bg-[#9d237a] group-hover/item:text-white',
    },
  ];

  return (
    <motion.nav
      aria-label={dock.ariaLabel || (isAr ? 'قنوات التواصل المباشرة مع المركز' : 'Direct Clinic Communication Channels')}
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay: 0.85, ease: EXPO_OUT }}
      className="mt-6 mb-14 sm:mb-2 w-full sm:w-fit max-w-4xl mx-auto px-1"
    >
      <div className="glass-notch rounded-2xl sm:rounded-full px-2.5 py-2 sm:px-3.5 sm:py-2 border border-[#9d237a]/15 dark:border-fuchsia-300/20 shadow-[0_14px_40px_-10px_rgba(157,35,122,0.18)] dark:shadow-[0_18px_45px_-10px_rgba(157,35,122,0.35)]">
        <div className="grid grid-cols-3 sm:flex sm:flex-nowrap sm:items-center sm:justify-center gap-1.5 sm:gap-1.5">
          {channels.map((channel) => {
            const IconComponent = channel.icon;
            const commonClasses =
              'group/item flex items-center justify-center sm:justify-start gap-1.5 px-2 py-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full text-xs font-medium text-[#1f122b] dark:text-[#f8f0fc] hover:bg-[#9d237a]/8 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d237a] dark:focus-visible:ring-lime-400';

            const content = (
              <>
                <span
                  className={`w-7 h-7 rounded-full bg-[#9d237a]/8 dark:bg-white/10 flex items-center justify-center shrink-0 transition-all duration-200 ${channel.accentClass}`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </span>
                <span className={`truncate ${isAr ? 'font-arabic' : 'font-sans'} font-semibold tracking-tight`}>
                  {channel.label}
                </span>
              </>
            );

            if (channel.type === 'button') {
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={channel.onClick}
                  aria-label={channel.ariaLabel}
                  title={channel.ariaLabel}
                  className={commonClasses}
                >
                  {content}
                </button>
              );
            }

            return (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                aria-label={channel.ariaLabel}
                title={channel.ariaLabel}
                className={commonClasses}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
