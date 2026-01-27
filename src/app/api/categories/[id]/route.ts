import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { uploadToStorage, deleteFromStorage } from '@/app/utils/storage';
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform category data
function transformCategory(cat: any) {
    return {
        _id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        displayType: cat.display_type,
        isActive: cat.is_active,
        createdAt: cat.created_at
    };
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { data: category, error } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(transformCategory(category));
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

        // Get existing category
        const { data: existingCategory, error: fetchError } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !existingCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const name = formData.get('name') as string;
        const updateData: any = {
            name,
            description: formData.get('description'),
            display_type: formData.get('displayType') || 'subcategories',
            is_active: formData.get('isActive') === 'true'
        };

        // Update slug if name changed
        if (name) {
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        // Handle image upload
        const newImage = formData.get('image') as File;
        if (newImage && newImage.size > 0) {
            // Delete old image if exists
            if (existingCategory.image) {
                try {
                    await deleteFromStorage(existingCategory.image);
                } catch (e) {
                    console.error('Failed to delete old image:', e);
                }
            }
            updateData.image = await uploadToStorage(newImage, `categories/${updateData.slug}`);
        }

        const { data: category, error } = await supabase
            .from('categories')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(transformCategory(category));
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

        // Get category first to delete image
        const { data: category, error: fetchError } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        // Check for dependencies (Subcategories)
        const { count: subCount, error: subError } = await supabase
            .from('subcategories')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', id);

        if (subError) throw subError;

        // Check for dependencies (Products)
        const { count: prodCount, error: prodError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', id);

        if (prodError) throw prodError;

        if ((subCount && subCount > 0) || (prodCount && prodCount > 0)) {
            return NextResponse.json(
                { error: `Cannot delete category: Contains ${subCount || 0} subcategories and ${prodCount || 0} products. Please remove them first.` },
                { status: 400 }
            );
        }

        // Delete from database
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Delete image from storage if exists
        if (category.image) {
            try {
                await deleteFromStorage(category.image);
            } catch (e) {
                console.error('Failed to delete image:', e);
            }
        }

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
