import { useStore } from '../store/store';
import {
  Sparkles, Zap, Target, BarChart3, Send, Users, ArrowRight,
  CheckCircle2, Star, Shield, Globe, Cpu, Mail, TrendingUp
} from 'lucide-react';
import { cn } from '../utils/cn';

const features = [
  { icon: <Cpu className="w-6 h-6" />, title: 'AI Email Generation', desc: 'Generate high-converting emails in seconds with Llama 3.3 70B AI. Just describe your goal.', color: 'from-indigo-500 to-purple-600' },
  { icon: <Target className="w-6 h-6" />, title: 'Smart Segmentation', desc: 'AI analyzes your customer data and automatically creates high-performing segments.', color: 'from-emerald-500 to-teal-600' },
  { icon: <Zap className="w-6 h-6" />, title: 'A/B Testing', desc: 'Automatically test subject lines, content, and send times. AI picks the winner.', color: 'from-amber-500 to-orange-600' },
  { icon: <BarChart3 className="w-6 h-6" />, title: 'Real-time Analytics', desc: 'Track opens, clicks, conversions, and revenue. AI insights tell you what to do next.', color: 'from-blue-500 to-cyan-600' },
  { icon: <Send className="w-6 h-6" />, title: 'Multi-ESP Support', desc: 'Connect Mailchimp, SendGrid, or Amazon SES. Switch providers without losing data.', color: 'from-pink-500 to-rose-600' },
  { icon: <Users className="w-6 h-6" />, title: 'Personalization at Scale', desc: 'Dynamic content, merge tags, and AI-written personalized copy for every recipient.', color: 'from-violet-500 to-fuchsia-600' },
];

const stats = [
  { value: '38%', label: 'Avg Open Rate', sub: 'vs 21% industry avg' },
  { value: '12%', label: 'Avg Click Rate', sub: 'vs 2.6% industry avg' },
  { value: '4.2x', label: 'ROI Increase', sub: 'within first 90 days' },
  { value: '10K+', label: 'Businesses', sub: 'trust EmailAI Pro' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'VP Marketing, TechCorp', text: 'EmailAI Pro tripled our email revenue in 2 months. The AI-generated subject lines consistently outperform our manual ones.', avatar: 'SJ' },
  { name: 'Mike Chen', role: 'Founder, StartupXYZ', text: 'We went from spending 8 hours on emails to 20 minutes. The AI segmentation is incredibly accurate.', avatar: 'MC' },
  { name: 'Emma Wilson', role: 'CMO, DesignStudio', text: 'The A/B testing alone paid for itself. We saw a 45% improvement in click rates within the first month.', avatar: 'EW' },
];

const pricingPlans = [
  { name: 'Starter', price: 29, contacts: '5,000', features: ['AI Email Generation', 'Basic Segmentation', '3 Campaigns/month', 'Email Support'], popular: false },
  { name: 'Pro', price: 79, contacts: '25,000', features: ['Everything in Starter', 'Advanced AI Segmentation', 'Unlimited Campaigns', 'A/B Testing', 'Priority Support', 'Custom Templates'], popular: true },
  { name: 'Enterprise', price: 199, contacts: '100,000+', features: ['Everything in Pro', 'Dedicated Account Manager', 'Custom Integrations', 'SLA Guarantee', 'Advanced Analytics', 'API Access'], popular: false },
];

export function Landing() {
  const setCurrentPage = useStore(s => s.setCurrentPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">EmailAI Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage('dashboard')} className="text-sm text-slate-600 hover:text-slate-900 font-medium px-4 py-2">
              Sign In
            </button>
            <button onClick={() => setCurrentPage('dashboard')} className="text-sm bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6 animate-fadeIn">
              <Sparkles size={14} />
              Powered by Llama 3.3 70B AI
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight animate-fadeIn">
              <span className="text-slate-900">AI-Powered Email</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Marketing That Actually
              </span>
              <br />
              <span className="text-slate-900">Converts</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fadeIn delay-200 opacity-0" style={{animationFillMode:'forwards',animationDelay:'0.2s'}}>
              Generate personalized emails, segment audiences intelligently, and A/B test automatically. 
              Let AI do the heavy lifting while you focus on growing your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fadeIn delay-300 opacity-0" style={{animationFillMode:'forwards',animationDelay:'0.3s'}}>
              <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-0.5">
                Start Free Trial <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 bg-white text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                <Globe size={18} /> Watch Demo
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> No credit card required</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> 14-day free trial</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Cancel anytime</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 max-w-5xl mx-auto animate-fadeIn delay-400 opacity-0" style={{animationFillMode:'forwards',animationDelay:'0.4s'}}>
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-slate-400">app.emailaipro.com/dashboard</span>
              </div>
              <div className="p-6 grid grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-600">{s.value}</p>
                    <p className="text-sm font-medium text-slate-700 mt-1">{s.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-indigo-700 font-medium">AI Insight: Your "Flash Sale" campaign outperformed industry benchmarks by 63%. Consider running similar campaigns targeting your "High-Value" segment.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-slate-300 mt-1 font-medium">{s.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Everything you need for email marketing success</h2>
            <p className="mt-4 text-slate-600">Powerful AI tools that work together to maximize your email ROI.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 bg-white">
                <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-4", f.color)}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">3 simple steps to better emails</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Import & Segment', desc: 'Upload your customer list or connect your store. AI automatically segments your audience.', icon: <Users className="w-8 h-8" /> },
              { step: '02', title: 'Generate & Personalize', desc: 'Tell AI your goal. It writes personalized emails for each segment with A/B variants.', icon: <Mail className="w-8 h-8" /> },
              { step: '03', title: 'Send & Optimize', desc: 'Send through your preferred ESP. AI analyzes results and optimizes future campaigns.', icon: <TrendingUp className="w-8 h-8" /> },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-4">
                  {item.icon}
                </div>
                <p className="text-xs font-bold text-indigo-400 mb-2">STEP {item.step}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Loved by marketers worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="mt-4 text-slate-600">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={cn(
                "p-8 rounded-2xl border transition-all",
                plan.popular
                  ? "bg-slate-900 text-white border-slate-800 shadow-2xl shadow-slate-900/20 scale-105"
                  : "bg-white border-slate-200 hover:shadow-lg"
              )}>
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold mb-4">Most Popular</span>
                )}
                <h3 className={cn("text-xl font-bold", plan.popular ? "text-white" : "text-slate-900")}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={cn("text-4xl font-extrabold", plan.popular ? "text-white" : "text-slate-900")}>${plan.price}</span>
                  <span className={cn("text-sm", plan.popular ? "text-slate-300" : "text-slate-500")}>/month</span>
                </div>
                <p className={cn("text-sm mt-2", plan.popular ? "text-slate-300" : "text-slate-500")}>Up to {plan.contacts} contacts</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className={cn(plan.popular ? "text-indigo-400" : "text-green-500")} />
                      <span className={plan.popular ? "text-slate-200" : "text-slate-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={cn(
                    "w-full mt-8 py-3 rounded-xl font-semibold text-sm transition-colors",
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  )}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your email marketing?</h2>
          <p className="text-lg text-white/80 mb-10">Join 10,000+ businesses using AI to write emails that actually convert.</p>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-xl text-lg"
          >
            Start Your Free Trial <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">EmailAI Pro</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield size={14} />
            <span>SOC 2 Compliant</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2024 EmailAI Pro. All rights reserved. AI-powered email marketing platform.
        </div>
      </footer>
    </div>
  );
}
