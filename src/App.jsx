import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider, useExam } from './context/ExamContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';
import { SearchModal } from './components/common/SearchModal';
import { HeroSection } from './components/home/HeroSection';
import { ExamCards } from './components/home/ExamCards';
import { DailyPracticeWidget } from './components/home/DailyPracticeWidget';
import { PopularTests } from './components/home/PopularTests';
import { StatsSection } from './components/home/StatsSection';
import { ExamDetailPage } from './components/exam/ExamDetailPage';
import { TestInstructions } from './components/cbt/TestInstructions';
import { CBTExamEngine } from './components/cbt/CBTExamEngine';
import { ResultDashboard } from './components/results/ResultDashboard';
import { PYQExplorer } from './components/practice/PYQExplorer';
import { DailyQuiz } from './components/practice/DailyQuiz';
import { BookmarksRevision } from './components/practice/BookmarksRevision';
import { LeaderboardView } from './components/student/LeaderboardView';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainApp = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedExamId, setSelectedExamId] = useState('ssc-cgl');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { testState } = useExam();

  const handleNavigate = (tabId, examId = null) => {
    setCurrentTab(tabId);
    if (examId) setSelectedExamId(examId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in active CBT Exam state, override regular page chrome
  if (testState === 'INSTRUCTIONS') {
    return <TestInstructions />;
  }

  if (testState === 'RUNNING') {
    return <CBTExamEngine />;
  }

  if (testState === 'SUBMITTED') {
    return <ResultDashboard onNavigate={handleNavigate} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <main className="main-content">
        {currentTab === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <ExamCards onSelectExam={(id) => handleNavigate('exams', id)} />
            <DailyPracticeWidget onNavigate={handleNavigate} />
            <PopularTests onNavigate={handleNavigate} />
            <StatsSection />
          </>
        )}

        {currentTab === 'exams' && (
          <ExamDetailPage initialExamId={selectedExamId} onNavigate={handleNavigate} />
        )}

        {currentTab === 'mock-tests' && (
          <PopularTests onNavigate={handleNavigate} />
        )}

        {currentTab === 'pyqs' && (
          <PYQExplorer onStartCustomTest={() => handleNavigate('mock-tests')} />
        )}

        {currentTab === 'daily-practice' && (
          <DailyQuiz onNavigate={handleNavigate} />
        )}

        {currentTab === 'bookmarks' && (
          <BookmarksRevision onNavigate={handleNavigate} />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView />
        )}

        {currentTab === 'dashboard' && (
          <StudentDashboard onNavigate={handleNavigate} />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExamProvider>
          <MainApp />
        </ExamProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
