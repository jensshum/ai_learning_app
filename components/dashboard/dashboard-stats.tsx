"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Trophy, Users } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Active Courses",
      value: "3",
      icon: BookOpen,
      description: "Currently enrolled courses",
    },
    {
      title: "Study Time",
      value: "12h",
      icon: Clock,
      description: "Total study time this week",
    },
    {
      title: "Achievements",
      value: "5",
      icon: Trophy,
      description: "Badges earned",
    },
    {
      title: "Study Groups",
      value: "2",
      icon: Users,
      description: "Active group memberships",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}