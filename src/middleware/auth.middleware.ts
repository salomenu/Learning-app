import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
    headers: Request['headers'];
    params: Request['params'];
    query: Request['query'];
    body: any;
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            res.status(401).json({ message: 'Invalid token format' });
            return;
        }

        const decoded = await authService.validateToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}; 