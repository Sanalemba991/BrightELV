import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Create the response with JSON
        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );
        
        // Clear all authentication-related cookies
        response.cookies.delete('auth-token');
        
        return response;
    } catch (error) {
        // Return error response as JSON
        return NextResponse.json(
            { message: 'Error during logout' },
            { status: 500 }
        );
    }
}
