"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  image: string;
  title: string;
  following: boolean;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alex Rivera",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "Full Stack Developer",
    following: false
  },
  {
    id: "2",
    name: "Emma Wilson",
    image: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "UX Designer",
    following: false
  },
  {
    id: "3",
    name: "David Kim",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100",
    title: "DevOps Engineer",
    following: false
  }
];

export function SuggestedUsers() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const toggleFollow = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, following: !user.following } : user
    ));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Suggested Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <img src={user.image} alt={user.name} className="rounded-full" />
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.title}</p>
              </div>
            </div>
            <Button
              variant={user.following ? "secondary" : "default"}
              size="sm"
              onClick={() => toggleFollow(user.id)}
            >
              {user.following ? "Following" : "Follow"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}