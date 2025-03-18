import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessment extends Document {
    userId: mongoose.Types.ObjectId;
    storyId: mongoose.Types.ObjectId;
    score: number;
    readingSpeed: number;  // words per minute
    comprehensionScore: number;  // percentage
    accuracyScore: number;  // percentage
    completedAt: Date;
    mistakes: Array<{
        word: string;
        correct: string;
        timestamp: Date;
    }>;
}

const AssessmentSchema: Schema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    storyId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Story', 
        required: true 
    },
    score: { 
        type: Number, 
        required: true,
        min: 0,
        max: 100 
    },
    readingSpeed: { 
        type: Number, 
        required: true 
    },
    comprehensionScore: { 
        type: Number, 
        required: true,
        min: 0,
        max: 100 
    },
    accuracyScore: { 
        type: Number, 
        required: true,
        min: 0,
        max: 100 
    },
    completedAt: { 
        type: Date, 
        default: Date.now 
    },
    mistakes: [{
        word: String,
        correct: String,
        timestamp: Date
    }]
}, {
    timestamps: true
});

// Index for efficient querying
AssessmentSchema.index({ userId: 1, completedAt: -1 });

// Virtual for calculating overall performance
AssessmentSchema.virtual('overallPerformance').get(function() {
    return {
        reading: this.readingSpeed,
        comprehension: this.comprehensionScore,
        accuracy: this.accuracyScore,
        total: (this.comprehensionScore + this.accuracyScore) / 2
    };
});

export const AssessmentModel = mongoose.model<IAssessment>('Assessment', AssessmentSchema); 