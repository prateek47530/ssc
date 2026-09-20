import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { ExamTimer } from './ExamTimer';
import { QuestionViewer } from './QuestionViewer';
import { QuestionPalette } from './QuestionPalette';
import { SubmitSummaryModal } from './SubmitSummaryModal';
import { 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Bookmark, 
  RotateCcw, 
  Send,
  Layers,
  Menu,
  X
} from 'lucide-react';

export const CBTExamEngine = () => {
  const {
    activeTest,
    testQuestions,
    currentQIndex,
    userResponses,
    timeRemainingSeconds,
    currentSectionId,
    selectedLanguage,
    setSelectedLanguage,
    selectOption,
    clearResponse,
    saveAndNext,
    markForReviewAndNext,
    goToPrevious,
    jumpToQuestion,
    switchSection,
    submitTest
  } = useExam();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);

  const currentQuestion = testQuestions[currentQIndex];
  if (!activeTest || !currentQuestion) return null;

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const sections = activeTest.sections && activeTest.sections.length > 0
    ? activeTest.sections
    : [{ id: 'sec-general', name: 'General Section', questionIds: testQuestions.map(q => q.id) }];

  return (
    <div className="cbt-container">
      
      {/* Top Header Bar */}
      <header className="cbt-topbar">
        <div className="cbt-test-title">
          <span style={{ color: '#38bdf8' }}>SSC CBT :</span>
          <span>{activeTest.title}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Exam Timer */}
          <ExamTimer timeRemainingSeconds={timeRemainingSeconds} />

          {/* Fullscreen Toggle */}
          <button 
            className="btn btn-sm btn-secondary" 
            onClick={toggleFullscreen} 
            title="Toggle Fullscreen CBT Mode"
            style={{ padding: '0.4rem 0.6rem' }}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Mobile Palette Toggle */}
          <button 
            className="btn btn-sm btn-secondary"
            onClick={() => setMobilePaletteOpen(!mobilePaletteOpen)}
            style={{ display: 'none' }}
          >
            <Layers size={16} />
          </button>
        </div>
      </header>

      {/* Section Switcher Tabs */}
      <div className="cbt-section-tabs">
        {sections.map(sec => {
          const isActive = currentSectionId === sec.id || 
                           (!currentSectionId && currentQuestion.sectionId === sec.id);
          return (
            <button
              key={sec.id}
              className={`cbt-tab ${isActive ? 'active' : ''}`}
              onClick={() => switchSection(sec.id)}
            >
              <span>{sec.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main CBT Body Layout */}
      <div className="cbt-body-layout">
        
        {/* Left/Center Pane: Question Display */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <QuestionViewer
            question={currentQuestion}
            questionIndex={currentQIndex}
            totalQuestions={testQuestions.length}
            userResponse={userResponses[currentQuestion.id]}
            selectedLanguage={selectedLanguage}
            onToggleLanguage={() => setSelectedLanguage(prev => prev === 'hi' ? 'en' : 'hi')}
            onSelectOption={(optIndex) => selectOption(currentQuestion.id, optIndex)}
            positiveMarks={activeTest.positiveMarksPerQuestion || 2.0}
            negativeMarks={activeTest.negativeMarksPerQuestion || 0.5}
          />

          {/* Action Footer Controls */}
          <div className="cbt-action-footer">
            <div className="cbt-footer-left">
              <button 
                className="btn btn-secondary"
                onClick={markForReviewAndNext}
                title="Mark for Review & Move Next"
              >
                <Bookmark size={16} color="var(--cbt-marked-review)" /> Mark for Review & Next
              </button>

              <button 
                className="btn btn-secondary"
                onClick={() => clearResponse(currentQuestion.id)}
                title="Clear Selected Option"
              >
                <RotateCcw size={16} /> Clear Response
              </button>
            </div>

            <div className="cbt-footer-right">
              <button 
                className="btn btn-secondary"
                onClick={goToPrevious}
                disabled={currentQIndex === 0}
                style={{ opacity: currentQIndex === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button 
                className="btn btn-primary"
                onClick={saveAndNext}
              >
                <Save size={16} /> Save & Next <ChevronRight size={16} />
              </button>

              <button 
                className="btn btn-success"
                onClick={() => setIsSubmitModalOpen(true)}
                style={{ marginLeft: '0.5rem' }}
              >
                <Send size={16} /> Submit Test
              </button>
            </div>
          </div>
        </div>

        {/* Right Pane: Question Palette Sidebar */}
        <QuestionPalette
          questions={testQuestions}
          currentQIndex={currentQIndex}
          userResponses={userResponses}
          onJumpQuestion={jumpToQuestion}
        />

      </div>

      {/* Pre-Submit Summary Modal */}
      <SubmitSummaryModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        testTitle={activeTest.title}
        questions={testQuestions}
        userResponses={userResponses}
        timeRemainingSeconds={timeRemainingSeconds}
        onConfirmSubmit={() => {
          setIsSubmitModalOpen(false);
          submitTest();
        }}
      />

    </div>
  );
};
