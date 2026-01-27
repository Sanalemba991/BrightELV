import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform product inquiry data
function transformInquiry(inquiry: any) {
    return {
        _id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        mobile: inquiry.mobile,
        message: inquiry.message,
        productId: inquiry.products ? {
            _id: inquiry.products.id,
            name: inquiry.products.name,
            slug: inquiry.products.slug,
            image1: inquiry.products.image1
        } : inquiry.product_id,
        productName: inquiry.product_name,
        status: inquiry.status,
        createdAt: inquiry.created_at
    };
}

export async function GET(request: Request) {
  try {
    // Verify JWT auth - only admin can fetch inquiries
    const auth = await verifyAuth();
    if (!auth.isValid) return auth.error;
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = supabase
      .from('product_inquiries')
      .select('*, products(id, name, slug, image1)')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: inquiries, error } = await query;

    if (error) throw error;

    const transformedInquiries = inquiries?.map(transformInquiry);

    return NextResponse.json(transformedInquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // No auth required for POST - users can submit inquiries
    const body = await request.json();
    
    const { name, email, mobile, message, productId, productName } = body;
    
    if (!name || !email || !mobile || !productId || !productName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: inquiry, error } = await supabase
      .from('product_inquiries')
      .insert({
        name,
        email,
        mobile,
        message,
        product_id: productId,
        product_name: productName,
        status: 'new'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(transformInquiry(inquiry), { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
