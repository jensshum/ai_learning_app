'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}

interface LessonsListProps {
  lessons: Lesson[];
  pathId: string;
}

export function LessonsList({ lessons, pathId }: LessonsListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Lessons</h2>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="p-4">
            <Link 
              href={`/learn/${pathId}/${lesson.id}`}
              className={`block ${lesson.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'hover:opacity-80'}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <Badge variant={
                      lesson.status === 'completed' ? 'default' :
                      lesson.status === 'in-progress' ? 'secondary' : 
                      'outline'
                    }>
                      {lesson.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {lesson.status === 'in-progress' && <PlayCircle className="mr-1 h-3 w-3" />}
                      {lesson.status === 'locked' && <Lock className="mr-1 h-3 w-3" />}
                      {lesson.status?.charAt(0).toUpperCase() + lesson.status?.slice(1).replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{lesson.duration}</span>
                    {lesson.status === 'in-progress' && (
                      <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                        <Progress value={lesson.progress} className="h-2" />
                        <span>{lesson.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}