import React from 'react';
import { NextPage } from 'next';
import { Layout } from '../../components/common/Layout';
import { ComprehensionQuestions } from '../../components/assessment/ComprehensionQuestions';
import { Question } from '../../types/assessment';

const DemoAssessmentPage: NextPage = () => {
    const demoQuestions: Question[] = [
        {
            id: '1',
            text: 'What was special about the tree in the story?',
            options: [
                'It was very old',
                'It reached up to the clouds',
                'It had golden leaves',
                'It could talk'
            ],
            correctAnswer: 'It reached up to the clouds'
        },
        {
            id: '2',
            text: 'Where was the tree located?',
            options: [
                'In a magical forest',
                'In a city park',
                'On a mountain',
                'By the ocean'
            ],
            correctAnswer: 'In a magical forest'
        }
    ];

    const handleComplete = (score: number) => {
        console.log('Assessment completed with score:', score);
    };

    return (
        <Layout title="Demo Assessment - WorldReader" description="Try out our reading assessment">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Demo Assessment</h1>
                    <p className="text-gray-600">
                        This is a demo assessment to showcase our reading comprehension features.
                    </p>
                </div>

                <ComprehensionQuestions
                    questions={demoQuestions}
                    onComplete={handleComplete}
                />
            </div>
        </Layout>
    );
};

export default DemoAssessmentPage; 