import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    readingLevel: string;
    progress: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for existing session
        const checkAuth = async () => {
            try {
                // TODO: Replace with actual API call
                // For demo purposes, we'll use a mock user
                const mockUser: User = {
                    id: '1',
                    name: 'Demo User',
                    email: 'demo@example.com',
                    readingLevel: 'intermediate',
                    progress: 75
                };
                setUser(mockUser);
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        // TODO: Implement actual login
        console.log('Login:', { email, password });
    };

    const logout = async () => {
        // TODO: Implement actual logout
        setUser(null);
    };

    const register = async (name: string, email: string, password: string) => {
        // TODO: Implement actual registration
        console.log('Register:', { name, email, password });
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 