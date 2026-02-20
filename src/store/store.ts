import { create } from 'zustand';
import type { Customer, Segment, Campaign, Template, Integration, Page } from '../types';
import { mockCustomers, mockSegments, mockCampaigns, mockTemplates, mockIntegrations } from '../data/mockData';

interface AppState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  addCustomers: (customers: Customer[]) => void;
  deleteCustomer: (id: string) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;

  // Segments
  segments: Segment[];
  addSegment: (segment: Segment) => void;
  deleteSegment: (id: string) => void;

  // Campaigns
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  // Templates
  templates: Template[];

  // Integrations
  integrations: Integration[];
  toggleIntegration: (id: string) => void;

  // AI Generation
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
  generatedContent: string;
  setGeneratedContent: (v: string) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Modal states
  showCreateModal: boolean;
  setShowCreateModal: (v: boolean) => void;
  showImportModal: boolean;
  setShowImportModal: (v: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page, searchQuery: '', showCreateModal: false, showImportModal: false, selectedCustomerId: null }),
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  customers: mockCustomers,
  addCustomer: (customer) => set((state) => ({ customers: [customer, ...state.customers] })),
  addCustomers: (newCustomers) => set((state) => ({ customers: [...newCustomers, ...state.customers] })),
  deleteCustomer: (id) => set((state) => ({ customers: state.customers.filter(c => c.id !== id) })),
  selectedCustomerId: null,
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }),

  segments: mockSegments,
  addSegment: (segment) => set((state) => ({ segments: [segment, ...state.segments] })),
  deleteSegment: (id) => set((state) => ({ segments: state.segments.filter(s => s.id !== id) })),

  campaigns: mockCampaigns,
  addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
  })),
  deleteCampaign: (id) => set((state) => ({ campaigns: state.campaigns.filter(c => c.id !== id) })),

  templates: mockTemplates,
  integrations: mockIntegrations,
  toggleIntegration: (id) => set((state) => ({
    integrations: state.integrations.map(i =>
      i.id === id ? { ...i, isConnected: !i.isConnected, isActive: !i.isActive, lastSynced: !i.isConnected ? new Date().toISOString() : undefined, contactsSynced: !i.isConnected ? 2847 : undefined } : i
    )
  })),

  isGenerating: false,
  setIsGenerating: (v) => set({ isGenerating: v }),
  generatedContent: '',
  setGeneratedContent: (v) => set({ generatedContent: v }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  showCreateModal: false,
  setShowCreateModal: (v) => set({ showCreateModal: v }),
  showImportModal: false,
  setShowImportModal: (v) => set({ showImportModal: v }),
}));
