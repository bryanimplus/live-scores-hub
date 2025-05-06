
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fixture } from '@/lib/mockData';
import AnimatedCard from '@/components/ui/AnimatedCard';
import EmptyFixtureCard from './EmptyFixtureCard';
import { CustomBadge } from '@/components/ui/CustomBadge';
import { ThumbsUp } from 'lucide-react';

interface ValueBetsSectionProps {
  fixtures: Fixture[];
  title?: string;
  limit?: number;
}

const ValueBetsSection: React.FC<ValueBetsSectionProps> = ({ fixtures, title = "Value Bets", limit }) => {
  const navigate = useNavigate();
  
  const limitedFixtures = limit ? fixtures.slice(0, limit) : fixtures;
  const hasFixtures = fixtures.length > 0;
  
  // Sort fixtures by value percentage (descending)
  const sortedFixtures = [...limitedFixtures].sort((a, b) => 
    (b.valueBet?.value || 0) - (a.valueBet?.value || 0)
  );
  
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center">
          <ThumbsUp className="w-5 h-5 mr-2 text-warning" />
          {title}
        </h2>
        <button
          className="text-sm font-medium text-primary hover:underline"
          onClick={() => navigate('/value-bets')}
        >
          See all
        </button>
      </div>
      
      {hasFixtures ? (
        <div className="space-y-3">
          {sortedFixtures.map(fixture => (
            <AnimatedCard
              key={fixture.id}
              onClick={() => navigate(`/fixture/${fixture.id}`)}
              className="neo-card overflow-hidden"
              hoverScale={true}
            >
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">{fixture.competition}</span>
                  <CustomBadge variant="warning">+{fixture.valueBet?.value}% Value</CustomBadge>
                </div>
                
                <div className="grid grid-cols-7 items-center mb-2">
                  <div className="col-span-3 flex items-center">
                    <img 
                      src={fixture.homeTeam.logo} 
                      alt={fixture.homeTeam.name} 
                      className="w-6 h-6 mr-1"
                    />
                    <span className="text-sm">{fixture.homeTeam.shortName || fixture.homeTeam.name}</span>
                  </div>
                  <div className="col-span-1 text-center text-xs text-muted-foreground">vs</div>
                  <div className="col-span-3 flex items-center justify-end">
                    <span className="text-sm">{fixture.awayTeam.shortName || fixture.awayTeam.name}</span>
                    <img 
                      src={fixture.awayTeam.logo} 
                      alt={fixture.awayTeam.name} 
                      className="w-6 h-6 ml-1"
                    />
                  </div>
                </div>
                
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground">Market:</span>{' '}
                      <span className="font-medium">{fixture.valueBet?.market}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Selection:</span>{' '}
                      <span className="font-medium">{fixture.valueBet?.selection}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Odds:</span>{' '}
                      <span className="font-medium">{fixture.valueBet?.odds}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      ) : (
        <EmptyFixtureCard 
          type="value" 
          message="No value bets available for this date"
          actionText="Check other days"
          onActionClick={() => navigate('/value-bets')}
        />
      )}
    </section>
  );
};

export default ValueBetsSection;
