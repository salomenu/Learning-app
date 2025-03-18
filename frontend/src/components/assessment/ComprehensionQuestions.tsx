import React, { useState } from 'react';
import { Question } from '../../types/assessment';

interface ComprehensionQuestionsProps {
    questions: Question[];
    onComplete: (score: number) => void;
}

export const ComprehensionQuestions: React.FC<ComprehensionQuestionsProps> = ({
    questions,
    onComplete
}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const calculateScore = () => {
        const correctAnswers = questions.filter(
            question => answers[question.id] === question.correctAnswer
        ).length;
        return Math.round((correctAnswers / questions.length) * 100);
    };

    const handleSubmit = () => {
        const score = calculateScore();
        setShowResults(true);
        onComplete(score);
    };

    const question = questions[currentQuestion];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Comprehension Questions
                </h2>

                {!showResults ? (
                    <div className="space-y-6">
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-medium text-gray-900">{question.text}</p>
                            <div className="space-y-2">
                                {question.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                            answers[question.id] === option
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            checked={answers[question.id] === option}
                                            onChange={() => handleAnswer(question.id, option)}
                                            className="sr-only"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between pt-6">
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestion === 0}
                                className={`px-4 py-2 rounded-lg ${
                                    currentQuestion === 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Previous
                            </button>
                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                                    disabled={!answers[question.id]}
                                    className={`px-6 py-2 rounded-lg ${
                                        !answers[question.id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!answers[question.id]}
                                    className={`px-6 py-2 rounded-lg ${
                                        !answers[question.id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900 mb-2">
                                {calculateScore()}%
                            </p>
                            <p className="text-gray-600">
                                You answered {questions.filter(q => answers[q.id] === q.correctAnswer).length} out of {questions.length} questions correctly
                            </p>
                        </div>

                        <div className="space-y-4">
                            {questions.map((q, index) => (
                                <div
                                    key={q.id}
                                    className={`p-4 rounded-lg ${
                                        answers[q.id] === q.correctAnswer
                                            ? 'bg-green-50'
                                            : 'bg-red-50'
                                    }`}
                                >
                                    <p className="font-medium text-gray-900 mb-2">
                                        {index + 1}. {q.text}
                                    </p>
                                    <p className="text-sm">
                                        Your answer:{' '}
                                        <span
                                            className={
                                                answers[q.id] === q.correctAnswer
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }
                                        >
                                            {answers[q.id]}
                                        </span>
                                    </p>
                                    {answers[q.id] !== q.correctAnswer && (
                                        <p className="text-sm text-green-600 mt-1">
                                            Correct answer: {q.correctAnswer}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 