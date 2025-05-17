import { CheckCircle2, BrainCircuit, Users, ImageIcon, Video, FileText, RefreshCw, Sparkles } from 'lucide-react';

export default function LandingFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              AI-Powered Learning, Simplified
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              LearnSync combines AI technology with proven learning methods to help you master any subject
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">Personalized Learning</h3>
              <p className="text-muted-foreground">
                AI generates custom learning paths based on your interests, goals, and learning style
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">Social Learning</h3>
              <p className="text-muted-foreground">
                Connect with others learning similar topics and share your progress
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">AI Content Generation</h3>
              <p className="text-muted-foreground">
                Create custom learning materials with AI-generated text explanations
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">Visual Learning</h3>
              <p className="text-muted-foreground">
                Generate images and diagrams to enhance your understanding
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Video className="h-6 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">Video Explanations</h3>
              <p className="text-muted-foreground">
                Create AI-generated videos to explain complex concepts
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">Adaptive Learning</h3>
              <p className="text-muted-foreground">
                Content adjusts to your progress and mastery of concepts
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-1 rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Powered by ChatGPT and fal.ai</span>
          </div>
        </div>
      </div>
    </section>
  );
}