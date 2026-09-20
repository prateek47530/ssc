import React from 'react';
import { SSC_EXAMS } from '../../data/examsData';
import { Award, BookOpen, Users, Shield, Compass, Wrench, FileText, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Award: Award,
  BookOpen: BookOpen,
  Users: Users,
  Shield: Shield,
  Compass: Compass,
  Wrench: Wrench,
  FileText: FileText,
  Layers: Layers
};

export const ExamCards = ({ onSelectExam }) => {
  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="app-container">
        <div className="section-header">
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>EXAM CATEGORIES</span>
            <h2 className="section-title">Target Major SSC Examinations</h2>
            <p className="section-subtitle">
              Syllabus, tier patterns, previous year papers, and curated mock tests for all exams.
            </p>
          </div>
        </div>

        <div className="exam-cards-grid">
          {SSC_EXAMS.map((exam) => {
            const IconComponent = ICON_MAP[exam.icon] || Award;
            return (
              <div key={exam.id} className="exam-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div 
                      className="exam-card-icon"
                      style={{ 
                        backgroundColor: `${exam.accentColor}18`, 
                        color: exam.accentColor 
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span className="badge badge-primary" style={{ backgroundColor: `${exam.accentColor}15`, color: exam.accentColor, borderColor: `${exam.accentColor}30` }}>
                      {exam.badge}
                    </span>
                  </div>

                  <h3 className="exam-card-name">{exam.name}</h3>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-600)', marginBottom: '0.5rem' }}>
                    {exam.fullName}
                  </div>

                  <p className="exam-card-desc">{exam.description}</p>

                  <div className="exam-card-meta">
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Eligibility</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.78rem' }}>{exam.eligibility}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--accent-emerald)" />
                      <span>{exam.subjects.length} Core Subjects (CBT Tier-1)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--accent-emerald)" />
                      <span>Negative: {exam.negativeMarking}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', justifyContent: 'space-between' }}
                  onClick={() => onSelectExam(exam.id)}
                >
                  <span>Explore Exam & Tests</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
