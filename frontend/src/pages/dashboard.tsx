import React from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/common/Layout';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const DashboardPage: NextPage = () => {
    const { user } = useAuth();

    return (
        <Layout title="Dashboard - Learning App" description="Track your reading progress">
            <div className="max-w-7xl mx-auto">
                {/* Progress Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {user?.name}!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-indigo-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-indigo-700">Reading Level</h3>
                            <p className="text-3xl font-bold text-indigo-900 mt-2">{user?.readingLevel}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-700">Overall Progress</h3>
                            <div className="mt-2">
                                <div className="relative pt-1">
                                    <div className="overflow-hidden h-4 text-xs flex rounded bg-green-200">
                                        <div
                                            style={{ width: `${user?.progress}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                                        />
                                    </div>
                                    <span className="text-lg font-semibold text-green-900 mt-1">{user?.progress}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-700">Age Group</h3>
                            <p className="text-3xl font-bold text-purple-900 mt-2">{user?.age} years</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Link href="/stories" className="block">
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Continue Reading</h3>
                            <p className="text-gray-600">Pick up where you left off or start a new story.</p>
                        </div>
                    </Link>
                    <Link href="/assessment" className="block">
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Take an Assessment</h3>
                            <p className="text-gray-600">Test your reading skills and track your improvement.</p>
                        </div>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">Coming Soon!</h4>
                                <p className="text-gray-600">Your recent reading activity will appear here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage; 