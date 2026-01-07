// app/products/[category]/CategoryClient.tsx (Client Component)

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import {
  FiGrid,
  FiSearch,
  FiChevronRight,
  FiHome,
  FiBox,
  FiX,
  FiPackage,
  FiShield,
  FiCpu,
  FiCamera,
  FiWifi,
  FiMonitor,
} from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayType: "subcategories" | "products";
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

interface CategoryClientProps {
  category: Category;
  subcategories: SubCategory[];
  products: Product[];
  categorySlug: string;
}

export default function CategoryClient({
  category,
  subcategories,
  products,
  categorySlug,
}: CategoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredSubcategories = subcategories.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Refs for sections
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  // Ref for the new section
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Get appropriate icon based on category name
  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes("security") ||
      lowerName.includes("surveillance") ||
      lowerName.includes("camera")
    )
      return <FiCamera className="w-12 h-12" />;
    if (lowerName.includes("network") || lowerName.includes("wifi"))
      return <FiWifi className="w-12 h-12" />;
    if (lowerName.includes("computing") || lowerName.includes("server"))
      return <FiCpu className="w-12 h-12" />;
    if (lowerName.includes("display") || lowerName.includes("monitor"))
      return <FiMonitor className="w-12 h-12" />;
    if (lowerName.includes("protection") || lowerName.includes("safety"))
      return <FiShield className="w-12 h-12" />;
    return <FiPackage className="w-12 h-12" />;
  };

  return (
    <>
      {/* New Features Section - Between Banner and Products */}
      <section className="bg-white py-16" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-2">
              {category.name}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-blue-900 mx-auto"
            ></motion.div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {category.description ||
                "Explore our comprehensive range of products and solutions."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Content Section - Clean Product Showcase Style */}
      <div className="bg-gray-50">
        <main className="w-full py-16 px-4 md:px-8 lg:px-8 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <FiHome className="w-4 h-4" />
              Home
            </Link>
            <FiChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <FiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </motion.nav>

          {/* Search Bar */}
          <motion.div
            className="max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative">
              <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-3 py-1.5">
                <FiSearch className="text-gray-400 w-4 h-4 mr-3" />
                <input
                  type="text"
                  placeholder={
                    category.displayType === "products"
                      ? "Search products..."
                      : "Search subcategories..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setSearchTerm("")}
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content - Either SubCategories or Products based on displayType */}
          {category.displayType === "products" ? (
            // Show Products Grid
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.length === 0 ? (
                <motion.div
                  className="col-span-full flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiBox className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">
                    {searchTerm
                      ? `No products found for "${searchTerm}"`
                      : "No products found"}
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial="hidden"
                    animate={gridInView ? "visible" : "hidden"}
                    variants={cardVariants}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredCard(product._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link
                      href={`/products/${categorySlug}/${product.slug}`}
                      className="group block bg-gray-200 overflow-hidden transition-all duration-300"
                    >
                      {/* Product Image Container */}
                      <div className="relative bg-white h-64 flex items-center justify-center p-8">
                        {product.image1 ? (
                          <img
                            src={product.image1}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {getCategoryIcon(product.name)}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 text-gray-400">
                        <h3 className="text-gray-700 text-center font-medium text-base mb-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            // Show SubCategories Grid
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredSubcategories.length === 0 ? (
                <motion.div
                  className="col-span-full flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiGrid className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">
                    {searchTerm
                      ? `No subcategories found for "${searchTerm}"`
                      : "No subcategories found"}
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                filteredSubcategories.map((subcategory, index) => (
                  <motion.div
                    key={subcategory._id}
                    initial="hidden"
                    animate={gridInView ? "visible" : "hidden"}
                    variants={cardVariants}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredCard(subcategory._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link
                      href={`/products/${categorySlug}/${subcategory.slug}`}
                      className="group block bg-gray-200 overflow-hidden transition-all duration-300"
                    >
                      {/* Subcategory Image Container */}
                      <div className="relative bg-white h-64 flex items-center justify-center p-8">
                        {subcategory.image ? (
                          <img
                            src={subcategory.image}
                            alt={subcategory.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {getCategoryIcon(subcategory.name)}
                          </div>
                        )}
                      </div>

                      {/* Subcategory Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-center mb-2">
                          <h3 className="text-gray-700 text-center font-medium text-base group-hover:text-blue-600 transition-colors">
                            {subcategory.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
