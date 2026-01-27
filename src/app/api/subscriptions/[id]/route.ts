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

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        
        // Transform camelCase to snake_case for Supabase
        const updateData: any = {};
        if (data.isActive !== undefined) updateData.is_active = data.isActive;
        if (data.email !== undefined) updateData.email = data.email;
        
        const { data: subscription, error } = await supabase
            .from('subscriptions')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error || !subscription) {
            return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformSubscription(subscription));
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const { data: subscription, error: fetchError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !subscription) {
            return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
        }
        
        const { error } = await supabase
            .from('subscriptions')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        return NextResponse.json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
