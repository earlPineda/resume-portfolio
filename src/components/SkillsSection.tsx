import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RESUME_DATA, TechnicalSkill } from '../data/resumeData';

type SkillFilter = 'all' | 'frontend' | 'backend' | 'tools';

interface SkillsSectionProps {
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark }) => {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('all');
  const [selectedSkill, setSelectedSkill] = useState<TechnicalSkill>(RESUME_DATA.technicalSkills[0]);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setAnimateBars(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const filteredTechnicalSkills =
    activeFilter === 'all'
      ? RESUME_DATA.technicalSkills
      : RESUME_DATA.technicalSkills.filter((skill) => skill.category === activeFilter);

  const handleFilterChange = (filter: SkillFilter) => {
    setActiveFilter(filter);
    const nextList =
      filter === 'all'
        ? RESUME_DATA.technicalSkills
        : RESUME_DATA.technicalSkills.filter((skill) => skill.category === filter);
    if (nextList.length > 0 && !nextList.some((s) => s.id === selectedSkill.id)) {
      setSelectedSkill(nextList[0]);
    }
  };

  // SVG Ring Math for Inspector Gauge
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = animateBars
    ? circumference - (selectedSkill.proficiency / 100) * circumference
    : circumference;

  return (
    <section
      id="skills"
      className={`relative z-10 py-20 sm:py-24 border-b transition-colors duration-200 ${
        isDark ? 'border-cyan-500/15' : 'border-slate-200'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-current/10">
          <div>
            <p
              className={`text-xs font-semibold tracking-widest uppercase ${
                isDark ? 'text-cyan-400' : 'text-cyan-700'
              }`}
            >
              01. Interactive Capability Matrix
            </p>
            <h2
              className={`mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent'
                  : 'text-slate-900'
              }`}
            >
              Technical Skills &amp; Core Proficiencies
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Select any technical capability below to inspect live proficiency metrics, engineering scope, and applied project architecture.
            </p>
          </div>

          {/* Interactive Segmented Control (Functional Buttons) */}
          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className={`inline-flex flex-wrap items-center gap-1 rounded-xl p-1 self-start md:self-auto ${
              isDark
                ? 'bg-[#09141C] border border-cyan-500/20'
                : 'bg-slate-200/80'
            }`}
          >
            {(
              [
                { id: 'all', label: 'All Stack (9)' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend & SQL' },
                { id: 'tools', label: 'Tooling & QA' },
              ] as { id: SkillFilter; label: string }[]
            ).map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-xs'
                        : 'bg-white text-slate-950 shadow-xs'
                      : isDark
                      ? 'text-slate-400 hover:text-cyan-300'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Two-Column Interactive Skills Architecture */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Animated Technical Proficiency Bars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
              <span>Interactive Stack Explorer (Click a skill to inspect)</span>
              <span className="font-mono tabular-nums">Proficiency Index</span>
            </div>

            <motion.div layout className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredTechnicalSkills.map((skill, index) => {
                  const isSelected = selectedSkill.id === skill.id;
                  const scaleValue = animateBars ? skill.proficiency / 100 : 0;

                  return (
                    <motion.button
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ x: 4 }}
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className={`w-full text-left rounded-xl p-4 transition-colors duration-150 border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                        isSelected
                          ? isDark
                            ? 'bg-[#0B1924] border-cyan-400/70 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
                            : 'bg-white border-cyan-600 shadow-sm'
                          : isDark
                          ? 'bg-[#081118]/80 border-cyan-500/15 hover:border-cyan-500/40'
                          : 'bg-white/70 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <span
                            className={`text-sm sm:text-base font-semibold ${
                              isDark ? 'text-slate-100' : 'text-slate-900'
                            }`}
                          >
                            {skill.name}
                          </span>
                          <span
                            className={`ml-2 text-xs ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            · {skill.categoryLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-xs ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {skill.levelLabel}
                          </span>
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold tabular-nums ${
                              isSelected
                                ? isDark
                                  ? 'text-cyan-400'
                                  : 'text-cyan-600'
                                : isDark
                                ? 'text-slate-300'
                                : 'text-slate-700'
                            }`}
                          >
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      {/* Compositor-Only Animated Progress Track (transform: scaleX) */}
                      <div
                        className={`mt-3 h-2 w-full overflow-hidden rounded-full ${
                          isDark ? 'bg-slate-800/90' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          style={{ transform: `scaleX(${scaleValue})` }}
                          className={`h-full w-full origin-left rounded-full transition-transform duration-500 ease-out ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                              : isDark
                              ? 'bg-cyan-500/60'
                              : 'bg-cyan-600'
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right 5 Cols: Active Skill Prototype Inspector + Basic / Professional Skills */}
          <div className="lg:col-span-5 space-y-8">
            {/* Active Skill Inspector Panel with Animated SVG Gauge */}
            <div
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-[#09151E]/90 border-cyan-500/25 shadow-[0_0_30px_rgba(34,211,238,0.06)]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between gap-4 pb-5 border-b border-current/10">
                    <div>
                      <p
                        className={`text-xs font-semibold ${
                          isDark ? 'text-cyan-400' : 'text-cyan-700'
                        }`}
                      >
                        Capability Inspector · {selectedSkill.categoryLabel}
                      </p>
                      <h3
                        className={`mt-1 text-xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {selectedSkill.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Proficiency Tier: {selectedSkill.levelLabel}
                      </p>
                    </div>

                    {/* Circular SVG Progress Ring */}
                    <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="6"
                          className={isDark ? 'text-slate-800' : 'text-slate-200'}
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          className="text-cyan-400 transition-all duration-500 ease-out"
                        />
                      </svg>
                      <span
                        className={`absolute font-mono text-sm font-bold tabular-nums ${
                          isDark ? 'text-cyan-300' : 'text-slate-900'
                        }`}
                      >
                        {selectedSkill.proficiency}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4 text-sm">
                    <div>
                      <p
                        className={`text-xs font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Engineering Scope &amp; Experience
                      </p>
                      <p
                        className={`mt-1.5 leading-relaxed ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        {selectedSkill.experienceSummary}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-current/10">
                      <p
                        className={`text-xs font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Applied In
                      </p>
                      <p
                        className={`mt-1 font-semibold ${
                          isDark ? 'text-cyan-300' : 'text-slate-900'
                        }`}
                      >
                        {selectedSkill.appliedIn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Core Professional & Basic Skills (from Resume Right Column) */}
            <div
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-[#08121A]/80 border-cyan-500/20'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3
                  className={`text-base font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  Basic &amp; Core Professional Skills
                </h3>
                <span
                  className={`text-xs ${
                    isDark ? 'text-cyan-400' : 'text-cyan-700'
                  }`}
                >
                  7 Verified Attributes
                </span>
              </div>

              <div className="space-y-4">
                {RESUME_DATA.basicSkills.map((attr) => {
                  const scaleVal = animateBars ? attr.proficiency / 100 : 0;
                  return (
                    <div key={attr.id} className="space-y-1.5">
                      <div className="flex items-baseline justify-between text-xs sm:text-sm">
                        <span
                          className={`font-semibold ${
                            isDark ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {attr.name}
                        </span>
                        <span
                          className={`font-mono text-xs tabular-nums ${
                            isDark ? 'text-cyan-400' : 'text-slate-600'
                          }`}
                        >
                          {attr.proficiency}%
                        </span>
                      </div>
                      <div
                        className={`h-1.5 w-full overflow-hidden rounded-full ${
                          isDark ? 'bg-slate-800' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          style={{ transform: `scaleX(${scaleVal})` }}
                          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-transform duration-500 ease-out"
                        />
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {attr.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
