import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Play, 
  Flame, 
  Timer, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export const HeroSection = ({ onNavigate }) => {
  const { mockTests, startTestInstructions } = useExam();

  const handleStartFeaturedTest = () => {
    if (mockTests.length > 0) {
      startTestInstructions(mockTests[0].id);
    } else {
      onNavigate('mock-tests');
    }
  };

  return (
    <div className="hero-wrapper">
      <div className="hero-glow-bg" />
      <div className="app-container">
        <div className="hero-grid">
          {/* Left Column: Hero Copy & CTA */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', background: 'var(--primary-50)', color: 'var(--primary-700)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem', border: '1px solid var(--primary-200)' }}>
              <Zap size={15} fill="currentColor" />
              <span>Target SSC 2024-2025 • New Pattern Live Tests</span>
            </div>

            <h1 className="hero-title">
              Prepare Smart.<br />
              <span className="brand-text-highlight">Practice More.</span><br />
              Score Better.
            </h1>

            <p className="hero-subtitle">
              India's most realistic SSC Computer Based Test (CBT) simulator. Experience the authentic TCS iON exam environment, instant AIR percentile ranking, negative marking calculation, and comprehensive bilingual solutions.
            </p>

            <div className="hero-ctas">
              <button 
                className="btn btn-lg btn-primary"
                onClick={handleStartFeaturedTest}
              >
                <Play size={18} fill="currentColor" /> Start Live Mock Test
              </button>

              <button 
                className="btn btn-lg btn-secondary"
                onClick={() => onNavigate('pyqs')}
              >
                Practice PYQs (2020-2024) <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Hero Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <div className="hero-stat-value">50,000+</div>
                <div className="hero-stat-label">MCQs with Solutions</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-value">120+</div>
                <div className="hero-stat-label">Full Length Mocks</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-value" style={{ color: 'var(--accent-emerald)' }}>98.4%</div>
                <div className="hero-stat-label">Exam Pattern Match</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mock Card with Countdown */}
          <div>
            <div className="hero-live-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ef4444', animation: 'ping 1s infinite' }} />
                  LIVE ALL-INDIA MOCK
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  SSC CGL 2024 Tier-1
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem' }}>
                SSC CGL Tier-1 All India Live Mock Test #01
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Exact 60-minute CBT pattern with 4 subjects, real negative marking (+2, -0.50), bilingual question toggle, and peer percentile ranking.
              </p>

              {/* Live Metric Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-surface-subtle)', padding: '0.65rem 0.4rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div>
                  <div className="mono" style={{ fontWeight: 700, fontSize: '0.95rem' }}>60 Mins</div>
                </div>
                <div style={{ background: 'var(--bg-surface-subtle)', padding: '0.65rem 0.4rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Questions</div>
                  <div className="mono" style={{ fontWeight: 700, fontSize: '0.95rem' }}>100 MCQs</div>
                </div>
                <div style={{ background: 'var(--bg-surface-subtle)', padding: '0.65rem 0.4rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max Marks</div>
                  <div className="mono" style={{ fontWeight: 700, fontSize: '0.95rem' }}>200 Pts</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <ShieldCheck size={16} color="var(--accent-emerald)" />
                  <span style={{ fontWeight: 600 }}>TCS iON CBT Interface Ready</span>
                </div>
                <span className="badge badge-success">FREE</span>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
                onClick={handleStartFeaturedTest}
              >
                Start Test Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
