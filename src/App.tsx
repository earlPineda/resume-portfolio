/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  FileText,
  ArrowUpRight,
  Menu,
  X,
  Upload,
  Layers,
  Check,
  Github,
  Linkedin,
  Facebook,
  Instagram,
} from 'lucide-react';
import { RESUME_DATA } from './data/resumeData';
import { downloadResumePdf } from './utils/generateResumePdf';
import { ConstellationBackground } from './components/ConstellationBackground';
import { AnimatedPortrait } from './components/AnimatedPortrait';
import { HeroAnimatedText } from './components/HeroAnimatedText';
import { SkillsSection } from './components/SkillsSection';
import { ProjectSection } from './components/ProjectSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import { ResumePreviewModal } from './components/ResumePreviewModal';

type WorkspaceMode = 'prototype' | 'document';

export default function App() {
  // Default to the signature dark cyan-obsidian theme shown in the reference screenshot
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('earl_portfolio_theme_v2');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('earl_portfolio_avatar') || RESUME_DATA.defaultAvatar;
    } catch {
      return RESUME_DATA.defaultAvatar;
    }
  });

  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('prototype');
  const [avatarFallback, setAvatarFallback] = useState<boolean>(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState<boolean>(false);
  const [photoSavedNotice, setPhotoSavedNotice] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Load saved custom avatar from server if present
  useEffect(() => {
    fetch('/api/avatar')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.avatarDataUrl) {
          setAvatarUrl(data.avatarDataUrl);
          try {
            localStorage.setItem('earl_portfolio_avatar', data.avatarDataUrl);
          } catch {
            // Ignore localStorage quota
          }
        }
      })
      .catch(() => {
        // Ignore offline errors
      });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('earl_portfolio_theme_v2', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [isDark]);

  const handleAvatarChange = (newDataUrl: string) => {
    setAvatarUrl(newDataUrl);
    setAvatarFallback(false);
    setPhotoSavedNotice(true);
    setTimeout(() => setPhotoSavedNotice(false), 3000);

    try {
      localStorage.setItem('earl_portfolio_avatar', newDataUrl);
    } catch {
      // Ignore quota errors
    }

    fetch('/api/avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatarDataUrl: newDataUrl }),
    }).catch(() => {
      // Ignore network errors
    });
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleAvatarChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingPhoto(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      await downloadResumePdf(avatarUrl);
    } finally {
      setIsDownloading(false);
    }
  };

  const socialIconMap: Record<string, React.ReactNode> = {
    github: <Github className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
  };

  return (
    <div
      id="top"
      className={`relative min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-[#040A0E] text-slate-100'
          : 'bg-[#F4F7F9] text-slate-900'
      }`}
    >
      {/* Interactive Constellation Particle Network Background */}
      <ConstellationBackground isDark={isDark} />

      {/* Top Bar Contract (Brand Logo — 5 Nav Links — Theme & PDF Actions) */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 no-print ${
          isDark
            ? 'border-cyan-500/15 bg-[#050C12]/90'
            : 'border-slate-200 bg-white/90'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Monogram Lockup matching Reference Screenshot */}
          <a
            href="#top"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            {/* Geometric Wireframe Diamond/Cube Icon */}
            <svg
              viewBox="0 0 40 40"
              className="h-9 w-9 shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="20,2 37,20 20,38 3,20"
                stroke="currentColor"
                strokeWidth="1.6"
                className={isDark ? 'text-slate-200' : 'text-slate-800'}
              />
              <polygon
                points="20,7 32,20 20,33 8,20"
                stroke="#22D3EE"
                strokeWidth="1.2"
              />
              <line x1="20" y1="2" x2="20" y2="38" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.6" />
              <line x1="3" y1="20" x2="37" y2="20" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="20" cy="20" r="2.5" fill="#22D3EE" />
            </svg>
            <span
              className={`font-display text-xl sm:text-2xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              EKP
              <sup className="ml-0.5 font-mono text-[10px] font-bold text-cyan-400">
                &lt;/&gt;
              </sup>
            </span>
          </a>

          {/* Zone 2: 5 Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden md:flex items-center gap-7 text-sm font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <a
              href="#about"
              onClick={() => setWorkspaceMode('prototype')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setWorkspaceMode('prototype')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              Skills
            </a>
            <a
              href="#project"
              onClick={() => setWorkspaceMode('prototype')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              Project
            </a>
            <a
              href="#credentials"
              onClick={() => setWorkspaceMode('prototype')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              Credentials
            </a>
            <a
              href="#contact"
              onClick={() => setWorkspaceMode('prototype')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Circular Contrast Theme Toggle (matching screenshot) + Download PDF */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-[#10161F] text-cyan-400 hover:border-cyan-500/50'
                  : 'border-slate-300 bg-white text-cyan-600 hover:bg-slate-100'
              }`}
            >
              {/* Half-Contrast Circle Icon matching reference header */}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M12 4a8 8 0 0 1 0 16V4z" fill="currentColor" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110 transition-all disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_18px_rgba(34,211,238,0.3)]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isDownloading ? 'Exporting...' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile navigation"
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-slate-200 hover:bg-slate-800/60' : 'text-slate-800 hover:bg-slate-200/60'
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t px-4 py-4 space-y-2.5 text-sm font-medium ${
              isDark
                ? 'border-cyan-500/20 bg-[#050C12] text-slate-200'
                : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            {[
              { href: '#about', label: 'About & Hero' },
              { href: '#skills', label: 'Technical & Basic Skills' },
              { href: '#project', label: 'Project & Research (ScanFresh)' },
              { href: '#credentials', label: 'Education & Seminars' },
              { href: '#contact', label: 'Recruiter Contact Form' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setWorkspaceMode('prototype');
                  setMobileMenuOpen(false);
                }}
                className="block py-1.5 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  handleDownloadPdf();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-xs font-bold text-slate-950"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume PDF</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreviewModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 px-4 py-2 text-xs font-semibold text-cyan-300"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View 1:1 CV Sheet</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section Styled After Reference Screenshot */}
        <section
          id="about"
          className={`py-12 sm:py-20 border-b transition-colors duration-200 ${
            isDark ? 'border-cyan-500/15' : 'border-slate-200'
          }`}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              {/* Animated portrait with circulating language badges */}
              <AnimatedPortrait
                avatarUrl={avatarUrl}
                avatarFallback={avatarFallback}
                isDraggingPhoto={isDraggingPhoto}
                isDark={isDark}
                onAvatarError={() => setAvatarFallback(true)}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDraggingPhoto(true);
                }}
                onDragLeave={() => setIsDraggingPhoto(false)}
                onDrop={handlePhotoDrop}
              />

              {/* Subtle Photo Upload Trigger right below portrait */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.02 }}
                className="mt-4 flex items-center gap-2"
              >
                  <label
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium cursor-pointer transition-colors ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#07151F]/90 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Upload className="h-3 w-3 text-cyan-400" />
                    <span>Update Resume Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroPhotoUpload}
                      className="sr-only"
                    />
                  </label>

                  {photoSavedNotice && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      <span>Saved</span>
                    </span>
                  )}
                </motion.div>

              {/* Availability Status Banner (Exact match to screenshot) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: [0, -3, 0] }}
                transition={{
                  opacity: { duration: 0.35, delay: 0.05 },
                  y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                }}
                className={`w-full max-w-md rounded-full border px-5 py-2.5 flex items-center justify-center gap-3 ${
                  isDark
                    ? 'border-cyan-500/30 bg-[#061D25]/85 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.08)]'
                    : 'border-cyan-600/30 bg-cyan-50 text-cyan-900'
                }`}
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </span>
                <HeroAnimatedText
                  as="span"
                  text="Available for freelance and full-time opportunities"
                  baseDelay={0.1}
                  wordStagger={0.028}
                  floatDelay={0.3}
                  className="text-xs sm:text-sm font-medium tracking-wide"
                />
              </motion.div>

              {/* "Hi, I'm" Greeting */}
              <HeroAnimatedText
                text="Hi, I'm"
                baseDelay={0.12}
                wordStagger={0.06}
                floatDelay={0.2}
                className={`mt-7 text-base sm:text-lg font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              />

              {/* Massive Glowing Cyan-to-Emerald Stacked Name (Exact style from screenshot) */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: [0, -2, 0] }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.14 },
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
                }}
                className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06]"
              >
                <HeroAnimatedText
                  as="span"
                  text="Earl Kevin"
                  baseDelay={0.16}
                  wordMotion="fade"
                  floatAmplitude={0}
                  className="block bg-gradient-to-b from-cyan-300 via-cyan-400 to-teal-300 bg-clip-text text-transparent"
                />
                <HeroAnimatedText
                  as="span"
                  text="E. Pineda"
                  baseDelay={0.28}
                  wordMotion="fade"
                  floatAmplitude={0}
                  className="block bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent"
                />
              </motion.h1>

              {/* Spaced Role Subtitle (`WEB & MOBILE APP DEV`) */}
              <HeroAnimatedText
                text="WEB & MOBILE APP DEV"
                baseDelay={0.2}
                wordStagger={0.045}
                floatDelay={0.5}
                className={`mt-4 text-xs sm:text-sm font-bold uppercase tracking-[0.28em] ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              />

              {/* Centered Bio Paragraph matching Screenshot */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: [0, -3, 0] }}
                transition={{
                  opacity: { duration: 0.38, delay: 0.22 },
                  y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                }}
                className={`mt-6 max-w-xl text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                A BSIT Web &amp; Mobile Application Developer specializing in{' '}
                <HeroAnimatedText
                  as="span"
                  text="HTML, CSS, JavaScript, PHP, Python, and MySQL"
                  baseDelay={0.34}
                  wordStagger={0.028}
                  floatDelay={0.45}
                  className={isDark ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}
                />
                . Experienced in designing AI-powered mobile applications and user-friendly interfaces.
              </motion.p>

              {/* 4 Circular Social Icon Buttons (GitHub, LinkedIn, Facebook, Instagram) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.26 }}
                className="mt-8 flex items-center justify-center gap-4"
              >
                {RESUME_DATA.socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-1 ${
                      isDark
                        ? 'border-slate-800 bg-[#101622]/90 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-600 shadow-xs'
                    }`}
                  >
                    {socialIconMap[soc.id]}
                  </a>
                ))}
              </motion.div>

              {/* Primary Glowing Cyan CTA Button (`View My Work →`) + Secondary Resume Actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-9 w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3.5"
              >
                <a
                  href="#project"
                  onClick={() => setWorkspaceMode('prototype')}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 px-8 py-4 text-sm sm:text-base font-bold text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.45)] hover:brightness-110 transition-all whitespace-nowrap"
                >
                  <span>View My Work</span>
                  <span aria-hidden="true">→</span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-500/35 bg-[#071821]/90 text-cyan-300 hover:border-cyan-400 hover:bg-[#0B222E]'
                      : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>{isDownloading ? 'Exporting...' : 'Download CV (PDF)'}</span>
                </button>
              </motion.div>

              {/* Mode Switcher Bar (Interactive Prototype vs. 1:1 Printable Resume Sheet) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setWorkspaceMode('prototype')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    workspaceMode === 'prototype'
                      ? 'text-cyan-400 underline underline-offset-4'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Interactive Portfolio View</span>
                </button>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={() => setWorkspaceMode('document')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    workspaceMode === 'document'
                      ? 'text-cyan-400 underline underline-offset-4'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>1:1 Traditional Resume Sheet</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Workspace View Switcher: Interactive Prototype Sections vs. Embedded 1:1 Resume Sheet */}
        <AnimatePresence mode="wait">
          {workspaceMode === 'prototype' ? (
            <motion.div
              key="prototype-workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* 01. Interactive Skills & Proficiency Section */}
              <SkillsSection isDark={isDark} />

              {/* 02. Project & Research Section (ScanFresh Interactive Prototype) */}
              <ProjectSection isDark={isDark} />

              {/* 03. Academic Education, Seminars & Languages Section */}
              <CredentialsSection isDark={isDark} />

              {/* 04. Recruiter Contact Form & Email Notification Section */}
              <ContactSection isDark={isDark} />
            </motion.div>
          ) : (
            <motion.section
              key="document-workspace"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24 }}
              className="py-16 sm:py-20"
            >
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-cyan-400' : 'text-cyan-700'
                      }`}
                    >
                      1:1 Exact Resume Document Replica
                    </p>
                    <h2
                      className={`font-display text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Printable Curriculum Vitae Sheet
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setWorkspaceMode('prototype')}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        isDark
                          ? 'border-cyan-500/30 bg-[#08131C] text-cyan-300 hover:border-cyan-400'
                          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      ← Back to Interactive Portfolio
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={isDownloading}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110 transition-all cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Exact Replica of Uploaded Resume Image */}
                <div className="mx-auto max-w-[820px] rounded-xl overflow-hidden bg-white shadow-2xl border border-slate-200 text-zinc-900">
                  <div className="bg-[#F4F5F7] px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                        {RESUME_DATA.fullName}
                      </h3>
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-800">
                        <span>{RESUME_DATA.phone}</span>
                        <span aria-hidden="true">·</span>
                        <span>{RESUME_DATA.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{RESUME_DATA.email}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#F4F5F7]">
                        <img
                          src={avatarUrl}
                          alt={RESUME_DATA.fullName}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-8 space-y-6 text-sm leading-relaxed">
                    {/* OBJECTIVE */}
                    <section>
                      <div className="flex items-center gap-4 mb-2.5">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                          Objective
                        </h4>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-zinc-800 leading-relaxed">
                        {RESUME_DATA.objective}
                      </p>
                    </section>

                    {/* EDUCATION */}
                    <section>
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                          Education
                        </h4>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs sm:text-[13px] font-bold text-zinc-900 uppercase">
                            TARLAC STATE UNIVERSITY 2022–2026
                          </p>
                          <ul className="mt-1.5 list-disc list-inside text-xs sm:text-[13px] text-zinc-800">
                            <li>
                              Bachelor of Science in Information Technology, Specialized in Web and Mobile Application
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs sm:text-[13px] font-bold text-zinc-900 uppercase">
                            MALIWALO NATIONAL HIGH SCHOOL 2020–2022
                          </p>
                          <ul className="mt-1.5 list-disc list-inside text-xs sm:text-[13px] text-zinc-800">
                            <li>Accountancy, Business, and Management</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* TECHNICAL SKILLS & BASIC SKILLS */}
                    <section>
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                          Technical Skills &amp; Basic Skills
                        </h4>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-[13px] text-zinc-800">
                        <ul className="list-disc list-inside space-y-1">
                          <li>HTML, CSS, JavaScript</li>
                          <li>PHP (Basic)</li>
                          <li>Java (Basic)</li>
                          <li>Python (Basic)</li>
                          <li>MySQL</li>
                          <li>Git &amp; GitHub</li>
                          <li>Microsoft Office</li>
                          <li>XAMPP</li>
                          <li>POSTMAN</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Critical thinking</li>
                          <li>Communication</li>
                          <li>Time management</li>
                          <li>Hardworking</li>
                          <li>Work Ethics</li>
                          <li>Proactive</li>
                          <li>Fast Learning</li>
                        </ul>
                      </div>
                    </section>

                    {/* PROJECT & RESEARCH */}
                    <section>
                      <div className="flex items-center gap-4 mb-2.5">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                          Project &amp; Research
                        </h4>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>
                      <p className="text-xs font-semibold text-zinc-900 mb-1.5">
                        {RESUME_DATA.project.role}
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                        <li>{RESUME_DATA.project.title}</li>
                        {RESUME_DATA.project.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </section>

                    {/* SEMINARS & WEBINARS / CERTIFICATION ATTENDED */}
                    <section>
                      <div className="flex items-center gap-4 mb-2.5">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                          Seminars &amp; Webinars / Certification Attended
                        </h4>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[12.5px] text-zinc-800">
                        <li>
                          Dec 2025 – Introduction to Artificial Intelligence and Machine Learning for SUCs – University of the Philippines - Information Technology Development Center
                        </li>
                        <li>
                          Nov 2025 – Information Session on Understanding Web3 – Department of Information and Communications Technology – Caraga Region
                        </li>
                        <li>
                          Sep 2025 – Hour of Code: Learn AI &amp; Coding in a Fun and Engaging Way – Department of Information and Communications Technology - CAR Region
                        </li>
                      </ul>
                    </section>

                    {/* LANGUAGE */}
                    <section>
                      <div className="flex items-center gap-4 mb-2.5">
                        <h4 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                          Language
                        </h4>
                        <div className="h-px flex-1 bg-zinc-300" />
                      </div>
                      <div className="space-y-0.5 text-xs sm:text-[13.5px] text-zinc-900">
                        <p>Tagalog</p>
                        <p>English (Basic)</p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer with Prominent Social Media Account Links */}
      <footer
        className={`relative z-10 border-t py-14 transition-colors duration-200 ${
          isDark
            ? 'border-cyan-500/15 bg-[#03070A] text-slate-300'
            : 'border-slate-200 bg-slate-900 text-slate-200'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Identity & Download CTA */}
            <div className="md:col-span-5 space-y-3">
              <p className="font-display text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {RESUME_DATA.fullName}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Bachelor of Science in Information Technology (2022–2026) · Specialized in Web &amp; Mobile Application Development · Tarlac State University.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110 transition-all whitespace-nowrap cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF Resume</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#08131C] px-3.5 py-2 text-xs font-medium text-cyan-300 hover:border-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Preview CV Document</span>
                </button>
              </div>
            </div>

            {/* Prominently Displayed Social Media & Portfolio Accounts */}
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
                Connect on Social Media &amp; Developer Platforms
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RESUME_DATA.socials.map((account) => (
                  <a
                    key={account.id}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-cyan-500/20 bg-[#071119] p-4 hover:border-cyan-400/60 hover:bg-[#0B1924] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-cyan-400">{socialIconMap[account.id]}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {account.label}
                        </p>
                        <p className="font-mono text-xs text-slate-400 truncate mt-0.5">
                          {account.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} {RESUME_DATA.fullName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span>{RESUME_DATA.location}</span>
              <span aria-hidden="true">·</span>
              <a href={`tel:${RESUME_DATA.phone}`} className="hover:text-cyan-300 font-mono">
                {RESUME_DATA.phone}
              </a>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${RESUME_DATA.email}`} className="hover:text-cyan-300 font-mono">
                {RESUME_DATA.email}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Printable / Traditional Resume Sheet Preview Modal */}
      <ResumePreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        avatarUrl={avatarUrl}
        onAvatarChange={handleAvatarChange}
        onDownloadPdf={handleDownloadPdf}
        isDownloading={isDownloading}
      />
    </div>
  );
}
