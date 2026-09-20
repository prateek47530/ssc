import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import { 
  User, 
  Award, 
  Target, 
  TrendingUp, 
  Flame, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Calendar,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatScore, formatPercent, formatDate, formatSecondsToTime } from '../../utils/formatters';

export const StudentDashboard = ({ onNavigate }) => {
  const { user, testAttempts, dailyStreak, bookmarkedQIds } = useAuth();
  const { startTestInstructions } = useExam();

  // Aggregate stats
  const totalTests = testAttempts.length;
  const avgScore = totalTests > 0 
    ? testAttempts.reduce((acc, t) => acc + t.score, 0) / totalTests 
    : 32.5;
  const highestScore = totalTests > 0 
    ? Math.max(...testAttempts.map(t => t.score)) 
    : 38.0;
  const avgAccuracy = totalTests > 0 
    ? testAttempts.reduce((acc, t) => acc + t.accuracy, 0) / totalTests 
    : 91.4;

  // Mock progress points if attempts are few
  const progressPoints = testAttempts.length >= 2 
    ? testAttempts.slice(0, 6).reverse() 
    : [
        { score: 24, date: '10 Sep' },
        { score: 28, date: '12 Sep' },
        { score: 31.5, date: '14 Sep' },
        { score: 29.0, date: '15 Sep' },
        { score: 34.0, date: '17 Sep' },
        { score: 36.5, date: '18 Sep' }
      ];

  const subjectsPerformance = [
    { name: 'General Intelligence & Reasoning', strength: 'Strong', accuracy: 94.2, color: 'var(--accent-emerald)', recommendation: 'Maintain speed with 25-question sectional timed tests.' },
    { name: 'English Comprehension', strength: 'Strong', accuracy: 88.6, color: 'var(--accent-emerald)', recommendation: 'Revise idioms and daily cloze tests.' },
    { name: 'Quantitative Aptitude', strength: 'Moderate', accuracy: 76.5, color: 'var(--accent-amber)', recommendation: 'Practice Advanced Maths: Geometry and Trigonometry formulas.' },
    { name: 'General Awareness', strength: 'Needs Focus', accuracy: 58.2, color: 'var(--accent-crimson)', recommendation: 'Focus on Modern Indian History and Indian Polity Articles.' }
  ];

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container">
        
        {/* Profile Header Card */}
        <div 
          className="glass-panel-elevated"
          style={{ 
            padding: '2rem 2.5rem', 
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
            marginBottom: '2rem',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div 
                style={{ 
                  width: 72, 
                  height: 72, 
                  borderRadius: '50%', 
                  background: user?.avatarBg || '#2563eb', 
                  color: '#fff', 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{user?.name || 'Aspirant Profile'}</h1>
                  <span className="badge badge-primary">{user?.targetExam || 'SSC CGL 2024'}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {user?.email} • Member since August 2024
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => onNavigate('bookmarks')}
              >
                <BookOpen size={15} /> Saved Questions ({bookmarkedQIds.length})
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onNavigate('mock-tests')}
              >
                <Target size={15} /> Take New Mock Test
              </button>
            </div>
          </div>
        </div>

        {/* 4 Overview Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Tests Attempted</span>
              <Target size={18} color="var(--primary-600)" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800 }}>
              {totalTests > 0 ? totalTests : 8}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              +3 this week
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Average Score</span>
              <Award size={18} color="var(--accent-amber)" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-600)' }}>
              {formatScore(avgScore)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 40</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Highest: {formatScore(highestScore)}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Average Accuracy</span>
              <TrendingUp size={18} color="var(--accent-emerald)" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {formatPercent(avgAccuracy)}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Target: &gt; 90%
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Practice Streak</span>
              <Flame size={18} color="#ea580c" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#ea580c' }}>
              {dailyStreak?.streakCount || 7} Days
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Active Daily Practice
            </div>
          </div>

        </div>

        {/* Progress Chart & Weak Areas Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Progress Over Time SVG Line Chart */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--primary-600)" /> Score Progression Over Attempts
            </h3>

            <div style={{ position: 'relative', height: 200, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1rem 0.5rem', borderBottom: '2px solid var(--border-strong)' }}>
              {progressPoints.map((pt, i) => {
                const heightPercent = Math.min(100, Math.max(20, (pt.score / 40) * 100));

                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                      {pt.score}
                    </div>
                    <div 
                      style={{ 
                        width: '32px', 
                        height: `${heightPercent}%`, 
                        background: 'linear-gradient(180deg, var(--primary-500), var(--primary-700))', 
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.5s ease',
                        boxShadow: '0 2px 6px rgba(37,99,235,0.3)'
                      }} 
                    />
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {pt.date || `Test ${i + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject Strengths & Recommendations */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-amber)" /> Topic Strengths & Focus Areas
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {subjectsPerformance.map((sub, i) => (
                <div key={i} style={{ padding: '0.85rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{sub.name}</span>
                    <span className="badge" style={{ backgroundColor: `${sub.color}20`, color: sub.color }}>
                      {sub.strength} ({sub.accuracy}%)
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    💡 {sub.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Test Attempt History Table */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
            Recent Test Attempt Records
          </h3>

          {testAttempts.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No mock tests attempted in this session yet. Take a test to build your history!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Exam</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Percentile</th>
                    <th>Time Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {testAttempts.map((att, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700 }}>{att.testTitle}</td>
                      <td><span className="badge badge-primary">{att.examCategory}</span></td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{formatDate(att.attemptedAt)}</td>
                      <td className="mono" style={{ fontWeight: 800, color: 'var(--primary-600)' }}>{formatScore(att.score)} / {att.maxPossibleScore}</td>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{formatPercent(att.accuracy)}</td>
                      <td className="mono" style={{ fontWeight: 700 }}>{att.percentile}%ile</td>
                      <td className="mono" style={{ color: 'var(--text-muted)' }}>{formatSecondsToTime(att.timeTakenSeconds)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
