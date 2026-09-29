import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

interface ContactInquiry {
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

const DATA_FILE = path.join(process.cwd(), 'contact_inquiries.json');
const AVATAR_FILE = path.join(process.cwd(), 'custom_avatar.json');
const RECIPIENT_EMAIL = 'earlp458@gmail.com';

function loadInquiries(): ContactInquiry[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // Return empty array on read error
  }
  return [];
}

function saveInquiries(list: ContactInquiry[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch {
    // Ignore write error in read-only environments
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(express.json({ limit: '10mb' }));

  // API Route: Get saved custom avatar
  app.get('/api/avatar', (_req, res) => {
    try {
      if (fs.existsSync(AVATAR_FILE)) {
        const raw = JSON.parse(fs.readFileSync(AVATAR_FILE, 'utf-8'));
        res.json({ avatarDataUrl: raw.avatarDataUrl || null });
        return;
      }
    } catch {
      // Ignore read errors
    }
    res.json({ avatarDataUrl: null });
  });

  // API Route: Save custom uploaded resume photo permanently
  app.post('/api/avatar', (req, res) => {
    const { avatarDataUrl } = req.body || {};
    if (!avatarDataUrl || typeof avatarDataUrl !== 'string') {
      res.status(400).json({ error: 'Invalid image data' });
      return;
    }
    try {
      fs.writeFileSync(AVATAR_FILE, JSON.stringify({ avatarDataUrl }), 'utf-8');
    } catch {
      // Ignore write error if read-only
    }
    res.json({ success: true });
  });

  // API Route: Get logged contact inquiries
  app.get('/api/contact', (_req, res) => {
    const inquiries = loadInquiries();
    res.json({ inquiries });
  });

  // API Route: Submit contact inquiry & trigger email notification payload
  app.post('/api/contact', (req, res) => {
    const {
      senderName,
      senderEmail,
      company = 'Direct Recruiter Inquiry',
      roleType = 'Entry-Level Role',
      subject = 'Portfolio Contact Inquiry',
      message,
    } = req.body || {};

    if (!senderName || !senderEmail || !message) {
      res.status(400).json({
        error: 'Please provide your name, work email, and message.',
      });
      return;
    }

    const id = `NTF-${Date.now().toString().slice(-6)}`;
    const createdAt = new Date().toISOString();

    const formattedEmailBody = [
      `New Recruiter Inquiry for Earl Kevin E. Pineda`,
      `--------------------------------------------------`,
      `Notification ID: ${id}`,
      `From: ${senderName} <${senderEmail}>`,
      `Company: ${company}`,
      `Opportunity Type: ${roleType}`,
      `Timestamp: ${createdAt}`,
      ``,
      `Message:`,
      `${message}`,
    ].join('\n');

    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject}`
    )}&body=${encodeURIComponent(formattedEmailBody)}`;

    const receipt: ContactInquiry = {
      id,
      recipientEmail: RECIPIENT_EMAIL,
      senderName: String(senderName).trim(),
      senderEmail: String(senderEmail).trim(),
      company: String(company).trim(),
      roleType: String(roleType).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      createdAt,
      status: 'Email Notification Dispatched',
      mailtoUrl,
    };

    const existing = loadInquiries();
    const updated = [receipt, ...existing].slice(0, 50);
    saveInquiries(updated);

    res.status(201).json({
      success: true,
      receipt,
      inquiries: updated,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
