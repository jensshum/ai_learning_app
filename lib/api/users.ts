// This file contains mock API functions that would typically call your backend
// In a real implementation, these would make fetch requests to your API

// Mock user profile data
const MOCK_USER_PROFILES = {
  'user_123': {
    id: 'user_123',
    name: 'Demo User',
    email: 'demo@example.com',
    bio: 'Passionate learner and software developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo@example.com',
    joinedDate: '2023-01-15T00:00:00Z',
    followersCount: 52,
    followingCount: 87,
    isCurrentUser: true,
    isFollowing: false,
    learningPaths: [
      { id: 'path_1', title: 'JavaScript Fundamentals', progress: 65 },
      { id: 'path_2', title: 'UI/UX Design Basics', progress: 30 }
    ],
    content: [
      {
        id: 'post_1',
        type: 'text',
        title: 'What I Learned About JavaScript Promises',
        preview: 'Promises in JavaScript are a powerful way to handle asynchronous operations...',
        date: '2023-03-10T10:30:00Z',
        likes: 24,
        comments: 8
      },
      {
        id: 'post_2',
        type: 'image',
        title: 'Data Visualization Cheat Sheet',
        imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
        date: '2023-02-25T14:15:00Z',
        likes: 42,
        comments: 5
      }
    ]
  }
};

// Get user profile
export async function getUserProfile(userId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return the user profile if it exists
  return MOCK_USER_PROFILES[userId as keyof typeof MOCK_USER_PROFILES] || null;
}

// Get user content
export async function getUserContent(userId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = MOCK_USER_PROFILES[userId as keyof typeof MOCK_USER_PROFILES];
  return user ? user.content : [];
}

// Get user learning paths
export async function getUserLearningPaths(userId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = MOCK_USER_PROFILES[userId as keyof typeof MOCK_USER_PROFILES];
  return user ? user.learningPaths : [];
}

// Follow a user
export async function followUser(userId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would update the database in a real implementation
  return { success: true };
}

// Unfollow a user
export async function unfollowUser(userId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would update the database in a real implementation
  return { success: true };
}