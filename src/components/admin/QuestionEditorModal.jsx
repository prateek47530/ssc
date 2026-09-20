import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Plus, Trash2, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export const QuestionEditorModal = ({
  isOpen,
  onClose,
  initialQuestion = null,
  onSave
}) => {
  const [formData, setFormData] = useState({
    subject: 'Quantitative Aptitude',
    topic: '',
    difficulty: 'Medium',
    examTag: 'SSC CGL',
    year: '2024',
    question: '',
    questionHi: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  useEffect(() => {
    if (initialQuestion) {
      setFormData({
        ...initialQuestion,
        options: initialQuestion.options || ['', '', '', '']
      });
    } else {
      setFormData({
        subject: 'Quantitative Aptitude',
        topic: '',
        difficulty: 'Medium',
        examTag: 'SSC CGL',
        year: '2024',
        question: '',
        questionHi: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
    }
  }, [initialQuestion, isOpen]);

  const handleOptionChange = (idx, value) => {
    setFormData(prev => {
      const newOpts = [...prev.options];
      newOpts[idx] = value;
      return { ...prev, options: newOpts };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      alert('Please enter the question text.');
      return;
    }
    if (formData.options.some(opt => !opt.trim())) {
      alert('Please enter all 4 option texts.');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialQuestion ? 'Edit Question Details' : 'Add New Question to SSC Bank'}
      maxWidth={780}
    >
      <form onSubmit={handleSubmit}>
        
        {/* Meta Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
          
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Subject</label>
            <select
              className="form-select"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="Quantitative Aptitude">Quantitative Aptitude</option>
              <option value="General Intelligence & Reasoning">General Intelligence & Reasoning</option>
              <option value="General Awareness">General Awareness</option>
              <option value="English Comprehension">English Comprehension</option>
              <option value="Computer Knowledge">Computer Knowledge</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Topic Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Profit & Loss"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Difficulty</label>
            <select
              className="form-select"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">SSC Exam Tag</label>
            <select
              className="form-select"
              value={formData.examTag}
              onChange={(e) => setFormData({ ...formData, examTag: e.target.value })}
            >
              <option value="SSC CGL">SSC CGL</option>
              <option value="SSC CHSL">SSC CHSL</option>
              <option value="SSC MTS">SSC MTS</option>
              <option value="SSC GD">SSC GD</option>
              <option value="SSC CPO">SSC CPO</option>
              <option value="SSC JE">SSC JE</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">PYQ Year</label>
            <input
              type="text"
              className="form-input"
              placeholder="2024"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>

        </div>

        {/* Question Text (English) */}
        <div className="form-group">
          <label className="form-label">Question Statement (English)</label>
          <textarea
            className="form-textarea"
            placeholder="Type the full question statement..."
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
            rows={3}
          />
        </div>

        {/* Question Text (Hindi Translation) */}
        <div className="form-group">
          <label className="form-label">Question Statement (Hindi - Optional)</label>
          <textarea
            className="form-textarea"
            placeholder="प्रश्न का हिन्दी अनुवाद यहाँ लिखें..."
            value={formData.questionHi}
            onChange={(e) => setFormData({ ...formData, questionHi: e.target.value })}
            rows={2}
          />
        </div>

        {/* 4 Options Grid with Correct Answer Radio */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Answer Options & Correct Key:
          </label>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {formData.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isCorrect = formData.correctAnswer === idx;

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className={`btn btn-sm ${isCorrect ? 'btn-success' : 'btn-secondary'}`}
                    style={{ width: 44, padding: '0.4rem', fontWeight: 800 }}
                    onClick={() => setFormData({ ...formData, correctAnswer: idx })}
                    title={`Mark Option ${letter} as Correct`}
                  >
                    {letter}
                  </button>

                  <input
                    type="text"
                    className="form-input"
                    placeholder={`Option ${letter} Text`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    required
                  />

                  {isCorrect && (
                    <span className="badge badge-success" style={{ whiteSpace: 'nowrap' }}>
                      <CheckCircle2 size={14} /> Correct Key
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step by step explanation */}
        <div className="form-group">
          <label className="form-label">Step-by-Step Explanation & Shortcut Tricks</label>
          <textarea
            className="form-textarea"
            placeholder="Explain the step-by-step derivation, formula used, or elimination trick..."
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            rows={3}
          />
        </div>

        {/* Submit & Cancel */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialQuestion ? 'Save Question Changes' : 'Create & Add Question'}
          </button>
        </div>

      </form>
    </Modal>
  );
};
