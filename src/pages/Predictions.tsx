
import React, { useState } from 'react';
import { isSameDay, parseISO } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { fixtures } from '@/lib/mockData';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { CustomBadge } from '@/components/ui/CustomBadge';
import FixtureCalendar from '@/components/home/FixtureCalendar';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Predictions = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter fixtures for the selected date with predictions
  let fixturesWithPredictions = fixtures.filter(fixture => 
    fixture.prediction && isSameDay(parseISO(fixture.startTime), selectedDate)
  );
  
  // Apply search filter
  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    fixturesWithPredictions = fixturesWithPredictions.filter(fixture => 
      fixture.homeTeam.name.toLowerCase().includes(query) ||
      fixture.awayTeam.name.toLowerCase().includes(query) ||
      fixture.competition.toLowerCase().includes(query)
    );
  }
  
  return (
    <MainLayout 
      title="Predictions"
      subtitle="Match predictions and insights"
    >
      <div className="space-y-6">
        <FixtureCalendar 
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search teams or competitions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            {fixturesWithPredictions.length} {fixturesWithPredictions.length === 1 ? 'prediction' : 'predictions'} found
          </div>
          {/* We could add more filters here in the future */}
        </div>
        
        {fixturesWithPredictions.length > 0 ? (
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
                      <CustomBadge variant="live" dot pulse>LIVE</CustomBadge>
                    ) : (
                      <CustomBadge variant="default" size="sm">Prediction</CustomBadge>
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
                        <CustomBadge variant="success">{fixture.prediction.recommended}</CustomBadge>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-secondary/20 rounded-2xl">
            <p className="text-muted-foreground">No predictions found for this date</p>
            <button 
              className="mt-4 text-primary hover:underline"
              onClick={() => setSelectedDate(new Date())}
            >
              Go to today
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Predictions;
