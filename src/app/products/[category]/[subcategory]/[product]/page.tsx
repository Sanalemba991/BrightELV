import { Metadata } from 'next';
import Link from 'next/link';
import {  ChevronRight } from 'lucide-react';
import ProductDetailClient from './ProductDetailClient';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  keyFeatures: string[];
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  pdfUrl?: string;
  category: { _id: string; name: string; slug: string };
  subcategory?: { _id: string; name: string; slug: string };
}

interface Props {
  params: Promise<{
    product: string;
  }>;
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products?slug=${slug}`, {
      next: { revalidate: 0 } 
    });
    
    if (response.ok) {
      const data = await response.json();
      return data && data.length > 0 ? data[0] : null;
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const description = product.description || `Discover ${product.name} - Premium ${product.category.name} solution by Bright ELV`;
  const keywords = [
    product.name,
    product.category.name,
    product.subcategory?.name,
    'ELV solutions',
    'Bright ELV'
  ].filter(Boolean);

  return {
    title: `${product.name} | Bright ELV`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${product.name} | Bright ELV`,
      description,
      images: [
        {
          url: product.image1,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Bright ELV`,
      description,
      images: [product.image1],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { product: slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-32">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <Link href="/products" className="text-blue-600 hover:underline flex items-center gap-2">
          Browse all products <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      

      <ProductDetailClient product={product} />
    </>
  );
}
