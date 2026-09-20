import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Filter, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatSecondsToTime } from '../../utils/formatters';

export const DetailedAnswerReview = ({ evaluations = [] }) => {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'CORRECT' | 'WRONG' | 'UNATTEMPTED' | 'MARKED'
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);
  const { bookmarkedQIds, toggleBookmark } = useAuth();

  // Extract unique subjects
  const subjects = Array.from(new Set(evaluations.map(e => e.subject).filter(Boolean)));

  const filteredEvaluations = evaluations.filter(item => {
    // Status Filter
    if (filter === 'CORRECT' && !item.isCorrect) return false;
    if (filter === 'WRONG' && !item.isWrong) return false;
    if (filter === 'UNATTEMPTED' && item.isAttempted) return false;
    if (filter === 'MARKED' && !item.isMarked) return false;

    // Subject Filter
    if (subjectFilter !== 'ALL' && item.subject !== subjectFilter) return false;

    return true;
  });

  return (
    <div>
      {/* Review Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        
        {/* Status Pills */}
        <div className="review-filter-bar" style={{ margin: 0 }}>
          {[
            { id: 'ALL', label: `All Questions (${evaluations.length})` },
            { id: 'CORRECT', label: `Correct (${evaluations.filter(e => e.isCorrect).length})` },
            { id: 'WRONG', label: `Incorrect (${evaluations.filter(e => e.isWrong).length})` },
            { id: 'UNATTEMPTED', label: `Skipped (${evaluations.filter(e => !e.isAttempted).length})` },
            { id: 'MARKED', label: `Marked (${evaluations.filter(e => e.isMarked).length})` }
          ].map(btn => (
            <button
              key={btn.id}
              className={`btn btn-sm ${filter === btn.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(btn.id)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Subject Filter Dropdown */}
        {subjects.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Subject:</span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="ALL">All Subjects</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

      </div>

      {/* Questions List */}
      {filteredEvaluations.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No questions matched your selected filter criteria.
        </div>
      ) : (
        filteredEvaluations.map((item, index) => {
          const q = item.question;
          const isBookmarked = bookmarkedQIds.includes(q.id);
          const isUserCorrect = item.isCorrect;
          const isUserWrong = item.isWrong;
          const isSkipped = !item.isAttempted;

          let cardStatusClass = 'unattempted';
          if (isUserCorrect) cardStatusClass = 'correct';
          else if (isUserWrong) cardStatusClass = 'wrong';

          return (
            <div key={item.questionId || index} className={`review-card ${cardStatusClass}`}>
              
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'Outfit' }}>
                    Q{index + 1}.
                  </span>
                  <span className="badge badge-primary">{item.subject}</span>
                  <span className="badge badge-purple">{item.topic}</span>
                  
                  {isUserCorrect && (
                    <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Correct (+{item.score})
                    </span>
                  )}
                  {isUserWrong && (
                    <span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <XCircle size={13} /> Wrong ({item.score})
                    </span>
                  )}
                  {isSkipped && (
                    <span className="badge" style={{ background: 'var(--bg-surface-subtle)', color: 'var(--text-muted)' }}>
                      Skipped (0.0)
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} />
                    <span className="mono">{item.timeSpentSeconds || 0}s spent</span>
                  </div>

                  <button
                    className="btn-icon"
                    onClick={() => toggleBookmark(q.id)}
                    style={{ color: isBookmarked ? 'var(--accent-amber)' : 'var(--text-muted)' }}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                  >
                    {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {q.question}
              </div>

              {/* Options Evaluation List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {q.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isUserPick = item.selectedOption === optIdx;
                  const isCorrectAns = q.correctAnswer === optIdx;

                  let borderStyle = '1.5px solid var(--border-subtle)';
                  let bgStyle = 'var(--bg-surface)';
                  let textBadge = null;

                  if (isCorrectAns) {
                    borderStyle = '2px solid var(--accent-emerald)';
                    bgStyle = 'rgba(16, 185, 129, 0.12)';
                    textBadge = (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', marginLeft: 'auto' }}>
                        ✓ Correct Answer
                      </span>
                    );
                  }

                  if (isUserPick && !isCorrectAns) {
                    borderStyle = '2px solid var(--accent-crimson)';
                    bgStyle = 'rgba(239, 68, 68, 0.12)';
                    textBadge = (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-crimson)', marginLeft: 'auto' }}>
                        ✗ Your Choice
                      </span>
                    );
                  } else if (isUserPick && isCorrectAns) {
                    textBadge = (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', marginLeft: 'auto' }}>
                        ✓ Your Choice (Correct)
                      </span>
                    );
                  }

                  return (
                    <div
                      key={optIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: borderStyle,
                        background: bgStyle
                      }}
                    >
                      <div 
                        className="cbt-opt-badge"
                        style={{
                          backgroundColor: isCorrectAns ? 'var(--accent-emerald)' : isUserPick ? 'var(--accent-crimson)' : undefined,
                          borderColor: isCorrectAns ? 'var(--accent-emerald)' : isUserPick ? 'var(--accent-crimson)' : undefined,
                          color: (isCorrectAns || isUserPick) ? '#ffffff' : undefined
                        }}
                      >
                        {letter}
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: (isCorrectAns || isUserPick) ? 700 : 500 }}>
                        {opt}
                      </span>
                      {textBadge}
                    </div>
                  );
                })}
              </div>

              {/* Step-by-Step Explanation Box */}
              {q.explanation && (
                <div className="explanation-box">
                  <div className="explanation-title">
                    <Sparkles size={16} /> Detailed Solution & Concept Trick:
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.65 }}>
                    {q.explanation}
                  </div>
                </div>
              )}

            </div>
          );
        })
      )}
    </div>
  );
};
