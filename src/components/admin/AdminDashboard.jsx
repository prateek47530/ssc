import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { useAuth } from '../../context/AuthContext';
import { QuestionEditorModal } from './QuestionEditorModal';
import { TestCreatorModal } from './TestCreatorModal';
import { 
  Shield, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  BookOpen, 
  Award, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Database
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    questions, 
    mockTests, 
    addQuestion, 
    editQuestion, 
    deleteQuestion, 
    createMockTest 
  } = useExam();
  const { testAttempts } = useAuth();

  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'tests'
  const [searchQ, setSearchQ] = useState('');
  const [filterSubject, setFilterSubject] = useState('ALL');

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [alertNotice, setAlertNotice] = useState('');

  const showAlert = (msg) => {
    setAlertNotice(msg);
    setTimeout(() => setAlertNotice(''), 3000);
  };

  const handleOpenAddQuestion = () => {
    setEditingQuestion(null);
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q) => {
    setEditingQuestion(q);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (qData) => {
    if (editingQuestion) {
      editQuestion(qData);
      showAlert('Question updated successfully in database!');
    } else {
      addQuestion(qData);
      showAlert('New question successfully added to SSC Question Bank!');
    }
  };

  const handleDeleteQuestion = (qId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(qId);
      showAlert('Question removed from database.');
    }
  };

  const handleSaveMockTest = (testData) => {
    createMockTest(testData);
    showAlert(`Mock Test "${testData.title}" created successfully!`);
  };

  const filteredQuestions = questions.filter(q => {
    if (filterSubject !== 'ALL' && q.subject !== filterSubject) return false;
    if (searchQ.trim()) {
      const s = searchQ.toLowerCase();
      if (!q.question.toLowerCase().includes(s) && !q.topic?.toLowerCase().includes(s)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="app-container">
        
        {/* Admin Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Shield size={14} /> SSC CONTROLLER PORTAL
              </span>
              <span className="badge badge-primary">Admin Access Active</span>
            </div>
            <h1 className="section-title">SSC Examination & Question Bank Manager</h1>
            <p className="section-subtitle">
              Manage questions, answer keys, step-by-step explanations, mock test series, and candidate attempts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleOpenAddQuestion}>
              <Plus size={16} /> Add New Question
            </button>
            <button className="btn btn-secondary" onClick={() => setIsTestModalOpen(true)}>
              <Layers size={16} /> Create Mock Test
            </button>
          </div>
        </div>

        {/* Alert Notice Toast */}
        {alertNotice && (
          <div style={{ padding: '0.85rem 1.25rem', background: '#dcfce7', color: '#166534', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #86efac' }}>
            <CheckCircle2 size={18} /> {alertNotice}
          </div>
        )}

        {/* Overview Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Questions in Bank</span>
              <Database size={18} color="var(--primary-600)" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800 }}>{questions.length}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>Bilingual with Solutions</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Mock Tests</span>
              <Layers size={18} color="var(--accent-amber)" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800 }}>{mockTests.length}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>TCS iON CBT Pattern</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Attempt Records</span>
              <Users size={18} color="var(--accent-emerald)" />
            </div>
            <div className="mono" style={{ fontSize: '2rem', fontWeight: 800 }}>
              {testAttempts.length > 0 ? testAttempts.length : 14280}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Evaluated Submissions</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-strong)', marginBottom: '1.5rem' }}>
          <button
            className={`cbt-tab ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            Question Bank Manager ({questions.length})
          </button>
          <button
            className={`cbt-tab ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            Mock Test Series Manager ({mockTests.length})
          </button>
        </div>

        {activeTab === 'questions' ? (
          <div>
            {/* Search & Filter Toolbar */}
            <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search question text or topic..."
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Subject:</span>
                <select
                  className="form-select"
                  style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                >
                  <option value="ALL">All Subjects</option>
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="General Intelligence & Reasoning">General Intelligence & Reasoning</option>
                  <option value="General Awareness">General Awareness</option>
                  <option value="English Comprehension">English Comprehension</option>
                  <option value="Computer Knowledge">Computer Knowledge</option>
                </select>
              </div>
            </div>

            {/* Questions Table */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Question Statement</th>
                      <th>Subject</th>
                      <th>Topic</th>
                      <th>Exam</th>
                      <th>Correct Key</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map((q, idx) => (
                      <tr key={q.id}>
                        <td className="mono" style={{ fontWeight: 700 }}>{idx + 1}</td>
                        <td style={{ maxWidth: 360 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {q.question}
                          </div>
                          {q.questionHi && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {q.questionHi}
                            </div>
                          )}
                        </td>
                        <td><span className="badge badge-primary">{q.subject}</span></td>
                        <td><span className="badge badge-purple">{q.topic}</span></td>
                        <td><span className="badge badge-warning">{q.examTag}</span></td>
                        <td className="mono" style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>
                          Opt {String.fromCharCode(65 + q.correctAnswer)}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              className="btn-icon"
                              onClick={() => handleOpenEditQuestion(q)}
                              title="Edit Question"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              className="btn-icon"
                              onClick={() => handleDeleteQuestion(q.id)}
                              style={{ color: 'var(--accent-crimson)' }}
                              title="Delete Question"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Mock Tests List */
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Test Title</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Total Qs</th>
                    <th>Max Marks</th>
                    <th>Negative Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTests.map((t) => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 700 }}>{t.title}</td>
                      <td><span className="badge badge-primary">{t.examCategory}</span></td>
                      <td className="mono">{t.durationMinutes} Mins</td>
                      <td className="mono">{t.totalQuestions || 20}</td>
                      <td className="mono" style={{ fontWeight: 800 }}>{t.totalMarks || 40}</td>
                      <td className="mono" style={{ color: 'var(--accent-crimson)' }}>-{t.negativeMarksPerQuestion || 0.50}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Question Editor Modal */}
        <QuestionEditorModal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          initialQuestion={editingQuestion}
          onSave={handleSaveQuestion}
        />

        {/* Test Creator Modal */}
        <TestCreatorModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          onSave={handleSaveMockTest}
        />

      </div>
    </div>
  );
};
