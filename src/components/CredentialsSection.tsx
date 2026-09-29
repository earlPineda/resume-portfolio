import React from 'react';
import { motion } from 'motion/react';
import { RESUME_DATA } from '../data/resumeData';

interface CredentialsSectionProps {
  isDark: boolean;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({ isDark }) => {
  return (
    <section
      id="credentials"
      className={`relative z-10 py-20 sm:py-24 border-b transition-colors duration-200 ${
        isDark ? 'border-cyan-500/15' : 'border-slate-200'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="pb-10 border-b border-current/10">
          <p
            className={`text-xs font-semibold tracking-widest uppercase ${
              isDark ? 'text-cyan-400' : 'text-cyan-700'
            }`}
          >
            03. Education, Seminars &amp; Languages
          </p>
          <h2
            className={`mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark
                ? 'bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent'
                : 'text-slate-900'
            }`}
          >
            Academic Foundation &amp; Continuing Education
          </h2>
        </div>

        {/* Two-Column Editorial Split: Education & Languages on Left, Seminars & Certifications on Right */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Academic Education + Language Proficiency */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h3
                className={`text-xs font-bold tracking-widest uppercase mb-6 ${
                  isDark ? 'text-cyan-400' : 'text-slate-500'
                }`}
              >
                Academic Background
              </h3>

              <div className="space-y-8">
                {RESUME_DATA.education.map((edu) => (
                  <div
                    key={edu.id}
                    className={`pl-5 border-l-2 ${
                      isDark ? 'border-cyan-400' : 'border-cyan-600'
                    }`}
                  >
                    <div
                      className={`flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <span>{edu.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{edu.location}</span>
                    </div>

                    <h4
                      className={`mt-1 text-base sm:text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {edu.institution}
                    </h4>

                    <p
                      className={`mt-1 text-sm font-semibold ${
                        isDark ? 'text-cyan-300' : 'text-cyan-700'
                      }`}
                    >
                      {edu.program}
                    </p>

                    <p
                      className={`text-xs sm:text-sm mt-0.5 ${
                        isDark ? 'text-emerald-300/90' : 'text-slate-700'
                      }`}
                    >
                      {edu.specialization}
                    </p>

                    <ul
                      className={`mt-3 space-y-1.5 text-xs leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {edu.highlights.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Section */}
            <div className="pt-8 border-t border-current/10">
              <h3
                className={`text-xs font-bold tracking-widest uppercase mb-4 ${
                  isDark ? 'text-cyan-400' : 'text-slate-500'
                }`}
              >
                Spoken &amp; Written Languages
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {RESUME_DATA.languages.map((lang) => (
                  <div
                    key={lang.language}
                    className={`rounded-xl p-4 border ${
                      isDark
                        ? 'bg-[#08121A]/80 border-cyan-500/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`text-sm font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {lang.language}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isDark ? 'text-cyan-400' : 'text-cyan-700'
                        }`}
                      >
                        {lang.proficiency}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {lang.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Seminars, Webinars & Certifications Attended */}
          <div className="lg:col-span-7">
            <h3
              className={`text-xs font-bold tracking-widest uppercase mb-6 ${
                isDark ? 'text-cyan-400' : 'text-slate-500'
              }`}
            >
              Seminars &amp; Webinars / Certifications Attended
            </h3>

            <div className="space-y-4">
              {RESUME_DATA.seminars.map((sem, idx) => (
                <motion.article
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  key={sem.id}
                  className={`rounded-xl p-6 border transition-colors ${
                    isDark
                      ? 'bg-[#08121A]/85 border-cyan-500/20 hover:border-cyan-400/50'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`flex flex-wrap items-center gap-2 text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`font-mono font-semibold tabular-nums ${
                        isDark ? 'text-cyan-400' : 'text-cyan-700'
                      }`}
                    >
                      0{idx + 1} · {sem.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{sem.focusArea}</span>
                  </div>

                  <h4
                    className={`mt-2 text-base sm:text-lg font-bold leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {sem.title}
                  </h4>

                  <p
                    className={`mt-2 text-xs sm:text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {sem.organizer} · <span className="opacity-80">{sem.regionOrUnit}</span>
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
