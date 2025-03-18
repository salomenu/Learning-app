export interface UserType {
    id: string;
    name: string;
    age: number;
    readingLevel: string;
    progress: number;
}

export interface StoryType {
    id: string;
    title: string;
    content: string;
    level: string;
}

export interface AssessmentType {
    id: string;
    userId: string;
    score: number;
    date: Date;
}