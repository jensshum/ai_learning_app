'use client';

import { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
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

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('in-progress');
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLearningPaths = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`/api/learning/path/save?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch learning paths');
        
        const { paths } = await response.json();
        setLearningPaths(paths);
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningPaths();
  }, [user?.id]);

  const inProgressPaths = learningPaths.filter(path => path.progress < 100);
  const completedPaths = learningPaths.filter(path => path.progress === 100);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Learning Paths"
        text="Your personalized learning journey powered by AI."
      />
      
      <Tabs defaultValue="in-progress" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="create">Create New Path</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="mt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : inProgressPaths.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inProgressPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader>
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>{path.topic}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{path.lessons.length} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{path.lessons.length * 2}h</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full">
                        <Link href={`/learn/${path.id}`}>Continue Learning</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No learning paths yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first learning path to start your journey.
              </p>
              <Button className="mt-4" onClick={() => router.push('/onboarding')}>
                Create Learning Path
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : completedPaths.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedPaths.map((path) => (
                <Card key={path.id}>
                  <CardHeader>
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>{path.topic}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{path.lessons.length} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{path.lessons.length * 2}h</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full">
                        <Link href={`/learn/${path.id}`}>Review Path</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Award className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No completed paths yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep learning! Your completed paths will appear here.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Create a New Learning Path</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Let AI create a personalized learning path based on your interests and goals.
            </p>
            <Button className="mt-4" onClick={() => router.push('/onboarding')}>Create Learning Path</Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}