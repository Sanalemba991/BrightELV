import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform contact data
function transformContact(contact: any) {
    return {
        _id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        createdAt: contact.created_at
    };
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;
        
        const { id } = await params;
        
        const { data: contact, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformContact(contact));
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;
        
        const { id } = await params;
        const data = await request.json();
        
        const { data: contact, error } = await supabase
            .from('contacts')
            .update(data)
            .eq('id', id)
            .select()
            .single();

        if (error || !contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformContact(contact));
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;
        
        const { id } = await params;
        const data = await request.json();
        
        const { data: contact, error } = await supabase
            .from('contacts')
            .update(data)
            .eq('id', id)
            .select()
            .single();

        if (error || !contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformContact(contact));
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;
        
        const { id } = await params;
        
        const { data: contact, error: fetchError } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
        }
        
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        return NextResponse.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
