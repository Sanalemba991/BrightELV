"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Variants } from "framer-motion";
import NextLink from "next/link";
import { useRef } from "react";

interface ImageCard {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export default function Link() {
  const [count, setCount] = useState({
    employees: 0,
    projects: 0,
    products: 0,
  });

  const headerRef = useRef(null);
  const statsRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });

  // Animation variants for WE ARE... section
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

  // Count animation effect
  useEffect(() => {
    if (isStatsInView) {
      const duration = 1500; // 1.5 seconds
      const steps = 45;
      const interval = duration / steps;

      const employeesTarget = 42;
      const projectsTarget = 128;
      const productsTarget = 1000;

      let step = 0;

      const timer = setInterval(() => {
        step++;

        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCount({
          employees: Math.floor(easeOut * employeesTarget),
          projects: Math.floor(easeOut * projectsTarget),
          products: Math.floor(easeOut * productsTarget),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCount({
            employees: employeesTarget,
            projects: projectsTarget,
            products: productsTarget,
          });
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isStatsInView]);

  return (
    <div
      className="w-full bg-blue-950 py-16 px-6 md:px-12 lg:px-16 relative overflow-hidden"
      style={{
        backgroundImage: "url('/sadd11.png')",
        backgroundSize: "object-contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay for better text readability */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            {/* WE ARE... heading with animation */}
            <motion.div
              ref={headerRef}
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              variants={headerVariants}
              className="mb-6"
            >
              <div className="inline-block overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: 60 }}
                  animate={isHeaderInView ? { y: 0 } : { y: 60 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.2,
                  }}
                  className="sm:text-3xl uppercase  md:text-5xl lg:text-3xl font-bold tracking-tight text-white"
                >
                  We operate in middle east and beyond
                </motion.h2>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={isHeaderInView ? { width: "140px" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-blue-800 to-blue-900 mb-4"
              />
            </motion.div>

            {/* Main Description */}
            <div className="space-y-4 text-white text-sm leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-sm font-medium leading-relaxed"
              >
                With a strong foothold in the Middle East, Bright Elv Technology
                LLC extends its operations beyond, reaching out to international
                markets. Our innovation-driven ELV solutions echo across the
                globe, delivering top-tier technology services to a diverse and
                expanding clientele.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-sm font-medium leading-relaxed"
              >
                As we continue to grow, our commitment to creating pioneering
                and reliable solutions remains steadfast. Each stride taken in
                the UAE arena is a testament to our vision of making a global
                impact with our state-of-the-art technology services.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <NextLink href="/contact">
                <motion.button className="mt-6 px-6 py-2 border border-white/30 bg-indigo-900 text-white hover:bg-[#3a2b6b] font-semibold transition-colors duration-300 text-sm sm:text-base cursor-pointer shadow-lg rounded-xl">
                  About Us
                </motion.button>
              </NextLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
