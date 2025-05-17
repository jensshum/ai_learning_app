'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useLearning } from '@/hooks/use-learning';
import { TopicSelector } from '@/components/onboarding/topic-selector';
import { useAuth } from '@/hooks/use-auth';

const AVAILABLE_TOPICS = [
  { id: 'programming', name: 'Programming' },
  { id: 'design', name: 'Design' },
  { id: 'business', name: 'Business' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'data_science', name: 'Data Science' },
  { id: 'art', name: 'Art & Creativity' },
  { id: 'languages', name: 'Languages' },
  { id: 'music', name: 'Music' },
  { id: 'health', name: 'Health & Fitness' },
  { id: 'finance', name: 'Finance' },
  { id: 'cooking', name: 'Cooking' },
  { id: 'photography', name: 'Photography' },
];

export default function CreateLearningPathPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { createLearningPath } = useLearning();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleCreate = async () => {
    const topics = [...selectedTopics];
    if (customTopic.trim()) {
      topics.push(customTopic.trim());
    }
    
    if (topics.length === 0) return;
    
    setIsLoading(true);
    try {
      // Generate learning paths
      const response = await fetch('/api/learning/path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate learning paths');
      }

      const { paths } = await response.json();

      // Save learning paths to Supabase
      const saveResponse = await fetch('/api/learning/path/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          paths,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save learning paths');
      }

      router.push('/learn');
    } catch (error) {
      console.error('Failed to create learning path:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Create Learning Path</CardTitle>
          <CardDescription className="text-center text-lg">
            Choose what you want to learn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select from popular topics</h3>
            <TopicSelector 
              topics={AVAILABLE_TOPICS} 
              selectedTopics={selectedTopics} 
              onToggle={handleTopicToggle}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or enter your own topic
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customTopic">Custom Topic</Label>
            <Input
              id="customTopic"
              placeholder="e.g., Machine Learning, Photography, Spanish Language..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Additional details (optional)</Label>
            <Textarea
              id="description"
              placeholder="Tell us more about your learning goals, experience level, or specific areas you want to focus on..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Our AI will create a personalized learning path with specific outcomes and lessons
              tailored to your interests. You can always modify these later.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push('/learn')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isLoading || (selectedTopics.length === 0 && !customTopic.trim())}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating your learning path
              </>
            ) : (
              'Create Learning Path'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}