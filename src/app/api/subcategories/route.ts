import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform subcategory data
function transformSubcategory(subcat: any) {
    return {
        _id: subcat.id,
        name: subcat.name,
        slug: subcat.slug,
        category: subcat.category_id,
        description: subcat.description,
        image: subcat.image,
        isActive: subcat.is_active,
        createdAt: subcat.created_at,
        seoTitle: subcat.seo_title,
        seoDescription: subcat.seo_description,
        seoKeywords: subcat.seo_keywords,
        metaRobots: subcat.meta_robots,
        canonicalUrl: subcat.canonical_url
    };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || searchParams.get('categoryId');
        
        let query = supabase
            .from('subcategories')
            .select('*')
            .order('created_at', { ascending: false });

        if (category) {
            query = query.eq('category_id', category);
        }

        const { data: subcategories, error } = await query;

        if (error) throw error;

        const transformedSubcategories = subcategories?.map(transformSubcategory);
            
        return NextResponse.json(transformedSubcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subcategories' }, 
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
        
        // Handle image upload using Cloudinary
        const image = formData.get('image') as File;
        let imageUrl = '';
        
        if (image && image instanceof File && image.size > 0) {
            try {
                const slug = formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const uploadResult = await uploadToCloudinary(image, `categories/${formData.get('category')}/subcategories/${slug}`);
                imageUrl = uploadResult;
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('Failed to upload image');
            }
        }

        const name = formData.get('name') as string;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const { data: subcategory, error } = await supabase
            .from('subcategories')
            .insert({
                name,
                category_id: formData.get('category') as string,
                description: formData.get('description') as string,
                is_active: formData.get('isActive') === 'true',
                image: imageUrl,
                slug
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(transformSubcategory(subcategory), { status: 201 });
    } catch (error: any) {
        console.error('SubCategory creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create subcategory' },
            { status: 500 }
        );
    }
}
