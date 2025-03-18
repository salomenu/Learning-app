import React, { useState } from 'react';
import { NextPage } from 'next';
import { Layout } from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { Story, Assessment, Question } from '../../types/assessment';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { ComprehensionQuestions } from '../../components/assessment/ComprehensionQuestions';

const AssessmentPage: NextPage = () => {
    const { user } = useAuth();
    const [story] = useState<Story>({
        id: '1',
        title: 'The Magic Tree House',
        content: 'Once upon a time in a magical forest, there stood an ancient tree that reached up to the clouds.',
        level: 'beginner',
        tags: ['adventure', 'magic'],
        readingTime: 5,
        wordCount: 500
    });
    const [assessment, setAssessment] = useState<Partial<Assessment>>({
        userId: user?.id,
        storyId: story.id,
        score: 0,
        readingSpeed: 0,
        comprehensionScore: 0,
        accuracyScore: 0,
        mistakes: []
    });
    const [error, setError] = useState<string | null>(null);
    const [recordedText, setRecordedText] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [showQuestions, setShowQuestions] = useState(false);
    const [questions] = useState<Question[]>([
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
    ]);

    const calculateScore = (transcript: string) => {
        const endTime = Date.now();
        const timeElapsed = startTime ? (endTime - startTime) / 1000 : 0; // seconds
        const words = transcript.split(' ').length;
        const readingSpeed = Math.round((words / timeElapsed) * 60); // words per minute

        // Simple string similarity for accuracy
        const storyWords = story.content.toLowerCase().split(' ');
        const transcriptWords = transcript.toLowerCase().split(' ');
        let correctWords = 0;
        const mistakes: Array<{ word: string; correct: string; timestamp: Date }> = [];

        transcriptWords.forEach((word, index) => {
            if (storyWords[index] === word) {
                correctWords++;
            } else if (storyWords[index]) {
                mistakes.push({
                    word,
                    correct: storyWords[index],
                    timestamp: new Date()
                });
            }
        });

        const accuracyScore = Math.round((correctWords / storyWords.length) * 100);
        const comprehensionScore = accuracyScore; // In a real app, this would be based on comprehension questions

        setAssessment({
            ...assessment,
            score: Math.round((accuracyScore + comprehensionScore) / 2),
            readingSpeed,
            comprehensionScore,
            accuracyScore,
            mistakes
        });
    };

    const { isRecording, startRecording: startSpeechRecognition, stopRecording, isSupported } = useSpeechRecognition({
        onResult: (text) => {
            setRecordedText(text);
        },
        onEnd: () => {
            calculateScore(recordedText);
        },
        onError: (error) => {
            setError(`Speech recognition error: ${error}`);
        }
    });

    const startRecording = () => {
        setStartTime(Date.now());
        setRecordedText('');
        startSpeechRecognition();
    };

    const handleComprehensionComplete = (comprehensionScore: number) => {
        setAssessment(prev => ({
            ...prev,
            comprehensionScore,
            score: Math.round((comprehensionScore + (prev.accuracyScore || 0)) / 2)
        }));
        setShowQuestions(false);
    };

    const handleSubmit = async () => {
        try {
            if (!showQuestions) {
                setShowQuestions(true);
                return;
            }
            // TODO: Submit assessment to API
            window.location.href = '/dashboard';
        } catch (error) {
            setError('Failed to submit assessment. Please try again.');
        }
    };

    if (!isSupported) {
        return (
            <Layout title="Error">
                <div className="text-center py-12">
                    <p className="text-red-500">
                        Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
                    </p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title="Error">
                <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`Assessment: ${story.title}`} description="Reading Assessment">
            <div className="max-w-4xl mx-auto">
                {!showQuestions ? (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Reading Assessment</h1>

                        {/* Story Content */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Please read the following text:</h2>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-lg">{story.content}</p>
                            </div>
                        </div>

                        {/* Recording Interface */}
                        <div className="space-y-6">
                            {!isRecording && !recordedText ? (
                                <div className="text-center">
                                    <button
                                        onClick={startRecording}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Start Recording
                                    </button>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Click to start recording your reading
                                    </p>
                                </div>
                            ) : isRecording ? (
                                <div className="text-center">
                                    <div className="animate-pulse text-indigo-600 mb-2">Recording...</div>
                                    <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-indigo-600 rounded-full animate-ping"></div>
                                    </div>
                                    <button
                                        onClick={stopRecording}
                                        className="mt-4 px-4 py-2 text-red-600 hover:text-red-800"
                                    >
                                        Stop Recording
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-2">Your Reading:</h3>
                                        <p>{recordedText}</p>
                                    </div>

                                    {/* Assessment Results */}
                                    {assessment.score && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-green-50 rounded-lg">
                                                <h3 className="font-semibold text-green-800 mb-2">Overall Score</h3>
                                                <p className="text-3xl font-bold text-green-600">
                                                    {assessment.score}%
                                                </p>
                                            </div>
                                            <div className="p-4 bg-blue-50 rounded-lg">
                                                <h3 className="font-semibold text-blue-800 mb-2">Reading Speed</h3>
                                                <p className="text-3xl font-bold text-blue-600">
                                                    {assessment.readingSpeed} WPM
                                                </p>
                                            </div>
                                            <div className="p-4 bg-purple-50 rounded-lg">
                                                <h3 className="font-semibold text-purple-800 mb-2">
                                                    Comprehension
                                                </h3>
                                                <p className="text-3xl font-bold text-purple-600">
                                                    {assessment.comprehensionScore}%
                                                </p>
                                            </div>
                                            <div className="p-4 bg-yellow-50 rounded-lg">
                                                <h3 className="font-semibold text-yellow-800 mb-2">Accuracy</h3>
                                                <p className="text-3xl font-bold text-yellow-600">
                                                    {assessment.accuracyScore}%
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between pt-6 border-t">
                                        <button
                                            onClick={startRecording}
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                        >
                                            Try Again
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Submit & Continue
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <ComprehensionQuestions
                        questions={questions}
                        onComplete={handleComprehensionComplete}
                    />
                )}
            </div>
        </Layout>
    );
};

export default AssessmentPage; 