import { useStore } from '../store/store';
import { mockDashboardStats, mockAnalytics, campaignTypeLabels, statusColors } from '../data/mockData';
import {
  Users, Send, Eye, MousePointerClick, DollarSign, Target, Mail, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sparkles, Plus
} from 'lucide-react';
import { cn } from '../utils/cn';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stats = [
  { label: 'Total Customers', value: mockDashboardStats.totalCustomers.toLocaleString(), icon: <Users size={20} />, change: '+12.5%', up: true, color: 'bg-blue-50 text-blue-600' },
  { label: 'Campaigns Sent', value: mockDashboardStats.totalCampaigns.toString(), icon: <Send size={20} />, change: '+8.3%', up: true, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Avg Open Rate', value: `${mockDashboardStats.avgOpenRate}%`, icon: <Eye size={20} />, change: '+5.2%', up: true, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Avg Click Rate', value: `${mockDashboardStats.avgClickRate}%`, icon: <MousePointerClick size={20} />, change: '-0.8%', up: false, color: 'bg-amber-50 text-amber-600' },
  { label: 'Total Revenue', value: `$${(mockDashboardStats.totalRevenue / 1000).toFixed(1)}K`, icon: <DollarSign size={20} />, change: '+23.1%', up: true, color: 'bg-green-50 text-green-600' },
  { label: 'Active Segments', value: mockDashboardStats.activeSegments.toString(), icon: <Target size={20} />, change: '+2', up: true, color: 'bg-purple-50 text-purple-600' },
  { label: 'Emails Today', value: mockDashboardStats.emailsSentToday.toLocaleString(), icon: <Mail size={20} />, change: '+340', up: true, color: 'bg-pink-50 text-pink-600' },
  { label: 'Growth Rate', value: `${mockDashboardStats.growthRate}%`, icon: <TrendingUp size={20} />, change: '+3.2%', up: true, color: 'bg-cyan-50 text-cyan-600' },
];

export function Dashboard() {
  const { campaigns, segments, setCurrentPage } = useStore();
  const recentCampaigns = campaigns.filter(c => c.status === 'sent').slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, John. Here's what's happening with your campaigns.</p>
        </div>
        <button
          onClick={() => setCurrentPage('campaigns-create')}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> New Campaign
        </button>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-sm">AI Insight</h3>
          <p className="text-sm text-white/90 mt-1">
            Your "January Flash Sale" campaign had a 34.2% open rate — 63% above industry average! 
            The AI-generated subject line outperformed the manual variant by 19%. Consider running a similar campaign 
            targeting your "At-Risk Churning" segment to re-engage inactive customers.
          </p>
          <button className="mt-3 text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
            Create Suggested Campaign →
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.color)}>
                {stat.icon}
              </div>
              <span className={cn(
                "text-xs font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full",
                stat.up ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"
              )}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Email Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Email Performance</h3>
              <p className="text-xs text-slate-500 mt-0.5">Opens and clicks over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Opened</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Clicked</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockAnalytics}>
              <defs>
                <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="opened" stroke="#6366f1" strokeWidth={2} fill="url(#openGrad)" />
              <Area type="monotone" dataKey="clicked" stroke="#10b981" strokeWidth={2} fill="url(#clickGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-slate-900">Revenue</h3>
            <p className="text-xs text-slate-500 mt-0.5">Campaign-driven revenue</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">$142.5K</p>
            <span className="text-xs text-green-600 font-medium">+23.1% vs last month</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAnalytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Campaigns</h3>
            <button onClick={() => setCurrentPage('campaigns')} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View All →</button>
          </div>
          <div className="space-y-3">
            {recentCampaigns.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Send size={16} className="text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{c.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", statusColors[c.status])}>{c.status}</span>
                    <span className="text-[10px] text-slate-400">{campaignTypeLabels[c.type]}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-900">{c.openRate}%</p>
                  <p className="text-[10px] text-slate-400">open rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Segments Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Active Segments</h3>
            <button onClick={() => setCurrentPage('segments')} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View All →</button>
          </div>
          <div className="space-y-3">
            {segments.map((s) => (
              <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color + '20' }}>
                  <Target size={16} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{s.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{s.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-900">{s.customerCount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">contacts</p>
                </div>
                {s.aiGenerated && (
                  <Sparkles size={14} className="text-indigo-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
