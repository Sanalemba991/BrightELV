import ProductsPageClient from './CategoriesGrid';
import type { Metadata } from 'next';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    displayType: 'subcategories' | 'products';
    isActive: boolean;
}

export const dynamic = 'force-dynamic';

/* -----------------------------------------
   FETCH CATEGORIES
------------------------------------------ */
async function getCategories(): Promise<Category[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) return [];

    try {
        const response = await fetch(`${apiUrl}/api/categories`, {
            next: { revalidate: 60 },
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) return [];

        const data = await response.json();
        return data.filter((cat: Category) => cat.isActive);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

/* -----------------------------------------
   SEO METADATA
------------------------------------------ */
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Our Products | Dahua Authorized Dealer in UAE',
        description: 'Explore our wide range of ELV solutions and products designed to meet your needs. High-quality security and surveillance solutions in the UAE.',
        keywords: 'Dahua products, Dahua authorized dealer UAE, CCTV, Security Systems, Surveillance Solutions, IP Cameras, Video Surveillance, Access Control, NVR, Security Equipment, Home Security, Commercial Security, Dahua Dealer, Dahua Distributor, Dahua Partner, Dahua Authorized Reseller, Dahua CCTV, Dahua Security Cameras, Dahua Surveillance, Dahua Solutions, Dahua UAE, Dahua Middle East',
        openGraph: {
            title: 'Our Products | Dahua Authorized Dealer in UAE',
            description: 'Explore our wide range of ELV solutions and products designed to meet your needs.',
            type: 'website',
            url: 'https://dahua-dubai.com/products',
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
export default async function ProductsPage() {
    const categories = await getCategories();

    return <ProductsPageClient initialCategories={categories} />;
}