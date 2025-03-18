import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiError } from '../utils/types';

class Api {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                const apiError: ApiError = {
                    message: error.response?.data?.message || 'An error occurred',
                    status: error.response?.status
                };

                // Handle token expiration
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/auth/login';
                }

                return Promise.reject(apiError);
            }
        );
    }

    public getApi(): AxiosInstance {
        return this.api;
    }
}

export default new Api().getApi(); 