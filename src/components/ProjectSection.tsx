import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  X,
  CheckCircle2,
  AlertCircle,
  ScanLine,
  Scale,
  ThermometerSnowflake,
} from 'lucide-react';
import { RESUME_DATA, FruitSample } from '../data/resumeData';

interface ProjectSectionProps {
  isDark: boolean;
}

type PrototypeTab = 'scanner' | 'calculator' | 'storage';

export const ProjectSection: React.FC<ProjectSectionProps> = ({ isDark }) => {
  const [selectedFruit, setSelectedFruit] = useState<FruitSample>(
    RESUME_DATA.project.supportedFruits[0]
  );
  const [activeProtoTab, setActiveProtoTab] = useState<PrototypeTab>('scanner');
  const [weightGrams, setWeightGrams] = useState<number>(180);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const handleSelectFruit = (fruit: FruitSample) => {
    setSelectedFruit(fruit);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 420);
  };

  const weightRatio = weightGrams / 100;
  const calculatedCalories = Math.round(selectedFruit.caloriesPer100g * weightRatio);
  const calculatedVitC = (selectedFruit.vitaminCMgPer100g * weightRatio).toFixed(1);
  const calculatedFiber = (selectedFruit.fiberGPer100g * weightRatio).toFixed(1);
  const calculatedSugar = (selectedFruit.sugarGPer100g * weightRatio).toFixed(1);

  return (
    <section
      id="project"
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
            02. Featured Project &amp; Interactive App Prototype
          </p>
          <div className="mt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2
              className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight max-w-3xl ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent'
                  : 'text-slate-900'
              }`}
            >
              {RESUME_DATA.project.title}
            </h2>

            {/* Clean Unboxed Metadata */}
            <div
              className={`flex flex-wrap items-center gap-2 text-xs sm:text-sm shrink-0 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <span className="font-semibold text-cyan-400">
                {RESUME_DATA.project.role}
              </span>
              <span aria-hidden="true">·</span>
              <span>10 Predefined Fruit Classes</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Shot CLIP</span>
            </div>
          </div>
        </div>

        {/* Bento Showcase Grid: Left Case Study & Media + Right Interactive ScanFresh Mobile Prototype */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Visual Showcase + Engineering Accomplishments */}
          <div className="lg:col-span-7 space-y-8">
            {/* Clickable Media Showcase Card with Lightbox Trigger */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl border ${
                isDark
                  ? 'border-cyan-500/25 bg-[#08121A]'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-950">
                {!imageError ? (
                  <img
                    src={RESUME_DATA.projectShowcaseImage}
                    alt="ScanFresh Mobile Application Interface Showcase"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-teal-950 to-cyan-950 p-8 text-center text-white">
                    <p className="font-display text-xl font-bold">
                      ScanFresh Mobile UI &amp; CLIP Vision Scanner
                    </p>
                    <p className="mt-2 text-xs text-cyan-300">
                      HTML · CSS · JavaScript · Python · Firebase · Node.js
                    </p>
                  </div>
                )}

                {/* Measured Contrast Scrim */}
                <div className="inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent absolute pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs text-cyan-300 font-medium">
                      Frontend &amp; AI Integration Case Study
                    </p>
                    <p className="text-sm sm:text-base font-semibold">
                      Real-Time Fruit Quality Assessment &amp; Nutrient Estimation
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:brightness-110 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Inspect Showcase</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Verbatim & Structured Engineering Breakdown from Resume */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <span>Frontend UI: {RESUME_DATA.project.frontendStack}</span>
                <span aria-hidden="true">/</span>
                <span>Team Backend: {RESUME_DATA.project.backendStack}</span>
              </div>

              <div className="space-y-3.5">
                {RESUME_DATA.project.bullets.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18 }}
                    className={`flex items-start gap-3.5 rounded-xl p-4 border ${
                      isDark
                        ? 'bg-[#08121A]/80 border-cyan-500/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold tabular-nums mt-0.5 ${
                        isDark ? 'text-cyan-400' : 'text-cyan-700'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Interactive ScanFresh Mobile UI Prototype */}
          <div
            className={`lg:col-span-5 rounded-2xl p-6 border ${
              isDark
                ? 'bg-[#09151E]/95 border-cyan-500/25 shadow-[0_0_30px_rgba(34,211,238,0.06)]'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {/* Prototype Top Header */}
            <div className="pb-4 border-b border-current/10">
              <div className="flex items-center justify-between gap-2">
                <p
                  className={`text-xs font-semibold ${
                    isDark ? 'text-cyan-400' : 'text-cyan-700'
                  }`}
                >
                  Interactive UI Prototype
                </p>
                <span
                  className={`font-mono text-xs tabular-nums ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  10 CLIP Fruit Classes
                </span>
              </div>
              <h3
                className={`mt-1 text-lg font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                ScanFresh Interactive Simulator
              </h3>
            </div>

            {/* Interactive Prototype Screen Navigation Tabs */}
            <div
              role="tablist"
              aria-label="ScanFresh prototype screens"
              className={`mt-4 grid grid-cols-3 gap-1 rounded-xl p-1 ${
                isDark ? 'bg-[#050C12] border border-cyan-500/20' : 'bg-slate-100'
              }`}
            >
              {(
                [
                  { id: 'scanner', label: 'CLIP Scanner', Icon: ScanLine },
                  { id: 'calculator', label: 'Nutrients', Icon: Scale },
                  { id: 'storage', label: 'Shelf Life', Icon: ThermometerSnowflake },
                ] as const
              ).map(({ id, label, Icon }) => {
                const isActive = activeProtoTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveProtoTab(id)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950'
                          : 'bg-white text-slate-900 shadow-xs'
                        : isDark
                        ? 'text-slate-400 hover:text-cyan-300'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* 10 Predefined Fruit Selector Grid */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span
                  className={`font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Select Fruit Sample (10 Predefined Classes)
                </span>
                <span className="font-mono text-[11px] text-cyan-400 tabular-nums">
                  {isScanning ? 'Running CLIP...' : 'Ready'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 gap-1.5">
                {RESUME_DATA.project.supportedFruits.map((fruit) => {
                  const active = selectedFruit.name === fruit.name;
                  return (
                    <button
                      key={fruit.name}
                      type="button"
                      onClick={() => handleSelectFruit(fruit)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold border-cyan-400'
                          : isDark
                          ? 'bg-[#060E15] text-slate-300 border-cyan-500/15 hover:border-cyan-500/40'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{fruit.name}</span>
                      <span
                        className={`font-mono text-[11px] tabular-nums ml-1.5 ${
                          active
                            ? 'text-slate-900'
                            : isDark
                            ? 'text-cyan-400/70'
                            : 'text-slate-500'
                        }`}
                      >
                        {fruit.freshnessScore}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animated Prototype Screen Viewport */}
            <div className="mt-5">
              <AnimatePresence mode="wait">
                {activeProtoTab === 'scanner' && (
                  <motion.div
                    key="scanner-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    {/* Simulated Camera Viewfinder Box */}
                    <div
                      className={`relative overflow-hidden rounded-xl p-5 border ${
                        isDark
                          ? 'bg-[#050C12] border-cyan-500/25'
                          : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-cyan-400/80 font-mono">
                        <span>CLIP ZERO-SHOT CLASSIFIER</span>
                        <span className="tabular-nums">
                          SCORE: {selectedFruit.freshnessScore}%
                        </span>
                      </div>

                      <div className="my-5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-slate-400">Detected Fruit Class</p>
                          <p className="font-display text-2xl font-bold text-white mt-0.5">
                            {selectedFruit.name}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">Freshness Grade</p>
                          <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                            {selectedFruit.status === 'Optimal Freshness' ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-amber-400" />
                            )}
                            <span
                              className={
                                selectedFruit.status === 'Optimal Freshness'
                                  ? 'text-emerald-400'
                                  : 'text-amber-400'
                              }
                            >
                              {selectedFruit.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Animated Freshness Confidence Bar */}
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          style={{
                            transform: `scaleX(${
                              isScanning ? 0.15 : selectedFruit.freshnessScore / 100
                            })`,
                          }}
                          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-transform duration-300 ease-out"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Base Density: {selectedFruit.caloriesPer100g} kcal / 100g</span>
                        <button
                          type="button"
                          onClick={() => setActiveProtoTab('calculator')}
                          className="text-cyan-400 hover:underline font-medium cursor-pointer"
                        >
                          Open Weight Calculator →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeProtoTab === 'calculator' && (
                  <motion.div
                    key="calculator-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4"
                  >
                    {/* Weight-Based Nutrient Calculator Controls */}
                    <div
                      className={`rounded-xl p-4 border ${
                        isDark
                          ? 'bg-[#050C12] border-cyan-500/20'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <label
                          htmlFor="fruit-weight-range"
                          className={`font-semibold ${
                            isDark ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {selectedFruit.name} Sample Weight
                        </label>
                        <span
                          className={`font-mono text-sm font-bold tabular-nums ${
                            isDark ? 'text-cyan-400' : 'text-cyan-700'
                          }`}
                        >
                          {weightGrams} g
                        </span>
                      </div>
                      <input
                        id="fruit-weight-range"
                        type="range"
                        min={50}
                        max={500}
                        step={10}
                        value={weightGrams}
                        onChange={(e) => setWeightGrams(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[11px] text-slate-500 tabular-nums mt-1">
                        <span>50g</span>
                        <span>150g</span>
                        <span>300g</span>
                        <span>500g</span>
                      </div>
                    </div>

                    {/* Nutritional Display Readout */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={`rounded-lg p-3 border ${
                          isDark
                            ? 'bg-[#050C12] border-cyan-500/20'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="text-[11px] text-slate-400">Estimated Energy</p>
                        <p
                          className={`mt-0.5 font-mono text-base font-bold tabular-nums ${
                            isDark ? 'text-cyan-300' : 'text-slate-900'
                          }`}
                        >
                          {calculatedCalories} kcal
                        </p>
                      </div>
                      <div
                        className={`rounded-lg p-3 border ${
                          isDark
                            ? 'bg-[#050C12] border-cyan-500/20'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="text-[11px] text-slate-400">Vitamin C</p>
                        <p
                          className={`mt-0.5 font-mono text-base font-bold tabular-nums ${
                            isDark ? 'text-emerald-300' : 'text-slate-900'
                          }`}
                        >
                          {calculatedVitC} mg
                        </p>
                      </div>
                      <div
                        className={`rounded-lg p-3 border ${
                          isDark
                            ? 'bg-[#050C12] border-cyan-500/20'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="text-[11px] text-slate-400">Dietary Fiber</p>
                        <p
                          className={`mt-0.5 font-mono text-base font-bold tabular-nums ${
                            isDark ? 'text-cyan-300' : 'text-slate-900'
                          }`}
                        >
                          {calculatedFiber} g
                        </p>
                      </div>
                      <div
                        className={`rounded-lg p-3 border ${
                          isDark
                            ? 'bg-[#050C12] border-cyan-500/20'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="text-[11px] text-slate-400">Natural Sugars</p>
                        <p
                          className={`mt-0.5 font-mono text-base font-bold tabular-nums ${
                            isDark ? 'text-emerald-300' : 'text-slate-900'
                          }`}
                        >
                          {calculatedSugar} g
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeProtoTab === 'storage' && (
                  <motion.div
                    key="storage-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className={`rounded-xl p-4 border space-y-3 text-xs ${
                      isDark
                        ? 'bg-[#050C12] border-cyan-500/20'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between gap-2 pb-2 border-b border-current/10">
                      <span className="text-slate-400">Selected Fruit</span>
                      <span
                        className={`font-bold ${
                          isDark ? 'text-cyan-300' : 'text-slate-900'
                        }`}
                      >
                        {selectedFruit.name} ({selectedFruit.status})
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-400">Ambient Shelf Life:</span>
                      <span
                        className={`font-medium text-right ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {selectedFruit.shelfLifeAmbient}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-400">Cold Storage:</span>
                      <span
                        className={`font-medium text-right ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {selectedFruit.shelfLifeRefrigerated}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-current/10">
                      <p className="text-slate-400 mb-1">Preservation Protocol:</p>
                      <p
                        className={`leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        {selectedFruit.storageGuidance}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Project Showcase */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="ScanFresh Project Media Viewer"
        >
          <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 text-white">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20">
              <div>
                <h3 className="text-sm sm:text-base font-bold">
                  {RESUME_DATA.project.title}
                </h3>
                <p className="text-xs text-cyan-300">
                  {RESUME_DATA.project.role} · {RESUME_DATA.project.frontendStack} · {RESUME_DATA.project.backendStack}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close media viewer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-16/9 w-full bg-black">
              <img
                src={RESUME_DATA.projectShowcaseImage}
                alt={RESUME_DATA.project.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
