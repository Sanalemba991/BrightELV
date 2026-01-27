import { notFound } from 'next/navigation';
import CategoryClient from './CategoryClient';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    displayType: 'subcategories' | 'products';
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

async function getCategory(slug: string): Promise<Category | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/categories`, {
            cache: 'no-store'
        });
        
        if (!response.ok) return null;
        
        const categories = await response.json();
        return categories.find((c: Category) => c.slug === slug) || null;
    } catch (error) {
        console.error('Failed to fetch category:', error);
        return null;
    }
}

async function getSubcategories(categoryId: string): Promise<SubCategory[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/subcategories?category=${categoryId}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) return [];
        
        const subcategories = await response.json();
        return subcategories.filter((s: SubCategory) => s);
    } catch (error) {
        console.error('Failed to fetch subcategories:', error);
        return [];
    }
}

async function getProducts(categoryId: string): Promise<Product[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/products?category=${categoryId}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) return [];
        
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    // Await params in Next.js 15+
    const { category: categorySlug } = await params;
    
    const category = await getCategory(categorySlug);
    
    if (!category) {
        notFound();
    }
    
    // Fetch either subcategories or products based on displayType
    const subcategories = category.displayType === 'subcategories' 
        ? await getSubcategories(category._id)
        : [];
    
    const products = category.displayType === 'products'
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