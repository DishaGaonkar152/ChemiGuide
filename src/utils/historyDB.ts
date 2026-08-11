/**
 * Local History Database
 *
 * Persists AI quiz history using localStorage (web) and
 * falls back to in-memory storage on native until
 * AsyncStorage is installed.
 *
 * Each topic gets its own history list so data is scoped.
 */

import { Platform } from 'react-native';

// ─── TYPES ───
export interface HistoryEntry {
  id: string;
  question: string;
  answer: string;
  selectedAnswer: string;
  difficulty: string;
  category: string;
  userResult: 'correct' | 'wrong';
  timestamp: number;
}

export interface TopicHistory {
  entries: HistoryEntry[];
  totalCorrect: number;
  totalWrong: number;
}

// ─── CONSTANTS ───
const STORAGE_PREFIX = 'chemi_guide_history_';

// In-memory fallback for native (when AsyncStorage is not available)
const memoryStore: Record<string, string> = {};

// ─── LOW-LEVEL STORAGE ───
function getItem(key: string): string | null {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch {
      return memoryStore[key] || null;
    }
  }
  return memoryStore[key] || null;
}

function setItem(key: string, value: string): void {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, value);
    } catch {
      memoryStore[key] = value;
    }
  } else {
    memoryStore[key] = value;
  }
}

// ─── HELPER: normalise topic key ───
function topicKey(topicTitle: string): string {
  return STORAGE_PREFIX + topicTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

// ─── PUBLIC API ───

/**
 * Load the full history for a topic.
 */
export function loadHistory(topicTitle: string): TopicHistory {
  const raw = getItem(topicKey(topicTitle));
  if (!raw) {
    return { entries: [], totalCorrect: 0, totalWrong: 0 };
  }
  try {
    return JSON.parse(raw) as TopicHistory;
  } catch {
    return { entries: [], totalCorrect: 0, totalWrong: 0 };
  }
}

/**
 * Append a single entry to the topic's history and persist it.
 */
export function saveHistoryEntry(topicTitle: string, entry: HistoryEntry): TopicHistory {
  const history = loadHistory(topicTitle);
  history.entries.unshift(entry); // newest first
  if (entry.userResult === 'correct') {
    history.totalCorrect += 1;
  } else {
    history.totalWrong += 1;
  }
  // Keep max 200 entries per topic to avoid bloat
  if (history.entries.length > 200) {
    history.entries = history.entries.slice(0, 200);
  }
  setItem(topicKey(topicTitle), JSON.stringify(history));
  return history;
}

/**
 * Clear all history for a specific topic.
 */
export function clearHistory(topicTitle: string): TopicHistory {
  const empty: TopicHistory = { entries: [], totalCorrect: 0, totalWrong: 0 };
  setItem(topicKey(topicTitle), JSON.stringify(empty));
  return empty;
}
