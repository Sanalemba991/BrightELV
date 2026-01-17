"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
  Phone,
  Mic,
  Volume2,
  Wrench,
  Move,
  Network,
  Package,
  Lightbulb,
  Plug,
} from "lucide-react";

const features = [
  {
    icon: <Package className="w-6 h-6" />,
    title: "Wide Range of Products",
    description:
      "We offer an extensive selection of high-quality AV cables and connectors, including HDMI, VGA, RCA, USB, and more. Our products are sourced from top manufacturers to ensure superior performance and reliability.",
     },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Expert Advice and Support",
    description:
      "Our team of experienced professionals is here to help you choose the right products for your specific requirements. We provide expert advice and technical support to ensure your AV setup is flawless",
     },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Competitive Pricing",
    description:
      "At BrightElv, we believe in offering the best value for your money. Our competitive pricing ensures you get top-quality products without breaking the bank.",
    },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast and Reliable Service",
    description:
      "We understand the importance of timely service. Our efficient delivery system ensures that your orders reach you promptly, anywhere in Dubai.",
      },
];

const Face = () => {
  // Refs for tracking when sections are in view
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section1InView = useInView(section1Ref, { once: true, amount: 0.2 });
  const section2InView = useInView(section2Ref, { once: true, amount: 0.2 });
  const headerRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  // Refs for numbered sections 01-04
  const section01Ref = useRef(null);
  const section02Ref = useRef(null);
  const section03Ref = useRef(null);
  const section04Ref = useRef(null);

  // Check if numbered sections are in view
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

  // Services Section State
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesHeaderRef = useRef<HTMLDivElement | null>(null);
  const isServicesHeaderInView = useInView(servicesHeaderRef, {
    once: true,
    amount: 0.5,
  });
  // --- Banner-specific vars ---
  const background =
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop";

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
      },
    },
  };

  const transitionProps: Transition = {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  };

  // Service Section Variants
  const serviceHeaderVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.12 },
    },
  };

  // Service Steps Data
  

  // Scroll effect for services section
 

    
  // ScrollSection refs and variants
  const scrollSectionRef = useRef(null);
  const scrollSectionIsInView = useInView(scrollSectionRef, {
    once: true,
    amount: 0.2,
  });

  const scrollContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const scrollItemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scrollImageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      {/* Inlined Banner with bg-fixed (no scroll movement) */}
      <div className="relative w-full h-96 md:h-screen bg-black overflow-hidden">
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
              Custom Face 
              </motion.span>
              <motion.span
                className="ml-4 md:ml-8 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
              Plates
              </motion.span>
            </motion.h1>
            
            {/* Mobile-only description */}
            <motion.div
              className="md:hidden mt-8 px-6 flex flex-col items-center gap-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.p className="text-white/70 text-sm text-center max-w-sm">
                Premium custom face plates tailored to your vision
              </motion.p>
              <motion.div
                className="h-0.5 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 1.8 }}
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
               At Brightelv, Dubai, we design and deliver premium custom face plates tailored to your vision, combining high-quality craftsmanship with refined aesthetics for both residential and commercial needs.
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
      <section
        ref={section1Ref}
        className="px-4 md:px-8 lg:px-16 bg-white py-16"
      >
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
                className="relative h-[350px] md:h-[400px] w-full"
                variants={fadeInLeft}
              >
                <Image
                  src="/Face.png"
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
              ></motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              {/* Text Content */}
              <motion.div
                className="space-y-4 pl-8 py-4"
                variants={fadeInRight}
              >
                <h2 className="text-4xl md:text-5xl font-light text-gray-800">
                  Smart Table Pop-Up Boxes in{" "}
                  <span className="text-blue-900">Dubai</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed max-w-md">
                 At Brightelv, we are committed to bringing your unique vision to life with our premium custom face plates. Based in the vibrant city of Dubai, we cater to a diverse range of clients, from residential homeowners to large-scale commercial enterprises, offering tailored solutions that meet the highest standards of quality and aesthetics.
                </p>
                
              </motion.div>

              {/* Feather Image - electronics/cable management */}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Gallery Section */}
      <section
        ref={scrollSectionRef}
        className="py-16 px-6 md:px-12 lg:px-20 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-1 h-[600px]"
            variants={scrollContainerVariants}
            initial="hidden"
            animate={scrollSectionIsInView ? "visible" : "hidden"}
          >
            {/* Top Left - Images Only */}
             <motion.div
              className="relative overflow-hidden"
              variants={scrollImageVariants}
            >
              <Image
                src="https://images.unsplash.com/photo-1765211003001-b9eb5cbfe1f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern white architecture"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Top Middle - White Architecture Image */}
            <motion.div
              className="relative overflow-hidden"
              variants={scrollImageVariants}
            >
              <Image
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80"
                alt="Modern white architecture"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right Column - Portrait (spans 2 rows) */}
            <motion.div
              className="relative overflow-hidden row-span-2"
              variants={scrollImageVariants}
            >
              <Image
                src="/sad.jpg"
                alt="Portrait photography"
                fill
                className="object-cover grayscale"
              />
            </motion.div>

            {/* Bottom Left - Striped Building (spans 2 columns) */}
            <motion.div
              className="relative overflow-hidden col-span-2"
              variants={scrollImageVariants}
            >
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Modern architecture building with lines"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Features Section - Numbered Grid Layout 01-04 */}
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
                  Why choose Bright<span className="text-blue-900">elv</span> for Custom Face 
              
              
              Plates
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
};

export default Face;
