
import React from 'react';
import FixtureCard from './FixtureCard';
import EmptyFixtureCard from './EmptyFixtureCard';
import { Fixture } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

interface LiveMatchesSectionProps {
  fixtures: Fixture[];
}

const LiveMatchesSection: React.FC<LiveMatchesSectionProps> = ({ fixtures }) => {
  const navigate = useNavigate();
  const hasLiveMatches = fixtures.length > 0;

  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full ${hasLiveMatches ? 'bg-live animate-pulse-live' : 'bg-muted'} mr-2`}></span>
          Live Matches
        </h2>
        {hasLiveMatches && (
          <button 
            className="text-sm font-medium text-primary hover:underline"
            onClick={() => navigate('/predictions')}
          >
            See all
          </button>
        )}
      </div>
      
      {hasLiveMatches ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmptyFixtureCard 
            type="live" 
            message="There are currently no live matches" 
            actionText="View upcoming matches"
            onActionClick={() => navigate('/predictions')}
          />
        </div>
      )}
    </section>
  );
};

export default LiveMatchesSection;
