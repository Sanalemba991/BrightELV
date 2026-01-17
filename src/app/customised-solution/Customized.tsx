"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Variants } from "framer-motion";

const Customized = () => {
  // Refs for tracking when sections are in view
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section1InView = useInView(section1Ref, { once: true, amount: 0.2 });
  const section2InView = useInView(section2Ref, { once: true, amount: 0.2 });

  // --- Banner-specific vars ---
  const background =
    "/banner/customised.png";

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

  // Animation variants (existing)
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      {/* Inlined Banner with bg-fixed (no scroll movement) */}
      <div className="overflow-x-hidden relative mb-16 w-full h-96 md:h-screen bg-black overflow-hidden">
        {/* Background Image with Fixed Positioning (like "Why" component) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('${background}')`,
                   filter: "brightness(0.9)",
    
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
          {/* Main Title */}
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
                Customized
              </motion.span>
              <motion.span
                className="ml-4 md:ml-8 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Solution
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
                Discover the perfect blend of functionality, precision, and sophistication with our exclusive range of customized solutions.
              </motion.p>
              <motion.div
                className="h-0.5 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 2 }}
              />
            </motion.div>
          </div>

          {/* Bottom Section */}
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
                Discover the perfect blend of functionality, precision, and sophistication with our exclusive range of customized CCTV console solutions, expertly designed to meet the unique operational needs of modern control rooms.
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

      {/* --- Existing sections unchanged --- */}
      <section ref={section1Ref} className="px-4 overflow-x-hidden  md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid - Two Columns */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4"
            initial="hidden"
            animate={section1InView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {/* Left Column */}
            <div className="flex flex-col">
              {/* Architecture Image */}
              <motion.div
                className="relative h-[200px] sm:h-[280px] md:h-[400px] w-full"
                variants={fadeInLeft}
              >
                <Image
                  src="/customised/customised.png"
                  alt="Modern kiosk and interactive display"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Bottom Features - Two Columns */}
              <motion.div
                className="grid ml grid-cols-2 gap-6 pt-8 pr-4"
                variants={staggerContainer}
              >
                {/* Custom Kiosk & Podium */}
                <motion.div className="space-y-3" variants={fadeInUp}>
                  <h3 className="text-base sm:text-lg md:text-xl font-light">
                    Custom Kiosk & <span className="text-blue-900">Podium</span>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    BrightELV is a leading interactive kiosk stand maker in
                    Dubai, delivering smart solutions for modern businesses. We
                    design customized, sleek kiosk stands that combine advanced
                    technology with elegant design. Enhance customer engagement
                    and user experience with our premium, innovative kiosk
                    solutions.
                  </p>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <Link
                      href="/customised-solution/kiosk-stand-maker"
                      className="inline-block bg-transparent border border-blue-900 text-blue-900 px-4 py-2  text-sm shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 hover:text-white focus:ring-blue-800"
                      aria-label="Enquire about Custom Portable Mixer Racks"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Custom Face Plates */}
                <motion.div className="space-y-3" variants={fadeInUp}>
                  <h3 className="text-base sm:text-lg md:text-xl font-light">
                    Custom Face <span className="text-blue-900">Plates</span>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    BrightELV delivers premium custom face plates in Dubai,
                    crafted to match your unique vision. We serve both
                    residential and commercial clients with tailored,
                    high-quality solutions. Our designs combine durability,
                    precision, and refined aesthetics for a flawless finish.
                  </p>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <Link
                      href="/customised-solution/custom-face-plates"
                      className="inline-block bg-transparent border border-blue-900 text-blue-900 px-4 py-2  text-sm shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 hover:text-white focus:ring-blue-800"
                      aria-label="Enquire about Custom Portable Mixer Racks"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              {/* Text Content */}
              <motion.div
                className="space-y-4 pl-8 py-4"
                variants={fadeInRight}
              >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-gray-800">
                  Custom Pop Up <span className=" text-blue-900">Box</span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
                  Transform your meetings with Bright ELV's Table Pop-Up Boxes
                  in Dubai, designed for modern and efficient workspaces. Our
                  sleek, space-saving solutions provide easy access to power,
                  data, and AV connections while keeping cables neatly
                  concealed. Perfect for conference rooms, they ensure a clean,
                  professional look with seamless connectivity.
                </p>

                <motion.div variants={fadeInUp} className="pt-4">
                  <Link
                    href="/customised-solution/custom-pop-up-box"
                    className="inline-block bg-transparent border border-blue-900 text-blue-900 px-4 py-2  text-sm shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 hover:text-white focus:ring-blue-800"
                    aria-label="Enquire about Custom Portable Mixer Racks"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              {/* Feather Image - electronics/cable management */}
              <motion.div
                className="relative h-[200px] sm:h-[300px] md:h-[420px] w-full mt-2 sm:mt-3 md:mt-4"
                variants={fadeInRight}
              >
                <Image
                  src="/customised/customised2.png"
                  alt="Professional cable management and electronics"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reversed Section - same content but mirrored */}
      <section
        ref={section2Ref}
        className="py-9 overflow-x-hidden px-4 md:px-8 lg:px-16 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Grid - Two Columns (reversed) */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4"
            initial="hidden"
            animate={section2InView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {/* Left Column (was Right in original) */}
            <div className="flex flex-col">
              {/* Text Content */}
              <motion.div className="space-y-4 pr-8 py-4" variants={fadeInLeft}>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-gray-800">
                  Custom Portable Mixer{" "}
                  <span className=" text-blue-900">Racks</span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
                  BrightELV specializes in custom portable mixer racks and AV
                  racks in Dubai. Our solutions are designed for musicians, DJs,
                  sound engineers, and production teams. We ensure your
                  equipment stays organized, protected, and easy to manage with
                  maximum efficiency.
                </p>

                <motion.div variants={fadeInUp} className="pt-4">
                  <Link
                    href="/customised-solution/av-racks"
                    className="inline-block bg-transparent border border-blue-900 text-blue-900 px-4 py-2  text-sm shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 hover:text-white focus:ring-blue-800"
                    aria-label="Enquire about Custom Portable Mixer Racks"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              {/* Audio Equipment Image */}
              <motion.div
                className="relative h-[200px] sm:h-[300px] md:h-[420px] w-full mt-2 sm:mt-3 md:mt-4"
                variants={fadeInLeft}
              >
                <Image
                  src="/customised/customised3.png"
                  alt="Professional audio mixer and equipment racks"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            {/* Right Column (was Left in original) */}
            <div className="flex flex-col">
              {/* Security Console Image */}
              <motion.div
                className="relative h-[200px] sm:h-[280px] md:h-[400px] w-full"
                variants={fadeInRight}
              >
                <Image
                  src="/customised/customised4.png"
                  alt="Security monitoring console"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Bottom Features - Two Columns */}
              <motion.div
                className="grid grid-cols-2 gap-6 pt-8 pl-4"
                variants={staggerContainer}
              >
                {/* Custom CCTV Consoles */}
                <motion.div className="space-y-3" variants={fadeInUp}>
                  <h3 className="text-base sm:text-lg md:text-xl font-light">
                    CustomCCTV <span className="text-blue-900">Consoles</span>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    At Brightelv, we recognize the importance of security in
                    today's world. As a trusted provider of custom CCTV consoles
                    in Dubai, we deliver reliable, scalable solutions tailored
                    to our clients' needs, combining advanced technology with
                    seamless integration for effective monitoring and peace of
                    mind.
                  </p>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <Link
                      href="/customised-solution/cctv"
                      className="inline-block bg-transparent border border-blue-900 text-blue-900 px-4 py-2  text-sm shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 hover:text-white focus:ring-blue-800"
                      aria-label="Enquire about Custom Portable Mixer Racks"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Custom Flight Case */}
                <motion.div className="space-y-3" variants={fadeInUp}>
                  <h3 className="text-base sm:text-lg md:text-xl font-light">
                    Custom Flight <span className="text-blue-900 ">Case</span>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    Welcome to BrightELV, Dubai's trusted provider of custom
                    Flint cases and premium wooden podiums. We deliver
                    exceptional craftsmanship and innovative designs tailored to
                    your needs. From elegant podiums to durable, stylish cases,
                    we offer solutions that elevate every presentation.
                  </p>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <Link
                      href="/customised-solution/custom-flight-wooden-podium"
                      className="inline-block bg-transparent border border-blue-900 text-blue-900 px-4 py-2  text-sm shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 hover:text-white focus:ring-blue-800"
                      aria-label="Enquire about Custom Portable Mixer Racks"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Customized;
