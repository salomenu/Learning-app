import { Router } from 'express';
import IndexController from '../controllers/index';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app) {
    app.use('/api/start-assessment', indexController.startAssessment);
    app.use('/api/recommend-stories', indexController.getRecommendedStories);
    app.use('/api/update-progress', indexController.updateProgress);
}