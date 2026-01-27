"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronRight,
  Dot,
  Phone,
  Mail,
  MessageCircle,
  X,
  Loader2,
  Send,
  Share2,
  Facebook,
  Instagram,
  ChevronLeft,
  Download,
} from "lucide-react";

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

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/product-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: product._id,
          productName: product.name,
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

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean) as string[];

  const handleShare = (platform: string) => {
    const productUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedText = encodeURIComponent(
      `Check out this product: ${product.name}`,
    );

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
          "_blank",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
        );
        break;
      case "instagram":
        // Instagram doesn't support direct sharing via URL on web
        // Copy link to clipboard and direct user to Instagram
        navigator.clipboard.writeText(productUrl);
        alert("Link copied! Share it on Instagram");
        break;
    }
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Ref for the banner section
  const bannerRef = useRef(null);
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Banner Section */}
      <section
        className="bg-gradient-to-br from-blue-50 to-gray-50 py-16 pt-32"
        ref={bannerRef}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              bannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-blue-600 mx-auto mb-6"
            ></motion.div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {product.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 mt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-gray-900">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/products/${product.category.slug}`}
            className="hover:text-gray-900"
          >
            {product.category.name}
          </Link>
          {product.subcategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href={`/products/${product.category.slug}/${product.subcategory.slug}`}
                className="hover:text-gray-900"
              >
                {product.subcategory.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-xl overflow-hidden   transition-shadow group">
              <Image
                src={images[selectedImage] || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, 448px"
              />

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2  p-3 rounded-full transition-all z-10 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-blue-900" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2  p-3 rounded-full  transition-all z-10 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-900" />
                  </button>

                  {/* Image Counter */}
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 justify-center overflow-x-auto pb-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border transition-all hover:shadow-lg cursor-pointer ${
                      selectedImage === index
                        ? "border-blue-600 ring-2 ring-blue-300 shadow-md"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-contain p-0.5"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                {product.subcategory?.name || product.category.name}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Key Features */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Key Features
                </h3>
                <div className="space-y-2">
                  {product.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Dot className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
            </div>
            )}

            {/* Download PDF Button */}
            {product.pdfUrl && (
              <div className="mb-8">
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-sm rounded-lg hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Product PDF
                </a>
              </div>
            )}

            {/* CTA Buttons */}
            {/* For mobile only */}
            <div className="sm:hidden">
              <div className="flex flex-col gap-0.5 mt-1 max-w-[200px] mx-auto">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="px-1.5 py-0.5 bg-blue-600 text-white cursor-pointer font-medium text-[10px] rounded-md hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-0.5"
                >
                  <Mail className="w-2.5 h-2.5" />
                  Enquire Now
                </button>

                <a
                  href="https://wa.me/971508813601"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.125rem 0.375rem",
                    backgroundColor: "#10b981",
                    color: "white",
                    fontWeight: "500",
                    fontSize: "10px",
                    borderRadius: "0.375rem",
                    boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.125rem",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#059669";
                    e.currentTarget.style.boxShadow =
                      "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#10b981";
                    e.currentTarget.style.boxShadow =
                      "0 1px 1px 0 rgba(0, 0, 0, 0.05)";
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>

                <a
                  href="tel:+971565022960"
                  className="px-1.5 py-0.5 border border-blue-600 text-blue-600 font-medium text-[10px] rounded-md hover:bg-blue-50 hover:border-blue-700 transition-all flex items-center justify-center gap-0.5"
                >
                  <Phone className="w-2.5 h-2.5" />
                  Call
                </a>
              </div>
            </div>

            {/* For desktop (your original code) */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-1 mt-2 max-w-sm">
              <button
                onClick={() => setShowContactModal(true)}
                className="flex-1 px-3 py-1 bg-blue-600 text-white cursor-pointer font-medium text-xs rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1"
              >
                <Mail className="w-3 h-3" />
                Enquire Now
              </button>

              <a
                href="https://wa.me/971508813601"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flex: "1",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "#10b981",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.25rem",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#059669";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#10b981";
                  e.currentTarget.style.boxShadow =
                    "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>

              <a
                href="tel:+971565022960"
                className="flex-1 px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs rounded-lg hover:bg-blue-50 hover:border-blue-700 transition-all flex items-center justify-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Call
              </a>
            </div>

            {/* For desktop (your original code) */}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-lg shadow-xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Product Enquiry
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{product.name}</p>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Dot className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-sm text-gray-600">
                      We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Mobile *
                      </label>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="+971 XXXXXXXXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        placeholder="Tell us about your requirements..."
                        rows={3}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
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

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-lg shadow-xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Share Product
                </h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleShare("whatsapp");
                      setShowShareModal(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Share on WhatsApp
                  </button>

                  <button
                    onClick={() => {
                      handleShare("facebook");
                      setShowShareModal(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    Share on Facebook
                  </button>

                  <button
                    onClick={() => {
                      handleShare("instagram");
                      setShowShareModal(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    Share on Instagram
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
