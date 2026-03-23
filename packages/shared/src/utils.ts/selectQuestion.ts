import type { CheckQuestion, QuestionBank } from '../types/question.ts';

function getFallbackQuestion(word: string): CheckQuestion {
  return {
    id: `fallback-${word}`,
    word,
    question: `Объясните концепт "${word}" своими словами.`,
    question_en: `Explain the concept "${word}" in your own words.`,
    referenceAnswer: `Ожидается объяснение ${word} с примером использования.`,
    referenceAnswer_en: `Expected explanation of ${word} with usage example.`,
    difficulty: 1,
    tags: [],
  };
}

export function selectQuestion(word: string, bank: QuestionBank): CheckQuestion {
  const questions = bank[word];

  // Если вопросы отсутствуют или массив пуст, возвращаем fallback
  if (!questions || questions.length === 0) {
    return getFallbackQuestion(word);
  }

  // Выбираем случайный вопрос из доступных
  const randomIndex = Math.floor(Math.random() * questions.length);
  const selectedQuestion = questions[randomIndex];

  // Если по какой-то причине вопрос не найден, возвращаем fallback
  if (!selectedQuestion) {
    return getFallbackQuestion(word);
  }

  return selectedQuestion;
}
