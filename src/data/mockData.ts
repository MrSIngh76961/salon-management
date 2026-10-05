import {
  QuickFeature,
  HowItWorksStep,
  StatItem,
  ServiceItem,
  StylistItem,
  CalendarAppointment,
  StaffScheduleItem,
  CustomerCRMRecord,
  FeatureGridItem,
  TestimonialItem,
  PricingPlan,
  FAQItem,
  NavItem,
} from '@/types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Booking', href: '#booking' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO_TRUST_BADGES = [
  { label: '24/7 Online Booking', icon: 'CalendarDays' },
  { label: 'Automated Reminders', icon: 'Bell' },
  { label: 'Staff Management', icon: 'Users' },
  { label: 'Reports & Analytics', icon: 'BarChart3' },
];

export const QUICK_FEATURES: QuickFeature[] = [
  {
    id: 'booking',
    title: 'Online Booking',
    description: 'Clients can book appointments 24/7 from any device without calling.',
    icon: 'Calendar',
  },
  {
    id: 'reminders',
    title: 'Smart Reminders',
    description: 'Automated email, SMS and push notifications reduce no-shows by 65%.',
    icon: 'Bell',
  },
  {
    id: 'staff',
    title: 'Staff Management',
    description: 'Set working hours, manage stylists and track calendars easily in real-time.',
    icon: 'Users',
  },
  {
    id: 'reports',
    title: 'Dashboard & Reports',
    description: 'Get deep insights on bookings, revenue, staff performance and client retention.',
    icon: 'BarChart2',
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: '1',
    title: 'Book',
    description: 'Clients choose service, stylist, date & time online seamlessly.',
    icon: 'Calendar',
  },
  {
    stepNumber: '2',
    title: 'Confirm',
    description: 'Appointment is confirmed instantly with automated notifications.',
    icon: 'Bell',
  },
  {
    stepNumber: '3',
    title: 'Manage',
    description: 'Salon staff manage schedules, shifts, and client appointments.',
    icon: 'UserCheck',
  },
  {
    stepNumber: '4',
    title: 'Grow',
    description: 'Happy clients, fewer no-shows, and more business for your salon.',
    icon: 'TrendingUp',
  },
];

export const SOCIAL_PROOF_STATS: StatItem[] = [
  {
    value: '500+',
    label: 'Salons Trust Us',
    icon: 'Users',
    trend: '+45% YoY growth',
  },
  {
    value: '50K+',
    label: 'Appointments Booked Monthly',
    icon: 'Calendar',
    trend: '99.98% uptime',
  },
  {
    value: '98%',
    label: 'Client Satisfaction',
    icon: 'Smile',
    trend: '4.9/5 average rating',
  },
  {
    value: '30%',
    label: 'Increase in Bookings',
    icon: 'TrendingUp',
    trend: 'Within first 60 days',
  },
];

export const WHY_CHOOSE_US_POINTS = [
  'Easy to use for both you and your clients',
  'Reduce no-shows with smart reminders',
  'Staff schedules and availability in one place',
  'Gain valuable insights and grow revenue',
];

export const SAMPLE_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    name: 'Precision Haircut & Style',
    duration: '45 mins',
    price: 65,
    category: 'Hair',
    description: 'Personalized consultation, luxury hair wash, custom cut, and blowout finish.',
  },
  {
    id: 's2',
    name: 'Balayage & Gloss Finish',
    duration: '150 mins',
    price: 195,
    category: 'Color',
    description: 'Hand-painted sun-kissed dimension with custom toner glaze and bond builder.',
  },
  {
    id: 's3',
    name: 'Hydrating Botanical Facial',
    duration: '60 mins',
    price: 95,
    category: 'Skin',
    description: 'Deep pore cleansing, steam extraction, hyaluronic acid infusion, and lymphatic massage.',
  },
  {
    id: 's4',
    name: 'Deluxe Spa Manicure & Pedicure',
    duration: '75 mins',
    price: 80,
    category: 'Nails',
    description: 'Aromatherapy soak, cuticle refinement, organic scrub, and long-wear gel finish.',
  },
  {
    id: 's5',
    name: 'Bridal & Editorial Makeup',
    duration: '90 mins',
    price: 130,
    category: 'Makeup',
    description: 'Full HD glam with lash application, contouring, and 16-hour setting veil.',
  },
];

export const SAMPLE_STYLISTS: StylistItem[] = [
  {
    id: 'st1',
    name: 'Elena Rostova',
    role: 'Master Creative Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 312,
    specialties: ['Balayage', 'Creative Cuts', 'Extensions'],
  },
  {
    id: 'st2',
    name: 'Marcus Vance',
    role: 'Senior Color Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 240,
    specialties: ['Color Correction', 'Vivids', 'Styling'],
  },
  {
    id: 'st3',
    name: 'Chloe Dubois',
    role: 'Lead Esthetician & Nails',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 185,
    specialties: ['HydraFacial', 'Gel Extensions', 'Lash Lift'],
  },
];

export const CALENDAR_APPOINTMENTS: CalendarAppointment[] = [
  {
    id: 'apt-1',
    clientName: 'Sophia Martinez',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    service: 'Balayage & Blowdry',
    stylistName: 'Elena Rostova',
    time: '09:30 AM',
    duration: '2h 15m',
    status: 'In Progress',
    price: 195,
  },
  {
    id: 'apt-2',
    clientName: 'Alexander Hayes',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    service: 'Men\'s Executive Cut',
    stylistName: 'Marcus Vance',
    time: '10:00 AM',
    duration: '45m',
    status: 'Checked-in',
    price: 65,
  },
  {
    id: 'apt-3',
    clientName: 'Jessica Taylor',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    service: 'Botanical Hydrafacial',
    stylistName: 'Chloe Dubois',
    time: '11:15 AM',
    duration: '1h 00m',
    status: 'Confirmed',
    price: 95,
  },
  {
    id: 'apt-4',
    clientName: 'Emma Watson',
    clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    service: 'Full Highlights & Tone',
    stylistName: 'Elena Rostova',
    time: '01:00 PM',
    duration: '2h 30m',
    status: 'Confirmed',
    price: 220,
  },
  {
    id: 'apt-5',
    clientName: 'David Kim',
    clientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    service: 'Beard Sculpt & Fade',
    stylistName: 'Marcus Vance',
    time: '02:00 PM',
    duration: '45m',
    status: 'Pending',
    price: 55,
  },
  {
    id: 'apt-6',
    clientName: 'Rachel Green',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    service: 'Spa Pedicure + Gel',
    stylistName: 'Chloe Dubois',
    time: '03:15 PM',
    duration: '1h 15m',
    status: 'Completed',
    price: 80,
  },
];

export const STAFF_MEMBERS: StaffScheduleItem[] = [
  {
    id: 'sm1',
    name: 'Elena Rostova',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    shifts: 'Tue - Sat (9:00 AM - 6:00 PM)',
    hoursWorked: 38.5,
    utilization: 94,
    assignedServices: ['Balayage', 'Precision Cuts', 'Tape-in Extensions'],
    status: 'In Session',
  },
  {
    id: 'sm2',
    name: 'Marcus Vance',
    role: 'Master Colorist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    shifts: 'Mon - Fri (10:00 AM - 7:00 PM)',
    hoursWorked: 36.0,
    utilization: 88,
    assignedServices: ['Color Melt', 'Vivid Tones', 'Gloss & Toner'],
    status: 'Available',
  },
  {
    id: 'sm3',
    name: 'Chloe Dubois',
    role: 'Skin & Nail Specialist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    shifts: 'Wed - Sun (9:00 AM - 5:00 PM)',
    hoursWorked: 32.0,
    utilization: 91,
    assignedServices: ['Facials', 'Gel Nail Art', 'Eyebrow Shaping'],
    status: 'In Session',
  },
  {
    id: 'sm4',
    name: 'Julian Reed',
    role: 'Junior Stylist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    shifts: 'Mon - Thu (11:00 AM - 8:00 PM)',
    hoursWorked: 28.0,
    utilization: 75,
    assignedServices: ['Blowouts', 'Root Touchups', 'Deep Conditioning'],
    status: 'On Break',
  },
];

export const SAMPLE_CUSTOMER_CRM: CustomerCRMRecord = {
  id: 'crm-904',
  name: 'Sophia Martinez',
  email: 'sophia.m@luxurybeauty.io',
  phone: '+1 (555) 392-8841',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  totalSpent: 2450,
  visitsCount: 14,
  lastVisit: 'Aug 14, 2026',
  nextAppointment: 'Today at 09:30 AM',
  favoriteStylist: 'Elena Rostova',
  formulaNotes: 'Redken Shades EQ: 09P (1oz) + 09V (0.5oz) + Crystal Clear (0.5oz). 20 Vol developer on base.',
  preferences: ['Prefers iced oat latte with cinnamon', 'Low conversation / silent appointment', 'Allergic to synthetic fragrance oils'],
  isVip: true,
};

export const AUTOMATED_NOTIFICATIONS_DATA = [
  {
    id: 'notif-1',
    channel: 'SMS Reminder',
    icon: 'MessageSquare',
    time: '24 hours before',
    title: 'Smart 24h SMS Confirmation',
    preview: 'Hi Sophia! Your Balayage appointment with Elena is tomorrow at 9:30 AM at SalonPro Luxe. Reply 1 to Confirm or 2 to Reschedule.',
    status: 'Delivered • Confirmed via SMS',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'notif-2',
    channel: 'Email Confirmation',
    icon: 'Mail',
    time: 'Instant on booking',
    title: 'Rich Branded Booking Confirmation',
    preview: 'Calendar invite attached (.ics), parking instructions, prep guide for color treatments, and one-click add to Apple Wallet.',
    status: 'Opened (98% open rate)',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 'notif-3',
    channel: 'Push Notification',
    icon: 'Smartphone',
    time: '2 hours before',
    title: 'Live Stylist Ready Alert',
    preview: 'Elena is ready for you! Tap here for curbside check-in and complimentary drink pre-order.',
    status: 'Sent to Client App',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  },
  {
    id: 'notif-4',
    channel: 'Automated Review Request',
    icon: 'Star',
    time: '1 hour after checkout',
    title: 'Post-Visit Google Review Booster',
    preview: 'How was your experience today? Rate Elena to automatically post to Google Maps and unlock 100 VIP reward points.',
    status: 'Automated 5★ Generator',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
];

export const FEATURES_GRID_ITEMS: FeatureGridItem[] = [
  {
    id: 'feat-1',
    title: '24/7 Self-Service Booking',
    description: 'Empower clients to book, reschedule, or cancel on web, mobile, Instagram, and Google Maps without phone tag.',
    icon: 'CalendarCheck2',
    badge: 'Core Engine',
  },
  {
    id: 'feat-2',
    title: 'Smart Multi-Column Calendar',
    description: 'Visual appointment grid with color-coded statuses, drag-and-drop rescheduling, and double-booking prevention.',
    icon: 'CalendarDays',
    badge: 'Zero Conflicts',
  },
  {
    id: 'feat-3',
    title: 'Staff Scheduling & Commission',
    description: 'Easily manage shift rosters, vacation leaves, chair rentals, and automated split tier commission calculations.',
    icon: 'Users',
    badge: 'Automated Payroll',
  },
  {
    id: 'feat-4',
    title: 'Client CRM & Color History',
    description: 'Keep detailed client records, allergy warnings, photo portfolios, patch test dates, and precise color dye formulas.',
    icon: 'UserCheck',
    badge: 'VIP Retention',
  },
  {
    id: 'feat-5',
    title: 'Multi-Channel Automated Reminders',
    description: 'Send custom branded SMS, WhatsApp, and email alerts that drop salon no-shows to under 2% automatically.',
    icon: 'BellRing',
    badge: 'Saves 15 hrs/wk',
  },
  {
    id: 'feat-6',
    title: 'Integrated Billing & Tap-to-Pay',
    description: 'Accept credit cards, Apple Pay, deposits for high-ticket services, no-show protection fees, and split tips.',
    icon: 'CreditCard',
    badge: 'Instant Payouts',
  },
  {
    id: 'feat-7',
    title: 'Real-Time Financial Reports',
    description: 'Live visibility into net revenue, average ticket size, retail product sales, stylist productivity, and profit margins.',
    icon: 'BarChart4',
    badge: 'Actionable Data',
  },
  {
    id: 'feat-8',
    title: 'Multi-Location Enterprise Hub',
    description: 'Manage multiple salon branches, shared client profiles, centralized inventory, and franchised permission roles.',
    icon: 'Building2',
    badge: 'Franchise Ready',
  },
  {
    id: 'feat-9',
    title: 'Inventory & Barcode Tracking',
    description: 'Track backbar usage vs retail shelves. Get automated low-stock reorder alerts before you run out of essential color developer.',
    icon: 'PackageCheck',
    badge: 'Stock Control',
  },
  {
    id: 'feat-10',
    title: 'Granular Role-Based Access',
    description: 'Strict privacy controls. Give receptionists, apprentices, and stylists only the permissions they need without exposing sensitive ledger financials.',
    icon: 'ShieldCheck',
    badge: 'Bank-Grade Security',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Isabella Fontaine',
    role: 'Founder & Creative Lead',
    salonName: 'Maison de Beauté',
    location: 'SoHo, New York',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Switching to Aurevia reduced our salon no-shows from 18% down to almost zero within the first month. Our 12 stylists love the mobile calendar and our clients rave about how effortless online booking is.',
    metrics: '+34% Monthly Revenue Boost',
  },
  {
    id: 'test-2',
    name: 'Dominic Sterling',
    role: 'Managing Director',
    salonName: 'The Barber & Parlour Co.',
    location: 'Austin, Texas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'We manage three bustling locations with over 28 chairs. Aurevia is the only platform that handled our complex multi-staff commission tiers and inventory without breaking a sweat.',
    metrics: 'Saved 22 Hours Every Week',
  },
  {
    id: 'test-3',
    name: 'Camila Rodriguez',
    role: 'Owner & Master Esthetician',
    salonName: 'Lumière Skin & Lash Bar',
    location: 'Miami, Florida',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'The CRM formula and client preference notes are a game changer. When a client walks in, we immediately know their favorite beverage, color formulation, and past treatment history.',
    metrics: '98% Client Retention Rate',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for independent stylists, solo estheticians, and boutique single-chair studios.',
    monthlyPrice: 29,
    annualPrice: 24,
    features: [
      '1 Stylist / Staff Calendar',
      'Unlimited Online Bookings',
      'Automated SMS & Email Reminders',
      'Client CRM & History Notes',
      'Mobile App for iOS & Android',
      'Basic Financial Reports',
      'Card Processing & Deposit Collection',
    ],
    ctaText: 'Start 14-Day Free Trial',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Our most popular plan for established salons, spas, and growing creative teams.',
    monthlyPrice: 79,
    annualPrice: 65,
    popular: true,
    features: [
      'Up to 10 Stylists & Staff Members',
      'Everything in Starter Plan',
      'Advanced Multi-Column Roster',
      'Staff Commission & Split Pay Engine',
      'Inventory & Low-Stock Alerts',
      'Instagram & Google Booking Integration',
      'Two-Way SMS Client Chat',
      'Deposit & No-Show Protection Fees',
      'Priority 24/7 Phone & Chat Support',
    ],
    ctaText: 'Start Free Trial — Most Popular',
  },
  {
    id: 'business',
    name: 'Business / Enterprise',
    description: 'Built for high-volume luxury salons, chains, and multi-location beauty franchises.',
    monthlyPrice: 149,
    annualPrice: 120,
    features: [
      'Unlimited Stylists & Staff',
      'Everything in Professional Plan',
      'Multi-Location Central Hub',
      'Custom Role Permissions & Audit Logs',
      'Custom Branded Client Mobile App',
      'Enterprise API & Webhooks',
      'Dedicated Account Manager',
      'Custom Onboarding & Data Migration',
      'Custom SLA & 99.99% Uptime Guarantee',
    ],
    ctaText: 'Contact Enterprise Sales',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is Aurevia?',
    answer:
      'Aurevia is an all-in-one B2B SaaS operations and scheduling platform built specifically for modern salons, spas, barbershops, and beauty studios. It unifies 24/7 online booking, multi-column staff scheduling, client CRM & formula tracking, automated SMS/email reminders, contactless payments, and business analytics into one seamless, elegant system.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! We offer a full 14-day free trial on all plans with zero restrictions. No credit card is required to sign up. You can set up your service menu, invite your team, and test online booking immediately.',
  },
  {
    question: 'How does online booking work?',
    answer:
      'Aurevia gives you a custom branded booking link that you can share anywhere — on your website, Instagram bio, TikTok, Facebook, and Google Maps Reserve with Google. Clients select their service, choose their preferred stylist, pick an available slot matching real-time availability, and receive instant confirmation.',
  },
  {
    question: 'How do automated reminders work?',
    answer:
      'Our intelligent messaging engine automatically sends personalized SMS, WhatsApp, and email reminders at customizable intervals (e.g., 48 hours and 24 hours before the appointment). Clients can confirm or request a reschedule directly from the message, which updates your live calendar instantly.',
  },
  {
    question: 'Can customers book from mobile?',
    answer:
      'Absolutely! The Aurevia booking widget is 100% mobile-optimized, lightning fast, and works seamlessly on iPhones, Android devices, and tablets without requiring clients to download any bulky apps.',
  },
  {
    question: 'Can I manage multiple salon locations?',
    answer:
      'Yes. Our Business and Enterprise plans allow you to oversee multiple branch locations under one master account. You can switch between salon branches, maintain unified client profiles across locations, transfer staff, and review consolidated financial reports.',
  },
  {
    question: 'What user roles and permissions are supported?',
    answer:
      'Aurevia includes granular role-based access control. You can configure custom roles such as Salon Owner, Location Manager, Receptionist, Senior Stylist, Junior Stylist, or Booth Renter. You can restrict staff from viewing full revenue ledgers, contact databases, or editing other stylists’ schedules.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no lock-in contracts or cancellation penalties. You can upgrade, downgrade, or cancel your subscription at any time directly from your billing portal with one click.',
  },
];
