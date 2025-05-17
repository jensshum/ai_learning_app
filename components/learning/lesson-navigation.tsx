'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavigationProps {
  pathId: string;
  currentLessonId: string;
  nextLessonId?: string;
  prevLessonId?: string;
}

export function LessonNavigation({ 
  pathId, 
  currentLessonId, 
  nextLessonId, 
  prevLessonId 
}: LessonNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      {prevLessonId ? (
        <Button
          variant="outline"
          asChild
        >
          <Link href={`/learn/${pathId}/${prevLessonId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Lesson
          </Link>
        </Button>
      ) : (
        <div /> // Empty div for spacing
      )}
      
      {nextLessonId ? (
        <Button
          asChild
        >
          <Link href={`/learn/${pathId}/${nextLessonId}`}>
            Next Lesson
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="secondary" disabled>
          Course Completed
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}