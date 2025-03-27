
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Fixture, formatMatchDate, getTimeUntilMatch } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

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
            <Badge variant="live" dot pulse>LIVE {fixture.minute}'</Badge>
          ) : (
            <Badge variant="soon" size="sm" className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {getTimeUntilMatch(fixture.startTime)}
            </Badge>
          )}
        </div>
        
        {/* Teams Section */}
        <div className="grid grid-cols-7 gap-2 items-center bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl">
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
        
        {/* Additional Info */}
        {!isLive && (
          <div className="mt-3 pt-3 border-t border-border text-xs flex items-center justify-center text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {formatMatchDate(fixture.startTime)}
          </div>
        )}
        
        {fixture.prediction && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground mb-1">Prediction</div>
            <div className="flex items-center space-x-1">
              <div className="h-2 bg-primary rounded-l-full" style={{ width: `${fixture.prediction.homeWin}%` }}></div>
              <div className="h-2 bg-gray-400" style={{ width: `${fixture.prediction.draw}%` }}></div>
              <div className="h-2 bg-secondary rounded-r-full" style={{ width: `${fixture.prediction.awayWin}%` }}></div>
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span>{fixture.prediction.homeWin}%</span>
              <span>Draw: {fixture.prediction.draw}%</span>
              <span>{fixture.prediction.awayWin}%</span>
            </div>
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default FixtureCard;
