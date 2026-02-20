import { useState, useCallback } from 'react';
import { useStore } from '../store/store';
import {
  Search, Filter, Download, Upload, Plus, MoreHorizontal,
  Mail, Phone, Building, Tag, X, ChevronDown, UserPlus, FileSpreadsheet
} from 'lucide-react';
import { cn } from '../utils/cn';
import type { Customer } from '../types';

const statusBadge: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  unsubscribed: 'bg-red-100 text-red-600',
  bounced: 'bg-amber-100 text-amber-700',
};

function EngagementBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : score >= 25 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-slate-500">{score}</span>
    </div>
  );
}

function CustomerDetail({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Customer Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {customer.firstName[0]}{customer.lastName[0]}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{customer.firstName} {customer.lastName}</h3>
              <p className="text-sm text-slate-500">{customer.company}</p>
            </div>
            <span className={cn("ml-auto text-xs px-2 py-1 rounded-full font-medium", statusBadge[customer.status])}>
              {customer.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail size={14} className="text-slate-400" /> {customer.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone size={14} className="text-slate-400" /> {customer.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Building size={14} className="text-slate-400" /> {customer.company}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Tag size={14} className="text-slate-400" /> {customer.source}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {customer.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">{tag}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Spent', value: `$${customer.totalSpent.toLocaleString()}` },
              { label: 'Orders', value: customer.orderCount.toString() },
              { label: 'Avg Order', value: `$${customer.averageOrderValue.toFixed(2)}` },
              { label: 'Lifetime Value', value: `$${customer.lifetimeValue.toLocaleString()}` },
              { label: 'Emails Opened', value: customer.emailOpenedCount.toString() },
              { label: 'Emails Clicked', value: customer.emailClickedCount.toString() },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">Engagement Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", customer.engagementScore >= 80 ? 'bg-emerald-500' : customer.engagementScore >= 50 ? 'bg-amber-500' : 'bg-red-500')}
                  style={{ width: `${customer.engagementScore}%` }}
                />
              </div>
              <span className="text-lg font-bold text-slate-900">{customer.engagementScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImportModal({ onClose }: { onClose: () => void }) {
  const { addCustomers } = useStore();
  const [imported, setImported] = useState(false);

  const handleImport = useCallback(() => {
    const newCustomers: Customer[] = [
      {
        id: `imp_${Date.now()}_1`, email: 'new.customer1@example.com', firstName: 'Alice', lastName: 'Wonder',
        company: 'Wonder Inc', phone: '+1-555-9001', tags: ['imported'], totalSpent: 0, orderCount: 0,
        averageOrderValue: 0, lastPurchaseDate: '', lifetimeValue: 0, emailOpenedCount: 0,
        emailClickedCount: 0, engagementScore: 50, status: 'active', source: 'csv',
        createdAt: new Date().toISOString().split('T')[0]
      },
      {
        id: `imp_${Date.now()}_2`, email: 'new.customer2@example.com', firstName: 'Bob', lastName: 'Builder',
        company: 'BuildRight', phone: '+1-555-9002', tags: ['imported'], totalSpent: 0, orderCount: 0,
        averageOrderValue: 0, lastPurchaseDate: '', lifetimeValue: 0, emailOpenedCount: 0,
        emailClickedCount: 0, engagementScore: 50, status: 'active', source: 'csv',
        createdAt: new Date().toISOString().split('T')[0]
      },
    ];
    addCustomers(newCustomers);
    setImported(true);
  }, [addCustomers]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Import Customers</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-6">
          {!imported ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                <FileSpreadsheet size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-700">Drop your CSV file here</p>
                <p className="text-xs text-slate-400 mt-1">or click to browse</p>
                <p className="text-xs text-slate-400 mt-3">Supported: CSV, XLSX (max 10MB)</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-700 mb-2">Required columns:</p>
                <div className="flex flex-wrap gap-1">
                  {['email', 'first_name', 'last_name', 'company'].map(c => (
                    <span key={c} className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">{c}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleImport}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Import Sample Data
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <UserPlus size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Import Successful!</h3>
              <p className="text-sm text-slate-500 mt-2">2 new customers have been imported.</p>
              <button onClick={onClose} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Customers() {
  const { customers, searchQuery, setSearchQuery, deleteCustomer } = useStore();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilter, setShowFilter] = useState(false);

  const filtered = customers.filter(c => {
    const matchesSearch = !searchQuery ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500 mt-1">{customers.length.toLocaleString()} total contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Upload size={16} /> Import CSV
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Filter size={14} /> Status <ChevronDown size={14} />
            </button>
            {showFilter && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1 w-36">
                {['all', 'active', 'unsubscribed', 'bounced'].map(s => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setShowFilter(false); }}
                    className={cn("w-full text-left px-3 py-2 text-sm hover:bg-slate-50 capitalize", statusFilter === s && "bg-indigo-50 text-indigo-700 font-medium")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Customer</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Company</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Total Spent</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Orders</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Engagement</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">Source</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedCustomer(c)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.firstName[0]}{c.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{c.firstName} {c.lastName}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{c.company}</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">${c.totalSpent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{c.orderCount}</td>
                  <td className="py-3 px-4"><EngagementBar score={c.engagementScore} /></td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded-full font-medium capitalize", statusBadge[c.status])}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400 capitalize">{c.source}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCustomer(c.id); }}
                      className="text-slate-300 hover:text-slate-500"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {customers.length} customers</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded">2</button>
            <button className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded">3</button>
          </div>
        </div>
      </div>

      {selectedCustomer && <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
      {showImport && <ImportModal onClose={() => setShowImport(false)} />}
    </div>
  );
}
