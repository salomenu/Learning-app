import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
    onResult?: (text: string) => void;
    onEnd?: () => void;
    onError?: (error: string) => void;
}

export const useSpeechRecognition = ({
    onResult,
    onEnd,
    onError
}: UseSpeechRecognitionProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize speech recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                setRecognition(recognition);
            } else {
                onError?.('Speech recognition not supported in this browser');
            }
        }
    }, [onError]);

    const startRecording = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
                setIsRecording(true);

                recognition.onresult = (event) => {
                    const transcript = Array.from(event.results)
                        .map(result => result[0].transcript)
                        .join(' ');
                    onResult?.(transcript);
                };

                recognition.onerror = (event) => {
                    onError?.(event.error);
                    setIsRecording(false);
                };

                recognition.onend = () => {
                    onEnd?.();
                    setIsRecording(false);
                };
            } catch (error) {
                onError?.('Error starting speech recognition');
                setIsRecording(false);
            }
        }
    }, [recognition, onResult, onEnd, onError]);

    const stopRecording = useCallback(() => {
        if (recognition && isRecording) {
            recognition.stop();
            setIsRecording(false);
        }
    }, [recognition, isRecording]);

    return {
        isRecording,
        startRecording,
        stopRecording,
        isSupported: !!recognition
    };
}; 