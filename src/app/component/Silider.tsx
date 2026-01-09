"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ================================
   Types
================================ */
interface ImageItem {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  link: string;
  large?: boolean;
}

/* ================================
   Image Card Component
================================ */
const ImageCard = ({ item }: { item: ImageItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <a href={item.link}>
        <div
          className="relative overflow-hidden bg-white transition-all duration-300 group h-[220px] md:h-[260px] lg:h-[300px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image */}
          <motion.img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6 text-white">
            <span className="text-[10px] md:text-xs font-medium tracking-wider uppercase text-white/85">
              {item.tag}
            </span>

            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mt-1 mb-1">
              {item.title}
            </h3>

            <p className="text-white/85 text-xs md:text-sm font-light mb-2 max-w-md">
              {item.subtitle}
            </p>

            {/* Learn More */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-flex items-center gap-1.5 text-white font-medium text-xs md:text-sm">
                Learn More
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </span>
            </motion.div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </a>
    </motion.div>
  );
};

/* ================================
   Main Slider Component
================================ */
export default function Slider() {
  const imageData: Record<string, ImageItem> = {
    cctvInstallation: {
      id: 1,
      title: "CCTV Installation",
      subtitle:
        "Professional CCTV system installation for residential and commercial properties with high-definition cameras and advanced monitoring.",
      tag: "SECURITY",
      imageUrl: "/sa.jpeg",
      link: "/elv-solution/cctv-installation",
      large: true,
    },

    cctvMaintenance: {
      id: 2,
      title: "CCTV Maintenance",
      subtitle:
        "Regular maintenance and support services to keep your CCTV systems running at peak performance with timely inspections and repairs.",
      tag: "MAINTENANCE",
      imageUrl: "/sa3.jpeg",
      link: "/elv-solution/cctv-maintenance",
      large: false,
    },

    structuredCabling: {
      id: 3,
      title: "Structured Cabling",
      subtitle:
        "High-quality structured cabling solutions for modern network infrastructure, including Cat6, Cat6A, and fiber optic installations.",
      tag: "NETWORK",
      imageUrl: "/sa4.jpeg",
      link: "/elv-solution/structure-cabling",
      large: false,
    },

    pabxSystems: {
      id: 4,
      title: "PABX Systems",
      subtitle:
        "Professional Private Automatic Branch Exchange systems for efficient and scalable business communications with advanced features.",
      tag: "COMMUNICATION",
      imageUrl: "/sa1.jpeg",
      link: "/elv-solution/pabx",
      large: true,
    },
  };

  return (
    <main className="min-h-screen bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
            What’s New
          </h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-blue-900 mx-auto"
          />
        </motion.header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
          {Object.values(imageData).map((item) => (
            <div
              key={item.id}
              className={item.large ? "lg:col-span-2" : "lg:col-span-1"}
            >
              <ImageCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
