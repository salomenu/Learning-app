import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models/schemas/user.schema';

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    private readonly JWT_EXPIRES_IN = '24h';

    async register(userData: {
        name: string;
        email: string;
        password: string;
        age: number;
    }): Promise<{ user: IUser; token: string }> {
        try {
            const existingUser = await UserModel.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('Email already exists');
            }

            const user = new UserModel(userData);
            await user.save();

            const token = this.generateToken(user);
            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            const token = this.generateToken(user);
            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    private generateToken(user: IUser): string {
        return jwt.sign(
            { userId: user._id, email: user.email },
            this.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRES_IN }
        );
    }

    async validateToken(token: string): Promise<{ userId: string; email: string }> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string; email: string };
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
} 