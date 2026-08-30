import { LegalContent } from '../types';

export const defaultLegal: LegalContent = {
  privacyPolicy: {
    lastUpdated: 'August 30, 2024',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'When you submit an enquiry, request a driving lesson, or contact us via WhatsApp, we collect personal information you provide, including your name, phone number, email address, preferred pickup location/pincode, and driving experience level. We do not store financial payment credentials or sensitive personal biometric data.',
      },
      {
        heading: '2. How We Use Your Information',
        body: 'We use your information exclusively to: (a) Schedule and coordinate driving lessons with certified instructors, (b) Provide doorstep pickup and route planning, (c) Generate pre-formatted WhatsApp enquiry messages, and (d) Assist you with Parivahan Sarathi driving licence appointment slots upon request.',
      },
      {
        heading: '3. Data Sharing & Third Parties',
        body: 'We do NOT sell, rent, or trade your personal data to third-party telemarketers or advertisers. Your phone number and pickup address are shared only with your assigned DriveCraft certified instructor for lesson coordination and safety tracking.',
      },
      {
        heading: '4. WhatsApp Communication',
        body: 'By initiating contact or requesting an enquiry via WhatsApp, you agree to receive lesson scheduling updates, instructor arrival notifications, and road safety resources. You may opt out of promotional messages at any time by replying "STOP".',
      },
      {
        heading: '5. Data Protection Under Indian Laws',
        body: 'We adhere to the Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology Act, 2000. You have the right to request access, correction, or deletion of your contact details by writing to admissions@drivecraft.in.',
      },
    ],
  },
  termsAndConditions: {
    lastUpdated: 'August 30, 2024',
    sections: [
      {
        heading: '1. Eligibility & Learner Requirements',
        body: 'Learners enrolling for on-road training must be at least 18 years of age (for Light Motor Vehicle passenger cars) and must hold an active, valid Form 3 Learner’s Licence issued by an authorized Regional Transport Office (RTO) in India before public highway or main road sessions begin.',
      },
      {
        heading: '2. Lesson Scheduling & Punctuality',
        body: 'Each standard lesson is 60 minutes in duration (including doorstep arrival, brief pre-check, and post-drive debrief). The learner is requested to be ready at the designated doorstep pickup point at least 5 minutes prior to the booked time slot.',
      },
      {
        heading: '3. Rescheduling & Cancellation Policy',
        body: 'Learners may reschedule a session free of charge with a minimum of 6 hours advance notice to the instructor or support desk. Cancellations with less than 3 hours notice may result in that session being counted against the package total.',
      },
      {
        heading: '4. Dual-Control Fleet Safety & Liability',
        body: 'All training vehicles are insured and equipped with dual-control safety pedals. Learners are required to follow all lawful instructions given by the instructor. In the event of minor scratches or accidental damage occurring during supervised dual-control sessions, the academy’s commercial insurance covers vehicle repairs, ensuring zero personal liability for the student during standard lessons.',
      },
      {
        heading: '5. Zero-Tolerance Conduct & Sobriety',
        body: 'DriveCraft maintains a strict zero-tolerance policy for driving under the influence of alcohol, drugs, or prescription medicines that impair reaction time. The instructor reserves the right to immediately terminate the session if sobriety or aggressive driving is detected.',
      },
    ],
  },
};
