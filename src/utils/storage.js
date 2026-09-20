const STORAGE_KEYS = {
  THEME: 'ssc_theme',
  USER: 'ssc_user',
  QUESTIONS: 'ssc_questions_v1',
  MOCK_TESTS: 'ssc_mock_tests_v1',
  TEST_ATTEMPTS: 'ssc_test_attempts_v1',
  BOOKMARKS: 'ssc_bookmarked_qids_v1',
  DAILY_STREAK: 'ssc_daily_streak_v1',
  DAILY_PRACTICE: 'ssc_daily_practice_history_v1',
  LEADERBOARD: 'ssc_leaderboard_v1'
};

export const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`Error reading localStorage key ${key}`, err);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key ${key}`, err);
  }
};

export { STORAGE_KEYS };
