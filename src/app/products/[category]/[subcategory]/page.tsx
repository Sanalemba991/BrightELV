import { notFound } from 'next/navigation';
import SubCategoryClient from './SubCategoryClient';
import type { Metadata } from 'next';

/* -----------------------------------------
   TYPES
------------------------------------------ */
interface Category {
  _id: string;
  name: string;
  slug: string;
  displayType?: 'subcategories' | 'products';
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  keyFeatures: string[];
  category: { _id: string; name: string; slug: string };
  subcategory?: { _id: string; name: string; slug: string };
}

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

/* -----------------------------------------
   FETCH CATEGORY
------------------------------------------ */
async function getCategory(slug: string): Promise<Category | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) return null;

  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const categories = await res.json();
  return categories.find((c: Category) => c.slug === slug) || null;
}

/* -----------------------------------------
   FETCH SUBCATEGORY + SEO
------------------------------------------ */
async function getSubCategory(
  categoryId: string,
  slug: string
): Promise<SubCategory | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) return null;

  const res = await fetch(
    `${baseUrl}/api/subcategories?category=${categoryId}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;

  const subcategories = await res.json();
  const subcategory = subcategories.find(
    (s: SubCategory) => s.slug === slug
  );

  if (!subcategory) return null;

  // 🔹 SEO metadata
  const seoRes = await fetch(`${baseUrl}/api/seo?slug=${slug}`);
  if (seoRes.ok) {
    const seoData = await seoRes.json();
    if (seoData?.success) {
      subcategory.metaTitle = seoData.data.metaTitle;
      subcategory.metaDescription = seoData.data.metaDescription;
      subcategory.metaKeywords = seoData.data.metaKeywords;
    }
  }

  return subcategory;
}

/* -----------------------------------------
   FETCH PRODUCTS
------------------------------------------ */
async function getProducts(query: string): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/products?${query}`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];
  return await res.json();
}

/* -----------------------------------------
   SEO METADATA
------------------------------------------ */
interface MetadataProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subSlug } = await params;

  const category = await getCategory(categorySlug);
  if (!category) {
    return { title: 'Not Found', description: 'Page not found' };
  }

  const subcategory = await getSubCategory(category._id, subSlug);

  // Product page SEO fallback
  if (!subcategory) {
    const product = (await getProducts(`slug=${subSlug}`))[0];
    if (!product) return { title: 'Not Found' };

    return {
      title: `${product.name} | ${category.name}`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.image1 ? [{ url: product.image1 }] : [],
      },
    };
  }

  const title =
    subcategory.metaTitle ||
    `${subcategory.name} | ${category.name}`;

  const description =
    subcategory.metaDescription ||
    subcategory.description ||
    `Explore ${subcategory.name} products under ${category.name}`;

  return {
    title,
    description,
    keywords: subcategory.metaKeywords,
    openGraph: {
      title,
      description,
      images: subcategory.image ? [{ url: subcategory.image }] : [],
    },
    robots: { index: true, follow: true },
  };
}

/* -----------------------------------------
   MAIN PAGE
------------------------------------------ */
export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subSlug } = await params;

  const category = await getCategory(categorySlug);
  if (!category) notFound();

  let subcategory: SubCategory | null = null;
  let products: Product[] = [];
  let singleProduct: Product | null = null;
  let isProductPage = false;

  if (category.displayType === 'products') {
    const prods = await getProducts(`slug=${subSlug}`);
    if (!prods.length) notFound();

    singleProduct = prods[0];
    isProductPage = true;
  } else {
    subcategory = await getSubCategory(category._id, subSlug);

    if (subcategory) {
      products = await getProducts(`subcategory=${subcategory._id}`);
    } else {
      const prods = await getProducts(`slug=${subSlug}`);
      if (!prods.length) notFound();

      singleProduct = prods[0];
      isProductPage = true;
    }
  }

  return (
    <SubCategoryClient
      category={category}
      subcategory={subcategory}
      products={products}
      singleProduct={singleProduct}
      isProductPage={isProductPage}
      categorySlug={categorySlug}
      subcategorySlug={subSlug}
    />
  );
}
