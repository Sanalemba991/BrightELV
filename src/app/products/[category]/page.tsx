import { notFound } from 'next/navigation';
import CategoryClient from './CategoryClient';
import type { Metadata } from 'next';

/* -----------------------------------------
   TYPES
------------------------------------------ */
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayType: 'subcategories' | 'products';

  // SEO (optional)
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image1: string;
  category: { _id: string; name: string };
  subcategory?: { _id: string; name: string };
}

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

/* -----------------------------------------
   FETCH CATEGORY
------------------------------------------ */
async function getCategory(slug: string): Promise<Category | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL is not set');
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return null;

    const categories = await res.json();
    const category = categories.find((c: Category) => c.slug === slug);

    if (!category) return null;

    // 🔹 Fetch SEO metadata
    const seoRes = await fetch(`${baseUrl}/api/seo?slug=${slug}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (seoRes.ok) {
      const seoData = await seoRes.json();
      if (seoData?.success) {
        category.metaTitle = seoData.data.metaTitle;
        category.metaDescription = seoData.data.metaDescription;
        category.metaKeywords = seoData.data.metaKeywords;
      }
    }

    return category;
  } catch (error) {
    console.error('Failed to fetch category:', error);
    return null;
  }
}

/* -----------------------------------------
   FETCH SUBCATEGORIES
------------------------------------------ */
async function getSubcategories(categoryId: string): Promise<SubCategory[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/subcategories?category=${categoryId}`,
      { cache: 'no-store' }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch subcategories:', error);
    return [];
  }
}

/* -----------------------------------------
   FETCH PRODUCTS
------------------------------------------ */
async function getProducts(categoryId: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/products?category=${categoryId}`,
      { cache: 'no-store' }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

/* -----------------------------------------
   SEO METADATA
------------------------------------------ */
interface MetadataProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'This category does not exist.',
    };
  }

  const title =
    category.metaTitle || `${category.name} | Our Products`;

  const description =
    category.metaDescription ||
    `Explore our range of ${category.name}. Premium quality products with best pricing and support.`;

  const keywords =
    category.metaKeywords ||
    `${category.name}, ${category.name} products, buy ${category.name}, best ${category.name}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://yourdomain.com/category/${slug}`,
      images: category.image ? [{ url: category.image }] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* -----------------------------------------
   MAIN PAGE
------------------------------------------ */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const category = await getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const subcategories =
    category.displayType === 'subcategories'
      ? await getSubcategories(category._id)
      : [];

  const products =
    category.displayType === 'products'
      ? await getProducts(category._id)
      : [];

  return (
    <CategoryClient
      category={category}
      subcategories={subcategories}
      products={products}
      categorySlug={categorySlug}
    />
  );
}
