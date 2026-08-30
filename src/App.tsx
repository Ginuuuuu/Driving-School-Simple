import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { RouteLoading } from './components/common/RouteLoading';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';

// Public Pages (Direct imports for instant zero-blank first-click navigation)
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Roadmap } from './pages/Roadmap';
import { Instructors } from './pages/Instructors';
import { Pricing } from './pages/Pricing';
import { Testimonials } from './pages/Testimonials';
import { Resources } from './pages/Resources';
import { ResourceDetail } from './pages/ResourceDetail';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Book } from './pages/Book';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// System & Error Pages
import { Error404 } from './pages/errors/Error404';
import { Error403 } from './pages/errors/Error403';
import { Error500 } from './pages/errors/Error500';
import { Error503 } from './pages/errors/Error503';
import { Offline } from './pages/errors/Offline';

// Admin Suite Pages (Direct imports for instant zero-delay access)
import { AdminLayout } from './layouts/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { SettingsEditor } from './pages/admin/SettingsEditor';
import { HomepageEditor } from './pages/admin/HomepageEditor';
import { CoursesEditor } from './pages/admin/CoursesEditor';
import { RoadmapEditor } from './pages/admin/RoadmapEditor';
import { InstructorsEditor } from './pages/admin/InstructorsEditor';
import { PricingEditor } from './pages/admin/PricingEditor';
import { TestimonialsEditor } from './pages/admin/TestimonialsEditor';
import { FAQEditor } from './pages/admin/FAQEditor';
import { ContactEditor } from './pages/admin/ContactEditor';
import { SEOEditor } from './pages/admin/SEOEditor';
import { LegalEditor } from './pages/admin/LegalEditor';
import { ErrorsEditor } from './pages/admin/ErrorsEditor';

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
