'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAI } from '@/hooks/use-ai';
import { Loader2, FileText, Image, Video } from 'lucide-react';

export default function CreatePage() {
  const router = useRouter();
  const { generateContent } = useAI();
  const [contentType, setContentType] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [topic, setTopic] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt || !topic) return;
    
    setIsLoading(true);
    try {
      const content = await generateContent(contentType, prompt, topic);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedContent) return;
    
    setIsLoading(true);
    try {
      // Publish the generated content
      // API call would go here
      router.push('/social');
    } catch (error) {
      console.error('Failed to publish content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Create Content</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate AI Content</CardTitle>
          <CardDescription>
            Create text, images, or videos powered by AI for your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="text" value={contentType} onValueChange={setContentType}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Text
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Image className="h-4 w-4" /> Image
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" /> Video
              </TabsTrigger>
            </TabsList>
            
            <div className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="data_science">Data Science</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder={`Describe what ${contentType} you want to generate...`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32"
                />
              </div>
              
              {contentType === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select defaultValue="realistic">
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="3d">3D Render</SelectItem>
                      <SelectItem value="sketch">Sketch</SelectItem>
                      <SelectItem value="watercolor">Watercolor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {contentType === 'video' && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select defaultValue="short">
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (5-10s)</SelectItem>
                      <SelectItem value="medium">Medium (10-30s)</SelectItem>
                      <SelectItem value="long">Long (30-60s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="public" 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
                <Label htmlFor="public">Make this content public</Label>
              </div>
            </div>
          </Tabs>
          
          {generatedContent && (
            <div className="mt-6 p-4 border rounded-md">
              <h3 className="font-medium mb-2">Generated Content Preview</h3>
              {contentType === 'text' && (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: generatedContent.html }} />
                </div>
              )}
              {contentType === 'image' && (
                <div className="flex justify-center">
                  <img 
                    src={generatedContent.url} 
                    alt="AI Generated" 
                    className="max-h-80 rounded-md" 
                  />
                </div>
              )}
              {contentType === 'video' && (
                <div className="flex justify-center">
                  <video 
                    src={generatedContent.url} 
                    controls 
                    className="max-h-80 w-full rounded-md"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {!generatedContent ? (
            <Button onClick={handleGenerate} disabled={isLoading || !prompt || !topic}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating
                </>
              ) : (
                'Generate Content'
              )}
            </Button>
          ) : (
            <Button onClick={handlePublish} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing
                </>
              ) : (
                'Publish Content'
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}