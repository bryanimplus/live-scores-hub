
import React, { useEffect, useState } from 'react';
import { isSameDay, parseISO } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import LiveMatchesSection from '@/components/home/LiveMatchesSection';
import UpcomingFixturesSection from '@/components/home/UpcomingFixturesSection';
import ValueBetsSection from '@/components/home/ValueBetsSection';
import FixtureCalendar from '@/components/home/FixtureCalendar';
import { Card, CardContent } from '@/components/ui/card';
import { CustomBadge } from '@/components/ui/CustomBadge';
import { getLiveFixtures, getUpcomingFixtures, fixtures } from '@/lib/mockData';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [liveFixtures, setLiveFixtures] = useState(getLiveFixtures());
  
  // Filter fixtures for the selected date
  const filteredFixtures = fixtures.filter(fixture => 
    isSameDay(parseISO(fixture.startTime), selectedDate)
  );

  const upcomingFixtures = filteredFixtures.filter(fixture => 
    fixture.status === 'upcoming'
  );
  
  // Filter value bets for the selected date
  const valueBets = filteredFixtures.filter(fixture => 
    fixture.valueBet !== undefined
  );
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFixtures(getLiveFixtures());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout 
      title="Football Prediction AI"
      subtitle="Today's Fixtures & Predictions"
    >
      <div className="space-y-6">
        {/* Enhanced Calendar Component */}
        <FixtureCalendar 
          selected={selectedDate}
          onSelect={setSelectedDate}
          compact={true}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content - Left Column (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Show live matches section regardless, component handles empty state */}
            {isSameDay(selectedDate, new Date()) && (
              <LiveMatchesSection fixtures={liveFixtures} />
            )}
            
            {/* Show upcoming/past fixtures for the selected date */}
            <UpcomingFixturesSection 
              fixtures={upcomingFixtures} 
              title={isSameDay(selectedDate, new Date()) ? "Today's Predictions" : "Predictions"}
            />
          </div>
          
          {/* Value Bets & Stats - Right Column (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <ValueBetsSection 
              fixtures={valueBets} 
              title={isSameDay(selectedDate, new Date()) ? "Today's Value Bets" : "Value Bets"} 
            />
            
            {/* Performance Stats Card */}
            <Card className="neo-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Performance Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Prediction Accuracy</div>
                    <div className="flex justify-center">
                      <CustomBadge variant="success" className="text-base">70%</CustomBadge>
                    </div>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Value Bet ROI</div>
                    <div className="flex justify-center">
                      <CustomBadge variant="warning" className="text-base">+7.6%</CustomBadge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <a href="/performance" className="text-sm text-primary hover:underline">View detailed performance stats →</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
