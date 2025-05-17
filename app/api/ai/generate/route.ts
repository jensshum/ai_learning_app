import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { fal } from "@fal-ai/client";
export const dynamic = 'force-dynamic';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize fal.ai client
fal.config({
  credentials: process.env.FAL_AI_KEY
});

interface GeneratedImage {
  url: string;
  alt: string;
}

export async function POST(req: Request) {
  try {
    const { contentType, prompt, topic, imageUrl } = await req.json();

    if (!contentType || !prompt || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    let result;
    switch (contentType) {
      case 'text':
        // Generate text content using ChatGPT
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are an expert educator creating content about ${topic}. 
              Create engaging, informative content that helps users learn about this topic.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });

        const generatedText = completion.choices[0].message.content;
        console.log("truncated generated text", generatedText?.slice(0, 100));
        
        // Extract image tags and generate images
        const imageRegex = /\[?<(?:image|img)\s+(?:alt=["']([^"']+)["']|src=["'][^"']+["']\s+alt=["']([^"']+)["'])\s*>\]?/g;
        const imageMatches = [...generatedText.matchAll(imageRegex)];
        const generatedImages: GeneratedImage[] = [];

        console.log("num of matches", imageMatches.length);
        for (const match of imageMatches) {
          // Use the first non-null capture group (either alt from <image> or alt from <img>)
          const imageDescription = match[1] || match[2];
          try {
            const imageResult = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
              input: {
                prompt: imageDescription
              },
              logs: true,
              onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                  update.logs.map((log) => log.message).forEach(console.log);
                }
              },
            });
            console.log("image result", imageResult);
            generatedImages.push({
              url: imageResult.data.images[0].url,
              alt: imageDescription
            });
          } catch (error) {
            console.error('Failed to generate image:', error);
          }
        }

        // Replace image tags with actual image URLs
        let finalText = generatedText;
        generatedImages.forEach((image, index) => {
          // Replace both <image> and <img> tags, with or without square brackets
          finalText = finalText.replace(
            new RegExp(`\\[?<(?:image|img)\\s+(?:alt=["']${image.alt}["']|src=["'][^"']+["']\\s+alt=["']${image.alt}["'])\\s*>\\]?`),
            `<img src="${image.url}" alt="${image.alt}" class="my-4 rounded-lg shadow-md" />`
          );
        });
        
        return NextResponse.json({
          html: `<h2>${topic}</h2>${finalText}`,
          text: finalText,
          images: generatedImages,
          prompt,
          topic
        });

      case 'image':
        // Generate image using fal.ai
        result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
          input: {
            prompt: prompt
          },
          logs: true,
          onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
              update.logs.map((log) => log.message).forEach(console.log);
            }
          },
        });

        return NextResponse.json({
          url: result.data.images[0].url,
          alt: `AI-generated image about ${topic}`,
          prompt,
          topic
        });

      case 'video':
        // Generate video using fal.ai
        
        if (imageUrl) {
          // Image-to-video conversion
          console.log("GENERATING VIDEO FROM IMAGE", imageUrl);
          result = await fal.subscribe("fal-ai/minimax/video-01/image-to-video", {
            input: {
              prompt: `${prompt}`,
              image_url: imageUrl
            },
            logs: true,
            onQueueUpdate: (update) => {
              if (update.status === "IN_PROGRESS") {
                update.logs.map((log) => log.message).forEach(console.log);
              }
            },
          });
        } else {
          // Regular video generation
          result = await fal.subscribe("fal-ai/minimax/video-01", {
            input: {
              prompt: `${prompt}`
            },
            logs: true,
            onQueueUpdate: (update) => {
              if (update.status === "IN_PROGRESS") {
                update.logs.map((log) => log.message).forEach(console.log);
              }
            },
          });
        }

        return NextResponse.json({
          url: result.data.video.url,
          thumbnail: result.data.video.url,
          prompt,
          topic,
          sourceImage: imageUrl || null
        });

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 