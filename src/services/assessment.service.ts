import { AssessmentModel, IAssessment } from '../models/schemas/assessment.schema';
import { UserModel } from '../models/schemas/user.schema';
import { StoryModel } from '../models/schemas/story.schema';

export class AssessmentService {
    async createAssessment(assessmentData: {
        userId: string;
        storyId: string;
        readingSpeed: number;
        comprehensionScore: number;
        accuracyScore: number;
        mistakes: Array<{
            word: string;
            correct: string;
            timestamp: Date;
        }>;
    }): Promise<IAssessment> {
        try {
            // Verify user and story exist
            const [user, story] = await Promise.all([
                UserModel.findById(assessmentData.userId),
                StoryModel.findById(assessmentData.storyId)
            ]);

            if (!user || !story) {
                throw new Error('User or Story not found');
            }

            // Calculate overall score
            const score = (assessmentData.comprehensionScore + assessmentData.accuracyScore) / 2;

            const assessment = new AssessmentModel({
                ...assessmentData,
                score,
                completedAt: new Date()
            });

            // Save assessment
            await assessment.save();

            // Update user's progress
            await this.updateUserProgress(assessmentData.userId);

            return assessment;
        } catch (error) {
            throw error;
        }
    }

    async getUserAssessments(userId: string): Promise<IAssessment[]> {
        try {
            return await AssessmentModel.find({ userId })
                .sort({ completedAt: -1 })
                .populate('storyId');
        } catch (error) {
            throw error;
        }
    }

    async getAssessmentById(assessmentId: string): Promise<IAssessment> {
        try {
            const assessment = await AssessmentModel.findById(assessmentId)
                .populate('userId')
                .populate('storyId');
            
            if (!assessment) {
                throw new Error('Assessment not found');
            }

            return assessment;
        } catch (error) {
            throw error;
        }
    }

    private async updateUserProgress(userId: string): Promise<void> {
        try {
            const assessments = await AssessmentModel.find({ userId })
                .sort({ completedAt: -1 })
                .limit(5);

            if (assessments.length === 0) return;

            // Calculate average score from recent assessments
            const averageScore = assessments.reduce((sum: number, assessment: IAssessment) => 
                sum + assessment.score, 0) / assessments.length;

            // Update user's progress
            await UserModel.findByIdAndUpdate(userId, {
                progress: Math.round(averageScore)
            });

            // Check if user should level up
            await this.checkAndUpdateReadingLevel(userId, averageScore);
        } catch (error) {
            throw error;
        }
    }

    private async checkAndUpdateReadingLevel(userId: string, averageScore: number): Promise<void> {
        try {
            const user = await UserModel.findById(userId);
            if (!user) return;

            let newLevel = user.readingLevel;

            // Logic for level progression
            if (averageScore >= 90) {
                if (user.readingLevel === 'beginner') {
                    newLevel = 'intermediate';
                } else if (user.readingLevel === 'intermediate') {
                    newLevel = 'advanced';
                }
            }

            if (newLevel !== user.readingLevel) {
                await UserModel.findByIdAndUpdate(userId, { readingLevel: newLevel });
            }
        } catch (error) {
            throw error;
        }
    }
} 