import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    title = 'Learning App',
    description = 'Interactive learning platform for children',
}) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    // List of public routes that don't require authentication
    const publicRoutes = ['/auth/login', '/auth/register'];

    React.useEffect(() => {
        // Redirect to login if accessing protected route without authentication
        if (!loading && !user && !publicRoutes.includes(router.pathname)) {
            router.push('/auth/login');
        }
    }, [user, loading, router.pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {user && <Navbar />}

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="bg-white shadow-inner py-4 mt-8">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Learning App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}; 