import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { RESUME_DATA } from '../data/resumeData';

interface AnimatedPortraitProps {
  avatarUrl: string;
  avatarFallback: boolean;
  isDraggingPhoto: boolean;
  isDark: boolean;
  onAvatarError: () => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

interface LanguageBadge {
  token: string;
  label: string;
  angle: number;
}

const LANGUAGE_BADGES: LanguageBadge[] = [
  { token: 'HTML', label: 'HTML icon', angle: -90 },
  { token: 'CSS', label: 'CSS icon', angle: -54 },
  { token: 'JS', label: 'JavaScript icon', angle: -18 },
  { token: 'TS', label: 'TypeScript icon', angle: 18 },
  { token: 'PY', label: 'Python icon', angle: 54 },
  { token: 'PHP', label: 'PHP icon', angle: 90 },
  { token: 'JAVA', label: 'Java icon', angle: 126 },
  { token: 'SQL', label: 'MySQL and SQL icon', angle: 162 },
  { token: 'REACT', label: 'React icon', angle: 198 },
  { token: 'NODE', label: 'Node.js icon', angle: 234 },
];

const BADGE_COLORS = [
  'border-orange-400/70 bg-[#1d1007]/95 text-orange-200 shadow-[0_0_18px_rgba(251,146,60,0.35)]',
  'border-sky-400/70 bg-[#071a24]/95 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.35)]',
  'border-yellow-300/70 bg-[#211a06]/95 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.32)]',
  'border-blue-400/70 bg-[#0a1530]/95 text-blue-200 shadow-[0_0_18px_rgba(96,165,250,0.35)]',
  'border-emerald-300/70 bg-[#07211a]/95 text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.35)]',
  'border-indigo-300/70 bg-[#121632]/95 text-indigo-100 shadow-[0_0_18px_rgba(129,140,248,0.35)]',
  'border-red-400/70 bg-[#230c0e]/95 text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.32)]',
  'border-cyan-300/70 bg-[#07212a]/95 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.35)]',
  'border-teal-300/70 bg-[#062420]/95 text-teal-100 shadow-[0_0_18px_rgba(45,212,191,0.35)]',
  'border-lime-300/70 bg-[#17210a]/95 text-lime-100 shadow-[0_0_18px_rgba(163,230,53,0.30)]',
];

export const AnimatedPortrait: React.FC<AnimatedPortraitProps> = ({
  avatarUrl,
  avatarFallback,
  isDraggingPhoto,
  isDark,
  onAvatarError,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="relative mb-7 flex flex-col items-center"
    >
      <div className="relative mb-2 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? { opacity: 0.9, scale: 1 }
              : { opacity: [0.7, 1, 0.7], scale: [0.97, 1.04, 0.97] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute -inset-8 rounded-full bg-gradient-to-tr from-cyan-500/30 via-teal-400/18 to-emerald-400/30 blur-2xl"
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 26, repeat: Infinity, ease: 'linear' }
          }
          className="absolute inset-0 rounded-full border border-dashed border-cyan-300/45"
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 34, repeat: Infinity, ease: 'linear' }
          }
          className="absolute inset-0"
        >
          {LANGUAGE_BADGES.map((badge, index) => (
            <span
              key={badge.token}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${badge.angle}deg)` }}
            >
              <span className="block" style={{ transform: 'translate(6.35rem, -50%)' }}>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    reduceMotion
                      ? { opacity: 1, scale: 1, rotate: -badge.angle, y: 0 }
                      : {
                          opacity: 1,
                          scale: 1,
                          rotate: [-badge.angle - 4, -badge.angle + 4, -badge.angle - 4],
                          y: [0, -5, 0],
                        }
                  }
                  transition={{
                    opacity: { duration: 0.4, delay: 0.1 + index * 0.07 },
                    scale: { duration: 0.4, delay: 0.1 + index * 0.07 },
                    rotate: reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 2.4 + (index % 5) * 0.28,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.18,
                        },
                    y: reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 2.4 + (index % 5) * 0.28,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.18,
                        },
                  }}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-full border px-2 font-mono text-[9px] font-extrabold tracking-wide backdrop-blur-sm sm:h-9 sm:min-w-9 sm:text-[10px] ${BADGE_COLORS[index % BADGE_COLORS.length]}`}
                >
                  <span className="sr-only">{badge.label}</span>
                  <span aria-hidden="true">{badge.token}</span>
                </motion.span>
              </span>
            </span>
          ))}
        </motion.div>

        <motion.div
          animate={
            reduceMotion
              ? { scale: 1, rotate: 0, y: 0 }
              : { scale: [1, 1.035, 1], rotate: [-0.8, 0.8, -0.8], y: [0, -4, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }
          }
          className={`relative h-36 w-36 rounded-full p-1 transition-transform sm:h-44 sm:w-44 ${
            isDraggingPhoto
              ? 'scale-105 ring-4 ring-cyan-400'
              : 'bg-gradient-to-b from-cyan-300/90 via-teal-300/40 to-slate-800 shadow-[0_0_38px_rgba(34,211,238,0.35)]'
          }`}
        >
          <div
            className={`h-full w-full overflow-hidden rounded-full ${
              isDark ? 'bg-[#0a141b]' : 'bg-[#F4F5F7]'
            }`}
          >
            {!avatarFallback ? (
              <motion.img
                key={avatarUrl}
                src={avatarUrl}
                alt={RESUME_DATA.fullName}
                referrerPolicy="no-referrer"
                onError={onAvatarError}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-900 font-display text-3xl font-bold text-cyan-400">
                EP
              </div>
            )}
          </div>

          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              initial={{ x: '-130%', opacity: 0 }}
              animate={{ x: '130%', opacity: [0, 0.55, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.2 }}
              className="pointer-events-none absolute inset-1 overflow-hidden rounded-full"
            >
              <span className="block h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
            </motion.span>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

