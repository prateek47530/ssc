import React, { useState } from 'react';
import { SSC_EXAMS } from '../../data/examsData';
import { useExam } from '../../context/ExamContext';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  TrendingUp, 
  Layers, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

export const ExamDetailPage = ({ initialExamId = 'ssc-cgl', onNavigate }) => {
  const [selectedExamId, setSelectedExamId] = useState(initialExamId);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'syllabus' | 'mocks' | 'cutoffs'
  const { mockTests, startTestInstructions } = useExam();

  const currentExam = SSC_EXAMS.find(e => e.id === selectedExamId) || SSC_EXAMS[0];

  const examMockTests = mockTests.filter(
    t => t.examId === currentExam.id || t.examCategory === currentExam.name
  );

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container">
        
        {/* Exam Category Switcher Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
          {SSC_EXAMS.map(exam => (
            <button
              key={exam.id}
              className={`btn btn-sm ${selectedExamId === exam.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedExamId(exam.id)}
              style={{ whiteSpace: 'nowrap' }}
            >
              {exam.name}
            </button>
          ))}
        </div>

        {/* Exam Hero Banner */}
        <div 
          className="glass-panel-elevated"
          style={{ 
            padding: '2.5rem', 
            background: `linear-gradient(135deg, ${currentExam.accentColor}12 0%, var(--bg-surface) 100%)`,
            borderLeft: `6px solid ${currentExam.accentColor}`,
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-primary">{currentExam.badge}</span>
                <span className="badge badge-warning">Tier-1 CBT + Tier-2</span>
              </div>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                {currentExam.name} — {currentExam.fullName}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {currentExam.description}
              </p>

              {/* Highlights Meta Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Eligibility</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{currentExam.eligibility}</div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Salary Scale</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{currentExam.salaryRange}</div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upcoming Date</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-emerald)' }}>{currentExam.upcomingExamDate}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div style={{ minWidth: 260, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                className="btn btn-lg btn-primary"
                onClick={() => {
                  if (examMockTests.length > 0) {
                    startTestInstructions(examMockTests[0].id);
                  } else {
                    startTestInstructions(mockTests[0].id);
                  }
                }}
              >
                <Play size={18} fill="currentColor" /> Take {currentExam.name} Mock Test
              </button>

              <button 
                className="btn btn-secondary"
                onClick={() => onNavigate('pyqs')}
              >
                <BookOpen size={16} /> Practice {currentExam.name} PYQs
              </button>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-strong)', marginBottom: '2rem' }}>
          {[
            { id: 'overview', label: 'Exam Pattern & Subjects' },
            { id: 'syllabus', label: 'Important Topics & Syllabus' },
            { id: 'mocks', label: `Available Mock Tests (${examMockTests.length})` },
            { id: 'cutoffs', label: 'Cutoff Trends' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`cbt-tab ${activeTab === tab.id ? 'active' : ''}`}
              style={{ fontSize: '0.95rem', padding: '0.75rem 1.25rem' }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Pattern & Subjects */}
        {activeTab === 'overview' && (
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
              Tier-1 CBT Exam Pattern & Subject Weightage
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {currentExam.subjects.map((sub, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderTop: `4px solid ${sub.color || 'var(--primary-600)'}` }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Section {idx + 1}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{sub.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.8rem', background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem' }}>
                    <div>Questions: <strong className="mono">{sub.questions}</strong></div>
                    <div>Marks: <strong className="mono">{sub.marks}</strong></div>
                  </div>
                </div>
              ))}
            </div>

            {currentExam.tier2Subjects && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
                  Tier-2 CBT Scheme (Mains Examination)
                </h3>
                <div className="table-responsive glass-panel">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Subject / Module</th>
                        <th>No. of Questions</th>
                        <th>Total Marks</th>
                        <th>Duration / Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentExam.tier2Subjects.map((t2, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{t2.name}</td>
                          <td className="mono">{t2.questions} MCQs</td>
                          <td className="mono">{t2.marks} Marks</td>
                          <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>3 Marks / Q (+3, -1)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Syllabus & Topics */}
        {activeTab === 'syllabus' && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>High-Yield Syllabus Topics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {currentExam.importantTopics.map((topic, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '1rem', 
                    background: 'var(--bg-surface-subtle)', 
                    borderRadius: 'var(--radius-md)' 
                  }}
                >
                  <CheckCircle2 size={20} color="var(--accent-emerald)" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Mocks */}
        {activeTab === 'mocks' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {(examMockTests.length > 0 ? examMockTests : mockTests).map(test => (
              <div key={test.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge badge-primary">{test.examCategory}</span>
                    <span className="badge badge-success">{test.tier || 'Full Mock'}</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{test.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{test.description}</p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => startTestInstructions(test.id)}
                >
                  <Play size={16} fill="currentColor" /> Attempt Test
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Cutoff Trends */}
        {activeTab === 'cutoffs' && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Previous Year Tier-1 Cutoff Marks (Out of 200)</h3>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>UR / General</th>
                    <th>OBC</th>
                    <th>EWS</th>
                    <th>SC</th>
                    <th>ST</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExam.cutoffTrends.map((c, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700 }} className="mono">{c.year}</td>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--primary-600)' }}>{c.general}</td>
                      <td className="mono">{c.obc}</td>
                      <td className="mono">{c.ews}</td>
                      <td className="mono">{c.sc}</td>
                      <td className="mono">{c.st}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
