'use client';

import { useState } from 'react';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);

  // Generate content using AI
  const generateContent = async (contentType: string, prompt: string, topic: string, imageUrl?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          prompt,
          topic,
          imageUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to generate content:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateContent
  };
}