
import React from 'react';
import FixtureCard from './FixtureCard';
import { Fixture } from '@/lib/mockData';
import { Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LiveMatchesSectionProps {
  fixtures: Fixture[];
}

const LiveMatchesSection: React.FC<LiveMatchesSectionProps> = ({ fixtures }) => {
  const hasLiveMatches = fixtures.length > 0;

  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-xl font-medium mb-4 flex items-center">
        <span className={`inline-block w-2 h-2 rounded-full ${hasLiveMatches ? 'bg-live animate-pulse-live' : 'bg-muted'} mr-2`}></span>
        Live Matches
      </h2>
      
      {hasLiveMatches ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <Alert variant="default" className="bg-secondary/20 border-secondary/30">
          <AlertDescription className="flex items-center justify-center py-4 text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            There are currently no live matches. Check back later for live updates.
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
};

export default LiveMatchesSection;
