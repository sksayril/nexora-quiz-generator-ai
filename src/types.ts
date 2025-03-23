export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: string[];
  timeRemaining: number;
  quizStarted: boolean;
  quizCompleted: boolean;
}