import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Atom, Globe2, Palette, Trophy, Code, Terminal, Cpu } from 'lucide-react';

interface TopicSelectorProps {
  onTopicSelect: (topic: string) => void;
}

interface TopicCard {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

const topics: TopicCard[] = [
  {
    title: "Programming Languages",
    icon: <Code className="w-8 h-8" />,
    gradient: "from-blue-600 to-indigo-700",
    description: "Test your coding knowledge across multiple languages"
  },
  {
    title: "Web Development",
    icon: <Terminal className="w-8 h-8" />,
    gradient: "from-teal-500 to-emerald-600",
    description: "Frontend, Backend, and DevOps concepts"
  },
  {
    title: "Computer Science",
    icon: <Cpu className="w-8 h-8" />,
    gradient: "from-violet-500 to-purple-600",
    description: "Algorithms, Data Structures, and Theory"
  },
  {
    title: "World History",
    icon: <BookOpen className="w-8 h-8" />,
    gradient: "from-amber-500 to-orange-600",
    description: "Journey through time and civilizations"
  },
  {
    title: "Science & Technology",
    icon: <Atom className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-600",
    description: "Explore scientific discoveries and innovations"
  },
  {
    title: "Geography",
    icon: <Globe2 className="w-8 h-8" />,
    gradient: "from-green-500 to-emerald-600",
    description: "World locations, cultures, and landscapes"
  },
  {
    title: "Literature",
    icon: <BookOpen className="w-8 h-8" />,
    gradient: "from-purple-500 to-violet-600",
    description: "Classic and contemporary literary works"
  },
  {
    title: "Art & Culture",
    icon: <Palette className="w-8 h-8" />,
    gradient: "from-pink-500 to-rose-600",
    description: "Visual arts, music, and cultural heritage"
  },
  {
    title: "Sports",
    icon: <Trophy className="w-8 h-8" />,
    gradient: "from-red-500 to-orange-600",
    description: "Athletics, competitions, and sports history"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function TopicSelector({ onTopicSelect }: TopicSelectorProps) {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isHovering, setIsHovering] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center text-white mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="inline-block bg-white/10 p-6 rounded-full backdrop-blur-lg mb-8"
        >
          <Brain className="w-16 h-16" />
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">Choose Your Quiz Topic</h2>
        <p className="text-xl opacity-90">Select a category to begin your knowledge adventure</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
      >
        {topics.map((topic) => (
          <motion.div
            key={topic.title}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer overflow-hidden`}
            onMouseEnter={() => setIsHovering(topic.title)}
            onMouseLeave={() => setIsHovering('')}
            onClick={() => {
              setSelectedTopic(topic.title);
              onTopicSelect(topic.title);
            }}
          >
            <div className={`bg-gradient-to-r ${topic.gradient} rounded-2xl p-8 h-full transform transition-transform duration-300 ease-out`}>
              <div className="relative z-10">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  {topic.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{topic.title}</h3>
                <p className="text-white/80 text-sm">{topic.description}</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovering === topic.title ? 1 : 0 }}
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering === topic.title ? 1 : 0 }}
                className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm rounded-2xl"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center text-white/70 text-sm mt-12">
        © 2024 Nexora-AI. All Rights Reserved.
      </div>
    </div>
  );
}