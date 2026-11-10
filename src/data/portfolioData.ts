export interface PortfolioCardItem {
  id: string;
  number: string;
  title: string;
  domain: string;
  badge: string;
  type: 'product' | 'project';
  isAiPowered?: boolean;
  logoUrl?: string;
  tagline: string;
  screenshotUrl: string;
  liveUrl: string;

  // 1. Plain-English summary (1 to 2 sentences)
  whatItDoes: string;

  // 2. Target audience (one line)
  whoItsFor: string;

  // 3. Key features (small chips)
  features: string[];

  // 4. Highlighted result line (optional - hidden if empty or undefined)
  result?: string;
}

export const PORTFOLIO_CARDS: PortfolioCardItem[] = [
  {
    id: 'crm-pro',
    number: '01',
    title: 'CRM Pro Attendance',
    domain: 'crm.axiino.com',
    badge: 'Workplace SaaS • In-House',
    type: 'product',
    isAiPowered: true,
    logoUrl: '/axiino-logo.png',
    tagline: 'Unified workplace intelligence platform for attendance, communication, and shift tracking',
    screenshotUrl: '/screenshots/crm-axiino.jpg',
    liveUrl: 'https://crm.axiino.com/attendance',
    whatItDoes:
      'All-in-one workforce suite unifying biometric punch clock, real-time team chat, and automated daily shift tracking.',
    whoItsFor:
      'Growing enterprises & teams looking to eliminate manual payroll overhead.',
    features: [
      'Digital Punch Clock',
      'Live Team Chat',
      'Automated Payroll Sync',
    ],
    result: 'Payroll preparation up to 10x faster',
  },
  {
    id: 'sr-dollars',
    number: '02',
    title: 'SR Dollars & Builders',
    domain: 'srdollarsandbuilders.com',
    badge: 'Client Platform • Real Estate',
    type: 'project',
    isAiPowered: false,
    logoUrl: '/logos/srdollars.png',
    tagline: 'High-performance real estate portal with effortless team listing updates',
    screenshotUrl: '/screenshots/sr-dollars.jpg',
    liveUrl: 'https://srdollarsandbuilders.com/',
    whatItDoes:
      'Modern real estate portal empowering builders to showcase premier properties, update listings instantly, and capture qualified buyer leads.',
    whoItsFor:
      'Property buyers, investors, and builder sales teams managing active developments.',
    features: [
      'Instant Listing Updates',
      'Interactive Property Gallery',
      'Direct WhatsApp & Lead Capture',
    ],
    result: 'Zero-latency listing updates & seamless mobile discovery',
  },
  {
    id: 's2s-matrimony',
    number: '03',
    title: 'S2S Matrimony',
    domain: 's2smatrimony.com',
    badge: 'Client Platform • AI Matchmaking',
    type: 'project',
    isAiPowered: true,
    logoUrl: '/logos/s2smatrimony.png',
    tagline: 'Community matchmaking platform trusted by 50,000+ members',
    screenshotUrl: '/screenshots/s2s-matrimony.jpg',
    liveUrl: 'https://s2smatrimony.com/',
    whatItDoes:
      'Next-gen community matchmaking platform combining AI horoscope compatibility algorithms with verified member privacy protocols.',
    whoItsFor:
      'Families & singles seeking culturally compatible, authenticated life partners.',
    features: [
      'AI Horoscope Matching',
      'Smart Profile OCR Extraction',
      '100% Verified Member Vault',
    ],
    result: 'Trusted by 50,000+ active members',
  },
  {
    id: 'umshiv-group',
    number: '04',
    title: 'UMSHIV Group',
    domain: 'umshiv.com',
    badge: 'Client Platform • Corporate Conglomerate',
    type: 'project',
    isAiPowered: false,
    logoUrl: '/logos/umshiv.png',
    tagline: 'Unified corporate presence uniting travel, branding, and events',
    screenshotUrl: '/screenshots/umshiv-group.jpg',
    liveUrl: 'https://www.umshiv.com/',
    whatItDoes:
      'Multi-division corporate portal consolidating global travel logistics, creative agency branding, and high-scale event management into one prestige digital presence.',
    whoItsFor:
      'Corporate partners, enterprise clients, and international travelers.',
    features: [
      'Multi-Division Showcase',
      'Corporate Portfolio Suite',
      'Direct Executive Contact',
    ],
    result: 'Unified corporate portal across multi-industry divisions',
  },
  {
    id: 'madirintel',
    number: '05',
    title: 'Madirintel',
    domain: 'madirintel.com',
    badge: 'Client Platform • Financial Tech',
    type: 'project',
    isAiPowered: false,
    logoUrl: '/logos/madirintel.png',
    tagline: 'Secure document vault for smarter financial decision-making',
    screenshotUrl: '/screenshots/madirintel.jpg',
    liveUrl: 'https://madirintel.com/',
    whatItDoes:
      'Encrypted document intelligence vault where businesses and individuals securely archive statutory records, balance sheets, and tax filings for instant retrieval.',
    whoItsFor:
      'Founders, finance teams, accountants, and businesses aiming for flawless audit readiness.',
    features: [
      'Bank-Grade Document Upload',
      'Anytime Cloud Viewing',
      'Audit Decision Support',
    ],
    result: 'Instant retrieval of statutory records with zero document misplacement',
  },
  {
    id: 'creativix',
    number: '06',
    title: 'Creativix — Creative Agency',
    domain: 'creativix.agency',
    badge: 'Client Platform • Creative & Design',
    type: 'project',
    isAiPowered: false,
    logoUrl: '/axiino-logo.png',
    tagline: 'High-impact digital presence for an award-winning creative agency',
    screenshotUrl: '/screenshots/creativix.jpg',
    liveUrl: 'https://creativix-eight.vercel.app/',
    whatItDoes:
      'Immersive agency platform engineered to showcase award-winning brand identity design, interactive 3D motion graphics, and full-funnel digital campaigns.',
    whoItsFor:
      'Forward-thinking brands and startups seeking high-tier visual positioning.',
    features: [
      'Bold Visual Showcase',
      'Interactive Portfolio',
      'Client Onboarding Portal',
    ],
    result: 'Award-winning visual design driving premium client conversions',
  },
  {
    id: 'the-first-step-solutions',
    number: '07',
    title: 'The First Step Solutions',
    domain: 'thefirststepsolutions.com',
    badge: 'Client Platform • Digital Experience & Studio',
    type: 'project',
    isAiPowered: false,
    logoUrl: '/logos/firststep-solutions.png',
    tagline: 'Immersive digital experience turning ideas into high-impact digital products',
    screenshotUrl: '/screenshots/the-first-step-solutions.jpg',
    liveUrl: 'https://www.thefirststepsolutions.com/',
    whatItDoes:
      'Bespoke digital agency platform showcasing cutting-edge interactive web experiences, modern branding, and strategic digital solutions for forward-thinking businesses.',
    whoItsFor:
      'Brands, startups, and creative enterprises seeking high-converting digital presence and digital transformation.',
    features: [
      'Interactive 3D Geometry',
      'Fluid Motion Design',
      'Full-Funnel Brand Design',
    ],
    result: 'Elevating brand authority through dynamic, high-engagement digital experiences',
  },
];
