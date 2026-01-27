import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
<<<<<<< HEAD
import { deleteFromStorage, uploadToStorage } from '@/app/utils/storage';
=======
import { deleteFromCloudinary, getPublicIdFromUrl, uploadToCloudinary } from '@/app/utils/cloudinary';
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform product data
function transformProduct(product: any) {
<<<<<<< HEAD
  return {
    _id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    keyFeatures: product.key_features || [],
    image1: product.image1,
    image2: product.image2,
    image3: product.image3,
    image4: product.image4,
    category: product.categories ? {
      _id: product.categories.id,
      name: product.categories.name,
      slug: product.categories.slug
    } : product.category_id,
    subcategory: product.subcategories ? {
      _id: product.subcategories.id,
      name: product.subcategories.name,
      slug: product.subcategories.slug
    } : product.subcategory_id,
    seoTitle: product.seo_title,
    seoDescription: product.seo_description,
    seoKeywords: product.seo_keywords,
    metaRobots: product.meta_robots,
    canonicalUrl: product.canonical_url,
    structuredData: product.structured_data,
    faqSchema: product.faq_schema,
    createdAt: product.created_at
  };
=======
    return {
        _id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        keyFeatures: product.key_features || [],
        image1: product.image1,
        image2: product.image2,
        image3: product.image3,
        image4: product.image4,
        category: product.categories ? {
            _id: product.categories.id,
            name: product.categories.name,
            slug: product.categories.slug
        } : product.category_id,
        subcategory: product.subcategories ? {
            _id: product.subcategories.id,
            name: product.subcategories.name,
            slug: product.subcategories.slug
        } : product.subcategory_id,
        seoTitle: product.seo_title,
        seoDescription: product.seo_description,
        seoKeywords: product.seo_keywords,
        metaRobots: product.meta_robots,
        canonicalUrl: product.canonical_url,
        structuredData: product.structured_data,
        faqSchema: product.faq_schema,
        createdAt: product.created_at
    };
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
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
    const { data: product, error } = await supabase
      .from('products')
      .select('*, categories(id, name, slug), subcategories(id, name, slug)')
      .eq('id', id)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(transformProduct(product));
  } catch (error) {
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
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete images from cloudinary
    for (const field of ['image1', 'image2', 'image3', 'image4'] as const) {
      const imageUrl = product[field];
      if (imageUrl) {
        try {
<<<<<<< HEAD
          await deleteFromStorage(imageUrl);
=======
          const publicId = getPublicIdFromUrl(imageUrl);
          await deleteFromCloudinary(publicId);
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        } catch (e) {
          console.error(`Failed to delete ${field}:`, e);
        }
      }
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Product deleted successfully' });
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

    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const name = formData.get('name') as string;
    const productData: any = {
      name,
      description: formData.get('description'),
      key_features: JSON.parse(formData.get('keyFeatures') as string || '[]'),
      category_id: formData.get('category'),
      subcategory_id: formData.get('subcategory') || null,
      seo_title: formData.get('seoTitle') || '',
      seo_description: formData.get('seoDescription') || '',
      seo_keywords: formData.get('seoKeywords') || ''
    };

    // Update slug if name changed
    if (name) {
      productData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Handle image updates
    for (const imageField of ['image1', 'image2', 'image3', 'image4'] as const) {
      const newImage = formData.get(imageField) as File;
      if (newImage && newImage.size > 0) {
        // Delete old image if it exists
        const oldImageUrl = existingProduct[imageField];
        if (oldImageUrl) {
          try {
<<<<<<< HEAD
            await deleteFromStorage(oldImageUrl);
=======
            const publicId = getPublicIdFromUrl(oldImageUrl);
            await deleteFromCloudinary(publicId);
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
          } catch (e) {
            console.error(`Failed to delete old ${imageField}:`, e);
          }
        }

        // Upload new image
        const folderPath = `products/${productData.slug || existingProduct.slug}`;
<<<<<<< HEAD
        const imageUrl = await uploadToStorage(newImage, folderPath);
=======
        const imageUrl = await uploadToCloudinary(newImage, folderPath);
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
        productData[imageField] = imageUrl;
      }
    }

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select('*, categories(id, name, slug), subcategories(id, name, slug)')
      .single();

    if (error) throw error;

    return NextResponse.json(transformProduct(updatedProduct));
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 500 }
    );
  }
}
