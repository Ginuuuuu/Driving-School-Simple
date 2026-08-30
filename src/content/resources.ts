import { ResourceGuide } from '../types';

export const defaultResources: ResourceGuide[] = [
  {
    id: 'res-1',
    slug: 'essential-traffic-signs-guide-india',
    title: 'Complete Guide to Indian Road Signs: Mandatory, Cautionary & Informatory',
    category: 'Road Signs',
    readTimeMinutes: 6,
    publishDate: 'August 2024',
    summary: 'Master the 3 core classifications of road signs in India with visual cues, penalty meanings, and common RTO exam traps.',
    keyTakeaways: [
      'Circular signs with red borders are Mandatory (Disobeying attracts fines under MV Act Section 177/179).',
      'Triangular signs with red borders are Cautionary / Warning (Alerting you of upcoming physical road hazards).',
      'Rectangular blue or green signs are Informatory (Guiding routes, hospitals, fuel pumps, and parking bays).',
      'Octagonal RED sign is exclusively reserved for the "STOP" command.',
      'Inverted triangle is exclusively reserved for "GIVE WAY" to traffic on the main carriageway.',
    ],
    sections: [
      {
        heading: '1. Mandatory Road Signs (Circular Red Outlines)',
        content: 'Mandatory signs indicate legal obligations. Common examples include "No Entry", "Speed Limit 50", "No Overtaking", "Compulsory Turn Left Ahead", and "No Parking". Ignoring a mandatory sign carries an immediate fine on Indian roads.',
      },
      {
        heading: '2. Cautionary & Warning Signs (Triangular Red Outlines)',
        content: 'These warn you of road conditions ahead, such as "Steep Ascent", "Narrow Bridge Ahead", "Gap in Median", "Pedestrian Crossing", "School Ahead", and "Slippery Road". You should immediately ease off the accelerator and prepare your foot over the brake.',
      },
      {
        heading: '3. Informatory Signs (Rectangular Blue/Green)',
        content: 'These provide helpful directions, public facilities, and guidance. Examples include "First Aid Post", "Petrol Pump 500m", "Eating Place", "Side Road Right", and "Parking - Two Wheelers / Cars Only".',
      },
    ],
  },
  {
    id: 'res-2',
    slug: 'step-by-step-parallel-parking-formula',
    title: 'The 45-Degree Parallel Parking Formula for Tight Indian Cities',
    category: 'Driving Technique',
    readTimeMinutes: 5,
    publishDate: 'July 2024',
    summary: 'Never fear curbside parking again. Use our foolproof 3-step mirror alignment formula to park in any tight space cleanly.',
    keyTakeaways: [
      'Pull alongside the front parked car, leaving approximately 2.5 to 3 feet (1 meter) of lateral gap.',
      'Align your car’s rear axle / rear bumper with the parked car’s rear bumper.',
      'Turn steering wheel full lock toward the curb and reverse at a crisp 45-degree angle until your driver side mirror aligns with the rear car’s center.',
      'Straighten steering wheel, reverse until your front bumper clears the front car, then full lock opposite to glide in.',
    ],
    sections: [
      {
        heading: 'Step 1: The Initial Parallel Position',
        content: 'Signal your intent with your hazard/left indicator. Pull up parallel to the vehicle parked in front of the empty space. Ensure your rear bumper is lined up with theirs. Maintain a safe arm’s length gap.',
      },
      {
        heading: 'Step 2: The 45-Degree Cut',
        content: 'Engage reverse gear. Turn the steering wheel one complete rotation toward the curb. Slowly release the clutch to creep backward until your vehicle forms a clean 45-degree angle relative to the sidewalk.',
      },
      {
        heading: 'Step 3: The Counter-Lock and Centering',
        content: 'Once your front bumper clears the rear corner of the car ahead, turn the steering wheel full lock in the opposite direction. Your car will smoothly glide into the bay without scraping the curb. Shift into 1st gear to center within the spot.',
      },
    ],
  },
  {
    id: 'res-3',
    slug: 'automated-rto-track-test-secrets',
    title: 'How to Ace the Automated RTO Driving Test on Your First Attempt',
    category: 'RTO Test',
    readTimeMinutes: 7,
    publishDate: 'June 2024',
    summary: 'A comprehensive walkthrough of sensor poles, camera tracking zones, Figure-8 steering, H-box parking, and slope anti-rollback techniques.',
    keyTakeaways: [
      'Wear your seatbelt before turning the ignition key — electronic inspection starts the moment you sit down.',
      'Always use indicators for every maneuver on the track, even when you think no one is watching.',
      'Do not stop midway inside the Figure-8 track; maintain a steady 10 km/h creep speed in 1st gear.',
      'On the Gradient slope, use the handbrake friction balance to prevent more than 2 inches of backward roll.',
    ],
    sections: [
      {
        heading: 'The Figure "8" Track',
        content: 'The 8-track measures steering timing and throttle modulation. Keep the car centered between the yellow border lines and avoid steering corrections while turning. Glance toward the inner apex of the curve to guide your hands naturally.',
      },
      {
        heading: 'The "H" Box Reversing Maneuver',
        content: 'Drive forward into the right box, stop, select reverse, and reverse across into the left box without stopping or shifting into forward gear midway. Use your side mirrors to ensure equal 1-foot clearance on both sides.',
      },
      {
        heading: 'The Gradient Slope Stop & Go Test',
        content: 'Stop your car with both front wheels resting between the two yellow lines on the 15-degree incline. Apply the handbrake. When signaled, raise the clutch to the bite point until the engine note deepens, gently apply throttle, and release the handbrake simultaneously.',
      },
    ],
  },
  {
    id: 'res-4',
    slug: 'automatic-vs-manual-transmission-comparison-india',
    title: 'Manual vs Automatic Transmission in India: Which Should You Learn?',
    category: 'Driving Technique',
    readTimeMinutes: 5,
    publishDate: 'May 2024',
    summary: 'A clear, unbiased comparison of fuel efficiency, ease of learning, city traffic fatigue, and maintenance costs in Indian conditions.',
    keyTakeaways: [
      'Manual cars provide complete control over engine revs and are ideal if you plan to drive diverse fleet vehicles or older cars.',
      'Automatic cars eliminate clutch pedal fatigue entirely in dense bumper-to-bumper city traffic.',
      'Learning in a Manual car allows you to easily drive both Manual and Automatic cars with zero learning curve.',
      'Modern CVTs and Torque Converters achieve virtually identical fuel economy compared to manual gearboxes in city commuting.',
    ],
    sections: [
      {
        heading: 'Why Learn Manual in India?',
        content: 'Learning on a manual gearbox gives you total mastery over vehicle mechanics. You gain an intuitive feel for engine torque, friction points, and emergency engine braking. Once you master a manual, switching to an automatic takes less than 10 minutes.',
      },
      {
        heading: 'Why Choose Automatic for Daily Commuting?',
        content: 'If 90% of your driving involves rush-hour city traffic with 15–20 km/h average speeds, an automatic saves you thousands of clutch depressions every single week, dramatically reducing knee and back strain.',
      },
    ],
  },
];
