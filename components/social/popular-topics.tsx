"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TOPICS = [
  { id: "1", name: "React", count: 1234 },
  { id: "2", name: "TypeScript", count: 856 },
  { id: "3", name: "Next.js", count: 654 },
  { id: "4", name: "TailwindCSS", count: 432 },
  { id: "5", name: "Node.js", count: 321 }
];

export function PopularTopics() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <Badge key={topic.id} variant="secondary" className="text-sm cursor-pointer hover:bg-secondary/80">
            {topic.name}
            <span className="ml-1 text-xs text-muted-foreground">({topic.count})</span>
          </Badge>
        ))}
      </div>
    </Card>
  );
}