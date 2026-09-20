import React, { useState } from 'react';
import { Flame, CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';

export const DailyPracticeWidget = ({ onNavigate }) => {
  const { dailyStreak, recordDailyPractice } = useAuth();
  const { questions } = useExam();

  // Pick question of the day (e.g. 1st question)
  const qotd = questions[0] || {
    id: 'qotd-default',
    subject: 'Quantitative Aptitude',
    topic: 'Profit & Loss',
    question: 'A shopkeeper marks his goods 40% above the cost price and allows a discount of 25% on the marked price. If he makes a profit of ₹420, find the cost price of the article.',
    options: ['₹7,500', '₹8,400', '₹6,800', '₹9,200'],
    correctAnswer: 1,
    explanation: 'Net % change = +40 - 25 - (40*25)/100 = +5%. 5% = ₹420 => 100% = ₹8,400.'
  };

  const [selectedOpt, setSelectedOpt] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionClick = (idx) => {
    if (hasSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === null) return;
    setHasSubmitted(true);
    const isCorrect = selectedOpt === qotd.correctAnswer;
    recordDailyPractice(isCorrect);
  };

  return (
    <section style={{ padding: '2rem 0 3.5rem' }}>
      <div className="app-container">
        <div 
          className="glass-panel-elevated"
          style={{ 
            padding: '2.5rem', 
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Sparkles size={13} /> QUESTION OF THE DAY
                </span>
                <span className="badge badge-primary">{qotd.subject}</span>
                <span className="badge badge-purple">{qotd.topic}</span>
              </div>
              <h3 style={{ fontSize: '1.4rem' }}>Daily Rapid Practice Challenge</h3>
            </div>

            {/* Streak Widget */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.85rem', 
                background: 'rgba(234, 88, 12, 0.1)', 
                border: '1.5px solid rgba(234, 88, 12, 0.3)', 
                padding: '0.6rem 1.25rem', 
                borderRadius: 'var(--radius-lg)' 
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Flame size={20} fill="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ea580c', lineHeight: 1 }} className="mono">
                  {dailyStreak?.streakCount || 7} Days
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Active Practice Streak
                </div>
              </div>
            </div>
          </div>

          {/* Question Body */}
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {qotd.question}
          </div>

          {/* Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
            {qotd.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOpt === idx;
              const isCorrectOpt = idx === qotd.correctAnswer;
              
              let optionClass = 'cbt-option-item';
              if (isSelected) optionClass += ' selected';
              if (hasSubmitted) {
                if (isCorrectOpt) optionClass += ' correct-bg';
                if (isSelected && !isCorrectOpt) optionClass += ' wrong-bg';
              }

              return (
                <div
                  key={idx}
                  className={optionClass}
                  onClick={() => handleOptionClick(idx)}
                  style={{
                    backgroundColor: hasSubmitted && isCorrectOpt ? 'rgba(16, 185, 129, 0.15)' : 
                                    hasSubmitted && isSelected && !isCorrectOpt ? 'rgba(239, 68, 68, 0.15)' : undefined,
                    borderColor: hasSubmitted && isCorrectOpt ? 'var(--accent-emerald)' : 
                                 hasSubmitted && isSelected && !isCorrectOpt ? 'var(--accent-crimson)' : undefined
                  }}
                >
                  <div className="cbt-opt-badge">{letter}</div>
                  <div className="cbt-opt-text" style={{ fontWeight: 600 }}>{opt}</div>
                  {hasSubmitted && isCorrectOpt && <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ marginLeft: 'auto' }} />}
                  {hasSubmitted && isSelected && !isCorrectOpt && <XCircle size={18} color="var(--accent-crimson)" style={{ marginLeft: 'auto' }} />}
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {!hasSubmitted ? (
              <button 
                className="btn btn-primary"
                onClick={handleCheckAnswer}
                disabled={selectedOpt === null}
                style={{ opacity: selectedOpt === null ? 0.6 : 1 }}
              >
                <CheckCircle2 size={18} /> Submit & Check Answer
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {selectedOpt === qotd.correctAnswer ? (
                  <span className="badge badge-success" style={{ fontSize: '0.88rem', padding: '0.4rem 0.85rem' }}>
                    <CheckCircle2 size={16} /> Brilliant! Correct Answer (+2 Marks)
                  </span>
                ) : (
                  <span className="badge badge-danger" style={{ fontSize: '0.88rem', padding: '0.4rem 0.85rem' }}>
                    <XCircle size={16} /> Incorrect. Correct Option is {String.fromCharCode(65 + qotd.correctAnswer)}
                  </span>
                )}
              </div>
            )}

            <button 
              className="btn btn-outline"
              onClick={() => onNavigate('daily-practice')}
            >
              <BookOpen size={16} /> Take Full 10-Question Daily Quiz <ArrowRight size={16} />
            </button>
          </div>

          {/* Explanation reveal */}
          {hasSubmitted && qotd.explanation && (
            <div className="explanation-box" style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
              <div className="explanation-title">
                <HelpCircle size={18} /> Step-by-Step Explanation & Shortcut:
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {qotd.explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
