
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FixtureCard from './FixtureCard';
import { Fixture } from '@/lib/mockData';
import { Calendar, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  
  if (fixtures.length === 0) {
    return null;
  }

  const limitedFixtures = limit ? fixtures.slice(0, limit) : fixtures;

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center">
          <LineChart className="w-5 h-5 mr-2 text-primary" />
          {title}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/predictions')}
          className="text-sm font-medium text-primary"
        >
          See all
        </Button>
      </div>
      
      <div className="space-y-4">
        {limitedFixtures.map((fixture) => (
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
