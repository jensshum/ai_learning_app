'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface UserContentProps {
  userId: string;
}

export function UserContent({ userId }: UserContentProps) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setContent([
        {
          id: 1,
          title: "Getting Started with Next.js",
          type: "article",
          date: "2024-01-15",
        },
        {
          id: 2,
          title: "Advanced React Patterns",
          type: "tutorial",
          date: "2024-01-10",
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

  if (content.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500">No content yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="capitalize">{item.type}</span>
              <span>•</span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}