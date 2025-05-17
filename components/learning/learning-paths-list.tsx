"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

export function LearningPathsList() {
  // This is a placeholder component that can be enhanced with real data later
  const paths = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 30,
      totalLessons: 15,
      completedLessons: 4,
    },
  ];

  return (
    <div className="space-y-4">
      {paths.map((path) => (
        <Card key={path.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{path.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {path.completedLessons} of {path.totalLessons} lessons completed
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={path.progress} className="h-2" />
          </div>
        </Card>
      ))}
    </div>
  );
}