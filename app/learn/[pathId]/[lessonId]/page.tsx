import { notFound } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { LessonContent } from './lesson-content';

interface LessonPageProps {
  params: {
    pathId: string;
    lessonId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LessonPage({ params }: LessonPageProps) {
  return (
    <DashboardShell>
      <LessonContent pathId={params.pathId} lessonId={params.lessonId} />
    </DashboardShell>
  );
}