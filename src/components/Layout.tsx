import { useStore } from '../store/store';
import type { Page } from '../types';
import {
  LayoutDashboard, Users, Target, Send, FileText, BarChart3,
  Plug, Settings, ChevronLeft, ChevronRight, Sparkles, LogOut, Bell, Search, Menu
} from 'lucide-react';
import { cn } from '../utils/cn';

const navItems: { page: Page; label: string; icon: React.ReactNode; section?: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, section: 'MAIN' },
  { page: 'customers', label: 'Customers', icon: <Users size={20} />, section: 'MANAGE' },
  { page: 'segments', label: 'Segments', icon: <Target size={20} /> },
  { page: 'campaigns', label: 'Campaigns', icon: <Send size={20} /> },
  { page: 'templates', label: 'Templates', icon: <FileText size={20} /> },
  { page: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, section: 'INSIGHTS' },
  { page: 'integrations', label: 'Integrations', icon: <Plug size={20} />, section: 'SETTINGS' },
  { page: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentPage, setCurrentPage, sidebarOpen, toggleSidebar } = useStore();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-slate-900 text-white flex flex-col transition-all duration-300 flex-shrink-0",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-700/50">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="animate-slideIn">
              <h1 className="font-bold text-base leading-tight">EmailAI Pro</h1>
              <p className="text-[10px] text-slate-400 leading-tight">AI Email Marketing</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          {navItems.map((item, idx) => (
            <div key={item.page}>
              {item.section && sidebarOpen && (
                <p className={cn("text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3", idx > 0 ? "mt-6 mb-2" : "mb-2")}>
                  {item.section}
                </p>
              )}
              {item.section && !sidebarOpen && idx > 0 && (
                <div className="border-t border-slate-700/50 my-3 mx-2" />
              )}
              <button
                onClick={() => setCurrentPage(item.page)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5",
                  currentPage === item.page
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  !sidebarOpen && "justify-center"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                {item.icon}
                {sidebarOpen && <span className="animate-slideIn">{item.label}</span>}
              </button>
            </div>
          ))}
        </nav>

        {/* Collapse button */}
        <div className="px-3 pb-3">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>

        {/* User */}
        <div className={cn("border-t border-slate-700/50 p-3", !sidebarOpen && "flex justify-center")}>
          <button
            onClick={() => setCurrentPage('landing')}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors",
              !sidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-700">
              <Menu size={20} />
            </button>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-9 pr-4 py-2 w-72 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                JP
              </div>
              {sidebarOpen && (
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-700">John Parker</p>
                  <p className="text-xs text-slate-400">Pro Plan</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
