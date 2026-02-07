// app/products/[category]/[subcategory]/SubCategoryClient.tsx (Client Component)

"use client";
import { Variants } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiSearch,
  FiChevronRight,
  FiHome,
  FiBox,
  FiCheck,
  FiX,
  FiPhone,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  slug: string;
  displayType?: "subcategories" | "products";
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

interface SubCategoryClientProps {
  category: Category | null;
  subcategory: SubCategory | null;
  products: Product[];
  singleProduct: Product | null;
  isProductPage: boolean;
  categorySlug: string;
  subcategorySlug: string;
}

export default function SubCategoryClient({
  category,
  subcategory,
  products,
  singleProduct,
  isProductPage,
  categorySlug,
  subcategorySlug,
}: SubCategoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for sections
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  // Ref for the new section
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const cardVariants:Variants = {
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

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/product-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: singleProduct?._id,
          productName: singleProduct?.name,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", mobile: "", message: "" });
        setTimeout(() => {
          setShowContactModal(false);
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productImages = singleProduct
    ? [singleProduct.image1, singleProduct.image2, singleProduct.image3, singleProduct.image4].filter(
        Boolean
      ) as string[]
    : [];

  // Render Product Detail Page
  if (isProductPage && singleProduct) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
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
            <Link
              href={`/products/${categorySlug}`}
              className="hover:text-blue-600"
            >
              {category?.name}
            </Link>
            <FiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {singleProduct.name}
            </span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <motion.div
                  className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {productImages[selectedImage] ? (
                    <Image
                      src={productImages[selectedImage]}
                      alt={singleProduct.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiBox className="w-24 h-24 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {category?.name}
                    </span>
                  </div>
                </motion.div>

                {/* Thumbnail Gallery */}
                {productImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedImage === index
                            ? "border-blue-600 ring-2 ring-blue-600/20"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {singleProduct.name}
                  </h1>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    {singleProduct.description}
                  </p>

                  {/* Key Features */}
                  {singleProduct.keyFeatures &&
                    singleProduct.keyFeatures.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Key Features
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {singleProduct.keyFeatures.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent"
                            >
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FiCheck className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <FiCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Quality Assured
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <FiBox className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Fast Delivery
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <FiCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Best Price
                      </span>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <motion.button
                      onClick={() => setShowContactModal(true)}
                      className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiMail className="w-5 h-5" />
                      Enquire Now
                    </motion.button>

                    <a
                      href="https://wa.me/971508813801"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>

                    <a
                      href="tel:+971565022960"
                      className="flex-1 px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiPhone className="w-5 h-5" />
                      Call Us
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowContactModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Product Enquiry</h2>
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                      {singleProduct.image1 && (
                        <Image
                          src={singleProduct.image1}
                          alt={singleProduct.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{singleProduct.name}</h3>
                      <p className="text-blue-200 text-sm">{category?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheck className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-600">
                        We&apos;ll get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitInquiry} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) =>
                            setFormData({ ...formData, mobile: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+971 XXXXXXXXX"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Tell us about your requirements..."
                          rows={3}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiMail className="w-5 h-5" />
                            Send Enquiry
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <FiBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/products" className="text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* New Features Section - Between Banner and Products */}
      <section className="bg-white py-16 text-4xl font-light text-gray-900 mb-2  py-10 mt-20 px-4 sm:px-6 lg:px-8" ref={featuresRef}>
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
              {subcategory.name}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-blue-900 mx-auto"
            ></motion.div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {subcategory.description ||
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
            className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap"
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
            <Link
              href={`/products/${categorySlug}`}
              className="hover:text-blue-600"
            >
              {category.name}
            </Link>
            <FiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{subcategory.name}</span>
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

        {/* Content - Products Grid */}
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
              >
                <Link
                  href={`/products/${categorySlug}/${subcategorySlug}/${product.slug}`}
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
                        <FiBox className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 text-gray-400">
                    <h3 className="text-gray-700 text-center font-medium text-base mb-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  </>);
}