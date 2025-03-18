import api from './api';
import { User, AuthResponse } from '../utils/types';

export class AuthService {
    private static TOKEN_KEY = 'token';
    private static USER_KEY = 'user';

    static async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        this.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
    }

    static async register(userData: {
        name: string;
        email: string;
        password: string;
        age: number;
    }): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', userData);
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
    }

    static logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static getUser(): User | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    static isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private static setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    private static setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
} 