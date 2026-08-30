import { EnquiryFormState, SiteConfig } from '../types';

export function formatWhatsAppMessage(form: EnquiryFormState, siteConfig: SiteConfig): string {
  const transMap = {
    manual: 'Manual Transmission',
    automatic: 'Automatic Transmission (AT/AMT/CVT)',
    both: 'Both Manual & Automatic (Hybrid Package)',
  };

  const expMap = {
    absolute_beginner: 'Absolute Beginner (Never driven before)',
    some_experience: 'Some basic steering / clutch familiarity',
    test_prep: 'Preparing for upcoming RTO driving test',
    refresher: 'Licence holder seeking confidence / route practice',
  };

  const timeMap = {
    early_morning: 'Early Morning (6:00 AM – 8:00 AM)',
    morning: 'Morning (8:00 AM – 12:00 PM)',
    afternoon: 'Afternoon (12:00 PM – 4:00 PM)',
    evening: 'Evening (4:00 PM – 8:00 PM)',
    weekend_only: 'Weekends Only (Sat/Sun)',
  };

  return `*🚗 Driving Lesson Enquiry — ${siteConfig.brandName}*
----------------------------------------
👤 *Full Name:* ${form.fullName.trim()}
📱 *Phone Number:* ${form.phoneNumber.trim()}
✉️ *Email:* ${form.email.trim() || 'Not provided'}
📍 *Pickup Area / Pincode:* ${form.pickupArea.trim()} (${form.city})

🎓 *Selected Course:* ${form.courseSlug.replace(/-/g, ' ').toUpperCase()}
⚙️ *Transmission Choice:* ${transMap[form.transmission] || form.transmission}
🗓️ *Preferred Start Date:* ${form.preferredDate || 'Earliest available slot'}
⏰ *Preferred Time Slot:* ${timeMap[form.preferredTimeSlot] || form.preferredTimeSlot}
🚦 *Experience Level:* ${expMap[form.experienceLevel] || form.experienceLevel}

💬 *Additional Note / Request:*
"${form.message.trim() || 'Please send me details on upcoming batch schedules and trial lesson availability.'}"
----------------------------------------
_Sent from DriveCraft Official Website Enquiry Studio_`;
}

export function generateWhatsAppLink(form: EnquiryFormState, siteConfig: SiteConfig): string {
  const message = formatWhatsAppMessage(form, siteConfig);
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateDirectWhatsAppChatLink(siteConfig: SiteConfig, customText?: string): string {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const text = customText || siteConfig.whatsappDefaultMessage;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
