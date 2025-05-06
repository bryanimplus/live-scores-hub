
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FixtureCard from './FixtureCard';
import EmptyFixtureCard from './EmptyFixtureCard';
import { Fixture } from '@/lib/mockData';
import { LineChart } from 'lucide-react';

interface UpcomingFixturesSectionProps {
  fixtures: Fixture[];
  title?: string;
  limit?: number;
}

const UpcomingFixturesSection: React.FC<UpcomingFixturesSectionProps> = ({ 
  fixtures, 
  title = "Upcoming Fixtures",
  limit 
}) => {
  const navigate = useNavigate();
  
  // Get limited fixtures if a limit is set
  const limitedFixtures = limit ? fixtures.slice(0, limit) : fixtures;
  const hasFixtures = fixtures.length > 0;

  // If no fixtures and component is set to be hidden when empty, return null
  if (!hasFixtures && title.includes("Live")) {
    return null;
  }

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center">
          <LineChart className="w-5 h-5 mr-2 text-primary" />
          {title}
        </h2>
        <button
          className="text-sm font-medium text-primary hover:underline"
          onClick={() => navigate('/predictions')}
        >
          See all
        </button>
      </div>
      
      {hasFixtures ? (
        <div className="space-y-4">
          {limitedFixtures.map((fixture) => (
            <FixtureCard 
              key={fixture.id} 
              fixture={fixture} 
            />
          ))}
        </div>
      ) : (
        <EmptyFixtureCard 
          type="upcoming"
          message="No fixtures found for this date"
          actionText="Try another date"
          onActionClick={() => navigate('/predictions')}
        />
      )}
    </section>
  );
};

export default UpcomingFixturesSection;
