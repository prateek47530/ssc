import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { useExam } from '../../context/ExamContext';
import { SSC_EXAMS } from '../../data/examsData';
import { Search, Award, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { questions, mockTests, startTestInstructions } = useExam();

  const results = useMemo(() => {
    if (!query.trim()) return { exams: [], tests: [], questions: [] };
    const q = query.toLowerCase().trim();

    const matchedExams = SSC_EXAMS.filter(
      e => e.name.toLowerCase().includes(q) || 
           e.fullName.toLowerCase().includes(q) ||
           e.importantTopics.some(t => t.toLowerCase().includes(q))
    ).slice(0, 3);

    const matchedTests = mockTests.filter(
      t => t.title.toLowerCase().includes(q) || 
           t.examCategory.toLowerCase().includes(q) ||
           t.description?.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedQuestions = questions.filter(
      item => item.question.toLowerCase().includes(q) ||
              item.subject.toLowerCase().includes(q) ||
              item.topic.toLowerCase().includes(q)
    ).slice(0, 5);

    return { exams: matchedExams, tests: matchedTests, questions: matchedQuestions };
  }, [query, mockTests, questions]);

  const hasResults = results.exams.length > 0 || results.tests.length > 0 || results.questions.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Search & Quick Finder" maxWidth={640}>
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <input 
          type="text"
          className="form-input"
          placeholder="Search exams, tests, syllabus, formulas (e.g. CGL, Trigonometry, Ratio)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{ paddingLeft: '2.5rem', fontSize: '1rem' }}
        />
        <Search 
          size={18} 
          style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
        />
      </div>

      {!query.trim() ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>Popular Searches:</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['SSC CGL Tier 1', 'Profit & Loss', 'Indian Polity', 'Syllogism', 'Quantitative Aptitude', 'Cloze Test'].map(tag => (
              <button 
                key={tag}
                className="badge badge-primary"
                style={{ cursor: 'pointer', padding: '0.4rem 0.8rem' }}
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : !hasResults ? (
        <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No direct matches found for "{query}". Try searching by subject name, exam code, or topic keyword.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '60vh', overflowY: 'auto' }}>
          
          {/* Matched Exams */}
          {results.exams.length > 0 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Examinations
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {results.exams.map(exam => (
                  <div 
                    key={exam.id}
                    className="glass-panel"
                    style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => {
                      onNavigate('exams', exam.id);
                      onClose();
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="brand-logo-icon" style={{ width: 32, height: 32, backgroundColor: exam.accentColor }}>
                        <Award size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{exam.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{exam.fullName}</div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--primary-600)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Mock Tests */}
          {results.tests.length > 0 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Mock Tests
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {results.tests.map(test => (
                  <div 
                    key={test.id}
                    className="glass-panel"
                    style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => {
                      startTestInstructions(test.id);
                      onClose();
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{test.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {test.examCategory} • {test.durationMinutes} Mins • {test.totalQuestions} Questions
                      </div>
                    </div>
                    <button className="btn btn-sm btn-primary">Start</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Questions */}
          {results.questions.length > 0 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Practice Questions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {results.questions.map(q => (
                  <div 
                    key={q.id}
                    className="glass-panel"
                    style={{ padding: '0.75rem 1rem', cursor: 'pointer' }}
                    onClick={() => {
                      onNavigate('pyqs');
                      onClose();
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span className="badge badge-primary">{q.subject}</span>
                      <span className="badge badge-warning">{q.topic}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {q.question}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </Modal>
  );
};
