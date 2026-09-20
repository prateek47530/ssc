import React from 'react';
import { Award, ShieldCheck, Zap, BookOpen, Heart, HelpCircle, FileText } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', padding: '3.5rem 0 2rem' }}>
      <div className="app-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div className="brand-logo-icon" style={{ width: 32, height: 32 }}>
                <Award size={18} />
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem' }}>
                SSC <span className="brand-text-highlight">Exam Prep</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Empowering millions of Staff Selection Commission aspirants with authentic CBT exam simulation, latest pattern question bank, and in-depth performance analytics.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">TCS iON CBT</span>
              <span className="badge badge-success">Negative Marking</span>
              <span className="badge badge-purple">Bilingual (En/Hi)</span>
            </div>
          </div>

          {/* Col 2: Major SSC Exams */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.1rem', color: 'var(--text-main)' }}>Target Exams</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><a href="#cgl" onClick={(e) => { e.preventDefault(); onNavigate('exams', 'ssc-cgl'); }} style={{ transition: 'color 0.15s' }}>SSC CGL (Graduate Level)</a></li>
              <li><a href="#chsl" onClick={(e) => { e.preventDefault(); onNavigate('exams', 'ssc-chsl'); }}>SSC CHSL (10+2 Level)</a></li>
              <li><a href="#mts" onClick={(e) => { e.preventDefault(); onNavigate('exams', 'ssc-mts'); }}>SSC MTS & Havaldar</a></li>
              <li><a href="#gd" onClick={(e) => { e.preventDefault(); onNavigate('exams', 'ssc-gd'); }}>SSC GD Constable</a></li>
              <li><a href="#cpo" onClick={(e) => { e.preventDefault(); onNavigate('exams', 'ssc-cpo'); }}>SSC CPO Sub-Inspector</a></li>
              <li><a href="#je" onClick={(e) => { e.preventDefault(); onNavigate('exams', 'ssc-je'); }}>SSC JE (Junior Engineer)</a></li>
            </ul>
          </div>

          {/* Col 3: Subjects & Practice */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.1rem', color: 'var(--text-main)' }}>Subjects & Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><a href="#pyqs" onClick={(e) => { e.preventDefault(); onNavigate('pyqs'); }}>Previous Year Questions (PYQs)</a></li>
              <li><a href="#daily" onClick={(e) => { e.preventDefault(); onNavigate('daily-practice'); }}>Daily Quiz & Question of the Day</a></li>
              <li><a href="#quant" onClick={(e) => { e.preventDefault(); onNavigate('mock-tests'); }}>Quantitative Aptitude Tests</a></li>
              <li><a href="#reasoning" onClick={(e) => { e.preventDefault(); onNavigate('mock-tests'); }}>General Intelligence & Reasoning</a></li>
              <li><a href="#gk" onClick={(e) => { e.preventDefault(); onNavigate('mock-tests'); }}>General Awareness & Static GK</a></li>
              <li><a href="#english" onClick={(e) => { e.preventDefault(); onNavigate('mock-tests'); }}>English Language & Cloze Test</a></li>
            </ul>
          </div>

          {/* Col 4: Platform Features */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.1rem', color: 'var(--text-main)' }}>Key Features</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="var(--accent-emerald)" /> Authentic Question Palette
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={16} color="var(--accent-amber)" /> Instant Result Evaluation
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} color="var(--primary-600)" /> Step-by-Step Solutions
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} color="var(--accent-purple)" /> Percentile & Speed Matrix
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div>
            © {new Date().getFullYear()} SSC Exam Prep Portal. Designed for Government Exam Aspirants across India 🇮🇳.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Version 2.4 (Latest SSC Syllabus)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
