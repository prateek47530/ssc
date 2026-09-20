import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useExam } from '../../context/ExamContext';
import { Plus, CheckCircle2 } from 'lucide-react';

export const TestCreatorModal = ({ isOpen, onClose, onSave }) => {
  const { questions } = useExam();

  const [formData, setFormData] = useState({
    title: '',
    examCategory: 'SSC CGL',
    examId: 'ssc-cgl',
    tier: 'Tier-1',
    badge: 'Custom Mock',
    durationMinutes: 60,
    totalQuestions: 20,
    totalMarks: 40,
    positiveMarksPerQuestion: 2.0,
    negativeMarksPerQuestion: 0.5,
    difficulty: 'Moderate',
    description: 'Custom timed test created by SSC Administrator with positive and negative marking scheme.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a test title');
      return;
    }

    // Auto assign questions from bank to this test
    const selectedQIds = questions.slice(0, Number(formData.totalQuestions)).map(q => q.id);

    const newTest = {
      ...formData,
      totalQuestions: Number(formData.totalQuestions),
      totalMarks: Number(formData.totalQuestions) * Number(formData.positiveMarksPerQuestion),
      durationMinutes: Number(formData.durationMinutes),
      positiveMarksPerQuestion: Number(formData.positiveMarksPerQuestion),
      negativeMarksPerQuestion: Number(formData.negativeMarksPerQuestion),
      sections: [
        {
          id: 'sec-custom-1',
          name: 'General Assessment Section',
          questionIds: selectedQIds
        }
      ]
    };

    onSave(newTest);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New SSC Mock Test" maxWidth={680}>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="form-label">Test Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. SSC CGL 2024 Full Mock Test #05 (Shift 1)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
          
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Target Exam</label>
            <select
              className="form-select"
              value={formData.examCategory}
              onChange={(e) => setFormData({ ...formData, examCategory: e.target.value })}
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
            <label className="form-label">Duration (Minutes)</label>
            <input
              type="number"
              className="form-input"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
              min={5}
              max={180}
              required
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Total Questions</label>
            <input
              type="number"
              className="form-input"
              value={formData.totalQuestions}
              onChange={(e) => setFormData({ ...formData, totalQuestions: e.target.value })}
              min={1}
              max={questions.length}
              required
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Positive Mark / Q</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              value={formData.positiveMarksPerQuestion}
              onChange={(e) => setFormData({ ...formData, positiveMarksPerQuestion: e.target.value })}
              required
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Negative Mark / Q</label>
            <input
              type="number"
              step="0.05"
              className="form-input"
              value={formData.negativeMarksPerQuestion}
              onChange={(e) => setFormData({ ...formData, negativeMarksPerQuestion: e.target.value })}
              required
            />
          </div>

        </div>

        <div className="form-group">
          <label className="form-label">Test Description</label>
          <textarea
            className="form-textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create & Publish Mock Test
          </button>
        </div>

      </form>
    </Modal>
  );
};
