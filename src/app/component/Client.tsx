"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
const logos = [
  {
    name: "Chick-fil-A",
    category: "hospitality",
    image: "/hospitality/hospitality (4).jpg",
  },
  {
    name: "Government Example 3",
    category: "government",
    image: "/government/government (3).jpg",
  },
  {
    name: "Rutgers",
    category: "education",
    image: "/university/university (1).jpg",
  },
  {
    name: "Healthcare Example 5",
    category: "healthcare",
    image: "/healthcare/healthcare (5).jpg",
  },
  {
    name: "Banff Sunshine",
    category: "hospitality",
    image: "/hospitality/hospitality (1).jpg",
  },
  {
    name: "Real Estate Example 5",
    category: "realstate",
    image: "/realstate/realstate (5).jpg",
  },
  {
    name: "Hilton Grand",
    category: "hospitality",
    image: "/hospitality/hospitality (5).jpg",
  },
  {
    name: "Blue Cross",
    category: "healthcare",
    image: "/healthcare/healthcare (3).jpg",
  },
  {
    name: "Spinoso",
    category: "realstate",
    image: "/realstate/realstate (1).jpg",
  },
  {
    name: "Government Example 6",
    category: "government",
    image: "/government/government (6).jpg",
  },
  {
    name: "Mississippi",
    category: "education",
    image: "/university/university (6).jpg",
  },
  {
    name: "IntelyCare",
    category: "healthcare",
    image: "/healthcare/healthcare (2).jpg",
  },
  {
    name: "Crumbl Cookies",
    category: "hospitality",
    image: "/hospitality/hospitality (2).jpg",
  },
  {
    name: "NASA",
    category: "government",
    image: "/government/government (2).jpg",
  },
  {
    name: "Hogsalt",
    category: "hospitality",
    image: "/hospitality/hospitality (6).jpg",
  },
  {
    name: "University of Virginia",
    category: "education",
    image: "/university/university (8).jpg",
  },
  {
    name: "Healthcare Example 4",
    category: "healthcare",
    image: "/healthcare/healthcare (4).jpg",
  },
  {
    name: "Government Example 4",
    category: "government",
    image: "/government/government (4).jpg",
  },
  {
    name: "Hawaii Preparatory",
    category: "education",
    image: "/university/university (9).jpg",
  },
  {
    name: "EVO",
    category: "realstate",
    image: "/realstate/realstate (2).jpg",
  },
  {
    name: "Healthcare Example 6",
    category: "healthcare",
    image: "/healthcare/healthcare (1).svg",
  },
  {
    name: "Bozeman",
    category: "government",
    image: "/government/government (1).jpg",
  },
  {
    name: "Real Estate Example 3",
    category: "realstate",
    image: "/realstate/realstate (3).jpg",
  },
  {
    name: "CorePower Yoga",
    category: "healthcare",
    image: "/healthcare/healthcare (1).jpg",
  },
  {
    name: "Bay College",
    category: "education",
    image: "/university/university (7).jpg",
  },
  {
    name: "Oxford",
    category: "education",
    image: "/university/university (10).jpg",
  },
  {
    name: "Government Example 5",
    category: "government",
    image: "/government/government (5).jpg",
  },
  {
    name: "Hilton",
    category: "hospitality",
    image: "/hospitality/hospitality (3).jpg",
  },
  {
    name: "Real Estate Example 4",
    category: "realstate",
    image: "/realstate/realstate (4).jpg",
  },
];

const industries = [
  { id: "all", label: "All Industries" },
  { id: "education", label: "Education" },
  { id: "government", label: "Government" },
  { id: "hospitality", label: "Hospitality" },
  { id: "healthcare", label: "Healthcare" },
  { id: "realstate", label: "Real Estate" },
];

export default function Client() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedLogo, setSelectedLogo] = useState<(typeof logos)[0] | null>(
    null
  );
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  const filteredLogos =
    activeFilter === "all"
      ? logos
      : logos.filter((logo) => logo.category === activeFilter);

  const currentIndex = selectedLogo
    ? filteredLogos.findIndex((logo) => logo.name === selectedLogo.name)
    : -1;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredLogos.length;
    setSelectedLogo(filteredLogos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex === 0 ? filteredLogos.length - 1 : currentIndex - 1;
    setSelectedLogo(filteredLogos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="flex-shrink-0 flex flex-col items-center text-center mx-auto"
          style={{ maxWidth: "280px" }}
        >
          <div className="inline-block overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 60 }}
              animate={isHeaderInView ? { y: 0 } : { y: 60 }}
              transition={{
                duration: 0.9,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2,
              }}
              className="tsm:text-3xl  md:text-5xl lg:text-3xl font-bold tracking-tight text-gray-900"
            >
              OUR CLIENTS
            </motion.h1>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Trusted by Those Who Expect Excellence
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={isHeaderInView ? { width: "140px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-blue-800 to-blue-900 mb-4"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center hover:cursor-pointer gap-2 mb-16 border-b border-gray-200">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveFilter(industry.id)}
              className={`px-6 py-3 text-sm hover:cursor-pointer font-medium transition-all relative ${
                activeFilter === industry.id
                  ? "text-blue-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {industry.label}
              {activeFilter === industry.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900" />
              )}
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {logos.map((logo, index) => {
            const isFiltered =
              activeFilter === "all" || logo.category === activeFilter;
            const isImagePath = logo.image.startsWith("/");

            return (
              <div
                key={index}
                className={`flex items-center justify-center p-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                  isFiltered ? "opacity-100" : "opacity-30 grayscale"
                }`}
                onClick={() => isFiltered && setSelectedLogo(logo)}
              >
                <div className="text-center">
                  {isImagePath ? (
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={60}
                      height={60}
                      className="mx-auto mb-2 object-cover rounded"
                    />
                  ) : (
                    <div className="text-4xl mb-2">{logo.image}</div>
                  )}
                  <div
                    className={`text-xs font-medium ${
                      isFiltered ? "text-gray-700" : "text-gray-400"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for enlarged logo */}
      {selectedLogo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedLogo(null)}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute hover:cursor-pointer left-4 md:left-20 text-white hover:text-gray-300 transition-colors z-50"
          >
            <svg
              className="w-12 h-12 md:w-16 md:h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-8 max-w-2xl w-full relative"
          >
            <button
              onClick={() => setSelectedLogo(null)}
              className="absolute top-4 right-4  hover:cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center justify-center">
              {selectedLogo.image.startsWith("/") ? (
                <Image
                  src={selectedLogo.image}
                  alt={selectedLogo.name}
                  width={300}
                  height={300}
                  className="object-contain rounded mb-4"
                />
              ) : (
                <div className="text-8xl mb-4">{selectedLogo.image}</div>
              )}
            </div>
          </motion.div>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 hover:cursor-pointer md:right-20 text-white hover:text-gray-300 transition-colors z-50"
          >
            <svg
              className="w-12 h-12 md:w-16 md:h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
}
