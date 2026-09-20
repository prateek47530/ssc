import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

const DEFAULT_STUDENT = {
  id: 'usr-student-1',
  name: 'Rajesh Kumar',
  email: 'rajesh.cgl@gmail.com',
  role: 'student', // 'student' | 'admin'
  avatarBg: '#2563eb',
  targetExam: 'SSC CGL 2024',
  isPublicLeaderboard: true,
  dailyStreak: 7,
  lastActiveDate: new Date().toISOString()
};

const DEFAULT_ADMIN = {
  id: 'usr-admin-1',
  name: 'SSC Admin Controller',
  email: 'admin@sscprep.gov.in',
  role: 'admin',
  avatarBg: '#dc2626',
  targetExam: 'All SSC Exams',
  isPublicLeaderboard: false,
  dailyStreak: 45,
  lastActiveDate: new Date().toISOString()
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getStorageItem(STORAGE_KEYS.USER, DEFAULT_STUDENT);
  });

  const [testAttempts, setTestAttempts] = useState(() => {
    return getStorageItem(STORAGE_KEYS.TEST_ATTEMPTS, []);
  });

  const [bookmarkedQIds, setBookmarkedQIds] = useState(() => {
    return getStorageItem(STORAGE_KEYS.BOOKMARKS, ['q-quant-3', 'q-reas-2', 'q-gk-1']);
  });

  const [dailyStreak, setDailyStreak] = useState(() => {
    return getStorageItem(STORAGE_KEYS.DAILY_STREAK, {
      streakCount: 7,
      lastPracticeDate: new Date().toISOString().split('T')[0],
      answeredToday: false
    });
  });

  // Persist changes
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.USER, user);
  }, [user]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.TEST_ATTEMPTS, testAttempts);
  }, [testAttempts]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.BOOKMARKS, bookmarkedQIds);
  }, [bookmarkedQIds]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.DAILY_STREAK, dailyStreak);
  }, [dailyStreak]);

  const login = (email, password, role = 'student') => {
    const newUser = role === 'admin' 
      ? { ...DEFAULT_ADMIN, email: email || DEFAULT_ADMIN.email }
      : { ...DEFAULT_STUDENT, email: email || DEFAULT_STUDENT.email, name: email.split('@')[0] || DEFAULT_STUDENT.name };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (name, email, targetExam = 'SSC CGL') => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'student',
      avatarBg: '#2563eb',
      targetExam,
      isPublicLeaderboard: true,
      dailyStreak: 1,
      lastActiveDate: new Date().toISOString()
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setUser(DEFAULT_ADMIN);
    } else {
      setUser(DEFAULT_STUDENT);
    }
  };

  const saveTestAttempt = (resultData) => {
    setTestAttempts(prev => [resultData, ...prev]);
  };

  const toggleBookmark = (questionId) => {
    setBookmarkedQIds(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const recordDailyPractice = (isCorrect) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setDailyStreak(prev => {
      const isNewDay = prev.lastPracticeDate !== todayStr;
      return {
        streakCount: isNewDay ? prev.streakCount + 1 : prev.streakCount,
        lastPracticeDate: todayStr,
        answeredToday: true
      };
    });
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      isLoggedIn: !!user,
      login,
      register,
      logout,
      switchRole,
      testAttempts,
      saveTestAttempt,
      bookmarkedQIds,
      toggleBookmark,
      dailyStreak,
      recordDailyPractice,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
