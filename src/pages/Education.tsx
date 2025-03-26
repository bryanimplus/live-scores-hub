
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { BookOpen, BarChart4, ThumbsUp, LineChart, Info } from 'lucide-react';

const educationCategories = [
  {
    title: 'Understanding Predictions',
    description: 'Learn how our prediction algorithm works and how to interpret results',
    icon: LineChart,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    title: 'Value Betting Guide',
    description: 'How to identify value bets and maximize long-term profits',
    icon: ThumbsUp,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    title: 'Bet Simulation Tutorial',
    description: 'Make better decisions by simulating different betting scenarios',
    icon: BarChart4,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    title: 'Sports Betting Basics',
    description: 'The fundamentals of odds, markets, and betting strategies',
    icon: BookOpen,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    title: 'How Live Scores Work',
    description: 'Understanding real-time updates and making in-play decisions',
    icon: Info,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  },
];

const Education = () => {
  return (
    <MainLayout 
      title="Education Hub"
      subtitle="Learn about betting strategies and tools"
    >
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-medium mb-2">Welcome to the Education Hub</h2>
          <p className="text-muted-foreground">
            Explore our educational resources to improve your betting knowledge and decision-making. Whether you're a beginner or experienced bettor, there's always something new to learn.
          </p>
        </div>
        
        {/* Education Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationCategories.map((category, index) => (
            <AnimatedCard
              key={index}
              className="neo-card rounded-2xl overflow-hidden hover:shadow-md transition-all"
              depth={15}
            >
              <div className="p-5">
                <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                  <category.icon size={20} />
                </div>
                
                <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Quick Tips */}
        <div className="glass-card rounded-2xl p-5 mt-6">
          <h3 className="text-lg font-medium mb-3">Quick Tips</h3>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
              <span className="text-sm">Always check the live stats before placing in-play bets</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
              <span className="text-sm">Use the value percentage as a guide, not an absolute rule</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
              <span className="text-sm">The simulation tool can help you understand risk vs. reward</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
              <span className="text-sm">Our predictions focus on value, not just picking winners</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default Education;
