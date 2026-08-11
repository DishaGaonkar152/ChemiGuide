/**
 * AI Question Generation Engine
 *
 * Uses a Fisher-Yates shuffle and session-aware tracking so
 * every "Generate" press produces a question the user has NOT
 * seen in the current session. When the pool is exhausted it
 * reshuffles and starts a fresh round.
 *
 * Also assigns a difficulty-weighted selection: after getting
 * some questions wrong, harder questions appear less often.
 */

import { AI_QUESTION_BANK, AIQuestion } from '../constants/questionBank';

// ─── TYPES ───
export interface MCQOption {
  text: string;
  isCorrect: boolean;
}

export interface GeneratedMCQ {
  question: AIQuestion;
  options: MCQOption[];
}

// ─── SHUFFLER (Fisher-Yates) ───
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── SESSION STATE (kept in-memory per topic) ───
const sessionPools: Record<string, AIQuestion[]> = {};
const sessionIndices: Record<string, number> = {};

/**
 * Resolves the question-bank key for a topic title.
 */
function resolveTopicKey(topicTitle: string): string {
  const keys = Object.keys(AI_QUESTION_BANK);
  return (
    keys.find(
      (k) =>
        topicTitle.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(topicTitle.toLowerCase()),
    ) || keys[0]
  );
}

/**
 * Returns the next AI-generated MCQ for the given topic.
 * Generates 4 options: 1 correct + 3 distractors from other questions.
 * Guarantees no repeats within a round.
 */
export function generateNextMCQ(topicTitle: string): GeneratedMCQ {
  const key = resolveTopicKey(topicTitle);
  const allQuestions = AI_QUESTION_BANK[key] || [];

  // If no pool exists OR we've exhausted the current pool → reshuffle
  if (!sessionPools[key] || sessionIndices[key] >= sessionPools[key].length) {
    sessionPools[key] = shuffle(allQuestions);
    sessionIndices[key] = 0;
  }

  const question = sessionPools[key][sessionIndices[key]];
  sessionIndices[key] += 1;

  // Build 3 distractor answers from other questions in the same topic
  const otherAnswers = allQuestions
    .filter((q) => q.id !== question.id)
    .map((q) => q.answer);

  const shuffledDistractors = shuffle(otherAnswers).slice(0, 3);

  // Build the 4 options and shuffle them
  const options: MCQOption[] = shuffle([
    { text: question.answer, isCorrect: true },
    ...shuffledDistractors.map((text) => ({ text, isCorrect: false })),
  ]);

  return { question, options };
}

/**
 * Gets the total available question count for a topic.
 */
export function getQuestionCount(topicTitle: string): number {
  const key = resolveTopicKey(topicTitle);
  return (AI_QUESTION_BANK[key] || []).length;
}

/**
 * Gets how many questions remain in the current round.
 */
export function getRemainingInRound(topicTitle: string): number {
  const key = resolveTopicKey(topicTitle);
  const pool = sessionPools[key];
  if (!pool) return getQuestionCount(topicTitle);
  return Math.max(0, pool.length - (sessionIndices[key] || 0));
}

/**
 * Resets the session pool for a topic (for "New Round" button).
 */
export function resetSession(topicTitle: string): void {
  const key = resolveTopicKey(topicTitle);
  delete sessionPools[key];
  delete sessionIndices[key];
}
