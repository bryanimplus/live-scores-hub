
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { getFixtureById, fixtures } from '@/lib/mockData';
import { useSearchParams } from 'react-router-dom';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { CustomBadge } from '@/components/ui/CustomBadge';

const BetSimulation = () => {
  const [searchParams] = useSearchParams();
  const fixtureId = searchParams.get('fixtureId');
  const [selectedFixture, setSelectedFixture] = useState(fixtureId ? getFixtureById(fixtureId) : undefined);
  
  const [stake, setStake] = useState(100);
  const [selectedMarket, setSelectedMarket] = useState('match_result');
  const [selectedOption, setSelectedOption] = useState('home');
  const [odds, setOdds] = useState(2.0);
  const [potentialReturn, setPotentialReturn] = useState(stake * odds);
  
  // Markets available for simulation
  const markets = [
    { id: 'match_result', name: 'Match Result' },
    { id: 'over_under', name: 'Over/Under 2.5 Goals' },
    { id: 'btts', name: 'Both Teams to Score' }
  ];
  
  // Options based on selected market
  const options = {
    match_result: [
      { id: 'home', name: selectedFixture ? selectedFixture.homeTeam.name : 'Home' },
      { id: 'draw', name: 'Draw' },
      { id: 'away', name: selectedFixture ? selectedFixture.awayTeam.name : 'Away' }
    ],
    over_under: [
      { id: 'over', name: 'Over 2.5' },
      { id: 'under', name: 'Under 2.5' }
    ],
    btts: [
      { id: 'yes', name: 'Yes' },
      { id: 'no', name: 'No' }
    ]
  };
  
  // Update potential return when stake or odds change
  useEffect(() => {
    setPotentialReturn(stake * odds);
  }, [stake, odds]);
  
  // Handle fixture selection
  const handleFixtureSelect = (fixture: any) => {
    setSelectedFixture(fixture);
  };
  
  return (
    <MainLayout 
      title="Bet Simulator"
      subtitle="Simulate your betting strategy"
    >
      {/* Fixture Selection */}
      {!selectedFixture ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Select a Fixture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fixtures.map(fixture => (
              <AnimatedCard 
                key={fixture.id}
                className="neo-card rounded-2xl p-3"
                onClick={() => handleFixtureSelect(fixture)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={fixture.homeTeam.logo} alt={fixture.homeTeam.name} className="w-6 h-6 mr-2" />
                    <span className="text-sm">{fixture.homeTeam.shortName}</span>
                  </div>
                  <span className="text-xs">vs</span>
                  <div className="flex items-center">
                    <span className="text-sm">{fixture.awayTeam.shortName}</span>
                    <img src={fixture.awayTeam.logo} alt={fixture.awayTeam.name} className="w-6 h-6 ml-2" />
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Selected Fixture Display */}
          <div className="glass-card rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <CustomBadge variant={selectedFixture.status === 'live' ? 'live' : 'soon'} className="mb-2">
                {selectedFixture.status === 'live' ? 'LIVE' : 'Upcoming'}
              </CustomBadge>
              <button 
                className="text-sm text-primary"
                onClick={() => setSelectedFixture(undefined)}
              >
                Change
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={selectedFixture.homeTeam.logo} alt={selectedFixture.homeTeam.name} className="w-10 h-10 mr-2" />
                <span className="font-medium">{selectedFixture.homeTeam.name}</span>
              </div>
              <span className="mx-2">vs</span>
              <div className="flex items-center">
                <span className="font-medium">{selectedFixture.awayTeam.name}</span>
                <img src={selectedFixture.awayTeam.logo} alt={selectedFixture.awayTeam.name} className="w-10 h-10 ml-2" />
              </div>
            </div>
          </div>
          
          {/* Betting Simulation Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-lg font-medium mb-4">Bet Settings</h3>
              
              {/* Market Selection */}
              <div className="mb-4">
                <label className="block text-sm text-muted-foreground mb-2">Market</label>
                <select 
                  className="w-full p-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                  value={selectedMarket}
                  onChange={(e) => {
                    setSelectedMarket(e.target.value);
                    // Reset selected option when market changes
                    setSelectedOption(
                      e.target.value === 'match_result' ? 'home' : 
                      e.target.value === 'over_under' ? 'over' : 'yes'
                    );
                  }}
                >
                  {markets.map(market => (
                    <option key={market.id} value={market.id}>{market.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Option Selection */}
              <div className="mb-4">
                <label className="block text-sm text-muted-foreground mb-2">Selection</label>
                <div className="grid grid-cols-2 gap-2">
                  {options[selectedMarket as keyof typeof options].map(option => (
                    <button 
                      key={option.id}
                      className={`p-3 rounded-xl border ${selectedOption === option.id ? 'bg-primary text-white border-primary' : 'bg-transparent border-border'} transition-all`}
                      onClick={() => setSelectedOption(option.id)}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Odds and Stake */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Odds</label>
                  <input 
                    type="number" 
                    className="w-full p-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    value={odds}
                    onChange={(e) => setOdds(parseFloat(e.target.value) || 1.0)}
                    min="1.01"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Stake (€)</label>
                  <input 
                    type="number" 
                    className="w-full p-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    value={stake}
                    onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            {/* Results & Stats */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-lg font-medium mb-4">Simulation Results</h3>
              
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Potential Return</div>
                <div className="text-3xl font-bold">€{potentialReturn.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Profit: €{(potentialReturn - stake).toFixed(2)}
                </div>
              </div>
              
              {selectedFixture.prediction && (
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">Match Prediction</div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className={`text-center p-2 rounded-lg ${selectedOption === 'home' ? 'bg-primary/10' : 'bg-secondary/50'}`}>
                      <div className="font-medium">{selectedFixture.prediction.homeWin}%</div>
                      <div className="text-xs text-muted-foreground">Home</div>
                    </div>
                    <div className={`text-center p-2 rounded-lg ${selectedOption === 'draw' ? 'bg-primary/10' : 'bg-secondary/50'}`}>
                      <div className="font-medium">{selectedFixture.prediction.draw}%</div>
                      <div className="text-xs text-muted-foreground">Draw</div>
                    </div>
                    <div className={`text-center p-2 rounded-lg ${selectedOption === 'away' ? 'bg-primary/10' : 'bg-secondary/50'}`}>
                      <div className="font-medium">{selectedFixture.prediction.awayWin}%</div>
                      <div className="text-xs text-muted-foreground">Away</div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedFixture.valueBet && (
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Recommended Value Bet</div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{selectedFixture.valueBet.selection}</span>
                    <CustomBadge variant="warning">+{selectedFixture.valueBet.value}% Value</CustomBadge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default BetSimulation;
