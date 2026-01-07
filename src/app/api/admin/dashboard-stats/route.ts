import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';

export async function GET() {
    try {
        // Get all counts in parallel
        const [
            productsResult,
            categoriesResult,
            subcategoriesResult,
            contactsResult,
            subscriptionsResult,
            productInquiriesResult
        ] = await Promise.all([
            supabase.from('products').select('id', { count: 'exact', head: true }),
            supabase.from('categories').select('id', { count: 'exact', head: true }),
            supabase.from('subcategories').select('id', { count: 'exact', head: true }),
            supabase.from('contacts').select('*'),
            supabase.from('subscriptions').select('*'),
            supabase.from('product_inquiries').select('*')
        ]);

        const contacts = contactsResult.data || [];
        const subscriptions = subscriptionsResult.data || [];
        const productInquiries = productInquiriesResult.data || [];

        // Calculate contact message statistics (new status values: new, read, replied)
        const contactStats = {
            total: contacts.length,
            new: contacts.filter(c => c.status === 'new').length,
            read: contacts.filter(c => c.status === 'read').length,
            replied: contacts.filter(c => c.status === 'replied').length
        };

        // Calculate subscription statistics
        const subscriptionStats = {
            total: subscriptions.length,
            active: subscriptions.filter(s => s.is_active).length,
            inactive: subscriptions.filter(s => !s.is_active).length
        };

        // Calculate product inquiry statistics (status values: new, contacted, closed)
        const productInquiryStats = {
            total: productInquiries.length,
            new: productInquiries.filter(p => p.status === 'new').length,
            contacted: productInquiries.filter(p => p.status === 'contacted').length,
            closed: productInquiries.filter(p => p.status === 'closed').length
        };

        return NextResponse.json({
            products: productsResult.count || 0,
            categories: categoriesResult.count || 0,
            subcategories: subcategoriesResult.count || 0,
            contacts: contactStats,
            subscriptions: subscriptionStats,
            productInquiries: productInquiryStats
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard statistics' },
            { status: 500 }
        );
    }
}
