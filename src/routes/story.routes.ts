import { Router, Response } from 'express';
import { StoryService } from '../services/story.service';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const storyService = new StoryService();

// Get all stories by level
router.get('/level/:level', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const stories = await storyService.getStoriesByLevel(req.params.level);
        res.json(stories);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Get recommended stories for user
router.get('/recommended', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const stories = await storyService.getRecommendedStories(req.user.userId);
        res.json(stories);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Get story by ID
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const story = await storyService.getStoryById(req.params.id);
        res.json(story);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
});

// Search stories
router.get('/search', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { query, level } = req.query;
        if (!query) {
            throw new Error('Search query is required');
        }
        const stories = await storyService.searchStories(query as string, level as string);
        res.json(stories);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Create new story (admin only)
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const story = await storyService.createStory(req.body);
        res.status(201).json(story);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

export default router; 