import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { DetailedAnswerReview } from './DetailedAnswerReview';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  TrendingUp, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  BarChart3, 
  Share2, 
  Download,
  Target,
  Zap,
  BookOpen
} from 'lucide-react';
import { formatSecondsToTime, formatScore, formatPercent } from '../../utils/formatters';

export const ResultDashboard = ({ onNavigate }) => {
  const { lastResult, activeTest, startTestInstructions, exitTest } = useExam();
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'review'

  if (!lastResult) {
    return (
      <div className="app-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h3>No test results to display.</h3>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => onNavigate('mock-tests')}>
          Browse Mock Tests
        </button>
      </div>
    );
  }

  const {
    testTitle,
    examCategory,
    score,
    maxPossibleScore,
    accuracy,
    correctCount,
    wrongCount,
    unattemptedCount,
    totalQuestions,
    percentile,
    estimatedRank,
    totalCandidates,
    timeTakenSeconds,
    avgTimePerQuestion,
    subjectBreakdown = [],
    questionEvaluations = []
  } = lastResult;

  // Donut chart calculations (circumference = 2 * PI * 40 = 251.2)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const correctRatio = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  const wrongRatio = totalQuestions > 0 ? wrongCount / totalQuestions : 0;
  const skippedRatio = totalQuestions > 0 ? unattemptedCount / totalQuestions : 0;

  const correctStroke = correctRatio * circumference;
  const wrongStroke = wrongRatio * circumference;
  const skippedStroke = skippedRatio * circumference;

  const isCutoffCleared = score >= (maxPossibleScore * 0.65);

  return (
    <div className="results-wrapper">
      <div className="app-container">
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button className="btn btn-sm btn-secondary" onClick={() => { exitTest(); onNavigate('mock-tests'); }}>
            <ArrowLeft size={16} /> Back to Mock Tests
          </button>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button 
              className={`btn btn-sm ${activeTab === 'summary' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('summary')}
            >
              <BarChart3 size={15} /> Performance Summary
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'review' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('review')}
            >
              <BookOpen size={15} /> Detailed Solutions Review ({totalQuestions})
            </button>
          </div>
        </div>

        {/* Scorecard Hero Banner */}
        <div className="scorecard-hero">
          <div className="scorecard-header">
            <div>
              <span className="badge badge-warning" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                {examCategory} • TEST EVALUATION REPORT
              </span>
              <h1 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>
                {testTitle}
              </h1>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className={`badge ${isCutoffCleared ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                {isCutoffCleared ? '✓ QUALIFIED (Expected Cutoff Cleared)' : '⚠️ BELOW EXPECTED CUTOFF'}
              </span>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="metrics-row">
            {/* Main Score */}
            <div className="metric-card-mini" style={{ background: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8' }}>
              <div className="label">Your Score</div>
              <div className="val" style={{ color: '#38bdf8', fontSize: '1.85rem' }}>
                {formatScore(score)} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ {maxPossibleScore}</span>
              </div>
            </div>

            {/* Rank */}
            <div className="metric-card-mini">
              <div className="label">Estimated Rank</div>
              <div className="val">
                AIR #{estimatedRank.toLocaleString()} <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>/ {totalCandidates.toLocaleString()}</span>
              </div>
            </div>

            {/* Percentile */}
            <div className="metric-card-mini">
              <div className="label">Percentile</div>
              <div className="val" style={{ color: '#34d399' }}>
                {percentile}%ile
              </div>
            </div>

            {/* Accuracy */}
            <div className="metric-card-mini">
              <div className="label">Accuracy Rate</div>
              <div className="val" style={{ color: accuracy >= 80 ? '#34d399' : '#f87171' }}>
                {formatPercent(accuracy)}
              </div>
            </div>

            {/* Time Taken */}
            <div className="metric-card-mini">
              <div className="label">Time Spent</div>
              <div className="val mono">
                {formatSecondsToTime(timeTakenSeconds)}
              </div>
            </div>

            {/* Avg Speed */}
            <div className="metric-card-mini">
              <div className="label">Avg Speed / Q</div>
              <div className="val mono">
                {avgTimePerQuestion}s
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Summary Analytics */}
        {activeTab === 'summary' ? (
          <div>
            {/* Visual Charts & Split Breakdown */}
            <div className="results-grid">
              
              {/* Question Attempt Status Donut */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Target size={18} color="var(--primary-600)" /> Question Breakdown
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {/* SVG Donut Chart */}
                  <div style={{ position: 'relative', width: 140, height: 140 }}>
                    <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                      {/* Background circle */}
                      <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--bg-surface-subtle)" strokeWidth="16" />
                      
                      {/* Correct segment */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="var(--accent-emerald)"
                        strokeWidth="16"
                        strokeDasharray={`${correctStroke} ${circumference}`}
                        strokeDashoffset="0"
                      />

                      {/* Wrong segment */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="var(--accent-crimson)"
                        strokeWidth="16"
                        strokeDasharray={`${wrongStroke} ${circumference}`}
                        strokeDashoffset={`-${correctStroke}`}
                      />

                      {/* Skipped segment */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="var(--text-light)"
                        strokeWidth="16"
                        strokeDasharray={`${skippedStroke} ${circumference}`}
                        strokeDashoffset={`-${correctStroke + wrongStroke}`}
                      />
                    </svg>

                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="mono" style={{ fontSize: '1.3rem', fontWeight: 800 }}>{totalQuestions}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Qs</span>
                    </div>
                  </div>

                  {/* Legend Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: 'var(--accent-emerald)' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Correct ({correctCount})</span>
                      <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                        {formatPercent(correctRatio * 100)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: 'var(--accent-crimson)' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Incorrect ({wrongCount})</span>
                      <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                        {formatPercent(wrongRatio * 100)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: 'var(--text-light)' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Unattempted ({unattemptedCount})</span>
                      <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                        {formatPercent(skippedRatio * 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Accuracy Bars */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={18} color="var(--accent-amber)" /> Subject Accuracy Radar
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {subjectBreakdown.map((sub, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                        <span>{sub.subject}</span>
                        <span className="mono" style={{ color: sub.accuracy >= 75 ? 'var(--accent-emerald)' : 'var(--accent-crimson)' }}>
                          {sub.accuracy}% ({sub.correct}/{sub.attempted || sub.totalQuestions})
                        </span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-surface-subtle)', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${sub.accuracy}%`, 
                            borderRadius: 4, 
                            background: sub.accuracy >= 75 ? 'var(--accent-emerald)' : sub.accuracy >= 50 ? 'var(--accent-amber)' : 'var(--accent-crimson)',
                            transition: 'width 0.8s ease'
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Detailed Subject Table */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                Subject-Wise Detailed Performance Table
              </h3>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Subject / Section</th>
                      <th>Total Qs</th>
                      <th>Attempted</th>
                      <th>Correct</th>
                      <th>Wrong</th>
                      <th>Score</th>
                      <th>Accuracy</th>
                      <th>Time Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectBreakdown.map((s, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{s.subject}</td>
                        <td className="mono">{s.totalQuestions}</td>
                        <td className="mono">{s.attempted}</td>
                        <td className="mono" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{s.correct}</td>
                        <td className="mono" style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>{s.wrong}</td>
                        <td className="mono" style={{ fontWeight: 800, color: 'var(--primary-600)' }}>{formatScore(s.score)}</td>
                        <td className="mono" style={{ fontWeight: 700 }}>{formatPercent(s.accuracy)}</td>
                        <td className="mono" style={{ color: 'var(--text-muted)' }}>{formatSecondsToTime(s.timeSpentSeconds)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => onNavigate('leaderboard')}
              >
                <TrendingUp size={16} /> View All-India Leaderboard
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    if (activeTest) startTestInstructions(activeTest.id);
                  }}
                >
                  <RotateCcw size={16} /> Re-Attempt Test
                </button>

                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('review')}
                >
                  <BookOpen size={16} /> Review Answers & Explanations
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Tab 2: Detailed Solutions Review */
          <div>
            <DetailedAnswerReview evaluations={questionEvaluations} />
          </div>
        )}

      </div>
    </div>
  );
};
