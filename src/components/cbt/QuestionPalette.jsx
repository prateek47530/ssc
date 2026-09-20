import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield } from 'lucide-react';

export const QuestionPalette = ({
  questions,
  currentQIndex,
  userResponses,
  onJumpQuestion
}) => {
  const { user } = useAuth();

  // Calculate live counts
  let answered = 0;
  let notAnswered = 0;
  let markedReview = 0;
  let ansMarked = 0;
  let notVisited = 0;

  questions.forEach(q => {
    const status = userResponses[q.id]?.status || 'NOT_VISITED';
    if (status === 'ANSWERED') answered++;
    else if (status === 'NOT_ANSWERED') notAnswered++;
    else if (status === 'MARKED_REVIEW') markedReview++;
    else if (status === 'ANS_MARKED') ansMarked++;
    else notVisited++;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'ANSWERED': return 'bg-cbt-answered';
      case 'NOT_ANSWERED': return 'bg-cbt-not-answered';
      case 'MARKED_REVIEW': return 'bg-cbt-marked-review';
      case 'ANS_MARKED': return 'bg-cbt-ans-marked';
      default: return 'bg-cbt-not-visited';
    }
  };

  return (
    <div className="cbt-palette-pane">
      {/* Candidate Profile Info */}
      <div className="palette-candidate-card">
        <div className="candidate-avatar">
          {user?.name?.charAt(0) || 'C'}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.92rem', lineHeight: 1.2 }}>{user?.name || 'Candidate'}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Roll: 2201048912</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--primary-600)', fontWeight: 600 }}>CBT Exam Portal</div>
        </div>
      </div>

      {/* TCS iON Style Status Legends & Live Count */}
      <div className="palette-legend">
        <div className="legend-item" title="Answered questions">
          <div className="legend-badge bg-cbt-answered">{answered}</div>
          <span>Answered</span>
        </div>
        <div className="legend-item" title="Not answered questions">
          <div className="legend-badge bg-cbt-not-answered">{notAnswered}</div>
          <span>Not Answered</span>
        </div>
        <div className="legend-item" title="Not visited questions">
          <div className="legend-badge bg-cbt-not-visited">{notVisited}</div>
          <span>Not Visited</span>
        </div>
        <div className="legend-item" title="Marked for review">
          <div className="legend-badge bg-cbt-marked-review">{markedReview}</div>
          <span>Marked Review</span>
        </div>
        <div className="legend-item" style={{ gridColumn: 'span 2' }} title="Answered & Marked for review">
          <div className="legend-badge bg-cbt-ans-marked">{ansMarked}</div>
          <span>Answered & Marked for Review</span>
        </div>
      </div>

      {/* Palette Title */}
      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
        Question Palette ({questions.length} Questions)
      </div>

      {/* Palette Grid */}
      <div className="palette-grid">
        {questions.map((q, idx) => {
          const resp = userResponses[q.id];
          const status = resp?.status || 'NOT_VISITED';
          const isActive = idx === currentQIndex;
          const statusBgClass = getStatusClass(status);

          return (
            <button
              key={q.id}
              className={`palette-btn ${statusBgClass} ${isActive ? 'active-q' : ''}`}
              onClick={() => onJumpQuestion(idx)}
              title={`Q${idx + 1} - ${q.subject} (${status})`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
