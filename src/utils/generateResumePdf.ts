import { jsPDF } from 'jspdf';
import { RESUME_DATA } from '../data/resumeData';

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    if (url.startsWith('data:image/')) {
      return url;
    }
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function downloadResumePdf(customAvatarUrl?: string): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;

  // Top Header Band (matching the subtle grey header band in the original resume)
  doc.setFillColor(244, 245, 247);
  doc.rect(0, 0, pageWidth, 44, 'F');

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(17, 24, 39);
  doc.text(RESUME_DATA.fullName, marginX, 21);

  // Contact Details Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(55, 65, 81);
  const contactLine = `Tel: ${RESUME_DATA.phone}    |    ${RESUME_DATA.location}    |    ${RESUME_DATA.email}`;
  doc.text(contactLine, marginX, 31);

  // Social handles line in header
  doc.setFontSize(8.2);
  doc.setTextColor(75, 85, 99);
  doc.text(
    'GitHub: github.com/earlPineda   ·   LinkedIn: linkedin.com/in/earl-pineda-5907ab427/',
    marginX,
    37.5
  );

  // Profile Photo on Top Right
  const imageSource = customAvatarUrl || RESUME_DATA.defaultAvatar;
  const imgData = await loadImageAsDataUrl(imageSource);
  if (imgData) {
    try {
      const format = imgData.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.setDrawColor(220, 222, 226);
      doc.setLineWidth(0.5);
      doc.addImage(imgData, format, pageWidth - marginX - 30, 7, 30, 30);
      doc.rect(pageWidth - marginX - 30, 7, 30, 30);
    } catch {
      // Fallback initials box if image embedding fails
    }
  }

  let y = 54;

  const drawSectionHeader = (title: string, currentY: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(24, 24, 27);
    doc.text(title.toUpperCase(), marginX, currentY);

    const textWidth = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(212, 212, 216);
    doc.setLineWidth(0.35);
    doc.line(marginX + textWidth + 4, currentY - 1.2, pageWidth - marginX, currentY - 1.2);
    return currentY + 6.5;
  };

  // 1. OBJECTIVE
  y = drawSectionHeader('OBJECTIVE', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(39, 39, 42);
  const objectiveLines = doc.splitTextToSize(RESUME_DATA.objective, contentWidth);
  doc.text(objectiveLines, marginX, y);
  y += objectiveLines.length * 4.7 + 6;

  // 2. EDUCATION (Two-Column Layout matching original resume)
  y = drawSectionHeader('EDUCATION', y);
  const colWidth = (contentWidth - 8) / 2;
  const rightColX = marginX + colWidth + 8;

  // Left Column: Tarlac State University
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(24, 24, 27);
  doc.text('TARLAC STATE UNIVERSITY 2022–2026', marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(55, 65, 81);
  const tsuText = doc.splitTextToSize(
    '• Bachelor of Science in Information Technology, Specialized in Web and Mobile Application',
    colWidth - 2
  );
  doc.text(tsuText, marginX + 2, y + 5);

  // Right Column: Maliwalo National High School
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(24, 24, 27);
  doc.text('MALIWALO NATIONAL HIGH SCHOOL 2020–2022', rightColX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(55, 65, 81);
  const hsText = doc.splitTextToSize('• Accountancy, Business, and Management', colWidth - 2);
  doc.text(hsText, rightColX + 2, y + 5);

  y += Math.max(tsuText.length, hsText.length) * 4.6 + 10;

  // 3. TECHNICAL SKILLS & BASIC SKILLS (Two-Column Layout matching original resume)
  y = drawSectionHeader('TECHNICAL SKILLS & BASIC SKILLS', y);
  const startSkillsY = y;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.3);
  doc.setTextColor(39, 39, 42);

  const techSkillNames = [
    'HTML, CSS, JavaScript',
    'PHP (Basic)',
    'Java (Basic)',
    'Python (Basic)',
    'MySQL',
    'Git & GitHub',
    'Microsoft Office',
    'XAMPP',
    'POSTMAN',
  ];

  techSkillNames.forEach((skill, idx) => {
    doc.text(`•  ${skill}`, marginX + 2, startSkillsY + idx * 4.8);
  });

  const basicSkillNames = [
    'Critical thinking',
    'Communication',
    'Time management',
    'Hardworking',
    'Work Ethics',
    'Proactive',
    'Fast Learning',
  ];

  basicSkillNames.forEach((skill, idx) => {
    doc.text(`•  ${skill}`, rightColX + 2, startSkillsY + idx * 4.8);
  });

  y = startSkillsY + techSkillNames.length * 4.8 + 6;

  // 4. PROJECT & RESEARCH
  y = drawSectionHeader('PROJECT & RESEARCH', y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.3);
  doc.setTextColor(24, 24, 27);
  doc.text(RESUME_DATA.project.role, marginX, y);
  y += 4.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(39, 39, 42);

  const projectBullets = [
    RESUME_DATA.project.title,
    ...RESUME_DATA.project.bullets,
  ];

  projectBullets.forEach((bullet) => {
    const wrapped = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 2);
    doc.text(wrapped, marginX + 2, y);
    y += wrapped.length * 4.4 + 1.2;
  });

  y += 4.5;

  // 5. SEMINARS & WEBINARS / CERTIFICATION ATTENDED
  y = drawSectionHeader('SEMINARS & WEBINARS / CERTIFICATION ATTENDED', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.1);
  doc.setTextColor(39, 39, 42);

  const seminarLines = [
    'Dec 2025 – Introduction to Artificial Intelligence and Machine Learning for SUCs – University of the Philippines - Information Technology Development Center',
    'Nov 2025 – Information Session on Understanding Web3 – Department of Information and Communications Technology – Caraga Region',
    'Sep 2025 – Hour of Code: Learn AI & Coding in a Fun and Engaging Way – Department of Information and Communications Technology - CAR Region',
  ];

  seminarLines.forEach((item) => {
    const wrapped = doc.splitTextToSize(`•  ${item}`, contentWidth - 2);
    doc.text(wrapped, marginX + 2, y);
    y += wrapped.length * 4.5 + 1.5;
  });

  y += 4.5;

  // 6. LANGUAGE & SOCIAL LINKS
  y = drawSectionHeader('LANGUAGE', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.8);
  doc.setTextColor(24, 24, 27);
  doc.text('Tagalog', marginX, y);
  doc.text('English (Basic)', marginX, y + 5.2);

  // Social Profiles on Right Column of bottom section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(24, 24, 27);
  doc.text('ONLINE PROFILES', rightColX, y - 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(63, 63, 70);
  doc.text('GitHub: https://github.com/earlPineda', rightColX, y + 3.8);
  doc.text('LinkedIn: https://www.linkedin.com/in/earl-pineda-5907ab427/', rightColX, y + 8);
  doc.text('Facebook: https://www.facebook.com/earlkevin.pineda.90', rightColX, y + 12.2);
  doc.text('Instagram: https://www.instagram.com/_earlllp/', rightColX, y + 16.4);

  doc.save('Earl_Kevin_E_Pineda_Resume.pdf');
}
