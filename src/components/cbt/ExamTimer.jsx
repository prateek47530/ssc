import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatSecondsToTime } from '../../utils/formatters';

export const ExamTimer = ({ timeRemainingSeconds }) => {
  const isWarning = timeRemainingSeconds <= 300; // <= 5 minutes left

  return (
    <div className={`cbt-timer-badge ${isWarning ? 'warning' : ''}`} title="Time Remaining">
      {isWarning ? <AlertTriangle size={18} color="#ef4444" /> : <Clock size={18} />}
      <span style={{ fontSize: '0.8rem', color: isWarning ? '#fca5a5' : '#94a3b8', marginRight: '0.25rem' }}>Time Left:</span>
      <span>{formatSecondsToTime(timeRemainingSeconds)}</span>
    </div>
  );
};
