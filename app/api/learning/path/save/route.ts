  import { NextResponse } from 'next/server';
  import { createClient } from '@supabase/supabase-js';

  interface LearningPath {
    id: string;
    user_id: string;
    title: string;
    topic: string;
    progress: number;
    created_at: string;
    updated_at: string;
    lessons: Lesson[];
  }

  interface Lesson {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    order_index: number;
    created_at: string;
  }

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  export async function GET(req: Request) {
    try {
      // Get query params
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
      const lessonId = searchParams.get('lessonId');

      // If lessonId is provided, fetch a single lesson
      if (lessonId) {
        const { data: lesson, error: lessonError } = await supabase
          .from('lessons')
          .select(`
            *,
            learning_path:learning_paths (
              id,
              title,
              topic,
              user_id
            )
          `)
          .eq('id', lessonId)
          .single();

        if (lessonError) throw lessonError;

        // Check if the lesson belongs to the user
        if (userId && lesson.learning_path.user_id !== userId) {
          return NextResponse.json(
            { error: 'Unauthorized access to lesson' },
            { status: 403 }
          );
        }

        return NextResponse.json({
          success: true,
          lesson: {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            completed: lesson.completed,
            order: lesson.order_index,
            created_at: lesson.created_at,
            learning_path: {
              id: lesson.learning_path.id,
              title: lesson.learning_path.title,
              topic: lesson.learning_path.topic
            }
          }
        });
      }

      // If no lessonId, fetch all learning paths for the user
      if (!userId) {
        return NextResponse.json(
          { error: 'User ID is required' },
          { status: 400 }
        );
      }

      // Fetch learning paths with their lessons
      const { data: learningPaths, error: pathsError } = await supabase
        .from('learning_paths')
        .select(`
          *,
          lessons:lessons (
            id,
            title,
            description,
            completed,
            order_index,
            created_at
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (pathsError) throw pathsError;

      // Transform the data to match the expected format
      const transformedPaths = learningPaths.map((path: LearningPath) => ({
        id: path.id,
        title: path.title,
        topic: path.topic,
        progress: path.progress,
        created_at: path.created_at,
        updated_at: path.updated_at,
        lessons: path.lessons.map((lesson: Lesson) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          completed: lesson.completed,
          order: lesson.order_index,
          created_at: lesson.created_at
        }))
      }));

      return NextResponse.json({
        success: true,
        paths: transformedPaths
      });
    } catch (error: any) {
      console.error('Failed to fetch data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
      );
    }
  }

  export async function POST(req: Request) {
    try {
      const { userId, paths, lessonId, description } = await req.json();

      // Handle single lesson update
      if (lessonId && description) {
        if (!userId) {
          return NextResponse.json(
            { error: 'User ID is required' },
            { status: 400 }
          );
        }

        // Update the lesson
        const { data: lesson, error: updateError } = await supabase
          .from('lessons')
          .update({ description })
          .eq('id', lessonId)
          .select()
          .single();

        if (updateError) throw updateError;

        return NextResponse.json({
          success: true,
          lesson
        });
      }

      // Handle learning paths creation
      if (!userId || !paths || !Array.isArray(paths)) {
        return NextResponse.json(
          { error: 'Invalid request data' },
          { status: 400 }
        );
      }

      // Save each learning path and its lessons
      const savedPaths = await Promise.all(
        paths.map(async (path) => {
          // Insert learning path
          const { data: learningPath, error: pathError } = await supabase
            .from('learning_paths')
            .insert({
              user_id: userId,
              title: path.title,
              topic: path.topic,
              progress: path.progress
            })
            .select()
            .single();

          if (pathError) throw pathError;

          // Insert lessons
          const { error: lessonsError } = await supabase
            .from('lessons')
            .insert(
              path.lessons.map((lesson: any) => ({
                learning_path_id: learningPath.id,
                title: lesson.title,
                description: lesson.description,
                completed: lesson.completed,
                order_index: lesson.order
              }))
            );

          if (lessonsError) throw lessonsError;

          return {
            ...learningPath,
            lessons: path.lessons
          };
        })
      );

      return NextResponse.json({
        success: true,
        paths: savedPaths
      });
    } catch (error: any) {
      console.error('Failed to save learning paths:', error);
      return NextResponse.json(
        { error: 'Failed to save learning paths' },
        { status: 500 }
      );
    }
  } 