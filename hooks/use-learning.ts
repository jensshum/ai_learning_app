'use client';

import { useState } from 'react';

export function useLearning() {
  const [isLoading, setIsLoading] = useState(false);

  // Create learning path based on selected topics
  const createLearningPath = async (topics: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/learning/path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics }),
      });

      if (!response.ok) {
        throw new Error('Failed to create learning path');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to create learning path:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createLearningPath
  };
}