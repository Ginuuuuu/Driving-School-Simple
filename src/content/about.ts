import { AboutContent } from '../types';

export const defaultAbout: AboutContent = {
  missionHeadline: 'Transforming Indian Drivers into Safe, Confident, and Courteous Road Masters',
  missionBody: 'Founded with a clear vision to make Indian roads safer, DriveCraft Motor Academy replaces outdated, stressful driving school habits with structured, science-backed coaching. We combine certified dual-control safety vehicles, patient empathetic mentors, and automated RTO track training to build lifelong confident drivers.',
  visionHeadline: 'A Future with Zero Preventable Road Accidents and Total Driver Independence',
  visionBody: 'We believe that learning to drive is not merely passing a government test; it is acquiring a vital life skill that unlocks independence, career opportunities, and family safety. Our comprehensive curriculum emphasizes defensive spatial judgment, hazard prediction, and road courtesy.',
  safetyPledge: [
    '100% Dual-Control Equipped Fleet: Certified secondary brake and clutch controls on every training car.',
    'Verified Background & Police Check: Every instructor undergoes strict background checks, psychological patience evaluations, and periodic safety audits.',
    'Clean, Air-Conditioned Dual-Pedal Vehicles: Modern fleet of regularly serviced, GPS-tracked vehicles with in-cabin safety dashcams.',
    'Zero-Tolerance Shouting Policy: An ultra-calm, patient, encouraging learning atmosphere designed specifically for nervous first-time drivers.',
    'Doorstep Safety Protocols: Timely, verified doorstep pickup with direct instructor status notifications on WhatsApp.',
  ],
  fourPillars: [
    {
      title: '1. Cockpit Ergonomics & Muscle Memory',
      description: 'Mastering the DSSSM protocol, pedal muscle memory, and blind-spot mirror elimination before touching public traffic.',
      icon: 'Sliders',
    },
    {
      title: '2. Spatial Judgment & Lane Discipline',
      description: 'Understanding vehicle width boundaries, maintaining 3-second safety buffers, and asserting clean lane discipline.',
      icon: 'Compass',
    },
    {
      title: '3. Defensive Hazard Prediction',
      description: 'Scanning 10 to 15 seconds down the road to anticipate wrong-side drivers, unlit two-wheelers, and sudden braking hazards.',
      icon: 'ShieldCheck',
    },
    {
      title: '4. Automated Track & Maneuver Precision',
      description: 'Replica sensor drills on Figure-8, H-box reversing, and slope anti-rollback tests to guarantee first-attempt RTO success.',
      icon: 'Award',
    },
  ],
  fleetStandards: [
    {
      title: 'Dual-Control Certified',
      description: 'All vehicles retrofitted with ARAI-compliant secondary dual pedal sets.',
      metric: '100% Fleet',
    },
    {
      title: 'Fleet Vehicle Age',
      description: 'Modern, well-maintained vehicles under 3 years old with active ABS and dual airbags.',
      metric: '< 3 Years Old',
    },
    {
      title: 'Daily Sanitization & Maintenance',
      description: 'Multi-point inspection of brakes, clutch fluid, tyres, and AC before daily batches.',
      metric: 'Daily Checks',
    },
    {
      title: 'GPS & Telematics Tracking',
      description: 'Real-time speed monitoring and route tracking for student safety and punctuality.',
      metric: 'Real-Time GPS',
    },
  ],
};
