import React from 'react';
import { motion } from 'framer-motion';

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  glow?: boolean;
  inView?: boolean;
  getWordClassName?: (word: string, index: number) => string;
  getWordStyle?: (word: string, index: number) => React.CSSProperties;
  lineBreakIndices?: number[];
  wordGap?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0.25,
  staggerDelay = 0.14,
  duration = 1.1,
  glow = true,
  inView = false,
  getWordClassName,
  getWordStyle,
  lineBreakIndices,
  wordGap = '0.25em',
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '115%',
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const justifyClass = className.includes('justify-') ? '' : 'justify-center';

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      {...(inView
        ? { whileInView: 'visible', viewport: { once: true, amount: 0.35 } }
        : { animate: 'visible' })}
      className={`inline-flex flex-wrap ${justifyClass} ${className}`}
    >
      {words.map((word, index) => {
        const isLineEnd = (lineBreakIndices && lineBreakIndices.includes(index)) || index === words.length - 1;
        const customClass = getWordClassName ? getWordClassName(word, index) : '';
        const customStyle = getWordStyle ? getWordStyle(word, index) : undefined;
        const isGradient = customClass.includes('hero-gradient-text') || 
                           (customStyle && customStyle.WebkitBackgroundClip === 'text');

        return (
          <React.Fragment key={index}>
            <span
              className="inline-block overflow-hidden align-top py-1"
              style={{ marginRight: isLineEnd ? 0 : wordGap }}
            >
              <motion.span
                variants={wordVariants}
                className={`inline-block will-change-transform ${
                  glow && !isGradient ? 'drop-shadow-[0_0_35px_rgba(138,111,219,0.45)]' : ''
                } ${wordClassName} ${customClass}`}
                style={customStyle}
              >
                {word}
              </motion.span>
            </span>
            {lineBreakIndices && lineBreakIndices.includes(index) && (
              <span className="basis-full w-full h-0 block" aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </motion.span>
  );
};
