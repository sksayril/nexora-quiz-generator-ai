import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Loader2, Book, Lightbulb } from 'lucide-react';

// Using a named export to match your import in App.tsx
export function LoadingScreen() {
  const [progressWidth, setProgressWidth] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const loadingTexts = [
    "Gathering knowledge...",
    "Crafting questions...",
    "Preparing your challenge...",
    "Almost ready..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressWidth(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(phaseTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div className="text-center text-white">
          {/* Animated Brain Icon with Rotating Icons */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <Brain className="w-24 h-24 text-white" />
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
              <div className="absolute top-0 transform -translate-y-8">
                <Lightbulb className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="absolute right-0 transform translate-x-8">
                <Sparkles className="w-8 h-8 text-blue-300" />
              </div>
              <div className="absolute bottom-0 transform translate-y-8">
                <Book className="w-8 h-8 text-green-300" />
              </div>
              <div className="absolute left-0 transform -translate-x-8">
                <Loader2 className="w-8 h-8 text-red-300 animate-spin" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
            Quiz Generator
          </h2>
          
          <p className="text-xl font-medium mb-6 h-8">
            {loadingTexts[loadingPhase]}
          </p>
          
          {/* Progress Bar */}
          <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          
          <p className="text-sm font-medium text-white/80">
            {Math.floor(progressWidth)}% complete
          </p>
          
          {/* Pulse Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1, 2].map((dot) => (
              <div 
                key={dot}
                className="w-3 h-3 rounded-full bg-white animate-bounce"
                style={{ 
                  animationDelay: `${dot * 0.15}s`,
                  animationDuration: "0.8s"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}