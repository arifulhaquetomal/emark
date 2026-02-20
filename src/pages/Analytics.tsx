import { useStore } from '../store/store';
import { mockAnalytics } from '../data/mockData';
import {
  TrendingUp, Eye, MousePointerClick, Send, DollarSign,
  Target, ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';
import { cn } from '../utils/cn';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function Analytics() {
  const { campaigns, segments, customers } = useStore();

  const sentCampaigns = campaigns.filter(c => c.status === 'sent');
  const totalSent = sentCampaigns.reduce((a, c) => a + c.sentCount, 0);
  const totalOpened = sentCampaigns.reduce((a, c) => a + c.openedCount, 0);
  const totalClicked = sentCampaigns.reduce((a, c) => a + c.clickedCount, 0);
  const totalRevenue = campaigns.reduce((a, c) => a + c.revenueGenerated, 0);
  const overallOpenRate = totalSent ? ((totalOpened / totalSent) * 100).toFixed(1) : '0';
  const overallClickRate = totalSent ? ((totalClicked / totalSent) * 100).toFixed(1) : '0';

  const kpis = [
    { label: 'Total Emails Sent', value: totalSent.toLocaleString(), icon: <Send size={18} />, change: '+18.3%', up: true, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Opens', value: totalOpened.toLocaleString(), icon: <Eye size={18} />, change: '+12.7%', up: true, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Clicks', value: totalClicked.toLocaleString(), icon: <MousePointerClick size={18} />, change: '+8.4%', up: true, color: 'bg-amber-50 text-amber-600' },
    { label: 'Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}K`, icon: <DollarSign size={18} />, change: '+23.1%', up: true, color: 'bg-green-50 text-green-600' },
    { label: 'Open Rate', value: `${overallOpenRate}%`, icon: <TrendingUp size={18} />, change: '+5.2%', up: true, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Click Rate', value: `${overallClickRate}%`, icon: <Target size={18} />, change: '-0.3%', up: false, color: 'bg-purple-50 text-purple-600' },
  ];

  const campaignTypeData = [
    { name: 'Promotional', value: campaigns.filter(c => c.type === 'promotional').length, avgOpen: 34.2 },
    { name: 'Welcome', value: campaigns.filter(c => c.type === 'welcome').length, avgOpen: 72.5 },
    { name: 'Newsletter', value: campaigns.filter(c => c.type === 'newsletter').length, avgOpen: 37.6 },
    { name: 'Nurture', value: campaigns.filter(c => c.type === 'nurture').length, avgOpen: 0 },
    { name: 'Cart Recovery', value: campaigns.filter(c => c.type === 'abandoned_cart').length, avgOpen: 40.1 },
  ];

  const segmentPerformance = segments.map((s, i) => ({
    name: s.name.length > 15 ? s.name.substring(0, 15) + '...' : s.name,
    contacts: s.customerCount,
    engagement: [92, 35, 65, 88, 78][i] || 50,
  }));

  const engagementDistribution = [
    { range: '0-20', count: customers.filter(c => c.engagementScore <= 20).length },
    { range: '21-40', count: customers.filter(c => c.engagementScore > 20 && c.engagementScore <= 40).length },
    { range: '41-60', count: customers.filter(c => c.engagementScore > 40 && c.engagementScore <= 60).length },
    { range: '61-80', count: customers.filter(c => c.engagementScore > 60 && c.engagementScore <= 80).length },
    { range: '81-100', count: customers.filter(c => c.engagementScore > 80).length },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Track your email marketing performance</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
          <Calendar size={14} />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", kpi.color)}>
                {kpi.icon}
              </div>
              <span className={cn(
                "text-[10px] font-medium flex items-center gap-0.5",
                kpi.up ? "text-green-600" : "text-red-500"
              )}>
                {kpi.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-slate-900">{kpi.value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Email Performance Over Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Email Performance Over Time</h3>
          <p className="text-xs text-slate-500 mb-4">Sent, opened, and clicked over the last 30 days</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockAnalytics}>
              <defs>
                <linearGradient id="sentG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="openG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
              <Area type="monotone" dataKey="sent" stroke="#6366f1" strokeWidth={2} fill="url(#sentG)" name="Sent" />
              <Area type="monotone" dataKey="opened" stroke="#10b981" strokeWidth={2} fill="url(#openG)" name="Opened" />
              <Area type="monotone" dataKey="clicked" stroke="#f59e0b" strokeWidth={2} fillOpacity={0} name="Clicked" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Over Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Revenue Generated</h3>
          <p className="text-xs text-slate-500 mb-4">Campaign-attributed revenue over time</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockAnalytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Campaign Type Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Campaign Types</h3>
          <p className="text-xs text-slate-500 mb-4">Distribution of campaign types</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={campaignTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                paddingAngle={4} dataKey="value">
                {campaignTypeData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend formatter={(value) => <span className="text-xs text-slate-600">{value}</span>} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Segment Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Segment Engagement</h3>
          <p className="text-xs text-slate-500 mb-4">Average engagement score by segment</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={segmentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
              <Bar dataKey="engagement" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Engagement Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Customer engagement score distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={engagementDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {engagementDistribution.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={['#ef4444', '#f97316', '#f59e0b', '#10b981', '#6366f1'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Campaigns Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-1">Top Performing Campaigns</h3>
        <p className="text-xs text-slate-500 mb-4">Ranked by open rate</p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-2">Campaign</th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-2">Type</th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-2">Sent</th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-2">Open Rate</th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-2">Click Rate</th>
              <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sentCampaigns.sort((a, b) => b.openRate - a.openRate).map((c, i) => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                    <p className="text-sm font-medium text-slate-900">{c.name}</p>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className="text-xs capitalize text-slate-600">{c.type.replace('_', ' ')}</span>
                </td>
                <td className="py-3 px-2 text-center text-sm text-slate-600">{c.sentCount.toLocaleString()}</td>
                <td className="py-3 px-2 text-center">
                  <span className={cn("text-sm font-semibold", c.openRate > 35 ? "text-emerald-600" : "text-slate-900")}>
                    {c.openRate}%
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={cn("text-sm font-semibold", c.clickRate > 10 ? "text-emerald-600" : "text-slate-900")}>
                    {c.clickRate}%
                  </span>
                </td>
                <td className="py-3 px-2 text-center text-sm font-semibold text-emerald-600">
                  ${c.revenueGenerated.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
