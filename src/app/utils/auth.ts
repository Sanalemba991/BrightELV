import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function verifyAuth(): Promise<{ isValid: boolean; error?: NextResponse }> {
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('auth-token');

        if (!authToken || !authToken.value) {
            return {
                isValid: false,
                error: NextResponse.json(
                    { error: 'Unauthorized - No token provided' },
                    { status: 401 }
                )
            };
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
        await jwtVerify(authToken.value, secret);
        
        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            error: NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            )
        };
    }
}
