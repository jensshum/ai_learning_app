import { SocialFeed } from '@/components/social/social-feed';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { PopularTopics } from '@/components/social/popular-topics';
import { SuggestedUsers } from '@/components/social/suggested-users';

export default function SocialPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Social Feed"
        text="Discover what others are learning and share your progress."
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <SocialFeed />
        </div>
        <div className="space-y-6">
          <PopularTopics />
          <SuggestedUsers />
        </div>
      </div>
    </DashboardShell>
  );
}