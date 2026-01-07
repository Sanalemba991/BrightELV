"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Testimonial() {
  const testimonials = [
    {
      quote:
        "The numbers speak for themselves. We're seeing a 50% resolution rate with Fin, which is pretty amazing!",
      name: "Ben Peak",
      position: "Director of Technical Support",
      company: "Robin",
      image: "/samb.jpg",
    },
    {
      quote:
        "Fin has transformed our workflow. Efficiency up by 40%! Highly recommend.",
      name: "Alice Johnson",
      position: "CTO",
      company: "TechCorp",
      image: "/alice.jpg",
    },
    {
      quote: "Outstanding support and reliability. Our team loves using Fin.",
      name: "John Doe",
      position: "Manager",
      company: "Innovate Ltd",
      image: "/john.jpg",
    },
    {
      quote:
        "Fin is a game-changer for our operations. Increased productivity significantly.",
      name: "Sarah Lee",
      position: "VP",
      company: "Global Solutions",
      image: "/sarah.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl w-full bg-white/40 backdrop-blur-sm shadow-lg overflow-hidden">
        <motion.div
          key={currentIndex}
          className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <p className="text-sm md:text-base lg:text-m font-light text-gray-800 leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
            </div>

            <div className="pt-2 space-y-1">
              <p className="text-sm font-semibold text-blue-900">
                {currentTestimonial.name}
              </p>
              <p className="text-xs text-gray-600">
                {currentTestimonial.position}
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex-shrink-0">
            {/* Decorative Background Shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-40 h-40 bg-gray-200/40 rounded-full blur-3xl"></div>
              <div className="absolute w-32 h-32 bg-gray-300/30 rounded-full -right-4 -top-4"></div>
              <div className="absolute w-28 h-28 bg-gray-400/20 rounded-full -left-4 -bottom-4"></div>
            </div>

            {/* Profile Image Container */}
            <div className="relative z-10 w-40 h-40 md:w-48 md:h-48">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
