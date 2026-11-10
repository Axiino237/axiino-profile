import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from 'lucide-react';

interface SlideControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  progressPercent: number; // 0 to 100 for current slide autoplay
  nextItemTitle?: string;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  isAutoPlaying,
  onToggleAutoPlay,
  progressPercent,
  nextItemTitle,
}) => {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalSlides).padStart(2, '0');

  return (
    <div className="relative z-30 w-full flex items-center justify-between pointer-events-auto select-none pt-2 sm:pt-4 border-t border-white/10">
      {/* Left: Previous / Next Buttons + Autoplay Pause */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onPrev}
          aria-label="Previous Page"
          className="h-9 sm:h-11 px-3 sm:px-4 border border-white/20 hover:border-amber-400 bg-black/60 hover:bg-white/10 text-white flex items-center gap-1.5 transition-all duration-200 active:scale-95 group rounded"
          title="Previous Page (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline text-xs font-semibold">Prev</span>
        </button>

        <button
          onClick={onNext}
          aria-label="Next Page"
          className="h-9 sm:h-11 px-3 sm:px-4 border border-white/20 hover:border-amber-400 bg-black/60 hover:bg-white/10 text-white flex items-center gap-1.5 transition-all duration-200 active:scale-95 group rounded"
          title="Next Page (Right Arrow)"
        >
          <span className="hidden sm:inline text-xs font-semibold">Next</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={onToggleAutoPlay}
          aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
          className="w-8 h-9 sm:w-9 sm:h-11 border border-white/10 hover:border-white/30 bg-black/40 text-slate-400 hover:text-white flex items-center justify-center transition-colors rounded"
          title={isAutoPlaying ? "Pause Autoplay" : "Start Autoplay"}
        >
          {isAutoPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 pl-0.5" />}
        </button>

        {/* Layman Next Page Pill */}
        {nextItemTitle && (
          <button
            onClick={onNext}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold rounded transition-all active:scale-95 ml-1"
          >
            <span>Next up: {nextItemTitle}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Center: Autoplay Progress Track */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-3 sm:mx-6">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 hidden sm:flex">
          <span>Page {formattedIndex} of {formattedTotal}</span>
          <span className="text-slate-500">Auto-flipping in {Math.max(1, Math.ceil((100 - progressPercent) / 16.6))}s</span>
        </div>
        <div className="h-1 bg-white/15 overflow-hidden relative rounded-full">
          <div
            className="h-full bg-amber-400 transition-all duration-100 ease-linear shadow-lg shadow-amber-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Right: Slide Counter */}
      <div className="flex items-baseline gap-1 sm:gap-2">
        <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tighter text-white">
          {formattedIndex}
        </span>
        <span className="text-xs sm:text-sm font-bold text-slate-400">
          / {formattedTotal}
        </span>
      </div>
    </div>
  );
};
