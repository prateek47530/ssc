import React, { useState } from 'react';
import { INITIAL_LEADERBOARD } from '../../data/initialLeaderboard';
import { useAuth } from '../../context/AuthContext';
import { Award, Trophy, Medal, Flame, Shield, Eye, EyeOff, CheckCircle2, Clock } from 'lucide-react';
import { formatScore, formatPercent, formatSecondsToTime } from '../../utils/formatters';

export const LeaderboardView = () => {
  const { user, updateProfile, testAttempts } = useAuth();
  const [examFilter, setExamFilter] = useState('ALL');
  const [periodFilter, setPeriodFilter] = useState('ALL_TIME'); // 'ALL_TIME' | 'MONTH' | 'WEEK'

  const userBestAttempt = testAttempts.length > 0 
    ? [...testAttempts].sort((a, b) => b.score - a.score)[0] 
    : null;

  const userScore = userBestAttempt ? userBestAttempt.score : 36.0;
  const userAccuracy = userBestAttempt ? userBestAttempt.accuracy : 95.2;
  const userTime = userBestAttempt ? userBestAttempt.timeTakenSeconds : 2400;

  // Insert current user into leaderboard list
  const userEntry = {
    rank: 3,
    name: user?.isPublicLeaderboard ? (user?.name || 'You (Aspirant)') : 'Anonymous Aspirant (You)',
    avatarBg: user?.avatarBg || '#2563eb',
    examTarget: user?.targetExam || 'SSC CGL 2024',
    score: userScore,
    maxScore: 40,
    accuracy: userAccuracy,
    timeTakenSeconds: userTime,
    state: 'Delhi (NCR)',
    badge: 'Your Rank',
    isCurrentUser: true
  };

  const fullList = [
    INITIAL_LEADERBOARD[0],
    INITIAL_LEADERBOARD[1],
    userEntry,
    ...INITIAL_LEADERBOARD.slice(2)
  ].map((item, index) => ({
    ...item,
    displayRank: index + 1
  }));

  const filteredList = fullList.filter(item => {
    if (examFilter !== 'ALL' && !item.examTarget.includes(examFilter)) return false;
    return true;
  });

  const togglePrivacy = () => {
    updateProfile({ isPublicLeaderboard: !user?.isPublicLeaderboard });
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container">
        
        {/* Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Trophy size={14} /> LIVE ALL-INDIA RANKINGS
              </span>
              <span className="badge badge-primary">Top 1% Percentile</span>
            </div>
            <h1 className="section-title">All-India SSC Mock Test Leaderboard</h1>
            <p className="section-subtitle">
              Compete with lakhs of serious SSC aspirants from every state across India.
            </p>
          </div>

          {/* Privacy Toggle Button */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={togglePrivacy}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {user?.isPublicLeaderboard ? <Eye size={15} color="var(--accent-emerald)" /> : <EyeOff size={15} />}
            <span>Public Profile: {user?.isPublicLeaderboard ? 'Visible' : 'Hidden / Anonymous'}</span>
          </button>
        </div>

        {/* Top 3 Podium Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {filteredList.slice(0, 3).map((podiumUser) => {
            const rankNumber = podiumUser.displayRank;
            let rankColor = '#f59e0b';
            let rankTitle = 'AIR 1';
            if (rankNumber === 2) { rankColor = '#94a3b8'; rankTitle = 'AIR 2'; }
            if (rankNumber === 3) { rankColor = '#d97706'; rankTitle = 'AIR 3'; }

            return (
              <div 
                key={rankNumber} 
                className="glass-panel"
                style={{ 
                  padding: '2rem 1.5rem', 
                  textAlign: 'center', 
                  position: 'relative',
                  borderTop: `4px solid ${rankColor}`,
                  boxShadow: podiumUser.isCurrentUser ? '0 0 20px rgba(37, 99, 235, 0.25)' : undefined
                }}
              >
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: -16, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    background: rankColor,
                    color: '#ffffff',
                    fontWeight: 800,
                    padding: '0.2rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem'
                  }}
                >
                  {rankTitle}
                </div>

                <div 
                  style={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: '50%', 
                    background: podiumUser.avatarBg, 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: 800, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0.75rem auto 1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  {podiumUser.name.charAt(0)}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                  {podiumUser.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {podiumUser.examTarget} • {podiumUser.state}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'var(--bg-surface-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Score</div>
                    <div className="mono" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-600)' }}>
                      {formatScore(podiumUser.score)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Accuracy</div>
                    <div className="mono" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--accent-emerald)' }}>
                      {formatPercent(podiumUser.accuracy)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
            {['ALL', 'CGL', 'CHSL', 'MTS', 'GD', 'CPO'].map(f => (
              <button
                key={f}
                className={`btn btn-sm ${examFilter === f ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setExamFilter(f)}
              >
                {f === 'ALL' ? 'All Exams' : `SSC ${f}`}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Leaderboard updates live after each test submission.
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: 80 }}>Rank</th>
                  <th>Candidate</th>
                  <th>Target Exam</th>
                  <th>State</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((row) => (
                  <tr 
                    key={row.displayRank}
                    style={{ 
                      backgroundColor: row.isCurrentUser ? 'rgba(37, 99, 235, 0.08)' : undefined,
                      fontWeight: row.isCurrentUser ? 700 : 500
                    }}
                  >
                    <td>
                      <span 
                        className="mono" 
                        style={{ 
                          fontWeight: 800, 
                          color: row.displayRank <= 3 ? '#ea580c' : 'var(--text-main)',
                          fontSize: '1rem'
                        }}
                      >
                        #{row.displayRank}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: row.avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                          {row.name.charAt(0)}
                        </div>
                        <span>{row.name}</span>
                        {row.isCurrentUser && (
                          <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>YOU</span>
                        )}
                      </div>
                    </td>
                    <td>{row.examTarget}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{row.state}</td>
                    <td className="mono" style={{ fontWeight: 800, color: 'var(--primary-600)' }}>
                      {formatScore(row.score)}
                    </td>
                    <td className="mono" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                      {formatPercent(row.accuracy)}
                    </td>
                    <td className="mono" style={{ color: 'var(--text-muted)' }}>
                      {formatSecondsToTime(row.timeTakenSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
