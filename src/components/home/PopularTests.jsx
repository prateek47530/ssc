import React from 'react';
import { useExam } from '../../context/ExamContext';
import { Timer, Users, Star, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export const PopularTests = ({ onNavigate }) => {
  const { mockTests, startTestInstructions } = useExam();

  return (
    <section style={{ padding: '2rem 0 4rem', background: 'var(--bg-surface-subtle)' }}>
      <div className="app-container">
        <div className="section-header">
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>MOCK TEST SERIES</span>
            <h2 className="section-title">Popular & Trending SSC Mock Tests</h2>
            <p className="section-subtitle">
              Authentic full-length and chapter-wise tests with real-time test timing and percentile calculation.
            </p>
          </div>
          <button className="btn btn-outline" onClick={() => onNavigate('mock-tests')}>
            View All Tests <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {mockTests.map((test) => (
            <div key={test.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="badge badge-primary">{test.examCategory}</span>
                  <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Star size={12} fill="currentColor" /> {test.rating || '4.9'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {test.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {test.description}
                </p>

                {/* Test Meta Chips */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem', background: 'var(--bg-surface-subtle)', padding: '0.65rem 0.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Time</div>
                    <div className="mono" style={{ fontWeight: 700, fontSize: '0.88rem' }}>{test.durationMinutes}m</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Questions</div>
                    <div className="mono" style={{ fontWeight: 700, fontSize: '0.88rem' }}>{test.totalQuestions || 20}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Total Marks</div>
                    <div className="mono" style={{ fontWeight: 700, fontSize: '0.88rem' }}>{test.totalMarks || 40}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <Users size={14} />
                  <span>{(test.attemptedCount || 10000).toLocaleString()}+ Aspirants attempted</span>
                </div>
              </div>

              <button 
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => startTestInstructions(test.id)}
              >
                <Play size={16} fill="currentColor" /> Start Mock Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
