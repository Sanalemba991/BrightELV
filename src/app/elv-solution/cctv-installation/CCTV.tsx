"use client";
import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Variants, Transition } from "framer-motion";
import {
  Code,
  Target,
  Zap,
  Headphones,
  Users,
  Award,
  TrendingUp,
  Shield,
  DollarSign,
} from "lucide-react";

export default function CCTV() {
  // Refs for scroll-triggered animations
  const section01Ref = useRef(null);
  const section02Ref = useRef(null);
  const section03Ref = useRef(null);
  const section04Ref = useRef(null);

  // Check if sections are in view
  const isSection01InView = useInView(section01Ref, {
    once: true,
    margin: "-100px",
  });
  const isSection02InView = useInView(section02Ref, {
    once: true,
    margin: "-100px",
  });
  const isSection03InView = useInView(section03Ref, {
    once: true,
    margin: "-100px",
  });
  const isSection04InView = useInView(section04Ref, {
    once: true,
    margin: "-100px",
  });

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Technicians",
      description:
        "At Brightelv, our certified and experienced technicians are dedicated to providing high-quality CCTV installation services. Their expertise ensures that your system is installed correctly and operates efficiently.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Latest Technology",
      description:
        "We leverage the latest advancements in CCTV technology, offering features such as high-definition video, infrared night vision, motion detection, and remote access. This ensures comprehensive security for your property.",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Pricing",
      description:
        "Brightelv offers cost-effective CCTV installation solutions without compromising on quality. Our competitive pricing ensures that you receive the best value for your investment, making top-notch security accessible to all",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Focus on Quality",
      description:
        "Quality is at the core of everything we do. From selecting the best equipment to meticulous installation practices, Brightelv ensures that your CCTV system is of the highest standard, offering you unparalleled security.",
    },
  ];

  const cards = [
    {
      icon: Code,
      title: "Sense Portfolio",
      description:
        "Supports industry-standard data formats, computational workflows, and collaborative objectives and tools.",
    },
    {
      icon: Target,
      title: "Evaluate Portfolio",
      description:
        "Identify high-value opportunities, assess risks, and prioritize investments with comprehensive analysis and decision support.",
    },
    {
      icon: Zap,
      title: "Effect Portfolio",
      description:
        "Transform concepts into tangible and measurable results with comprehensive execution and implementation strategies.",
    },
    {
      icon: Headphones,
      title: "Mission Support",
      description:
        "Enable operational excellence and organizational success with dedicated implementation assistance.",
    },
    {
      icon: Users,
      title: "Solution Support",
      description:
        "Provide comprehensive technical innovation with expert guidance and custom implementation design.",
    },
    {
      icon: Award,
      title: "Excellence Program",
      description:
        "Drive continuous improvement through systematic evaluation and strategic optimization frameworks.",
    },
  ];

  // Enhanced animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const transitionProps: Transition = {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  };

  const bannerBackground =
    "/cctvintallation/cctvinstallation.png";

  const bannerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const bannerTitleVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const bannerFadeInUpVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const bannerSlideInRightVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      {/* HERO SECTION - Mobile-responsive banner */}
      <div className="relative overflow-x-hidden mb-16 w-full h-96 md:h-screen bg-black overflow-hidden">
        {/* Background Image with Fixed Positioning */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center md:bg-fixed"
            style={{
              backgroundImage: `url('${bannerBackground}')`,
              filter: "brightness(0.6)",
            }}
          />
          {/* Dark overlay for better text visibility */}
           </motion.div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 h-full flex flex-col"
          variants={bannerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title - Centered with responsive sizing */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.h1
              className="text-white text-5xl md:text-9xl font-light tracking-tight text-center px-6 md:px-0 leading-tight md:leading-normal"
              variants={bannerTitleVariants}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                CCTV
              </motion.span>
              <motion.span
                className="ml-4 md:ml-8 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Installation
              </motion.span>
            </motion.h1>

            {/* Mobile-only description */}
            <motion.div
              className="md:hidden mt-8 px-6 flex flex-col items-center gap-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.p className="text-white/70 text-sm text-center leading-relaxed max-w-xs">
                Advanced CCTV security solutions in Dubai for residential and
                commercial properties.
              </motion.p>
              <motion.div
                className="h-0.5 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 2 }}
              />
            </motion.div>
          </div>

          {/* Bottom Section - Hidden on mobile, shown on desktop */}
          <div className="pb-12 px-6 md:px-12 hidden md:flex flex-col items-start md:items-end md:flex-row md:justify-between gap-4 md:gap-0">
            <motion.div
              className="flex gap-2"
              variants={bannerFadeInUpVariants}
            ></motion.div>

            <motion.div
              className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto"
              variants={bannerSlideInRightVariants}
            >
              <motion.p
                className="text-white/70 text-sm max-w-md text-left md:text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Advanced CCTV installation services safeguarding your properties
                with state-of-the-art surveillance systems, real-time
                monitoring, and comprehensive security solutions for residential
                and commercial needs.
              </motion.p>

              <motion.div
                className="h-0.5 w-32 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 1, delay: 1.8 }}
              />

              <div className="h-14" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="overflow-x-hidden font-sans">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-6 md:mb-8 lg:mb-8 px-4"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2"
          >
            Reliable CCTV security services by Bright
            <span className="text-blue-900">elv</span> in Dubai
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.4,
            }}
            className="h-1 bg-blue-900 mx-auto"
          ></motion.div>
        </motion.header>

        {/* DESIGN & INTEGRATION SECTION */}
        <motion.section
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2, margin: "-100px" }}
          className="bg-white text-black py-8 md:py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
                }}
                className="relative aspect-[16/10] bg-gray-900 overflow-hidden shadow-2xl"
              >
                <Image
                  src="/cctvintallation/cctvinstallation1.png"
                  alt="Professional presenting solutions"
                  fill
                  className="object-cover hover:scale-105 transition-all duration-700 ease-out"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.4,
                  }}
                  className="text-lg md:text-xl lg:text-xl font-semibold text-gray-900 mt-2 mb-3 md:mb-4"
                >
                  Safeguard your property with Bright ELV's smart CCTV
                  solutions.
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.5,
                  }}
                  className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed"
                >
                  CCTV installation in Dubai.In today's world, security is
                  paramount. BrightELV offers top-notch CCTV installation
                  services in Dubai, safeguarding your properties around the
                  clock with state-of-the-art surveillance systems. Our reliable
                  systems provide real-time monitoring and recording, ensuring
                  peace of mind against theft, vandalism, and unauthorized
                  access.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* AV SOLUTIONS & SERVICES SECTION */}
        <motion.section
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2, margin: "-100px" }}
          className="bg-white text-black py-8 md:py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="lg:order-1"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.3,
                  }}
                  className="text-lg md:text-xl lg:text-xl font-semibold text-gray-900 mt-2 mb-3 md:mb-4"
                >
                  Shield your site with Bright ELV's modern CCTV installation.
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.4,
                  }}
                  className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed"
                >
                  As a leading CCTV supplier in Dubai, Brightelv caters to
                  diverse security needs for homes, offices, retail stores, and
                  industrial facilities. Our advanced CCTV solutions offer
                  comprehensive coverage and unmatched reliability. With
                  cutting-edge technology and professional installation, we rank
                  among the top CCTV companies in Dubai. For those concerned
                  about cost, our competitive CCTV installation prices in Dubai
                  ensure you get the best value. Trust Brightelv to protect what
                  matters most with advanced systems and professional expertise.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
                }}
                className="relative w-full bg-gray-900 overflow-hidden shadow-2xl h-[220px] sm:h-[260px]  md:h-[320px]  lg:aspect-[16/11]  lg:min-h-[400px] lg:h-auto lg:order-2"
              >
                <Image
                  src="/cctvintallation/cctvinstallation2.png"
                  alt="Professional audio visual solutions"
                  fill
                  className="object-cover hover:scale-105 transition-all duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* IMPROVED SECTIONS 01-04 */}
      <div className="overflow-x-hidden mt-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section 01 & Image - with Full Overlap - FIXED FOR MOBILE */}
          <div className="relative" ref={section01Ref}>
            {/* Mobile: Text content shows properly */}
            <div className="lg:hidden">
              <motion.div
                className="bg-white p-8 flex flex-col justify-start relative"
                variants={fadeInLeft}
                initial="hidden"
                animate={isSection01InView ? "visible" : "hidden"}
                transition={{ ...transitionProps, delay: 0.1 }}
              >
                <motion.div variants={staggerContainer}>
                  <motion.h2
                    className="text-5xl font-bold mb-3"
                    variants={fadeInUp}
                  >
                    01.
                  </motion.h2>
                  <motion.h3
                    className="text-base font-semibold mb-4 uppercase tracking-wide"
                    variants={fadeInUp}
                  >
                    Residential CCTV Installation
                  </motion.h3>
                  <motion.p
                    className="text-gray-800 text-xs leading-relaxed"
                    variants={fadeInUp}
                  >
                    Protect your home with reliable residential CCTV systems.
                  </motion.p>
                  <motion.p
                    className="text-gray-800 text-xs leading-relaxed"
                    variants={fadeInUp}
                  >
                    Our discreet and pleasing cameras blend perfectly.
                  </motion.p>
                </motion.div>
              </motion.div>

              <motion.div
                className="h-80 overflow-hidden"
                variants={scaleIn}
                initial="hidden"
                animate={isSection01InView ? "visible" : "hidden"}
                transition={{ ...transitionProps, delay: 0.2 }}
              >
                <img
                  src="/cctv.jpg"
                  alt="Modern buildings"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Desktop: Original Layout */}
            <div className="hidden lg:grid lg:mt-2 lg:grid-cols-2 lg:gap-0 lg:mb-0">
              {/* Section 01 - Left with Text */}
              <motion.div
                className="bg-white p-8 lg:p-12 flex flex-col justify-start relative"
                variants={fadeInLeft}
                initial="hidden"
                animate={isSection01InView ? "visible" : "hidden"}
                transition={{ ...transitionProps, delay: 0.1 }}
              >
                <motion.div variants={staggerContainer}>
                  <motion.h2
                    className="text-5xl lg:text-6xl font-bold mb-3"
                    variants={fadeInUp}
                  >
                    01.
                  </motion.h2>
                  <motion.h3
                    className="text-base lg:text-lg font-semibold mb-4 uppercase tracking-wide"
                    variants={fadeInUp}
                  >
                    Residential CCTV Installation
                  </motion.h3>
                  <motion.p
                    className="text-gray-800 text-xs lg:text-sm leading-relaxed"
                    variants={fadeInUp}
                  >
                    Protect your home with reliable residential CCTV systems.
                  </motion.p>
                  <motion.p
                    className="text-gray-800 text-xs lg:text-sm leading-relaxed"
                    variants={fadeInUp}
                  >
                    Our discreet and pleasing cameras blend perfectly.
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>

            {/* Image - Full Width Overlap - Desktop Only */}
            <motion.div
              className="hidden lg:block absolute top-0 right-0 lg:w-2/3 lg:h-96 z-2"
              variants={scaleIn}
              initial="hidden"
              animate={isSection01InView ? "visible" : "hidden"}
              transition={{ ...transitionProps, delay: 0.2 }}
            >
              <img
                src="/cctvintallation/cctv.png"
                alt="Modern buildings"
                className="w-full h-75 object-cover"
              />
            </motion.div>
          </div>

          {/* Section 02 & 03 - with 02 Overlapping Both Images */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 mt-20 lg:mt-0">
            <motion.div
              className="bg-blue-500 text-white p-4 lg:p-6 relative z-10 lg:-mt-2 lg:-mb-16"
              ref={section02Ref}
              variants={fadeInUp}
              initial="hidden"
              animate={isSection02InView ? "visible" : "hidden"}
              transition={{ ...transitionProps, delay: 0.1 }}
            >
              <motion.div variants={staggerContainer}>
                <motion.h2
                  className="text-5xl lg:text-6xl font-bold mb-3"
                  variants={fadeInUp}
                >
                  02.
                </motion.h2>
                <motion.h3
                  className="text-base lg:text-lg font-semibold mb-4 uppercase tracking-wide"
                  variants={fadeInUp}
                >
                  Commercial CCTV Installation
                </motion.h3>
                <motion.p
                  className="text-xs lg:text-sm leading-relaxed"
                  variants={fadeInUp}
                >
                  Secure your business premises with our robust commercial CCTV
                  solutions. From retail stores to office buildings, we provide
                  comprehensive surveillance systems that deter theft and ensure
                  employee safety.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white text-black p-8 lg:p-12 flex flex-col items-end"
              ref={section03Ref}
              variants={fadeInUp}
              initial="hidden"
              animate={isSection03InView ? "visible" : "hidden"}
              transition={{ ...transitionProps, delay: 0.1 }}
            >
              <motion.div variants={staggerContainer}>
                <motion.h2
                  className="text-5xl lg:text-6xl font-bold mb-3 text-right"
                  variants={fadeInUp}
                >
                  03.
                </motion.h2>
                <motion.h3
                  className="text-base lg:text-lg font-semibold mb-4 uppercase tracking-wide text-right"
                  variants={fadeInUp}
                >
                  Remote Monitoring
                </motion.h3>
                <motion.p
                  className="text-xs lg:text-sm leading-relaxed text-right"
                  variants={fadeInUp}
                >
                  Stay connected to your property from anywhere in the world
                  with our remote monitoring services. Access live feeds and
                  recorded footage through your smartphone, tablet, or computer
                  with ease.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* FIXED Section 04 */}
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 mt-6 lg:grid-cols-[35%_65%] gap-0"
            ref={section04Ref}
          >
            {/* Text - Narrower Left Side */}
            <motion.div
              className="bg-white text-black w-full h-[75%] p-6 lg:p-10 flex flex-col justify-center"
              style={{ color: "black" }}
              variants={fadeInRight}
              initial="hidden"
              animate={isSection04InView ? "visible" : "hidden"}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div variants={staggerContainer}>
                <motion.h2
                  className="text-5xl lg:text-6xl font-bold mb-3"
                  style={{ color: "black" }}
                  variants={fadeInUp}
                >
                  04.
                </motion.h2>
                <motion.h3
                  className="text-base lg:text-lg  font-semibold mb-6 uppercase tracking-wide"
                  style={{ color: "black" }}
                  variants={fadeInUp}
                >
                  Maintenance and Upgrades
                </motion.h3>
                <motion.p
                  className="text-sm lg:text-base leading-relaxed"
                  style={{ color: "black" }}
                  variants={fadeInUp}
                >
                  Regular maintenance is crucial for optimal performance.
                  Brightelv offers routine check-ups and upgrades to ensure your
                  CCTV system remains up-to-date and functions at its best.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Image - Wider Right Side */}
            <motion.div
              className="h-80 lg:h-[430px] overflow-hidden"
              variants={fadeInLeft}
              initial="hidden"
              animate={isSection04InView ? "visible" : "hidden"}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src="/cctvintallation/cctv2.png"
                alt="CCTV Maintenance"
                className="w-full h-80.5 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.section
        initial="initial"
        whileInView="whileInView"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-50 overflow-x-hidden text-black py-20 md:py-28"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2"
          >
            Why choose Bright<span className="text-blue-900">elv</span> for CCTV
            installation
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.4,
            }}
            className="h-1 bg-blue-900 mx-auto"
          ></motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, amount: 0.2, margin: "-100px" }}
            className="grid grid-cols-1 mt-12 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => {
              const isEven = idx % 2 === 0;
              const cardAnim = isEven ? fadeInLeft : fadeInRight;
              return (
                <motion.div
                  key={idx}
                  variants={cardAnim}
                  transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`p-6  bg-white border border-gray-200 ${
                    idx === features.length - 1 && features.length % 3 === 1
                      ? "lg:col-start-2"
                      : ""
                  }`}
                >
                  <div className="text-blue-900 mb-3">
                    {React.isValidElement(feature.icon)
                      ? React.cloneElement(
                          feature.icon as React.ReactElement<any>,
                          {
                            className: "w-8 h-8",
                          }
                        )
                      : feature.icon}
                  </div>
                  <h4 className="text-base font-semibold mb-2 text-black">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}