import React, { useState } from 'react';
import { Modal } from './Modal';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Mail, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, switchRole } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetExam, setTargetExam] = useState('SSC CGL 2024');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email || 'student@ssc.gov.in', password, 'student');
      onClose();
    } else if (mode === 'register') {
      register(name || 'Aspirant', email || 'aspirant@ssc.gov.in', targetExam);
      onClose();
    } else if (mode === 'forgot') {
      setSuccessMsg('Password reset instructions have been sent to your email.');
      setTimeout(() => {
        setMode('login');
        setSuccessMsg('');
      }, 2500);
    }
  };

  const handleQuickDemoLogin = (role) => {
    switchRole(role);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={
        mode === 'login' ? 'Sign In to SSC Exam Prep' : 
        mode === 'register' ? 'Create Aspirant Account' : 
        'Reset Your Password'
      }
    >
      {/* Quick Demo Login Bar */}
      <div 
        style={{ 
          background: 'var(--bg-surface-subtle)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.5rem',
          border: '1px dashed var(--border-strong)'
        }}
      >
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
          ⚡ 1-Click Demo Accounts (Instant Testing)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
          <button 
            type="button"
            className="btn btn-sm btn-outline"
            style={{ fontSize: '0.82rem', justifyContent: 'center' }}
            onClick={() => handleQuickDemoLogin('student')}
          >
            <User size={14} /> Student Demo
          </button>
          <button 
            type="button"
            className="btn btn-sm btn-outline"
            style={{ fontSize: '0.82rem', justifyContent: 'center', borderColor: 'var(--accent-crimson)', color: 'var(--accent-crimson)' }}
            onClick={() => handleQuickDemoLogin('admin')}
          >
            <Shield size={14} /> Admin Portal
          </button>
        </div>
      </div>

      {successMsg && (
        <div style={{ padding: '0.85rem', background: '#dcfce7', color: '#166534', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Vikramaditya Sharma" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="e.g. aspirant@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        {mode !== 'forgot' && (
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              {mode === 'login' && (
                <button 
                  type="button" 
                  onClick={() => setMode('forgot')} 
                  style={{ fontSize: '0.8rem', color: 'var(--primary-600)', fontWeight: 600 }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        )}

        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">Target Examination</label>
            <select 
              className="form-select" 
              value={targetExam} 
              onChange={(e) => setTargetExam(e.target.value)}
            >
              <option value="SSC CGL 2024">SSC CGL (Graduate Level)</option>
              <option value="SSC CHSL 2024">SSC CHSL (10+2 Level)</option>
              <option value="SSC MTS 2024">SSC MTS & Havaldar</option>
              <option value="SSC GD 2025">SSC GD Constable</option>
              <option value="SSC CPO 2024">SSC CPO Sub-Inspector</option>
              <option value="SSC JE 2024">SSC JE (Junior Engineer)</option>
              <option value="SSC Stenographer">SSC Stenographer</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
          {mode === 'login' ? 'Sign In & Continue' : mode === 'register' ? 'Create Free Account' : 'Send Reset Link'}
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Switch Mode Footer */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        {mode === 'login' ? (
          <span>
            Don't have an account yet?{' '}
            <button 
              type="button" 
              onClick={() => setMode('register')} 
              style={{ color: 'var(--primary-600)', fontWeight: 700 }}
            >
              Sign up free
            </button>
          </span>
        ) : (
          <span>
            Already registered?{' '}
            <button 
              type="button" 
              onClick={() => setMode('login')} 
              style={{ color: 'var(--primary-600)', fontWeight: 700 }}
            >
              Sign in
            </button>
          </span>
        )}
      </div>
    </Modal>
  );
};
