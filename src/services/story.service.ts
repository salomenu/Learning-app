import { StoryModel, IStory } from '../models/schemas/story.schema';
import { UserModel, IUser } from '../models/schemas/user.schema';

export class StoryService {
    async createStory(storyData: {
        title: string;
        content: string;
        level: string;
        tags: string[];
        readingTime: number;
    }): Promise<IStory> {
        try {
            const wordCount = storyData.content.split(/\s+/).length;
            const story = new StoryModel({
                ...storyData,
                wordCount
            });
            return await story.save();
        } catch (error) {
            throw error;
        }
    }

    async getStoriesByLevel(level: string): Promise<IStory[]> {
        try {
            return await StoryModel.find({ level });
        } catch (error) {
            throw error;
        }
    }

    async getRecommendedStories(userId: string): Promise<IStory[]> {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Get stories matching user's reading level
            const stories = await StoryModel.find({ 
                level: user.readingLevel 
            }).limit(5);

            return stories;
        } catch (error) {
            throw error;
        }
    }

    async getStoryById(storyId: string): Promise<IStory> {
        try {
            const story = await StoryModel.findById(storyId);
            if (!story) {
                throw new Error('Story not found');
            }
            return story;
        } catch (error) {
            throw error;
        }
    }

    async searchStories(query: string, level?: string): Promise<IStory[]> {
        try {
            const searchQuery: any = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { tags: { $regex: query, $options: 'i' } }
                ]
            };

            if (level) {
                searchQuery.level = level;
            }

            return await StoryModel.find(searchQuery).limit(10);
        } catch (error) {
            throw error;
        }
    }
} 