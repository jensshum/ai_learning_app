import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface LearningPathHeaderProps {
  title: string
  description: string
  topic: string
}

export function LearningPathHeader({ title, description, topic }: LearningPathHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {topic}
        </Badge>
      </div>
      <Separator />
    </div>
  )
}