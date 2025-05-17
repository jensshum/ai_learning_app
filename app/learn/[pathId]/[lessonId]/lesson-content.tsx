'use client';

import { useEffect, useState, useRef } from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, Wand2, ChevronDown, ChevronUp, Video, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';

interface GeneratedImage {
  url: string;
  alt: string;
  videoUrl?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order_index: number;
  created_at: string;
  learning_path: {
    id: string;
    title: string;
    topic: string;
  };
}

interface LessonContentProps {
  pathId: string;
  lessonId: string;
}

export function LessonContent({ pathId, lessonId }: LessonContentProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [generatingVideos, setGeneratingVideos] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const fetchLesson = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        `/api/learning/path/save?userId=${user.id}&lessonId=${lessonId}`
      );
      if (!response.ok) throw new Error('Failed to fetch lesson');
      
      const { lesson } = await response.json();
      setLesson(lesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      toast.error('Failed to fetch lesson');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [user?.id, lessonId]);

  const generateLessonContent = async () => {
    if (!lesson) return;
    
    setIsGenerating(true);
    try {
      // Generate detailed lesson content using AI
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType: 'text',
          prompt: `Create a detailed lesson about ${lesson.title}. 
          
          Original lesson description: "${lesson.description}"
          
          Expand on this description and include:
          1. An introduction to the topic
          2. Key concepts and definitions
          3. Examples and practical applications
          4. Common challenges and solutions
          
          Format the content in clear paragraphs with proper spacing. Wherever possible, include placeholder <image> tags with an indepth description of an image that will help the user understand the lesson in the alt tag.`,
          topic: lesson.learning_path.topic
        }),
      });

      if (!response.ok) throw new Error('Failed to generate lesson content');
      
      const { text, images } = await response.json();
      setGeneratedImages(images || []);

      // Update the lesson in the database
      const updateResponse = await fetch(`/api/learning/path/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          lessonId: lesson.id,
          description: text
        }),
      });

      if (!updateResponse.ok) throw new Error('Failed to update lesson');

      // Refresh the lesson data
      await fetchLesson();
      toast.success('Lesson content generated successfully');
    } catch (error) {
      console.error('Error generating lesson content:', error);
      toast.error('Failed to generate lesson content');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideo = async (imageUrl: string, imageAlt: string) => {
    if (!lesson) return;
    
    setGeneratingVideos(prev => new Set(prev).add(imageUrl));
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType: 'video',
          prompt: `Create an educational video about ${imageAlt}`,
          topic: lesson.learning_path.topic,
          imageUrl
        }),
      });

      if (!response.ok) throw new Error('Failed to generate video');
      
      const { url: videoUrl } = await response.json();

      // Update the lesson description with the video URL
      const updatedDescription = lesson.description.replace(
        `<img src="${imageUrl}" alt="${imageAlt}" class="my-4 rounded-lg shadow-md" />`,
        `<video src="${videoUrl}" controls class="w-full rounded-lg shadow-md my-4" />`
      );

      // Update the lesson in the database
      const updateResponse = await fetch(`/api/learning/path/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          lessonId: lesson.id,
          description: updatedDescription
        }),
      });

      if (!updateResponse.ok) throw new Error('Failed to update lesson');

      // Update local state
      setLesson(prev => prev ? {
        ...prev,
        description: updatedDescription
      } : null);

      toast.success('Video generated successfully');
    } catch (error) {
      console.error('Error generating video:', error);
      toast.error('Failed to generate video');
    } finally {
      setGeneratingVideos(prev => {
        const next = new Set(prev);
        next.delete(imageUrl);
        return next;
      });
    }
  };

  const renderContent = (content: string) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Find all images and add video generation buttons
    const images = Array.from(tempDiv.getElementsByTagName('img'));
    for (const img of images) {
      const wrapper = document.createElement('div');
      wrapper.className = 'space-y-2';
      
      // Move the image into the wrapper
      img.parentNode?.insertBefore(wrapper, img);
      wrapper.appendChild(img);

      // Add video button if no video exists
      if (!img.nextElementSibling?.tagName.toLowerCase().includes('video')) {
        const button = document.createElement('button');
        button.className = 'flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors';
        
        // Check if this image is currently generating a video
        const isGenerating = generatingVideos.has(img.src);
        
        button.innerHTML = isGenerating ? `
          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating Video...
        ` : `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
          Generate Video
        `;
        
        if (!isGenerating) {
          button.onclick = () => generateVideo(img.src, img.alt);
        }
        wrapper.appendChild(button);
      }
    }

    return tempDiv.innerHTML;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href={`/learn/${pathId}`}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Learning Path
          </Link>
          <h1 className="text-3xl font-bold mt-2">{lesson.title}</h1>
          <p className="text-muted-foreground mt-2">
            {lesson.learning_path.title} • Lesson {lesson.order_index}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={generateLessonContent}
            disabled={isGenerating}
          >
            <Wand2 className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Lesson'}
          </Button>
          <Button
            variant={lesson.completed ? "outline" : "default"}
            onClick={() => {/* TODO: Implement lesson completion */}}
          >
            {lesson.completed ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </span>
            ) : (
              'Mark as Complete'
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={contentRef}
            className={`prose prose-sm max-w-none ${
              !isExpanded ? 'max-h-[500px] overflow-hidden relative' : ''
            }`}
          >
            <div 
              dangerouslySetInnerHTML={{ 
                __html: renderContent(lesson.description) 
              }} 
            />
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            )}
          </div>
          {contentRef.current && contentRef.current.scrollHeight > 500 && (
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read More
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          asChild
        >
          <Link href={`/learn/${pathId}`}>
            <ChevronLeft className="h-4 w-4" />
            Previous Lesson
          </Link>
        </Button>
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href={`/learn/${pathId}`}>
            Next Lesson
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
} 