import { useState } from 'react';
import { useStore } from '../store/store';
import { Target, Plus, Sparkles, Users, Calendar, Trash2, X, Brain, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import type { Segment, SegmentRule } from '../types';

const fieldOptions = [
  { value: 'totalSpent', label: 'Total Spent' },
  { value: 'orderCount', label: 'Order Count' },
  { value: 'engagementScore', label: 'Engagement Score' },
  { value: 'averageOrderValue', label: 'Avg Order Value' },
  { value: 'emailOpenedCount', label: 'Emails Opened' },
  { value: 'emailClickedCount', label: 'Emails Clicked' },
  { value: 'status', label: 'Status' },
  { value: 'source', label: 'Source' },
];

const operatorOptions = ['>', '<', '>=', '<=', '=', '!=', 'contains'];

const aiSuggestions = [
  { name: 'Ready to Upgrade', desc: 'Customers showing buying patterns that suggest they\'re ready for premium products', rules: [{ field: 'orderCount', operator: '>', value: 5 }, { field: 'engagementScore', operator: '>', value: 60 }], reasoning: 'Multiple purchases combined with high engagement indicates strong brand affinity and readiness for upsell.' },
  { name: 'Seasonal Buyers', desc: 'Customers who primarily purchase during sales events', rules: [{ field: 'orderCount', operator: '>', value: 2 }, { field: 'averageOrderValue', operator: '<', value: 500 }], reasoning: 'Purchase history suggests price-sensitive customers who respond well to promotional campaigns.' },
  { name: 'Brand Champions', desc: 'Your most loyal and engaged customers who are likely to refer others', rules: [{ field: 'engagementScore', operator: '>', value: 85 }, { field: 'totalSpent', operator: '>', value: 10000 }], reasoning: 'Top-tier engagement plus significant spending makes these ideal candidates for referral programs.' },
];

function CreateSegmentModal({ onClose }: { onClose: () => void }) {
  const { addSegment } = useStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState<SegmentRule[]>([{ field: 'totalSpent', operator: '>', value: 0 }]);
  const [showAI, setShowAI] = useState(false);

  const addRule = () => {
    setRules([...rules, { field: 'orderCount', operator: '>', value: 0 }]);
  };

  const removeRule = (idx: number) => {
    setRules(rules.filter((_, i) => i !== idx));
  };

  const updateRule = (idx: number, updates: Partial<SegmentRule>) => {
    setRules(rules.map((r, i) => i === idx ? { ...r, ...updates } : r));
  };

  const handleCreate = () => {
    if (!name) return;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const seg: Segment = {
      id: `s_${Date.now()}`,
      name,
      description,
      rules,
      aiGenerated: false,
      customerCount: Math.floor(Math.random() * 500) + 50,
      lastCalculated: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0],
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    addSegment(seg);
    onClose();
  };

  const applySuggestion = (suggestion: typeof aiSuggestions[0]) => {
    setName(suggestion.name);
    setDescription(suggestion.desc);
    setRules(suggestion.rules);
    setShowAI(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Create Segment</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6">
          {/* AI Suggestions Toggle */}
          <button
            onClick={() => setShowAI(!showAI)}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:border-indigo-200 transition-colors"
          >
            <Brain size={20} className="text-indigo-600" />
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-indigo-900">AI Segment Suggestions</p>
              <p className="text-xs text-indigo-600">Let AI analyze your customer data and suggest optimal segments</p>
            </div>
            <ChevronRight size={16} className={cn("text-indigo-400 transition-transform", showAI && "rotate-90")} />
          </button>

          {showAI && (
            <div className="space-y-3 animate-fadeIn">
              {aiSuggestions.map((s) => (
                <button
                  key={s.name}
                  onClick={() => applySuggestion(s)}
                  className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-indigo-600" />
                    <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                  </div>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                  <p className="text-xs text-indigo-600 mt-2 italic">"{s.reasoning}"</p>
                </button>
              ))}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-700">Segment Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. High-Value Customers"
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe this segment..."
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">Rules</label>
              <button onClick={addRule} className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                <Plus size={12} /> Add Rule
              </button>
            </div>
            <div className="space-y-3">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-xs text-slate-400 font-medium w-8">AND</span>}
                  {idx === 0 && <span className="w-8" />}
                  <select
                    value={rule.field}
                    onChange={e => updateRule(idx, { field: e.target.value })}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {fieldOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                  <select
                    value={rule.operator}
                    onChange={e => updateRule(idx, { operator: e.target.value })}
                    className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {operatorOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <input
                    value={rule.value}
                    onChange={e => updateRule(idx, { value: e.target.value })}
                    className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Value"
                  />
                  {rules.length > 1 && (
                    <button onClick={() => removeRule(idx)} className="text-slate-300 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
              Create Segment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Segments() {
  const { segments, deleteSegment } = useStore();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Segments</h1>
          <p className="text-sm text-slate-500 mt-1">{segments.length} active segments</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Create Segment
        </button>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4 flex items-start gap-3">
        <Sparkles size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-purple-900">AI Segmentation Active</p>
          <p className="text-xs text-purple-700 mt-0.5">
            AI has identified 3 new potential segments based on recent customer behavior patterns. 
            Click "Create Segment" and check AI suggestions.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segments.map((seg) => (
          <div key={seg.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: seg.color + '15' }}>
                  <Target size={18} style={{ color: seg.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    {seg.name}
                    {seg.aiGenerated && <Sparkles size={12} className="text-indigo-500" />}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{seg.description}</p>
                </div>
              </div>
              <button
                onClick={() => deleteSegment(seg.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users size={12} />
                <span className="font-medium text-slate-700">{seg.customerCount.toLocaleString()}</span> contacts
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar size={12} />
                Updated {seg.lastCalculated.split('T')[0]}
              </div>
            </div>

            <div className="space-y-1.5 mb-4">
              {seg.rules.slice(0, 2).map((rule, idx) => (
                <div key={idx} className="text-[11px] px-2 py-1 bg-slate-50 rounded text-slate-600">
                  <span className="font-medium">{fieldOptions.find(f => f.value === rule.field)?.label || rule.field}</span>
                  {' '}<span className="text-indigo-600">{rule.operator}</span>{' '}
                  <span className="font-medium">{rule.value}</span>
                </div>
              ))}
              {seg.rules.length > 2 && (
                <p className="text-[10px] text-slate-400 pl-2">+{seg.rules.length - 2} more rules</p>
              )}
            </div>

            {seg.aiReasoning && (
              <div className="bg-indigo-50/50 rounded-lg p-2.5 mb-3">
                <p className="text-[10px] text-indigo-600 font-medium mb-0.5">🤖 AI Reasoning</p>
                <p className="text-[10px] text-indigo-700 leading-relaxed line-clamp-2">{seg.aiReasoning}</p>
              </div>
            )}

            <button className="w-full text-xs text-indigo-600 font-medium py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
              View Contacts →
            </button>
          </div>
        ))}
      </div>

      {showCreate && <CreateSegmentModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
