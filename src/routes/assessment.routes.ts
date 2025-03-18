import { Router, Response } from 'express';
import { AssessmentService } from '../services/assessment.service';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const assessmentService = new AssessmentService();

// Create new assessment
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const assessment = await assessmentService.createAssessment({
            ...req.body,
            userId: req.user.userId
        });
        res.status(201).json(assessment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Get user's assessments
router.get('/user', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const assessments = await assessmentService.getUserAssessments(req.user.userId);
        res.json(assessments);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Get specific assessment
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const assessment = await assessmentService.getAssessmentById(req.params.id);
        res.json(assessment);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
});

export default router; 