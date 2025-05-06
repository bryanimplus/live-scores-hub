
import React from 'react';
import FixtureCard from './FixtureCard';
import EmptyFixtureCard from './EmptyFixtureCard';
import { Fixture } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

interface LiveMatchesSectionProps {
  fixtures: Fixture[];
  showLiveLabel?: boolean;
  dateLabel?: string;
}

const LiveMatchesSection: React.FC<LiveMatchesSectionProps> = ({ 
  fixtures,
  showLiveLabel = true,
  dateLabel = ""
}) => {
  const navigate = useNavigate();
  const hasFixtures = fixtures.length > 0;
  
  // Separate live fixtures
  const liveFixtures = fixtures.filter(fixture => fixture.status === 'live');
  const hasLiveMatches = liveFixtures.length > 0;
  
  // Upcoming fixtures
  const upcomingFixtures = fixtures.filter(fixture => fixture.status === 'upcoming');
  
  // Completed fixtures
  const completedFixtures = fixtures.filter(fixture => fixture.status === 'completed');

  // Sort fixtures by status and start time
  const sortedFixtures = [
    ...liveFixtures,
    ...upcomingFixtures,
    ...completedFixtures
  ];

  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center">
          {showLiveLabel && hasLiveMatches && (
            <span className="inline-block w-2 h-2 rounded-full bg-live animate-pulse-live mr-2"></span>
          )}
          {dateLabel ? `${dateLabel} Fixtures` : 'Fixtures'}
        </h2>
        <button 
          className="text-sm font-medium text-primary hover:underline"
          onClick={() => navigate('/predictions')}
        >
          See all
        </button>
      </div>
      
      {hasFixtures ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedFixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmptyFixtureCard 
            type="upcoming" 
            message="No fixtures found for this date" 
            actionText="Try another date"
            onActionClick={() => navigate('/predictions')}
          />
        </div>
      )}
    </section>
  );
};

export default LiveMatchesSection;
