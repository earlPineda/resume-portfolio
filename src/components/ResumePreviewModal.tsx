import React, { useEffect } from 'react';
import { Download, X, Upload } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl: string;
  onAvatarChange: (newDataUrl: string) => void;
  onDownloadPdf: () => void;
  isDownloading: boolean;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  avatarUrl,
  onAvatarChange,
  onDownloadPdf,
  isDownloading,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onAvatarChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-preview-title"
    >
      <div className="relative my-8 w-full max-w-4xl rounded-xl bg-white text-zinc-900 shadow-2xl overflow-hidden border border-zinc-200">
        {/* Modal Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-900 px-6 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <h2 id="resume-preview-title" className="text-sm font-semibold tracking-tight">
              Document Preview · Earl_Kevin_E_Pineda_Resume.pdf
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors whitespace-nowrap">
              <Upload className="h-3.5 w-3.5" />
              <span>Update Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>

            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-60 whitespace-nowrap cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close document preview"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable / Exact Resume Document Replica */}
        <div className="max-h-[82vh] overflow-y-auto bg-zinc-100 p-4 sm:p-8">
          <div className="mx-auto max-w-[794px] bg-white shadow-sm border border-zinc-200 text-zinc-900">
            {/* Top Grey Header Band matching image.png */}
            <div className="bg-[#F4F5F7] px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200/80">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                  {RESUME_DATA.fullName}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-800">
                  <span>{RESUME_DATA.phone}</span>
                  <span aria-hidden="true">·</span>
                  <span>{RESUME_DATA.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{RESUME_DATA.email}</span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-white shadow-sm bg-zinc-200">
                  <img
                    src={avatarUrl}
                    alt={RESUME_DATA.fullName}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="px-8 py-7 space-y-6 text-sm leading-relaxed">
              {/* OBJECTIVE */}
              <section>
                <div className="flex items-center gap-4 mb-2.5">
                  <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                    Objective
                  </h3>
                  <div className="h-px flex-1 bg-zinc-300" />
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed">
                  {RESUME_DATA.objective}
                </p>
              </section>

              {/* EDUCATION */}
              <section>
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                    Education
                  </h3>
                  <div className="h-px flex-1 bg-zinc-300" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-zinc-900 uppercase">
                      TARLAC STATE UNIVERSITY 2022–2026
                    </h4>
                    <ul className="mt-1.5 list-disc list-inside text-xs sm:text-[13px] text-zinc-800">
                      <li>
                        Bachelor of Science in Information Technology, Specialized in Web and Mobile Application
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-zinc-900 uppercase">
                      MALIWALO NATIONAL HIGH SCHOOL 2020–2022
                    </h4>
                    <ul className="mt-1.5 list-disc list-inside text-xs sm:text-[13px] text-zinc-800">
                      <li>Accountancy, Business, and Management</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* TECHNICAL SKILLS & BASIC SKILLS */}
              <section>
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                    Technical Skills &amp; Basic Skills
                  </h3>
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
                  <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                    Project &amp; Research
                  </h3>
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
                  <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                    Seminars &amp; Webinars / Certification Attended
                  </h3>
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
                  <h3 className="text-sm font-bold tracking-wider text-zinc-900 uppercase shrink-0">
                    Language
                  </h3>
                  <div className="h-px flex-1 bg-zinc-300" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-[13px] text-zinc-900">
                  <p>Tagalog</p>
                  <p>English (Basic)</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
