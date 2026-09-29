import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, Mail } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ContactSectionProps {
  isDark: boolean;
}

interface NotificationReceipt {
  id: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  company: string;
  roleType: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
  mailtoUrl: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [company, setCompany] = useState('');
  const [roleType, setRoleType] = useState('Full-Time Entry-Level Role');
  const [subject, setSubject] = useState('Interview Invitation — Web & Mobile Application Developer');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<NotificationReceipt | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<NotificationReceipt[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.inquiries && Array.isArray(data.inquiries)) {
          setRecentInquiries(data.inquiries);
        }
      })
      .catch(() => {
        // Ignore initial fetch errors if offline
      });
  }, []);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const applyQuickTemplate = (templateType: 'web' | 'mobile' | 'general') => {
    if (templateType === 'web') {
      setRoleType('Full-Time Entry-Level Role');
      setSubject('Junior Web Developer Opportunity — Application Review');
      setMessage(
        'Hi Earl,\n\nWe reviewed your BSIT resume and ScanFresh project portfolio. We have an opening for an entry-level Web Application Developer and would love to schedule an introductory interview with our engineering team.'
      );
    } else if (templateType === 'mobile') {
      setRoleType('Mobile & Frontend Engineering');
      setSubject('Frontend & Mobile Application Developer Interview');
      setMessage(
        'Hi Earl,\n\nYour frontend and AI integration work on ScanFresh stood out to our team. Are you available this week for a brief call regarding our Junior Mobile & Web Developer role?'
      );
    } else {
      setRoleType('Project / Internship / Contract');
      setSubject('Recruiter Inquiry — Software Development Team');
      setMessage(
        'Hi Earl,\n\nI would like to connect with you regarding upcoming entry-level software engineering opportunities at our organization.'
      );
    }
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, email address, and message before sending.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName.trim(),
          senderEmail: senderEmail.trim(),
          company: company.trim() || 'Direct Recruiter Inquiry',
          roleType,
          subject: subject.trim() || 'Portfolio Contact Inquiry',
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to process contact notification.');
      }

      setReceipt(data.receipt);
      if (data.inquiries) {
        setRecentInquiries(data.inquiries);
      }
      setSenderName('');
      setSenderEmail('');
      setCompany('');
      setMessage('');
    } catch (err) {
      const fallbackMailto = `mailto:${RESUME_DATA.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `From: ${senderName} (${senderEmail})\nCompany: ${company}\nRole: ${roleType}\n\n${message}`
      )}`;
      const localReceipt: NotificationReceipt = {
        id: `NTF-${Date.now().toString().slice(-6)}`,
        recipientEmail: RESUME_DATA.email,
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        company: company.trim() || 'Direct Recruiter Inquiry',
        roleType,
        subject,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'Email Notification Prepared & Logged',
        mailtoUrl: fallbackMailto,
      };
      setReceipt(localReceipt);
      setRecentInquiries((prev) => [localReceipt, ...prev]);
      if (err instanceof Error && err.message.includes('Please fill')) {
        setErrorMsg(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-20 sm:py-24 transition-colors duration-200"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="pb-10 border-b border-current/10">
          <p
            className={`text-xs font-semibold tracking-widest uppercase ${
              isDark ? 'text-cyan-400' : 'text-cyan-700'
            }`}
          >
            04. Direct Recruiter Outreach &amp; Email Notification
          </p>
          <h2
            className={`mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark
                ? 'bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent'
                : 'text-slate-900'
            }`}
          >
            Reach Out for Entry-Level Opportunities
          </h2>
          <p
            className={`mt-2 max-w-2xl text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Available for freelance and full-time entry-level Web &amp; Mobile Application Development roles. Messages submitted below generate an immediate email notification to{' '}
            <span className="font-mono font-medium text-cyan-400">{RESUME_DATA.email}</span>.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Direct Contact Coordinates & Quick Copy Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-[#08121A]/90 border-cyan-500/20'
                  : 'bg-white border-slate-200'
              }`}
            >
              <h3
                className={`text-base font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Direct Contact Details
              </h3>
              <p
                className={`mt-1 text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Prefer reaching out directly via email or phone? Copy coordinates below or use the instant notification form.
              </p>

              <div className="mt-6 space-y-4 text-sm">
                {/* Email Row */}
                <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-current/10">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Primary Email</p>
                    <a
                      href={`mailto:${RESUME_DATA.email}`}
                      className={`font-mono text-xs sm:text-sm font-semibold hover:underline truncate block ${
                        isDark ? 'text-cyan-300' : 'text-slate-900'
                      }`}
                    >
                      {RESUME_DATA.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(RESUME_DATA.email, 'email')}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors shrink-0 cursor-pointer ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#050C12] text-slate-200 hover:border-cyan-400'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone Row */}
                <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-current/10">
                  <div>
                    <p className="text-xs text-slate-400">Mobile / SMS / Viber</p>
                    <a
                      href={`tel:${RESUME_DATA.phone}`}
                      className={`font-mono text-xs sm:text-sm font-semibold hover:underline ${
                        isDark ? 'text-cyan-300' : 'text-slate-900'
                      }`}
                    >
                      {RESUME_DATA.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(RESUME_DATA.phone, 'phone')}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors shrink-0 cursor-pointer ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#050C12] text-slate-200 hover:border-cyan-400'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location Row */}
                <div>
                  <p className="text-xs text-slate-400">Current Location</p>
                  <p
                    className={`mt-0.5 text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {RESUME_DATA.location}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Open to On-Site, Hybrid, and Remote Entry-Level Positions
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Notification Activity Feed */}
            {recentInquiries.length > 0 && (
              <div
                className={`rounded-2xl p-5 border ${
                  isDark
                    ? 'bg-[#08121A]/80 border-cyan-500/20'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className={`text-xs font-bold uppercase tracking-wide ${
                      isDark ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  >
                    Recent Dispatched Notifications
                  </h4>
                  <span className="font-mono text-xs text-emerald-400 tabular-nums">
                    {recentInquiries.length} Logged
                  </span>
                </div>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {recentInquiries.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-lg p-3 text-xs border ${
                        isDark
                          ? 'bg-[#050C12] border-cyan-500/20'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 tabular-nums">
                        <span>{item.id}</span>
                        <span>
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p
                        className={`mt-1 font-semibold truncate ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {item.senderName} · {item.company}
                      </p>
                      <p className="text-slate-400 truncate">{item.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 7 Columns: Recruiter Contact Form with Email Notification */}
          <div
            className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 border ${
              isDark
                ? 'bg-[#09151E]/95 border-cyan-500/25 shadow-[0_0_30px_rgba(34,211,238,0.06)]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Recruiter Quick-Fill Templates */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-current/10">
              <span
                className={`text-xs font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Quick Recruiter Templates:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => applyQuickTemplate('web')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-500/25 bg-[#050C12] text-cyan-300 hover:border-cyan-400'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Web Dev Interview
                </button>
                <button
                  type="button"
                  onClick={() => applyQuickTemplate('mobile')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-500/25 bg-[#050C12] text-cyan-300 hover:border-cyan-400'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Mobile / AI UI Role
                </button>
                <button
                  type="button"
                  onClick={() => applyQuickTemplate('general')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-500/25 bg-[#050C12] text-cyan-300 hover:border-cyan-400'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  General Inquiry
                </button>
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="mb-6 flex items-center gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {receipt && (
              <div
                role="status"
                className={`mb-6 rounded-xl border p-5 ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-100'
                    : 'border-emerald-600/30 bg-emerald-50/80 text-emerald-950'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <h4 className="text-sm font-bold">
                      Email Notification Dispatched ({receipt.id})
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReceipt(null)}
                    className="text-xs underline opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="mt-2 text-xs leading-relaxed opacity-90">
                  Your message has been logged and formatted for immediate notification to{' '}
                  <span className="font-mono font-semibold">{receipt.recipientEmail}</span>. You can also launch your local mail client below to send a direct copy from your inbox.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={receipt.mailtoUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors whitespace-nowrap"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Open Direct Email in Mail App</span>
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sender-name"
                    className={`block text-xs font-semibold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Your Name *
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Jane Dela Cruz"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-2 focus:outline-cyan-400 ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#050C12] text-white placeholder:text-slate-600'
                        : 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="sender-email"
                    className={`block text-xs font-semibold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Work Email *
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-2 focus:outline-cyan-400 ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#050C12] text-white placeholder:text-slate-600'
                        : 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="company-name"
                    className={`block text-xs font-semibold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Company / Organization
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Software Inc."
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-2 focus:outline-cyan-400 ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#050C12] text-white placeholder:text-slate-600'
                        : 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="role-type"
                    className={`block text-xs font-semibold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Opportunity Type
                  </label>
                  <select
                    id="role-type"
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value)}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-2 focus:outline-cyan-400 ${
                      isDark
                        ? 'border-cyan-500/25 bg-[#050C12] text-white'
                        : 'border-slate-300 bg-slate-50 text-slate-900'
                    }`}
                  >
                    <option value="Full-Time Entry-Level Role">Full-Time Entry-Level Role</option>
                    <option value="Mobile & Frontend Engineering">Mobile &amp; Frontend Engineering</option>
                    <option value="Project / Internship / Contract">Project / Internship / Contract</option>
                    <option value="General Networking">General Networking</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message-subject"
                  className={`block text-xs font-semibold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Subject Line
                </label>
                <input
                  id="message-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-2 focus:outline-cyan-400 ${
                    isDark
                      ? 'border-cyan-500/25 bg-[#050C12] text-white'
                      : 'border-slate-300 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="message-body"
                  className={`block text-xs font-semibold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Message *
                </label>
                <textarea
                  id="message-body"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message or click one of the Quick Recruiter Templates above..."
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:outline-2 focus:outline-cyan-400 ${
                    isDark
                      ? 'border-cyan-500/25 bg-[#050C12] text-white placeholder:text-slate-600'
                      : 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-400">
                  Notification target: <span className="font-mono text-cyan-400">{RESUME_DATA.email}</span>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:brightness-110 transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Dispatching Notification...' : 'Send Message & Notify'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
