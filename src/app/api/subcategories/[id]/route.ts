import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
<<<<<<< HEAD
import { uploadToStorage, deleteFromStorage } from '@/app/utils/storage';
=======
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '@/app/utils/cloudinary';
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
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
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
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
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        const { data: existingSubcategory, error: fetchError } = await supabase
            .from('subcategories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !existingSubcategory) {
            return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
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
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        // Update slug if name changed
        if (name) {
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        // Handle image upload
        const newImage = formData.get('image') as File;
        if (newImage && newImage.size > 0) {
            if (existingSubcategory.image) {
                try {
<<<<<<< HEAD
                    await deleteFromStorage(existingSubcategory.image);
=======
                    const publicId = getPublicIdFromUrl(existingSubcategory.image);
                    await deleteFromCloudinary(publicId);
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
                } catch (e) {
                    console.error('Failed to delete old image:', e);
                }
            }
<<<<<<< HEAD
            updateData.image = await uploadToStorage(newImage, `subcategories/${updateData.slug}`);
        }

=======
            updateData.image = await uploadToCloudinary(newImage, `subcategories/${updateData.slug}`);
        }
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
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
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        const { data: subcategory, error: fetchError } = await supabase
            .from('subcategories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !subcategory) {
            return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }
<<<<<<< HEAD

        // Check for dependencies (Products)
        const { count: prodCount, error: prodError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('subcategory_id', id);

        if (prodError) throw prodError;

        if (prodCount && prodCount > 0) {
            return NextResponse.json(
                { error: `Cannot delete subcategory: Contains ${prodCount} products. Please remove them first.` },
                { status: 400 }
            );
        }

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        const { error } = await supabase
            .from('subcategories')
            .delete()
            .eq('id', id);

        if (error) throw error;
<<<<<<< HEAD

        if (subcategory.image) {
            try {
                await deleteFromStorage(subcategory.image);
=======
        
        if (subcategory.image) {
            try {
                const publicId = getPublicIdFromUrl(subcategory.image);
                await deleteFromCloudinary(publicId);
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
            } catch (e) {
                console.error('Failed to delete image:', e);
            }
        }
<<<<<<< HEAD

=======
        
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        return NextResponse.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
