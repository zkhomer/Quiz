export interface Question {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface QuizState {
  categories: any[];
  selectedCategory: string;
  difficulties: any[];
  selectedDifficulty: string;
  numQuestions: number | null;
  currentQuestionIndex: number;
  questions: Question[];
  selectedAnswers: string[];
}
