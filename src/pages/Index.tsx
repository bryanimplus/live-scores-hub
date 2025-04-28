
import React, { useEffect, useState } from 'react';
import { isSameDay, parseISO } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import LiveMatchesSection from '@/components/home/LiveMatchesSection';
import UpcomingFixturesSection from '@/components/home/UpcomingFixturesSection';
import FixtureCalendar from '@/components/home/FixtureCalendar';
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
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFixtures(getLiveFixtures());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout 
      title="Live Scores Hub"
      subtitle="Today's matches and predictions"
    >
      <div className="space-y-6">
        <FixtureCalendar 
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        
        {/* Show live matches only if they exist and we're on today's date */}
        {isSameDay(selectedDate, new Date()) && liveFixtures.length > 0 && (
          <LiveMatchesSection fixtures={liveFixtures} />
        )}
        
        {/* Show upcoming/past fixtures for the selected date */}
        {upcomingFixtures.length > 0 ? (
          <UpcomingFixturesSection fixtures={upcomingFixtures} />
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No fixtures scheduled for this date
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
