
import React, { useState } from 'react';
import { isSameDay, parseISO } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { fixtures } from '@/lib/mockData';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { CustomBadge } from '@/components/ui/CustomBadge';
import { useNavigate } from 'react-router-dom';
import FixtureCalendar from '@/components/home/FixtureCalendar';

const ValueBets = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sortBy, setSortBy] = useState<'value' | 'odds' | 'time'>('value');
  
  // Filter fixtures for the selected date with value bets
  const fixturesWithValueBets = fixtures.filter(fixture => 
    fixture.valueBet && isSameDay(parseISO(fixture.startTime), selectedDate)
  );
  
  // Sort fixtures
  const sortedFixtures = [...fixturesWithValueBets].sort((a, b) => {
    if (sortBy === 'value') {
      return (b.valueBet?.value || 0) - (a.valueBet?.value || 0);
    } else if (sortBy === 'odds') {
      return (b.valueBet?.odds || 0) - (a.valueBet?.odds || 0);
    } else {
      // Sort by time
      return parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime();
    }
  });
  
  return (
    <MainLayout 
      title="Value Bets"
      subtitle="Best betting opportunities"
    >
      <div className="space-y-6">
        <FixtureCalendar 
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            {fixturesWithValueBets.length} value {fixturesWithValueBets.length === 1 ? 'bet' : 'bets'} found
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${sortBy === 'value' ? 'bg-primary text-white' : 'bg-secondary'}`}
              onClick={() => setSortBy('value')}
            >
              Value %
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${sortBy === 'odds' ? 'bg-primary text-white' : 'bg-secondary'}`}
              onClick={() => setSortBy('odds')}
            >
              Odds
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${sortBy === 'time' ? 'bg-primary text-white' : 'bg-secondary'}`}
              onClick={() => setSortBy('time')}
            >
              Time
            </button>
          </div>
        </div>

        {fixturesWithValueBets.length > 0 ? (
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
        ) : (
          <div className="text-center py-10 bg-secondary/20 rounded-2xl">
            <p className="text-muted-foreground">No value bets found for this date</p>
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

export default ValueBets;
