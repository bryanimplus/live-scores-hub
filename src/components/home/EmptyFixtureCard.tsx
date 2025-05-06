
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { cn } from '@/lib/utils';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface EmptyFixtureCardProps {
  type: 'live' | 'upcoming' | 'value';
  message?: string;
  className?: string;
  actionText?: string;
  onActionClick?: () => void;
}

const EmptyFixtureCard: React.FC<EmptyFixtureCardProps> = ({ 
  type, 
  message,
  className,
  actionText,
  onActionClick
}) => {
  // Define icon and default message based on type
  const getIcon = () => {
    switch (type) {
      case 'live':
        return <Clock className="w-12 h-12 text-muted-foreground/60" />;
      case 'upcoming':
        return <Calendar className="w-12 h-12 text-muted-foreground/60" />;
      case 'value':
        return <AlertCircle className="w-12 h-12 text-muted-foreground/60" />;
      default:
        return <Calendar className="w-12 h-12 text-muted-foreground/60" />;
    }
  };
  
  const getDefaultMessage = () => {
    switch (type) {
      case 'live':
        return 'There are currently no live matches';
      case 'upcoming':
        return 'No fixtures found for this date';
      case 'value':
        return 'No value bets available';
      default:
        return 'No fixtures available';
    }
  };
  
  return (
    <AnimatedCard
      className={cn(
        'neo-card rounded-2xl overflow-hidden h-[180px] flex items-center justify-center',
        className
      )}
      hoverScale={false}
    >
      <div className="flex flex-col items-center justify-center p-6 text-center">
        {getIcon()}
        <p className="mt-4 text-sm text-muted-foreground">
          {message || getDefaultMessage()}
        </p>
        {actionText && onActionClick && (
          <button 
            className="mt-4 text-primary hover:underline text-sm font-medium"
            onClick={onActionClick}
          >
            {actionText}
          </button>
        )}
      </div>
    </AnimatedCard>
  );
};

export default EmptyFixtureCard;
