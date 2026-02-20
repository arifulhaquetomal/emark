import { useStore } from '../store/store';
import { campaignTypeLabels, campaignTypeColors, statusColors } from '../data/mockData';
import {
  Plus, Send, Eye, MousePointerClick, DollarSign, Sparkles,
  Calendar, Users, ArrowUpRight, MoreVertical, Trash2, Copy
} from 'lucide-react';
import { cn } from '../utils/cn';

export function Campaigns() {
  const { campaigns, setCurrentPage, deleteCampaign } = useStore();

  const sentCampaigns = campaigns.filter(c => c.status === 'sent');
  const totalSent = sentCampaigns.reduce((a, c) => a + c.sentCount, 0);
  const avgOpen = sentCampaigns.length ? (sentCampaigns.reduce((a, c) => a + c.openRate, 0) / sentCampaigns.length).toFixed(1) : '0';
  const avgClick = sentCampaigns.length ? (sentCampaigns.reduce((a, c) => a + c.clickRate, 0) / sentCampaigns.length).toFixed(1) : '0';
  const totalRevenue = campaigns.reduce((a, c) => a + c.revenueGenerated, 0);

  const summaryStats = [
    { label: 'Total Sent', value: totalSent.toLocaleString(), icon: <Send size={18} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Avg Open Rate', value: `${avgOpen}%`, icon: <Eye size={18} />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Avg Click Rate', value: `${avgClick}%`, icon: <MousePointerClick size={18} />, color: 'bg-amber-50 text-amber-600' },
    { label: 'Revenue Generated', value: `$${(totalRevenue / 1000).toFixed(1)}K`, icon: <DollarSign size={18} />, color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-sm text-slate-500 mt-1">{campaigns.length} total campaigns</p>
        </div>
        <button
          onClick={() => setCurrentPage('campaigns-create')}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", s.color)}>
              {s.icon}
            </div>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                <Send size={20} className="text-indigo-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">{campaign.name}</h3>
                  {campaign.aiGenerated && <Sparkles size={12} className="text-indigo-500 flex-shrink-0" />}
                  {campaign.isAbTest && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded font-medium flex-shrink-0">A/B</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-2 truncate">{campaign.subjectLine}</p>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", statusColors[campaign.status])}>
                    {campaign.status}
                  </span>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", campaignTypeColors[campaign.type])}>
                    {campaignTypeLabels[campaign.type]}
                  </span>
                  {campaign.segmentName && (
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Users size={10} /> {campaign.segmentName}
                    </span>
                  )}
                  {campaign.sentAt && (
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar size={10} /> {campaign.sentAt}
                    </span>
                  )}
                  {campaign.scheduledAt && campaign.status === 'scheduled' && (
                    <span className="text-[10px] text-blue-600 flex items-center gap-1">
                      <Calendar size={10} /> Scheduled: {campaign.scheduledAt}
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              {campaign.status === 'sent' && (
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-900">{campaign.openRate}%</p>
                    <p className="text-[10px] text-slate-500">Open Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-900">{campaign.clickRate}%</p>
                    <p className="text-[10px] text-slate-500">Click Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-600">${campaign.revenueGenerated.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-900">{campaign.sentCount.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">Sent</p>
                  </div>
                </div>
              )}

              {/* A/B Test Results */}
              {campaign.isAbTest && campaign.abVariants && campaign.status === 'sent' && (
                <div className="flex-shrink-0 space-y-1">
                  {campaign.abVariants.map((v) => (
                    <div key={v.id} className="flex items-center gap-2 text-[10px]">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded font-medium",
                        v.openRate > (campaign.abVariants?.reduce((max, va) => va.openRate > max ? va.openRate : max, 0) ?? 0) * 0.95
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      )}>
                        {v.name}
                      </span>
                      <span className="text-slate-500">{v.openRate}% open</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Duplicate">
                  <Copy size={14} />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                  <ArrowUpRight size={14} />
                </button>
                <button onClick={() => deleteCampaign(campaign.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
