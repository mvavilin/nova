export interface QuestionBank {
  [word: string]: CheckQuestion[]; // Массив вопросов для каждого концепта
}

export interface CheckQuestion {
  id: string; // Уникальный идентификатор вопроса
  word: string; // Название концепта (JS/TS)
  question: string; // Текст вопроса на русском
  question_en: string; // Текст вопроса на английском
  referenceAnswer: string; // Эталонный ответ с примерами кода
  referenceAnswer_en: string; // Эталонный ответ на английском
  difficulty: 1 | 2 | 3; // Уровень сложности
  tags: string[]; // Массив тегов для категоризации
}
