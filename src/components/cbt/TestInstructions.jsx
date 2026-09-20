import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Award, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Languages, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export const TestInstructions = () => {
  const { activeTest, testQuestions, beginTest, exitTest, selectedLanguage, setSelectedLanguage } = useExam();
  const { user } = useAuth();
  const [agreed, setAgreed] = useState(false);

  if (!activeTest) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', padding: '2rem 1rem' }}>
      <div className="app-container" style={{ maxWidth: 900 }}>
        
        {/* Header Bar */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '1.25rem 1.75rem', 
            marginBottom: '1.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#1e293b', 
            color: '#ffffff' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-logo-icon">
              <Award size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 800 }}>{activeTest.title}</h2>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Staff Selection Commission • Computer Based Examination (CBT) Instructions
              </div>
            </div>
          </div>

          <button className="btn btn-sm btn-secondary" onClick={exitTest}>
            Exit Test
          </button>
        </div>

        {/* Instructions Body */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>General Examination Guidelines</h3>
            
            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Languages size={18} color="var(--primary-600)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Default Language:</span>
              <select 
                className="form-select"
                style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          {/* Test Structure Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Questions</div>
              <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{testQuestions.length} MCQs</div>
            </div>
            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Duration</div>
              <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeTest.durationMinutes} Minutes</div>
            </div>
            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Positive Mark</div>
              <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>+{activeTest.positiveMarksPerQuestion || 2.0} Marks</div>
            </div>
            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Negative Penalty</div>
              <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-crimson)' }}>-{activeTest.negativeMarksPerQuestion || 0.50} Marks</div>
            </div>
          </div>

          {/* Question Palette Symbols Reference */}
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
            Question Palette Status Colors (TCS iON Standard):
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>
              <div className="legend-badge bg-cbt-answered">1</div>
              <span>Answered (Saved)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>
              <div className="legend-badge bg-cbt-not-answered">2</div>
              <span>Not Answered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>
              <div className="legend-badge bg-cbt-marked-review">3</div>
              <span>Marked for Review</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>
              <div className="legend-badge bg-cbt-ans-marked">4</div>
              <span>Answered & Marked</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>
              <div className="legend-badge bg-cbt-not-visited">5</div>
              <span>Not Visited</span>
            </div>
          </div>

          {/* Rules List */}
          <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div>1. The countdown clock in the top-right corner will show the remaining time left for you to complete the examination. When the timer reaches zero, the examination will automatically end and submit.</div>
            <div>2. Click on the question number in the Question Palette at the right of your screen to jump directly to that question.</div>
            <div>3. Click on <strong>Save & Next</strong> to save your answer for the current question and proceed to the next question.</div>
            <div>4. Click on <strong>Mark for Review & Next</strong> to save your answer (if selected), mark it for review, and proceed to the next question.</div>
            <div>5. To change your chosen answer, click on another option radio button or click on <strong>Clear Response</strong>.</div>
          </div>

        </div>

        {/* Declaration & Ready Button */}
        <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: 'var(--bg-surface)' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.5rem', userSelect: 'none' }}>
            <input 
              type="checkbox" 
              style={{ width: 18, height: 18, marginTop: 3, accentColor: 'var(--primary-600)', cursor: 'pointer' }}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              I have read and understood all the instructions above. All computer hardware allotted to me is in proper working condition. I agree not to use any unfair means during the exam.
            </span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={exitTest}>
              Cancel
            </button>
            <button 
              className="btn btn-lg btn-primary"
              disabled={!agreed}
              onClick={beginTest}
              style={{ opacity: agreed ? 1 : 0.5, cursor: agreed ? 'pointer' : 'not-allowed' }}
            >
              I am ready to begin <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
