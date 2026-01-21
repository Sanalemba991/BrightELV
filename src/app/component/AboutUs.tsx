"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Variants } from "framer-motion";

export default function AboutUs() {
  // --- Banner-specific vars ---
  const background =
    "/about.png";

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

  // Refs for all sections
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  const galleryRef = useRef(null);
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.3 });

  const whyChooseUsRef = useRef(null);
  const whyChooseUsInView = useInView(whyChooseUsRef, {
    once: true,
    amount: 0.2,
  });

  const commitmentsRef = useRef(null);
  const commitmentsInView = useInView(commitmentsRef, {
    once: true,
    amount: 0.2,
  });

  // Animation variants for commitment items - coming from above
  const commitmentItemVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Animation for the vertical line - growing from top
  const lineVariants: Variants = {
    hidden: { scaleY: 0, transformOrigin: "top" },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  // Animation for card items
  const cardVariants: Variants = {
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

  // Animation for gallery images
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Inlined Banner with bg-fixed (no scroll movement) */}
      <div className="relative mb-8 md:mb-16 w-full h-96 md:h-screen bg-black overflow-hidden">
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
         filter: "brightness(0.6)",
            }}
          />
          {/* Dark overlay for better text visibility */}
           </motion.div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-between py-6 md:py-12"
          variants={bannerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title - Left aligned on mobile, centered on desktop */}
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
                About
              </motion.span>
              <motion.span
                className="ml-4 md:ml-8 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Us
              </motion.span>
            </motion.h1>

            {/* Mobile-only description */}
            <motion.div
              className="md:hidden mt-8 px-6 flex flex-col items-center gap-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.p
                className="text-white/70 text-sm text-center max-w-sm"
              >
                Bright ELV is a trusted leader in CCTV brackets and poles in Dubai, delivering durable, IP-rated solutions built for the UAE climate, backed by reliable support, maintenance, and warranty.
              </motion.p>
              <motion.div
                className="h-0.5 w-32 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 1, delay: 2 }}
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
                Bright ELV is a trusted leader in CCTV brackets and poles in Dubai, delivering durable, IP-rated solutions built for the UAE climate, backed by reliable support, maintenance, and warranty.
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

      <div className=" bg-white">
        {/* Main Content */}
        <main className="w-full py-16 px-4 md:px-8 lg:px-8 max-w-7xl mx-auto">
          {/* Intro Section */}
          <div ref={introRef}>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              WE ARE
            </motion.h1>

            <motion.div
              className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl"
              initial={{ opacity: 0 }}
              animate={introInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                A leading authority in CCTV brackets and poles in the Middle
                East, particularly in Dubai, known for top-notch, durable, and
                innovative surveillance equipment. Specializing in customized
                solutions, we offer IP-rated poles designed for the harsh desert
                climate of the UAE, ensuring long-term reliability. With a
                commitment to excellence, we provide not just products but peace
                of mind, setting the standard in surveillance technology.
              </p>
            </motion.div>
          </div>

          {/* Image Gallery */}
          <div
            ref={galleryRef}
            className="mt-4 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
          >
            <motion.div
              className="row-span-2"
              variants={imageVariants}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              <img
                src="/abou3.png"
                alt="Team meeting"
                className="w-full h-full object-cover "
              />
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/sam.png"
                alt="Team member at work"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/sam2.png"
                alt="Team gathering"
                className="w-full h-full object-cover "
              />
            </motion.div>
          </div>

          {/* Why Choose Us Section */}
          <section ref={whyChooseUsRef} className="mt-8 md:mt-20">
            <motion.p
              className="text-xs uppercase tracking-wider text-gray-500 mb-3"
              initial={{ opacity: 0 }}
              animate={whyChooseUsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Bright <span className="text-blue-900">ELV</span>
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={whyChooseUsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Why <span className="text-blue-900">Choose</span> Us
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
              {/* Expert Instructors Card */}
              <motion.div
                className="bg-gray-100  p-6"
                variants={cardVariants}
                initial="hidden"
                animate={whyChooseUsInView ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 border-2 text-blue-600 border-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Expert Instructors
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose BrightElv for unparalleled expertise in CCTV brackets
                  and poles in the UAE. Our products withstand harsh desert
                  conditions, ensuring durability and performance with
                  exceptional after-sales support.
                </p>
              </motion.div>

              {/* Specialized Expertise Card */}
              <motion.div
                className="bg-gray-100  p-6"
                variants={cardVariants}
                initial="hidden"
                animate={whyChooseUsInView ? "visible" : "hidden"}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 border-2 text-blue-600 border-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Specialized Expertise
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leading company in Dubai and Middle East specializing
                  exclusively in CCTV brackets and poles. Our skilled
                  technicians deliver state-of-the-art surveillance equipment.
                </p>
              </motion.div>

              {/* Customized Solutions Card */}
              <motion.div
                className="bg-blue-900 text-white  p-6"
                variants={cardVariants}
                initial="hidden"
                animate={whyChooseUsInView ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Customized Solutions</h3>
                <p className="text-gray-100 text-sm leading-relaxed">
                  Bespoke CCTV solutions customized to specific height,
                  location, and aesthetic requirements. We create security
                  solutions tailored to your exact needs.
                </p>
              </motion.div>
            </div>

            {/* Additional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mt-2 md:mt-6">
              <motion.div
                className="bg-gray-100  p-6"
                variants={cardVariants}
                initial="hidden"
                animate={whyChooseUsInView ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 border-2 text-blue-600 border-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trust and Integrity
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Built on trust and integrity, we provide superior surveillance
                  products meeting the highest quality standards. Your security
                  is our priority.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-100  p-6"
                variants={cardVariants}
                initial="hidden"
                animate={whyChooseUsInView ? "visible" : "hidden"}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 border-2 text-blue-600 border-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Elevating Surveillance Standards
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Top ELV company providing specialized CCTV brackets and poles,
                  crafted for UAE's climate with commitment to excellence and
                  integrity.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Our Commitments Section */}
          <section ref={commitmentsRef} className="mt-8 md:mt-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={commitmentsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              Our Commitments
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Left side - Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={commitmentsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <img
                  src="https://brightelv.com/wp-content/uploads/2023/11/elv-600x400.jpg"
                  alt="Quality assurance"
                  className="w-full h-full  object-cover"
                />
              </motion.div>

              {/* Right side - 4 commitment points */}
              <div className="flex flex-col justify-center h-full">
                <div className="flex flex-col space-y-6 md:space-y-10 relative">
                  {/* Vertical line with animation */}
                  <motion.span
                    className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-blue-900 via-blue-600 to-blue-200 z-0 hidden md:block"
                    variants={lineVariants}
                    initial="hidden"
                    animate={commitmentsInView ? "visible" : "hidden"}
                    transition={{ delay: 0.3 }}
                  ></motion.span>

                  {/* Client Satisfaction */}
                  <motion.div
                    className="flex items-start space-x-4 relative z-10"
                    variants={commitmentItemVariants}
                    initial="hidden"
                    animate={commitmentsInView ? "visible" : "hidden"}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Client Satisfaction
                      </h3>
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        We only supply world class equipment, serviced &amp;
                        ready for work on delivery.
                      </p>
                    </div>
                  </motion.div>

                  {/* Dependable Delivery */}
                  <motion.div
                    className="flex items-start space-x-4 relative z-10"
                    variants={commitmentItemVariants}
                    initial="hidden"
                    animate={commitmentsInView ? "visible" : "hidden"}
                    transition={{ delay: 0.6 }}
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Dependable Delivery
                      </h3>
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        Construction equipment will arrive at your jobsite in
                        prime condition within 30 minutes of the agreed delivery
                        time.
                      </p>
                    </div>
                  </motion.div>

                  {/* On Site Service */}
                  <motion.div
                    className="flex items-start space-x-4 relative z-10"
                    variants={commitmentItemVariants}
                    initial="hidden"
                    animate={commitmentsInView ? "visible" : "hidden"}
                    transition={{ delay: 0.8 }}
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        On Site Service
                      </h3>
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        Our repair crew or replacement equipment will arrive at
                        your site within six hours of call.
                      </p>
                    </div>
                  </motion.div>

                  {/* Customer Service Hotline */}
                  <motion.div
                    className="flex items-start space-x-4 relative z-10"
                    variants={commitmentItemVariants}
                    initial="hidden"
                    animate={commitmentsInView ? "visible" : "hidden"}
              
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Customer Service Hotline
                      </h3>
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        We have knowledgeable staff on call 24/7, to solve all
                        your equipment queries &amp; concerns within the day.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}