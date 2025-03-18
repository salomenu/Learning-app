export const calculateReadingSpeed = (wordsRead: number, timeTaken: number): number => {
    if (timeTaken <= 0) return 0;
    return Math.round((wordsRead / timeTaken) * 60); // words per minute
};

export const generateRecommendations = (readingLevel: string): string[] => {
    const recommendations: { [key: string]: string[] } = {
        'beginner': ['The Cat in the Hat', 'Green Eggs and Ham'],
        'intermediate': ['Charlotte\'s Web', 'The Magic Tree House'],
        'advanced': ['Harry Potter and the Sorcerer\'s Stone', 'The Chronicles of Narnia']
    };
    return recommendations[readingLevel] || [];
};

export const formatData = (data: any): string => {
    return JSON.stringify(data, null, 2);
};