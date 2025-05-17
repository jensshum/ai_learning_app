import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topics } = await req.json();

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: 'Topics array is required' },
        { status: 400 }
      );
    }

    // Generate learning paths for each topic using ChatGPT
    const paths = await Promise.all(
      topics.map(async (topic) => {
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are an expert educator creating a structured learning path for ${topic}. 
              Create a series of lessons that will help users master this topic.
              Return the response as a JSON array of lesson objects, each with a title and description.`
            },
            {
              role: "user",
              content: `Create a learning path for ${topic} with 5-7 lessons.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });

        const lessons = JSON.parse(completion.choices[0].message.content || '[]');

        return {
          id: `path_${topic}_${Math.random().toString(36).substring(2, 9)}`,
          title: `Learn ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
          topic,
          progress: 0,
          lessons: lessons.map((lesson: any, index: number) => ({
            id: `lesson_${index + 1}`,
            title: lesson.title,
            description: lesson.description,
            completed: false,
            order: index + 1
          }))
        };
      })
    );

    return NextResponse.json({
      success: true,
      paths
    });
  } catch (error: any) {
    console.error('Learning path generation error:', error);
    return NextResponse.json(
      { error: 'Failed to create learning path' + error },
      { status: 500 }
    );
  }
} 