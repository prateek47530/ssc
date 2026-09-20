import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  Award,
  Zap
} from 'lucide-react';
import { formatScore, formatPercent } from '../../utils/formatters';

export const DailyQuiz = ({ onNavigate }) => {
  const { questions } = useExam();
  const { dailyStreak, recordDailyPractice } = useAuth();

  // 5 Daily Quiz questions sample
  const dailyQuestions = questions.slice(0, 5);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const q = dailyQuestions[currentIdx];

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < dailyQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let correct = 0;
    dailyQuestions.forEach(item => {
      if (selectedAnswers[item.id] === item.correctAnswer) correct++;
    });
    recordDailyPractice(correct >= 3);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  // Calculate score if submitted
  let correctCount = 0;
  let wrongCount = 0;
  dailyQuestions.forEach(item => {
    const ans = selectedAnswers[item.id];
    if (ans !== undefined) {
      if (ans === item.correctAnswer) correctCount++;
      else wrongCount++;
    }
  });
  const unattempted = dailyQuestions.length - (correctCount + wrongCount);
  const totalScore = (correctCount * 2) - (wrongCount * 0.5);

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container" style={{ maxWidth: 840 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={13} /> DAILY QUIZ
              </span>
              <span className="badge badge-primary">5 High-Yield MCQs</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>SSC Daily Rapid Booster Quiz</h1>
          </div>

          {/* Streak Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(234, 88, 12, 0.1)', border: '1px solid rgba(234, 88, 12, 0.3)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)' }}>
            <Flame size={22} color="#ea580c" fill="#ea580c" />
            <div>
              <div className="mono" style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ea580c' }}>{dailyStreak?.streakCount || 7} Days</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Daily Streak</div>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          /* Ongoing Quiz Interface */
          <div className="glass-panel" style={{ padding: '2rem' }}>
            
            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Question {currentIdx + 1} of {dailyQuestions.length}</span>
              <span>{Math.round(((currentIdx + 1) / dailyQuestions.length) * 100)}% Complete</span>
            </div>
            <div style={{ height: 6, background: 'var(--bg-surface-subtle)', borderRadius: 3, overflow: 'hidden', marginBottom: '1.75rem' }}>
              <div style={{ height: '100%', width: `${((currentIdx + 1) / dailyQuestions.length) * 100}%`, background: 'var(--primary-600)', transition: 'width 0.3s ease' }} />
            </div>

            {/* Question Info */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-primary">{q.subject}</span>
              <span className="badge badge-purple">{q.topic}</span>
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              {q.question}
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {q.options.map((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedAnswers[q.id] === idx;

                return (
                  <div
                    key={idx}
                    className={`cbt-option-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(idx)}
                  >
                    <div className="cbt-opt-badge">{letter}</div>
                    <span className="cbt-opt-text" style={{ fontWeight: 600 }}>{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Navigation & Submit Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                className="btn btn-secondary"
                disabled={currentIdx === 0}
                onClick={handlePrev}
                style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
              >
                Previous
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {currentIdx < dailyQuestions.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next Question <ArrowRight size={16} />
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleSubmitQuiz}>
                    Submit Daily Quiz <CheckCircle2 size={16} />
                  </button>
                )}
              </div>
            </div>

          </div>
        ) : (
          /* Quiz Results Scorecard */
          <div>
            <div className="scorecard-hero" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem' }}>Daily Quiz Summary</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                <div className="metric-card-mini">
                  <div className="label">Score</div>
                  <div className="val" style={{ color: '#38bdf8' }}>{formatScore(totalScore)} / 10.0</div>
                </div>
                <div className="metric-card-mini">
                  <div className="label">Correct</div>
                  <div className="val" style={{ color: '#34d399' }}>{correctCount} / 5</div>
                </div>
                <div className="metric-card-mini">
                  <div className="label">Accuracy</div>
                  <div className="val">{formatPercent((correctCount / (correctCount + wrongCount || 1)) * 100)}</div>
                </div>
                <div className="metric-card-mini">
                  <div className="label">Streak Status</div>
                  <div className="val" style={{ color: '#fb923c' }}>+1 Day Recorded!</div>
                </div>
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {dailyQuestions.map((item, i) => {
                const userChoice = selectedAnswers[item.id];
                const isCorrect = userChoice === item.correctAnswer;
                const isSkipped = userChoice === undefined;

                return (
                  <div key={item.id} className={`review-card ${isCorrect ? 'correct' : isSkipped ? 'unattempted' : 'wrong'}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 700 }}>Question {i + 1} ({item.subject})</span>
                      {isCorrect ? (
                        <span className="badge badge-success">✓ Correct (+2)</span>
                      ) : isSkipped ? (
                        <span className="badge">Skipped (0)</span>
                      ) : (
                        <span className="badge badge-danger">✗ Incorrect (-0.5)</span>
                      )}
                    </div>
                    
                    <div style={{ fontWeight: 600, marginBottom: '1rem' }}>{item.question}</div>
                    
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      Correct Answer: <strong>Option {String.fromCharCode(65 + item.correctAnswer)} ({item.options[item.correctAnswer]})</strong>
                    </div>

                    {item.explanation && (
                      <div className="explanation-box">
                        <div style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={handleRestart}>
                <RotateCcw size={16} /> Retry Quiz
              </button>
              <button className="btn btn-primary" onClick={() => onNavigate('mock-tests')}>
                Take Full Mock Test <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
