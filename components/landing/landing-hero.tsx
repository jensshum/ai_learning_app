import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6 space-y-10 md:space-y-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Master Any Skill 
              </span>
              <br />
              with AI-Powered Learning
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Personalized learning experiences that adapt to your interests and goals.
              Learn faster, remember more, and connect with others on the same journey.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="animate-fade-up">
              <Link href="/sign-up">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl items-center gap-6 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Programming Path</h3>
                  <p className="text-muted-foreground">AI-generated learning path for JavaScript beginners</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded border p-2">
                    <div className="text-xs text-muted-foreground">Lessons</div>
                    <div className="font-medium">12/20</div>
                  </div>
                  <div className="rounded border p-2">
                    <div className="text-xs text-muted-foreground">Hours</div>
                    <div className="font-medium">8.5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">AI</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">LearnSync Assistant</span>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    Here's your custom lesson on JavaScript Promises.
                    I've created examples based on your learning style
                    and the projects you're interested in.
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="rounded-lg bg-primary/10 p-3 text-sm text-primary">
                    Thanks! Could you explain async/await next?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}