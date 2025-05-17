'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order_index: number;
  created_at: string;
}

interface LearningPath {
  id: string;
  title: string;
  topic: string;
  progress: number;
  created_at: string;
  updated_at: string;
  lessons: Lesson[];
}

interface LearningPathPageProps {
  params: {
    pathId: string;
  };
}

export default function LearningPathPage({ params }: LearningPathPageProps) {
  const [path, setPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLearningPath = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/learning/path/save?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch learning path');
        
        const { paths } = await response.json();
        const currentPath = paths.find((p: LearningPath) => p.id === params.pathId);
        
        if (!currentPath) {
          notFound();
        }
        
        setPath(currentPath);
      } catch (error) {
        console.error('Error fetching learning path:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningPath();
  }, [user?.id, params.pathId]);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!path) {
    return notFound();
  }

  const completedLessons = path.lessons.filter(lesson => lesson.completed).length;
  const progress = (completedLessons / path.lessons.length) * 100;

  const truncateDescription = (description: string) => {
    const lines = description.split('\n');
    if (lines.length <= 7) return description;
    
    return lines.slice(0, 7).join('\n') + '...';
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{path.title}</h1>
          <p className="text-muted-foreground mt-2">{path.topic}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {path.lessons.map((lesson) => (
              <Card key={lesson.id} className="relative hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {lesson.completed && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                        {lesson.title}
                      </CardTitle>
                      <CardDescription>
                        Lesson {lesson.order_index}
                      </CardDescription>
                    </div>
                    <Button
                      variant={lesson.completed ? "outline" : "default"}
                      className="ml-4"
                      onClick={() => {/* TODO: Implement lesson completion */}}
                    >
                      {lesson.completed ? 'Completed' : 'Mark as Complete'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="text-muted-foreground whitespace-pre-line"
                      dangerouslySetInnerHTML={{ 
                        __html: truncateDescription(lesson.description) 
                      }} 
                    />
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-4 p-0 h-auto group"
                    asChild
                  >
                    <Link href={`/learn/${params.pathId}/${lesson.id}`}>
                      Start Lesson
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{completedLessons} of {path.lessons.length} lessons completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}