import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { Story } from '../../utils/types';

const StoryPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isReading, setIsReading] = useState(false);
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        if (id) {
            // TODO: Replace with actual API call
            const demoStory: Story = {
                id: id as string,
                title: 'The Magic Tree House',
                content: 'Once upon a time in a magical forest, there stood an ancient tree that reached up to the clouds. Its branches sparkled with golden leaves, and its trunk was wider than ten children holding hands could reach around. At the very top of this magnificent tree was a mysterious treehouse that seemed to glow with its own light.',
                level: 'beginner',
                tags: ['adventure', 'magic'],
                readingTime: 5,
                wordCount: 500
            };

            setStory(demoStory);
            setLoading(false);
        }
    }, [id]);

    const startReading = () => {
        setIsReading(true);
        setCurrentWord(0);
    };

    const handleAssessment = () => {
        // TODO: Implement speech recognition and assessment
        router.push(`/assessment/${id}`);
    };

    if (loading) {
        return (
            <Layout title="Loading Story...">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            </Layout>
        );
    }

    if (error || !story) {
        return (
            <Layout title="Error">
                <div className="text-center py-12">
                    <p className="text-red-500">{error || 'Story not found'}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${story.title} - Learning App`} description={`Read ${story.title}`}>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Story Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{story.title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{story.readingTime} min read</span>
                            <span>{story.wordCount} words</span>
                            <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                                {story.level}
                            </span>
                        </div>
                    </div>

                    {/* Reading Interface */}
                    {!isReading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-6">
                                Are you ready to start reading? Take your time and read carefully.
                            </p>
                            <button
                                onClick={startReading}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Start Reading
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="prose max-w-none">
                                <p className="text-lg leading-relaxed">
                                    {story.content.split(' ').map((word, index) => (
                                        <span
                                            key={index}
                                            className={`inline-block mx-1 ${
                                                index === currentWord
                                                    ? 'bg-yellow-200'
                                                    : ''
                                            }`}
                                            onClick={() => setCurrentWord(index)}
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t">
                                <button
                                    onClick={() => setIsReading(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Start Over
                                </button>
                                <button
                                    onClick={handleAssessment}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Complete & Take Assessment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default StoryPage; 