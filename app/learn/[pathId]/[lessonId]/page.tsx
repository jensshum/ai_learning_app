import { notFound } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { LessonContent } from './lesson-content';

interface LessonPageProps {
  params: {
    pathId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <DashboardShell>
      <LessonContent pathId={params.pathId} lessonId={params.lessonId} />
    </DashboardShell>
  );
}