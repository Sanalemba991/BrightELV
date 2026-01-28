import ProductsPageClient from "./CategoriesGrid";
import type { Metadata } from "next";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayType: "subcategories" | "products";
  isActive: boolean;
}

export const dynamic = "force-dynamic";

/* -----------------------------------------
   FETCH CATEGORIES
------------------------------------------ */
async function getCategories(): Promise<Category[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) return [];

  try {
    const response = await fetch(`${apiUrl}/api/categories`, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data.filter((cat: Category) => cat.isActive);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

/* -----------------------------------------
   SEO METADATA
------------------------------------------ */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ELV Products & Systems in UAE | Bright ELV",
    description:
      "Explore Bright ELV’s range of ELV products including CCTV cameras, access control systems, fire alarm products, structured cabling, and low-voltage security solutions in the UAE.",
    keywords:
      "ELV products UAE, Bright ELV products, CCTV products, access control products, fire alarm systems, structured cabling products, low voltage systems, security products UAE, surveillance equipment, IP cameras, NVR, security hardware UAE",
    openGraph: {
      title: "ELV Products & Systems in UAE | Bright ELV",
      description:
        "Browse our ELV product portfolio including CCTV, access control, fire alarm, and low-voltage security systems by Bright ELV.",
      type: "website",
      url: "https://brightelv.com/our-products",
      siteName: "Bright ELV",
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
