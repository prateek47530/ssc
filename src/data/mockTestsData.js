export const INITIAL_MOCK_TESTS = [
  {
    id: 'test-cgl-tier1-full-1',
    title: 'SSC CGL Tier-1 All India Live Mock Test #01',
    examCategory: 'SSC CGL',
    examId: 'ssc-cgl',
    tier: 'Tier-1',
    badge: 'Trending',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 40,
    positiveMarksPerQuestion: 2,
    negativeMarksPerQuestion: 0.5,
    difficulty: 'Moderate',
    attemptedCount: 14280,
    rating: 4.9,
    description: 'Complete syllabus simulation based on latest TCS exam pattern for SSC CGL Tier-1 with exact CBT interface, bilingual questions, and percentile ranking.',
    sections: [
      {
        id: 'sec-reasoning',
        name: 'General Intelligence & Reasoning',
        questionIds: ['q-reas-1', 'q-reas-2', 'q-reas-3', 'q-reas-4', 'q-reas-5']
      },
      {
        id: 'sec-gk',
        name: 'General Awareness',
        questionIds: ['q-gk-1', 'q-gk-2', 'q-gk-3', 'q-gk-4', 'q-gk-5']
      },
      {
        id: 'sec-quant',
        name: 'Quantitative Aptitude',
        questionIds: ['q-quant-1', 'q-quant-2', 'q-quant-3', 'q-quant-4', 'q-quant-5', 'q-quant-6']
      },
      {
        id: 'sec-english',
        name: 'English Comprehension',
        questionIds: ['q-eng-1', 'q-eng-2', 'q-eng-3', 'q-eng-4', 'q-eng-5']
      }
    ]
  },
  {
    id: 'test-chsl-speed-1',
    title: 'SSC CHSL 2024 High-Speed Booster Mock Test',
    examCategory: 'SSC CHSL',
    examId: 'ssc-chsl',
    tier: 'Tier-1',
    badge: 'Speed Test',
    durationMinutes: 45,
    totalQuestions: 15,
    totalMarks: 30,
    positiveMarksPerQuestion: 2,
    negativeMarksPerQuestion: 0.5,
    difficulty: 'Easy-Moderate',
    attemptedCount: 9820,
    rating: 4.8,
    description: 'Designed specifically to boost your speed and calculation accuracy for SSC CHSL 10+2 level examination.',
    sections: [
      {
        id: 'sec-quant',
        name: 'Quantitative Aptitude',
        questionIds: ['q-quant-1', 'q-quant-2', 'q-quant-6', 'q-quant-4']
      },
      {
        id: 'sec-reasoning',
        name: 'General Intelligence',
        questionIds: ['q-reas-1', 'q-reas-3', 'q-reas-4', 'q-reas-5']
      },
      {
        id: 'sec-gk',
        name: 'General Awareness',
        questionIds: ['q-gk-1', 'q-gk-2', 'q-gk-4']
      },
      {
        id: 'sec-english',
        name: 'English Language',
        questionIds: ['q-eng-1', 'q-eng-3', 'q-eng-4', 'q-eng-5']
      }
    ]
  },
  {
    id: 'test-quant-sectional-1',
    title: 'Quantitative Aptitude — Chapter-wise Master Test',
    examCategory: 'SSC CGL',
    examId: 'ssc-cgl',
    tier: 'Sectional',
    badge: 'Subject Special',
    durationMinutes: 25,
    totalQuestions: 6,
    totalMarks: 12,
    positiveMarksPerQuestion: 2,
    negativeMarksPerQuestion: 0.5,
    difficulty: 'Moderate-Hard',
    attemptedCount: 7540,
    rating: 4.9,
    description: 'Deep dive into Arithmetic and Advanced Maths: Profit & Loss, Trigonometry, SI/CI, Time & Work, and Number System.',
    sections: [
      {
        id: 'sec-quant',
        name: 'Quantitative Aptitude',
        questionIds: ['q-quant-1', 'q-quant-2', 'q-quant-3', 'q-quant-4', 'q-quant-5', 'q-quant-6']
      }
    ]
  },
  {
    id: 'test-cgl-tier2-comp-1',
    title: 'SSC CGL Tier-2 Computer Knowledge Test',
    examCategory: 'SSC CGL',
    examId: 'ssc-cgl',
    tier: 'Tier-2 Qualifying',
    badge: 'Qualifying Must',
    durationMinutes: 15,
    totalQuestions: 3,
    totalMarks: 9,
    positiveMarksPerQuestion: 3,
    negativeMarksPerQuestion: 1.0,
    difficulty: 'Moderate',
    attemptedCount: 11200,
    rating: 4.7,
    description: 'Mandatory qualifying test for all SSC CGL Tier-2 posts covering computer hardware, MS Office, protocols, and security basics.',
    sections: [
      {
        id: 'sec-computer',
        name: 'Computer Knowledge',
        questionIds: ['q-comp-1', 'q-comp-2', 'q-comp-3']
      }
    ]
  }
];
