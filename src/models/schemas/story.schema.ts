import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
    title: string;
    content: string;
    level: string;
    tags: string[];
    readingTime: number;
    wordCount: number;
}

const StorySchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    level: { 
        type: String, 
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true 
    },
    tags: [{ type: String }],
    readingTime: { type: Number, required: true }, // in minutes
    wordCount: { type: Number, required: true }
}, {
    timestamps: true
});

// Index for efficient querying
StorySchema.index({ level: 1, tags: 1 });

// Virtual for calculating estimated completion time based on reading level
StorySchema.virtual('estimatedCompletionTime').get(function() {
    const levelMultiplier = {
        beginner: 2,
        intermediate: 1.5,
        advanced: 1
    };
    return this.readingTime * (levelMultiplier[this.level as keyof typeof levelMultiplier]);
});

export const StoryModel = mongoose.model<IStory>('Story', StorySchema); 