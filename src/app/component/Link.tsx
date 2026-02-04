"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";

interface ImageCard {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export default function Link() {
  const imageCards: ImageCard[] = [
    {
      id: 1,
      src: "/images/custom-fabrication.jpg",
      alt: "Custom Fabrication Solution",
      title: "CUSTOM FABRICATION SOLUTION",
      description:
        "Innovative custom solutions tailored to your specific needs with precision engineering and quality craftsmanship.",
      link: "/services/fabrication",
      linkText: "Learn More",
    },
    {
      id: 2,
      src: "/images/surveillance.jpg",
      alt: "Surveillance Solution",
      title: "SURVEILLANCE SOLUTION",
      description:
        "Advanced CCTV and security systems to protect your business and property with cutting-edge technology.",
      link: "/services/surveillance",
      linkText: "Learn More",
    },
    {
      id: 3,
      src: "/images/network.jpg",
      alt: "Network Solution",
      title: "NETWORK SOLUTION",
      description:
        "Comprehensive networking infrastructure and connectivity solutions for seamless business operations.",
      link: "/services/network",
      linkText: "Learn More",
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_60%] gap-0 items-stretch min-h-[400px] sm:min-h-[520px] md:min-h-[620px] lg:min-h-[820px]">
          {/* Left Side - Image Cards with Hover Effects */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2,
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex  flex-col bg-blue-900 justify-between space-y-4 h-full"
          >
            {imageCards.map((card, index) => (
              <div key={card.id} className="space-y-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="relative group overflow-hidden shadow-sm h-40 sm:h-48 md:h-56 lg:h-[38vh] cursor-pointer rounded-lg"
                >
                  {/* Background Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 group-hover:from-[#2b2f6b]/75 group-hover:to-[#2b2f6b]/90 transition-all duration-500"></div>
                  </div>

                  {/* Default State - Title */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                    <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-center px-3 sm:px-4 tracking-wider drop-shadow-md">
                      {card.title}
                    </h3>
                  </div>

                  {/* Hover State - Description and Button */}
                  <div className="absolute inset-0 flex items-center justify-center p-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-full h-full bg-[#2b2f6b] text-white flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-10 text-center transform transition-transform duration-300">
                      <p className="text-white text-sm sm:text-base md:text-lg font-medium mb-4 sm:mb-6 leading-relaxed max-w-[900px]">
                        {card.description}
                      </p>
                      <NextLink href={card.link}>
                        <motion.button
                          whileHover={{ scale: 1 }}
                          className="px-4 sm:px-6 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-[#2b2f6b] font-semibold transition-colors duration-300 text-xs sm:text-sm"
                        >
                          More Details
                        </motion.button>
                      </NextLink>
                    </div>
                  </div>
                </motion.div>
                {index < imageCards.length - 1 && (
                  <div className="h-6 bg-[#35215b]"></div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center mr-5 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 h-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 sm:space-y-5 md:space-y-6 w-full"
            >
              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-2 sm:space-y-3"
              >
                <p className="text-xs sm:text-sm md:text-base text-blue-900 font-semibold tracking-widest">
                  WELCOME TO
                </p>
                {/* Logo Image */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <Image
                    src="/logo2.png"
                    alt="I-Link Logo"
                    width={160}
                    height={80}
                    className="object-contain h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
                    sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 160px"
                  />
                </div>
                {/* Underline Divider */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-0.5 sm:h-1 bg-blue-900 rounded-full"
                />
                {/* Tagline with dots */}
                <p className="text-xs sm:text-sm text-blue-500 font-medium tracking-wider pt-1 sm:pt-2">
                  PROFESSION . TRUST . SAFETY . INNOVATIVE
                </p>
              </motion.div>

              {/* Main Description */}
              <div className="space-y-3 sm:space-y-4 text-[#2b1b4a] text-xs sm:text-sm md:text-base leading-5 sm:leading-6 md:leading-7 text-left pr-0 sm:pr-2 md:pr-4 font-medium">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-justify"
                >
                  Bright Elv Technology Excels In Providing Innovative,
                  Trustworthy, And Cost-Efficient ELV Technology Solutions. Our
                  Mission Is To Enhance The Comfort And Intelligence Of Your
                  Home And Business Through The Integration Of Cutting-Edge
                  Solutions.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-justify"
                >
                  Our Company Has Grown To Become One Of The CCTV Brackets Poles
                  Cabinets Accessories & Customized Solution Suppliers As A
                  Brand Name Of "I-Link". We Export Our Products Worldwide With
                  A Strong Client Base In Retail, Corporate And Hotel Projects.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-justify"
                >
                  Are You Considering Implementing A Comprehensive ELV Solution?
                  As An Accomplished ELV Company In Dubai, We Are Equipped To
                  Help. While Headquartered In Dubai, Our Services Extend Across
                  The UAE, Offering Full Supply And Installation Services.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-justify"
                >
                  Get In Touch With Us Today And Let Us Revolutionize The Way
                  You Live And Do Business With Our Advanced ELV Solutions.
                </motion.p>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="pt-2 sm:pt-4"
              >
                <NextLink href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-[#2b1b4a] text-white hover:bg-[#3a2b6b] font-semibold transition-all duration-300 text-sm sm:text-base md:text-lg cursor-pointer shadow-lg hover:shadow-xl rounded-lg sm:rounded-xl"
                  >
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
