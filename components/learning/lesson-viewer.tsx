'use client';

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LessonViewerProps {
  lesson: {
    title: string;
    content: string;
  };
}

export function LessonViewer({ lesson }: LessonViewerProps) {
  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {lesson.content}
        </div>
      </ScrollArea>
    </Card>
  );
}