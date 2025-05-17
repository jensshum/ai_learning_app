'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  learningTime: [
    { date: '2024-01', hours: 12 },
    { date: '2024-02', hours: 15 },
    { date: '2024-03', hours: 20 },
    { date: '2024-04', hours: 18 },
  ],
  completedLessons: [
    { date: '2024-01', count: 8 },
    { date: '2024-02', count: 12 },
    { date: '2024-03', count: 15 },
    { date: '2024-04', count: 10 },
  ],
  streak: [
    { date: '2024-01', days: 5 },
    { date: '2024-02', days: 8 },
    { date: '2024-03', days: 12 },
    { date: '2024-04', days: 15 },
  ],
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics"
        text="Track your learning progress and achievements"
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65 hours</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 lessons</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 days</div>
            <p className="text-xs text-muted-foreground">Best: 21 days</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Learning Progress</CardTitle>
            <Tabs defaultValue="time" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="time">Learning Time</TabsTrigger>
                <TabsTrigger value="lessons">Completed Lessons</TabsTrigger>
                <TabsTrigger value="streak">Streak</TabsTrigger>
              </TabsList>
              <TabsContent value="time">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.learningTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="lessons">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.completedLessons}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="streak">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.streak}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="days" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardHeader>
      </Card>
    </DashboardShell>
  );
}