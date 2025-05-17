'use client';

import { cn } from '@/lib/utils';

interface Topic {
  id: string;
  name: string;
}

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopics: string[];
  onToggle: (topicId: string) => void;
}

export function TopicSelector({ topics, selectedTopics, onToggle }: TopicSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onToggle(topic.id)}
          className={cn(
            "relative flex h-24 flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 transition-colors hover:border-primary",
            selectedTopics.includes(topic.id) && "border-primary bg-primary/10"
          )}
          type="button"
        >
          {selectedTopics.includes(topic.id) && (
            <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="sr-only">Selected</span>
            </span>
          )}
          <span className="text-center font-medium">{topic.name}</span>
        </button>
      ))}
    </div>
  );
}