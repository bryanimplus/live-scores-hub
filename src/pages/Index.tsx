
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LiveMatchesSection from '@/components/home/LiveMatchesSection';
import UpcomingFixturesSection from '@/components/home/UpcomingFixturesSection';
import { getLiveFixtures, getUpcomingFixtures } from '@/lib/mockData';

const Index = () => {
  const [liveFixtures, setLiveFixtures] = useState(getLiveFixtures());
  const [upcomingFixtures, setUpcomingFixtures] = useState(getUpcomingFixtures());
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFixtures(getLiveFixtures());
      setUpcomingFixtures(getUpcomingFixtures());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout 
      title="Live Scores Hub"
      subtitle="Today's matches and predictions"
    >
      <div className="space-y-6">
        <LiveMatchesSection fixtures={liveFixtures} />
        <UpcomingFixturesSection fixtures={upcomingFixtures} />
      </div>
    </MainLayout>
  );
};

export default Index;
