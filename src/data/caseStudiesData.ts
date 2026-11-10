export interface CaseStudyQuickFact {
  label: string;
  value: string;
}

export interface CaseStudyFeatureCard {
  iconName: 'bar-chart' | 'calendar' | 'message' | 'lock' | 'home' | 'smartphone' | 'sparkles' | 'shield' | 'layers' | 'trending-up' | 'file-text' | 'eye' | 'users' | 'check';
  title: string;
  description: string;
}

export interface CaseStudyScreenshot {
  url: string;
  caption: string;
}

export interface CaseStudyResultMetric {
  label: string;
  value: string;
}

export interface CaseStudyItem {
  id: string; // matches portfolio card id
  number: string;
  title: string;
  tagline: string;
  badge: string;
  category: string;
  type: 'product' | 'project';
  isAiPowered?: boolean;
  domain: string;
  liveUrl: string;
  heroScreenshot: string;

  // 1. Overview
  whatItIs: string;
  whoItsFor: string;
  quickFacts: CaseStudyQuickFact[];

  // 2. The Problem
  theProblem: string;

  // 3. Our Solution
  ourSolution: string;

  // 4. Key Features (icon cards)
  keyFeatures: CaseStudyFeatureCard[];

  // 5. Screenshots (carousel with captions)
  screenshots: CaseStudyScreenshot[];

  // 6. Results (hide if empty)
  results?: {
    headline: string;
    metrics: CaseStudyResultMetric[];
  };
}

export const CASE_STUDIES_DATA: Record<string, CaseStudyItem> = {
  'crm-pro': {
    id: 'crm-pro',
    number: '01',
    title: 'CRM Pro — Access Management',
    tagline: 'Zero-friction workforce tracking with automated payroll sync',
    badge: 'SaaS Product • Axiino In-House',
    category: 'Enterprise SaaS & Workforce Intelligence',
    type: 'product',
    isAiPowered: true,
    domain: 'crm.axiino.com',
    liveUrl: 'https://crm.axiino.com/attendance',
    heroScreenshot: '/screenshots/crm-axiino.jpg',

    whatItIs:
      'An all-in-one workspace and CRM platform engineered by Axiino for modern enterprise operations. It consolidates live employee attendance logging, shift compliance, sales pipeline leaderboards, and instant team chat into one unified interface.',
    whoItsFor:
      'Companies, operational leaders, and HR teams looking to monitor sales performance, attendance compliance, and staff operations in one place without spreadsheet chaos.',
    quickFacts: [
      { label: 'Platform Type', value: 'Enterprise SaaS' },
      { label: 'Core Focus', value: 'Attendance & CRM Sync' },
      { label: 'Deployment', value: 'Cloud & Dockerized' },
      { label: 'Sync Rate', value: 'Real-Time Live Feed' },
    ],

    theProblem:
      'Traditional employee registers, paper punch-cards, and disconnected chat tools lead to buddy-punching, lost billable hours, and days spent manually reconciling payroll every single month. Managers lacked real-time visibility into who was on-shift or late.',
    ourSolution:
      'Axiino engineered a high-speed digital punch clock and operations dashboard. We implemented automated shift anomaly detection, late check-in alerts, one-click attendance correction approvals, and an integrated sales leaderboard so teams manage work and performance under one login.',

    keyFeatures: [
      {
        iconName: 'bar-chart',
        title: 'Sales Leaderboard & Analytics',
        description: 'Track closed deals, pipeline volume, and individual sales rep performance in real-time.',
      },
      {
        iconName: 'calendar',
        title: 'Attendance & Leave Portal',
        description: 'Digital shift check-ins with tamper-proof timestamps, automated late marking, and instant leave requests.',
      },
      {
        iconName: 'message',
        title: 'Integrated Team Chat Room',
        description: 'Direct intra-company communication rooms to coordinate client deliverables without switching apps.',
      },
      {
        iconName: 'trending-up',
        title: 'Automated Payroll Prep',
        description: 'Automatically calculates work hours, overtime, and deductions, reducing monthly payroll reconciliation to minutes.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/crm-axiino.jpg',
        caption: 'Attendance Dashboard: Real-time shift status, monthly attendance logs, and one-click shift extensions.',
      },
    ],

    results: {
      headline: 'Centralized sales tracking and streamlined workforce management up to 10x faster',
      metrics: [
        { label: 'Payroll Prep', value: '10x Faster' },
        { label: 'Time Theft', value: '0%' },
        { label: 'Data Accuracy', value: '100%' },
      ],
    },
  },

  'sr-dollars': {
    id: 'sr-dollars',
    number: '02',
    title: 'SR Dollars & Builders',
    tagline: 'Dynamic property listing and modern construction showcase',
    badge: 'Client Platform • Real Estate',
    category: 'Real Estate & Construction Web Platform',
    type: 'project',
    isAiPowered: false,
    domain: 'srdollarsandbuilders.com',
    liveUrl: 'https://srdollarsandbuilders.com/',
    heroScreenshot: '/screenshots/sr-dollars.jpg',

    whatItIs:
      'A dedicated commercial real estate portal where prospective property buyers browse available residential plots and buildings, and the builder’s internal team can publish new developments directly without code.',
    whoItsFor:
      'Property buyers, real estate investors, and the builder’s administrative sales team that manages active listings.',
    quickFacts: [
      { label: 'Platform Type', value: 'Commercial Property Web App' },
      { label: 'Industry', value: 'Real Estate & Infrastructure' },
      { label: 'Listing Engine', value: 'Self-Serve Team Admin' },
      { label: 'Inquiries', value: 'Instant Direct Dispatch' },
    ],

    theProblem:
      'Real estate developers often suffer from static websites and expensive third-party web agencies every time a new layout or plot goes on sale. Prospective buyers browsing on mobile found old listings difficult to navigate, causing lost sales leads.',
    ourSolution:
      'Axiino built an ultra-fast, mobile-first showcase platform with an intuitive listing upload workflow that enables the builder’s staff to publish plot specs and photos in minutes, funnelling interested buyers into direct WhatsApp and phone enquiries.',

    keyFeatures: [
      {
        iconName: 'home',
        title: 'Easy Listing Upload',
        description: 'Staff can upload plot dimensions, pricing, and project updates directly without agency intervention.',
      },
      {
        iconName: 'eye',
        title: 'High-Definition Property Showcase',
        description: 'Interactive layout presentations, site photos, and amenity highlights formatted for rapid browsing.',
      },
      {
        iconName: 'smartphone',
        title: 'Mobile-Optimized Buyer Experience',
        description: 'Blazing-fast responsive performance ensuring seamless browsing across smartphones, tablets, and desktops.',
      },
      {
        iconName: 'message',
        title: 'Instant Inquiry Routing',
        description: 'Direct one-tap connection connecting potential property buyers directly to sales representatives.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/sr-dollars.jpg',
        caption: 'Property Showcase: Modern listing gallery presenting residential layouts, amenities, and builder credentials.',
      },
    ],
    // results is empty -> automatically hidden
  },

  's2s-matrimony': {
    id: 's2s-matrimony',
    number: '03',
    title: 'S2S Matrimony',
    tagline: 'Community matchmaking platform trusted by 50,000+ members',
    badge: 'Client Platform • AI Matchmaking',
    category: 'High-Scale Consumer Platform & AI Matchmaking',
    type: 'project',
    isAiPowered: true,
    domain: 's2smatrimony.com',
    liveUrl: 'https://s2smatrimony.com/',
    heroScreenshot: '/screenshots/s2s-matrimony.jpg',

    whatItIs:
      'A trusted community matrimony ecosystem that connects eligible individuals and families through verified member profiles and automated astrological compatibility analysis.',
    whoItsFor:
      'Families, community members, and individuals seeking a compatible life partner within secure, verified community networks.',
    quickFacts: [
      { label: 'Member Base', value: '50,000+ Active Members' },
      { label: 'Communities', value: '200+ Regional Communities' },
      { label: 'Match Engine', value: 'AI Horoscope Compatibility' },
      { label: 'Verification', value: 'Multi-Tier Identity Checks' },
    ],

    theProblem:
      'Generic matrimony portals suffer from unverified fake profiles, invasive privacy risks, and irrelevant match suggestions that frustrate families and compromise candidate safety. Manual horoscope matching took days of back-and-forth.',
    ourSolution:
      'Axiino engineered a secure, community-first web platform featuring an AI horoscope-matching algorithm that calculates astrological harmony in seconds, alongside smart profile data extraction and granular privacy controls.',

    keyFeatures: [
      {
        iconName: 'sparkles',
        title: 'AI Horoscope Matching',
        description: 'Automated astrological compatibility and birth chart calculations delivered instantly upon profile review.',
      },
      {
        iconName: 'file-text',
        title: 'Smart Profile Data Extraction',
        description: 'Intelligent profile onboarding that extracts biodata accurately to reduce manual profile creation steps.',
      },
      {
        iconName: 'shield',
        title: 'Verified Member Network',
        description: 'Stringent multi-tier verification ensuring real, family-backed accounts and eliminating impersonation.',
      },
      {
        iconName: 'users',
        title: 'Community-First Privacy',
        description: 'Granular phone and photo visibility controls that keep member details secure until mutual interest is confirmed.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/s2s-matrimony.jpg',
        caption: 'Verified Member Portal: Personalized recommendation feed with automated compatibility ratings.',
      },
    ],

    results: {
      headline: 'Trusted by 50,000+ members with over 200 communities connected',
      metrics: [
        { label: 'Active Members', value: '50,000+' },
        { label: 'Communities', value: '200+' },
        { label: 'Match Confidence', value: '85%+' },
      ],
    },
  },

  'umshiv-group': {
    id: 'umshiv-group',
    number: '04',
    title: 'UMSHIV Group',
    tagline: 'Unified corporate presence uniting travel, branding, and events',
    badge: 'Client Platform • Corporate Conglomerate',
    category: 'Corporate Conglomerate Web Platform',
    type: 'project',
    isAiPowered: false,
    domain: 'umshiv.com',
    liveUrl: 'https://www.umshiv.com/',
    heroScreenshot: '/screenshots/umshiv-group.jpg',

    whatItIs:
      'The official high-prestige digital headquarters that showcases all of UMSHIV Group’s enterprises, uniting 5 distinct business divisions under one authoritative digital identity.',
    whoItsFor:
      'Corporate clients, luxury travel planners, institutional partners, and enterprise event inquiries.',
    quickFacts: [
      { label: 'Connected Brands', value: '5 Operating Divisions' },
      { label: 'Core Industries', value: 'Luxury Travel, Events & Media' },
      { label: 'Brand Architecture', value: 'One Root, Five Branches' },
      { label: 'Inquiry Dispatch', value: 'Centralized Multi-Venture Hub' },
    ],

    theProblem:
      'Operating 5 independent businesses under one parent holding company caused fragmented branding, confused prospective partners, and caused lost cross-selling opportunities across high-value luxury travel, wedding planning, and media services.',
    ourSolution:
      'Axiino designed a cohesive corporate flagship with an interactive tree-branch architecture that tells the story of the parent brand while giving each division its own dedicated showcase and lead capture workflow.',

    keyFeatures: [
      {
        iconName: 'layers',
        title: 'Multi-Division Showcase',
        description: 'Seamlessly displays 5 independent operating branches under one authoritative brand structure.',
      },
      {
        iconName: 'check',
        title: 'Clear Company Profile',
        description: 'Presents founding values, leadership credentials, and corporate milestones to establish instant credibility.',
      },
      {
        iconName: 'message',
        title: 'Easy Contact & Routing',
        description: 'Directs institutional partners and enterprise clients directly to the appropriate venture lead.',
      },
      {
        iconName: 'eye',
        title: 'High-Impact Visual Identity',
        description: 'Sophisticated aesthetics, subtle gold accents, and refined typography conveying luxury and trust.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/umshiv-group.jpg',
        caption: 'Corporate Digital Headquarters: Presenting the group portfolio with clear division navigation.',
      },
    ],
    // results is empty -> automatically hidden
  },

  'madirintel': {
    id: 'madirintel',
    number: '05',
    title: 'Madirintel',
    tagline: 'Secure document vault for smarter financial decision-making',
    badge: 'Client Platform • Financial Tech',
    category: 'Fintech & Document Intelligence Platform',
    type: 'project',
    isAiPowered: false,
    domain: 'madirintel.com',
    liveUrl: 'https://madirintel.com/',
    heroScreenshot: '/screenshots/madirintel.jpg',

    whatItIs:
      'A secure, cloud-hosted financial document vault where individuals and businesses upload statutory filings, tax records, and balance sheets for anytime retrieval and structured financial insights.',
    whoItsFor:
      'Business owners, chief financial officers, accountants, and individuals who want their financial records organized and accessible in seconds.',
    quickFacts: [
      { label: 'Security Standard', value: '256-Bit Encrypted Vault' },
      { label: 'Access Protocol', value: 'Anytime Cloud Retrieval' },
      { label: 'Document Scope', value: 'Statutory, Tax & Corporate' },
      { label: 'Interface', value: 'Clean Minimalist Dashboard' },
    ],

    theProblem:
      'Critical corporate financial reports, tax returns, and audit trails are scattered across unstructured email threads, local drives, and physical paper folders, causing panic during audits and hindering strategic decisions.',
    ourSolution:
      'Axiino engineered a secure, encrypted document repository with systematic folder indexing, quick document previews, and organized views that help leadership retrieve vital fiscal records in seconds.',

    keyFeatures: [
      {
        iconName: 'lock',
        title: 'Bank-Grade Document Upload',
        description: 'End-to-end encrypted file uploads for sensitive financial statements, tax records, and audit reports.',
      },
      {
        iconName: 'eye',
        title: 'Easy Categorized Viewing',
        description: 'Clean visual file hierarchy organized by fiscal year, entity, and document category for instant lookup.',
      },
      {
        iconName: 'trending-up',
        title: 'Decision Support Insights',
        description: 'Presents consolidated financial records so directors make informed business decisions with speed.',
      },
      {
        iconName: 'shield',
        title: 'Secure Access Controls',
        description: 'Strict authorization rules ensuring financial files remain private and tamper-proof.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/madirintel.jpg',
        caption: 'Secure Vault Dashboard: Structured document library with quick-view controls and category filters.',
      },
    ],
    // results is empty -> automatically hidden
  },
  'creativix': {
    id: 'creativix',
    number: '06',
    title: 'Creativix — Creative Agency',
    tagline: 'High-impact digital presence for an award-winning creative agency',
    badge: 'Client Platform • Creative & Design',
    category: 'Creative Agency & Digital Branding Platform',
    type: 'project',
    isAiPowered: false,
    domain: 'creativix-eight.vercel.app',
    liveUrl: 'https://creativix-eight.vercel.app/',
    heroScreenshot: '/screenshots/creativix.jpg',

    whatItIs:
      'A sleek, high-performance web platform built for Creativix to showcase their cutting-edge graphic design, branding services, and strategic social media marketing campaigns to prospective global clients.',
    whoItsFor:
      'Brands, startups, and established enterprises looking for premier creative direction, bold design systems, and visual marketing.',
    quickFacts: [
      { label: 'Client Type', value: 'Design & Marketing Agency' },
      { label: 'Platform Type', value: 'High-Converting Web Portfolio' },
      { label: 'Tech Stack', value: 'React · Vite · Tailwind · Framer Motion' },
      { label: 'Visual Style', value: 'Dark Neon Cyber Aesthetic' },
    ],

    theProblem:
      'Standard template websites failed to convey Creativix’s premium design caliber and cutting-edge creative identity, leading to high bounce rates and lost enterprise client pitches.',
    ourSolution:
      'Axiino engineered a bespoke, dark-cyber neon aesthetic web platform with silky 60 FPS animations, fluid project showcases, and a streamlined client inquiry pipeline that captivates audiences.',

    keyFeatures: [
      {
        iconName: 'sparkles',
        title: 'Bold Visual Showcase',
        description: 'Immersive dark theme with vibrant neon gradients that reflect the agency’s creative authority and bold identity.',
      },
      {
        iconName: 'layers',
        title: 'Interactive Portfolio',
        description: 'Dynamic portfolio sections featuring graphic design, corporate branding, and social media campaigns with instant loading.',
      },
      {
        iconName: 'message',
        title: 'Frictionless Client Inquiries',
        description: 'Direct contact workflows and onboarding inquiry forms designed to convert prospective clients on first visit.',
      },
      {
        iconName: 'smartphone',
        title: 'Mobile-First Fluidity',
        description: 'Engineered for smooth 60 FPS micro-interactions, responsive typography, and optimal performance across mobile and desktop.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/creativix.jpg',
        caption: 'Creativix Homepage: Bold typography ("We Create Bold Designs That Inspire") with neon visual geometry and sleek navigation.',
      },
    ],

    results: {
      headline: 'Dramatic Surge in Client Engagement and Brand Recognition',
      metrics: [
        { label: 'Page Load Speed', value: '< 0.8s' },
        { label: 'Visual Engagement', value: '+140%' },
        { label: 'Lead Conversion', value: '+65%' },
      ],
    },
  },
  'the-first-step-solutions': {
    id: 'the-first-step-solutions',
    number: '07',
    title: 'The First Step Solutions',
    tagline: 'We turn ideas into experiences that move people',
    badge: 'Client Platform • Digital Studio & Solutions',
    category: 'Digital Studio & Interactive Experiences',
    type: 'project',
    isAiPowered: false,
    domain: 'thefirststepsolutions.com',
    liveUrl: 'https://www.thefirststepsolutions.com/',
    heroScreenshot: '/screenshots/the-first-step-solutions.jpg',

    whatItIs:
      'A bespoke digital experience platform engineered for The First Step Solutions, a creative digital agency established in Chennai. The platform features an immersive dark aesthetic, fluid motion graphics, and interactive polyhedral geometric visualizations that convert visitors into prospective clients.',
    whoItsFor:
      'Forward-thinking businesses, brands, and startups seeking immersive digital product design, web experiences, and brand transformation.',
    quickFacts: [
      { label: 'Client Type', value: 'Creative Agency & Digital Solutions' },
      { label: 'Established', value: 'Est. 2022 · Chennai' },
      { label: 'Tech Stack', value: 'React · Tailwind · Modern Web' },
      { label: 'Visual Style', value: 'Dark Immersive Gradient Aesthetic' },
    ],

    theProblem:
      'Conventional agency websites often rely on repetitive generic templates that fail to communicate high-end creative prowess and technical craft, making it harder to stand out in competitive pitch cycles.',
    ourSolution:
      'Axiino engineered a bespoke, dark-themed immersive digital presence featuring fluid gradients, interactive geometric elements, zero-latency navigation, and frictionless contact engagement.',

    keyFeatures: [
      {
        iconName: 'sparkles',
        title: 'Immersive Visual Experience',
        description: 'Vibrant neon gradient typography ("We turn ideas into experiences that move people") with dark canvas contrast.',
      },
      {
        iconName: 'layers',
        title: 'Interactive 3D Geometry',
        description: 'Fluid polyhedral geometric visualizations and modern micro-animations that engage visitors from the first second.',
      },
      {
        iconName: 'message',
        title: 'Frictionless Client Inquiries',
        description: 'Prominent interactive CTA flows ("Let\'s Talk" & "Go to the Tree") for rapid client onboarding and project discovery.',
      },
      {
        iconName: 'smartphone',
        title: 'Ultra-Fast Performance',
        description: 'Optimized asset pipelines ensuring sub-second load times and fluid responsive layout across desktop and mobile.',
      },
    ],

    screenshots: [
      {
        url: '/screenshots/the-first-step-solutions.jpg',
        caption: 'The First Step Solutions Homepage: Bold gradient headline ("We turn ideas into experiences that move people") with geometric wireframe visualization.',
      },
    ],

    results: {
      headline: 'Elevated Agency Authority and Rapid Client Conversion',
      metrics: [
        { label: 'Initial Page Load', value: '< 0.7s' },
        { label: 'User Engagement', value: '+150%' },
        { label: 'Inquiry Inflow', value: '+70%' },
      ],
    },
  },
};

