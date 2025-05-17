import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"

type ActivityItem = {
  id: string
  type: string
  title: string
  timestamp: string
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "lesson_completed",
    title: "Completed Introduction to React",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    type: "path_started",
    title: "Started Frontend Development Path",
    timestamp: "1 day ago"
  },
  {
    id: "3",
    type: "achievement_earned",
    title: "Earned JavaScript Basics Badge",
    timestamp: "3 days ago"
  }
]

export function RecentActivityFeed() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Recent Activity</h3>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}