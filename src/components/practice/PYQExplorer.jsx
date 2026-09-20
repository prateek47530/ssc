import React, { useState, useMemo } from 'react';
import { useExam } from '../../context/ExamContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Filter, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Layers, 
  Eye, 
  EyeOff,
  RotateCcw
} from 'lucide-react';

export const PYQExplorer = ({ onStartCustomTest }) => {
  const { questions } = useExam();
  const { bookmarkedQIds, toggleBookmark } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  // Interactive state: user's answered options for instant practice
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  // Dynamic filter options
  const exams = ['ALL', 'SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO'];
  const years = ['ALL', '2024', '2023', '2022', '2021'];
  const subjects = ['ALL', 'Quantitative Aptitude', 'General Intelligence & Reasoning', 'General Awareness', 'English Comprehension', 'Computer Knowledge'];
  const difficulties = ['ALL', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (selectedExam !== 'ALL' && q.examTag !== selectedExam) return false;
      if (selectedYear !== 'ALL' && q.year !== selectedYear) return false;
      if (selectedSubject !== 'ALL' && q.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) return false;
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesTopic = q.topic?.toLowerCase().includes(query);
        if (!matchesQ && !matchesTopic) return false;
      }

      return true;
    });
  }, [questions, selectedExam, selectedYear, selectedSubject, selectedDifficulty, searchQuery]);

  const handleOptionSelect = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    // Auto reveal explanation once answered
    setRevealedSolutions(prev => ({ ...prev, [qId]: true }));
  };

  const toggleSolution = (qId) => {
    setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const resetPractice = () => {
    setUserAnswers({});
    setRevealedSolutions({});
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container">
        
        {/* Header */}
        <div className="section-header">
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>PREVIOUS YEAR QUESTIONS</span>
            <h1 className="section-title">SSC PYQ Question Bank (2020 – 2024)</h1>
            <p className="section-subtitle">
              Authentic shift-wise questions with detailed explanations, shortcut tricks, and topic tags.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-sm btn-secondary" onClick={resetPractice} title="Reset all answered questions">
              <RotateCcw size={15} /> Reset Answers
            </button>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search in questions or topics (e.g. Ratio, Article 32, Syllogism)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>

          {/* Dropdown Filters Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>SSC Exam</label>
              <select className="form-select" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                {exams.map(e => <option key={e} value={e}>{e === 'ALL' ? 'All SSC Exams' : e}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Exam Year</label>
              <select className="form-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map(y => <option key={y} value={y}>{y === 'ALL' ? 'All Years (2020-2024)' : `Year ${y}`}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Subject</label>
              <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                {subjects.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Subjects' : s}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Difficulty</label>
              <select className="form-select" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                {difficulties.map(d => <option key={d} value={d}>{d === 'ALL' ? 'All Levels' : d}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* Results Count Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <div>
            Showing <strong className="mono" style={{ color: 'var(--text-main)' }}>{filteredQuestions.length}</strong> questions matching criteria
          </div>
        </div>

        {/* Question Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarkedQIds.includes(q.id);
            const userPick = userAnswers[q.id];
            const isAnswered = userPick !== undefined;
            const isCorrect = isAnswered && userPick === q.correctAnswer;
            const isSolutionOpen = revealedSolutions[q.id];

            return (
              <div key={q.id} className="glass-panel" style={{ padding: '1.5rem', transition: 'border-color 0.15s' }}>
                
                {/* Meta Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="mono" style={{ fontWeight: 800, fontSize: '1rem' }}>Q{idx + 1}.</span>
                    <span className="badge badge-primary">{q.subject}</span>
                    <span className="badge badge-purple">{q.topic}</span>
                    <span className="badge badge-warning">{q.examTag} {q.year}</span>
                    <span className="badge" style={{ background: 'var(--bg-surface-subtle)' }}>{q.difficulty}</span>
                  </div>

                  <button
                    className="btn-icon"
                    onClick={() => toggleBookmark(q.id)}
                    style={{ color: isBookmarked ? 'var(--accent-amber)' : 'var(--text-muted)' }}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                  >
                    {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                </div>

                {/* Question Text */}
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  {q.question}
                </div>

                {/* Options List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {q.options.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = userPick === optIdx;
                    const isCorrectAnswer = q.correctAnswer === optIdx;

                    let border = '1.5px solid var(--border-strong)';
                    let bg = 'var(--bg-surface)';
                    let optClass = 'cbt-option-item';

                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        border = '2px solid var(--accent-emerald)';
                        bg = 'rgba(16, 185, 129, 0.12)';
                      } else if (isSelected && !isCorrectAnswer) {
                        border = '2px solid var(--accent-crimson)';
                        bg = 'rgba(239, 68, 68, 0.12)';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        className={optClass}
                        style={{ border, background: bg }}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                      >
                        <div 
                          className="cbt-opt-badge"
                          style={{
                            backgroundColor: isAnswered && isCorrectAnswer ? 'var(--accent-emerald)' : 
                                            isAnswered && isSelected && !isCorrectAnswer ? 'var(--accent-crimson)' : undefined,
                            borderColor: isAnswered && isCorrectAnswer ? 'var(--accent-emerald)' : 
                                         isAnswered && isSelected && !isCorrectAnswer ? 'var(--accent-crimson)' : undefined,
                            color: (isAnswered && (isCorrectAnswer || isSelected)) ? '#fff' : undefined
                          }}
                        >
                          {letter}
                        </div>
                        <span className="cbt-opt-text" style={{ fontWeight: 600 }}>{opt}</span>
                        {isAnswered && isCorrectAnswer && <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ marginLeft: 'auto' }} />}
                        {isAnswered && isSelected && !isCorrectAnswer && <XCircle size={16} color="var(--accent-crimson)" style={{ marginLeft: 'auto' }} />}
                      </div>
                    );
                  })}
                </div>

                {/* Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    {isAnswered ? (
                      isCorrect ? (
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓ Correct! Well done (+2 Marks)</span>
                      ) : (
                        <span style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>✗ Incorrect. Correct option is {String.fromCharCode(65 + q.correctAnswer)}</span>
                      )
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Click an option to check answer instantly</span>
                    )}
                  </div>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => toggleSolution(q.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {isSolutionOpen ? <EyeOff size={15} /> : <Eye size={15} />}
                    <span>{isSolutionOpen ? 'Hide Solution' : 'View Explanation'}</span>
                  </button>
                </div>

                {/* Solution Reveal */}
                {isSolutionOpen && q.explanation && (
                  <div className="explanation-box" style={{ marginTop: '1rem', animation: 'fadeIn 0.2s ease' }}>
                    <div className="explanation-title">
                      <Sparkles size={16} /> Step-by-Step Explanation:
                    </div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                      {q.explanation}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
