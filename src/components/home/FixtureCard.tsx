
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/CustomBadge";
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Fixture, formatMatchDate, getTimeUntilMatch } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Star } from 'lucide-react';

interface FixtureCardProps {
  fixture: Fixture;
  className?: string;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, className }) => {
  const navigate = useNavigate();
  const isLive = fixture.status === 'live';
  
  const handleClick = () => {
    navigate(`/fixture/${fixture.id}`);
  };
  
  return (
    <AnimatedCard 
      className={cn('neo-card rounded-2xl overflow-hidden transition-all duration-300', className)}
      onClick={handleClick}
      depth={15}
      glowAmount={0.7}
      hoverScale={true}
    >
      <div className="p-4">
        {/* Competition & Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {fixture.competition}
          </span>
          {isLive ? (
            <CustomBadge variant="live" className="animate-pulse">LIVE {fixture.minute}'</CustomBadge>
          ) : (
            <CustomBadge variant="soon" className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {getTimeUntilMatch(fixture.startTime)}
            </CustomBadge>
          )}
        </div>
        
        {/* Teams Section */}
        <div className="grid grid-cols-7 gap-2 items-center bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl mb-3">
          {/* Home Team */}
          <div className="col-span-3 flex flex-col items-center text-center">
            <div className="w-14 h-14 mb-2 flex items-center justify-center bg-white dark:bg-gray-800/50 rounded-full p-1">
              <img 
                src={fixture.homeTeam.logo} 
                alt={fixture.homeTeam.name} 
                className="w-10 h-10 object-contain" 
                loading="lazy"
              />
            </div>
            <span className="font-medium text-sm truncate max-w-full">
              {fixture.homeTeam.name}
            </span>
          </div>
          
          {/* Score */}
          <div className="col-span-1 flex items-center justify-center">
            {isLive ? (
              <div className="text-xl font-bold bg-white dark:bg-gray-800 shadow-sm px-2 py-1 rounded-lg">
                {fixture.homeScore}-{fixture.awayScore}
              </div>
            ) : (
              <div className="text-xs text-center text-muted-foreground">
                {formatMatchDate(fixture.startTime).split(',')[0]}
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="col-span-3 flex flex-col items-center text-center">
            <div className="w-14 h-14 mb-2 flex items-center justify-center bg-white dark:bg-gray-800/50 rounded-full p-1">
              <img 
                src={fixture.awayTeam.logo} 
                alt={fixture.awayTeam.name} 
                className="w-10 h-10 object-contain" 
                loading="lazy"
              />
            </div>
            <span className="font-medium text-sm truncate max-w-full">
              {fixture.awayTeam.name}
            </span>
          </div>
        </div>
        
        {/* Predictions & Value Bets */}
        <div className="flex gap-2 mt-3">
          {fixture.prediction && (
            <CustomBadge variant="success" className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {fixture.prediction.recommended}
            </CustomBadge>
          )}
          {fixture.valueBet && (
            <CustomBadge variant="warning" className="flex items-center gap-1">
              Value: +{fixture.valueBet.value}%
            </CustomBadge>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default FixtureCard;
