"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";

interface ImageCard {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export default function Link() {
  // Sample image data - replace with your actual local images
  const images = [
    {
      id: 1,
      src: "/images/elv-tech-1.jpg", // Replace with your local image path
      alt: "ELV Technology Solutions",
    },
    {
      id: 2,
      src: "/images/elv-tech-2.jpg", // Replace with your local image path
      alt: "CCTV Solutions",
    },
  ];

  return (
    <div className="w-full py-16 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            WELCOME TO BRIGHT ELV TECHNOLOGY
          </h2>

          {/* Tagline */}
          <p className="text-blue-900 text-lg sm:text-xl font-semibold">
            PROFESSION . TRUST . SAFETY . INNOVATIVE
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Professional Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.2, // Longer duration for slower animation
              ease: "easeOut",
              delay: 0.2, // Slight delay before starting
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {/* Main Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4, // Staggered animation
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden  shadow-lg"
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-0.5 bg-blue-900 rounded-full"
              />

              {/* Main Description */}
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Bright Elv Technology excels in providing innovative,
                  trustworthy, and cost-efficient ELV technology solutions. Our
                  mission is to enhance the comfort and intelligence of your
                  home and business through the integration of cutting-edge
                  solutions.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Our company has grown to become one of the leading CCTV
                  brackets, poles, cabinets, accessories & customized solution
                  suppliers under the brand name "I-Link". We export our
                  products worldwide with a strong client base in retail,
                  corporate and hotel projects.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Are you considering implementing a comprehensive ELV solution?
                  As an accomplished ELV company in Dubai, we are fully equipped
                  to help. Though headquartered in Dubai, our services extend
                  throughout the UAE.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className=" text-gray-600"
                >
                  Get in touch with us today and let us revolutionize the way
                  you live and do business with our advanced ELV solutions.
                </motion.p>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <NextLink href="/contact">
                  <motion.button className="inline-block px-6 py-2.5 text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white font-semibold transition-colors duration-300 text-sm sm:text-base cursor-pointer scale-90">
                    Know More
                  </motion.button>
                </NextLink>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
