'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Users } from "lucide-react";
import { useState } from "react";

interface UserProfileHeaderProps {
  name: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  isCurrentUser: boolean;
  isFollowing: boolean;
}

export function UserProfileHeader({
  name,
  bio,
  avatar,
  joinedDate,
  followersCount,
  followingCount,
  isCurrentUser,
  isFollowing,
}: UserProfileHeaderProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [followers, setFollowers] = useState(followersCount);

  const handleFollow = async () => {
    // Toggle following state optimistically
    setFollowing(!following);
    setFollowers(following ? followers - 1 : followers + 1);
    
    // Here you would typically make an API call to update the follow status
    // If the API call fails, revert the optimistic update
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Joined {joinedDate}
              </p>
            </div>
            
            {!isCurrentUser && (
              <Button
                onClick={handleFollow}
                variant={following ? "outline" : "default"}
              >
                {following ? "Following" : "Follow"}
              </Button>
            )}
          </div>
          
          <p className="mt-4 text-gray-700">{bio}</p>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">{followers} followers</span>
            </div>
            <div className="text-sm font-medium">
              {followingCount} following
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}