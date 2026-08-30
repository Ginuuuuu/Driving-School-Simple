import React from 'react';
import { useParams, Link, Navigate, useOutletContext } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { siteData } = useContent();
  const { resources } = siteData;
  const { onOpenBooking } = useOutletContext<{ onOpenBooking: (courseSlug?: string) => void }>();

  const guide = resources.find((r) => r.slug === slug);

  if (!guide) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      <SEO
        title={guide.title}
        description={guide.summary}
        canonicalPath={`/resources/${guide.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Resources', to: '/resources' },
          { label: guide.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="emerald" size="sm">
            {guide.category}
          </Badge>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTimeMinutes} min read • Published {guide.publishDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed border-l-4 border-emerald-500 pl-4 py-1 italic bg-emerald-50/40 rounded-r-xl">
          {guide.summary}
        </p>
      </header>

      {/* Key Takeaways Box */}
      <section className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3">
        <h2 className="text-sm uppercase tracking-wider font-bold text-emerald-400">
          Key Takeaways & Golden Rules:
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
          {guide.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Article Body Sections */}
      <div className="space-y-8 text-slate-800 leading-relaxed">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* Booking CTA Callout */}
      <section className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
        <h3 className="text-xl font-bold font-display text-emerald-950">
          Want to Practice This with a Certified Mentor?
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
          Our dual-control cars and patient instructors help you apply these theories into muscle memory on real roads.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="md" onClick={() => onOpenBooking()}>
            Book a Practical Lesson
          </Button>
        </div>
      </section>
    </div>
  );
};
