export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface Assessment {
    id: string;
    userId: string;
    storyId: string;
    score: number;
    readingSpeed: number;
    comprehensionScore: number;
    accuracyScore: number;
    mistakes: Array<{
        word: string;
        correct: string;
        timestamp: Date;
    }>;
    date: Date;
}

export interface Story {
    id: string;
    title: string;
    content: string;
    level: string;
    tags: string[];
    readingTime: number;
    wordCount: number;
} 