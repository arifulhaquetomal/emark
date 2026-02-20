import { useState } from 'react';
import { useStore } from '../store/store';
import type { Campaign } from '../types';
import {
  ArrowLeft, Sparkles, Send, Eye, Wand2, Copy, RefreshCw,
  Check, AlertCircle, Loader2, Palette, Type, Image, Link,
  ChevronDown, X, Split
} from 'lucide-react';
import { cn } from '../utils/cn';

const campaignTypes = [
  { value: 'promotional', label: 'Promotional', desc: 'Sales, discounts, product launches', emoji: '🔥' },
  { value: 'newsletter', label: 'Newsletter', desc: 'Weekly/monthly updates', emoji: '📬' },
  { value: 'welcome', label: 'Welcome', desc: 'Onboarding new subscribers', emoji: '👋' },
  { value: 'nurture', label: 'Nurture', desc: 'Lead nurturing sequences', emoji: '🌱' },
  { value: 'abandoned_cart', label: 'Abandoned Cart', desc: 'Cart recovery emails', emoji: '🛒' },
];

const toneOptions = ['Professional', 'Casual', 'Urgent', 'Friendly', 'Humorous', 'Inspirational'];

const aiGeneratedEmails = [
  {
    subject: "🚀 Exclusive: Your Early Access Pass is Here",
    preview: "Be the first to experience our latest innovation",
    body: `<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
<div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px;text-align:center;border-radius:16px 16px 0 0;">
<h1 style="color:white;margin:0;font-size:28px;">🚀 You're In!</h1>
<p style="color:rgba(255,255,255,0.9);margin-top:8px;font-size:16px;">Early access just for you</p>
</div>
<div style="padding:32px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;">
<p style="color:#374151;font-size:15px;line-height:1.6;">Hi {{first_name}},</p>
<p style="color:#374151;font-size:15px;line-height:1.6;">We've been working on something incredible, and as one of our most valued customers, you get first access.</p>
<p style="color:#374151;font-size:15px;line-height:1.6;">Our newest features are designed to save you hours every week and boost your results by up to 3x.</p>
<div style="text-align:center;margin:32px 0;">
<a href="#" style="display:inline-block;background:#6366f1;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">Get Early Access →</a>
</div>
<p style="color:#6b7280;font-size:13px;line-height:1.6;">This exclusive offer expires in 48 hours. Don't miss out!</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
<p style="color:#9ca3af;font-size:12px;">You're receiving this because you're awesome. Unsubscribe anytime.</p>
</div></div>`
  },
  {
    subject: "Don't Miss Out — 30% Off Ends Tonight ⏰",
    preview: "Your exclusive discount is about to expire",
    body: `<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
<div style="background:linear-gradient(135deg,#ef4444,#f97316);padding:40px;text-align:center;border-radius:16px 16px 0 0;">
<h1 style="color:white;margin:0;font-size:32px;">⏰ LAST CHANCE</h1>
<p style="color:rgba(255,255,255,0.95);margin-top:8px;font-size:48px;font-weight:bold;">30% OFF</p>
</div>
<div style="padding:32px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;">
<p style="color:#374151;font-size:15px;line-height:1.6;">Hey {{first_name}},</p>
<p style="color:#374151;font-size:15px;line-height:1.6;">This is it — your 30% discount expires <strong>tonight at midnight</strong>.</p>
<p style="color:#374151;font-size:15px;line-height:1.6;">Use code <strong style="color:#ef4444;">SAVE30</strong> at checkout.</p>
<div style="text-align:center;margin:32px 0;">
<a href="#" style="display:inline-block;background:#ef4444;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">Shop Now & Save 30% →</a>
</div>
</div></div>`
  },
];

export function CampaignCreate() {
  const { setCurrentPage, addCampaign, segments, templates } = useStore();
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState('promotional');
  const [name, setName] = useState('');
  const [segmentId, setSegmentId] = useState('');
  const [fromName, setFromName] = useState('EmailAI Pro');
  const [fromEmail, setFromEmail] = useState('marketing@emailaipro.com');
  const [subjectLine, setSubjectLine] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [emailHtml, setEmailHtml] = useState('');
  const [tone, setTone] = useState('Professional');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdx, setGeneratedIdx] = useState(-1);
  const [isAbTest, setIsAbTest] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [templateId, setTemplateId] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * aiGeneratedEmails.length);
      const email = aiGeneratedEmails[idx];
      setSubjectLine(email.subject);
      setPreviewText(email.preview);
      setEmailHtml(email.body);
      setGeneratedIdx(idx);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const nextIdx = (generatedIdx + 1) % aiGeneratedEmails.length;
      const email = aiGeneratedEmails[nextIdx];
      setSubjectLine(email.subject);
      setPreviewText(email.preview);
      setEmailHtml(email.body);
      setGeneratedIdx(nextIdx);
      setIsGenerating(false);
    }, 1500);
  };

  const applyTemplate = (tId: string) => {
    setTemplateId(tId);
    const template = templates.find(t => t.id === tId);
    if (template) {
      setSubjectLine(template.subjectLine);
      setPreviewText(template.previewText);
      setEmailHtml(template.emailHtml);
    }
  };

  const handleCreate = () => {
    const seg = segments.find(s => s.id === segmentId);
    const campaign: Campaign = {
      id: `camp_${Date.now()}`,
      name: name || 'Untitled Campaign',
      description: aiPrompt || '',
      type: campaignType as Campaign['type'],
      subjectLine: subjectLine || 'No subject',
      previewText,
      fromName,
      fromEmail,
      emailHtml: emailHtml || '<p>No content</p>',
      aiGenerated: generatedIdx >= 0,
      segmentId: segmentId || undefined,
      segmentName: seg?.name,
      isAbTest,
      abVariants: isAbTest ? [
        { id: 'va', name: 'Variant A', subjectLine, percentage: 50, openRate: 0, clickRate: 0 },
        { id: 'vb', name: 'Variant B', subjectLine: subjectLine + ' (Alt)', percentage: 50, openRate: 0, clickRate: 0 },
      ] : undefined,
      status: 'draft',
      recipientsCount: seg?.customerCount || 0,
      sentCount: 0, deliveredCount: 0, openedCount: 0, clickedCount: 0,
      bouncedCount: 0, unsubscribedCount: 0, openRate: 0, clickRate: 0,
      revenueGenerated: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    addCampaign(campaign);
    setCurrentPage('campaigns');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setCurrentPage('campaigns')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Campaign</h1>
          <p className="text-sm text-slate-500 mt-0.5">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors",
              step >= s ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
            )}>
              {step > s ? <Check size={14} /> : s}
            </div>
            <span className={cn("text-xs font-medium", step >= s ? "text-indigo-600" : "text-slate-400")}>
              {s === 1 ? 'Setup' : s === 2 ? 'Content' : 'Review'}
            </span>
            {s < 3 && <div className={cn("flex-1 h-0.5 rounded", step > s ? "bg-indigo-600" : "bg-slate-200")} />}
          </div>
        ))}
      </div>

      {/* Step 1: Setup */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Campaign Type</h2>
            <div className="grid grid-cols-5 gap-3">
              {campaignTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setCampaignType(t.value)}
                  className={cn(
                    "p-4 rounded-xl border text-center transition-all",
                    campaignType === t.value
                      ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-200"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span className="text-2xl mb-2 block">{t.emoji}</span>
                  <p className="text-xs font-semibold text-slate-900">{t.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Details</h2>
            <div>
              <label className="text-sm font-medium text-slate-700">Campaign Name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. January Flash Sale"
                className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">From Name</label>
                <input value={fromName} onChange={e => setFromName(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">From Email</label>
                <input value={fromEmail} onChange={e => setFromEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Target Segment</label>
              <select value={segmentId} onChange={e => setSegmentId(e.target.value)}
                className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All contacts</option>
                {segments.map(s => <option key={s.id} value={s.id}>{s.name} ({s.customerCount} contacts)</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => setStep(2)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Content */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* AI Generator */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} />
              <h2 className="text-base font-semibold">AI Email Generator</h2>
            </div>
            <p className="text-sm text-white/80 mb-4">Describe what you want and AI will write a high-converting email for you.</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <textarea
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder="e.g. Write a promotional email announcing our 30% off flash sale for VIP customers. Include urgency and a clear CTA."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 h-20 resize-none"
                />
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs text-white/60">Tone:</span>
                  {toneOptions.map(t => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={cn(
                        "text-[10px] px-2 py-1 rounded-full transition-colors",
                        tone === t ? "bg-white text-indigo-700 font-medium" : "bg-white/10 text-white/70 hover:bg-white/20"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold text-sm hover:bg-white/90 disabled:opacity-60 flex items-center gap-2 self-start"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>

          {/* Or use template */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-900">Or Start from Template</h2>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {templates.slice(0, 3).map(t => (
                <button
                  key={t.id}
                  onClick={() => applyTemplate(t.id)}
                  className={cn(
                    "p-3 rounded-lg border text-left transition-all",
                    templateId === t.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <span className="text-xl">{t.thumbnail}</span>
                  <p className="text-xs font-medium text-slate-900 mt-1">{t.name}</p>
                  <p className="text-[10px] text-slate-500">{t.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Email Content */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Email Content</h2>
              <div className="flex items-center gap-2">
                {emailHtml && (
                  <button onClick={handleRegenerate} disabled={isGenerating}
                    className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700">
                    <RefreshCw size={12} className={isGenerating ? 'animate-spin' : ''} /> Regenerate
                  </button>
                )}
                <button onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700">
                  <Eye size={12} /> Preview
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Subject Line</label>
              <input value={subjectLine} onChange={e => setSubjectLine(e.target.value)}
                placeholder="Enter or generate a subject line"
                className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Preview Text</label>
              <input value={previewText} onChange={e => setPreviewText(e.target.value)}
                placeholder="Text shown in inbox preview"
                className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-lg">
              {[
                { icon: <Type size={14} />, label: 'Text' },
                { icon: <Image size={14} />, label: 'Image' },
                { icon: <Link size={14} />, label: 'Link' },
                { icon: <Palette size={14} />, label: 'Style' },
              ].map(t => (
                <button key={t.label} className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 hover:bg-white hover:text-slate-900 rounded transition-colors">
                  {t.icon} {t.label}
                </button>
              ))}
              <div className="flex-1" />
              <div className="flex items-center gap-1 text-xs text-slate-400 pr-2">
                <span className="flex items-center gap-0.5"><Copy size={10} /> Tokens:</span>
                {['{{first_name}}', '{{company}}'].map(token => (
                  <button key={token} onClick={() => setEmailHtml(prev => prev + token)}
                    className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-medium hover:bg-indigo-200">
                    {token}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">HTML Source</label>
                <textarea
                  value={emailHtml}
                  onChange={e => setEmailHtml(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 h-64 resize-none bg-slate-50"
                  placeholder="<h1>Your email content...</h1>"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Preview</label>
                <div className="border border-slate-200 rounded-lg h-64 overflow-auto bg-white p-3">
                  {emailHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 text-sm">
                      <div className="text-center">
                        <Eye size={24} className="mx-auto mb-2" />
                        <p>Email preview will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* A/B Test Toggle */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <Split size={18} className="text-indigo-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">A/B Testing</p>
                <p className="text-xs text-slate-500">Test different subject lines to find the best performer</p>
              </div>
              <button
                onClick={() => setIsAbTest(!isAbTest)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  isAbTest ? "bg-indigo-600" : "bg-slate-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                  isAbTest ? "left-6" : "left-0.5"
                )} />
              </button>
            </div>

            {isAbTest && (
              <div className="border border-indigo-100 rounded-lg p-4 bg-indigo-50/50 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={14} className="text-indigo-600" />
                  <p className="text-xs text-indigo-700 font-medium">AI will automatically determine the winner based on open rates</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Variant A (Original)</label>
                  <input value={subjectLine} readOnly className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white/70" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Variant B</label>
                  <input defaultValue={subjectLine ? subjectLine + ' (Alternative)' : ''}
                    className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter alternative subject line" />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              ← Back
            </button>
            <button onClick={() => setStep(3)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Campaign Review</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Campaign Name</p>
                  <p className="text-sm font-medium text-slate-900">{name || 'Untitled Campaign'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Type</p>
                  <p className="text-sm font-medium text-slate-900 capitalize">{campaignType}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">From</p>
                  <p className="text-sm font-medium text-slate-900">{fromName} &lt;{fromEmail}&gt;</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Target Segment</p>
                  <p className="text-sm font-medium text-slate-900">
                    {segments.find(s => s.id === segmentId)?.name || 'All contacts'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">A/B Testing</p>
                  <p className="text-sm font-medium text-slate-900">{isAbTest ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Subject Line</p>
                  <p className="text-sm font-medium text-slate-900">{subjectLine || 'No subject'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Preview Text</p>
                  <p className="text-sm text-slate-600">{previewText || 'None'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">AI Generated</p>
                  <p className="text-sm font-medium text-slate-900 flex items-center gap-1">
                    {generatedIdx >= 0 ? <><Sparkles size={12} className="text-indigo-500" /> Yes</> : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-slate-400">Email Preview</span>
            </div>
            <div className="p-6">
              <div className="max-w-lg mx-auto">
                {emailHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
                ) : (
                  <p className="text-center text-slate-400 py-12">No email content</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              ← Back
            </button>
            <div className="flex gap-3">
              <button onClick={handleCreate} className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                Save as Draft
              </button>
              <button onClick={handleCreate} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                <Send size={14} /> Schedule & Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-sm">Email Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-4">
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-xs">
                <p className="text-slate-500">Subject: <span className="text-slate-900 font-medium">{subjectLine}</span></p>
                <p className="text-slate-500 mt-1">From: <span className="text-slate-900">{fromName} &lt;{fromEmail}&gt;</span></p>
              </div>
              {emailHtml ? (
                <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
              ) : (
                <p className="text-center text-slate-400 py-8">No content yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
