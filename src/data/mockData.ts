import type { Customer, Segment, Campaign, Template, Integration, AnalyticsData, DashboardStats } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: 'c1', email: 'sarah.johnson@techcorp.com', firstName: 'Sarah', lastName: 'Johnson',
    company: 'TechCorp', phone: '+1-555-0101', tags: ['vip', 'enterprise'], totalSpent: 15420.00,
    orderCount: 23, averageOrderValue: 670.43, lastPurchaseDate: '2024-01-15',
    lifetimeValue: 18500.00, emailOpenedCount: 45, emailClickedCount: 18, engagementScore: 92,
    status: 'active', source: 'shopify', createdAt: '2023-03-15'
  },
  {
    id: 'c2', email: 'mike.chen@startupxyz.io', firstName: 'Mike', lastName: 'Chen',
    company: 'StartupXYZ', phone: '+1-555-0102', tags: ['startup', 'growth'], totalSpent: 4250.00,
    orderCount: 8, averageOrderValue: 531.25, lastPurchaseDate: '2024-01-10',
    lifetimeValue: 5100.00, emailOpenedCount: 32, emailClickedCount: 12, engagementScore: 78,
    status: 'active', source: 'csv', createdAt: '2023-06-22'
  },
  {
    id: 'c3', email: 'emma.wilson@designstudio.com', firstName: 'Emma', lastName: 'Wilson',
    company: 'Design Studio', phone: '+1-555-0103', tags: ['creative', 'agency'], totalSpent: 8900.00,
    orderCount: 15, averageOrderValue: 593.33, lastPurchaseDate: '2024-01-08',
    lifetimeValue: 10200.00, emailOpenedCount: 52, emailClickedCount: 24, engagementScore: 88,
    status: 'active', source: 'manual', createdAt: '2023-04-10'
  },
  {
    id: 'c4', email: 'james.brown@retailco.com', firstName: 'James', lastName: 'Brown',
    company: 'RetailCo', phone: '+1-555-0104', tags: ['retail', 'bulk-buyer'], totalSpent: 22340.00,
    orderCount: 45, averageOrderValue: 496.44, lastPurchaseDate: '2024-01-18',
    lifetimeValue: 28000.00, emailOpenedCount: 61, emailClickedCount: 29, engagementScore: 95,
    status: 'active', source: 'api', createdAt: '2023-01-05'
  },
  {
    id: 'c5', email: 'lisa.park@freelance.dev', firstName: 'Lisa', lastName: 'Park',
    company: 'Freelance', phone: '+1-555-0105', tags: ['freelancer'], totalSpent: 1200.00,
    orderCount: 3, averageOrderValue: 400.00, lastPurchaseDate: '2023-12-20',
    lifetimeValue: 1500.00, emailOpenedCount: 8, emailClickedCount: 2, engagementScore: 35,
    status: 'active', source: 'csv', createdAt: '2023-09-14'
  },
  {
    id: 'c6', email: 'david.martinez@bigcorp.com', firstName: 'David', lastName: 'Martinez',
    company: 'BigCorp Inc.', phone: '+1-555-0106', tags: ['enterprise', 'decision-maker'], totalSpent: 34500.00,
    orderCount: 12, averageOrderValue: 2875.00, lastPurchaseDate: '2024-01-20',
    lifetimeValue: 42000.00, emailOpenedCount: 38, emailClickedCount: 15, engagementScore: 82,
    status: 'active', source: 'shopify', createdAt: '2023-02-28'
  },
  {
    id: 'c7', email: 'amy.taylor@ecomshop.com', firstName: 'Amy', lastName: 'Taylor',
    company: 'EcomShop', phone: '+1-555-0107', tags: ['ecommerce', 'growth'], totalSpent: 6700.00,
    orderCount: 19, averageOrderValue: 352.63, lastPurchaseDate: '2024-01-12',
    lifetimeValue: 8000.00, emailOpenedCount: 42, emailClickedCount: 20, engagementScore: 75,
    status: 'active', source: 'manual', createdAt: '2023-05-18'
  },
  {
    id: 'c8', email: 'robert.kim@inactive.com', firstName: 'Robert', lastName: 'Kim',
    company: 'Inactive LLC', phone: '+1-555-0108', tags: ['churned'], totalSpent: 350.00,
    orderCount: 1, averageOrderValue: 350.00, lastPurchaseDate: '2023-06-15',
    lifetimeValue: 350.00, emailOpenedCount: 2, emailClickedCount: 0, engagementScore: 8,
    status: 'active', source: 'csv', createdAt: '2023-06-01'
  },
  {
    id: 'c9', email: 'jennifer.lee@boutique.co', firstName: 'Jennifer', lastName: 'Lee',
    company: 'Boutique Co', phone: '+1-555-0109', tags: ['boutique', 'vip'], totalSpent: 11200.00,
    orderCount: 28, averageOrderValue: 400.00, lastPurchaseDate: '2024-01-16',
    lifetimeValue: 13500.00, emailOpenedCount: 55, emailClickedCount: 22, engagementScore: 90,
    status: 'active', source: 'shopify', createdAt: '2023-03-22'
  },
  {
    id: 'c10', email: 'tom.harris@bounced.com', firstName: 'Tom', lastName: 'Harris',
    company: 'Old Corp', phone: '+1-555-0110', tags: [], totalSpent: 0,
    orderCount: 0, averageOrderValue: 0, lastPurchaseDate: '',
    lifetimeValue: 0, emailOpenedCount: 0, emailClickedCount: 0, engagementScore: 0,
    status: 'bounced', source: 'csv', createdAt: '2023-08-10'
  },
  {
    id: 'c11', email: 'nina.patel@saascompany.io', firstName: 'Nina', lastName: 'Patel',
    company: 'SaaS Company', phone: '+1-555-0111', tags: ['saas', 'tech'], totalSpent: 9800.00,
    orderCount: 14, averageOrderValue: 700.00, lastPurchaseDate: '2024-01-14',
    lifetimeValue: 12000.00, emailOpenedCount: 48, emailClickedCount: 21, engagementScore: 85,
    status: 'active', source: 'api', createdAt: '2023-04-05'
  },
  {
    id: 'c12', email: 'unsub@example.com', firstName: 'Alex', lastName: 'Unsub',
    company: 'Gone Away', phone: '+1-555-0112', tags: ['unsubscribed'], totalSpent: 200.00,
    orderCount: 1, averageOrderValue: 200.00, lastPurchaseDate: '2023-07-01',
    lifetimeValue: 200.00, emailOpenedCount: 5, emailClickedCount: 1, engagementScore: 12,
    status: 'unsubscribed', source: 'csv', createdAt: '2023-07-01'
  }
];

export const mockSegments: Segment[] = [
  {
    id: 's1', name: 'High-Value Customers', description: 'Customers who have spent over $5,000 and have high engagement',
    rules: [{ field: 'totalSpent', operator: '>', value: 5000 }, { field: 'engagementScore', operator: '>', value: 70 }],
    aiGenerated: true, aiReasoning: 'These customers show consistent purchasing behavior and high email engagement, making them ideal for premium offers and loyalty programs.',
    customerCount: 7, lastCalculated: '2024-01-20', createdAt: '2023-12-01', color: '#6366f1'
  },
  {
    id: 's2', name: 'At-Risk Churning', description: 'Customers who haven\'t purchased in 60+ days with declining engagement',
    rules: [{ field: 'engagementScore', operator: '<', value: 30 }, { field: 'orderCount', operator: '<', value: 3 }],
    aiGenerated: true, aiReasoning: 'Low engagement combined with infrequent purchases suggests these customers are at risk of churning. Win-back campaigns recommended.',
    customerCount: 2, lastCalculated: '2024-01-20', createdAt: '2023-12-15', color: '#ef4444'
  },
  {
    id: 's3', name: 'New Subscribers', description: 'Customers who joined in the last 30 days',
    rules: [{ field: 'orderCount', operator: '<=', value: 2 }],
    aiGenerated: false, customerCount: 3, lastCalculated: '2024-01-20', createdAt: '2024-01-01', color: '#10b981'
  },
  {
    id: 's4', name: 'Enterprise Accounts', description: 'Large company customers with high AOV',
    rules: [{ field: 'averageOrderValue', operator: '>', value: 1000 }, { field: 'tags', operator: 'contains', value: 'enterprise' }],
    aiGenerated: false, customerCount: 2, lastCalculated: '2024-01-20', createdAt: '2023-11-10', color: '#8b5cf6'
  },
  {
    id: 's5', name: 'Engaged Openers', description: 'Customers who frequently open and click emails',
    rules: [{ field: 'emailOpenedCount', operator: '>', value: 30 }, { field: 'emailClickedCount', operator: '>', value: 10 }],
    aiGenerated: true, aiReasoning: 'High email engagement indicates strong brand affinity. These customers are most likely to respond to new product launches and exclusive offers.',
    customerCount: 8, lastCalculated: '2024-01-20', createdAt: '2023-12-20', color: '#f59e0b'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp1', name: 'January Flash Sale', description: 'New year flash sale with 30% off everything',
    type: 'promotional', subjectLine: '🎉 New Year, New Deals — 30% Off Everything!',
    previewText: 'Start the year right with our biggest sale ever', fromName: 'EmailAI Pro',
    fromEmail: 'marketing@emailaipro.com',
    emailHtml: '<h1>Happy New Year!</h1><p>Enjoy 30% off on all products. Use code NEWYEAR30 at checkout.</p>',
    aiGenerated: true, segmentId: 's1', segmentName: 'High-Value Customers', isAbTest: true,
    abVariants: [
      { id: 'v1', name: 'Variant A', subjectLine: '🎉 New Year, New Deals — 30% Off Everything!', percentage: 50, openRate: 34.2, clickRate: 8.1 },
      { id: 'v2', name: 'Variant B', subjectLine: 'Your Exclusive 30% Discount Awaits', percentage: 50, openRate: 28.7, clickRate: 6.3 }
    ],
    status: 'sent', sentAt: '2024-01-05', recipientsCount: 1847, sentCount: 1847,
    deliveredCount: 1823, openedCount: 631, clickedCount: 149, bouncedCount: 24,
    unsubscribedCount: 8, openRate: 34.2, clickRate: 8.1, revenueGenerated: 12450.00, createdAt: '2024-01-03'
  },
  {
    id: 'camp2', name: 'Welcome Series — Day 1', description: 'First email in the welcome automation series',
    type: 'welcome', subjectLine: 'Welcome to EmailAI Pro! Here\'s what you need to know 👋',
    previewText: 'Your journey to better email marketing starts here', fromName: 'Team EmailAI',
    fromEmail: 'hello@emailaipro.com',
    emailHtml: '<h1>Welcome aboard!</h1><p>We\'re thrilled to have you. Here\'s how to get started...</p>',
    aiGenerated: true, segmentId: 's3', segmentName: 'New Subscribers', isAbTest: false,
    status: 'sent', sentAt: '2024-01-10', recipientsCount: 342, sentCount: 342,
    deliveredCount: 338, openedCount: 245, clickedCount: 89, bouncedCount: 4,
    unsubscribedCount: 1, openRate: 72.5, clickRate: 26.3, revenueGenerated: 890.00, createdAt: '2024-01-09'
  },
  {
    id: 'camp3', name: 'Product Launch: AI Features', description: 'Announcing new AI-powered features',
    type: 'newsletter', subjectLine: '🚀 New AI Features Just Dropped — See What\'s New',
    previewText: 'We\'ve been busy building something incredible', fromName: 'EmailAI Pro',
    fromEmail: 'updates@emailaipro.com',
    emailHtml: '<h1>Introducing AI Email Generation</h1><p>Our latest features will transform your email marketing...</p>',
    aiGenerated: false, segmentId: 's5', segmentName: 'Engaged Openers', isAbTest: false,
    status: 'sent', sentAt: '2024-01-15', recipientsCount: 2156, sentCount: 2156,
    deliveredCount: 2134, openedCount: 812, clickedCount: 234, bouncedCount: 22,
    unsubscribedCount: 5, openRate: 37.6, clickRate: 10.8, revenueGenerated: 5670.00, createdAt: '2024-01-14'
  },
  {
    id: 'camp4', name: 'Win-Back: Inactive Users', description: 'Re-engagement campaign for churning customers',
    type: 'nurture', subjectLine: 'We miss you! Here\'s 20% off to come back 💔',
    previewText: 'It\'s been a while — let us make it up to you', fromName: 'EmailAI Pro',
    fromEmail: 'hello@emailaipro.com',
    emailHtml: '<h1>We Miss You!</h1><p>It\'s been a while since we\'ve seen you. Here\'s a special 20% discount just for you.</p>',
    aiGenerated: true, segmentId: 's2', segmentName: 'At-Risk Churning', isAbTest: false,
    status: 'scheduled', scheduledAt: '2024-01-25', recipientsCount: 456, sentCount: 0,
    deliveredCount: 0, openedCount: 0, clickedCount: 0, bouncedCount: 0,
    unsubscribedCount: 0, openRate: 0, clickRate: 0, revenueGenerated: 0, createdAt: '2024-01-20'
  },
  {
    id: 'camp5', name: 'Valentine\'s Day Special', description: 'Valentine\'s day promotional campaign',
    type: 'promotional', subjectLine: '💕 Spread the Love — Valentine\'s Day Specials Inside',
    previewText: 'Perfect gifts for that special someone', fromName: 'EmailAI Pro',
    fromEmail: 'marketing@emailaipro.com',
    emailHtml: '<h1>Valentine\'s Day Sale</h1><p>Find the perfect gift with our curated selection.</p>',
    aiGenerated: true, isAbTest: false,
    status: 'draft', recipientsCount: 0, sentCount: 0,
    deliveredCount: 0, openedCount: 0, clickedCount: 0, bouncedCount: 0,
    unsubscribedCount: 0, openRate: 0, clickRate: 0, revenueGenerated: 0, createdAt: '2024-01-22'
  },
  {
    id: 'camp6', name: 'Abandoned Cart Recovery', description: 'Automated abandoned cart email',
    type: 'abandoned_cart', subjectLine: 'You left something behind! Complete your order 🛒',
    previewText: 'Your cart is waiting for you', fromName: 'EmailAI Pro',
    fromEmail: 'orders@emailaipro.com',
    emailHtml: '<h1>Don\'t Forget!</h1><p>You have items waiting in your cart. Complete your purchase now.</p>',
    aiGenerated: true, isAbTest: true,
    abVariants: [
      { id: 'v3', name: 'Urgency', subjectLine: '⏰ Your cart expires soon!', percentage: 50, openRate: 41.3, clickRate: 12.7 },
      { id: 'v4', name: 'Friendly', subjectLine: 'Still thinking about it? We saved your cart 🛒', percentage: 50, openRate: 38.9, clickRate: 11.2 }
    ],
    status: 'sent', sentAt: '2024-01-18', recipientsCount: 892, sentCount: 892,
    deliveredCount: 880, openedCount: 358, clickedCount: 108, bouncedCount: 12,
    unsubscribedCount: 3, openRate: 40.1, clickRate: 12.1, revenueGenerated: 8920.00, createdAt: '2024-01-17'
  }
];

export const mockTemplates: Template[] = [
  {
    id: 't1', name: 'Welcome Email', description: 'Clean welcome email for new subscribers',
    category: 'welcome', subjectLine: 'Welcome to {{company_name}}!',
    previewText: 'We\'re excited to have you on board',
    emailHtml: '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif"><div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0">Welcome! 👋</h1></div><div style="padding:30px;background:white"><p>Hi {{first_name}},</p><p>Welcome to {{company_name}}! We\'re thrilled to have you join us.</p><a href="#" style="display:inline-block;background:#6366f1;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;margin:20px 0">Get Started</a></div></div>',
    thumbnail: '🎉', useCount: 234, createdAt: '2023-10-01'
  },
  {
    id: 't2', name: 'Flash Sale', description: 'Eye-catching promotional template for flash sales',
    category: 'promotional', subjectLine: '🔥 Flash Sale — {{discount}}% Off!',
    previewText: 'Limited time offer inside',
    emailHtml: '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif"><div style="background:linear-gradient(135deg,#ef4444,#f97316);padding:40px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0;font-size:36px">🔥 FLASH SALE</h1><p style="color:white;font-size:48px;font-weight:bold;margin:10px 0">{{discount}}% OFF</p></div><div style="padding:30px;background:white"><p>Hey {{first_name}},</p><p>Our biggest sale of the season is here. Don\'t miss out!</p><a href="#" style="display:inline-block;background:#ef4444;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin:20px 0">Shop Now</a></div></div>',
    thumbnail: '🔥', useCount: 567, createdAt: '2023-10-15'
  },
  {
    id: 't3', name: 'Newsletter', description: 'Clean newsletter template with sections',
    category: 'newsletter', subjectLine: '📬 This Week at {{company_name}}',
    previewText: 'Your weekly roundup is here',
    emailHtml: '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif"><div style="background:#1e1b4b;padding:30px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0">📬 Weekly Newsletter</h1></div><div style="padding:30px;background:white"><h2>Top Stories This Week</h2><p>Here\'s what\'s been happening...</p><hr style="border:1px solid #e5e7eb;margin:20px 0"><h2>Product Updates</h2><p>Check out our latest features...</p></div></div>',
    thumbnail: '📬', useCount: 890, createdAt: '2023-09-20'
  },
  {
    id: 't4', name: 'Abandoned Cart', description: 'Cart recovery email with product images',
    category: 'transactional', subjectLine: 'You forgot something! 🛒',
    previewText: 'Complete your purchase before items sell out',
    emailHtml: '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif"><div style="background:#f59e0b;padding:30px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0">🛒 Your Cart Misses You</h1></div><div style="padding:30px;background:white"><p>Hi {{first_name}},</p><p>You left some great items in your cart. Complete your purchase before they\'re gone!</p><a href="#" style="display:inline-block;background:#f59e0b;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin:20px 0">Complete Purchase</a></div></div>',
    thumbnail: '🛒', useCount: 432, createdAt: '2023-11-05'
  },
  {
    id: 't5', name: 'Win-Back', description: 'Re-engagement email for inactive subscribers',
    category: 'nurture', subjectLine: 'We miss you, {{first_name}} 💔',
    previewText: 'Come back and enjoy an exclusive offer',
    emailHtml: '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif"><div style="background:linear-gradient(135deg,#ec4899,#8b5cf6);padding:40px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0">We Miss You! 💔</h1></div><div style="padding:30px;background:white"><p>Hey {{first_name}},</p><p>It\'s been a while! We\'d love to see you again. Here\'s a special offer just for you.</p><a href="#" style="display:inline-block;background:#8b5cf6;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;margin:20px 0">Claim Your Offer</a></div></div>',
    thumbnail: '💔', useCount: 198, createdAt: '2023-11-20'
  },
  {
    id: 't6', name: 'Product Launch', description: 'Exciting product launch announcement',
    category: 'promotional', subjectLine: '🚀 Introducing {{product_name}} — The Future is Here',
    previewText: 'Be the first to experience something incredible',
    emailHtml: '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif"><div style="background:linear-gradient(135deg,#06b6d4,#3b82f6);padding:40px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0">🚀 Just Launched!</h1><p style="color:rgba(255,255,255,0.9);font-size:18px">The product you\'ve been waiting for</p></div><div style="padding:30px;background:white"><p>Hi {{first_name}},</p><p>We\'re incredibly excited to announce our newest product. It\'s been months in the making, and we can\'t wait for you to try it.</p><a href="#" style="display:inline-block;background:#3b82f6;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin:20px 0">Learn More</a></div></div>',
    thumbnail: '🚀', useCount: 321, createdAt: '2023-12-01'
  }
];

export const mockIntegrations: Integration[] = [
  { id: 'i1', provider: 'mailchimp', name: 'Mailchimp', description: 'Connect your Mailchimp account to sync contacts and send campaigns', icon: '📧', isActive: true, isConnected: true, lastSynced: '2024-01-20T14:30:00Z', contactsSynced: 2847 },
  { id: 'i2', provider: 'sendgrid', name: 'SendGrid', description: 'Use SendGrid\'s powerful API for reliable email delivery', icon: '📨', isActive: false, isConnected: false },
  { id: 'i3', provider: 'klaviyo', name: 'Klaviyo', description: 'Sync with Klaviyo for advanced e-commerce email automation', icon: '🎯', isActive: false, isConnected: false },
  { id: 'i4', provider: 'aws_ses', name: 'Amazon SES', description: 'Cost-effective email sending with Amazon Simple Email Service', icon: '☁️', isActive: false, isConnected: false }
];

export const mockAnalytics: AnalyticsData[] = [
  { date: 'Jan 1', sent: 450, opened: 180, clicked: 45, revenue: 1200 },
  { date: 'Jan 3', sent: 0, opened: 12, clicked: 3, revenue: 150 },
  { date: 'Jan 5', sent: 1847, opened: 631, clicked: 149, revenue: 12450 },
  { date: 'Jan 7', sent: 0, opened: 45, clicked: 12, revenue: 800 },
  { date: 'Jan 9', sent: 342, opened: 245, clicked: 89, revenue: 890 },
  { date: 'Jan 11', sent: 0, opened: 32, clicked: 8, revenue: 340 },
  { date: 'Jan 13', sent: 0, opened: 18, clicked: 5, revenue: 220 },
  { date: 'Jan 15', sent: 2156, opened: 812, clicked: 234, revenue: 5670 },
  { date: 'Jan 17', sent: 892, opened: 358, clicked: 108, revenue: 8920 },
  { date: 'Jan 19', sent: 0, opened: 120, clicked: 35, revenue: 1500 },
  { date: 'Jan 21', sent: 234, opened: 98, clicked: 28, revenue: 980 },
  { date: 'Jan 23', sent: 0, opened: 42, clicked: 11, revenue: 450 },
];

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 12847,
  totalCampaigns: 48,
  avgOpenRate: 38.4,
  avgClickRate: 11.2,
  totalRevenue: 142580,
  activeSegments: 5,
  emailsSentToday: 1234,
  growthRate: 12.5
};

export const campaignTypeLabels: Record<string, string> = {
  welcome: 'Welcome',
  promotional: 'Promotional',
  nurture: 'Nurture',
  abandoned_cart: 'Abandoned Cart',
  newsletter: 'Newsletter'
};

export const campaignTypeColors: Record<string, string> = {
  welcome: 'bg-green-100 text-green-700',
  promotional: 'bg-orange-100 text-orange-700',
  nurture: 'bg-blue-100 text-blue-700',
  abandoned_cart: 'bg-amber-100 text-amber-700',
  newsletter: 'bg-purple-100 text-purple-700'
};

export const statusColors: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  scheduled: 'bg-blue-100 text-blue-700',
  sending: 'bg-yellow-100 text-yellow-700',
  sent: 'bg-green-100 text-green-700',
  paused: 'bg-red-100 text-red-600'
};
