import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { LearningPathsList } from '@/components/learning/learning-paths-list';
import { RecentActivityFeed } from '@/components/dashboard/recent-activity-feed';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back! Check your learning progress and recent activity."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardStats />
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Learning Paths</h2>
            <LearningPathsList />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <RecentActivityFeed />
      </div>
    </DashboardShell>
  );
}