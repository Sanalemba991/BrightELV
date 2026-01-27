"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiGrid,
  FiPackage,
  FiShield,
  FiCpu,
  FiCamera,
  FiWifi,
  FiMonitor,
} from "react-icons/fi";
import { useState, useRef } from "react";
import { Variants } from "framer-motion";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayType: "subcategories" | "products";
  isActive: boolean;
}

interface CategoriesGridProps {
  initialCategories: Category[];
}

export default function CategoriesGrid({
  initialCategories,
}: CategoriesGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredCategories = initialCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Banner Section */}
      

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
              Our Products
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-blue-900 mx-auto"
            ></motion.div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Bright ELV specializes in providing cutting-edge Extra Low Voltage
              solutions that enhance security, communication, and operational
              efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}

      {/* Products Content Section - Clean Product Showcase Style */}
      <div className="bg-gray-50">
        <main className="w-full py-16 px-4 md:px-8 lg:px-8 max-w-7xl mx-auto">
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
                  placeholder="Search products..."
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

          {/* Products Grid - Clean Layout */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCategories.length === 0 ? (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FiGrid className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
              </motion.div>
            ) : (
              filteredCategories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial="hidden"
                  animate={gridInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredCard(category._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link
                    href={`/products/${category.slug}`}
                    className="group block bg-gray-200  overflow-hidden transition-all duration-300"
                  >
                    {/* Product Image Container */}
                    <div className="relative bg-white h-64 flex items-center justify-center p-8">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-gray-400">
                          {getCategoryIcon(category.name)}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 text-gray-400">
                      <h3 className="text-gray-700 text-center font-medium text-base mb-1 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
