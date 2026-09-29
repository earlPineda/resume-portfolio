import avatarImage from '../assets/images/pfp_resume.jpeg';
import scanFreshShowcase from '../assets/images/project_scanfresh_showcase_1790648784601.jpg';

export interface TechnicalSkill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  categoryLabel: string;
  proficiency: number;
  levelLabel: string;
  experienceSummary: string;
  appliedIn: string;
}

export interface CoreSkill {
  id: string;
  name: string;
  proficiency: number;
  description: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  period: string;
  program: string;
  specialization: string;
  location: string;
  highlights: string[];
}

export interface SeminarEntry {
  id: string;
  date: string;
  title: string;
  organizer: string;
  regionOrUnit: string;
  focusArea: string;
}

export interface FruitSample {
  name: string;
  freshnessScore: number;
  status: 'Optimal Freshness' | 'Consume Soon';
  caloriesPer100g: number;
  vitaminCMgPer100g: number;
  fiberGPer100g: number;
  sugarGPer100g: number;
  shelfLifeAmbient: string;
  shelfLifeRefrigerated: string;
  storageGuidance: string;
}

export const RESUME_DATA = {
  fullName: 'Earl Kevin E. Pineda',
  shortName: 'Earl Kevin Pineda',
  roleTitle: 'Web & Mobile Application Developer',
  degreeSummary: 'BS Information Technology (2022–2026)',
  phone: '+639483402560',
  phoneFormatted: '+63 948 340 2560',
  location: 'Maliwalo Zone 5, Tarlac City',
  email: 'earlp458@gmail.com',
  defaultAvatar: avatarImage,
  projectShowcaseImage: scanFreshShowcase,
  objective:
    'Motivated and detail-oriented graduate with a Bachelor of Science in Information Technology, specializing in Web & Mobile Application Development. Enthusiastic about applying my skills and knowledge in an entry-level position. Looking for an entry-level position where I can get hands-on experience and contribute towards the company’s objectives.',
  objectiveExact:
    'Motivated and Detail oriented graduate with BSIT, specializing in Web & Mobile Application Development. Enthusiastic about applying my skills and knowledge in an entry level position. Looking for an entry level position where I can get hands on experience and contribute towards company’s objectives.',
  keyMetrics: [
    {
      value: '2026',
      unit: 'BSIT Cohort',
      label: 'Tarlac State University · Web & Mobile Specialization',
    },
    {
      value: '10',
      unit: 'Fruit Classes',
      label: 'Supported in ScanFresh Zero-Shot CLIP AI Scanner',
    },
    {
      value: '9',
      unit: 'Core Technologies',
      label: 'Across Web Frontend, Backend Scripting, SQL & API Tooling',
    },
  ],
  education: [
    {
      id: 'tsu-bsit',
      institution: 'Tarlac State University',
      period: '2022–2026',
      program: 'Bachelor of Science in Information Technology',
      specialization: 'Specialized in Web and Mobile Application',
      location: 'Tarlac City, Philippines',
      highlights: [
        'Focused on responsive frontend engineering, mobile UI systems, relational databases, and full-stack integration.',
        'Lead Frontend & AI Integration Developer for capstone research project ScanFresh.',
      ],
    },
    {
      id: 'maliwalo-nhs',
      institution: 'Maliwalo National High School',
      period: '2020–2022',
      program: 'Senior High School — Academic Track',
      specialization: 'Accountancy, Business, and Management (ABM)',
      location: 'Tarlac City, Philippines',
      highlights: [
        'Developed analytical foundations in quantitative analysis, business operations, and structured communication.',
      ],
    },
  ] as EducationEntry[],
  technicalSkills: [
    {
      id: 'html-css-js',
      name: 'HTML, CSS, JavaScript',
      category: 'frontend',
      categoryLabel: 'Frontend & Web UI',
      proficiency: 92,
      levelLabel: 'Advanced',
      experienceSummary:
        'Primary frontend engineering stack used to architect responsive mobile-first interfaces, interactive calculators, and real-time classification views.',
      appliedIn: 'ScanFresh Mobile UI, Nutrient Estimator & Responsive Portfolio',
    },
    {
      id: 'git-github',
      name: 'Git & GitHub',
      category: 'tools',
      categoryLabel: 'Version Control & Workflow',
      proficiency: 86,
      levelLabel: 'Proficient',
      experienceSummary:
        'Source code management, branch workflows, pull requests, and multi-developer collaboration across frontend and backend repositories.',
      appliedIn: 'Team Capstone Repository & Open-Source Portfolio Projects',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'backend',
      categoryLabel: 'Backend & Database',
      proficiency: 82,
      levelLabel: 'Proficient',
      experienceSummary:
        'Relational schema design, CRUD query optimization, table joins, and structured application data storage.',
      appliedIn: 'Academic Information Systems & Local Web Stack Databases',
    },
    {
      id: 'xampp',
      name: 'XAMPP',
      category: 'tools',
      categoryLabel: 'Local Server Environment',
      proficiency: 88,
      levelLabel: 'Proficient',
      experienceSummary:
        'Configuring local Apache HTTP server and MariaDB/MySQL environments for rapid PHP and database application prototyping.',
      appliedIn: 'Web Development Coursework & Database Administration Labs',
    },
    {
      id: 'postman',
      name: 'POSTMAN',
      category: 'tools',
      categoryLabel: 'API Testing & Integration',
      proficiency: 84,
      levelLabel: 'Proficient',
      experienceSummary:
        'Inspecting REST API payloads, verifying status codes, testing JSON endpoints, and validating frontend-to-backend integration.',
      appliedIn: 'ScanFresh Python/Node.js Backend API Contract Testing',
    },
    {
      id: 'ms-office',
      name: 'Microsoft Office',
      category: 'tools',
      categoryLabel: 'Documentation & Analytics',
      proficiency: 94,
      levelLabel: 'Advanced',
      experienceSummary:
        'Comprehensive technical documentation, research manuscript preparation, data tabulation in Excel, and project defense decks.',
      appliedIn: 'Capstone Research Documentation & ABM Analytical Reports',
    },
    {
      id: 'python-basic',
      name: 'Python (Basic)',
      category: 'backend',
      categoryLabel: 'Backend & AI Scripting',
      proficiency: 70,
      levelLabel: 'Foundational',
      experienceSummary:
        'Foundational Python programming and connecting frontend scan interfaces with zero-shot CLIP inference endpoints.',
      appliedIn: 'ScanFresh AI Model Integration & Scripting Fundamentals',
    },
    {
      id: 'php-basic',
      name: 'PHP (Basic)',
      category: 'backend',
      categoryLabel: 'Server-Side Web',
      proficiency: 68,
      levelLabel: 'Foundational',
      experienceSummary:
        'Server-side form handling, session management, and dynamic HTML rendering connected to MySQL databases.',
      appliedIn: 'University Web Systems Development Projects',
    },
    {
      id: 'java-basic',
      name: 'Java (Basic)',
      category: 'backend',
      categoryLabel: 'Object-Oriented Programming',
      proficiency: 68,
      levelLabel: 'Foundational',
      experienceSummary:
        'Object-oriented programming principles, class hierarchies, data structures, and mobile application foundations.',
      appliedIn: 'BSIT Core Programming & Mobile Computing Modules',
    },
  ] as TechnicalSkill[],
  basicSkills: [
    {
      id: 'critical-thinking',
      name: 'Critical Thinking',
      proficiency: 92,
      description: 'Breaking down complex user problems into clear, testable interface and data requirements.',
    },
    {
      id: 'communication',
      name: 'Communication',
      proficiency: 90,
      description: 'Articulating technical progress clearly between frontend, backend, and research stakeholders.',
    },
    {
      id: 'time-management',
      name: 'Time Management',
      proficiency: 94,
      description: 'Delivering milestones on schedule across concurrent academic sprints and development deadlines.',
    },
    {
      id: 'hardworking',
      name: 'Hardworking',
      proficiency: 98,
      description: 'Consistent dedication to refining code quality, user experience details, and team deliverables.',
    },
    {
      id: 'work-ethics',
      name: 'Work Ethics',
      proficiency: 97,
      description: 'High accountability, integrity, and adherence to engineering standards and collaborative commitments.',
    },
    {
      id: 'proactive',
      name: 'Proactive',
      proficiency: 94,
      description: 'Anticipating UI edge cases and taking initiative to resolve integration bottlenecks early.',
    },
    {
      id: 'fast-learning',
      name: 'Fast Learning',
      proficiency: 96,
      description: 'Rapidly adopting modern frameworks, AI integration workflows, and emerging Web3/ML concepts.',
    },
  ] as CoreSkill[],
  project: {
    title: 'ScanFresh: A Real-Time Fruit Freshness and Nutrient Estimation Scanner',
    role: 'Frontend & AI Integration Developer',
    year: '2025–2026',
    frontendStack: 'HTML · CSS · JavaScript',
    backendStack: 'Python · Firebase · Node.js · Zero-Shot CLIP',
    summary:
      'An AI-powered mobile and web application engineered to solve consumer fruit quality assessment through real-time computer vision, automated freshness grading, and weight-calibrated nutritional calculation.',
    bullets: [
      'Designed and built the user interface of an AI-powered mobile application that addresses the challenge of accurate consumer fruit quality assessment.',
      'Developed key features including fruit identification, freshness classification, nutritional display, weight-based nutrient calculator, and shelf-life storage guidance using HTML, CSS, JavaScript.',
      'The system supports 10 predefined fruit types via zero-shot CLIP classification, with the backend powered by Python, Firebase, and Node.js handled by the team.',
    ],
    supportedFruits: [
      {
        name: 'Apple',
        freshnessScore: 96,
        status: 'Optimal Freshness',
        caloriesPer100g: 52,
        vitaminCMgPer100g: 4.6,
        fiberGPer100g: 2.4,
        sugarGPer100g: 10.4,
        shelfLifeAmbient: '5–7 days at room temp',
        shelfLifeRefrigerated: '3–4 weeks in crisper drawer (1–4°C)',
        storageGuidance: 'Keep away from ethylene-sensitive produce; store in high-humidity crisper.',
      },
      {
        name: 'Banana',
        freshnessScore: 89,
        status: 'Optimal Freshness',
        caloriesPer100g: 89,
        vitaminCMgPer100g: 8.7,
        fiberGPer100g: 2.6,
        sugarGPer100g: 12.2,
        shelfLifeAmbient: '3–5 days at room temp',
        shelfLifeRefrigerated: '5–7 days once ripe (peel darkens, flesh stays firm)',
        storageGuidance: 'Store at 15–20°C away from direct sunlight; wrap crown stems to slow ripening.',
      },
      {
        name: 'Mango',
        freshnessScore: 94,
        status: 'Optimal Freshness',
        caloriesPer100g: 60,
        vitaminCMgPer100g: 36.4,
        fiberGPer100g: 1.6,
        sugarGPer100g: 13.7,
        shelfLifeAmbient: '2–4 days once ripe',
        shelfLifeRefrigerated: '5–8 days refrigerated after ripening',
        storageGuidance: 'Ripen at room temperature until slightly soft to touch, then transfer to cold storage.',
      },
      {
        name: 'Orange',
        freshnessScore: 95,
        status: 'Optimal Freshness',
        caloriesPer100g: 47,
        vitaminCMgPer100g: 53.2,
        fiberGPer100g: 2.4,
        sugarGPer100g: 9.4,
        shelfLifeAmbient: '7–10 days on counter',
        shelfLifeRefrigerated: '3–4 weeks in mesh bag',
        storageGuidance: 'Maintain airflow around citrus rind; avoid sealed plastic bags to prevent mold.',
      },
      {
        name: 'Strawberry',
        freshnessScore: 84,
        status: 'Consume Soon',
        caloriesPer100g: 32,
        vitaminCMgPer100g: 58.8,
        fiberGPer100g: 2.0,
        sugarGPer100g: 4.9,
        shelfLifeAmbient: '1 day at room temp',
        shelfLifeRefrigerated: '3–5 days unwashed with dry paper towel lining',
        storageGuidance: 'Wash only right before consumption; moisture accelerates fungal spoilage.',
      },
      {
        name: 'Pineapple',
        freshnessScore: 91,
        status: 'Optimal Freshness',
        caloriesPer100g: 50,
        vitaminCMgPer100g: 47.8,
        fiberGPer100g: 1.4,
        sugarGPer100g: 9.9,
        shelfLifeAmbient: '2–3 days whole on counter',
        shelfLifeRefrigerated: '4–6 days whole or 5 days cubed in airtight glass',
        storageGuidance: 'Once sliced, seal immediately in an airtight container at 4°C.',
      },
      {
        name: 'Grapes',
        freshnessScore: 93,
        status: 'Optimal Freshness',
        caloriesPer100g: 69,
        vitaminCMgPer100g: 3.2,
        fiberGPer100g: 0.9,
        sugarGPer100g: 15.5,
        shelfLifeAmbient: '2–3 days at room temp',
        shelfLifeRefrigerated: '1–2 weeks unwashed in ventilated container',
        storageGuidance: 'Store toward the back of the refrigerator where temperature is coldest and stable.',
      },
      {
        name: 'Papaya',
        freshnessScore: 87,
        status: 'Consume Soon',
        caloriesPer100g: 43,
        vitaminCMgPer100g: 60.9,
        fiberGPer100g: 1.7,
        sugarGPer100g: 7.8,
        shelfLifeAmbient: '2–3 days once skin turns yellow-orange',
        shelfLifeRefrigerated: '5–7 days once fully ripened',
        storageGuidance: 'Turn daily while ripening on counter to prevent flat bruising spots.',
      },
      {
        name: 'Watermelon',
        freshnessScore: 95,
        status: 'Optimal Freshness',
        caloriesPer100g: 30,
        vitaminCMgPer100g: 8.1,
        fiberGPer100g: 0.4,
        sugarGPer100g: 6.2,
        shelfLifeAmbient: '7–10 days uncut at room temp',
        shelfLifeRefrigerated: '2 weeks uncut; 3–4 days wrapped once sliced',
        storageGuidance: 'Keep uncut melon in cool shaded area; refrigerate tightly covered after cutting.',
      },
      {
        name: 'Avocado',
        freshnessScore: 90,
        status: 'Optimal Freshness',
        caloriesPer100g: 160,
        vitaminCMgPer100g: 10.0,
        fiberGPer100g: 6.7,
        sugarGPer100g: 0.7,
        shelfLifeAmbient: '2–4 days until yielding to gentle pressure',
        shelfLifeRefrigerated: '3–5 days once ripe',
        storageGuidance: 'Brush cut flesh with lemon/lime juice and press wrap directly against surface.',
      },
    ] as FruitSample[],
  },
  seminars: [
    {
      id: 'up-itdc-ai-ml',
      date: 'Dec 2025',
      title: 'Introduction to Artificial Intelligence and Machine Learning for SUCs',
      organizer: 'University of the Philippines',
      regionOrUnit: 'Information Technology Development Center (UP ITDC)',
      focusArea: 'Artificial Intelligence · Machine Learning Foundations',
    },
    {
      id: 'dict-web3',
      date: 'Nov 2025',
      title: 'Information Session on Understanding Web3',
      organizer: 'Department of Information and Communications Technology',
      regionOrUnit: 'Caraga Region',
      focusArea: 'Decentralized Web · Blockchain Architecture',
    },
    {
      id: 'dict-hour-of-code',
      date: 'Sep 2025',
      title: 'Hour of Code: Learn AI & Coding in a Fun and Engaging Way',
      organizer: 'Department of Information and Communications Technology',
      regionOrUnit: 'CAR Region',
      focusArea: 'AI Literacy · Algorithmic Problem Solving',
    },
  ] as SeminarEntry[],
  languages: [
    {
      language: 'Tagalog',
      proficiency: 'Native / Fluent Proficiency',
      detail: 'Primary spoken and written language for professional collaboration',
    },
    {
      language: 'English (Basic)',
      proficiency: 'Working Technical & Written Proficiency',
      detail: 'Technical documentation, software specification, and team communication',
    },
  ],
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      handle: '@earlPineda',
      url: 'https://github.com/earlPineda',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'earl-pineda-5907ab427',
      url: 'https://www.linkedin.com/in/earl-pineda-5907ab427/',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'earlkevin.pineda.90',
      url: 'https://www.facebook.com/earlkevin.pineda.90',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@_earlllp',
      url: 'https://www.instagram.com/_earlllp/',
    },
  ],
};
