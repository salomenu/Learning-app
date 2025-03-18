export interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    readingLevel: 'beginner' | 'intermediate' | 'advanced';
    progress: number;
}

export interface Story {
    id: string;
    title: string;
    content: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    readingTime: number;
    wordCount: number;
}

export interface Assessment {
    id: string;
    userId: string;
    storyId: string;
    score: number;
    readingSpeed: number;
    comprehensionScore: number;
    accuracyScore: number;
    completedAt: Date;
    mistakes: Array<{
        word: string;
        correct: string;
        timestamp: Date;
    }>;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ApiError {
    message: string;
    status?: number;
} 