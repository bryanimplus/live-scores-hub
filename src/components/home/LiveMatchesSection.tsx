
import React from 'react';
import FixtureCard from './FixtureCard';
import { Fixture } from '@/lib/mockData';

interface LiveMatchesSectionProps {
  fixtures: Fixture[];
}

const LiveMatchesSection: React.FC<LiveMatchesSectionProps> = ({ fixtures }) => {
  if (fixtures.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-xl font-medium mb-4 flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-live animate-pulse-live mr-2"></span>
        Live Matches
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fixtures.map((fixture) => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
      </div>
    </section>
  );
};

export default LiveMatchesSection;
