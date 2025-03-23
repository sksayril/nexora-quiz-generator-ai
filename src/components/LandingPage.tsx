import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Clock, Award, Code, Cpu, Terminal } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <Brain className="w-24 h-24 mx-auto" />
          </motion.div>
          
          <h1 className="text-6xl font-bold mb-6">AI-Powered Quiz Challenge</h1>
          <p className="text-2xl mb-12 opacity-90">Embark on an intelligent journey of knowledge discovery</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Dynamic Questions</h3>
              <p className="opacity-80">AI-generated questions that adapt to various topics</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Quick Challenges</h3>
              <p className="opacity-80">10 engaging questions to test your expertise</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <Award className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="opacity-80">Get detailed feedback on your performance</p>
            </motion.div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Quiz Platform?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
              >
                <Terminal className="w-10 h-10 mx-auto mb-3 text-blue-300" />
                <h4 className="text-xl font-semibold mb-2">AI-Powered Learning</h4>
                <p>Advanced algorithms ensure questions match your knowledge level</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
              >
                <Cpu className="w-10 h-10 mx-auto mb-3 text-green-300" />
                <h4 className="text-xl font-semibold mb-2">Real-World Applications</h4>
                <p>Questions designed to test practical knowledge and understanding</p>
              </motion.div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition-colors"
          >
            Start Quiz
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-sm opacity-70"
          >
            © 2024 Nexora-AI. All Rights Reserved.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}