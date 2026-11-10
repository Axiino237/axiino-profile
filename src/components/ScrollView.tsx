import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShowcaseItem } from '../types';
import { PORTFOLIO_CARDS, PortfolioCardItem } from '../data/portfolioData';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { CaseStudyPanel } from './CaseStudyPanel';
import { WordReveal } from './WordReveal';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';
import { 
  Sparkles, 
  ArrowUpRight, 
  ArrowLeft,
  ArrowRight,
  Layers,
  MessageSquare, 
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send,
  Check,
  X
} from 'lucide-react';

interface ScrollViewProps {
  items: ShowcaseItem[];
  onExploreItem: (item: ShowcaseItem) => void;
  onSwitchToTour?: (targetIndex?: number) => void;
  onOpenIndex?: () => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

// Drifting glowing particles on cover
const COVER_PARTICLES = [
  { id: 1, left: '6%', bottom: '10%', size: 3.5, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.65)', duration: 8.5, delay: 0 },
  { id: 2, left: '14%', bottom: '24%', size: 2.5, color: '#C084FC', glow: 'rgba(192, 132, 252, 0.6)', duration: 11, delay: 1.2 },
  { id: 3, left: '22%', bottom: '15%', size: 3, color: '#F472B6', glow: 'rgba(244, 114, 182, 0.6)', duration: 9, delay: 0.5 },
  { id: 4, left: '32%', bottom: '40%', size: 2, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.6)', duration: 12.5, delay: 2.4 },
  { id: 5, left: '42%', bottom: '20%', size: 3.5, color: '#C084FC', glow: 'rgba(192, 132, 252, 0.65)', duration: 10, delay: 3.0 },
  { id: 6, left: '52%', bottom: '46%', size: 2.5, color: '#F472B6', glow: 'rgba(244, 114, 182, 0.55)', duration: 7.8, delay: 0.8 },
  { id: 7, left: '62%', bottom: '12%', size: 3, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.6)', duration: 11.2, delay: 4.1 },
  { id: 8, left: '72%', bottom: '32%', size: 2.5, color: '#C084FC', glow: 'rgba(192, 132, 252, 0.6)', duration: 9.2, delay: 1.9 },
  { id: 9, left: '82%', bottom: '18%', size: 3, color: '#F472B6', glow: 'rgba(244, 114, 182, 0.6)', duration: 8.2, delay: 0.3 },
  { id: 10, left: '92%', bottom: '44%', size: 2.5, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.65)', duration: 10.4, delay: 3.5 },
  { id: 11, left: '16%', bottom: '68%', size: 2.5, color: '#C084FC', glow: 'rgba(192, 132, 252, 0.55)', duration: 9.4, delay: 2.2 },
  { id: 12, left: '48%', bottom: '72%', size: 3, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.6)', duration: 10.8, delay: 1.1 },
  { id: 13, left: '84%', bottom: '66%', size: 2.5, color: '#F472B6', glow: 'rgba(244, 114, 182, 0.6)', duration: 10.6, delay: 3.9 },
  { id: 14, left: '28%', bottom: '78%', size: 2, color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.5)', duration: 8.8, delay: 1.7 },
  { id: 15, left: '76%', bottom: '82%', size: 2, color: '#C084FC', glow: 'rgba(192, 132, 252, 0.5)', duration: 9.8, delay: 2.8 },
];

// Twinkling sparkle star nodes on cover
const COVER_SPARKLES = [
  { id: 1, left: '18%', top: '24%', size: 13, duration: 6, delay: 0 },
  { id: 2, left: '82%', top: '26%', size: 15, duration: 7, delay: 1.5 },
  { id: 3, left: '22%', top: '72%', size: 12, duration: 6.5, delay: 2.5 },
  { id: 4, left: '78%', top: '70%', size: 14, duration: 7.5, delay: 3.5 },
];

// Ambient floating particles on Screen 2 (Our Work)
const OUR_WORK_PARTICLES = [
  { id: 1, left: '10%', top: '22%', size: 3, color: '#A78BFA', duration: 7.5, delay: 0 },
  { id: 2, left: '26%', top: '78%', size: 2.5, color: '#38BDF8', duration: 9.2, delay: 1.2 },
  { id: 3, left: '44%', top: '16%', size: 3, color: '#818CF8', duration: 8.0, delay: 0.5 },
  { id: 4, left: '60%', top: '82%', size: 2.5, color: '#F472B6', duration: 10.4, delay: 2.1 },
  { id: 5, left: '74%', top: '28%', size: 3, color: '#38BDF8', duration: 7.8, delay: 1.0 },
  { id: 6, left: '88%', top: '65%', size: 2.5, color: '#C084FC', duration: 9.6, delay: 2.4 },
  { id: 7, left: '36%', top: '62%', size: 2, color: '#22D3EE', duration: 8.8, delay: 3.1 },
  { id: 8, left: '66%', top: '14%', size: 2.5, color: '#E879F9', duration: 11.0, delay: 0.7 },
  { id: 9, left: '92%', top: '24%', size: 2, color: '#A78BFA', duration: 8.2, delay: 1.8 },
];

// One-time gleaming light sweep reflection when toggling between Works and Services
const CardShineEffect: React.FC<{ triggerKey: string; delay?: number }> = ({ triggerKey, delay = 0.3 }) => {
  return (
    <motion.div
      key={triggerKey}
      initial={{ x: '-160%', opacity: 0 }}
      animate={{
        x: ['-160%', '240%'],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-y-0 w-36 pointer-events-none z-30 skew-x-[-22deg]"
      style={{
        background:
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0) 100%)',
        filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.95))',
      }}
    />
  );
};

export const ScrollView: React.FC<ScrollViewProps> = ({
  items: _items,
  onExploreItem: _onExploreItem,
  onOpenContact,
  onOpenAdmin: _onOpenAdmin,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Mouse-move parallax and spotlight for hero background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroCursorX = useMotionValue(600);
  const heroCursorY = useMotionValue(400);
  const [isHeroCursorVisible, setIsHeroCursorVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 120 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  // Parallax spring layers for midground and foreground
  const midX = useSpring(useTransform(mouseX, (v: number) => -v * 1.5), springConfig);
  const midY = useSpring(useTransform(mouseY, (v: number) => -v * 1.5), springConfig);
  const fgX = useSpring(useTransform(mouseX, (v: number) => v * 2.2), springConfig);
  const fgY = useSpring(useTransform(mouseY, (v: number) => v * 2.2), springConfig);

  // Smooth spotlight and cursor follow
  const spotlightX = useSpring(heroCursorX, { damping: 28, stiffness: 140 });
  const spotlightY = useSpring(heroCursorY, { damping: 28, stiffness: 140 });

  // Mouse-move 3D Tilt for Center Hero Content
  const tiltX = useSpring(useTransform(mouseY, (v: number) => -v * 0.35), springConfig);
  const tiltY = useSpring(useTransform(mouseX, (v: number) => v * 0.35), springConfig);

  const lastHeroInteraction = useRef<number>(0);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    lastHeroInteraction.current = Date.now();

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    heroCursorX.set(clientX);
    heroCursorY.set(clientY);
    setIsHeroCursorVisible(true);

    const xNorm = (clientX / rect.width - 0.5) * 2;
    const yNorm = (clientY / rect.height - 0.5) * 2;

    mouseX.set(-xNorm * 22);
    mouseY.set(-yNorm * 22);
  };

  const handleHeroMouseLeave = () => {
    lastHeroInteraction.current = 0; // Trigger drift immediately on leave
  };

  // Cinematic Curtain Wipe state & references for Cover -> Overview
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const sheetRef = useRef<HTMLDivElement>(null);
  const lastTransitionTime = useRef(0);
  const touchStartY = useRef<number | null>(null);

  // Unified Mouse, Mobile Touch & Autonomous Drift for Cover Screen
  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!isCoverOpen) return;

    let animId: number;

    // Autonomous living drift animation loop (active on mobile and when mouse is idle)
    const animateDrift = (time: number) => {
      const now = Date.now();
      // If user hasn't actively moved cursor/touch in the last 1.8 seconds, drift autonomously
      if (now - lastHeroInteraction.current > 1800) {
        const t = time * 0.00085;
        // Smooth harmonic Lissajous drift
        const swayX = Math.sin(t * 0.72) * 16;
        const swayY = Math.cos(t * 0.92) * 14;

        mouseX.set(swayX);
        mouseY.set(swayY);

        const w = typeof window !== 'undefined' ? window.innerWidth : 600;
        const h = typeof window !== 'undefined' ? window.innerHeight : 800;
        const centerX = w * 0.5;
        const centerY = h * 0.44;

        heroCursorX.set(centerX + Math.sin(t * 0.72) * (w * 0.15));
        heroCursorY.set(centerY + Math.cos(t * 0.92) * (h * 0.12));
        setIsHeroCursorVisible(true);
      }

      animId = requestAnimationFrame(animateDrift);
    };

    animId = requestAnimationFrame(animateDrift);

    // Desktop mouse pointer move
    const handlePointerMove = (e: PointerEvent) => {
      if (!isCoverOpen) return;
      lastHeroInteraction.current = Date.now();
      heroCursorX.set(e.clientX);
      heroCursorY.set(e.clientY);
      setIsHeroCursorVisible(true);

      const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseX.set(-xNorm * 22);
      mouseY.set(-yNorm * 22);
    };

    const handlePointerLeave = () => {
      lastHeroInteraction.current = 0;
    };

    // Mobile touch move and touch start tracking
    const handleTouchInteraction = (e: TouchEvent) => {
      if (!isCoverOpen || e.touches.length === 0) return;
      lastHeroInteraction.current = Date.now();
      const touch = e.touches[0];
      heroCursorX.set(touch.clientX);
      heroCursorY.set(touch.clientY);
      setIsHeroCursorVisible(true);

      const xNorm = (touch.clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (touch.clientY / window.innerHeight - 0.5) * 2;

      mouseX.set(-xNorm * 22);
      mouseY.set(-yNorm * 22);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('touchstart', handleTouchInteraction, { passive: true });
    window.addEventListener('touchmove', handleTouchInteraction, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('touchstart', handleTouchInteraction);
      window.removeEventListener('touchmove', handleTouchInteraction);
    };
  }, [isCoverOpen, shouldReduceMotion]);

  // Dedicated wipe-open screen state for Projects / Products / AI Features
  const [activeCategoryView, setActiveCategoryView] = useState<'project' | 'product' | 'ai_feature' | 'all' | null>(null);

  // Dedicated wipe-open screen state for Services categories (Software & Apps / AI & SaaS / Backend & Cloud)
  const [activeServiceCategory, setActiveServiceCategory] = useState<'core' | 'ai_saas' | 'cloud' | 'all' | null>(null);

  // Screen 2 Category View Toggle: 'works' (Projects, Products, AI) or 'services' (Services Category)
  const [screen2Mode, setScreen2Mode] = useState<'works' | 'services'>('works');

  // Track active section inside document sheet for dynamic header theming
  const [activeSection, setActiveSection] = useState<'capabilities' | 'contact-about'>('capabilities');

  const handleSheetScroll = () => {
    if (!sheetRef.current) return;
    const contactEl = document.getElementById('contact-about');
    if (contactEl) {
      if (sheetRef.current.scrollTop >= contactEl.offsetTop - 140) {
        setActiveSection('contact-about');
      } else {
        setActiveSection('capabilities');
      }
    }
  };

  // Screen 2 Interactive Cursor Spotlight tracking
  const [screen2Spotlight, setScreen2Spotlight] = useState({ x: -1000, y: -1000 });
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false);

  const handleScreen2MouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setScreen2Spotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsSpotlightVisible(true);
  };

  const handleScreen2MouseLeave = () => {
    setIsSpotlightVisible(false);
  };

  const openDocument = () => {
    lastTransitionTime.current = Date.now();
    setIsCoverOpen(false);
  };

  const closeDocument = () => {
    lastTransitionTime.current = Date.now();
    setIsCoverOpen(true);
    setActiveSection('capabilities');
    if (sheetRef.current) {
      sheetRef.current.scrollTop = 0;
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (isCoverOpen) {
      openDocument();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Lock body scroll so the curtain wipe handles the cinematic transition seamlessly
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Listen for Escape key to close the wiped-opened category screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeCategoryView) setActiveCategoryView(null);
        if (activeServiceCategory) setActiveServiceCategory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategoryView, activeServiceCategory]);

  // Listen for mouse wheel and keyboard to trigger curtain wipe up / down
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't trigger curtain wipe if category view modal is open
      if (activeCategoryView || activeServiceCategory) return;

      const now = Date.now();
      if (now - lastTransitionTime.current < 600) return;

      if (isCoverOpen && e.deltaY > 15) {
        openDocument();
      } else if (!isCoverOpen && sheetRef.current && sheetRef.current.scrollTop <= 0 && e.deltaY < -20) {
        closeDocument();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCategoryView || activeServiceCategory) return;
      if (isCoverOpen && (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ')) {
        e.preventDefault();
        openDocument();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCoverOpen, activeCategoryView, activeServiceCategory]);

  // Mobile Touch Swipe Handlers for Cover Curtain Wipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (activeCategoryView || activeServiceCategory) return;
      if (touchStartY.current === null) return;
      const now = Date.now();
      if (now - lastTransitionTime.current < 600) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (isCoverOpen && diffY > 35) {
        openDocument();
      } else if (!isCoverOpen && sheetRef.current && sheetRef.current.scrollTop <= 0 && diffY < -45) {
        closeDocument();
      }
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isCoverOpen, activeCategoryView, activeServiceCategory]);

  // Active Case Study drawer state
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);

  // Filtered list of projects to show in the wiped-opened category view
  const categoryItems: PortfolioCardItem[] = useMemo(() => {
    if (!activeCategoryView) return [];
    if (activeCategoryView === 'all') {
      return PORTFOLIO_CARDS;
    }
    if (activeCategoryView === 'ai_feature') {
      return PORTFOLIO_CARDS.filter(c => c.isAiPowered);
    }
    return PORTFOLIO_CARDS.filter(c => c.type === activeCategoryView);
  }, [activeCategoryView]);

  // 1x2 Slider pagination state for Category View (Projects / Products / AI Features)
  const [categorySlideIndex, setCategorySlideIndex] = useState(0);

  // Reset slide index when switching category views
  useEffect(() => {
    setCategorySlideIndex(0);
  }, [activeCategoryView]);

  // Responsive tracking: 2 cards per slide on desktop (>=768px), 1 card per slide on mobile (<768px)
  const [isMobileSlider, setIsMobileSlider] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileSlider(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerSlide = isMobileSlider ? 1 : 2;
  const totalCategorySlides = Math.ceil(categoryItems.length / itemsPerSlide) || 1;
  const currentCategorySlide = Math.min(categorySlideIndex, totalCategorySlides - 1);
  const visibleCategoryCards = useMemo(() => {
    const start = currentCategorySlide * itemsPerSlide;
    return categoryItems.slice(start, start + itemsPerSlide);
  }, [categoryItems, currentCategorySlide, itemsPerSlide]);

  const handlePrevCategorySlide = () => {
    setCategorySlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCategorySlide = () => {
    setCategorySlideIndex((prev) => Math.min(totalCategorySlides - 1, prev + 1));
  };

  // Touch swipe support for mobile
  const sliderTouchStartX = useRef<number | null>(null);
  const handleSliderTouchStart = (e: React.TouchEvent) => {
    sliderTouchStartX.current = e.touches[0].clientX;
  };
  const handleSliderTouchEnd = (e: React.TouchEvent) => {
    if (sliderTouchStartX.current === null) return;
    const diff = sliderTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextCategorySlide();
      } else {
        handlePrevCategorySlide();
      }
    }
    sliderTouchStartX.current = null;
  };

  // Keyboard arrow keys navigation (Left/Right)
  useEffect(() => {
    if (!activeCategoryView) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCategorySlideIndex((prev) => Math.min(totalCategorySlides - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCategorySlideIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategoryView, totalCategorySlides]);

  // Filtered list of services to show in the wiped-opened category view
  const serviceCategoryItems: ServiceItem[] = useMemo(() => {
    if (!activeServiceCategory) return [];
    if (activeServiceCategory === 'all') return SERVICES_DATA;
    return SERVICES_DATA.filter(s => s.category === activeServiceCategory);
  }, [activeServiceCategory]);

  const serviceCategoryInfo = useMemo(() => {
    switch (activeServiceCategory) {
      case 'core':
        return {
          title: 'Software & Application Engineering',
          badge: 'Software & Apps (3)',
          description:
            'Enterprise-grade custom web systems, mobile applications, and bespoke architectures engineered to match your operational workflows.',
          accent: 'purple',
        };
      case 'ai_saas':
        return {
          title: 'AI Workflows & SaaS Platforms',
          badge: 'AI & SaaS (2)',
          description:
            'Production-ready LLM pipelines, autonomous support agents, document parsing, and scalable multi-tenant SaaS platforms.',
          accent: 'cyan',
        };
      case 'cloud':
        return {
          title: 'Backend, Database & Cloud DevOps',
          badge: 'Backend & Cloud (3)',
          description:
            'Sub-100ms microservices, distributed data engineering, and automated cloud infrastructure with zero unexpected downtime.',
          accent: 'pink',
        };
      case 'all':
      default:
        return {
          title: 'All Services & Capabilities',
          badge: `All Services (${SERVICES_DATA.length})`,
          description:
            'A comprehensive overview of our engineering capabilities across custom software, mobile apps, AI pipelines, and cloud systems.',
          accent: 'all',
        };
    }
  }, [activeServiceCategory]);

  // Category metadata for title, badge, description, and accent theme
  const categoryInfo = useMemo(() => {
    switch (activeCategoryView) {
      case 'product':
        return {
          title: 'In-House Software Products',
          badge: `Products (${PORTFOLIO_CARDS.filter(c => c.type === 'product').length})`,
          description:
            'Proprietary software tools engineered by Axiino to streamline workforce operations and attendance tracking.',
          accent: 'cyan',
        };
      case 'ai_feature':
        return {
          title: 'Applied Artificial Intelligence',
          badge: `AI Features (${PORTFOLIO_CARDS.filter(c => c.isAiPowered).length})`,
          description:
            'Specialized AI algorithms and intelligence models integrated directly into real workflows for automation and predictive matching.',
          accent: 'pink',
        };
      case 'all':
        return {
          title: 'All Platforms, Products & AI',
          badge: `All Portfolios (${PORTFOLIO_CARDS.length})`,
          description:
            'A comprehensive overview of our custom client platforms, proprietary business SaaS, and applied AI systems.',
          accent: 'all',
        };
      case 'project':
      default:
        return {
          title: 'Client Projects & Platforms',
          badge: `Projects (${PORTFOLIO_CARDS.filter(c => c.type === 'project').length})`,
          description:
            'Custom-built client platforms deployed in production, supporting enterprise businesses and tens of thousands of active users.',
          accent: 'purple',
        };
    }
  }, [activeCategoryView]);

  // Quick inquiry form state in Screen 3
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#E6EFF8] text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* =========================================================================
          LAYER 1: COVER SCREEN
          - Custom user background (/cover-bg.jpg) with interactive parallax motion
          - Transparent Nav: Logo + Contact button
          - Animated Badge with icon
          - WordReveal Headline Animation with brand gradient on "software that works."
          - Animated Subtitle & Action buttons
          - Bouncing "Turn the page" indicator triggering the curtain wipe
          ========================================================================= */}
      <section 
        id="cover"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="absolute inset-0 h-[100dvh] w-full flex flex-col justify-between items-center text-center select-none overflow-hidden z-10 px-6 sm:px-10 lg:px-16 pt-7 pb-8"
      >
        {/* Cover Background Image with Smooth Parallax */}
        <motion.div
          className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)] bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/cover-bg.jpg')`,
            x: imageX,
            y: imageY,
          }}
        />

        {/* Dynamic Midground Breathing Aurora Blobs */}
        {!shouldReduceMotion && (
          <motion.div 
            style={{ x: midX, y: midY }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-[2]"
          >
            {/* Blob 1: Cyan / Sky glow top-left */}
            <motion.div
              animate={{
                x: [0, 35, -25, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.2, 0.95, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-16 left-[10%] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-cyan-400/30 blur-[90px] mix-blend-multiply pointer-events-none"
            />

            {/* Blob 2: Violet / Purple glow top-right */}
            <motion.div
              animate={{
                x: [0, -40, 25, 0],
                y: [0, 35, -25, 0],
                scale: [1, 1.15, 0.92, 1],
                opacity: [0.3, 0.52, 0.3],
              }}
              transition={{ duration: 18, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 right-[8%] w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full bg-purple-400/28 blur-[95px] mix-blend-multiply pointer-events-none"
            />

            {/* Blob 3: Rose / Pink glow bottom-right */}
            <motion.div
              animate={{
                x: [0, -25, 35, 0],
                y: [0, -25, 30, 0],
                scale: [0.95, 1.18, 0.95],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{ duration: 15, delay: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-24 right-[16%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-pink-400/25 blur-[85px] mix-blend-multiply pointer-events-none"
            />

            {/* Blob 4: Soft Indigo / Blue glow bottom-left */}
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 25, 0],
                scale: [1.05, 0.9, 1.12, 1.05],
                opacity: [0.28, 0.48, 0.28],
              }}
              transition={{ duration: 17, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-20 left-[12%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-blue-400/25 blur-[90px] mix-blend-multiply pointer-events-none"
            />
          </motion.div>
        )}

        {/* Interactive Mouse-Tracking Aurora Spotlight */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute top-0 left-0 pointer-events-none rounded-full blur-3xl z-[6] transition-opacity duration-300"
            style={{
              x: useTransform(spotlightX, (x: number) => x - 250),
              y: useTransform(spotlightY, (y: number) => y - 250),
              width: 500,
              height: 500,
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.40) 0%, rgba(56, 189, 248, 0.30) 38%, rgba(244, 114, 182, 0.20) 65%, transparent 75%)',
              opacity: isHeroCursorVisible ? 1 : 0,
            }}
          />
        )}

        {/* Specular Diagonal Glass Sheen Sweep */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatDelay: 6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/18 to-transparent -skew-x-25 pointer-events-none"
            />
          </div>
        )}

        {/* Ambient Overlay for ideal text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/30 pointer-events-none z-[5]" />

        {/* Multi-layered Foreground Interactive Particles & Sparkles with Parallax */}
        {!shouldReduceMotion && (
          <motion.div 
            style={{ x: fgX, y: fgY }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-[6]"
          >
            {/* Glowing Drifting Particles */}
            {COVER_PARTICLES.map(dot => (
              <motion.span
                key={dot.id}
                className="absolute rounded-full"
                style={{
                  left: dot.left,
                  bottom: dot.bottom,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  backgroundColor: dot.color,
                  boxShadow: `0 0 10px ${dot.glow}`,
                }}
                animate={{
                  y: [0, -42, 0],
                  opacity: [0.35, 0.85, 0.35],
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Twinkling 4-Point Sparkle Stars */}
            {COVER_SPARKLES.map(s => (
              <motion.div
                key={s.id}
                className="absolute"
                style={{
                  left: s.left,
                  top: s.top,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                }}
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.85, 0.3],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-full h-full text-purple-400 drop-shadow-sm" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Top Transparent Nav on Cover */}
        <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between py-1">
          <div className="flex items-center gap-3">
            <div className="h-9 sm:h-10 w-auto flex items-center justify-center">
              <img 
                src="/axiino-logo.png" 
                alt="Axiino Logo" 
                className="h-full w-auto object-contain drop-shadow" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 leading-none drop-shadow-sm">
                AXIINO
              </span>
              <span className="text-[10px] text-purple-700 font-extrabold tracking-widest uppercase mt-0.5">
                Software & AI
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('capabilities')}
              className="hidden sm:inline-block text-xs font-bold text-slate-700 hover:text-slate-900 bg-white/60 hover:bg-white/80 backdrop-blur-md transition-all px-3.5 py-1.5 rounded-full border border-white/60 shadow-sm"
            >
              Our Work
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-5 py-2 rounded-full text-xs font-bold text-white shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>
          </nav>
        </header>

        {/* Center Hero Animated Content with 3D Mouse Tilt */}
        <motion.div 
          style={{
            rotateX: shouldReduceMotion ? 0 : tiltX,
            rotateY: shouldReduceMotion ? 0 : tiltY,
            transformPerspective: 1000,
          }}
          className="relative z-20 max-w-4xl mx-auto my-auto py-8 flex flex-col items-center"
        >
          {/* Animated Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/70 bg-white/80 backdrop-blur-md shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-xs font-extrabold tracking-wider uppercase text-purple-800">
              SOFTWARE & APPLIED AI COMPANY
            </span>
          </motion.div>

          {/* WordReveal Headline Animation */}
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.12]">
            <WordReveal
              text="We build reliable software that works."
              lineBreakIndices={[2]}
              delay={0.25}
              staggerDelay={0.12}
              duration={1.0}
              glow={false}
              getWordStyle={(word) => {
                const lower = word.toLowerCase();
                if (lower.includes('software') || lower.includes('that') || lower.includes('works.')) {
                  return {
                    backgroundImage: 'var(--brand-gradient)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    display: 'inline-block',
                    padding: '0 0.08em 0.12em 0',
                  };
                }
                return {
                  color: '#0F172A',
                  display: 'inline-block',
                  padding: '0 0.08em 0.12em 0',
                };
              }}
            />
          </h1>

          {/* Animated Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-xl text-slate-700 max-w-2xl leading-relaxed font-medium drop-shadow-sm"
          >
            From attendance and payroll to matrimony platforms and AI engines, here is the work we&apos;ve built, live and in use.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            <motion.button
              type="button"
              onClick={openDocument}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -7, 0],
                      boxShadow: [
                        '0 10px 25px -5px rgba(88, 28, 135, 0.28), 0 8px 10px -6px rgba(88, 28, 135, 0.2)',
                        '0 18px 34px -4px rgba(88, 28, 135, 0.42), 0 10px 14px -5px rgba(88, 28, 135, 0.3)',
                        '0 10px 25px -5px rgba(88, 28, 135, 0.28), 0 8px 10px -6px rgba(88, 28, 135, 0.2)',
                      ],
                    }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <span>Open Brochure</span>
              <ChevronDown className="w-4 h-4 text-white" />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => scrollToSection('contact-about')}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -7, 0],
                      boxShadow: [
                        '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
                        '0 18px 34px -4px rgba(15, 23, 42, 0.14), 0 10px 14px -5px rgba(15, 23, 42, 0.10)',
                        '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
                      ],
                    }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/80 bg-white/75 hover:bg-white text-slate-800 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <span>About & Contact</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Turn the Page Hint */}
        <div className="relative z-20 w-full max-w-md mx-auto text-center flex flex-col items-center">
          <motion.button
            type="button"
            onClick={openDocument}
            animate={
              shouldReduceMotion
                ? { opacity: 0.8, y: 0 }
                : { opacity: [0.65, 1, 0.65], y: [0, 4, 0] }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer group px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60"
          >
            <span>Turn the page</span>
            <span className="text-sm font-bold">↓</span>
          </motion.button>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: CINEMATIC CURTAIN WIPE DOCUMENT SHEET
          - Slides up smoothly over the cover (y: 100% -> 0%)
          - Leading glowing edge dividing the cover and the document
          - Sticky Header with logo, navigation links, and "Return to Cover"
          - SCREEN 2: The 3 Cards (Project, Product, AI Feature) fitting fully on screen
          - SCREEN 3: Contact (Left) & About Us (Right) with distinct dark background
          - Returns down to cover smoothly when scrolling up at top or clicking "Top"
          ========================================================================= */}
      <motion.main
        id="document-sheet"
        ref={sheetRef}
        onScroll={handleSheetScroll}
        initial={{ y: '100%' }}
        animate={{ y: isCoverOpen ? '100%' : '0%' }}
        transition={{ 
          duration: 0.85, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="fixed inset-0 z-30 bg-[#10152B] overflow-y-auto overscroll-contain shadow-[0_-35px_90px_rgba(0,0,0,0.5)] scroll-smooth no-scrollbar"
        style={{
          scrollSnapType: 'y proximity',
          scrollPaddingTop: '56px',
        }}
      >
        {/* Leading Sharp Edge Glowing Line */}
        <div className="sticky top-0 z-50 w-full h-[2.5px] bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#D946EF] shadow-md shadow-purple-500/50" />

        {/* Sticky Header inside Document Sheet - Adaptive Theme */}
        <header 
          className={`sticky top-[2.5px] z-40 w-full px-5 sm:px-10 lg:px-14 py-3 transition-colors duration-300 flex items-center justify-between shadow-sm ${
            activeSection === 'capabilities'
              ? 'bg-[#10152B]/95 backdrop-blur-md border-b border-white/10 text-white'
              : 'bg-[#EAF0FF]/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900'
          }`}
        >
          <button
            type="button"
            onClick={closeDocument}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            title="Return to Cover (Wipe Down)"
          >
            <div className="h-8 sm:h-9 w-auto flex items-center justify-center">
              <img 
                src="/axiino-logo.png" 
                alt="Axiino Logo" 
                className="h-full w-auto object-contain drop-shadow-sm" 
              />
            </div>
            <span 
              className={`font-display font-black text-lg tracking-tight transition-colors ${
                activeSection === 'capabilities'
                  ? 'text-white group-hover:text-purple-400'
                  : 'text-slate-900 group-hover:text-purple-600'
              }`}
            >
              AXIINO
            </span>
            <span 
              className={`text-[10px] font-extrabold tracking-widest uppercase ml-2 hidden sm:inline ${
                activeSection === 'capabilities' ? 'text-purple-400' : 'text-purple-700'
              }`}
            >
              Brochure
            </span>
          </button>

          {/* Quick Section Nav inside Sheet */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setScreen2Mode('works');
                scrollToSection('capabilities');
              }}
              className={`transition-colors cursor-pointer ${
                activeSection === 'capabilities' && screen2Mode === 'works'
                  ? 'text-purple-400 font-black'
                  : activeSection === 'capabilities'
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Our Work
            </button>
            <button
              type="button"
              onClick={() => {
                setScreen2Mode('services');
                scrollToSection('capabilities');
              }}
              className={`transition-colors cursor-pointer ${
                activeSection === 'capabilities' && screen2Mode === 'services'
                  ? 'text-purple-400 font-black'
                  : activeSection === 'capabilities'
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact-about')}
              className={`transition-colors cursor-pointer ${
                activeSection === 'contact-about'
                  ? 'text-purple-700 font-black'
                  : activeSection === 'capabilities'
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About & Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeDocument}
              className={`hidden sm:flex items-center gap-1 text-xs font-semibold transition-colors px-2 py-1 cursor-pointer ${
                activeSection === 'capabilities'
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Cover</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeSection === 'capabilities') {
                  scrollToSection('contact-about');
                } else {
                  onOpenContact();
                }
              }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-1.5 bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#D946EF] hover:opacity-95 text-white text-xs font-bold rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>
        </header>

        {/* =========================================================================
            SCREEN 2: OUR WORK (Rich Dark Navy Background + Light Accent Cards)
            - Fits 100% within one viewport on desktop/laptop (calc(100svh - 56px))
            - Rich dark navy background (#10152B) with subtle floating particles,
              gentle moving gradient orbs, and network grid pattern
            - 3 beautiful light cards: Project (#E9E4FF), Product (#DDF8FC), AI Feature (#FFE5F1)
            - Dark navy typography, pillar-coordinated accent pills and status dots
            - Beautiful 3D illustrations & brand gradient Learn More buttons
            ========================================================================= */}
        <section 
          id="capabilities"
          onMouseMove={handleScreen2MouseMove}
          onMouseLeave={handleScreen2MouseLeave}
          style={{ scrollSnapAlign: 'start' }}
          className="relative w-full h-auto lg:h-[calc(100svh-56px)] min-h-[calc(100svh-56px)] lg:max-h-[calc(100svh-56px)] bg-[#10152B] py-5 sm:py-6 lg:py-0 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center items-center overflow-hidden select-none"
        >

          {/* #1: Subtle Animated Network Connections / Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="workGridPattern" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C4B5FD" strokeWidth="0.75" />
                <circle cx="0" cy="0" r="1.5" fill="#38BDF8" opacity="0.6" />
                <circle cx="56" cy="56" r="1.5" fill="#A855F7" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#workGridPattern)" />
          </svg>

          {/* #2: Slowly Floating Glowing Particles */}
          {!shouldReduceMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {OUR_WORK_PARTICLES.map((p) => (
                <motion.span
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}`,
                  }}
                  animate={{
                    y: [0, -22, 0],
                    opacity: [0.25, 0.75, 0.25],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          )}

          {/* #3: Large Blurred Purple, Blue and Cyan Gradient Orbs Moving Gently */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: ['-50%', '-46%', '-52%', '-50%'],
                    y: ['-50%', '-54%', '-46%', '-50%'],
                    scale: [1, 1.15, 0.95, 1],
                    opacity: [0.18, 0.30, 0.16, 0.18],
                  }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-[18%] w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-violet-600/25 blur-3xl pointer-events-none z-0"
          />
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: ['-50%', '-52%', '-47%', '-50%'],
                    y: ['-50%', '-45%', '-55%', '-50%'],
                    scale: [0.95, 1.2, 0.98, 0.95],
                    opacity: [0.14, 0.26, 0.14, 0.14],
                  }
            }
            transition={{
              duration: 18,
              delay: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none z-0"
          />
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: ['-50%', '-46%', '-53%', '-50%'],
                    y: ['-50%', '-53%', '-47%', '-50%'],
                    scale: [1.05, 0.92, 1.15, 1.05],
                    opacity: [0.16, 0.28, 0.15, 0.16],
                  }
            }
            transition={{
              duration: 17,
              delay: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-[82%] w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-pink-600/22 blur-3xl pointer-events-none z-0"
          />

          {/* #4: Interactive Cursor Spotlight */}
          {!shouldReduceMotion && isSpotlightVisible && (
            <div
              className="absolute pointer-events-none transition-opacity duration-300 rounded-full blur-3xl z-0"
              style={{
                left: screen2Spotlight.x - 220,
                top: screen2Spotlight.y - 220,
                width: 440,
                height: 440,
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.10) 40%, rgba(236, 72, 153, 0.05) 70%, transparent 80%)',
                opacity: isSpotlightVisible ? 1 : 0,
              }}
            />
          )}

          {/* Section Header: Centered Main Caption + Left-Aligned Our Work & Sub-text */}
          <div className="relative z-10 w-full max-w-7xl mx-auto mb-3 sm:mb-4 lg:mb-5 flex-shrink-0">
            {/* Centered Main Caption in White */}
            <div className="text-center mb-1.5 sm:mb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-[32px] text-white tracking-tight leading-tight">
                Your goals matter. We help make them real.
              </h2>
            </div>

            {/* Centered Segmented Toggle: Our Works <-> What We Offer */}
            <div className="flex justify-center mb-2.5 sm:mb-3">
              <div className="inline-flex items-center p-1.5 rounded-full bg-[#161B33]/90 border border-violet-500/35 backdrop-blur-md shadow-xl shadow-purple-950/50">
                <button
                  type="button"
                  onClick={() => setScreen2Mode('works')}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    screen2Mode === 'works'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/50 font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Our Works</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScreen2Mode('services')}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    screen2Mode === 'services'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/50 font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>What We Offer</span>
                </button>
              </div>
            </div>

            {/* Left-Aligned: Our Work / What We Offer Title & Light Grey Sub-text */}
            <div className="text-left flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base sm:text-lg text-white tracking-tight">
                  {screen2Mode === 'works' ? 'Our Work' : 'What We Offer'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span>{screen2Mode === 'works' ? '02 · WHAT WE BUILD' : '02 · WHAT WE DELIVER'}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {screen2Mode === 'works'
                  ? 'Three pillars powering client platforms, proprietary SaaS, and intelligent workflows.'
                  : 'Three pillars powering custom software, applied AI systems, and cloud infrastructure.'}
              </p>
            </div>
          </div>

          {/* Main 3-Box Interactive Stage with 3D Flip & Shine Transition */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 xl:gap-7 w-full max-w-7xl mx-auto items-stretch flex-shrink-0">
            
            {/* =================================================================
                SLOT 1: PROJECT (Works) <-> SOFTWARE & APPS (Services) [Lavender #E9E4FF]
                ================================================================= */}
            <div 
              className="relative h-[285px] sm:h-[305px] lg:h-[315px] xl:h-[330px] rounded-[24px]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                animate={{ 
                  rotateY: shouldReduceMotion ? 0 : (screen2Mode === 'works' ? 0 : 180) 
                }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduceMotion ? 0 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="relative w-full h-full rounded-[24px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT FACE: PROJECT (Works) */}
                <div 
                  onClick={() => {
                    if (screen2Mode === 'works') setActiveCategoryView('project');
                  }}
                  style={{ 
                    backgroundColor: '#E9E4FF',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    pointerEvents: screen2Mode === 'works' ? 'auto' : 'none'
                  }}
                  className="group absolute inset-0 rounded-[24px] border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_45px_rgba(124,58,237,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Left: Category Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-[#10152B] tracking-tight leading-none group-hover:text-purple-950 transition-colors">
                      Project
                    </h3>
                    <span className="text-[#6B5BA5] font-bold text-xs sm:text-sm mt-1.5 block">
                      Client Platforms
                    </span>
                  </div>

                  {/* Middle Left: Micro-Metrics with Purple Accent Dot */}
                  <div className="relative z-10 my-auto py-1 space-y-1.5 max-w-[50%]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-purple-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_6px_rgba(124,58,237,0.6)]" />
                      <span>{PORTFOLIO_CARDS.filter(c => c.type === 'project').length} Live Platforms</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-purple-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
                      <span>50,000+ Users</span>
                    </div>
                  </div>

                  {/* Right: 3D Visual Illustration with Violet Radial Glow */}
                  <div className="absolute right-0 bottom-2 w-[54%] h-[78%] pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <div className="absolute w-36 h-36 rounded-full bg-purple-400/25 blur-2xl pointer-events-none z-0" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: [-4, 4, -4],
                            }
                      }
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full flex items-center justify-center relative z-10"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="projGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#6366F1" />
                          </linearGradient>
                          <linearGradient id="projGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A78BFA" />
                            <stop offset="100%" stopColor="#7C3AED" />
                          </linearGradient>
                          <linearGradient id="projGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C4B5FD" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                          <filter id="projShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#6366F1" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <g filter="url(#projShadow)">
                          <path d="M105 130 L165 98 L105 66 L45 98 Z" fill="url(#projGrad1)" />
                          <path d="M45 98 L105 130 L105 145 L45 113 Z" fill="#4F46E5" />
                          <path d="M105 130 L165 98 L165 113 L105 145 Z" fill="#4338CA" />
                        </g>
                        <g transform="translate(0, -22)">
                          <path d="M105 115 L155 88 L105 61 L55 88 Z" fill="url(#projGrad2)" />
                          <path d="M55 88 L105 115 L105 125 L55 98 Z" fill="#6D28D9" />
                          <path d="M105 115 L155 88 L155 98 L105 125 Z" fill="#5B21B6" />
                        </g>
                        <g transform="translate(0, -44)">
                          <path d="M105 100 L145 78 L105 56 L65 78 Z" fill="url(#projGrad3)" />
                          <ellipse cx="105" cy="78" rx="14" ry="7" fill="#FFFFFF" opacity="0.9" />
                        </g>
                        <circle cx="160" cy="55" r="9" fill="#EC4899" />
                        <circle cx="158" cy="53" r="3" fill="#FFFFFF" opacity="0.8" />
                        <circle cx="48" cy="65" r="7" fill="#06B6D4" />
                        <circle cx="168" cy="115" r="5" fill="#3B82F6" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Left: Gradient Learn More Button */}
                  <div className="relative z-10 flex items-center">
                    <div 
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-purple-900/15 group-hover:shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-102 transition-all duration-200"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* One-time Shine Sweep Effect */}
                  <CardShineEffect triggerKey={`${screen2Mode}-0`} delay={0.28} />
                </div>

                {/* BACK FACE: SOFTWARE & APPS (Services) */}
                <div 
                  onClick={() => {
                    if (screen2Mode === 'services') setActiveServiceCategory('core');
                  }}
                  style={{ 
                    backgroundColor: '#E9E4FF',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    pointerEvents: screen2Mode === 'services' ? 'auto' : 'none'
                  }}
                  className="group absolute inset-0 rounded-[24px] border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_45px_rgba(124,58,237,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Left: Category Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-[#10152B] tracking-tight leading-none group-hover:text-purple-950 transition-colors">
                      Software & Apps
                    </h3>
                    <span className="text-[#6B5BA5] font-bold text-xs sm:text-sm mt-1.5 block">
                      Web & Mobile Engineering
                    </span>
                  </div>

                  {/* Middle Left: Micro-Metrics with Purple Accent Dot */}
                  <div className="relative z-10 my-auto py-1 space-y-1.5 max-w-[50%]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-purple-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_6px_rgba(124,58,237,0.6)]" />
                      <span>Custom & Enterprise</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-purple-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
                      <span>iOS, Android & Web</span>
                    </div>
                  </div>

                  {/* Right: 3D Visual Illustration with Violet Radial Glow */}
                  <div className="absolute right-0 bottom-2 w-[54%] h-[78%] pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <div className="absolute w-36 h-36 rounded-full bg-purple-400/25 blur-2xl pointer-events-none z-0" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: [-4, 4, -4],
                            }
                      }
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full flex items-center justify-center relative z-10"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="servGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#6366F1" />
                          </linearGradient>
                          <linearGradient id="servGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A78BFA" />
                            <stop offset="100%" stopColor="#7C3AED" />
                          </linearGradient>
                          <linearGradient id="servGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C4B5FD" />
                            <stop offset="100%" stopColor="#38BDF8" />
                          </linearGradient>
                          <filter id="servShadow1" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#6366F1" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <g filter="url(#servShadow1)">
                          <path d="M105 130 L165 98 L105 66 L45 98 Z" fill="url(#servGrad1)" />
                          <path d="M45 98 L105 130 L105 145 L45 113 Z" fill="#4F46E5" />
                          <path d="M105 130 L165 98 L165 113 L105 145 Z" fill="#4338CA" />
                        </g>
                        <g transform="translate(0, -22)">
                          <path d="M105 115 L155 88 L105 61 L55 88 Z" fill="url(#servGrad2)" />
                          <path d="M55 88 L105 115 L105 125 L55 98 Z" fill="#6D28D9" />
                          <path d="M105 115 L155 88 L155 98 L105 125 Z" fill="#5B21B6" />
                          <line x1="85" y1="88" x2="125" y2="88" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                          <line x1="92" y1="94" x2="118" y2="94" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                        </g>
                        <g transform="translate(0, -44)">
                          <rect x="88" y="46" width="34" height="52" rx="6" fill="url(#servGrad3)" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(-15 88 46)" />
                          <circle cx="106" cy="54" r="2" fill="#FFFFFF" opacity="0.9" />
                          <rect x="96" y="64" width="16" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
                          <rect x="94" y="70" width="20" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" />
                        </g>
                        <circle cx="160" cy="55" r="9" fill="#EC4899" />
                        <circle cx="158" cy="53" r="3" fill="#FFFFFF" opacity="0.8" />
                        <circle cx="48" cy="65" r="7" fill="#06B6D4" />
                        <circle cx="168" cy="115" r="5" fill="#3B82F6" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Left: Gradient Learn More Button */}
                  <div className="relative z-10 flex items-center">
                    <div 
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-purple-900/15 group-hover:shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-102 transition-all duration-200"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* One-time Shine Sweep Effect */}
                  <CardShineEffect triggerKey={`${screen2Mode}-0`} delay={0.28} />
                </div>
              </motion.div>
            </div>

            {/* =================================================================
                SLOT 2: PRODUCT (Works) <-> AI & SAAS (Services) [Icy Cyan #DDF8FC]
                ================================================================= */}
            <div 
              className="relative h-[285px] sm:h-[305px] lg:h-[315px] xl:h-[330px] rounded-[24px]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                animate={{ 
                  rotateY: shouldReduceMotion ? 0 : (screen2Mode === 'works' ? 0 : 180) 
                }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduceMotion ? 0 : 0.08,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="relative w-full h-full rounded-[24px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT FACE: PRODUCT (Works) */}
                <div 
                  onClick={() => {
                    if (screen2Mode === 'works') setActiveCategoryView('product');
                  }}
                  style={{ 
                    backgroundColor: '#DDF8FC',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    pointerEvents: screen2Mode === 'works' ? 'auto' : 'none'
                  }}
                  className="group absolute inset-0 rounded-[24px] border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_45px_rgba(6,182,212,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Left: Category Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-[#10152B] tracking-tight leading-none group-hover:text-cyan-950 transition-colors">
                      Product
                    </h3>
                    <span className="text-[#0E7490] font-bold text-xs sm:text-sm mt-1.5 block">
                      In-House SaaS
                    </span>
                  </div>

                  {/* Middle Left: Micro-Metrics with Cyan Accent Dot */}
                  <div className="relative z-10 my-auto py-1 space-y-1.5 max-w-[50%]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-cyan-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                      <span>Automated HR & Payroll</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-cyan-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shadow-[0_0_6px_rgba(2,132,199,0.6)]" />
                      <span>Real-Time Sync</span>
                    </div>
                  </div>

                  {/* Right: 3D Visual Illustration with Cyan Radial Glow */}
                  <div className="absolute right-0 bottom-2 w-[54%] h-[78%] pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                    <div className="absolute w-36 h-36 rounded-full bg-cyan-400/25 blur-2xl pointer-events-none z-0" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: [4, -4, 4],
                            }
                      }
                      transition={{
                        duration: 4.8,
                        delay: 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full flex items-center justify-center relative z-10"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="prodGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22D3EE" />
                            <stop offset="100%" stopColor="#0284C7" />
                          </linearGradient>
                          <linearGradient id="prodGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#67E8F9" />
                            <stop offset="100%" stopColor="#0369A1" />
                          </linearGradient>
                          <filter id="prodShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#06B6D4" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <g filter="url(#prodShadow)">
                          <path d="M100 50 L150 78 L100 106 L50 78 Z" fill="url(#prodGrad1)" />
                          <path d="M50 78 L100 106 L100 156 L50 128 Z" fill="#0369A1" />
                          <path d="M100 106 L150 78 L150 128 L100 156 Z" fill="#075985" />
                        </g>
                        <g transform="translate(18, -18)">
                          <path d="M100 55 L140 77 L100 99 L60 77 Z" fill="#FFFFFF" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.5" />
                          <line x1="85" y1="73" x2="115" y2="73" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="75" cy="73" r="2.5" fill="#22D3EE" />
                        </g>
                        <rect x="35" y="45" width="34" height="12" rx="6" fill="#06B6D4" transform="rotate(-15 35 45)" />
                        <rect x="135" y="125" width="28" height="10" rx="5" fill="#8B5CF6" transform="rotate(15 135 125)" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Left: Gradient Learn More Button */}
                  <div className="relative z-10 flex items-center">
                    <div 
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-blue-900/15 group-hover:shadow-lg group-hover:shadow-cyan-500/25 group-hover:scale-102 transition-all duration-200"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* One-time Shine Sweep Effect */}
                  <CardShineEffect triggerKey={`${screen2Mode}-1`} delay={0.36} />
                </div>

                {/* BACK FACE: AI & SAAS (Services) */}
                <div 
                  onClick={() => {
                    if (screen2Mode === 'services') setActiveServiceCategory('ai_saas');
                  }}
                  style={{ 
                    backgroundColor: '#DDF8FC',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    pointerEvents: screen2Mode === 'services' ? 'auto' : 'none'
                  }}
                  className="group absolute inset-0 rounded-[24px] border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_45px_rgba(6,182,212,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Left: Category Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-[#10152B] tracking-tight leading-none group-hover:text-cyan-950 transition-colors">
                      AI & SaaS
                    </h3>
                    <span className="text-[#0E7490] font-bold text-xs sm:text-sm mt-1.5 block">
                      Applied Intelligence & SaaS
                    </span>
                  </div>

                  {/* Middle Left: Micro-Metrics with Cyan Accent Dot */}
                  <div className="relative z-10 my-auto py-1 space-y-1.5 max-w-[50%]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-cyan-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                      <span>Custom LLM & RAG</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-cyan-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shadow-[0_0_6px_rgba(2,132,199,0.6)]" />
                      <span>Multi-Tenant Architecture</span>
                    </div>
                  </div>

                  {/* Right: 3D Visual Illustration with Cyan Radial Glow */}
                  <div className="absolute right-0 bottom-2 w-[54%] h-[78%] pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                    <div className="absolute w-36 h-36 rounded-full bg-cyan-400/25 blur-2xl pointer-events-none z-0" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: [4, -4, 4],
                            }
                      }
                      transition={{
                        duration: 4.8,
                        delay: 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full flex items-center justify-center relative z-10"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="servAiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22D3EE" />
                            <stop offset="100%" stopColor="#0284C7" />
                          </linearGradient>
                          <linearGradient id="servAiGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#67E8F9" />
                            <stop offset="100%" stopColor="#0369A1" />
                          </linearGradient>
                          <filter id="servShadow2" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#06B6D4" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <g filter="url(#servShadow2)">
                          <path d="M100 50 L150 78 L100 106 L50 78 Z" fill="url(#servAiGrad1)" />
                          <path d="M50 78 L100 106 L100 156 L50 128 Z" fill="#0369A1" />
                          <path d="M100 106 L150 78 L150 128 L100 156 Z" fill="#075985" />
                        </g>
                        <g transform="translate(18, -18)">
                          <path d="M100 55 L140 77 L100 99 L60 77 Z" fill="#FFFFFF" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.5" />
                          <line x1="85" y1="73" x2="115" y2="73" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="75" cy="73" r="2.5" fill="#22D3EE" />
                        </g>
                        <rect x="35" y="45" width="34" height="12" rx="6" fill="#06B6D4" transform="rotate(-15 35 45)" />
                        <rect x="135" y="125" width="28" height="10" rx="5" fill="#8B5CF6" transform="rotate(15 135 125)" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Left: Gradient Learn More Button */}
                  <div className="relative z-10 flex items-center">
                    <div 
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-blue-900/15 group-hover:shadow-lg group-hover:shadow-cyan-500/25 group-hover:scale-102 transition-all duration-200"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* One-time Shine Sweep Effect */}
                  <CardShineEffect triggerKey={`${screen2Mode}-1`} delay={0.36} />
                </div>
              </motion.div>
            </div>

            {/* =================================================================
                SLOT 3: AI FEATURE (Works) <-> BACKEND & CLOUD (Services) [Rose Pink #FFE5F1]
                ================================================================= */}
            <div 
              className="relative h-[285px] sm:h-[305px] lg:h-[315px] xl:h-[330px] rounded-[24px]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                animate={{ 
                  rotateY: shouldReduceMotion ? 0 : (screen2Mode === 'works' ? 0 : 180) 
                }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduceMotion ? 0 : 0.16,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="relative w-full h-full rounded-[24px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT FACE: AI FEATURE (Works) */}
                <div 
                  onClick={() => {
                    if (screen2Mode === 'works') setActiveCategoryView('ai_feature');
                  }}
                  style={{ 
                    backgroundColor: '#FFE5F1',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    pointerEvents: screen2Mode === 'works' ? 'auto' : 'none'
                  }}
                  className="group absolute inset-0 rounded-[24px] border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_45px_rgba(236,72,153,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Left: Category Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-[#10152B] tracking-tight leading-none group-hover:text-pink-950 transition-colors">
                      AI Feature
                    </h3>
                    <span className="text-[#BE185D] font-bold text-xs sm:text-sm mt-1.5 block">
                      Applied Intelligence
                    </span>
                  </div>

                  {/* Middle Left: Micro-Metrics with Pink Accent Dot */}
                  <div className="relative z-10 my-auto py-1 space-y-1.5 max-w-[50%]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-pink-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shadow-[0_0_6px_rgba(236,72,153,0.6)]" />
                      <span>Predictive Matching</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-pink-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D946EF] shadow-[0_0_6px_rgba(217,70,239,0.6)]" />
                      <span>LLM Workflows</span>
                    </div>
                  </div>

                  {/* Right: 3D Visual Illustration with Pink Radial Glow */}
                  <div className="absolute right-0 bottom-2 w-[54%] h-[78%] pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <div className="absolute w-36 h-36 rounded-full bg-pink-400/25 blur-2xl pointer-events-none z-0" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: [-5, 5, -5],
                              rotate: [-1, 1, -1],
                            }
                      }
                      transition={{
                        duration: 4.5,
                        delay: 1.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full flex items-center justify-center relative z-10"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="aiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F472B6" />
                            <stop offset="50%" stopColor="#D946EF" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                          <filter id="aiGlow" x="-25%" y="-25%" width="150%" height="150%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <filter id="aiShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#D946EF" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <ellipse cx="105" cy="100" rx="65" ry="32" stroke="#475569" strokeWidth="2.5" strokeOpacity="0.4" transform="rotate(-25 105 100)" />
                        <ellipse cx="105" cy="100" rx="65" ry="32" stroke="url(#aiGrad1)" strokeWidth="3" strokeDasharray="30 180" transform="rotate(-25 105 100)" />
                        <g filter="url(#aiShadow)">
                          <polygon points="105,45 145,90 105,105 65,90" fill="#F472B6" />
                          <polygon points="105,45 105,105 145,90" fill="#EC4899" />
                          <polygon points="65,90 105,105 105,155" fill="#C026D3" />
                          <polygon points="145,90 105,105 105,155" fill="#9333EA" />
                          <circle cx="105" cy="85" r="4" fill="#FFFFFF" opacity="0.9" filter="url(#aiGlow)" />
                        </g>
                        <circle cx="155" cy="65" r="7" fill="#06B6D4" />
                        <circle cx="153" cy="63" r="2.5" fill="#FFFFFF" opacity="0.8" />
                        <circle cx="55" cy="125" r="5" fill="#F43F5E" />
                        <circle cx="85" cy="35" r="3.5" fill="#A855F7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Left: Gradient Learn More Button */}
                  <div className="relative z-10 flex items-center">
                    <div 
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-pink-900/15 group-hover:shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-102 transition-all duration-200"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* One-time Shine Sweep Effect */}
                  <CardShineEffect triggerKey={`${screen2Mode}-2`} delay={0.44} />
                </div>

                {/* BACK FACE: BACKEND & CLOUD (Services) */}
                <div 
                  onClick={() => {
                    if (screen2Mode === 'services') setActiveServiceCategory('cloud');
                  }}
                  style={{ 
                    backgroundColor: '#FFE5F1',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    pointerEvents: screen2Mode === 'services' ? 'auto' : 'none'
                  }}
                  className="group absolute inset-0 rounded-[24px] border border-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:shadow-[0_22px_45px_rgba(236,72,153,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Left: Category Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-[#10152B] tracking-tight leading-none group-hover:text-pink-950 transition-colors">
                      Backend & Cloud
                    </h3>
                    <span className="text-[#BE185D] font-bold text-xs sm:text-sm mt-1.5 block">
                      Infrastructure & Systems
                    </span>
                  </div>

                  {/* Middle Left: Micro-Metrics with Pink Accent Dot */}
                  <div className="relative z-10 my-auto py-1 space-y-1.5 max-w-[50%]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-pink-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shadow-[0_0_6px_rgba(236,72,153,0.6)]" />
                      <span>Sub-100ms APIs</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-pink-200/90 text-[11px] font-bold text-slate-900 shadow-2xs backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D946EF] shadow-[0_0_6px_rgba(217,70,239,0.6)]" />
                      <span>DevOps & DB Scale</span>
                    </div>
                  </div>

                  {/* Right: 3D Visual Illustration with Pink Radial Glow */}
                  <div className="absolute right-0 bottom-2 w-[54%] h-[78%] pointer-events-none flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                    <div className="absolute w-36 h-36 rounded-full bg-pink-400/25 blur-2xl pointer-events-none z-0" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: [-5, 5, -5],
                              rotate: [-1, 1, -1],
                            }
                      }
                      transition={{
                        duration: 4.5,
                        delay: 1.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full flex items-center justify-center relative z-10"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="servCloudGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F472B6" />
                            <stop offset="50%" stopColor="#D946EF" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                          <filter id="servCloudGlow" x="-25%" y="-25%" width="150%" height="150%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <filter id="servCloudShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#D946EF" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <ellipse cx="105" cy="100" rx="65" ry="32" stroke="#475569" strokeWidth="2.5" strokeOpacity="0.4" transform="rotate(-25 105 100)" />
                        <ellipse cx="105" cy="100" rx="65" ry="32" stroke="url(#servCloudGrad1)" strokeWidth="3" strokeDasharray="30 180" transform="rotate(-25 105 100)" />
                        <g filter="url(#servCloudShadow)">
                          <polygon points="105,45 145,90 105,105 65,90" fill="#F472B6" />
                          <polygon points="105,45 105,105 145,90" fill="#EC4899" />
                          <polygon points="65,90 105,105 105,155" fill="#C026D3" />
                          <polygon points="145,90 105,105 105,155" fill="#9333EA" />
                          <circle cx="105" cy="85" r="4" fill="#FFFFFF" opacity="0.9" filter="url(#servCloudGlow)" />
                        </g>
                        <circle cx="155" cy="65" r="7" fill="#06B6D4" />
                        <circle cx="153" cy="63" r="2.5" fill="#FFFFFF" opacity="0.8" />
                        <circle cx="55" cy="125" r="5" fill="#F43F5E" />
                        <circle cx="85" cy="35" r="3.5" fill="#A855F7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Bottom Left: Gradient Learn More Button */}
                  <div className="relative z-10 flex items-center">
                    <div 
                      className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-pink-900/15 group-hover:shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-102 transition-all duration-200"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* One-time Shine Sweep Effect */}
                  <CardShineEffect triggerKey={`${screen2Mode}-2`} delay={0.44} />
                </div>
              </motion.div>
            </div>

          </div>
    </section>

        {/* =========================================================================
            SCREEN 3: CONTACT & ABOUT (Light Lavender Theme #EAF0FF)
            - Fits 100% within one viewport on desktop/laptop (calc(100svh - 56px))
            - Light lavender background (#EAF0FF)
            - Dark navy headings
            - Clean white card for contact form with subtle shadows
            - Clean text section for About Axiino without heavy borders
            - Company statistics in compact attractive cards
            - Preserves existing email, contact form, contact info and functionality
            - Retains blue-to-purple/pink gradient button style
            - Balanced 2-column layout on desktop
            ========================================================================= */}
        <section 
          id="contact-about"
          style={{ scrollSnapAlign: 'start' }}
          className="relative w-full h-auto lg:h-[calc(100svh-56px)] min-h-[calc(100svh-56px)] lg:max-h-[calc(100svh-56px)] bg-[#EAF0FF] text-slate-900 py-4 sm:py-6 lg:py-0 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Subtle Ambient Decorative Gradients in Screen 3 */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Main 2-Column Grid (Contact on left, About Us on right) */}
          <div className="w-full max-w-7xl mx-auto my-auto py-2 lg:py-3">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 xl:gap-10 items-center">
              
              {/* =================================================================
                  LEFT COLUMN: CONTACT US (Clean White Card)
                  ================================================================= */}
              <div className="lg:col-span-6 bg-white rounded-[24px] border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-[0_12px_36px_rgba(16,21,43,0.06)] relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500" />

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200/80 mb-2">
                    <MessageSquare className="w-3 h-3 text-blue-600" />
                    <span>CONTACT US</span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl lg:text-[26px] text-[#10152B] tracking-tight leading-tight">
                    Let&apos;s Build Your Solution
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Have a project in mind, need custom software, or want to integrate AI into your workflow? Reach out directly.
                  </p>

                  {/* Open Full Form Button */}
                  <div className="mt-3 flex items-center">
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm shadow-purple-900/20 hover:opacity-95 transition-opacity cursor-pointer"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open Full Form</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Quick Contact Form */}
                <form onSubmit={handleFormSubmit} className="mt-3.5 space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Project or Question
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us what you would like to build..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full py-2.5 px-5 rounded-xl font-bold text-xs text-white shadow-md shadow-purple-900/25 hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    {formSubmitted ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Thank you! We&apos;ll be in touch shortly.</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Direct Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* =================================================================
                  RIGHT COLUMN: ABOUT US (Clean Text Section Without Heavy Borders)
                  ================================================================= */}
              <div className="lg:col-span-6 flex flex-col justify-between p-1 sm:p-2 lg:p-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold text-purple-700 bg-purple-100/80 border border-purple-200/80 mb-2">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>ABOUT AXIINO</span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl lg:text-[26px] text-[#10152B] tracking-tight leading-tight">
                    Software Built for Scale
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    Axiino is a specialized engineering and software company that designs, builds, and maintains high-performing web apps, enterprise business tools, and custom AI systems.
                  </p>

                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    From our in-house product handling workforce attendance and automated payroll to community platforms serving over 50,000 members, our focus is simple: deliver clean, resilient software that solves real business problems.
                  </p>

                  {/* Key Company Statistics in Compact Attractive Cards */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
                      <div className="font-display font-black text-xl sm:text-2xl text-[#2563EB]">
                        5+
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        Live Platforms
                      </div>
                      <div className="text-[10px] text-slate-500">
                        In production & active use
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
                      <div className="font-display font-black text-xl sm:text-2xl text-[#7C3AED]">
                        50,000+
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        Active Members
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Served across our networks
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
                      <div className="font-display font-black text-xl sm:text-2xl text-[#D946EF]">
                        100%
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        Bespoke Engineering
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Tailored to client business needs
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-shadow">
                      <div className="font-display font-black text-xl sm:text-2xl text-[#0284C7]">
                        24/7
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        Reliable Cloud
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Continuous uptime & backup
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-semibold mr-1">Core Tech:</span>
                    {['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'AWS', 'AI / LLM APIs'].map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-700 bg-white border border-slate-200/90 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Screen 3 Bottom Footer Bar */}
          <footer className="w-full max-w-7xl mx-auto py-2.5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span>© 2026 Axiino Technologies. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={closeDocument}
                className="flex items-center gap-1 transition-colors text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Top / Cover</span>
              </button>
            </div>
          </footer>
        </section>

      </motion.main>

      {/* =========================================================================
          LAYER 3: DETAILED PORTFOLIO / CATEGORY VIEW (Reversed Contrast Design)
          - Light lavender/blue background (#E9EDFA)
          - Project/product/AI cards in dark navy (#202943)
          - Card headings in white, descriptions in light grey (#C5CEE0)
          - Feature tags in slightly lighter navy (#303B57)
          - Subtle card borders and blue-purple-pink gradient buttons
          - Two-column 2x2 grid for Projects, two-card layouts for Products and AI
          - Fully responsive and fits desktop/laptop viewports
          ========================================================================= */}
      <AnimatePresence>
        {activeCategoryView && (
          <motion.div
            key="category-screen-wipe"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              duration: 0.55, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="fixed inset-0 z-50 h-[100dvh] max-h-[100dvh] bg-[#E9EDFA] flex flex-col justify-between overflow-hidden shadow-[-30px_0_90px_rgba(16,21,43,0.35)] text-slate-900 select-none"
          >
            {/* Subtle Ambient Chromatic Lighting on Light Background */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-purple-300/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[460px] h-[460px] rounded-full bg-blue-300/20 blur-[120px] pointer-events-none" />

            {/* Leading Left Edge Glowing Gradient Line */}
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#D946EF] shadow-lg shadow-purple-500/40 z-50" />

            {/* Sticky Header with High-Contrast Light Theme */}
            <header className="relative z-40 w-full px-4 sm:px-8 lg:px-12 py-3 bg-[#E9EDFA]/95 backdrop-blur-md border-b border-slate-300/80 flex items-center justify-between shadow-xs flex-shrink-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setActiveCategoryView(null)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300/90 text-xs font-bold text-slate-800 hover:text-slate-950 shadow-2xs transition-all hover:-translate-x-0.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">Back to Overview</span>
                  <span className="sm:hidden">Back</span>
                </button>

                <div className="flex items-center gap-2">
                  <span 
                    className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full border shadow-2xs ${
                      categoryInfo.accent === 'cyan'
                        ? 'text-cyan-800 bg-cyan-100/90 border-cyan-300/90'
                        : categoryInfo.accent === 'pink'
                        ? 'text-pink-700 bg-pink-100/90 border-pink-300/90'
                        : categoryInfo.accent === 'purple'
                        ? 'text-purple-700 bg-purple-100/90 border-purple-300/90'
                        : 'text-slate-800 bg-slate-200/90 border-slate-300/90'
                    }`}
                  >
                    {categoryInfo.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    ({categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'})
                  </span>
                </div>
              </div>

              {/* Category Quick Filter Switcher (Desktop / Tablet) */}
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center p-1 rounded-full bg-slate-200/90 border border-slate-300/80 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveCategoryView('all')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeCategoryView === 'all'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({PORTFOLIO_CARDS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryView('project')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeCategoryView === 'project'
                        ? 'bg-white text-purple-700 border border-purple-200 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Projects ({PORTFOLIO_CARDS.filter(c => c.type === 'project').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryView('product')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeCategoryView === 'product'
                        ? 'bg-white text-cyan-800 border border-cyan-200 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Products ({PORTFOLIO_CARDS.filter(c => c.type === 'product').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryView('ai_feature')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeCategoryView === 'ai_feature'
                        ? 'bg-white text-pink-700 border border-pink-200 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    AI Features ({PORTFOLIO_CARDS.filter(c => c.isAiPowered).length})
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCategoryView(null)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-300/90 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  title="Close and return (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Mobile Category Quick Filter Bar */}
            <div className="flex md:hidden items-center justify-start gap-1.5 px-4 py-2 bg-[#DFE5F5] border-b border-slate-300/80 overflow-x-auto no-scrollbar relative z-30 flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveCategoryView('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryView === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                All ({PORTFOLIO_CARDS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryView('project')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryView === 'project'
                    ? 'bg-white text-purple-700 border border-purple-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                Projects ({PORTFOLIO_CARDS.filter(c => c.type === 'project').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryView('product')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryView === 'product'
                    ? 'bg-white text-cyan-800 border border-cyan-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                Products ({PORTFOLIO_CARDS.filter(c => c.type === 'product').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryView('ai_feature')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryView === 'ai_feature'
                    ? 'bg-white text-pink-700 border border-pink-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                AI Features ({PORTFOLIO_CARDS.filter(c => c.isAiPowered).length})
              </button>
            </div>

            {/* Compact Category Title & Description in Dark Navy */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-2.5 pb-1 text-center flex-shrink-0">
              <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-[#10152B] tracking-tight leading-tight">
                {categoryInfo.title}
              </h2>
              <p className="mt-0.5 text-xs text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto line-clamp-1">
                {categoryInfo.description}
              </p>
            </div>

            {/* 1x2 Interactive Slider Container with Touch Swipe & Keyboard Navigation */}
            <div 
              onTouchStart={handleSliderTouchStart}
              onTouchEnd={handleSliderTouchEnd}
              className="relative z-10 flex-1 min-h-0 w-full flex flex-col justify-between px-3 sm:px-8 lg:px-14 py-2 sm:py-3 overflow-hidden"
            >
              {/* Floating Left Arrow Button */}
              {totalCategorySlides > 1 && (
                <button
                  type="button"
                  onClick={handlePrevCategorySlide}
                  disabled={currentCategorySlide === 0}
                  className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 disabled:opacity-20 disabled:pointer-events-none border border-slate-300/80 shadow-md hover:shadow-lg items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Previous projects (Left Arrow)"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Floating Right Arrow Button */}
              {totalCategorySlides > 1 && (
                <button
                  type="button"
                  onClick={handleNextCategorySlide}
                  disabled={currentCategorySlide === totalCategorySlides - 1}
                  className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 disabled:opacity-20 disabled:pointer-events-none border border-slate-300/80 shadow-md hover:shadow-lg items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Next projects (Right Arrow)"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Cards Slide Wrapper (1 row x 2 columns on desktop, 1 card on mobile) */}
              <div className="w-full flex-1 min-h-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategoryView}-${currentCategorySlide}`}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`w-full ${visibleCategoryCards.length === 1 ? 'max-w-xl' : 'max-w-5xl'} mx-auto grid grid-cols-1 ${visibleCategoryCards.length === 1 ? '' : 'md:grid-cols-2'} gap-4 sm:gap-6 items-stretch`}
                  >
                    {visibleCategoryCards.map((card) => (
                      <div
                        key={card.id}
                        style={{ backgroundColor: '#202943' }}
                        className="group rounded-[22px] border border-white/10 hover:border-purple-400/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-[0_14px_35px_rgba(16,21,43,0.22)] hover:shadow-[0_22px_45px_rgba(16,21,43,0.3)] relative overflow-hidden min-h-[350px] max-h-[460px] text-white"
                      >
                        {/* Top Specular Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none rounded-[22px]" />

                        {/* Card Header: Logo, Badges, Title, Domain Link */}
                        <div className="relative z-10">
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden">
                              <img
                                src={card.logoUrl || '/axiino-logo.png'}
                                alt={card.title}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                <span 
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                                    card.type === 'product'
                                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35'
                                      : 'bg-violet-500/20 text-violet-300 border-violet-500/35'
                                  }`}
                                >
                                  {card.badge.includes('•') ? card.badge.split('•')[1]?.trim() : card.badge}
                                </span>
                                {card.isAiPowered && (
                                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                                    <Sparkles className="w-2.5 h-2.5 text-pink-400" />
                                    AI
                                  </span>
                                )}
                              </div>

                              <h3 className="font-display font-black text-base sm:text-lg text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors truncate">
                                {card.title}
                              </h3>

                              <a
                                href={card.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
                              >
                                <span>{card.domain}</span>
                                <ArrowUpRight className="w-3 h-3 text-slate-400" />
                              </a>
                            </div>
                          </div>

                          {/* Concise, impressive value explanation */}
                          <div className="mt-3.5 space-y-1.5">
                            <p className="text-xs sm:text-sm text-[#C5CEE0] leading-relaxed font-normal">
                              {card.whatItDoes}
                            </p>
                            <p className="text-xs text-slate-400 leading-normal">
                              <span className="text-purple-300/90 font-medium">Built for: </span>
                              {card.whoItsFor}
                            </p>
                          </div>
                        </div>

                        {/* Middle: Feature tags */}
                        <div className="relative z-10 my-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400/90 block mb-1.5">
                            Key Capabilities
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {card.features.slice(0, 3).map((feat) => (
                              <span
                                key={feat}
                                style={{ backgroundColor: '#303B57' }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#E2E8F0] border border-white/10"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                <span>{feat}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Highlighted Result & Visit Website Button */}
                        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-2.5 flex-shrink-0">
                          <div className="flex-1 min-w-0 mr-2">
                            {card.result && card.result.trim().length > 0 && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#161D32] border border-emerald-500/30 text-[11px] font-medium text-emerald-300 max-w-full">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                <span className="text-slate-400 font-normal">Result:</span>
                                <span className="truncate">{card.result}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            <a
                              href={card.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                              style={{ background: 'var(--brand-gradient)' }}
                            >
                              <span>Visit Website</span>
                              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </a>
                            <span className="text-xs font-mono font-semibold text-slate-400">
                              #{card.number}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Pagination & Mobile Touch Controls */}
              {totalCategorySlides > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2 pb-1 flex-shrink-0 relative z-30">
                  <button
                    type="button"
                    onClick={handlePrevCategorySlide}
                    disabled={currentCategorySlide === 0}
                    className="p-1.5 sm:p-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-20 disabled:pointer-events-none border border-slate-300/80 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalCategorySlides }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCategorySlideIndex(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === currentCategorySlide ? 'w-6 bg-purple-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextCategorySlide}
                    disabled={currentCategorySlide === totalCategorySlides - 1}
                    className="p-1.5 sm:p-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-20 disabled:pointer-events-none border border-slate-300/80 shadow-2xs transition-all active:scale-95 cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-semibold text-slate-500 ml-1">
                    {currentCategorySlide + 1} / {totalCategorySlides}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          LAYER 3B: DETAILED SERVICES CATEGORY VIEW (Reversed Contrast Design)
          - Light lavender/blue background (#E9EDFA)
          - Service cards in dark navy (#202943)
          - Deliverables, tech core pills, and consultation CTA buttons
          ========================================================================= */}
      <AnimatePresence>
        {activeServiceCategory && (
          <motion.div
            key="service-category-screen-wipe"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              duration: 0.55, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="fixed inset-0 z-50 h-[100dvh] max-h-[100dvh] bg-[#E9EDFA] flex flex-col justify-between overflow-hidden shadow-[-30px_0_90px_rgba(16,21,43,0.35)] text-slate-900 select-none"
          >
            {/* Subtle Ambient Chromatic Lighting on Light Background */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-purple-300/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[460px] h-[460px] rounded-full bg-blue-300/20 blur-[120px] pointer-events-none" />

            {/* Leading Left Edge Glowing Gradient Line */}
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#D946EF] shadow-lg shadow-purple-500/40 z-50" />

            {/* Sticky Header with High-Contrast Light Theme */}
            <header className="relative z-40 w-full px-4 sm:px-8 lg:px-12 py-3 bg-[#E9EDFA]/95 backdrop-blur-md border-b border-slate-300/80 flex items-center justify-between shadow-xs flex-shrink-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setActiveServiceCategory(null)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300/90 text-xs font-bold text-slate-800 hover:text-slate-950 shadow-2xs transition-all hover:-translate-x-0.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">Back to Overview</span>
                  <span className="sm:hidden">Back</span>
                </button>

                <div className="flex items-center gap-2">
                  <span 
                    className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full border shadow-2xs ${
                      serviceCategoryInfo.accent === 'cyan'
                        ? 'text-cyan-800 bg-cyan-100/90 border-cyan-300/90'
                        : serviceCategoryInfo.accent === 'pink'
                        ? 'text-pink-700 bg-pink-100/90 border-pink-300/90'
                        : serviceCategoryInfo.accent === 'purple'
                        ? 'text-purple-700 bg-purple-100/90 border-purple-300/90'
                        : 'text-slate-800 bg-slate-200/90 border-slate-300/90'
                    }`}
                  >
                    {serviceCategoryInfo.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    ({serviceCategoryItems.length} {serviceCategoryItems.length === 1 ? 'service' : 'services'})
                  </span>
                </div>
              </div>

              {/* Category Quick Filter Switcher (Desktop / Tablet) */}
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center p-1 rounded-full bg-slate-200/90 border border-slate-300/80 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveServiceCategory('all')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeServiceCategory === 'all'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({SERVICES_DATA.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveServiceCategory('core')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeServiceCategory === 'core'
                        ? 'bg-white text-purple-700 border border-purple-200 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Software & Apps (3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveServiceCategory('ai_saas')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeServiceCategory === 'ai_saas'
                        ? 'bg-white text-cyan-800 border border-cyan-200 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    AI & SaaS (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveServiceCategory('cloud')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      activeServiceCategory === 'cloud'
                        ? 'bg-white text-pink-700 border border-pink-200 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Backend & Cloud (3)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveServiceCategory(null)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-300/90 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Mobile Category Quick Bar */}
            <div className="md:hidden px-4 py-2 bg-slate-100/90 border-b border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveServiceCategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeServiceCategory === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                All ({SERVICES_DATA.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveServiceCategory('core')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeServiceCategory === 'core'
                    ? 'bg-white text-purple-700 border border-purple-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                Software & Apps (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveServiceCategory('ai_saas')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeServiceCategory === 'ai_saas'
                    ? 'bg-white text-cyan-800 border border-cyan-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                AI & SaaS (2)
              </button>
              <button
                type="button"
                onClick={() => setActiveServiceCategory('cloud')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeServiceCategory === 'cloud'
                    ? 'bg-white text-pink-700 border border-pink-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-white/60'
                }`}
              >
                Backend & Cloud (3)
              </button>
            </div>

            {/* Category Screen Body with Viewport-Fit Design */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex flex-col justify-between overflow-y-auto no-scrollbar">
              {/* Category Title & Description */}
              <div className="w-full max-w-6xl mx-auto mb-2 text-center sm:text-left flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 flex-shrink-0">
                <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                  {serviceCategoryInfo.title}
                </h2>
                <p className="text-xs text-slate-600 max-w-xl line-clamp-1 font-medium">
                  {serviceCategoryInfo.description}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 flex-1 items-stretch py-2">
                {serviceCategoryItems.map((service) => (
                  <div
                    key={service.id}
                    className="group rounded-[20px] bg-[#202943] text-white p-4 sm:p-5 border border-white/10 shadow-[0_10px_28px_rgba(16,21,43,0.22)] hover:border-purple-400/50 hover:shadow-[0_14px_36px_rgba(124,58,237,0.28)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Number + Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-white/10 text-sky-400">
                          {service.number}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300">
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display font-black text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                        {service.excerpt}
                      </p>

                      {/* Key Deliverables */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1">
                        <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                          Key Deliverables
                        </div>
                        {service.keyDeliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-sky-400 flex-shrink-0" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Core Pills */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {service.techCore.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveServiceCategory(null);
                          onOpenContact();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-purple-900/20 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                        style={{ background: 'var(--brand-gradient)' }}
                      >
                        <span>Discuss {service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Mini Footer Bar */}
              <div className="w-full max-w-6xl mx-auto pt-2 border-t border-slate-300/70 flex items-center justify-between text-xs text-slate-600 flex-shrink-0">
                <span className="font-semibold text-slate-800">
                  Axiino Engineering Services · Production Deployments
                </span>
                <button
                  type="button"
                  onClick={() => setActiveServiceCategory(null)}
                  className="font-bold text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Back to Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Slide-in Drawer */}
      <CaseStudyPanel
        caseStudy={selectedCaseStudyId ? CASE_STUDIES_DATA[selectedCaseStudyId] : null}
        isOpen={!!selectedCaseStudyId}
        onClose={() => setSelectedCaseStudyId(null)}
        onOpenContact={() => {
          setSelectedCaseStudyId(null);
          onOpenContact();
        }}
      />
    </div>
  );
};
