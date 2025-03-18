export interface User {
    id: string;
    name: string;
    age: number;
    readingLevel: string;
    progress: number;
}

export interface Story {
    id: string;
    title: string;
    content: string;
    level: string;
}

export interface Assessment {
    id: string;
    userId: string;
    score: number;
    date: Date;
}

export class UserModel {
    constructor(private users: User[]) {}

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    updateUserProgress(id: string, progress: number): void {
        const user = this.getUserById(id);
        if (user) {
            user.progress = progress;
        }
    }
}

export class StoryModel {
    constructor(private stories: Story[]) {}

    getStoriesByLevel(level: string): Story[] {
        return this.stories.filter(story => story.level === level);
    }

    addStory(story: Story): void {
        this.stories.push(story);
    }
}

export class AssessmentModel {
    constructor(private assessments: Assessment[]) {}

    addAssessment(assessment: Assessment): void {
        this.assessments.push(assessment);
    }

    getAssessmentsByUserId(userId: string): Assessment[] {
        return this.assessments.filter(assessment => assessment.userId === userId);
    }
}