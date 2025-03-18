import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../../components/common/Layout';
import { Story } from '../../types/assessment';

const StoriesPage: NextPage = () => {
    // Demo stories data
    const stories: Story[] = [
        {
            id: '1',
            title: 'The Magic Tree House',
            content: 'Once upon a time in a magical forest, there stood an ancient tree that reached up to the clouds.',
            level: 'beginner',
            tags: ['adventure', 'magic'],
            readingTime: 5,
            wordCount: 500
        },
        {
            id: '2',
            title: 'The Ocean\'s Secret',
            content: 'Deep beneath the waves, a mysterious light flickered in the darkness.',
            level: 'intermediate',
            tags: ['mystery', 'ocean'],
            readingTime: 8,
            wordCount: 800
        },
        {
            id: '3',
            title: 'The Time Traveler\'s Journal',
            content: 'The old leather journal held secrets that would change everything.',
            level: 'advanced',
            tags: ['science fiction', 'time travel'],
            readingTime: 12,
            wordCount: 1200
        }
    ];

    return (
        <Layout title="Stories - WorldReader" description="Browse our collection of interactive stories">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Stories</h1>
                    <div className="flex space-x-4">
                        <select className="px-4 py-2 border rounded-lg">
                            <option value="">All Levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h2>
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className={`px-2 py-1 text-sm rounded-full ${
                                        story.level === 'beginner' ? 'bg-green-100 text-green-800' :
                                        story.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {story.level}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {story.readingTime} min read
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-3">{story.content}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {story.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={`/assessment/${story.id}`}
                                    className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Start Reading
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default StoriesPage; 