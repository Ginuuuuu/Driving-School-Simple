# 🚗 DriveCraft Motor Academy — Official Website & Content Architecture

> **Master Every Mile with Confidence & Safety**  
> India's premier certified driving academy featuring 100% dual-control safety training, patient certified mentors, automated RTO test-track preparation, and personalized doorstep lessons.

---

## 🌟 Key Features & Architectural Highlights

### 1. Brand Identity & Visual Design System
- **Brand Name**: **DriveCraft Motor Academy**
- **Tagline**: *Master Every Mile with Confidence & Safety*
- **Visual Direction**: Bright, clean, friendly, modern, and trustworthy. Built with crisp white surfaces, high-contrast midnight slate (`#0F172A`), vibrant green signal emerald (`#10B981`), and warm road amber (`#F59E0B`) highlights.
- **Typography Pairing**: `Outfit` for bold, confident headings and `Plus Jakarta Sans` for clean, legible body text.

### 2. Signature Serpentine Licence Roadmap
- Inspired by modern winding journey infographics.
- **Serpentine Road Ribbon**: Visual S-shaped winding route with milestone stages:
  1. `1. APPLY & E-KYC` — Parivahan Sarathi online Form 2 registration
  2. `2. THEORY LL TEST` — Road signs and traffic regulations exam (Form 3 Learner's Licence)
  3. `3. DUAL-CONTROL LESSONS` — 1-on-1 dual-pedal practical driving training
  4. `4. 30-DAY PRACTICE GAP` — Mandatory legal period & tight parking master drills
  5. `5. AUTOMATED RTO TEST` — Camera-monitored sensor tracks (Figure "8", "H" Box, Parallel, Gradient)
  6. `6. SMART CARD DL LAUNCH` — Speed Post dispatch & DigiLocker instant digital access
- **Interactive Inspection**: Clicking any milestone opens full official document checklists, test track rules, and instructor pro-tips.

### 3. Streamlined Minimal Homepage
- Focused strictly on conversion and clear UX hierarchy:
  - High-impact **Hero Section** with primary CTA (*Book a Driving Lesson*) and secondary CTA (*WhatsApp Us*).
  - **Trust Metrics Bar** (14,800+ students, 98.4% pass rate, certified mentors, doorstep pickup).
  - **The 3 Pillars of DriveCraft Method**.
  - **Top 3 Featured Courses** with links to the full catalog.
  - **Interactive Serpentine Roadmap Teaser**.
  - **Student Reviews Spotlight**.
  - **High-Conversion WhatsApp / Booking Banner**.
- Deep content (all 6 courses, full 20+ FAQ repository, instructor directory, pricing comparison matrices, and branch locators) is cleanly housed in their dedicated standalone pages.

### 4. Interactive Booking Studio & WhatsApp Redirect Engine
- Validates student details (Full Name, 10-digit Indian mobile format, City, Doorstep Area, Course, Transmission, Time Slot, and Experience level).
- Shows celebratory confirmation review card.
- Automatically generates pre-formatted, safely encoded WhatsApp messages sent directly to the admissions desk (`https://wa.me/919876543210?text=...`).
- Includes fallback "Copy Text" and direct phone call options.

### 5. Centralized Content Architecture & Admin CMS
- **Zero-Database Requirement**: All site data is centralized in structured files under `src/content/`:
  - `siteConfig.ts` — Brand identity, phone, WhatsApp number, email, branches.
  - `courses.ts` — 6 structured course programs with session-by-session syllabi.
  - `roadmap.ts` — 6 sequential milestones for the Indian DL journey.
  - `instructors.ts` — Certified instructor profiles, languages, badges.
  - `pricing.ts` — Pricing tiers, inclusions, and add-on services.
  - `testimonials.ts` — Authentic learner reviews and ratings.
  - `faqs.ts` — 20+ categorized questions and answers.
  - `resources.ts` — Educational road safety & parking guides.
  - `about.ts`, `legal.ts`, `errors.ts`.
- **Admin Management Suite (`/admin/*`)**:
  - Secure passphrase gateway (`/admin/login` — demo passphrase: `drivecraft2024` or `admin123`).
  - Real-time reactive editing of all content.
  - **Export JSON Config**: Generates and downloads `drivecraft-content-export.json` to commit back to the code repository permanently.
  - **Import JSON Config**: Restores and loads customized schemas.
  - **Reset to Factory Defaults**: Restores hardcoded defaults.

---

## 🗺️ Complete Page Sitemap

### Public Pages
1. `/` — **Home**: Clean, minimal conversion hub.
2. `/about` — **About Us**: Mission, vision, 5-point safety pledge, fleet standards.
3. `/courses` — **Courses Index**: Filterable catalog by category and transmission.
4. `/courses/:slug` — **Course Detail**: Deep-dive session syllabus, outcomes, prerequisites, and FAQs.
5. `/roadmap` — **Signature Licence Roadmap**: Complete interactive RTO guide and checklists.
6. `/instructors` — **Instructors Roster**: Filter by language, transmission, and experience.
7. `/pricing` — **Pricing & Packages**: Transparent package rates, comparison table, add-ons.
8. `/testimonials` — **Student Reviews**: Learner stories filtered by category tags.
9. `/resources` — **Driving Guides**: Road signs glossary, parallel parking formula, test secrets.
10. `/resources/:slug` — **Guide Detail**: Full-length educational article.
11. `/faq` — **FAQ Hub**: Searchable and categorized 20+ questions.
12. `/contact` — **Contact & Branches**: Branch locations, hours, doorstep radius, and form.
13. `/book` — **Lesson Booking Studio**: Dedicated full-page booking generator.
14. `/privacy` — **Privacy Policy**: DPDP Act compliant privacy terms.
15. `/terms` — **Terms & Conditions**: Rescheduling and dual-control liability terms.

### Error & System Screens
16. `/404` — **Wrong Turn Detour**: Designed 404 recovery page.
17. `/403` — **Restricted Driving Zone**: 403 Forbidden page.
18. `/500` — **Engine Stall**: 500 Server error page with reload button.
19. `/503` — **Pit Stop**: 503 Maintenance page.
20. `/offline` — **Off the Grid**: Network loss recovery page.

### Admin Suite
- `/admin/login` — Administrative login portal
- `/admin/dashboard` — Content metrics, JSON export/import, audit status
- `/admin/settings` — General brand, phone, WhatsApp settings
- `/admin/homepage` — Homepage trust statistics editor
- `/admin/courses` — Add/edit/delete courses & syllabus
- `/admin/roadmap` — Edit RTO milestones and document checklists
- `/admin/instructors` — Manage instructor roster & photos
- `/admin/pricing` — Manage package pricing and rates
- `/admin/testimonials` — Manage student reviews
- `/admin/faqs` — Manage categorized FAQs
- `/admin/contact` — Manage branch addresses
- `/admin/seo` — Manage OpenGraph and title templates
- `/admin/legal` — Manage privacy & terms timestamps
- `/admin/errors` — Manage error messaging templates

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v3 with custom design tokens (`brand`, `safety`, `signal`)
- **Routing**: `react-router-dom` v7 with dynamic code splitting (`React.lazy` + `Suspense`)
- **Motion & Interactions**: `framer-motion` for smooth road transitions & gauge animation
- **Icons**: `lucide-react`
- **Celebration Feedback**: `canvas-confetti`
- **Hosting Target**: **Vercel** (`vercel.json` SPA rewrite rules and security headers included)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🔑 Admin Credentials (Demo)

- **Login URL**: `http://localhost:4173/admin/login`
- **Passphrase**: `drivecraft2024` (or `admin123`)

---

## 📦 Deployment to Vercel

The project is completely pre-configured for instant zero-configuration deployment to Vercel:
1. Push repository to GitHub.
2. Import repository in Vercel Dashboard.
3. Vercel automatically detects Vite framework preset (`npm run build`, output directory `dist`).
4. `vercel.json` handles client-side SPA routing rewrites for all routes (`/*` -> `index.html`).

---

*© 2026 DriveCraft Motor Academy. All rights reserved.*
