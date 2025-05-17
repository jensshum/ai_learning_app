"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface Post {
  id: string;
  author: {
    name: string;
    image: string;
    reaction: string;
  };
  content: string;
  lessonTitle: string;
  topic: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface LearningPath {
  id: string;
  title: string;
  topic: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  learning_path?: {
    topic: string;
  };
}

const MOCK_AUTHORS = [
  {
    name: "Sarah Chen",
    image: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100",
    reaction: "I just learned about this, so awesome! 🎉"
  },
  {
    name: "Marcus Johnson",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100",
    reaction: "I've been struggling with this. Can anyone explain? 🤔"
  },
  {
    name: "Emma Rodriguez",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    reaction: "This is exactly what I needed! Thanks for sharing! 🙌"
  },
  {
    name: "Alex Kim",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    reaction: "Mind blown! Never thought about it this way before 💡"
  }
];

export function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const truncateContent = (content: string, postId: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || '';
    const lines = text.split('\n');
    
    if (lines.length <= 10 || expandedPosts.has(postId)) {
      return content;
    }

    const truncatedLines = lines.slice(0, 10);
    const truncatedContent = truncatedLines.join('\n') + '\n...';
    
    // Preserve HTML structure while truncating text
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    let currentLine = 0;
    let truncatedHtml = '';

    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        const nodeLines = text.split('\n');
        
        if (currentLine + nodeLines.length <= 10) {
          truncatedHtml += text;
          currentLine += nodeLines.length;
        } else {
          const remainingLines = 10 - currentLine;
          truncatedHtml += nodeLines.slice(0, remainingLines).join('\n') + '\n...';
          currentLine = 10;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        truncatedHtml += `<${element.tagName.toLowerCase()}`;
        
        // Copy attributes
        Array.from(element.attributes).forEach(attr => {
          truncatedHtml += ` ${attr.name}="${attr.value}"`;
        });
        
        truncatedHtml += '>';
        
        // Process child nodes
        Array.from(node.childNodes).forEach(processNode);
        
        truncatedHtml += `</${element.tagName.toLowerCase()}>`;
      }
    };

    Array.from(doc.body.childNodes).forEach(processNode);
    return truncatedHtml;
  };

  const toggleExpand = (postId: string) => {
    setExpandedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  useEffect(() => {
    const fetchLearningPaths = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`/api/learning/path/save?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch learning paths');
        
        const { paths } = await response.json();
        
        // Get random lessons from the paths
        const randomLessons = paths
          .flatMap((path: LearningPath) => path.lessons)
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);

        // Create posts from the lessons
        const newPosts = randomLessons.map((lesson: Lesson, index: number) => ({
          id: lesson.id,
          author: MOCK_AUTHORS[index % MOCK_AUTHORS.length],
          content: lesson.description,
          lessonTitle: lesson.title,
          topic: lesson.learning_path?.topic || "Learning",
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 20),
          timestamp: `${Math.floor(Math.random() * 24)}h ago`
        }));

        setPosts(newPosts);
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      }
    };

    fetchLearningPaths();
  }, [user?.id]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.content;
        const lineCount = (tempDiv.textContent || '').split('\n').length;
        const isTruncated = lineCount > 10;

        return (
          <Card key={post.id} className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-12 h-12">
                <img src={post.author.image} alt={post.author.name} className="rounded-full" />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{post.lessonTitle}</span>
                      <span>•</span>
                      <span>{post.topic}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{post.timestamp}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground italic">
                  {post.author.reaction}
                </p>
                <div 
                  className="mt-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: truncateContent(post.content, post.id)
                  }} 
                />
                {isTruncated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 flex items-center gap-2"
                    onClick={() => toggleExpand(post.id)}
                  >
                    {expandedPosts.has(post.id) ? (
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
                <div className="mt-4 flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}