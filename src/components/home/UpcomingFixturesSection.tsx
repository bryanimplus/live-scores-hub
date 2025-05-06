
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FixtureCard from './FixtureCard';
import { Fixture } from '@/lib/mockData';
import { Calendar, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        {hasFixtures && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/predictions')}
            className="text-sm font-medium text-primary"
          >
            See all
          </Button>
        )}
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
        <Alert variant="default" className="bg-secondary/20 border-secondary/30">
          <AlertDescription className="flex items-center justify-center py-4 text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            No fixtures found for this date. Try selecting a different date.
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
};

export default UpcomingFixturesSection;
