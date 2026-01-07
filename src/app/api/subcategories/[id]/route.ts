import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '@/app/utils/cloudinary';
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform subcategory data
function transformSubcategory(subcat: any, category?: any) {
    return {
        _id: subcat.id,
        name: subcat.name,
        slug: subcat.slug,
        category: category ? {
            _id: category.id,
            name: category.name,
            slug: category.slug
        } : subcat.category_id,
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

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const { data: subcategory, error } = await supabase
            .from('subcategories')
            .select('*, categories(*)')
            .eq('id', id)
            .single();

        if (error || !subcategory) {
            return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }

        return NextResponse.json(transformSubcategory(subcategory, subcategory.categories));
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify JWT auth
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;

        const { id } = await params;
        const formData = await request.formData();
        
        const { data: existingSubcategory, error: fetchError } = await supabase
            .from('subcategories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !existingSubcategory) {
            return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }
        
        const name = formData.get('name') as string;
        const updateData: any = {
            name,
            description: formData.get('description'),
            category_id: formData.get('category'),
            is_active: formData.get('isActive') === 'true',
            seo_title: formData.get('seoTitle'),
            seo_description: formData.get('seoDescription'),
            seo_keywords: formData.get('seoKeywords')
        };
        
        // Update slug if name changed
        if (name) {
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        
        // Handle image upload
        const newImage = formData.get('image') as File;
        if (newImage && newImage.size > 0) {
            if (existingSubcategory.image) {
                try {
                    const publicId = getPublicIdFromUrl(existingSubcategory.image);
                    await deleteFromCloudinary(publicId);
                } catch (e) {
                    console.error('Failed to delete old image:', e);
                }
            }
            updateData.image = await uploadToCloudinary(newImage, `subcategories/${updateData.slug}`);
        }
        
        const { data: subcategory, error } = await supabase
            .from('subcategories')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(transformSubcategory(subcategory));
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify JWT auth
        const auth = await verifyAuth();
        if (!auth.isValid) return auth.error;

        const { id } = await params;
        
        const { data: subcategory, error: fetchError } = await supabase
            .from('subcategories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !subcategory) {
            return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }
        
        const { error } = await supabase
            .from('subcategories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        if (subcategory.image) {
            try {
                const publicId = getPublicIdFromUrl(subcategory.image);
                await deleteFromCloudinary(publicId);
            } catch (e) {
                console.error('Failed to delete image:', e);
            }
        }
        
        return NextResponse.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
