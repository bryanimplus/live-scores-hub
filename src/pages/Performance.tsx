
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomBadge } from '@/components/ui/CustomBadge';

const accuracyData = [
  { month: 'Jan', accuracy: 68 },
  { month: 'Feb', accuracy: 72 },
  { month: 'Mar', accuracy: 65 },
  { month: 'Apr', accuracy: 75 },
  { month: 'May', accuracy: 70 },
  { month: 'Jun', accuracy: 68 },
];

const roiData = [
  { month: 'Jan', roi: 12 },
  { month: 'Feb', roi: 8 },
  { month: 'Mar', roi: -4 },
  { month: 'Apr', roi: 15 },
  { month: 'May', roi: 10 },
  { month: 'Jun', roi: 5 },
];

const leagueData = [
  { name: 'Premier League', accuracy: 72 },
  { name: 'La Liga', accuracy: 68 },
  { name: 'Bundesliga', accuracy: 75 },
  { name: 'Serie A', accuracy: 70 },
  { name: 'Ligue 1', accuracy: 65 },
];

const betTypeData = [
  { type: 'Match Result', accuracy: 72 },
  { type: 'Over/Under', accuracy: 68 },
  { type: 'Both Teams to Score', accuracy: 65 },
  { type: 'Handicap', accuracy: 60 },
];

const Performance = () => {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <MainLayout
      title="Performance"
      subtitle="Track AI accuracy and betting results"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Historical Performance</h2>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Prediction Accuracy</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold">70%</div>
              <div className="text-sm text-muted-foreground">Average Accuracy</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">ROI on Value Bets</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="roi" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold">+7.6%</div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Accuracy by League</h3>
            <div className="space-y-4">
              {leagueData.map(league => (
                <div key={league.name}>
                  <div className="flex justify-between mb-1">
                    <span>{league.name}</span>
                    <span className="font-medium">{league.accuracy}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${league.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Accuracy by Bet Type</h3>
            <div className="space-y-4">
              {betTypeData.map(betType => (
                <div key={betType.type}>
                  <div className="flex justify-between mb-1">
                    <span>{betType.type}</span>
                    <span className="font-medium">{betType.accuracy}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${betType.accuracy > 70 ? 'bg-success' : betType.accuracy > 65 ? 'bg-primary' : 'bg-warning'}`}
                      style={{ width: `${betType.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Overall Performance</h3>
            <p className="text-sm text-muted-foreground">Based on 1,248 predictions</p>
          </div>
          <CustomBadge variant="success" className="text-base">70% Accuracy</CustomBadge>
        </div>
      </div>
    </MainLayout>
  );
};

export default Performance;
