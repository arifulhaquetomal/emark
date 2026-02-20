import { useState } from 'react';
import { useStore } from '../store/store';
import {
  User, Bell, Shield, Key, Plug, Check,
  ExternalLink, RefreshCw, AlertCircle, Globe
} from 'lucide-react';
import { cn } from '../utils/cn';

const providerLogos: Record<string, string> = {
  mailchimp: '📧',
  sendgrid: '📨',
  klaviyo: '🎯',
  aws_ses: '☁️',
};

type Tab = 'profile' | 'integrations' | 'notifications' | 'api' | 'billing';

export function Settings() {
  const { integrations, toggleIntegration } = useStore();
  const [tab, setTab] = useState<Tab>('profile');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'integrations', label: 'Integrations', icon: <Plug size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'api', label: 'API Keys', icon: <Key size={16} /> },
    { id: 'billing', label: 'Billing', icon: <Shield size={16} /> },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and integrations</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                  tab === t.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tab === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 animate-fadeIn">
              <h2 className="text-base font-semibold text-slate-900">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  JP
                </div>
                <div>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">Change Avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <input defaultValue="John" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <input defaultValue="Parker" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input defaultValue="john@emailaipro.com" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Company</label>
                  <input defaultValue="EmailAI Pro" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Default From Email</label>
                <input defaultValue="marketing@emailaipro.com" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Timezone</label>
                <select defaultValue="America/New_York" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
                Save Changes
              </button>
            </div>
          )}

          {tab === 'integrations' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-base font-semibold text-slate-900 mb-1">Email Service Providers</h2>
                <p className="text-xs text-slate-500 mb-6">Connect your preferred ESP to send campaigns</p>
                <div className="space-y-4">
                  {integrations.map(integration => (
                    <div key={integration.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl">
                        {providerLogos[integration.provider] || '🔌'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">{integration.name}</h3>
                          {integration.isConnected && (
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                              <Check size={10} /> Connected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{integration.description}</p>
                        {integration.isConnected && integration.lastSynced && (
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1"><RefreshCw size={10} /> Last synced: {new Date(integration.lastSynced).toLocaleDateString()}</span>
                            {integration.contactsSynced && (
                              <span>{integration.contactsSynced.toLocaleString()} contacts synced</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.isConnected && (
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <ExternalLink size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => toggleIntegration(integration.id)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                            integration.isConnected
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-indigo-600 text-white hover:bg-indigo-700"
                          )}
                        >
                          {integration.isConnected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Groq AI Integration */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-base font-semibold text-slate-900 mb-1">AI Provider</h2>
                <p className="text-xs text-slate-500 mb-4">Configure your AI model for email generation</p>
                <div className="flex items-center gap-4 p-4 border border-indigo-200 rounded-xl bg-indigo-50/50">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">Groq — Llama 3.3 70B</h3>
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                        <Check size={10} /> Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Ultra-fast AI inference for email generation and personalization</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Free Tier</span>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-slate-700">Groq API Key</label>
                  <input type="password" defaultValue="gsk_xxxxxxxxxxxxxxxxxxxx" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> Get your free API key at console.groq.com
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 animate-fadeIn">
              <h2 className="text-base font-semibold text-slate-900">Notification Preferences</h2>
              {[
                { label: 'Campaign sent', desc: 'Get notified when a campaign finishes sending', default: true },
                { label: 'Open rate milestone', desc: 'Alert when a campaign hits 30%+ open rate', default: true },
                { label: 'New subscriber', desc: 'Notification for every new subscriber', default: false },
                { label: 'Bounce alerts', desc: 'Alert when bounce rate exceeds 5%', default: true },
                { label: 'Weekly digest', desc: 'Weekly summary of email performance', default: true },
                { label: 'AI suggestions', desc: 'Get AI-powered optimization suggestions', default: true },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{n.label}</p>
                    <p className="text-xs text-slate-500">{n.desc}</p>
                  </div>
                  <button className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    n.default ? "bg-indigo-600" : "bg-slate-300"
                  )}>
                    <div className={cn(
                      "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                      n.default ? "left-5.5" : "left-0.5"
                    )} style={n.default ? { left: '22px' } : { left: '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'api' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 animate-fadeIn">
              <h2 className="text-base font-semibold text-slate-900">API Keys</h2>
              <p className="text-xs text-slate-500">Use API keys to integrate EmailAI Pro with your applications</p>
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Production Key</p>
                    <p className="text-xs text-slate-500">Created Jan 1, 2024</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="password" defaultValue="eai_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" readOnly
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" />
                  <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200">Copy</button>
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Test Key</p>
                    <p className="text-xs text-slate-500">For development and testing</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">Test</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="password" defaultValue="eai_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" readOnly
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" />
                  <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200">Copy</button>
                </div>
              </div>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">+ Generate New Key</button>

              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2"><Globe size={14} /> Webhooks</h3>
                <div>
                  <label className="text-sm font-medium text-slate-700">Webhook URL</label>
                  <input placeholder="https://your-app.com/webhooks/emailai" className="w-full mt-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <p className="text-[10px] text-slate-400 mt-1">Receive real-time notifications for opens, clicks, and bounces</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'billing' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 animate-fadeIn">
              <h2 className="text-base font-semibold text-slate-900">Billing & Plan</h2>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Current Plan</p>
                    <p className="text-2xl font-bold mt-1">Pro Plan</p>
                    <p className="text-sm text-white/80 mt-1">$79/month • 25,000 contacts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">Next billing date</p>
                    <p className="text-lg font-semibold mt-1">Feb 1, 2024</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                    Upgrade Plan
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                    Manage Subscription
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Usage This Month</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Contacts', used: 12847, total: 25000 },
                    { label: 'Emails Sent', used: 45230, total: 100000 },
                    { label: 'AI Generations', used: 156, total: 500 },
                  ].map(u => (
                    <div key={u.label}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-slate-700">{u.label}</p>
                        <p className="text-xs text-slate-500">{u.used.toLocaleString()} / {u.total.toLocaleString()}</p>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", (u.used / u.total) > 0.8 ? 'bg-amber-500' : 'bg-indigo-500')}
                          style={{ width: `${(u.used / u.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
