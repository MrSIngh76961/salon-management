import { PlatformSubscriptionPlan } from '@/types/admin';

export const PLATFORM_SUBSCRIPTIONS: PlatformSubscriptionPlan[] = [
  {
    id: 'sub-starter',
    tier: 'Starter',
    name: 'Starter Studio',
    monthlyPrice: 49,
    yearlyPrice: 470,
    activeCount: 42,
    trialCount: 6,
    features: [
      'Up to 3 Stylists & Staff Chairs',
      'Unlimited Appointments',
      'Client SMS Reminders (500/mo)',
      'Basic Performance Reports',
      'Standard Online Booking Link',
    ],
  },
  {
    id: 'sub-pro',
    tier: 'Professional',
    name: 'Professional Salon',
    monthlyPrice: 99,
    yearlyPrice: 950,
    activeCount: 68,
    trialCount: 12,
    features: [
      'Up to 10 Stylists & Staff Chairs',
      'Multi-Staff Floor Calendar',
      'Client CRM & Visit History',
      'Automated SMS & Email Marketing',
      'Inventory & Backbar Supply Alerts',
      'Custom Brand Subdomain',
    ],
  },
  {
    id: 'sub-biz',
    tier: 'Business',
    name: 'Enterprise / Multi-Chair',
    monthlyPrice: 199,
    yearlyPrice: 1900,
    activeCount: 32,
    trialCount: 4,
    features: [
      'Unlimited Stylists & Locations',
      'Full Floor Manager & Receptionist Portals',
      'Advanced BI & Financial Forecasting',
      'Priority 24/7 Dedicated Account Rep',
      'Custom API & Webhook Integrations',
    ],
  },
];
