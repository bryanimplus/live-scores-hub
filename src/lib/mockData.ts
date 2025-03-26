
export type Team = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
};

export type FixtureStatus = 'live' | 'upcoming' | 'completed';

export type Fixture = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: FixtureStatus;
  startTime: string;
  competition: string;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  prediction?: {
    homeWin: number;
    draw: number;
    awayWin: number;
    recommended?: string;
  };
  valueBet?: {
    market: string;
    selection: string;
    odds: number;
    value: number;
  };
};

// Mock team data
export const teams: Team[] = [
  {
    id: '1',
    name: 'Arsenal',
    shortName: 'ARS',
    logo: 'https://resources.premierleague.com/premierleague/badges/t3.svg',
  },
  {
    id: '2',
    name: 'Manchester City',
    shortName: 'MCI',
    logo: 'https://resources.premierleague.com/premierleague/badges/t43.svg',
  },
  {
    id: '3',
    name: 'Liverpool',
    shortName: 'LIV',
    logo: 'https://resources.premierleague.com/premierleague/badges/t14.svg',
  },
  {
    id: '4',
    name: 'Chelsea',
    shortName: 'CHE',
    logo: 'https://resources.premierleague.com/premierleague/badges/t8.svg',
  },
  {
    id: '5',
    name: 'Manchester United',
    shortName: 'MUN',
    logo: 'https://resources.premierleague.com/premierleague/badges/t1.svg',
  },
  {
    id: '6',
    name: 'Tottenham',
    shortName: 'TOT',
    logo: 'https://resources.premierleague.com/premierleague/badges/t6.svg',
  },
  {
    id: '7',
    name: 'Newcastle',
    shortName: 'NEW',
    logo: 'https://resources.premierleague.com/premierleague/badges/t4.svg',
  },
  {
    id: '8',
    name: 'Aston Villa',
    shortName: 'AVL',
    logo: 'https://resources.premierleague.com/premierleague/badges/t7.svg',
  },
];

// Calculate a time X hours from now
const hoursFromNow = (hours: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

// Mock fixtures data
export const fixtures: Fixture[] = [
  {
    id: '1',
    homeTeam: teams[0], // Arsenal
    awayTeam: teams[1], // Man City
    status: 'live',
    startTime: hoursFromNow(-1), // Started 1 hour ago
    competition: 'Premier League',
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    prediction: {
      homeWin: 40,
      draw: 30,
      awayWin: 30,
      recommended: 'Home Win',
    },
    valueBet: {
      market: 'Over/Under',
      selection: 'Over 2.5 Goals',
      odds: 1.85,
      value: 12,
    },
  },
  {
    id: '2',
    homeTeam: teams[2], // Liverpool
    awayTeam: teams[3], // Chelsea
    status: 'live',
    startTime: hoursFromNow(-0.5), // Started 30 minutes ago
    competition: 'Premier League',
    homeScore: 0,
    awayScore: 0,
    minute: 32,
    prediction: {
      homeWin: 45,
      draw: 30,
      awayWin: 25,
      recommended: 'Home Win',
    },
    valueBet: {
      market: 'Both Teams to Score',
      selection: 'Yes',
      odds: 1.75,
      value: 8,
    },
  },
  {
    id: '3',
    homeTeam: teams[4], // Man United
    awayTeam: teams[5], // Tottenham
    status: 'upcoming',
    startTime: hoursFromNow(2), // Starting in 2 hours
    competition: 'Premier League',
    prediction: {
      homeWin: 35,
      draw: 35,
      awayWin: 30,
      recommended: 'Draw',
    },
    valueBet: {
      market: 'Both Teams to Score',
      selection: 'Yes',
      odds: 1.65,
      value: 10,
    },
  },
  {
    id: '4',
    homeTeam: teams[6], // Newcastle
    awayTeam: teams[7], // Aston Villa
    status: 'upcoming',
    startTime: hoursFromNow(4), // Starting in 4 hours
    competition: 'Premier League',
    prediction: {
      homeWin: 50,
      draw: 30,
      awayWin: 20,
      recommended: 'Home Win',
    },
    valueBet: {
      market: 'Match Result',
      selection: 'Home Win',
      odds: 2.10,
      value: 15,
    },
  },
  {
    id: '5',
    homeTeam: teams[3], // Chelsea
    awayTeam: teams[0], // Arsenal
    status: 'upcoming',
    startTime: hoursFromNow(26), // Tomorrow
    competition: 'Premier League',
    prediction: {
      homeWin: 30,
      draw: 30,
      awayWin: 40,
      recommended: 'Away Win',
    },
    valueBet: {
      market: 'Over/Under',
      selection: 'Under 2.5 Goals',
      odds: 2.05,
      value: 7,
    },
  },
  {
    id: '6',
    homeTeam: teams[1], // Man City
    awayTeam: teams[2], // Liverpool
    status: 'upcoming',
    startTime: hoursFromNow(28), // Tomorrow
    competition: 'Premier League',
    prediction: {
      homeWin: 45,
      draw: 35,
      awayWin: 20,
      recommended: 'Home Win',
    },
    valueBet: {
      market: 'Match Result',
      selection: 'Home Win',
      odds: 1.90,
      value: 9,
    },
  },
];

// Helper to filter live and upcoming fixtures
export const getLiveFixtures = (): Fixture[] => {
  return fixtures.filter((fixture) => fixture.status === 'live');
};

export const getUpcomingFixtures = (): Fixture[] => {
  return fixtures.filter((fixture) => fixture.status === 'upcoming');
};

export const getFixtureById = (id: string): Fixture | undefined => {
  return fixtures.find((fixture) => fixture.id === id);
};

// Format date for display
export const formatMatchDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Check if the match is today
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Check if the match is tomorrow
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // For other dates
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate time until match for upcoming fixtures
export const getTimeUntilMatch = (dateString: string): string => {
  const matchTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diffMs = matchTime - now;
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (hours < 1) {
    const minutes = Math.floor(diffMs / (1000 * 60));
    return `${minutes} minute${minutes !== 1 ? 's' : ''} to kick-off`;
  }
  
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} to kick-off`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} to kick-off`;
};
