
import React from 'react';
import FixtureCard from './FixtureCard';
import { Fixture } from '@/lib/mockData';

interface UpcomingFixturesSectionProps {
  fixtures: Fixture[];
}

const UpcomingFixturesSection: React.FC<UpcomingFixturesSectionProps> = ({ fixtures }) => {
  if (fixtures.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-xl font-medium mb-4">Upcoming Fixtures</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fixtures.map((fixture) => (
          <FixtureCard 
            key={fixture.id} 
            fixture={fixture} 
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingFixturesSection;
