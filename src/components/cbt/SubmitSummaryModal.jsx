import React from 'react';
import { Modal } from '../common/Modal';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export const SubmitSummaryModal = ({
  isOpen,
  onClose,
  testTitle,
  questions,
  userResponses,
  timeRemainingSeconds,
  onConfirmSubmit
}) => {
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

  const attemptedTotal = answered + ansMarked;
  const unattemptedTotal = questions.length - attemptedTotal;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Test Submission Summary" maxWidth={620}>
      <div>
        <div style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>{testTitle}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Please review your question attempt statistics below before submitting the examination.
          </div>
        </div>

        {/* Summary Table */}
        <div className="table-responsive" style={{ marginBottom: '1.5rem' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Category Status</th>
                <th style={{ textAlign: 'right' }}>No. of Questions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="legend-badge bg-cbt-answered" style={{ width: 16, height: 16 }}></div>
                  <span style={{ fontWeight: 600 }}>Answered & Saved</span>
                </td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--cbt-answered)' }}>{answered}</td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="legend-badge bg-cbt-not-answered" style={{ width: 16, height: 16 }}></div>
                  <span style={{ fontWeight: 600 }}>Not Answered</span>
                </td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--cbt-not-answered)' }}>{notAnswered}</td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="legend-badge bg-cbt-marked-review" style={{ width: 16, height: 16 }}></div>
                  <span style={{ fontWeight: 600 }}>Marked for Review (Unanswered)</span>
                </td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--cbt-marked-review)' }}>{markedReview}</td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="legend-badge bg-cbt-ans-marked" style={{ width: 16, height: 16 }}></div>
                  <span style={{ fontWeight: 600 }}>Answered & Marked for Review</span>
                </td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--cbt-ans-marked)' }}>{ansMarked}</td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="legend-badge bg-cbt-not-visited" style={{ width: 16, height: 16 }}></div>
                  <span style={{ fontWeight: 600 }}>Not Visited</span>
                </td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--cbt-not-visited)' }}>{notVisited}</td>
              </tr>
              <tr style={{ background: 'var(--bg-surface-subtle)', fontWeight: 800 }}>
                <td>Total Questions</td>
                <td className="mono" style={{ textAlign: 'right' }}>{questions.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Warning Note */}
        <div style={{ padding: '0.85rem 1rem', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid var(--accent-amber)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
          <AlertTriangle size={20} color="var(--accent-amber)" flexShrink={0} />
          <span>
            Once submitted, your answers will be evaluated instantly. You will not be able to resume this test session.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Resume Exam
          </button>
          <button className="btn btn-primary" onClick={onConfirmSubmit} style={{ background: 'var(--accent-emerald)' }}>
            <ShieldCheck size={18} /> Yes, Submit Final Test
          </button>
        </div>
      </div>
    </Modal>
  );
};
