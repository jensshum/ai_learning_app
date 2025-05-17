'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface UserLearningPathsProps {
  userId: string;
}

export function UserLearningPaths({ userId }: UserLearningPathsProps) {
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState<any[]>([]);

  useEffect(() => {
    // Simulate learning paths loading
    const timer = setTimeout(() => {
      setPaths([
        {
          id: 1,
          title: "Full Stack Development",
          progress: 65,
          totalLessons: 20,
          completedLessons: 13,
        },
        {
          id: 2,
          title: "React Mastery",
          progress: 30,
          totalLessons: 15,
          completedLessons: 4,
        },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[125px] w-full rounded-lg" />
        <Skeleton className="h-[125px] w-full rounded-lg" />
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500">No learning paths yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {paths.map((path) => (
        <Card key={path.id}>
          <CardHeader>
            <CardTitle className="text-lg">{path.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={path.progress} />
              <p className="text-sm text-gray-500">
                {path.completedLessons} of {path.totalLessons} lessons completed
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}