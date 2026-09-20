import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bookmark, BookmarkCheck, Languages, CheckCircle2 } from 'lucide-react';

export const QuestionViewer = ({
  question,
  questionIndex,
  totalQuestions,
  userResponse,
  selectedLanguage,
  onToggleLanguage,
  onSelectOption,
  positiveMarks = 2.0,
  negativeMarks = 0.5
}) => {
  const { bookmarkedQIds, toggleBookmark } = useAuth();
  const isBookmarked = bookmarkedQIds.includes(question.id);
  const selectedOptionIndex = userResponse?.selectedOption;

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if active in input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (['1', 'A'].includes(key) && question.options[0]) onSelectOption(0);
      else if (['2', 'B'].includes(key) && question.options[1]) onSelectOption(1);
      else if (['3', 'C'].includes(key) && question.options[2]) onSelectOption(2);
      else if (['4', 'D'].includes(key) && question.options[3]) onSelectOption(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onSelectOption]);

  const displayQuestionText = selectedLanguage === 'hi' && question.questionHi 
    ? question.questionHi 
    : question.question;

  return (
    <div className="cbt-question-pane">
      <div>
        {/* Top Header */}
        <div className="cbt-q-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="cbt-q-number">
              Question {questionIndex + 1} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>of {totalQuestions}</span>
            </span>
            <span className="badge badge-primary">{question.subject}</span>
            <span className="badge badge-purple">{question.topic}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language Switcher */}
            <button
              className="btn btn-sm btn-secondary"
              onClick={onToggleLanguage}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}
              title="Toggle English / Hindi question"
            >
              <Languages size={15} />
              <span>{selectedLanguage === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

            {/* Bookmark button */}
            <button
              className="btn-icon"
              onClick={() => toggleBookmark(question.id)}
              style={{ color: isBookmarked ? 'var(--accent-amber)' : 'var(--text-muted)' }}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            >
              {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>

            {/* Marks Badge */}
            <div className="cbt-marks-tag">
              Marks: <span className="pos">+{positiveMarks}</span> / <span className="neg">-{negativeMarks}</span>
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div className="cbt-q-text">
          <p style={{ whiteSpace: 'pre-line' }}>{displayQuestionText}</p>
        </div>

        {/* Options List */}
        <div className="cbt-options-list">
          {question.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOptionIndex === idx;

            return (
              <div
                key={idx}
                className={`cbt-option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectOption(idx)}
              >
                <div className="cbt-opt-badge">{letter}</div>
                <div className="cbt-opt-text">{opt}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard Helper Note */}
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.75rem' }}>
        <span>Keyboard Shortcuts: Press <strong>A, B, C, D</strong> or <strong>1, 2, 3, 4</strong> to select option.</span>
      </div>
    </div>
  );
};
