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

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;
        
        const { id } = await params;
        
        const { data: inquiry, error } = await supabase
            .from('product_inquiries')
            .select('*, products(id, name, slug, image1)')
            .eq('id', id)
            .single();

        if (error || !inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformInquiry(inquiry));
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
        
        const { data: inquiry, error } = await supabase
            .from('product_inquiries')
            .update(data)
            .eq('id', id)
            .select('*, products(id, name, slug, image1)')
            .single();

        if (error || !inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformInquiry(inquiry));
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
        
        const { data: inquiry, error } = await supabase
            .from('product_inquiries')
            .update(data)
            .eq('id', id)
            .select('*, products(id, name, slug, image1)')
            .single();

        if (error || !inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }
        
        return NextResponse.json(transformInquiry(inquiry));
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
        
        const { data: inquiry, error: fetchError } = await supabase
            .from('product_inquiries')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }
        
        const { error } = await supabase
            .from('product_inquiries')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        return NextResponse.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
