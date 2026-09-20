import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { useAuth } from '../../context/AuthContext';
import { Bookmark, BookmarkCheck, Sparkles, HelpCircle, Eye, EyeOff, Trash2 } from 'lucide-react';

export const BookmarksRevision = () => {
  const { questions } = useExam();
  const { bookmarkedQIds, toggleBookmark } = useAuth();
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const bookmarkedQuestions = questions.filter(q => bookmarkedQIds.includes(q.id));

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container">
        
        <div className="section-header">
          <div>
            <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>REVISION NOTEBOOK</span>
            <h1 className="section-title">Bookmarked Tricky Questions</h1>
            <p className="section-subtitle">
              Your personal repository of tricky and high-yield questions saved during mock tests and practice.
            </p>
          </div>
          <div className="badge badge-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
            {bookmarkedQuestions.length} Saved Questions
          </div>
        </div>

        {bookmarkedQuestions.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Bookmark size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No Questions Bookmarked Yet</h3>
            <p style={{ maxWidth: 460, margin: '0 auto' }}>
              While taking mock tests or exploring PYQs, click the bookmark icon on any challenging question to save it here for last-minute revision.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bookmarkedQuestions.map((q, idx) => {
              const isSolutionOpen = revealedSolutions[q.id];

              return (
                <div key={q.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="mono" style={{ fontWeight: 800 }}>Q{idx + 1}.</span>
                      <span className="badge badge-primary">{q.subject}</span>
                      <span className="badge badge-purple">{q.topic}</span>
                      <span className="badge badge-warning">{q.examTag} {q.year}</span>
                    </div>

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => toggleBookmark(q.id)}
                      style={{ color: 'var(--accent-crimson)', fontSize: '0.82rem' }}
                    >
                      <Trash2 size={14} /> Remove Bookmark
                    </button>
                  </div>

                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    {q.question}
                  </div>

                  {/* Options */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isCorrect = q.correctAnswer === optIdx;

                      return (
                        <div
                          key={optIdx}
                          className="cbt-option-item"
                          style={{
                            border: isSolutionOpen && isCorrect ? '2px solid var(--accent-emerald)' : undefined,
                            background: isSolutionOpen && isCorrect ? 'rgba(16, 185, 129, 0.12)' : undefined
                          }}
                        >
                          <div 
                            className="cbt-opt-badge"
                            style={{
                              backgroundColor: isSolutionOpen && isCorrect ? 'var(--accent-emerald)' : undefined,
                              borderColor: isSolutionOpen && isCorrect ? 'var(--accent-emerald)' : undefined,
                              color: isSolutionOpen && isCorrect ? '#fff' : undefined
                            }}
                          >
                            {letter}
                          </div>
                          <span className="cbt-opt-text" style={{ fontWeight: isSolutionOpen && isCorrect ? 700 : 500 }}>
                            {opt}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Toggle Solution Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => toggleSolution(q.id)}
                    >
                      {isSolutionOpen ? <EyeOff size={15} /> : <Eye size={15} />}
                      <span>{isSolutionOpen ? 'Hide Answer & Solution' : 'Reveal Answer & Shortcut'}</span>
                    </button>
                  </div>

                  {isSolutionOpen && q.explanation && (
                    <div className="explanation-box" style={{ marginTop: '1rem', animation: 'fadeIn 0.2s ease' }}>
                      <div className="explanation-title">
                        <Sparkles size={16} /> Step-by-Step Explanation:
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                        {q.explanation}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
