"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion, Variants } from "framer-motion";
export default function LinkSec() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const offices = [
    {
      id: 1,
      image:
        "/location/1.png",
      alt: "Traditional office",
      title: "Corporate Headquarters",
      location: "Dubai, UAE",
    },
    {
      id: 2,
      image:
        "/location/2.png",
      alt: "Modern office",
      title: "Technology Hub",
      location: "Abu Dhabi, UAE",
    },
    {
      id: 3,
      image:
        "/location/3.png",
      alt: "Collaborative space",
      title: "Innovation Center",
      location: "Riyadh, KSA",
    },
    {
      id: 4,
      image:
        "/location/4.png",
      alt: "Meeting room",
      title: "Client Solutions",
      location: "Doha, Qatar",
    },
    {
      id: 5,
      image:
        "/location/5.png",
      alt: "Workstation",
      title: "Global Operations",
      location: "International",
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const headerVariants: Variants = {
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

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-6 md:px-12 lg:px-16 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <div className="inline-block overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 60 }}
              animate={isInView ? { y: 0 } : { y: 60 }}
              transition={{
                duration: 0.9,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2,
              }}
              className=" sm:text-3xl  md:text-5xl lg:text-3xl font-bold tracking-tight text-gray-900"
            >
              WE OPERATE IN
            </motion.h1>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "180px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-blue-900 to-blue-900 mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm text-gray-600 uppercase tracking-[0.15em] font-medium"
          >
            MIDDLE <span className="text-blue-900">EAST</span> AND BEYOND
          </motion.p>
        </motion.div>

        {/* Office Images Grid - Wider layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center mb-8"
        >
          {/* First row with 3 images - wider */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-6">
            {offices.slice(0, 3).map((office) => (
              <motion.div
                key={office.id}
                className="relative aspect-[5/3] bg-gray-100 overflow-hidden  shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                <img
                  src={office.image}
                  alt={office.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay with opacity effect on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6">
                    <h3 className="text-white text-xl font-bold mb-2 text-center">
                      {office.title}
                    </h3>
                    <p className="text-white/90 text-sm text-center">
                      {office.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row with 2 images - wider and centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {offices.slice(3, 5).map((office) => (
              <motion.div
                key={office.id}
                className="relative aspect-[18/9] bg-gray-100 overflow-hidden  shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                <img
                  src={office.image}
                  alt={office.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay with opacity effect on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6">
                    <h3 className="text-white text-xl font-bold mb-2 text-center">
                      {office.title}
                    </h3>
                    <p className="text-white/90 text-sm text-center">
                      {office.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description with animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={descriptionVariants}
          className="text-center space-y-4 max-w-5xl mx-auto"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            With a strong foothold in the Middle East, Bright Elv Technology LLC
            extends its operations beyond, reaching international markets. Our
            innovation-driven ELV solutions echo globally, delivering top-tier
            technology services to diverse clients.
          </p>
          <p className="text-lg  text-gray-700 leading-relaxed">
            As we grow, our commitment to pioneering solutions remains
            steadfast. Each stride in the UAE arena shows our vision of making a
            global impact with state-of-the-art technology services.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
