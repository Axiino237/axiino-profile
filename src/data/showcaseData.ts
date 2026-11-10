import { ShowcaseItem } from '../types';

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'crm-pro',
    slug: 'crm-pro',
    title: 'CRM Pro — Access Management',
    type: 'product',
    subtitle: 'Access Management & Attendance Intelligence',
    tagline: 'Zero-friction workforce tracking with automated payroll sync',
    clientOrBrand: 'Axiino In-House Product',
    category: 'Enterprise SaaS / HR Tech',
    simpleExplanation:
      'An all-in-one workspace and CRM platform for sales tracking, HR management, and team collaboration.',
    problemSolved:
      'Manual attendance registers lead to buddy-punching, lost billable hours, and days spent manually reconciling payroll every month.',
    businessImpact:
      'Centralized sales tracking and streamlined workforce management up to 10x faster.',
    aiCapabilities: [
      'Smart Shift Anomaly & Late-Checkin Detection',
      'Automated Punch Correction Approvals',
      'Predictive Overtime & Payroll Budget Forecasts'
    ],
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker'],
    keyOutcomes: [
      { label: 'Workforce Prep', value: '10x Faster' },
      { label: 'Time Theft', value: '0%' },
      { label: 'Live Shift Sync', value: 'Real-Time' }
    ],
    screenshotUrl: '/screenshots/crm-axiino.jpg',
    accentColor: '#6366f1',
    gradientOverlay: 'from-[#080d24]/90 via-[#0b1338]/80 to-[#040714]/95',
    liveUrl: 'https://crm.axiino.com/attendance',
    caseStudyAvailable: true,
    featured: true
  },
  {
    id: 'sr-dollars',
    slug: 'sr-dollars',
    title: 'SR Dollars & Builders',
    type: 'project',
    subtitle: 'Dynamic Real Estate & Plot Showcase Platform',
    tagline: 'Dynamic property listing and modern construction showcase',
    clientOrBrand: 'SR Dollars & Builders',
    category: 'Real Estate & Construction Web Platform',
    simpleExplanation:
      'A real estate website where the team can post new property updates themselves.',
    problemSolved:
      'Builders struggle with outdated listing portals and expensive third-party agency delays when adding new plots.',
    businessImpact:
      'Enabled instant self-publishing of plots and direct client inquiry collection.',
    aiCapabilities: [],
    techStack: ['React', 'Tailwind CSS', 'Listing Manager', 'Cloudflare CDN'],
    keyOutcomes: [
      { label: 'Listing Upload', value: 'Instant' },
      { label: 'Buyer Reach', value: '100% Mobile' },
      { label: 'Direct Inquiries', value: 'Real-Time' }
    ],
    screenshotUrl: '/screenshots/sr-dollars.jpg',
    accentColor: '#10b981',
    gradientOverlay: 'from-[#06241a]/90 via-[#031510]/80 to-[#010906]/95',
    liveUrl: 'https://srdollarsandbuilders.com/',
    caseStudyAvailable: true,
    featured: true
  },
  {
    id: 's2s-matrimony',
    slug: 's2s-matrimony',
    title: 'S2S Matrimony',
    type: 'project',
    subtitle: 'AI-Powered Community Matchmaking Platform',
    tagline: 'Community matchmaking platform trusted by 50,000+ members',
    clientOrBrand: 'S2S Community Network',
    category: 'High-Scale Consumer Platform & AI Matchmaking',
    simpleExplanation:
      'A matrimony platform that suggests matches using an AI horoscope-matching feature.',
    problemSolved:
      'Traditional matrimony websites suffer from fake profiles, privacy invasion, and overwhelming lists of incompatible contacts.',
    businessImpact:
      'Trusted by 50,000+ members across 200+ communities with verified matchmaking safety.',
    aiCapabilities: [
      'AI Horoscope & Astrological Compatibility Engine',
      'Smart Profile Data Extraction & OCR',
      'Automated Profile Picture Verification'
    ],
    techStack: ['Next.js / React', 'Tailwind CSS', 'AI Matching Engine', 'PostgreSQL'],
    keyOutcomes: [
      { label: 'Verified Members', value: '50,000+' },
      { label: 'Communities', value: '200+' },
      { label: 'Match Accuracy', value: '85%+' }
    ],
    screenshotUrl: '/screenshots/s2s-matrimony.jpg',
    accentColor: '#e11d48',
    gradientOverlay: 'from-[#2e0915]/90 via-[#1c0712]/80 to-[#0c0307]/95',
    liveUrl: 'https://s2smatrimony.com/',
    caseStudyAvailable: true,
    featured: true
  },
  {
    id: 'umshiv-group',
    slug: 'umshiv-group',
    title: 'UMSHIV Group',
    type: 'project',
    subtitle: 'One Root, Five Branches Enterprise Ecosystem',
    tagline: 'Unified corporate presence uniting travel, branding, and events',
    clientOrBrand: 'UMSHIV Group of Companies',
    category: 'Corporate Conglomerate Web Platform',
    simpleExplanation:
      'The official website that presents all the group’s companies and services in one place.',
    problemSolved:
      'Multiple independent businesses operating under one founder lacked a cohesive digital identity, confusing prospective clients and enterprise partners.',
    businessImpact:
      'Consolidated 5 multi-disciplinary brands into a single high-prestige portal, driving high-ticket enterprise inquiries across luxury travel and event infrastructure.',
    aiCapabilities: [
      'Interactive Tree-Branch Navigation Architecture',
      'Intelligent Multi-Venture Lead Routing Hub',
      'Automated Enterprise Client Inquiry Dispatch'
    ],
    techStack: ['React', 'Modern CSS Architecture', 'Vector Graphics', 'Cloud Infrastructure'],
    keyOutcomes: [
      { label: 'Connected Brands', value: '5 Divisions' },
      { label: 'Brand Unity', value: '100%' },
      { label: 'Enterprise Inquiries', value: '+140%' }
    ],
    screenshotUrl: '/screenshots/umshiv-group.jpg',
    accentColor: '#10b981',
    gradientOverlay: 'from-[#052317]/90 via-[#081e15]/80 to-[#020d09]/95',
    liveUrl: 'https://www.umshiv.com/',
    caseStudyAvailable: true,
    featured: true
  },
  {
    id: 'madirintel',
    slug: 'madirintel',
    title: 'Madirintel',
    type: 'project',
    subtitle: 'Secure Financial Document Intelligence & Archival Vault',
    tagline: 'Secure document vault for smarter financial decision-making',
    clientOrBrand: 'Madirintel Platform',
    category: 'Client Platform • Financial Tech',
    simpleExplanation:
      'A secure place to upload financial documents and view them anytime, which helps people make better financial decisions.',
    problemSolved:
      'Critical corporate financial reports and tax audit files are scattered across unstructured email threads and vulnerable local drives.',
    businessImpact:
      'Centralized 100% of statutory financial audit records with instant retrieval and decision-support views.',
    aiCapabilities: [
      'Automated Financial Document Classification',
      'Key Metric OCR & Extraction'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Encrypted S3 Vault'],
    keyOutcomes: [
      { label: 'Security', value: '256-Bit' },
      { label: 'Vault Access', value: 'Anytime' },
      { label: 'Compliance', value: '100%' }
    ],
    screenshotUrl: '/screenshots/madirintel.jpg',
    accentColor: '#0ea5e9',
    gradientOverlay: 'from-[#041a2e]/90 via-[#02111f]/80 to-[#010810]/95',
    liveUrl: 'https://madirintel.com/',
    caseStudyAvailable: true,
    featured: true
  },
  {
    id: 'creativix',
    slug: 'creativix',
    title: 'Creativix — Creative Agency',
    type: 'project',
    subtitle: 'Bold Digital Brand Experience & Agency Showcase',
    tagline: 'High-impact digital presence for an award-winning creative agency',
    clientOrBrand: 'Creativix Agency',
    category: 'Creative Agency & Digital Branding Platform',
    simpleExplanation:
      'A modern agency platform showcasing cutting-edge graphic design, branding services, and strategic social media marketing.',
    problemSolved:
      'Standard template websites failed to convey Creativix’s creative caliber, making it difficult to convert high-value design clients.',
    businessImpact:
      'Delivered a 140% boost in visual engagement and accelerated enterprise client consultations.',
    aiCapabilities: [],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    keyOutcomes: [
      { label: 'Page Speed', value: '< 0.8s' },
      { label: 'Client Inquiries', value: '+65%' },
      { label: 'Visual Impact', value: '60 FPS' }
    ],
    screenshotUrl: '/screenshots/creativix.jpg',
    accentColor: '#D44FD8',
    gradientOverlay: 'from-[#0b081a]/90 via-[#180d2e]/80 to-[#04020a]/95',
    liveUrl: 'https://creativix.agency/',
    caseStudyAvailable: true,
    featured: true
  }
];
