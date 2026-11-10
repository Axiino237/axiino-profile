export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  category: 'core' | 'ai_saas' | 'cloud';
  iconType: 'code' | 'globe' | 'mobile' | 'ai' | 'saas' | 'database' | 'backend' | 'cloud';
  accentColor: string;
  excerpt: string;
  description: string;
  keyDeliverables: string[];
  techCore: string[];
  actionText: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software',
    badge: 'AXIINO SERVICE',
    category: 'core',
    iconType: 'code',
    accentColor: '#3A9AD9', // Sky Blue
    excerpt: 'Bespoke, enterprise-grade software systems tailored to your operational workflows and growth.',
    description:
      'Off-the-shelf software forces compromise. Axiino builds bespoke, enterprise-grade software systems designed from day one to match your operational workflows, compliance requirements, and growth trajectory.',
    keyDeliverables: [
      'Architecture & Systems Design',
      'Bespoke Enterprise Web & Core Systems',
      'Legacy Modernization & Cloud Migration',
    ],
    techCore: ['Node.js', 'NestJS', 'React.js', 'Python'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'web-applications',
    number: '02',
    title: 'Web Applications',
    badge: 'AXIINO SERVICE',
    category: 'core',
    iconType: 'globe',
    accentColor: '#38BDF8', // Cyan/Sky
    excerpt: 'Modern, responsive, ultra-fast web applications that engage users and scale effortlessly.',
    description:
      'We build modern, responsive, and ultra-fast web applications that engage users and scale effortlessly. Engineered with React, Vite, Node.js, and modern cloud stacks.',
    keyDeliverables: [
      'Single Page & Progressive Web Apps',
      'SaaS Dashboards & Admin Portals',
      'Customer Portals & Digital Marketplaces',
    ],
    techCore: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'mobile-apps',
    number: '03',
    title: 'Mobile Apps',
    badge: 'AXIINO SERVICE',
    category: 'core',
    iconType: 'mobile',
    accentColor: '#8A6FDB', // Purple
    excerpt: 'Cross-platform iOS and Android apps with 60 FPS fluid animations and native integrations.',
    description:
      'Reach mobile users across iOS and Android from a unified, high-performance codebase. Engineered with React Native for maximum velocity, fluid 60 FPS animations, and native device feature integration.',
    keyDeliverables: [
      'Cross-Platform iOS & Android Apps',
      'Real-Time Sync & Offline-First Storage',
      'Hardware & Native Feature Integration',
    ],
    techCore: ['React Native', 'Expo', 'TypeScript', 'Node.js'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI & Automation',
    badge: 'AXIINO SERVICE',
    category: 'ai_saas',
    iconType: 'ai',
    accentColor: '#D44FD8', // Magenta
    excerpt: 'Production-ready AI systems, RAG pipelines, intelligent document parsers, and autonomous workflows.',
    description:
      'Move beyond generic ChatGPT prompts. Axiino builds production-ready AI systems, Retrieval-Augmented Generation (RAG) pipelines, intelligent document parsers, and autonomous business workflows tailored to your proprietary data.',
    keyDeliverables: [
      'Custom LLM & RAG Pipelines',
      'Intelligent Customer & Support Agents',
      'Document OCR & AI Extraction',
    ],
    techCore: ['Python', 'OpenAI / Claude APIs', 'LangChain', 'pgvector'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'saas-development',
    number: '05',
    title: 'SaaS Development',
    badge: 'AXIINO SERVICE',
    category: 'ai_saas',
    iconType: 'saas',
    accentColor: '#6366F1', // Indigo
    excerpt: 'Multi-tenant cloud architectures, subscription engines, and scalable SaaS platforms.',
    description:
      'Turn your software vision into a profitable, scalable SaaS product. Axiino partners with founders and established firms to architect, build, and launch multi-tenant software platforms engineered for high retention and seamless scaling.',
    keyDeliverables: [
      'Multi-Tenant Cloud Architecture',
      'Subscription & Billing Engine',
      'Authentication, RBAC & SSO',
    ],
    techCore: ['React.js', 'Node.js', 'NestJS', 'PostgreSQL'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'crm-erp',
    number: '06',
    title: 'CRM & ERP',
    badge: 'AXIINO SERVICE',
    category: 'ai_saas',
    iconType: 'database',
    accentColor: '#F59E0B', // Amber
    excerpt: 'Bespoke CRM and ERP systems or customized Zoho platforms to streamline business pipelines.',
    description:
      'Disjointed spreadsheets and rigid generic CRMs create operational chaos. Axiino builds bespoke CRM and ERP platforms, or tailors enterprise platforms like Zoho, to streamline your pipelines, orders, and customer data in real time.',
    keyDeliverables: [
      'Bespoke CRM Platforms',
      'Operational ERP Systems',
      'Zoho Suite Consulting & Deluge Scripting',
    ],
    techCore: ['Node.js', 'React.js', 'PostgreSQL', 'Zoho CRM / Deluge'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'backend-apis',
    number: '07',
    title: 'Backend & APIs',
    badge: 'AXIINO SERVICE',
    category: 'cloud',
    iconType: 'backend',
    accentColor: '#10B981', // Emerald
    excerpt: 'Rock-solid API layers, microservices, and databases engineered for sub-100ms response times.',
    description:
      'The backend is the engine of your digital business. Axiino engineers rock-solid API layers, microservices, and distributed database architectures engineered for sub-100ms response times and zero unexpected downtime.',
    keyDeliverables: [
      'RESTful & GraphQL API Engineering',
      'Database Engineering & Optimization',
      'Authentication & Security Architecture',
    ],
    techCore: ['Node.js', 'NestJS', 'Python', 'FastAPI'],
    actionText: 'Explore Full Service & Deliverables',
  },
  {
    id: 'cloud-devops',
    number: '08',
    title: 'Cloud & DevOps',
    badge: 'AXIINO SERVICE',
    category: 'cloud',
    iconType: 'cloud',
    accentColor: '#06B6D4', // Cyan
    excerpt: 'Automated CI/CD pipelines, container orchestration, and secure cloud environments.',
    description:
      'Manual deployments and unstable server configurations slow down engineering velocity. Axiino sets up automated CI/CD pipelines, container orchestration, and secure cloud environments that let your team ship code with total confidence.',
    keyDeliverables: [
      'CI/CD Pipeline Automation',
      'Containerization & Docker Orchestration',
      'AWS & Cloud Infrastructure Setup',
    ],
    techCore: ['AWS', 'Docker', 'GitHub Actions', 'Vercel'],
    actionText: 'Explore Full Service & Deliverables',
  },
];

