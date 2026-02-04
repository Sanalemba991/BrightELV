"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// A small set of featured slides for the left-hand carousel
const featured = [
  {
    id: "aloft",
    title: "ALOFT HOTELS",
    category: "hospitality",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    text: "I'm impressed by the quality of products and the professionalism BrightElv maintains. It's truly a game-changer for my business!",
  },
  {
    id: "manipal",
    title: "MANIPAL",
    category: "education",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    text: "A trusted partner for our educational campus solutions.",
  },
  {
    id: "nasa",
    title: "NASA",
    category: "government",
    image:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    text: "Trusted technology partner for mission-critical government operations.",
  },
  {
    id: "bluecross",
    title: "BLUE CROSS",
    category: "healthcare",
    image:
      "https://images.unsplash.com/photo-1516549655669-df6654e435de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    text: "Delivering excellence in healthcare facility solutions.",
  },
  {
    id: "spinoso",
    title: "SPINOSO REAL ESTATE",
    category: "realstate",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    text: "Premium solutions for luxury real estate developments.",
  },
];

// Full dataset for logos (taken from Client.tsx)
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
  { name: "EVO", category: "realstate", image: "/realstate/realstate (2).jpg" },
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

// Helper to convert category id into a display label
function getCategoryLabel(cat: string) {
  const map: Record<string, string> = {
    education: "Education",
    government: "Government",
    hospitality: "Hospitality",
    healthcare: "Healthcare",
    realstate: "Real Estate",
  };
  return map[cat] ?? cat;
}

export default function Client() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>(
    featured[0].category,
  );
  const [manualFilter, setManualFilter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<(typeof logos)[0] | null>(
    null,
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!manualFilter) {
      setActiveFilter(featured[activeIndex].category);
    }
  }, [activeIndex, manualFilter]);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setManualFilter(false);
      setActiveIndex((i) => (i + 1) % featured.length);
    }, 6000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const filteredLogos =
    activeFilter === "all"
      ? logos
      : logos.filter((l) => l.category === activeFilter);

  const handlePrev = () => {
    setManualFilter(false);
    setActiveIndex((i) => (i === 0 ? featured.length - 1 : i - 1));
  };

  const handleNext = () => {
    setManualFilter(false);
    setActiveIndex((i) => (i + 1) % featured.length);
  };

  const filteredLogosForModal =
    activeFilter === "all"
      ? logos
      : logos.filter((logo) => logo.category === activeFilter);

  const currentIndex = selectedLogo
    ? filteredLogosForModal.findIndex((logo) => logo.name === selectedLogo.name)
    : -1;

  const handleModalNext = () => {
    const nextIndex = (currentIndex + 1) % filteredLogosForModal.length;
    setSelectedLogo(filteredLogosForModal[nextIndex]);
  };

  const handleModalPrev = () => {
    const prevIndex =
      currentIndex === 0 ? filteredLogosForModal.length - 1 : currentIndex - 1;
    setSelectedLogo(filteredLogosForModal[prevIndex]);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-xl font-semibold text-gray-800 tracking-wide mb-2">
            OUR CLIENTS
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-600 pb-2 border-b border-blue-600 inline-block">
            PLEASURE TO WORK WITH
          </h2>
        </div>

        <div className="flex items-start gap-8 flex-col lg:flex-row">
          {/* Left: Large featured card */}
          <div className="w-full lg:w-1/2">
            <div
              className="relative rounded-lg overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image container */}
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-md overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] // Smooth easing
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.95,
                      transition: {
                        duration: 0.5,
                        ease: "easeInOut"
                      }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featured[activeIndex].image}
                      alt={featured[activeIndex].title}
                      width={900}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Content overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -10,
                    transition: {
                      duration: 0.3
                    }
                  }}
                  className="absolute left-6 top-6 text-white max-w-sm p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0 bg-white/10 backdrop-blur-sm">
                      {featured[activeIndex].image ? (
                        <Image
                          src={featured[activeIndex].image}
                          alt={`${featured[activeIndex].title} logo`}
                          width={48}
                          height={48}
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="font-bold text-xs text-white">
                          {featured[activeIndex].title
                            .split(" ")
                            .slice(0, 2)
                            .map((s) => s[0])
                            .join("")}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold uppercase leading-tight">
                        {featured[activeIndex].title}
                      </h3>
                      <p className="text-xs md:text-sm mt-2 opacity-95 leading-relaxed">
                        {featured[activeIndex].text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls - only visible on hover */}
              <motion.button
                onClick={handlePrev}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : -10 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4     text-gray-700 hover:text-gray-900 transition-all duration-300 w-14 h-14 flex items-center justify-center group"
                aria-label="Previous"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-125 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : 10 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4    text-gray-700 hover:text-gray-900 transition-all duration-300 w-14 h-14 flex items-center justify-center group"
                aria-label="Next"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-125 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Right: Title + Logo grid */}
          <div className="w-full lg:w-1/2">
            {/* Centered title */}
            <div className="w-full text-center mb-8">
              <motion.h2
                key={activeFilter}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl font-bold text-blue-900 tracking-wide"
              >
                {getCategoryLabel(activeFilter)}
              </motion.h2>
            </div>

            {/* Logo grid */}
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center items-center"
            >
              {filteredLogos.map((l, i) => (
                <motion.button
                  key={`${l.name}-${activeFilter}`}
                  onClick={() => {
                    setSelectedLogo(l);
                    const idx = featured.findIndex(
                      (f) => f.category === l.category,
                    );
                    if (idx !== -1) {
                      setManualFilter(false);
                      setActiveIndex(idx);
                    } else {
                      setManualFilter(true);
                      setActiveFilter(l.category);
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  whileHover={{ 
                    scale: 1.12, 
                    transition: { 
                      duration: 0.3,
                      ease: "easeOut" 
                    } 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-xs flex items-center justify-center p-2 rounded-md transform transition-shadow duration-300"
                >
                  <div className="w-full h-28 flex items-center justify-center">
                    {l.image ? (
                      <Image
                        src={l.image}
                        alt={l.name}
                        width={220}
                        height={120}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-lg font-semibold">
                        {l.name
                          .split(" ")
                          .slice(0, 2)
                          .map((s) => s[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
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
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Left Arrow */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleModalPrev();
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute hover:cursor-pointer left-4 md:left-20 text-white hover:text-gray-200 transition-colors z-50"
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
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedLogo(null)}
              className="absolute top-6 right-6 hover:cursor-pointer text-gray-400 hover:text-gray-700 transition-colors z-50 w-10 h-10 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content Container */}
            <div className="flex flex-col items-center justify-center py-16 px-8 md:px-16">
              {/* Logo Display */}
              <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-2xl h-80 flex items-center justify-center">
                  {selectedLogo.image.startsWith("/") ? (
                    <Image
                      src={selectedLogo.image}
                      alt={selectedLogo.name}
                      width={600}
                      height={400}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="text-8xl">{selectedLogo.image}</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Arrow */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleModalNext();
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute right-4 hover:cursor-pointer md:right-20 text-white hover:text-gray-200 transition-colors z-50"
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
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}