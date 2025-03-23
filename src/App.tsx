import React, { useState } from 'react';
import { TopicSelector } from './components/TopicSelector';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { generateQuiz } from './utils/gemini';
import type { Question } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setShowTopicSelector(true);
  };

  const handleTopicSelect = async (topic: string) => {
    setLoading(true);
    setError(null);
    try {
      const quizQuestions = await generateQuiz(topic);
      setQuestions(quizQuestions);
      setQuizStarted(true);
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (finalScore: number, answers: string[]) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setQuizCompleted(true);
  };

  const handleRestart = () => {
    setQuestions([]);
    setShowTopicSelector(false);
    setQuizStarted(false);
    setQuizCompleted(false);
    setUserAnswers([]);
    setScore(0);
    setError(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={handleRestart}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showTopicSelector) {
    return <LandingPage onStart={handleStartQuiz} />;
  }

  if (showTopicSelector && !quizStarted) {
    return <TopicSelector onTopicSelect={handleTopicSelect} />;
  }

  if (quizStarted && !quizCompleted) {
    return <Quiz questions={questions} onComplete={handleQuizComplete} />;
  }

  return (
    <Results
      questions={questions}
      userAnswers={userAnswers}
      score={score}
      onRestart={handleRestart}
    />
  );
}

export default App;