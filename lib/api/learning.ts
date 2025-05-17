// This file contains mock API functions that would typically call your backend
// In a real implementation, these would make fetch requests to your API

// Mock learning paths data
const MOCK_LEARNING_PATHS = [
  {
    id: 'path_1',
    title: 'Learn JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming',
    topic: 'programming',
    progress: 65,
    lessons: [
      { id: 'lesson_1', title: 'Variables and Data Types', completed: true },
      { id: 'lesson_2', title: 'Functions and Scope', completed: true },
      { id: 'lesson_3', title: 'Arrays and Objects', completed: true },
      { id: 'lesson_4', title: 'Control Flow', completed: false },
      { id: 'lesson_5', title: 'Error Handling', completed: false }
    ]
  },
  {
    id: 'path_2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of good user interface design',
    topic: 'design',
    progress: 30,
    lessons: [
      { id: 'lesson_1', title: 'Design Principles', completed: true },
      { id: 'lesson_2', title: 'Color Theory', completed: true },
      { id: 'lesson_3', title: 'Typography', completed: false },
      { id: 'lesson_4', title: 'Layout and Composition', completed: false },
      { id: 'lesson_5', title: 'User Research', completed: false }
    ]
  },
  {
    id: 'path_3',
    title: 'Data Science Basics',
    description: 'Introduction to data analysis and visualization',
    topic: 'data_science',
    progress: 10,
    lessons: [
      { id: 'lesson_1', title: 'Introduction to Python', completed: true },
      { id: 'lesson_2', title: 'Data Manipulation with Pandas', completed: false },
      { id: 'lesson_3', title: 'Data Visualization', completed: false },
      { id: 'lesson_4', title: 'Statistical Analysis', completed: false },
      { id: 'lesson_5', title: 'Machine Learning Basics', completed: false }
    ]
  }
];

// Mock lessons data
const MOCK_LESSONS = {
  'lesson_1': {
    id: 'lesson_1',
    title: 'Variables and Data Types',
    content: `
      <h1>Variables and Data Types in JavaScript</h1>
      <p>In JavaScript, variables are used to store data that can be used and manipulated throughout your program.</p>
      <h2>Declaring Variables</h2>
      <p>There are three ways to declare variables in JavaScript:</p>
      <ul>
        <li><strong>var</strong>: The traditional way (function scoped)</li>
        <li><strong>let</strong>: Block-scoped variable that can be reassigned</li>
        <li><strong>const</strong>: Block-scoped variable that cannot be reassigned</li>
      </ul>
      <pre><code>
// Using var
var name = "John";

// Using let
let age = 25;

// Using const
const PI = 3.14159;
      </code></pre>
      <h2>Data Types</h2>
      <p>JavaScript has several built-in data types:</p>
      <ul>
        <li><strong>String</strong>: For text values</li>
        <li><strong>Number</strong>: For numeric values</li>
        <li><strong>Boolean</strong>: true or false</li>
        <li><strong>Object</strong>: For complex data structures</li>
        <li><strong>Array</strong>: For lists of values</li>
        <li><strong>null</strong>: Represents intentional absence of value</li>
        <li><strong>undefined</strong>: Represents unintentionally missing value</li>
      </ul>
    `,
    nextLessonId: 'lesson_2',
    prevLessonId: null,
    completed: true,
    resources: [
      { type: 'video', title: 'JavaScript Variables Explained', url: '#' },
      { type: 'article', title: 'Understanding JavaScript Data Types', url: '#' }
    ],
    exercises: [
      { id: 'ex1', title: 'Variable Declaration Practice', description: 'Create variables using let, const, and var' },
      { id: 'ex2', title: 'Type Conversion', description: 'Practice converting between different data types' }
    ],
    comments: [
      { id: 'comment1', user: 'Alex', text: 'This lesson was really clear!', date: '2023-04-10T10:30:00Z' },
      { id: 'comment2', user: 'Maya', text: 'I had trouble understanding null vs undefined at first.', date: '2023-04-11T14:15:00Z' }
    ]
  }
};

// Get all learning paths
export async function getLearningPaths() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_LEARNING_PATHS;
}

// Get a specific learning path
export async function getLearningPath(pathId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_LEARNING_PATHS.find(path => path.id === pathId);
}

// Get a specific lesson
export async function getLesson(pathId: string, lessonId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_LESSONS[lessonId as keyof typeof MOCK_LESSONS];
}

// Mark a lesson as completed
export async function markLessonCompleted(pathId: string, lessonId: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would update the database in a real implementation
  return { success: true };
}