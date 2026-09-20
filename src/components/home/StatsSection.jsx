import React from 'react';
import { Award, Users, CheckCircle2, ShieldCheck, Zap, BookOpen } from 'lucide-react';

export const StatsSection = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      color: '#2563eb',
      title: 'TCS iON CBT Exam Engine',
      desc: 'Experience identical exam software layout, color-coded question palette, section jump, and live countdown timer.'
    },
    {
      icon: Zap,
      color: '#f59e0b',
      title: 'Negative Marking & Auto Scoring',
      desc: 'Instant post-submission evaluation adhering to the exact +2.0 / -0.50 formula with zero delay.'
    },
    {
      icon: Award,
      color: '#10b981',
      title: 'AIR Rank & Percentile Matrix',
      desc: 'See where you stand among thousands of competitive aspirants across all Indian states.'
    },
    {
      icon: BookOpen,
      color: '#8b5cf6',
      title: 'Detailed Hindi & English Solutions',
      desc: 'Step-by-step conceptual walkthroughs with exam shortcuts, formulas, and elimination tricks.'
    }
  ];

  return (
    <section style={{ padding: '4rem 0', background: 'var(--bg-surface)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>WHY CHOOSE SSC EXAM PREP</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Built Strictly on the Latest SSC CBT Standard
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Engineered to remove exam anxiety and maximize score efficiency with authentic testing simulations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div 
                  style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: `${item.color}15`, 
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
