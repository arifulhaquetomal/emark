import { useState } from 'react';
import { useStore } from '../store/store';
import { Eye, Copy, Search, Star, X } from 'lucide-react';
import { cn } from '../utils/cn';
import type { Template } from '../types';

const categories = ['All', 'welcome', 'promotional', 'newsletter', 'transactional', 'nurture'];

function TemplatePreview({ template, onClose }: { template: Template; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{template.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{template.description}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-6">
          <div className="bg-slate-50 rounded-lg p-3 mb-4 text-xs space-y-1">
            <p className="text-slate-500">Subject: <span className="text-slate-900 font-medium">{template.subjectLine}</span></p>
            <p className="text-slate-500">Preview: <span className="text-slate-900">{template.previewText}</span></p>
            <p className="text-slate-500">Category: <span className="text-slate-900 capitalize">{template.category}</span></p>
            <p className="text-slate-500">Used: <span className="text-slate-900">{template.useCount} times</span></p>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="p-4">
              <div dangerouslySetInnerHTML={{ __html: template.emailHtml }} />
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <button className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2">
            <Copy size={14} /> Duplicate
          </button>
          <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
}

export function Templates() {
  const { templates } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filtered = templates.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryColors: Record<string, string> = {
    welcome: 'bg-green-100 text-green-700',
    promotional: 'bg-orange-100 text-orange-700',
    newsletter: 'bg-purple-100 text-purple-700',
    transactional: 'bg-blue-100 text-blue-700',
    nurture: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Email Templates</h1>
          <p className="text-sm text-slate-500 mt-1">{templates.length} templates available</p>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                selectedCategory === c
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((template) => (
          <div key={template.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
            onClick={() => setPreviewTemplate(template)}>
            {/* Preview */}
            <div className="h-48 bg-slate-50 overflow-hidden relative border-b border-slate-100">
              <div className="transform scale-[0.4] origin-top-left w-[250%] pointer-events-none p-4">
                <div dangerouslySetInnerHTML={{ __html: template.emailHtml }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <span className="bg-white text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1.5">
                  <Eye size={14} /> Preview
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{template.thumbnail}</span>
                  <h3 className="text-sm font-semibold text-slate-900">{template.name}</h3>
                </div>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", categoryColors[template.category] || 'bg-slate-100 text-slate-600')}>
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{template.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-slate-600 font-medium">{template.useCount}</span> uses
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    onClick={e => { e.stopPropagation(); }}>
                    <Copy size={14} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    onClick={e => { e.stopPropagation(); setPreviewTemplate(template); }}>
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewTemplate && <TemplatePreview template={previewTemplate} onClose={() => setPreviewTemplate(null)} />}
    </div>
  );
}
