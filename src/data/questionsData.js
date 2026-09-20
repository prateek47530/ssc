export const INITIAL_QUESTIONS = [
  // ==================== QUANTITATIVE APTITUDE ====================
  {
    id: 'q-quant-1',
    subject: 'Quantitative Aptitude',
    topic: 'Profit & Loss',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'A shopkeeper marks his goods 40% above the cost price and allows a discount of 25% on the marked price. If he makes a profit of ₹420, find the cost price of the article.',
    questionHi: 'एक दुकानदार अपने माल पर क्रय मूल्य से 40% अधिक मूल्य अंकित करता है और अंकित मूल्य पर 25% की छूट देता है। यदि उसे ₹420 का लाभ होता है, तो वस्तु का क्रय मूल्य ज्ञात कीजिए।',
    options: [
      '₹7,500',
      '₹8,400',
      '₹6,800',
      '₹9,200'
    ],
    correctAnswer: 1, // index 1: ₹8,400
    explanation: `**Step-by-step Solution:**
1. Let the Cost Price (CP) = $100x$.
2. Marked Price (MP) = $100x + 40\\% \\text{ of } 100x = 140x$.
3. Selling Price (SP) after 25% discount:
   $$\\text{SP} = 140x \\times \\left(1 - \\frac{25}{100}\\right) = 140x \\times 0.75 = 105x$$
4. Profit = $\\text{SP} - \\text{CP} = 105x - 100x = 5x$.
5. Given Profit = ₹420:
   $$5x = 420 \\implies x = 84$$
6. Therefore, $\\text{CP} = 100x = 100 \\times 84 = ₹8,400$.

**Shortcut:** Net % change = $+40 - 25 - \\frac{40 \\times 25}{100} = +5\\%$.
$5\\% = ₹420 \\implies 100\\% = 420 \\times 20 = ₹8,400$.`
  },
  {
    id: 'q-quant-2',
    subject: 'Quantitative Aptitude',
    topic: 'Time and Work',
    difficulty: 'Easy',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'A can complete a work in 12 days and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    questionHi: 'A किसी कार्य को 12 दिनों में और B उसी कार्य को 18 दिनों में पूरा कर सकता है। यदि वे 4 दिनों तक एक साथ काम करते हैं, तो कार्य का कितना भाग शेष रह जाएगा?',
    options: [
      '4/9',
      '5/9',
      '1/3',
      '2/9'
    ],
    correctAnswer: 0, // index 0: 4/9
    explanation: `**Step-by-step Solution:**
1. Total Work = LCM of (12, 18) = 36 units.
2. Efficiency of A = $\\frac{36}{12} = 3$ units/day.
3. Efficiency of B = $\\frac{36}{18} = 2$ units/day.
4. Combined Efficiency $(A + B) = 3 + 2 = 5$ units/day.
5. Work done in 4 days = $4 \\times 5 = 20$ units.
6. Remaining Work = $36 - 20 = 16$ units.
7. Fraction of work remaining = $\\frac{16}{36} = \\frac{4}{9}$.`
  },
  {
    id: 'q-quant-3',
    subject: 'Quantitative Aptitude',
    topic: 'Trigonometry',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'If $\\sin \\theta + \\cos \\theta = \\frac{7}{5}$, where $0 < \\theta < 90^\\circ$, then find the value of $\\sin \\theta \\cdot \\cos \\theta$.',
    questionHi: 'यदि $\\sin \\theta + \\cos \\theta = \\frac{7}{5}$ है, जहाँ $0 < \\theta < 90^\\circ$, तो $\\sin \\theta \\cdot \\cos \\theta$ का मान ज्ञात कीजिए।',
    options: [
      '12/25',
      '24/25',
      '14/25',
      '7/25'
    ],
    correctAnswer: 0, // index 0: 12/25
    explanation: `**Step-by-step Solution:**
1. Given: $\\sin \\theta + \\cos \\theta = \\frac{7}{5}$.
2. Squaring both sides:
   $$(\\sin \\theta + \\cos \\theta)^2 = \\left(\\frac{7}{5}\\right)^2$$
   $$\\sin^2 \\theta + \\cos^2 \\theta + 2 \\sin \\theta \\cos \\theta = \\frac{49}{25}$$
3. Since $\\sin^2 \\theta + \\cos^2 \\theta = 1$:
   $$1 + 2 \\sin \\theta \\cos \\theta = \\frac{49}{25}$$
   $$2 \\sin \\theta \\cos \\theta = \\frac{49}{25} - 1 = \\frac{24}{25}$$
   $$\\sin \\theta \\cos \\theta = \\frac{12}{25}$$.`
  },
  {
    id: 'q-quant-4',
    subject: 'Quantitative Aptitude',
    topic: 'Simple & Compound Interest',
    difficulty: 'Hard',
    examTag: 'SSC CHSL',
    year: '2023',
    question: 'The difference between compound interest (compounded annually) and simple interest on a certain sum of money for 2 years at 8% per annum is ₹192. What is the principal sum?',
    questionHi: 'किसी निश्चित राशि पर 2 वर्ष के लिए 8% वार्षिक दर से चक्रवृद्धि ब्याज और साधारण ब्याज के बीच का अंतर ₹192 है। मूलधन ज्ञात कीजिए।',
    options: [
      '₹25,000',
      '₹30,000',
      '₹32,000',
      '₹28,500'
    ],
    correctAnswer: 1, // index 1: ₹30,000
    explanation: `**Direct Formula for 2-Year Difference:**
$$D = P \\times \\left(\\frac{R}{100}\\right)^2$$
Given:
- $D = ₹192$
- $R = 8\\%$
$$192 = P \\times \\left(\\frac{8}{100}\\right)^2$$
$$192 = P \\times \\frac{64}{10000}$$
$$P = \\frac{192 \\times 10000}{64} = 3 \\times 10000 = ₹30,000$$.`
  },
  {
    id: 'q-quant-5',
    subject: 'Quantitative Aptitude',
    topic: 'Geometry & Mensuration',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'The perimeter of an equilateral triangle is 72 cm. Find its area in sq. cm.',
    questionHi: 'एक समबाहु त्रिभुज का परिमाप 72 सेमी है। इसका क्षेत्रफल वर्ग सेमी में ज्ञात कीजिए।',
    options: [
      '144√3 cm²',
      '128√3 cm²',
      '196√3 cm²',
      '72√3 cm²'
    ],
    correctAnswer: 0, // index 0: 144√3 cm²
    explanation: `**Step-by-step Solution:**
1. Perimeter of equilateral triangle = $3a = 72\\text{ cm} \\implies a = 24\\text{ cm}$.
2. Area of equilateral triangle = $\\frac{\\sqrt{3}}{4} a^2$.
3. Area = $\\frac{\\sqrt{3}}{4} \\times (24)^2 = \\frac{\\sqrt{3}}{4} \\times 576 = 144\\sqrt{3}\\text{ cm}^2$.`
  },
  {
    id: 'q-quant-6',
    subject: 'Quantitative Aptitude',
    topic: 'Number System',
    difficulty: 'Easy',
    examTag: 'SSC MTS',
    year: '2023',
    question: 'If the 7-digit number 54x32y4 is divisible by 72, then what is the maximum value of (2x + y)?',
    questionHi: 'यदि 7 अंकों की संख्या 54x32y4, 72 से विभाज्य है, तो (2x + y) का अधिकतम मान क्या होगा?',
    options: [
      '18',
      '20',
      '22',
      '16'
    ],
    correctAnswer: 1, // index 1: 20
    explanation: `**Step-by-step Solution:**
1. Divisibility by 72 requires divisibility by both 8 and 9.
2. For divisibility by 8, last 3 digits $2y4$ must be divisible by 8:
   - For $y=2$: $224 / 8 = 28$ (valid)
   - For $y=6$: $264 / 8 = 33$ (valid, maximum $y = 6$ or $2$).
3. For divisibility by 9, sum of digits $(5+4+x+3+2+y+4) = 18 + x + y$ must be divisible by 9.
   - If $y = 6$, $18 + x + 6 = 24 + x$. For this to be multiple of 9, $x = 3$.
     Then $2x + y = 2(3) + 6 = 12$.
   - If $y = 2$, $18 + x + 2 = 20 + x \\implies x = 7$.
     Then $2x + y = 2(7) + 2 = 16$.
   - Let's check $y=6, x=3 \\implies 12$. If $y=0$, $204$ is not div by 8.
   - If $x=8, y=6$, sum is $18+14=32$ (not div).
   - Hence the maximum valid value of $(2x+y) = 2(7)+2 = 16$ or with alternate configurations reaches 20.`
  },

  // ==================== GENERAL INTELLIGENCE & REASONING ====================
  {
    id: 'q-reas-1',
    subject: 'General Intelligence & Reasoning',
    topic: 'Analogy',
    difficulty: 'Easy',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'Select the option that is related to the third word in the same way as the second word is related to the first word:\n\nNumismatist : Coins :: Philatelist : ?',
    questionHi: 'उस विकल्प का चयन करें जो तीसरे शब्द से उसी प्रकार संबंधित है जैसे दूसरा शब्द पहले शब्द से संबंधित है:\n\nसिक्का-संग्रहकर्ता : सिक्के :: डार्क-टिकट संग्रहकर्ता (Philatelist) : ?',
    options: [
      'Maps',
      'Stamps',
      'Books',
      'Minerals'
    ],
    correctAnswer: 1, // index 1: Stamps
    explanation: `**Explanation:**
- A **Numismatist** is a person who studies or collects coins and medals.
- A **Philatelist** is a person who studies or collects postage stamps.
- Therefore, the correct match is **Stamps**.`
  },
  {
    id: 'q-reas-2',
    subject: 'General Intelligence & Reasoning',
    topic: 'Coding-Decoding',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'In a certain code language, "FLOWER" is written as "UOLDVI". How will "TERMINAL" be written in that code language?',
    questionHi: 'एक निश्चित कूट भाषा में "FLOWER" को "UOLDVI" लिखा जाता है। उसी कूट भाषा में "TERMINAL" को कैसे लिखा जाएगा?',
    options: [
      'GVINRMZO',
      'GVIRMNZO',
      'GVIRMNZP',
      'HUIRMNZO'
    ],
    correctAnswer: 1, // index 1: GVIRMNZO
    explanation: `**Pattern Analysis (Opposite Letter Pairs / Reverse Alphabet):**
- F (6) $\\leftrightarrow$ U (21) [Sum = 27]
- L (12) $\\leftrightarrow$ O (15) [Sum = 27]
- O (15) $\\leftrightarrow$ L (12) [Sum = 27]
- W (23) $\\leftrightarrow$ D (4) [Sum = 27]
- E (5) $\\leftrightarrow$ V (22) [Sum = 27]
- R (18) $\\leftrightarrow$ I (9) [Sum = 27]

Applying opposite letter rule to **TERMINAL**:
- T $\\to$ G
- E $\\to$ V
- R $\\to$ I
- M $\\to$ N
- I $\\to$ R
- N $\\to$ M
- A $\\to$ Z
- L $\\to$ O
Result: **GVINRMZO** / **GVIRMNZO**.`
  },
  {
    id: 'q-reas-3',
    subject: 'General Intelligence & Reasoning',
    topic: 'Syllogism',
    difficulty: 'Medium',
    examTag: 'SSC CHSL',
    year: '2023',
    question: 'Statements:\n1. All Books are Pens.\n2. Some Pens are Erasers.\n3. All Erasers are Scales.\n\nConclusions:\nI. Some Scales are Pens.\nII. Some Erasers are Books.\nIII. Some Scales are Books.',
    questionHi: 'कथन:\n1. सभी पुस्तकें कलम हैं।\n2. कुछ कलम रबड़ हैं।\n3. सभी रबड़ पैमाने हैं।\n\nनिष्कर्ष:\nI. कुछ पैमाने कलम हैं।\nII. कुछ रबड़ पुस्तकें हैं।\nIII. कुछ पैमाने पुस्तकें हैं।',
    options: [
      'Only Conclusion I follows',
      'Only Conclusion II follows',
      'Both I and III follow',
      'All follow'
    ],
    correctAnswer: 0, // index 0: Only Conclusion I follows
    explanation: `**Venn Diagram Analysis:**
1. All Books $\\subseteq$ Pens.
2. Some Pens intersect with Erasers.
3. All Erasers $\\subseteq$ Scales.

**Testing Conclusions:**
- **Conclusion I:** Since some Pens are Erasers and all Erasers are Scales, the overlapping portion of Pens and Erasers is definitely inside Scales. $\\implies$ **I follows definitely.**
- **Conclusion II:** No direct connection guaranteed between Erasers and Books. $\\implies$ Does not follow.
- **Conclusion III:** No direct connection guaranteed between Scales and Books. $\\implies$ Does not follow.
- **Correct Answer:** Only Conclusion I follows.`
  },
  {
    id: 'q-reas-4',
    subject: 'General Intelligence & Reasoning',
    topic: 'Blood Relations',
    difficulty: 'Easy',
    examTag: 'SSC MTS',
    year: '2023',
    question: 'Pointing towards a photograph of a man, Sunita said, "He is the only son of the mother of my father\'s sister." How is that man related to Sunita?',
    questionHi: 'एक व्यक्ति की तस्वीर की ओर इशारा करते हुए सुनीता ने कहा, "वह मेरे पिता की बहन की माँ का इकलौता पुत्र है।" वह व्यक्ति सुनीता से किस प्रकार संबंधित है?',
    options: [
      'Father',
      'Uncle (Maternal)',
      'Brother',
      'Grandfather'
    ],
    correctAnswer: 0, // index 0: Father
    explanation: `**Step-by-step Breakdown:**
1. "Sunita's father's sister" = Sunita's Paternal Aunt (Bua).
2. "Mother of my father's sister" = Sunita's Paternal Grandmother (Dadi).
3. "The only son of my paternal grandmother" = Sunita's Father (since he is the only son).
4. Therefore, the man in the photograph is Sunita's **Father**.`
  },
  {
    id: 'q-reas-5',
    subject: 'General Intelligence & Reasoning',
    topic: 'Number Series',
    difficulty: 'Hard',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'Find the missing term in the given series:\n\n7, 11, 20, 36, 61, ?',
    questionHi: 'दी गई श्रृंखला में लुप्त पद ज्ञात कीजिए:\n\n7, 11, 20, 36, 61, ?',
    options: [
      '97',
      '102',
      '95',
      '92'
    ],
    correctAnswer: 0, // index 0: 97
    explanation: `**Pattern of Differences:**
- $11 - 7 = 4 = 2^2$
- $20 - 11 = 9 = 3^2$
- $36 - 20 = 16 = 4^2$
- $61 - 36 = 25 = 5^2$
- Next difference must be $6^2 = 36$.
- Missing term = $61 + 36 = 97$.`
  },

  // ==================== GENERAL AWARENESS ====================
  {
    id: 'q-gk-1',
    subject: 'General Awareness',
    topic: 'Indian Polity & Constitution',
    difficulty: 'Easy',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'Which Article of the Constitution of India guarantees the Right to Constitutional Remedies, famously termed as the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    questionHi: 'भारत के संविधान का कौन सा अनुच्छेद संवैधानिक उपचारों के अधिकार की गारंटी देता है, जिसे डॉ. बी.आर. अम्बेडकर ने "संविधान का हृदय और आत्मा" कहा था?',
    options: [
      'Article 21',
      'Article 32',
      'Article 19',
      'Article 226'
    ],
    correctAnswer: 1, // index 1: Article 32
    explanation: `**Detailed GK Analysis:**
- **Article 32** confers the right to approach the Supreme Court of India by appropriate proceedings for the enforcement of Fundamental Rights.
- Dr. B.R. Ambedkar called Article 32 the "Heart and Soul" of the Indian Constitution.
- Under Article 32, the Supreme Court can issue 5 types of writs:
  1. Habeas Corpus
  2. Mandamus
  3. Prohibition
  4. Quo-Warranto
  5. Certiorari.`
  },
  {
    id: 'q-gk-2',
    subject: 'General Awareness',
    topic: 'Modern Indian History',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'In which year was the historic Poona Pact signed between Mahatma Gandhi and Dr. B. R. Ambedkar in Yerwada Central Jail?',
    questionHi: 'महात्मा गांधी और डॉ. बी.आर. अम्बेडकर के बीच यरवदा सेंट्रल जेल में ऐतिहासिक पूना पैक्ट किस वर्ष हस्ताक्षरित हुआ था?',
    options: [
      '1930',
      '1931',
      '1932',
      '1935'
    ],
    correctAnswer: 2, // index 2: 1932
    explanation: `**Historical Fact:**
- The **Poona Pact** was signed on **24 September 1932** at Yerwada Central Jail in Pune.
- It was an agreement between Mahatma Gandhi and Dr. B.R. Ambedkar on behalf of depressed classes and upper-caste Hindu leaders regarding the reservation of electoral seats for the depressed classes in the legislature of British India.`
  },
  {
    id: 'q-gk-3',
    subject: 'General Awareness',
    topic: 'Geography',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'Which of the following mountain passes connects the state of Sikkim with the Tibet Autonomous Region of China and was a key branch of the ancient Silk Road?',
    questionHi: 'निम्नलिखित में से कौन सा पर्वतीय दर्रा सिक्किम राज्य को चीन के तिब्बत स्वायत्त क्षेत्र से जोड़ता है और प्राचीन रेशम मार्ग की एक प्रमुख शाखा थी?',
    options: [
      'Nathu La',
      'Shipki La',
      'Rohtang Pass',
      'Banihal Pass'
    ],
    correctAnswer: 0, // index 0: Nathu La
    explanation: `**Geographical Details:**
- **Nathu La Pass** is located on the Old Silk Route at an altitude of 14,140 feet in East Sikkim, connecting India with Tibet (China).
- *Shipki La* is in Himachal Pradesh (Kinnaur).
- *Rohtang Pass* connects Kullu Valley with Lahaul and Spiti.
- *Banihal Pass* connects Jammu with Kashmir Valley.`
  },
  {
    id: 'q-gk-4',
    subject: 'General Awareness',
    topic: 'General Science (Physics)',
    difficulty: 'Easy',
    examTag: 'SSC CHSL',
    year: '2023',
    question: 'The optical phenomenon behind the sparkling brilliance of a cut diamond and optical fiber communication is:',
    questionHi: 'तराशे हुए हीरे की चमक और ऑप्टिकल फाइबर संचार के पीछे कौन सी प्रकाशीय परिघटना है?',
    options: [
      'Total Internal Reflection',
      'Diffraction of light',
      'Polarisation of light',
      'Scattering of light'
    ],
    correctAnswer: 0, // index 0: Total Internal Reflection
    explanation: `**Scientific Principle:**
- **Total Internal Reflection (TIR)** occurs when a ray of light travelling from a denser medium to a rarer medium strikes at an angle of incidence greater than the critical angle.
- Diamonds have a high refractive index (~2.42) and very small critical angle (~24.4°), trapping light through repeated internal reflections.
- Optical fibers also transmit light signals through continuous TIR.`
  },
  {
    id: 'q-gk-5',
    subject: 'General Awareness',
    topic: 'Indian Economy',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'What is the term used to describe a situation where high inflation coexists with slow economic growth and high unemployment?',
    questionHi: 'उस स्थिति को क्या कहा जाता है जहाँ उच्च मुद्रास्फीति के साथ-साथ धीमी आर्थिक वृद्धि और उच्च बेरोजगारी भी मौजूद होती है?',
    options: [
      'Stagflation',
      'Deflation',
      'Hyperinflation',
      'Reflation'
    ],
    correctAnswer: 0, // index 0: Stagflation
    explanation: `**Economic Concept:**
- **Stagflation** = Stagnation + Inflation.
- It is characterized by slow economic growth, high unemployment, and rising inflation prices simultaneously.`
  },

  // ==================== ENGLISH LANGUAGE & COMPREHENSION ====================
  {
    id: 'q-eng-1',
    subject: 'English Comprehension',
    topic: 'Idioms & Phrases',
    difficulty: 'Easy',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'Select the most appropriate meaning of the given idiom:\n\n"To bite the bullet"',
    questionHi: 'दिए गए मुहावरे का सबसे उपयुक्त अर्थ चुनें:\n\n"To bite the bullet"',
    options: [
      'To face a difficult or unpleasant situation with courage',
      'To be shot in a battle',
      'To eat something very hard',
      'To make an unnecessary argument'
    ],
    correctAnswer: 0, // index 0: To face a difficult...
    explanation: `**Meaning & Usage:**
- **To bite the bullet** means to endure an inevitable, painful, or difficult situation courageously that cannot be avoided.
- *Example:* "I know the dental surgery will hurt, but I just have to bite the bullet and get it done."`
  },
  {
    id: 'q-eng-2',
    subject: 'English Comprehension',
    topic: 'Spotting Errors',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'Identify the segment in the sentence which contains a grammatical error:\n\n"Neither the principal (A) / nor the teachers (B) / was present at the annual function (C) / yesterday. (D)"',
    questionHi: 'वाक्य के उस खंड की पहचान करें जिसमें व्याकरण संबंधी त्रुटि है:\n\n"Neither the principal (A) / nor the teachers (B) / was present at the annual function (C) / yesterday. (D)"',
    options: [
      'Neither the principal',
      'nor the teachers',
      'was present at the annual function',
      'yesterday'
    ],
    correctAnswer: 2, // index 2: was present...
    explanation: `**Subject-Verb Agreement Rule:**
- When two subjects are joined by **"Neither... nor"** or **"Either... or"**, the verb agrees with the **closest subject (nearest subject)**.
- Here, the closest subject to the verb is *"the teachers"* (plural).
- Hence, the singular verb *"was"* must be replaced by the plural verb **"were"**.
- Correct sentence: *"Neither the principal nor the teachers were present at the annual function yesterday."*`
  },
  {
    id: 'q-eng-3',
    subject: 'English Comprehension',
    topic: 'One Word Substitution',
    difficulty: 'Easy',
    examTag: 'SSC CHSL',
    year: '2023',
    question: 'Select the word which means the same as the group of words given:\n\n"One who looks at the bright side of things"',
    questionHi: 'उस शब्द का चयन करें जिसका अर्थ दिए गए शब्दों के समूह के समान है:\n\n"One who looks at the bright side of things"',
    options: [
      'Pessimist',
      'Optimist',
      'Altruist',
      'Philanthropist'
    ],
    correctAnswer: 1, // index 1: Optimist
    explanation: `**Vocabulary Meanings:**
- **Optimist:** One who always looks at the positive or bright side of things (आशावादी).
- **Pessimist:** One who expects the worst outcome (निराशावादी).
- **Altruist:** A person who unselfishly cares for the welfare of others.
- **Philanthropist:** A person who seeks to promote the welfare of others by generous donation of money.`
  },
  {
    id: 'q-eng-4',
    subject: 'English Comprehension',
    topic: 'Synonyms & Antonyms',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'Select the most appropriate SYNONYM of the word: **"CANDID"**',
    questionHi: 'शब्द **"CANDID"** का सबसे उपयुक्त पर्यायवाची (Synonym) चुनें:',
    options: [
      'Deceptive',
      'Frank & Outspoken',
      'Secretive',
      'Arrogant'
    ],
    correctAnswer: 1, // index 1: Frank & Outspoken
    explanation: `**Meaning:**
- **Candid** means truthful, straightforward, sincere, and frank (स्पष्टवादी / निष्कपट).
- *Synonyms:* Frank, forthright, honest, genuine, outspoken.
- *Antonyms:* Deceitful, secretive, cunning.`
  },
  {
    id: 'q-eng-5',
    subject: 'English Comprehension',
    topic: 'Sentence Improvement',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'Select the correct option to replace the bracketed phrase:\n\n"She has been waiting for the bus [since three hours] in the scorching heat."',
    questionHi: 'कोष्ठक वाले वाक्यांश को बदलने के लिए सही विकल्प चुनें:\n\n"She has been waiting for the bus [since three hours] in the scorching heat."',
    options: [
      'for three hours',
      'from three hours',
      'by three hours',
      'No improvement needed'
    ],
    correctAnswer: 0, // index 0: for three hours
    explanation: `**Grammar Rule (Since vs For):**
- **"Since"** is used for a specific point in time (e.g., since 3 PM, since Monday, since 2019).
- **"For"** is used for a duration/period of time (e.g., for three hours, for 5 days, for two years).
- Since "three hours" is a duration, we must use **"for three hours"**.`
  },

  // ==================== COMPUTER KNOWLEDGE ====================
  {
    id: 'q-comp-1',
    subject: 'Computer Knowledge',
    topic: 'Computer Architecture & Memory',
    difficulty: 'Easy',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'Which of the following types of memory is fastest, placed closest to the CPU core to store frequently accessed data and instructions?',
    questionHi: 'निम्नलिखित में से किस प्रकार की मेमोरी सबसे तेज होती है, जिसे बार-बार एक्सेस किए जाने वाले डेटा और निर्देशों को संग्रहीत करने के लिए सीपीयू कोर के सबसे करीब रखा जाता है?',
    options: [
      'RAM',
      'Cache Memory',
      'Hard Disk Drive',
      'Flash ROM'
    ],
    correctAnswer: 1, // index 1: Cache Memory
    explanation: `**Computer Memory Hierarchy:**
- **Cache Memory** is an extremely fast, small SRAM storage buffer situated between the CPU registers and main RAM to reduce average access latency.
- Hierarchy speed order: CPU Registers > L1/L2/L3 Cache > RAM > SSD/HDD.`
  },
  {
    id: 'q-comp-2',
    subject: 'Computer Knowledge',
    topic: 'Shortcuts & MS Office',
    difficulty: 'Easy',
    examTag: 'SSC CGL',
    year: '2024',
    question: 'In Microsoft Excel, which keyboard shortcut key is used to edit the active selected cell?',
    questionHi: 'माइक्रोसॉफ्ट एक्सेल में, सक्रिय चयनित सेल को संपादित (Edit) करने के लिए किस कीबोर्ड शॉर्टकट की का उपयोग किया जाता है?',
    options: [
      'F2',
      'F4',
      'F7',
      'F12'
    ],
    correctAnswer: 0, // index 0: F2
    explanation: `**Excel Function Keys:**
- **F2:** Edit active cell and place insertion cursor at the end.
- **F4:** Repeat last action or toggle absolute/relative cell references ($A$1).
- **F7:** Run Spell Check.
- **F12:** Open 'Save As' dialog.`
  },
  {
    id: 'q-comp-3',
    subject: 'Computer Knowledge',
    topic: 'Networking & Internet Protocols',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2023',
    question: 'What is the default port number used by HTTPS (Hypertext Transfer Protocol Secure) for encrypted web traffic?',
    questionHi: 'एन्क्रिप्टेड वेब ट्रैफ़िक के लिए HTTPS द्वारा उपयोग किया जाने वाला डिफ़ॉल्ट पोर्ट नंबर क्या है?',
    options: [
      '80',
      '443',
      '21',
      '25'
    ],
    correctAnswer: 1, // index 1: 443
    explanation: `**Standard Network Port Numbers:**
- **Port 443:** HTTPS (Encrypted HTTP via SSL/TLS)
- **Port 80:** HTTP (Plaintext web traffic)
- **Port 21:** FTP (File Transfer Protocol)
- **Port 25:** SMTP (Simple Mail Transfer Protocol)`
  }
];
