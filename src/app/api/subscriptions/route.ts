import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';

// Helper function to transform subscription data
function transformSubscription(sub: any) {
    return {
        _id: sub.id,
        email: sub.email,
        isActive: sub.is_active,
        createdAt: sub.created_at
    };
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Check if email already exists
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existingSubscription) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert({ 
        email: email.toLowerCase().trim(),
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const transformedSubscriptions = subscriptions?.map(transformSubscription);

    return NextResponse.json(transformedSubscriptions);
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}
