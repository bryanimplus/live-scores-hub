
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LineChart, ThumbsUp, BarChart4, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Predictions', path: '/predictions', icon: LineChart },
  { name: 'Value Bets', path: '/value-bets', icon: ThumbsUp },
  { name: 'Simulator', path: '/bet-simulation', icon: BarChart4 },
  { name: 'Learn', path: '/education', icon: BookOpen },
];

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-border px-2 py-2 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300',
                isActive 
                  ? 'text-primary bg-secondary' 
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  'transition-all duration-300',
                  isActive ? 'scale-110' : ''
                )} 
              />
              <span className={cn(
                'text-xs mt-1 font-medium transition-all duration-300',
                isActive ? 'opacity-100' : 'opacity-70'
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
