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

export default function Maintenance() {
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
        "Our team of experienced professionals is equipped with the knowledge and skills to maintain various CCTV systems. They perform thorough inspections and repairs, ensuring optimal functionality.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Preventative Maintenance",
      description:
        "Regular maintenance helps prevent potential issues before they become significant problems. Our preventative maintenance services include system checks, firmware updates, and hardware inspections.",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description:
        "We provide round-the-clock support to address any urgent issues promptly, minimizing downtime and ensuring your security system is always operational.",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Affordable Pricing",
      description:
        "At Brightelv, we offer competitive CCTV maintenance costs in Dubai, providing you with high-quality services at affordable rates.",
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
    "/cctvmaintenance/cctvmaintainance.png";

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
      <div className="overflow-x-hidden relative mb-16 w-full h-96 md:h-screen bg-black overflow-hidden">
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
                Maintenance
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
                Professional CCTV maintenance services to keep your security systems running optimally.
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
                Professional CCTV maintenance and support services ensuring
                your security systems stay reliable, fully functional, and
                optimally performing at all times.
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
            Why Choose Bright<span className="text-blue-900">elv</span> for CCTV
            Maintenance
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
                  src="/cctvmaintenance/maitenance1.png"
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
                  Our Maintenance Solutions Include
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
                  One of the key components of an exceptional audio experience
                  lies in the sound system. Our ELV products are offer a variety
                  of immersive sound solutions that envelop you in a rich audio
                  tapestry, making you feel like you're part of the action.
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
                  Cost of CCTV Maintenance in Dubai
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
                  The CCTV maintenance cost in Dubai can vary based on the
                  complexity and size of your system. At Brightelv, we offer
                  customized maintenance packages to suit your specific needs
                  and budget. Our pricing is transparent, with no hidden fees,
                  ensuring you get the best value for your investment.
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
                className=" relative w-full bg-gray-900 overflow-hidden shadow-2xl h-[220px] sm:h-[260px]  md:h-[320px]  lg:aspect-[16/11]  lg:min-h-[400px] lg:h-auto lg:order-2"
              >
                <Image
                  src="/cctvmaintenance/maitnenca2.png"
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
                    System Health Checks
                  </motion.h3>
                  <motion.p
                    className="text-gray-800 text-xs leading-relaxed"
                    variants={fadeInUp}
                  >
                    Routine inspections to ensure all components
                  </motion.p>
                  <motion.p
                    className="text-gray-800 text-xs leading-relaxed"
                    variants={fadeInUp}
                  >
                    are working correctly.
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
                  src="/maintenance/main1.jpg"
                  alt="System Health Checks"
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
                    System Health Checks
                  </motion.h3>
                  <motion.p
                    className="text-gray-800 text-xs lg:text-sm leading-relaxed"
                    variants={fadeInUp}
                  >
                    Routine inspections to ensure all components
                  </motion.p>
                  <motion.p
                    className="text-gray-800 text-xs lg:text-sm leading-relaxed"
                    variants={fadeInUp}
                  >
                    are working correctly.
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
                src="/maintenance/main1.jpg"
                alt="System Health Checks"
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
                  Software & Hardware Updates
                </motion.h3>
                <motion.p
                  className="text-xs lg:text-sm leading-relaxed"
                  variants={fadeInUp}
                >
                  Keeping your system up-to-date with the latest security
                  features and improvements. Addressing any physical damages or
                  malfunctions in cameras, cables, and other hardware.
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
                  Cleaning Services
                </motion.h3>
                <motion.p
                  className="text-xs lg:text-sm leading-relaxed text-right"
                  variants={fadeInUp}
                >
                  Regular cleaning of camera lenses and other sensitive
                  equipment to ensure clear, unobstructed footage.
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
                  Performance Optimization
                </motion.h3>
                <motion.p
                  className="text-sm lg:text-base leading-relaxed"
                  style={{ color: "black" }}
                  variants={fadeInUp}
                >
                  Adjusting camera angles, settings, and configurations for
                  optimal coverage and efficiency.
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
                src="/maintenance/mian2.png"
                alt="Performance Optimization"
                className="w-full h-80.5 object-cover"
              />
            </motion.div>
          </div>
        </div>
        <motion.section
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gray-50 text-black py-20 md:py-28"
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
              Why choose Bright<span className="text-blue-900">elv</span> for
              CCTV maintenance
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
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}