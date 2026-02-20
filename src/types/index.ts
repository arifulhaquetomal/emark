export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  tags: string[];
  totalSpent: number;
  orderCount: number;
  averageOrderValue: number;
  lastPurchaseDate: string;
  lifetimeValue: number;
  emailOpenedCount: number;
  emailClickedCount: number;
  engagementScore: number;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: string;
  createdAt: string;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  rules: SegmentRule[];
  aiGenerated: boolean;
  aiReasoning?: string;
  customerCount: number;
  lastCalculated: string;
  createdAt: string;
  color: string;
}

export interface SegmentRule {
  field: string;
  operator: string;
  value: string | number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'welcome' | 'promotional' | 'nurture' | 'abandoned_cart' | 'newsletter';
  subjectLine: string;
  previewText: string;
  fromName: string;
  fromEmail: string;
  emailHtml: string;
  aiGenerated: boolean;
  segmentId?: string;
  segmentName?: string;
  isAbTest: boolean;
  abVariants?: ABVariant[];
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  scheduledAt?: string;
  sentAt?: string;
  recipientsCount: number;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  bouncedCount: number;
  unsubscribedCount: number;
  openRate: number;
  clickRate: number;
  revenueGenerated: number;
  createdAt: string;
}

export interface ABVariant {
  id: string;
  name: string;
  subjectLine: string;
  percentage: number;
  openRate: number;
  clickRate: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  subjectLine: string;
  previewText: string;
  emailHtml: string;
  thumbnail: string;
  useCount: number;
  createdAt: string;
}

export interface Integration {
  id: string;
  provider: 'mailchimp' | 'sendgrid' | 'klaviyo' | 'aws_ses';
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  isConnected: boolean;
  lastSynced?: string;
  contactsSynced?: number;
}

export interface AnalyticsData {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
  revenue: number;
}

export interface DashboardStats {
  totalCustomers: number;
  totalCampaigns: number;
  avgOpenRate: number;
  avgClickRate: number;
  totalRevenue: number;
  activeSegments: number;
  emailsSentToday: number;
  growthRate: number;
}

export type Page = 'landing' | 'dashboard' | 'customers' | 'customers-import' | 'segments' | 'segments-create' | 'campaigns' | 'campaigns-create' | 'templates' | 'analytics' | 'integrations' | 'settings';
