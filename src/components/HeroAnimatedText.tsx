import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface HeroAnimatedTextProps {
  text: string;
  className?: string;
  baseDelay?: number;
  wordStagger?: number;
  floatDelay?: number;
  floatAmplitude?: number;
  wordMotion?: 'rise' | 'fade';
  as?: 'p' | 'span' | 'h1' | 'h2' | 'div';
}

/**
 * Splits hero copy into individually animated words, then gently floats every line.
 * The wrapper preserves natural line wrapping while keeping animation transforms
 * separate from layout, so Tailwind classes keep working normally.
 */
export const HeroAnimatedText: React.FC<HeroAnimatedTextProps> = ({
  text,
  className = '',
  baseDelay = 0,
  wordStagger = 0.035,
  floatDelay = 0,
  floatAmplitude = -2,
  wordMotion = 'rise',
  as = 'p',
}) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[as] as typeof motion.p;

  return (
    <MotionTag
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: reduceMotion ? 0 : [0, floatAmplitude, 0] }}
      transition={{
        opacity: { duration: 0.45, delay: baseDelay },
        y: reduceMotion
          ? { duration: 0 }
          : {
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: baseDelay + floatDelay,
            },
      }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} aria-hidden="true" className="whitespace-pre-wrap">
          <motion.span
            initial={wordMotion === 'rise' ? { opacity: 0, y: 8 } : { opacity: 0 }}
            animate={wordMotion === 'rise' ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: baseDelay + wordIndex * wordStagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={wordMotion === 'rise' ? 'inline-block will-change-transform' : 'inline'}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  );
};
