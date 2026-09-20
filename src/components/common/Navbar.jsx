import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Search, 
  Sun, 
  Moon, 
  User, 
  Shield, 
  TrendingUp, 
  Calendar, 
  Menu, 
  X, 
  LogOut, 
  CheckCircle2, 
  HelpCircle, 
  BookmarkCheck,
  Flame
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ currentTab, onNavigate, onOpenSearch, onOpenAuth }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout, switchRole, dailyStreak } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'exams', label: 'Exams', icon: Award },
    { id: 'mock-tests', label: 'Mock Tests', icon: CheckCircle2 },
    { id: 'pyqs', label: 'PYQ Bank', icon: HelpCircle },
    { id: 'daily-practice', label: 'Daily Practice', icon: Calendar },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
    { id: 'dashboard', label: 'My Progress', icon: User }
  ];

  if (isAdmin) {
    navLinks.push({ id: 'admin', label: 'Admin Portal', icon: Shield });
  }

  const handleLinkClick = (tabId) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="app-container navbar-inner">
        {/* Brand Logo */}
        <div 
          className="nav-brand" 
          onClick={() => handleLinkClick('home')} 
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-logo-icon">
            <Award size={22} />
          </div>
          <div>
            <span style={{ letterSpacing: '-0.03em' }}>SSC <span className="brand-text-highlight">Exam Prep</span></span>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', marginTop: '-4px' }}>
              CBT MOCK TEST PORTAL
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <li key={link.id}>
                <button
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.id)}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Daily Streak Indicator */}
          <div 
            className="btn btn-sm btn-secondary"
            title="Daily Practice Streak"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              color: '#ea580c',
              borderColor: 'rgba(234, 88, 12, 0.3)',
              fontWeight: 700
            }}
            onClick={() => handleLinkClick('daily-practice')}
          >
            <Flame size={16} fill="#ea580c" />
            <span className="mono">{dailyStreak?.streakCount || 7}d</span>
          </div>

          {/* Search Trigger */}
          <button 
            className="btn-icon" 
            onClick={onOpenSearch} 
            title="Search Questions & Exams (Ctrl+K)"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* User Profile / Role Switcher */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                className="btn btn-sm btn-secondary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem'
                }}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div 
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: user.avatarBg || '#2563eb',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {user.name?.charAt(0) || 'U'}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, maxWidth: 100, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user.name?.split(' ')[0]}
                </span>
              </button>

              {profileDropdownOpen && (
                <div 
                  className="glass-panel-elevated"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 250,
                    padding: '0.75rem',
                    zIndex: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ padding: '0.4rem 0.6rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    <span className={`badge ${isAdmin ? 'badge-danger' : 'badge-primary'}`} style={{ marginTop: '0.4rem' }}>
                      {isAdmin ? 'ADMINISTRATOR' : 'SSC ASPIRANT'}
                    </span>
                  </div>

                  <button 
                    className="nav-item" 
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => handleLinkClick('dashboard')}
                  >
                    <User size={15} /> My Profile & Tests
                  </button>

                  <button 
                    className="nav-item" 
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => {
                      switchRole(isAdmin ? 'student' : 'admin');
                      setProfileDropdownOpen(false);
                    }}
                  >
                    <Shield size={15} /> Switch to {isAdmin ? 'Student View' : 'Admin Portal'}
                  </button>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
                    <button 
                      className="nav-item" 
                      style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--accent-crimson)' }}
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <LogOut size={15} /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={onOpenAuth}>
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="btn-icon"
            style={{ display: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-strong)',
            padding: '1rem',
            zIndex: 40
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.id}>
                  <button
                    className={`nav-item ${currentTab === link.id ? 'active' : ''}`}
                    style={{ width: '100%' }}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};
