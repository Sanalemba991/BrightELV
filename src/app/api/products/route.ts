import { NextResponse } from 'next/server';
import supabase from '@/app/config/db';
import { uploadToStorage, uploadPdfToStorage } from '@/app/utils/storage';
import { verifyAuth } from '@/app/utils/auth';

// Helper function to transform product data
function transformProduct(product: any) {
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
    pdfUrl: product.pdf_url,
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
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subcategoryId = searchParams.get('subcategory');
    const categoryId = searchParams.get('category');
    const slug = searchParams.get('slug');

    let query = supabase
      .from('products')
      .select('*, categories(id, name, slug), subcategories(id, name, slug)')
      .order('created_at', { ascending: false });

    if (subcategoryId) query = query.eq('subcategory_id', subcategoryId);
    if (categoryId) query = query.eq('category_id', categoryId);
    if (slug) query = query.eq('slug', slug);

    const { data: products, error } = await query;

    if (error) throw error;

    const transformedProducts = products?.map(transformProduct);

    return NextResponse.json(transformedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Verify JWT auth
    const auth = await verifyAuth();
    if (!auth.isValid) return auth.error;

    const formData = await request.formData();

    // Handle image uploads
    const imageUrls: { [key: string]: string } = {};

    for (const imageField of ['image1', 'image2', 'image3', 'image4']) {
      const imageFile = formData.get(imageField) as File;
      if (imageFile && imageFile.size > 0) {
        try {
          const productSlug = formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const folderPath = `products/${productSlug}`;
          const uploadResult = await uploadToStorage(imageFile, folderPath);
          imageUrls[imageField] = uploadResult;
        } catch (error) {
          console.error(`Error uploading ${imageField}:`, error);
          throw new Error(`Failed to upload ${imageField}`);
        }
      }
    }

    // Handle optional PDF upload
    let pdfUrl = '';
    const pdfFile = formData.get('pdf') as File;
    console.log('PDF file received:', pdfFile ? { name: pdfFile.name, size: pdfFile.size, type: pdfFile.type } : 'none');

    if (pdfFile && pdfFile.size > 0) {
      try {
        const rawName = formData.get('name');
        const productSlug = rawName
          ? rawName.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')
          : `product-${Date.now()}`;

        const folderPath = `products/${productSlug}/documents`;
        console.log('Attempting to upload PDF to:', folderPath);
        pdfUrl = await uploadPdfToStorage(pdfFile, folderPath);
        console.log('PDF upload successful, URL:', pdfUrl);
      } catch (error) {
        console.error('Error uploading PDF:', error);
        // PDF is optional, so we just log the error and continue
      }
    } else {
      console.log('No PDF file to upload');
    }

    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Create the product data object
    const productData = {
      name,
      slug,
      description: formData.get('description'),
      key_features: JSON.parse(formData.get('keyFeatures') as string || '[]'),
      category_id: formData.get('category'),
      subcategory_id: formData.get('subcategory') || null,
      image1: imageUrls.image1,
      image2: imageUrls.image2 || '',
      image3: imageUrls.image3 || '',
      image4: imageUrls.image4 || '',
      pdf_url: pdfUrl || null,
      seo_title: formData.get('seoTitle') || '',
      seo_description: formData.get('seoDescription') || '',
      seo_keywords: formData.get('seoKeywords') || ''
    };

    const { data: product, error } = await supabase
      .from('products')
      .insert(productData)
      .select('*, categories(id, name, slug), subcategories(id, name, slug)')
      .single();

    if (error) throw error;

    return NextResponse.json(transformProduct(product), { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
