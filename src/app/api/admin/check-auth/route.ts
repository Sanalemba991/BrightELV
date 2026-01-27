import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { message: 'No token provided' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { username: string };
        
        // If token is valid, return success
        if (decoded.username === ADMIN_USERNAME) {
            return NextResponse.json({ username: decoded.username });
        }

        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    }
}
