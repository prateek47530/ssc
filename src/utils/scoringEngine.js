/**
 * Calculate test results based on user answers and test config
 */
export const calculateTestResults = ({
  test,
  questions,
  userResponses,     // { [questionId]: { selectedOption: number|null, status: string, timeSpentSeconds: number } }
  totalDurationSeconds,
  timeTakenSeconds
}) => {
  const posMarks = test.positiveMarksPerQuestion || 2.0;
  const negMarks = test.negativeMarksPerQuestion || 0.5;

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let markedCount = 0;

  const questionEvaluations = [];
  const subjectMap = {};

  questions.forEach((q) => {
    const response = userResponses[q.id] || {
      selectedOption: null,
      status: 'NOT_VISITED',
      timeSpentSeconds: 0
    };

    const isAttempted = response.selectedOption !== null && response.selectedOption !== undefined;
    const isCorrect = isAttempted && response.selectedOption === q.correctAnswer;
    const isWrong = isAttempted && response.selectedOption !== q.correctAnswer;
    const isMarked = response.status === 'MARKED_REVIEW' || response.status === 'ANS_MARKED';

    if (isCorrect) correctCount++;
    else if (isWrong) wrongCount++;
    else unattemptedCount++;

    if (isMarked) markedCount++;

    // Question score contribution
    let qScore = 0;
    if (isCorrect) qScore = posMarks;
    else if (isWrong) qScore = -negMarks;

    questionEvaluations.push({
      questionId: q.id,
      question: q,
      selectedOption: response.selectedOption,
      correctAnswer: q.correctAnswer,
      isCorrect,
      isWrong,
      isAttempted,
      isMarked,
      status: response.status || (isAttempted ? 'ANSWERED' : 'NOT_ANSWERED'),
      score: qScore,
      timeSpentSeconds: response.timeSpentSeconds || 0,
      subject: q.subject,
      topic: q.topic,
      difficulty: q.difficulty
    });

    // Subject level aggregation
    if (!subjectMap[q.subject]) {
      subjectMap[q.subject] = {
        subject: q.subject,
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        wrong: 0,
        unattempted: 0,
        maxScore: 0,
        score: 0,
        timeSpentSeconds: 0
      };
    }

    const sub = subjectMap[q.subject];
    sub.totalQuestions++;
    sub.maxScore += posMarks;
    sub.timeSpentSeconds += (response.timeSpentSeconds || 0);

    if (isAttempted) {
      sub.attempted++;
      if (isCorrect) {
        sub.correct++;
        sub.score += posMarks;
      } else {
        sub.wrong++;
        sub.score -= negMarks;
      }
    } else {
      sub.unattempted++;
    }
  });

  const totalQuestions = questions.length;
  const attemptedCount = correctCount + wrongCount;
  const rawScore = (correctCount * posMarks) - (wrongCount * negMarks);
  const maxPossibleScore = totalQuestions * posMarks;
  const score = Math.max(0, Math.round(rawScore * 100) / 100);

  const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
  const correctPercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const wrongPercentage = totalQuestions > 0 ? (wrongCount / totalQuestions) * 100 : 0;
  const unattemptedPercentage = totalQuestions > 0 ? (unattemptedCount / totalQuestions) * 100 : 0;

  // Average time per attempted question
  const avgTimePerQuestion = attemptedCount > 0 
    ? Math.round(timeTakenSeconds / attemptedCount) 
    : 0;

  // Calculate subject-wise accuracy and format
  const subjectBreakdown = Object.values(subjectMap).map(s => ({
    ...s,
    score: Math.max(0, Math.round(s.score * 100) / 100),
    accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 1000) / 10 : 0
  }));

  // Percentile Estimation curve
  const scoreRatio = maxPossibleScore > 0 ? score / maxPossibleScore : 0;
  let percentile = 50 + (scoreRatio * 49);
  if (scoreRatio > 0.85) percentile = 95 + (scoreRatio - 0.85) * 33;
  if (scoreRatio < 0.3) percentile = scoreRatio * 150;
  percentile = Math.min(99.9, Math.max(10.0, Math.round(percentile * 10) / 10));

  const totalMockCandidates = (test.attemptedCount || 10000) + 1;
  const estimatedRank = Math.max(1, Math.round(totalMockCandidates * ((100 - percentile) / 100)));

  return {
    testId: test.id,
    testTitle: test.title,
    examCategory: test.examCategory,
    attemptedAt: new Date().toISOString(),
    totalQuestions,
    attemptedCount,
    correctCount,
    wrongCount,
    unattemptedCount,
    markedCount,
    score,
    maxPossibleScore,
    accuracy: Math.round(accuracy * 10) / 10,
    correctPercentage: Math.round(correctPercentage * 10) / 10,
    wrongPercentage: Math.round(wrongPercentage * 10) / 10,
    unattemptedPercentage: Math.round(unattemptedPercentage * 10) / 10,
    timeTakenSeconds,
    totalDurationSeconds,
    avgTimePerQuestion,
    percentile,
    estimatedRank,
    totalCandidates: totalMockCandidates,
    subjectBreakdown,
    questionEvaluations
  };
};
