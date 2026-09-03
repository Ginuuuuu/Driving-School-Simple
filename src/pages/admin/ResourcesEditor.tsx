import React, { useState } from 'react';
import {
  Save,
  BookOpen,
  Plus,
  Trash2,
  FileText,
  Clock,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { ResourceGuide } from '../../types';

export const ResourcesEditor: React.FC = () => {
  const { siteData, updateResources } = useContent();
  const { resources } = siteData;

  const [articles, setArticles] = useState<ResourceGuide[]>([...resources]);
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);

  const activeArticle = articles[activeArticleIndex] || articles[0];

  const handleArticleChange = (field: keyof ResourceGuide, val: any) => {
    const updated = [...articles];
    updated[activeArticleIndex] = { ...updated[activeArticleIndex], [field]: val };
    setArticles(updated);
  };

  const handleTakeawayChange = (index: number, val: string) => {
    const updatedTakeaways = [...activeArticle.keyTakeaways];
    updatedTakeaways[index] = val;
    handleArticleChange('keyTakeaways', updatedTakeaways);
  };

  const addTakeaway = () => {
    handleArticleChange('keyTakeaways', [...activeArticle.keyTakeaways, 'Key takeaway rule for students']);
  };

  const removeTakeaway = (index: number) => {
    handleArticleChange(
      'keyTakeaways',
      activeArticle.keyTakeaways.filter((_, i) => i !== index)
    );
  };

  const handleSectionChange = (index: number, field: 'heading' | 'content', val: string) => {
    const updatedSections = [...activeArticle.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: val };
    handleArticleChange('sections', updatedSections);
  };

  const addSection = () => {
    handleArticleChange('sections', [
      ...activeArticle.sections,
      { heading: 'New Article Section', content: 'Detailed guide content...' },
    ]);
  };

  const removeSection = (index: number) => {
    handleArticleChange(
      'sections',
      activeArticle.sections.filter((_, i) => i !== index)
    );
  };

  const addNewArticle = () => {
    const newArt: ResourceGuide = {
      id: `res-${Date.now()}`,
      slug: `new-driving-guide-${Date.now().toString().slice(-4)}`,
      title: 'New Driving & RTO Guide',
      category: 'Driving Technique',
      readTimeMinutes: 5,
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      summary: 'Brief overview summary of this driving guide.',
      keyTakeaways: ['Always observe 3-second gap rule.'],
      sections: [{ heading: '1. Overview and Core Concept', content: 'Detailed instructional content...' }],
    };
    const next = [...articles, newArt];
    setArticles(next);
    setActiveArticleIndex(next.length - 1);
  };

  const deleteArticle = (index: number) => {
    if (articles.length <= 1) return;
    const next = articles.filter((_, i) => i !== index);
    setArticles(next);
    setActiveArticleIndex(Math.max(0, index - 1));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateResources(articles);
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <SEO title="Resources & Guides Editor | Admin Panel" />

      {/* Header with Title and Global Save CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Page Content Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Resources & Learning Guides
          </h2>
          <p className="text-xs text-slate-500">
            Create and edit RTO test prep guides, road signs tutorials, and technical driving articles.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="primary" size="md" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save All Articles
          </Button>
        </div>
      </div>

      {/* Article Selector Carousel Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {articles.map((art, idx) => (
            <button
              key={art.id}
              onClick={() => setActiveArticleIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeArticleIndex === idx
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[150px] sm:max-w-[200px]">{art.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={addNewArticle}
          className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center gap-1 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" /> New Guide
        </button>
      </div>

      {/* Active Article Form */}
      {activeArticle && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                {activeArticle.category} • {activeArticle.readTimeMinutes} Min Read
              </span>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                {activeArticle.title}
              </h3>
            </div>

            {articles.length > 1 && (
              <button
                type="button"
                onClick={() => deleteArticle(activeArticleIndex)}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 p-2 rounded-xl hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Delete Article
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Title
              </label>
              <input
                type="text"
                value={activeArticle.title}
                onChange={(e) => handleArticleChange('title', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={activeArticle.category}
                onChange={(e) => handleArticleChange('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="Road Signs">Road Signs</option>
                <option value="RTO Test">RTO Test</option>
                <option value="Driving Technique">Driving Technique</option>
                <option value="Car Maintenance">Car Maintenance</option>
                <option value="Safety">Safety</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                value={activeArticle.slug}
                onChange={(e) => handleArticleChange('slug', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Read Time (Minutes)
              </label>
              <input
                type="number"
                value={activeArticle.readTimeMinutes}
                onChange={(e) => handleArticleChange('readTimeMinutes', parseInt(e.target.value) || 5)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Publish Date
              </label>
              <input
                type="text"
                value={activeArticle.publishDate}
                onChange={(e) => handleArticleChange('publishDate', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Summary & Lead Paragraph
              </label>
              <textarea
                rows={3}
                value={activeArticle.summary}
                onChange={(e) => handleArticleChange('summary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Key Takeaways Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Key Takeaway Bullets
              </label>
              <button
                type="button"
                onClick={addTakeaway}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Bullet
              </button>
            </div>

            <div className="space-y-2">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={takeaway}
                    onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => removeTakeaway(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Article Sections */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Article Content Sections ({activeArticle.sections.length})
              </label>
              <button
                type="button"
                onClick={addSection}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>

            <div className="space-y-4">
              {activeArticle.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase">SECTION #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                      Section Body Content
                    </label>
                    <textarea
                      rows={4}
                      value={sec.content}
                      onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Guide Changes
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
