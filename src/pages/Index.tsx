
import React, { useState } from 'react';
import { isSameDay, parseISO } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import FixtureCalendar from '@/components/home/FixtureCalendar';
import LiveMatchesSection from '@/components/home/LiveMatchesSection';
import { getLiveFixtures, fixtures } from '@/lib/mockData';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [liveFixtures, setLiveFixtures] = useState(getLiveFixtures());
  
  // Filter fixtures for the selected date
  const filteredFixtures = fixtures.filter(fixture => 
    isSameDay(parseISO(fixture.startTime), selectedDate)
  );

  // All fixtures for the day - live, upcoming and completed
  const allFixtures = [
    ...liveFixtures,
    ...filteredFixtures.filter(f => !liveFixtures.some(lf => lf.id === f.id))
  ];
  
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
        
        {/* Single unified fixtures section */}
        <LiveMatchesSection 
          fixtures={allFixtures}
          showLiveLabel={isSameDay(selectedDate, new Date())}
          dateLabel={isSameDay(selectedDate, new Date()) ? "Today's" : ""}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
