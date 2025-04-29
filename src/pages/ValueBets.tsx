import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { fixtures } from '@/lib/mockData';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { CustomBadge } from '@/components/ui/CustomBadge';
import { useNavigate } from 'react-router-dom';

const ValueBets = () => {
  const navigate = useNavigate();
  
  // Only show fixtures with value bets
  const fixturesWithValueBets = fixtures.filter(fixture => fixture.valueBet);
  
  // Sort by value
  const sortedFixtures = [...fixturesWithValueBets].sort((a, b) => 
    (b.valueBet?.value || 0) - (a.valueBet?.value || 0)
  );
  
  return (
    <MainLayout 
      title="Value Bets"
      subtitle="Best betting opportunities"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedFixtures.map(fixture => (
          <AnimatedCard 
            key={fixture.id}
            className="neo-card rounded-2xl overflow-hidden"
            onClick={() => navigate(`/fixture/${fixture.id}`)}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-muted-foreground">{fixture.competition}</span>
                <CustomBadge variant="warning">
                  +{fixture.valueBet?.value}% Value
                </CustomBadge>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={fixture.homeTeam.logo} 
                    alt={fixture.homeTeam.name} 
                    className="w-8 h-8 mr-2" 
                  />
                  <span className="font-medium">{fixture.homeTeam.name}</span>
                </div>
                <div className="text-sm">vs</div>
                <div className="flex items-center">
                  <span className="font-medium">{fixture.awayTeam.name}</span>
                  <img 
                    src={fixture.awayTeam.logo} 
                    alt={fixture.awayTeam.name} 
                    className="w-8 h-8 ml-2" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-muted-foreground">Market</div>
                  <div className="font-medium">{fixture.valueBet?.market}</div>
                </div>
                
                <div>
                  <div className="text-xs text-muted-foreground">Selection</div>
                  <div className="font-medium">{fixture.valueBet?.selection}</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Odds</span>
                <span className="font-semibold">{fixture.valueBet?.odds}</span>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </MainLayout>
  );
};

export default ValueBets;
