"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LearningProgressProps {
  progress: {
    completed: number
    total: number
  }
}

export function LearningProgress({ progress }: LearningProgressProps) {
  const percentComplete = Math.round((progress.completed / progress.total) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress value={percentComplete} />
          <p className="text-sm text-muted-foreground">
            {progress.completed} of {progress.total} lessons completed
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{percentComplete}%</p>
          <p className="text-sm text-muted-foreground">Complete</p>
        </div>
      </CardContent>
    </Card>
  )
}