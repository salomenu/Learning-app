import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

const HomePage: NextPage = () => {
    return (
        <div className="min-h-screen relative">
            <Head>
                <title>Learning App - Improve Your Reading Skills</title>
                <meta name="description" content="Learning App helps children improve their reading skills through interactive assessments and stories" />
            </Head>

            {/* Full-page background image */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0" 
                style={{ 
                    backgroundImage: "url('/images/background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay to ensure text is readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0"></div>
            </div>

            {/* Simple Navigation */}
            <nav className="relative z-10 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-white">Learning App</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section with Login/Signup Focus */}
                <div className="pt-24 pb-16 sm:pt-32 sm:pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="max-w-lg mx-auto text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                <span className="block">Discover the</span>
                                <span className="block text-indigo-300">Joy of Reading</span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-100">
                                Start your journey to better reading with personalized assessments and engaging stories.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/auth/register" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition-colors">
                                    Sign Up
                                </Link>
                                <Link href="/auth/login" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="relative z-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
                    <div className="text-center">
                        <p className="text-base text-gray-400">
                            &copy; 2024 Learning App. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage; 