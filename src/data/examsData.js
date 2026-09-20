export const SSC_EXAMS = [
  {
    id: 'ssc-cgl',
    name: 'SSC CGL',
    fullName: 'Combined Graduate Level Examination',
    badge: 'Flagship Exam',
    icon: 'Award',
    accentColor: '#2563eb',
    eligibility: 'Bachelor’s Degree in any discipline',
    ageLimit: '18 - 32 years (Post-wise)',
    tierPattern: 'Tier-I (CBT MCQ) + Tier-II (CBT + Typing)',
    totalMarks: 200,
    tier1Duration: '60 Minutes (100 Questions)',
    negativeMarking: '0.50 marks per wrong answer',
    salaryRange: '₹35,400 to ₹1,51,100 (Level 4 to Level 8)',
    upcomingExamDate: 'September - October 2024',
    description: 'SSC CGL is the most prestigious examination conducted by the Staff Selection Commission to recruit Group B and C Gazetted/Non-Gazetted officers across Central Government Ministries.',
    subjects: [
      { name: 'General Intelligence & Reasoning', questions: 25, marks: 50, color: '#8b5cf6' },
      { name: 'General Awareness', questions: 25, marks: 50, color: '#f59e0b' },
      { name: 'Quantitative Aptitude', questions: 25, marks: 50, color: '#2563eb' },
      { name: 'English Comprehension', questions: 25, marks: 50, color: '#10b981' }
    ],
    tier2Subjects: [
      { name: 'Mathematical Abilities', questions: 30, marks: 90 },
      { name: 'Reasoning and General Intelligence', questions: 30, marks: 90 },
      { name: 'English Language and Comprehension', questions: 45, marks: 135 },
      { name: 'General Awareness', questions: 25, marks: 75 },
      { name: 'Computer Knowledge Test', questions: 20, marks: 60 }
    ],
    importantTopics: [
      'Number Systems, Percentage & Profit/Loss',
      'Algebra, Geometry, Trigonometry & Mensuration',
      'Syllogism, Blood Relations, Coding-Decoding',
      'Indian Polity & Constitution, Ancient/Modern History',
      'Reading Comprehension, Error Spotting, Idioms & OWS'
    ],
    cutoffTrends: [
      { year: '2023', general: 150.04, obc: 145.34, ews: 143.44, sc: 126.68, st: 118.16 },
      { year: '2022', general: 114.27, obc: 114.27, ews: 102.35, sc: 89.08, st: 77.56 },
      { year: '2021', general: 130.18, obc: 117.87, ews: 109.64, sc: 94.58, st: 81.52 }
    ]
  },
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL',
    fullName: 'Combined Higher Secondary (10+2) Level Exam',
    badge: 'Popular',
    icon: 'BookOpen',
    accentColor: '#7c3aed',
    eligibility: '12th Standard Passed (10+2)',
    ageLimit: '18 - 27 years',
    tierPattern: 'Tier-I (CBT MCQ) + Tier-II (Objective + Skill/Typing)',
    totalMarks: 200,
    tier1Duration: '60 Minutes (100 Questions)',
    negativeMarking: '0.50 marks per wrong answer',
    salaryRange: '₹19,900 to ₹81,100 (Level 2 to Level 4)',
    upcomingExamDate: 'July 2024',
    description: 'SSC CHSL is held for recruitment of Lower Divisional Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operators (DEO) in Central Government Departments.',
    subjects: [
      { name: 'General Intelligence & Reasoning', questions: 25, marks: 50, color: '#8b5cf6' },
      { name: 'General Awareness', questions: 25, marks: 50, color: '#f59e0b' },
      { name: 'Quantitative Aptitude (Basic Arithmetic)', questions: 25, marks: 50, color: '#2563eb' },
      { name: 'English Language (Basic Knowledge)', questions: 25, marks: 50, color: '#10b981' }
    ],
    importantTopics: [
      'Arithmetic & Basic Algebra',
      'Analogies & Series Completion',
      'Static GK & Science',
      'Grammar & Sentence Improvement'
    ],
    cutoffTrends: [
      { year: '2023', general: 153.91, obc: 152.30, ews: 151.10, sc: 136.41, st: 124.52 },
      { year: '2022', general: 157.72, obc: 153.25, ews: 151.02, sc: 135.46, st: 125.79 }
    ]
  },
  {
    id: 'ssc-mts',
    name: 'SSC MTS & Havaldar',
    fullName: 'Multi-Tasking (Non-Technical) Staff Exam',
    badge: 'High Vacancies',
    icon: 'Users',
    accentColor: '#059669',
    eligibility: '10th Standard (Matriculation) Passed',
    ageLimit: '18 - 25 & 18 - 27 years',
    tierPattern: 'Session 1 (Maths & Reasoning - No Negative) + Session 2 (GK & English)',
    totalMarks: 270,
    tier1Duration: '90 Minutes (45 min each session)',
    negativeMarking: '1 mark negative in Session 2 only',
    salaryRange: '₹18,000 to ₹56,900 (Level 1)',
    upcomingExamDate: 'October - November 2024',
    description: 'SSC MTS recruits Group C Non-Gazetted, Non-Ministerial staff and Havaldars in CBIC and CBN across all states and union territories.',
    subjects: [
      { name: 'Numerical and Mathematical Ability', questions: 20, marks: 60, color: '#2563eb' },
      { name: 'Reasoning Ability and Problem Solving', questions: 20, marks: 60, color: '#8b5cf6' },
      { name: 'General Awareness', questions: 25, marks: 75, color: '#f59e0b' },
      { name: 'English Language and Comprehension', questions: 25, marks: 75, color: '#10b981' }
    ],
    importantTopics: [
      'Basic Arithmetic & Number Series',
      'Art & Culture, Folk Dances, Festivals',
      'Indian Constitution Articles',
      'Synonyms/Antonyms & Cloze Test'
    ],
    cutoffTrends: [
      { year: '2023', general: 132.50, obc: 129.80, ews: 128.40, sc: 122.10, st: 114.50 }
    ]
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable',
    fullName: 'Constable (General Duty) in CAPFs, SSF, Rifleman (GD)',
    badge: 'Defence & Police',
    icon: 'Shield',
    accentColor: '#dc2626',
    eligibility: '10th Class (Matriculation)',
    ageLimit: '18 - 23 years',
    tierPattern: 'Computer Based Exam (80 Questions) + PST / PET',
    totalMarks: 160,
    tier1Duration: '60 Minutes (80 Questions, 2 Marks each)',
    negativeMarking: '0.25 marks per wrong answer',
    salaryRange: '₹21,700 to ₹69,100 (Level 3)',
    upcomingExamDate: 'January - February 2025',
    description: 'SSC GD recruits Constables in BSF, CISF, CRPF, SSB, ITBP, AR, and SSF. High physical fitness combined with foundational MCQ ability is required.',
    subjects: [
      { name: 'General Intelligence and Reasoning', questions: 20, marks: 40, color: '#8b5cf6' },
      { name: 'General Knowledge and General Awareness', questions: 20, marks: 40, color: '#f59e0b' },
      { name: 'Elementary Mathematics', questions: 20, marks: 40, color: '#2563eb' },
      { name: 'English / Hindi Language', questions: 20, marks: 40, color: '#10b981' }
    ],
    importantTopics: [
      'Spatial Visualisation & Coding',
      'Indian History, Geography & Sports GK',
      'Percentages, Ratio, Time & Distance',
      'Hindi Vyakaran or English Grammar'
    ],
    cutoffTrends: [
      { year: '2023', general: 128.20, obc: 125.40, ews: 123.10, sc: 115.60, st: 108.90 }
    ]
  },
  {
    id: 'ssc-cpo',
    name: 'SSC CPO',
    fullName: 'Sub-Inspector in Delhi Police and Central Armed Police Forces',
    badge: 'Police Officer',
    icon: 'Compass',
    accentColor: '#ea580c',
    eligibility: 'Bachelor’s Degree + Driving License (Delhi Police)',
    ageLimit: '20 - 25 years',
    tierPattern: 'Paper-I (200 MCQs) + PET/PST + Paper-II (English 200 MCQs)',
    totalMarks: 200,
    tier1Duration: '120 Minutes (200 Questions)',
    negativeMarking: '0.25 marks per wrong answer',
    salaryRange: '₹35,400 to ₹1,12,400 (Level 6)',
    upcomingExamDate: 'June 2024',
    description: 'Direct recruitment of Sub-Inspectors (SI) in Delhi Police, BSF, CRPF, CISF, ITBP, and SSB with prestigious double star rank.',
    subjects: [
      { name: 'General Intelligence and Reasoning', questions: 50, marks: 50, color: '#8b5cf6' },
      { name: 'General Knowledge and General Awareness', questions: 50, marks: 50, color: '#f59e0b' },
      { name: 'Quantitative Aptitude', questions: 50, marks: 50, color: '#2563eb' },
      { name: 'English Comprehension', questions: 50, marks: 50, color: '#10b981' }
    ],
    importantTopics: [
      'Advanced Reasoning & Matrix',
      'Constitutional Law & National Security GK',
      'Advanced Maths & Geometry',
      'Extensive English Comprehension'
    ],
    cutoffTrends: [
      { year: '2023', general: 138.99, obc: 131.90, ews: 133.40, sc: 110.85, st: 109.50 }
    ]
  },
  {
    id: 'ssc-je',
    name: 'SSC JE',
    fullName: 'Junior Engineer (Civil, Mechanical, Electrical) Exam',
    badge: 'Technical',
    icon: 'Wrench',
    accentColor: '#0891b2',
    eligibility: 'Diploma / Degree in Civil / Electrical / Mechanical Engineering',
    ageLimit: 'Up to 30 / 32 years',
    tierPattern: 'Paper-I (Non-Tech + Tech CBT) + Paper-II (Core Technical CBT)',
    totalMarks: 200,
    tier1Duration: '120 Minutes (200 Questions)',
    negativeMarking: '0.25 marks per wrong answer',
    salaryRange: '₹35,400 to ₹1,12,400 (Level 6)',
    upcomingExamDate: 'June 2024',
    description: 'Recruitment of Junior Engineers in CPWD, MES, CWC, Border Roads Organization (BRO), and Central Water and Power Research Station.',
    subjects: [
      { name: 'General Intelligence and Reasoning', questions: 50, marks: 50, color: '#8b5cf6' },
      { name: 'General Awareness', questions: 50, marks: 50, color: '#f59e0b' },
      { name: 'General Engineering (Civil/Mech/Elect)', questions: 100, marks: 100, color: '#0891b2' }
    ],
    importantTopics: [
      'Engineering Mechanics & Structures',
      'Reasoning & Non-Verbal Puzzles',
      'Applied Science & Everyday GK'
    ],
    cutoffTrends: [
      { year: '2023 (Civil)', general: 108.16, obc: 107.40, ews: 98.60, sc: 89.30, st: 87.20 }
    ]
  },
  {
    id: 'ssc-steno',
    name: 'SSC Stenographer',
    fullName: 'Stenographer Grade ‘C’ and ‘D’ Examination',
    badge: 'Skill Based',
    icon: 'FileText',
    accentColor: '#9333ea',
    eligibility: '12th Pass + Stenography / Shorthand skill',
    ageLimit: '18 - 30 (Grade C) / 18 - 27 (Grade D)',
    tierPattern: 'CBT Exam (200 Questions, No Maths!) + Shorthand Skill Test',
    totalMarks: 200,
    tier1Duration: '120 Minutes (200 Questions)',
    negativeMarking: '0.25 marks per wrong answer',
    salaryRange: '₹25,500 to ₹1,42,400 (Grade D & C)',
    upcomingExamDate: 'October - November 2024',
    description: 'Special exam for candidates with shorthand skill. Unique exam with NO Mathematics/Quantitative section, allowing focused preparation on English and Reasoning.',
    subjects: [
      { name: 'General Intelligence & Reasoning', questions: 50, marks: 50, color: '#8b5cf6' },
      { name: 'General Awareness', questions: 50, marks: 50, color: '#f59e0b' },
      { name: 'English Language and Comprehension', questions: 100, marks: 100, color: '#10b981' }
    ],
    importantTopics: [
      'English Grammar & Extensive Reading Passage',
      'Synonyms, Antonyms, Active/Passive Voice, Direct/Indirect',
      'Logical Reasoning & Verbal Analogies'
    ],
    cutoffTrends: [
      { year: '2023 (Grade C)', general: 147.50, obc: 145.20, ews: 144.10, sc: 137.00, st: 125.00 }
    ]
  },
  {
    id: 'ssc-selection-post',
    name: 'SSC Selection Post',
    fullName: 'Phase XII / Selection Posts Examination',
    badge: 'Diverse Posts',
    icon: 'Layers',
    accentColor: '#4f46e5',
    eligibility: 'Matriculation, 10+2, or Graduation (Post Specific)',
    ageLimit: '18 - 30 years (Varies by post)',
    tierPattern: 'Single Tier CBT (100 Questions) + Skill Test where applicable',
    totalMarks: 200,
    tier1Duration: '60 Minutes (100 Questions)',
    negativeMarking: '0.50 marks per wrong answer',
    salaryRange: 'Level 1 to Level 7 depending on post category',
    upcomingExamDate: 'May - June 2024',
    description: 'Covers specialized and departmental posts across various ministries, including technical assistants, store keepers, investigators, and scientific clerks.',
    subjects: [
      { name: 'General Intelligence', questions: 25, marks: 50, color: '#8b5cf6' },
      { name: 'General Awareness', questions: 25, marks: 50, color: '#f59e0b' },
      { name: 'Quantitative Aptitude', questions: 25, marks: 50, color: '#2563eb' },
      { name: 'English Language', questions: 25, marks: 50, color: '#10b981' }
    ],
    importantTopics: [
      'Reasoning & Series',
      'General Studies & Science',
      'Basic & Advanced Math',
      'Grammar & Vocabulary'
    ],
    cutoffTrends: [
      { year: '2023', general: 142.50, obc: 139.10, ews: 136.00, sc: 120.00, st: 112.50 }
    ]
  }
];
