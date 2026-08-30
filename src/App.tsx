import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { RouteLoading } from './components/common/RouteLoading';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';

// Public Pages (Lazy Loaded for Optimal Bundle Splitting)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Courses = lazy(() => import('./pages/Courses').then(m => ({ default: m.Courses })));
const CourseDetail = lazy(() => import('./pages/CourseDetail').then(m => ({ default: m.CourseDetail })));
const Roadmap = lazy(() => import('./pages/Roadmap').then(m => ({ default: m.Roadmap })));
const Instructors = lazy(() => import('./pages/Instructors').then(m => ({ default: m.Instructors })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const Testimonials = lazy(() => import('./pages/Testimonials').then(m => ({ default: m.Testimonials })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));
const ResourceDetail = lazy(() => import('./pages/ResourceDetail').then(m => ({ default: m.ResourceDetail })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Book = lazy(() => import('./pages/Book').then(m => ({ default: m.Book })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));

// System & Error Pages
const Error404 = lazy(() => import('./pages/errors/Error404').then(m => ({ default: m.Error404 })));
const Error403 = lazy(() => import('./pages/errors/Error403').then(m => ({ default: m.Error403 })));
const Error500 = lazy(() => import('./pages/errors/Error500').then(m => ({ default: m.Error500 })));
const Error503 = lazy(() => import('./pages/errors/Error503').then(m => ({ default: m.Error503 })));
const Offline = lazy(() => import('./pages/errors/Offline').then(m => ({ default: m.Offline })));

// Admin Suite Pages (Lazy loaded in separate bundle)
const AdminLayout = lazy(() => import('./layouts/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const SettingsEditor = lazy(() => import('./pages/admin/SettingsEditor').then(m => ({ default: m.SettingsEditor })));
const HomepageEditor = lazy(() => import('./pages/admin/HomepageEditor').then(m => ({ default: m.HomepageEditor })));
const CoursesEditor = lazy(() => import('./pages/admin/CoursesEditor').then(m => ({ default: m.CoursesEditor })));
const RoadmapEditor = lazy(() => import('./pages/admin/RoadmapEditor').then(m => ({ default: m.RoadmapEditor })));
const InstructorsEditor = lazy(() => import('./pages/admin/InstructorsEditor').then(m => ({ default: m.InstructorsEditor })));
const PricingEditor = lazy(() => import('./pages/admin/PricingEditor').then(m => ({ default: m.PricingEditor })));
const TestimonialsEditor = lazy(() => import('./pages/admin/TestimonialsEditor').then(m => ({ default: m.TestimonialsEditor })));
const FAQEditor = lazy(() => import('./pages/admin/FAQEditor').then(m => ({ default: m.FAQEditor })));
const ContactEditor = lazy(() => import('./pages/admin/ContactEditor').then(m => ({ default: m.ContactEditor })));
const SEOEditor = lazy(() => import('./pages/admin/SEOEditor').then(m => ({ default: m.SEOEditor })));
const LegalEditor = lazy(() => import('./pages/admin/LegalEditor').then(m => ({ default: m.LegalEditor })));
const ErrorsEditor = lazy(() => import('./pages/admin/ErrorsEditor').then(m => ({ default: m.ErrorsEditor })));

// Scroll to top helper on route transitions
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/:slug" element={<CourseDetail />} />
                  <Route path="roadmap" element={<Roadmap />} />
                  <Route path="instructors" element={<Instructors />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="resources/:slug" element={<ResourceDetail />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="book" element={<Book />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />

                  {/* Direct Error Pages */}
                  <Route path="404" element={<Error404 />} />
                  <Route path="403" element={<Error403 />} />
                  <Route path="500" element={<Error500 />} />
                  <Route path="503" element={<Error503 />} />
                  <Route path="offline" element={<Offline />} />

                  {/* Catch-all 404 */}
                  <Route path="*" element={<Error404 />} />
                </Route>

                {/* Admin Gateway */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin CMS Suite */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="settings" element={<SettingsEditor />} />
                  <Route path="homepage" element={<HomepageEditor />} />
                  <Route path="courses" element={<CoursesEditor />} />
                  <Route path="roadmap" element={<RoadmapEditor />} />
                  <Route path="instructors" element={<InstructorsEditor />} />
                  <Route path="pricing" element={<PricingEditor />} />
                  <Route path="testimonials" element={<TestimonialsEditor />} />
                  <Route path="faqs" element={<FAQEditor />} />
                  <Route path="contact" element={<ContactEditor />} />
                  <Route path="seo" element={<SEOEditor />} />
                  <Route path="legal" element={<LegalEditor />} />
                  <Route path="errors" element={<ErrorsEditor />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
