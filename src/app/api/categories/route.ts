import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { uploadToStorage } from '@/app/utils/storage';
import { verifyAuth } from '@/app/utils/auth';

export async function GET() {
    try {
        const { data: categories, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform to match frontend expectations (camelCase)
        const transformedCategories = categories?.map(cat => ({
            _id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            image: cat.image,
            displayType: cat.display_type,
            isActive: cat.is_active,
            createdAt: cat.created_at
        }));

        return NextResponse.json(transformedCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Verify JWT auth
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;

        const formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const displayType = formData.get('displayType') as string || 'subcategories';
        const image = formData.get('image') as File;

        // Create slug from name
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Handle image upload if present
        let imageUrl = '';
        if (image && image.size > 0) {
            imageUrl = await uploadToStorage(image, `categories/${slug}`);
        }

        // Create new category
        const { data: category, error } = await supabase
            .from('categories')
            .insert({
                name,
                description,
                display_type: displayType,
                slug,
                image: imageUrl,
                is_active: true
            })
            .select()
            .single();

        if (error) throw error;

        // Transform to match frontend expectations
        const transformedCategory = {
            _id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            image: category.image,
            displayType: category.display_type,
            isActive: category.is_active,
            createdAt: category.created_at
        };

        return NextResponse.json(transformedCategory, { status: 201 });
    } catch (error: any) {
        console.error('Detailed error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create category' },
            { status: 500 }
        );
    }
}
