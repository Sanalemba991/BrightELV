import { notFound } from 'next/navigation';
import SubCategoryClient from './SubCategoryClient';

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

async function getCategories(): Promise<Category[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/categories`, {
            cache: 'no-store'
        });
        
        if (!response.ok) return [];
        
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

async function getSubcategories(categoryId: string): Promise<SubCategory[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/subcategories?category=${categoryId}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) return [];
        
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch subcategories:', error);
        return [];
    }
}

async function getProducts(query: string): Promise<Product[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/products?${query}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) return [];
        
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default async function SubCategoryPage({
    params,
}: {
    params: Promise<{ category: string; subcategory: string }>;
}) {
    // Await params in Next.js 15+
    const { category: categorySlug, subcategory: subcategorySlug } = await params;
    
    const categories = await getCategories();
    const category = categories.find((c: Category) => c.slug === categorySlug);
    
    if (!category) {
        notFound();
    }
    
    let subcategory: SubCategory | null = null;
    let products: Product[] = [];
    let singleProduct: Product | null = null;
    let isProductPage = false;
    
    if (category.displayType === 'products') {
        // Check if subcategorySlug is actually a product slug
        const prods = await getProducts(`slug=${subcategorySlug}`);
        if (prods.length > 0) {
            singleProduct = prods[0];
            isProductPage = true;
        } else {
            notFound();
        }
    } else {
        // Find subcategory
        const subcategories = await getSubcategories(category._id);
        subcategory = subcategories.find((s: SubCategory) => s.slug === subcategorySlug) || null;
        
        if (subcategory) {
            // Fetch products in this subcategory
            products = await getProducts(`subcategory=${subcategory._id}`);
        } else {
            // Maybe it's a product without subcategory
            const prods = await getProducts(`slug=${subcategorySlug}`);
            if (prods.length > 0) {
                singleProduct = prods[0];
                isProductPage = true;
            } else {
                notFound();
            }
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
            subcategorySlug={subcategorySlug}
        />
    );
}