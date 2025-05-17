import { notFound } from 'next/navigation';
import { getUserProfile } from '@/lib/api/users';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { UserProfileHeader } from '@/components/profile/user-profile-header';
import { UserContent } from '@/components/profile/user-content';
import { UserLearningPaths } from '@/components/profile/user-learning-paths';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export async function generateStaticParams() {
  // In a real application, you would fetch this from your database
  // For now, we'll include some mock user IDs
  return [
    { userId: 'user_123' },
    { userId: 'user_456' },
    { userId: 'user_789' }
  ];
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getUserProfile(params.userId);
  
  if (!profile) {
    return notFound();
  }

  return (
    <DashboardShell>
      <UserProfileHeader 
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
        joinedDate={profile.joinedDate}
        followersCount={profile.followersCount}
        followingCount={profile.followingCount}
        isCurrentUser={profile.isCurrentUser}
        isFollowing={profile.isFollowing}
      />
      
      <div className="mt-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="mt-4">
            <UserContent userId={params.userId} />
          </TabsContent>
          <TabsContent value="learning" className="mt-4">
            <UserLearningPaths userId={params.userId} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}