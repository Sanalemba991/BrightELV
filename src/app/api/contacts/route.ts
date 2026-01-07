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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { data: contact, error } = await supabase
      .from('contacts')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: 'new'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(transformContact(contact), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Verify JWT auth - only admin can fetch contacts
    const auth = await verifyAuth();
    if (!auth.isValid) return auth.error;
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: contacts, error } = await query;

    if (error) throw error;

    const transformedContacts = contacts?.map(transformContact);

    return NextResponse.json(transformedContacts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
