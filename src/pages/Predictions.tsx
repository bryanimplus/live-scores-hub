
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { fixtures } from '@/lib/mockData';
import AnimatedCard from '@/components/ui/AnimatedCard';
import Badge from '@/components/ui/Badge';
import { useNavigate } from 'react-router-dom';

const Predictions = () => {
  const navigate = useNavigate();
  
  // Only show fixtures with predictions
  const fixturesWithPredictions = fixtures.filter(fixture => fixture.prediction);
  
  return (
    <MainLayout 
      title="Predictions"
      subtitle="Match predictions and insights"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fixturesWithPredictions.map(fixture => (
          <AnimatedCard 
            key={fixture.id}
            className="neo-card rounded-2xl overflow-hidden"
            onClick={() => navigate(`/fixture/${fixture.id}`)}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-muted-foreground">{fixture.competition}</span>
                {fixture.status === 'live' ? (
                  <Badge variant="live" dot pulse>LIVE</Badge>
                ) : (
                  <Badge variant="default" size="sm">Prediction</Badge>
                )}
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
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Home {fixture.prediction?.homeWin}%</span>
                  <span>Draw {fixture.prediction?.draw}%</span>
                  <span>Away {fixture.prediction?.awayWin}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div 
                      className="bg-primary h-full rounded-l-full" 
                      style={{ width: `${fixture.prediction?.homeWin}%` }}
                    />
                    <div 
                      className="bg-gray-400 h-full" 
                      style={{ width: `${fixture.prediction?.draw}%` }}
                    />
                    <div 
                      className="bg-secondary h-full rounded-r-full" 
                      style={{ width: `${fixture.prediction?.awayWin}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {fixture.prediction?.recommended && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Recommended</span>
                    <Badge variant="success">{fixture.prediction.recommended}</Badge>
                  </div>
                </div>
              )}
            </div>
          </AnimatedCard>
        ))}
      </div>
    </MainLayout>
  );
};

export default Predictions;
