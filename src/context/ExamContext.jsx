import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_QUESTIONS } from '../data/questionsData';
import { INITIAL_MOCK_TESTS } from '../data/mockTestsData';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { calculateTestResults } from '../utils/scoringEngine';
import { useAuth } from './AuthContext';

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const { saveTestAttempt } = useAuth();

  // Questions and Tests state with persistence
  const [questions, setQuestions] = useState(() => {
    return getStorageItem(STORAGE_KEYS.QUESTIONS, INITIAL_QUESTIONS);
  });

  const [mockTests, setMockTests] = useState(() => {
    return getStorageItem(STORAGE_KEYS.MOCK_TESTS, INITIAL_MOCK_TESTS);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.QUESTIONS, questions);
  }, [questions]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.MOCK_TESTS, mockTests);
  }, [mockTests]);

  // Active Test Session State
  const [activeTest, setActiveTest] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(0);
  const [currentSectionId, setCurrentSectionId] = useState('');
  const [testState, setTestState] = useState('IDLE'); // 'IDLE' | 'INSTRUCTIONS' | 'RUNNING' | 'SUBMITTED'
  const [lastResult, setLastResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // 'en' | 'hi'

  // Question question-level timer tracking
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Exam Countdown Timer Effect
  useEffect(() => {
    if (testState !== 'RUNNING') return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testState]);

  // Helper to record time on current question when moving
  const updateQuestionTimeSpent = () => {
    if (testState !== 'RUNNING' || !testQuestions[currentQIndex]) return;
    const currentQId = testQuestions[currentQIndex].id;
    const now = Date.now();
    const elapsedSeconds = Math.max(1, Math.round((now - questionStartTime) / 1000));

    setUserResponses(prev => {
      const existing = prev[currentQId] || {};
      return {
        ...prev,
        [currentQId]: {
          ...existing,
          timeSpentSeconds: (existing.timeSpentSeconds || 0) + elapsedSeconds
        }
      };
    });

    setQuestionStartTime(now);
  };

  const startTestInstructions = (testId) => {
    const test = mockTests.find(t => t.id === testId);
    if (!test) return;

    // Collect all questions for this test from sections or flat list
    let qList = [];
    if (test.sections && test.sections.length > 0) {
      test.sections.forEach(sec => {
        sec.questionIds.forEach(qid => {
          const found = questions.find(q => q.id === qid);
          if (found && !qList.some(item => item.id === found.id)) {
            qList.push({ ...found, sectionId: sec.id, sectionName: sec.name });
          }
        });
      });
    }

    // Fallback if no questions matched
    if (qList.length === 0) {
      qList = questions.slice(0, test.totalQuestions || 20).map((q, idx) => ({
        ...q,
        sectionId: 'sec-general',
        sectionName: q.subject
      }));
    }

    // Initialize blank responses
    const initialResponses = {};
    qList.forEach((q, idx) => {
      initialResponses[q.id] = {
        selectedOption: null,
        status: idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED',
        timeSpentSeconds: 0
      };
    });

    setActiveTest(test);
    setTestQuestions(qList);
    setCurrentQIndex(0);
    setUserResponses(initialResponses);
    setTotalDurationSeconds((test.durationMinutes || 60) * 60);
    setTimeRemainingSeconds((test.durationMinutes || 60) * 60);
    setCurrentSectionId(test.sections?.[0]?.id || 'sec-general');
    setTestState('INSTRUCTIONS');
  };

  const beginTest = () => {
    setTestState('RUNNING');
    setQuestionStartTime(Date.now());
  };

  const selectOption = (questionId, optionIndex) => {
    setUserResponses(prev => {
      const existing = prev[questionId] || {};
      const currentSelected = existing.selectedOption;
      // Toggle off if same option is clicked again
      const newOption = currentSelected === optionIndex ? null : optionIndex;
      
      let newStatus = existing.status;
      if (newOption !== null) {
        newStatus = existing.status === 'MARKED_REVIEW' ? 'ANS_MARKED' : 'ANSWERED';
      } else {
        newStatus = existing.status === 'ANS_MARKED' ? 'MARKED_REVIEW' : 'NOT_ANSWERED';
      }

      return {
        ...prev,
        [questionId]: {
          ...existing,
          selectedOption: newOption,
          status: newStatus
        }
      };
    });
  };

  const clearResponse = (questionId) => {
    setUserResponses(prev => {
      const existing = prev[questionId] || {};
      return {
        ...prev,
        [questionId]: {
          ...existing,
          selectedOption: null,
          status: existing.status === 'ANS_MARKED' ? 'MARKED_REVIEW' : 'NOT_ANSWERED'
        }
      };
    });
  };

  const saveAndNext = () => {
    updateQuestionTimeSpent();
    const currentQ = testQuestions[currentQIndex];
    if (currentQ) {
      setUserResponses(prev => {
        const existing = prev[currentQ.id] || {};
        const hasOption = existing.selectedOption !== null && existing.selectedOption !== undefined;
        return {
          ...prev,
          [currentQ.id]: {
            ...existing,
            status: hasOption ? 'ANSWERED' : 'NOT_ANSWERED'
          }
        };
      });
    }

    if (currentQIndex < testQuestions.length - 1) {
      const nextIndex = currentQIndex + 1;
      const nextQ = testQuestions[nextIndex];
      // Mark next as visited if not visited
      setUserResponses(prev => {
        const nextExisting = prev[nextQ.id] || {};
        if (nextExisting.status === 'NOT_VISITED') {
          return {
            ...prev,
            [nextQ.id]: { ...nextExisting, status: 'NOT_ANSWERED' }
          };
        }
        return prev;
      });
      setCurrentQIndex(nextIndex);
      if (nextQ.sectionId && nextQ.sectionId !== currentSectionId) {
        setCurrentSectionId(nextQ.sectionId);
      }
    }
  };

  const markForReviewAndNext = () => {
    updateQuestionTimeSpent();
    const currentQ = testQuestions[currentQIndex];
    if (currentQ) {
      setUserResponses(prev => {
        const existing = prev[currentQ.id] || {};
        const hasOption = existing.selectedOption !== null && existing.selectedOption !== undefined;
        return {
          ...prev,
          [currentQ.id]: {
            ...existing,
            status: hasOption ? 'ANS_MARKED' : 'MARKED_REVIEW'
          }
        };
      });
    }

    if (currentQIndex < testQuestions.length - 1) {
      const nextIndex = currentQIndex + 1;
      const nextQ = testQuestions[nextIndex];
      setUserResponses(prev => {
        const nextExisting = prev[nextQ.id] || {};
        if (nextExisting.status === 'NOT_VISITED') {
          return {
            ...prev,
            [nextQ.id]: { ...nextExisting, status: 'NOT_ANSWERED' }
          };
        }
        return prev;
      });
      setCurrentQIndex(nextIndex);
      if (nextQ.sectionId && nextQ.sectionId !== currentSectionId) {
        setCurrentSectionId(nextQ.sectionId);
      }
    }
  };

  const goToPrevious = () => {
    updateQuestionTimeSpent();
    if (currentQIndex > 0) {
      const prevIndex = currentQIndex - 1;
      const prevQ = testQuestions[prevIndex];
      setCurrentQIndex(prevIndex);
      if (prevQ.sectionId && prevQ.sectionId !== currentSectionId) {
        setCurrentSectionId(prevQ.sectionId);
      }
    }
  };

  const jumpToQuestion = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= testQuestions.length) return;
    updateQuestionTimeSpent();
    const targetQ = testQuestions[targetIndex];
    setUserResponses(prev => {
      const targetExisting = prev[targetQ.id] || {};
      if (targetExisting.status === 'NOT_VISITED') {
        return {
          ...prev,
          [targetQ.id]: { ...targetExisting, status: 'NOT_ANSWERED' }
        };
      }
      return prev;
    });
    setCurrentQIndex(targetIndex);
    if (targetQ.sectionId && targetQ.sectionId !== currentSectionId) {
      setCurrentSectionId(targetQ.sectionId);
    }
  };

  const switchSection = (sectionId) => {
    updateQuestionTimeSpent();
    setCurrentSectionId(sectionId);
    // Jump to first question of that section
    const firstQIndex = testQuestions.findIndex(q => q.sectionId === sectionId);
    if (firstQIndex !== -1) {
      jumpToQuestion(firstQIndex);
    }
  };

  const handleAutoSubmit = () => {
    submitTest();
  };

  const submitTest = () => {
    updateQuestionTimeSpent();
    const timeTaken = totalDurationSeconds - timeRemainingSeconds;
    
    const evaluation = calculateTestResults({
      test: activeTest,
      questions: testQuestions,
      userResponses,
      totalDurationSeconds,
      timeTakenSeconds: timeTaken
    });

    setLastResult(evaluation);
    setTestState('SUBMITTED');
    saveTestAttempt(evaluation);
  };

  const exitTest = () => {
    setActiveTest(null);
    setTestQuestions([]);
    setCurrentQIndex(0);
    setUserResponses({});
    setTestState('IDLE');
  };

  // Admin Question Bank Operations
  const addQuestion = (newQuestion) => {
    const qWithId = {
      ...newQuestion,
      id: newQuestion.id || `q-custom-${Date.now()}`
    };
    setQuestions(prev => [qWithId, ...prev]);
    return qWithId;
  };

  const editQuestion = (updatedQuestion) => {
    setQuestions(prev => prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  };

  const deleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const createMockTest = (newTest) => {
    const testWithId = {
      ...newTest,
      id: newTest.id || `test-custom-${Date.now()}`,
      attemptedCount: 0,
      rating: 5.0
    };
    setMockTests(prev => [testWithId, ...prev]);
    return testWithId;
  };

  return (
    <ExamContext.Provider value={{
      questions,
      mockTests,
      activeTest,
      testQuestions,
      currentQIndex,
      userResponses,
      timeRemainingSeconds,
      totalDurationSeconds,
      currentSectionId,
      testState,
      lastResult,
      selectedLanguage,
      setSelectedLanguage,
      startTestInstructions,
      beginTest,
      selectOption,
      clearResponse,
      saveAndNext,
      markForReviewAndNext,
      goToPrevious,
      jumpToQuestion,
      switchSection,
      submitTest,
      exitTest,
      addQuestion,
      editQuestion,
      deleteQuestion,
      createMockTest
    }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) throw new Error('useExam must be used within ExamProvider');
  return context;
};
