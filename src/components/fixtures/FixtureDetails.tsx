
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/CustomBadge";
import { Fixture, getTimeUntilMatch, formatMatchDate } from '@/lib/mockData';
import { BarChart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FixtureDetailsProps {
  fixture: Fixture;
}

const FixtureDetails: React.FC<FixtureDetailsProps> = ({ fixture }) => {
  const navigate = useNavigate();
  const [currentMinute, setCurrentMinute] = useState<number | undefined>(fixture.minute);
  const isLive = fixture.status === 'live';
  
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setCurrentMinute((prev) => {
        if (!prev) return 1;
        return prev < 90 ? prev + 1 : 90;
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [isLive]);

  const handleSimulateBet = () => {
    navigate(`/bet-simulation?fixtureId=${fixture.id}`);
  };

  return (
    <div className="animate-fade-in">
      {/* Match Status */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm text-muted-foreground">{fixture.competition}</h3>
          <h2 className="text-xl font-medium">
            {isLive ? 'Live Match' : formatMatchDate(fixture.startTime)}
          </h2>
        </div>
        
        {isLive ? (
          <CustomBadge variant="live" dot pulse size="lg">LIVE {currentMinute}'</CustomBadge>
        ) : (
          <CustomBadge variant="soon" size="lg">{getTimeUntilMatch(fixture.startTime)}</CustomBadge>
        )}
      </div>
      
      {/* Score Section */}
      <div className="glass-card rounded-3xl p-6 mb-8">
        <div className="grid grid-cols-7 items-center">
          {/* Home Team */}
          <div className="col-span-3 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-3 flex items-center justify-center">
              <img 
                src={fixture.homeTeam.logo} 
                alt={fixture.homeTeam.name} 
                className="w-20 h-20 object-contain animate-float" 
              />
            </div>
            <span className="font-semibold text-lg">{fixture.homeTeam.name}</span>
          </div>
          
          {/* Score */}
          <div className="col-span-1 flex items-center justify-center">
            {isLive ? (
              <div className="text-4xl font-bold">
                {fixture.homeScore}-{fixture.awayScore}
              </div>
            ) : (
              <div className="text-xl font-medium text-muted-foreground">VS</div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="col-span-3 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-3 flex items-center justify-center">
              <img 
                src={fixture.awayTeam.logo} 
                alt={fixture.awayTeam.name} 
                className="w-20 h-20 object-contain animate-float" 
                style={{ animationDelay: '0.5s' }}
              />
            </div>
            <span className="font-semibold text-lg">{fixture.awayTeam.name}</span>
          </div>
        </div>
        
        {/* Time and Venue */}
        {!isLive && (
          <div className="mt-6 pt-4 border-t border-border text-center">
            <div className="text-base text-muted-foreground">
              {formatMatchDate(fixture.startTime)}
            </div>
          </div>
        )}
      </div>
      
      {/* Prediction Section */}
      {fixture.prediction && (
        <div className="glass-card rounded-2xl p-5 mb-5">
          <h3 className="text-lg font-medium mb-3">Match Prediction</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold">{fixture.prediction.homeWin}%</div>
              <div className="text-sm text-muted-foreground">Home Win</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{fixture.prediction.draw}%</div>
              <div className="text-sm text-muted-foreground">Draw</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{fixture.prediction.awayWin}%</div>
              <div className="text-sm text-muted-foreground">Away Win</div>
            </div>
          </div>
          
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-primary h-full rounded-l-full" 
                style={{ width: `${fixture.prediction.homeWin}%` }}
              />
              <div 
                className="bg-gray-400 h-full" 
                style={{ width: `${fixture.prediction.draw}%` }}
              />
              <div 
                className="bg-secondary h-full rounded-r-full" 
                style={{ width: `${fixture.prediction.awayWin}%` }}
              />
            </div>
          </div>
          
          {fixture.prediction.recommended && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">Recommended Bet</div>
              <div className="flex items-center text-base font-medium">
                <CustomBadge variant="success" className="mr-2">
                  {fixture.prediction.recommended}
                </CustomBadge>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Value Bet */}
      {fixture.valueBet && (
        <div className="glass-card rounded-2xl p-5 mb-6">
          <h3 className="text-lg font-medium mb-3">Value Bet</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Market</div>
              <div className="text-base font-medium">{fixture.valueBet.market}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Selection</div>
              <div className="text-base font-medium">{fixture.valueBet.selection}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-sm text-muted-foreground">Odds</div>
              <div className="text-base font-medium">{fixture.valueBet.odds}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Value</div>
              <div className="text-base font-medium">+{fixture.valueBet.value}%</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Simulate Bet Button */}
      <button 
        className="w-full glass-card rounded-2xl p-4 flex items-center justify-between transition-transform hover:scale-105 active:scale-95"
        onClick={handleSimulateBet}
      >
        <div className="flex items-center">
          <BarChart className="w-5 h-5 mr-2" />
          <span className="font-medium">Simulate Bet</span>
        </div>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FixtureDetails;
