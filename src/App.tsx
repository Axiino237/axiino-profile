import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SHOWCASE_ITEMS } from './data/showcaseData';
import { ShowcaseItem, ItemType } from './types';
import { Navbar } from './components/Navbar';
import { SlideBackground } from './components/SlideBackground';
import { SlideContent } from './components/SlideContent';
import { SlideCarousel } from './components/SlideCarousel';
import { SlideControls } from './components/SlideControls';
import { ScrollView } from './components/ScrollView';
import { ProjectDetailScreen } from './components/ProjectDetailScreen';
import { TableOfContentsModal } from './components/TableOfContentsModal';
import { ContactModal } from './components/ContactModal';

const AUTOPLAY_DURATION_MS = 6000;
const TICK_INTERVAL_MS = 50;

export function App() {
  // Load stored items from local storage if available, fallback to defaults
  const [items] = useState<ShowcaseItem[]>(() => {
    try {
      const saved = localStorage.getItem('axiino_showcase_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const savedIds = new Set(parsed.map((p: ShowcaseItem) => p.id));
          const missing = SHOWCASE_ITEMS.filter(item => !savedIds.has(item.id));
          if (missing.length > 0) {
            const merged = [...parsed, ...missing];
            localStorage.setItem('axiino_showcase_items', JSON.stringify(merged));
            return merged;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse saved items, using defaults.');
    }
    return SHOWCASE_ITEMS;
  });

  // Default mode: natural minimal cover + scrollable rich documents
  const [viewMode, setViewMode] = useState<'scroll' | 'tour'>('scroll');

  // Filter & Slides
  const [currentFilter, setCurrentFilter] = useState<'all' | ItemType>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  // Mobile Touch Swipe support in Tour mode
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Modals & Drawers
  const [selectedDetailItem, setSelectedDetailItem] = useState<ShowcaseItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    if (currentFilter === 'all') return items;
    if (currentFilter === 'ai_feature') {
      return items.filter(item => item.aiCapabilities && item.aiCapabilities.length > 0);
    }
    return items.filter(item => item.type === currentFilter);
  }, [items, currentFilter]);

  // Ensure index remains in bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgressPercent(0);
  }, [currentFilter]);

  const activeItem = filteredItems[currentIndex] || filteredItems[0] || items[0];
  const nextItem = filteredItems[(currentIndex + 1) % filteredItems.length];

  // Next / Prev slide handlers in Tour mode
  const handleNext = () => {
    setProgressPercent(0);
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setProgressPercent(0);
    setCurrentIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleSelectIndex = (index: number) => {
    setProgressPercent(0);
    setCurrentIndex(index);
  };

  // Touch Swipe Handlers for Mobile in Tour Mode
  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode !== 'tour') return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (viewMode !== 'tour' || touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Autoplay timer effect in Tour mode
  useEffect(() => {
    if (
      !isAutoPlaying ||
      viewMode !== 'tour' ||
      filteredItems.length <= 1 ||
      selectedDetailItem ||
      isAdminOpen ||
      isIndexOpen ||
      isContactOpen
    ) {
      return;
    }

    const step = (TICK_INTERVAL_MS / AUTOPLAY_DURATION_MS) * 100;
    const interval = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [
    isAutoPlaying,
    viewMode,
    filteredItems.length,
    selectedDetailItem,
    isAdminOpen,
    isIndexOpen,
    isContactOpen,
    currentIndex,
  ]);

  // Keyboard navigation in Tour mode
  useEffect(() => {
    if (viewMode !== 'tour') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedDetailItem || isAdminOpen || isIndexOpen || isContactOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, selectedDetailItem, isAdminOpen, isIndexOpen, isContactOpen, filteredItems.length]);


  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#E6EFF8] font-sans">
      {/* 1. Primary Natural Experience: Minimal Cover + Rich Scroll Documents */}
      {viewMode === 'scroll' && (
        <ScrollView
          items={items}
          onExploreItem={(item) => setSelectedDetailItem(item)}
          onSwitchToTour={(idx = 0) => {
            setCurrentIndex(idx);
            setViewMode('tour');
          }}
          onOpenIndex={() => setIsIndexOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      )}

      {/* 2. Slide Presentation Deck (Optional mode) */}
      {viewMode === 'tour' && (
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-screen h-[100dvh] overflow-hidden bg-slate-950 flex flex-col justify-between select-none"
        >
          {/* Cinematic Fullscreen Crossfade Background */}
          {activeItem && <SlideBackground item={activeItem} />}

          {/* Top Navigation Bar */}
          <Navbar
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenCover={() => setViewMode('scroll')}
            onOpenIndex={() => setIsIndexOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            viewMode={viewMode}
            onToggleViewMode={() => setViewMode('scroll')}
          />

          {/* Main Responsive Stage */}
          <main className="relative z-20 flex-1 flex flex-col justify-end px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 pb-2 sm:pb-5 overflow-hidden">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-end">
              {/* Left Column: Typography & Content */}
              <div className="lg:col-span-5 flex flex-col justify-end pb-1 sm:pb-2">
                {activeItem && (
                  <SlideContent
                    item={activeItem}
                    onExplore={(item) => setSelectedDetailItem(item)}
                  />
                )}
              </div>

              {/* Right Column: Landscape Carousel */}
              <div className="lg:col-span-7 flex flex-col justify-end items-start lg:items-end pb-1 sm:pb-2 overflow-hidden">
                <SlideCarousel
                  items={filteredItems}
                  currentIndex={currentIndex}
                  onSelectIndex={handleSelectIndex}
                />
              </div>
            </div>
          </main>

          {/* Bottom Controls */}
          <footer className="relative z-30 px-4 sm:px-8 lg:px-16 pb-3 sm:pb-5">
            <SlideControls
              currentIndex={currentIndex}
              totalSlides={filteredItems.length}
              onPrev={handlePrev}
              onNext={handleNext}
              isAutoPlaying={isAutoPlaying}
              onToggleAutoPlay={() => setIsAutoPlaying(prev => !prev)}
              progressPercent={progressPercent}
              nextItemTitle={nextItem?.title}
            />
          </footer>
        </div>
      )}

      {/* 3. Fullscreen Detailed Case Study Screen */}
      <AnimatePresence>
        {selectedDetailItem && (
          <ProjectDetailScreen
            item={selectedDetailItem}
            onClose={() => setSelectedDetailItem(null)}
          />
        )}
      </AnimatePresence>

      {/* 4. Table of Contents / Index Drawer */}
      <TableOfContentsModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        items={items}
        currentIndex={currentIndex}
        onSelectSlide={(idx) => {
          setCurrentIndex(idx);
          setIsIndexOpen(false);
          if (viewMode === 'scroll') {
            const el = document.getElementById('brochure-projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onGoToCover={() => {
          setIsIndexOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => {
          setIsIndexOpen(false);
          setIsContactOpen(true);
        }}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => prev === 'scroll' ? 'tour' : 'scroll')}
      />

      {/* 5. Contact & Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
