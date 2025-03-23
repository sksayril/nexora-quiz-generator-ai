import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';
import type { Question } from '../types';

interface ResultsProps {
  questions: Question[];
  userAnswers: string[];
  score: number;
  onRestart: () => void;
}

export function Results({ questions, userAnswers, score, onRestart }: ResultsProps) {
  const percentage = (score / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-xl">
          Your score: {score}/{questions.length} ({percentage.toFixed(1)}%)
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-start gap-3">
              {userAnswers[idx] === question.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className="font-medium mb-2">{question.question}</p>
                <p className="text-sm text-gray-600">
                  Your answer: <span className={userAnswers[idx] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>{userAnswers[idx]}</span>
                </p>
                {userAnswers[idx] !== question.correctAnswer && (
                  <p className="text-sm text-green-600">
                    Correct answer: {question.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
      >
        Start New Quiz
      </motion.button>
    </motion.div>
  );
}