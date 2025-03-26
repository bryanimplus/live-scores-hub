
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import FixtureDetails from '@/components/fixtures/FixtureDetails';
import { getFixtureById } from '@/lib/mockData';
import { ArrowLeft } from 'lucide-react';

const FixtureDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fixture, setFixture] = useState(id ? getFixtureById(id) : undefined);
  
  useEffect(() => {
    if (id) {
      const fixtureData = getFixtureById(id);
      setFixture(fixtureData);
      
      if (!fixtureData) {
        // Fixture not found, redirect to home
        navigate('/');
      }
    }
  }, [id, navigate]);
  
  if (!fixture) {
    return (
      <MainLayout title="Fixture not found">
        <div className="flex flex-col items-center justify-center h-full mt-16">
          <h2 className="text-xl font-medium mb-4">Fixture not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout 
      title={`${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`}
      subtitle={fixture.competition}
    >
      <div className="mb-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-primary transition-transform hover:translate-x-[-2px]"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to fixtures
        </button>
      </div>
      
      <FixtureDetails fixture={fixture} />
    </MainLayout>
  );
};

export default FixtureDetailsPage;
