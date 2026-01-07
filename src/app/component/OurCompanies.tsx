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
      className="w-full py-16 px-6 md:px-12 lg:px-16 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/OurCompanies.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-white/70 z-0"></div>

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
                  className="sm:text-3xl  md:text-5xl lg:text-3xl font-bold tracking-tight text-gray-900"
                >
                  WE ARE...
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
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-sm sm:text-base leading-relaxed"
              >
                the Global Supplier for cutting-edge ELV products. Empowering
                businesses with innovative technology, seamless integration, and
                superior performance. Trust our experienced 42+ team Employees
                to deliver high-quality solutions tailored to your unique needs.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-sm sm:text-base leading-relaxed"
              >
                Together, let’s surpass your competition and achieve customer
                satisfaction with more than 128 projects completed. Choose
                BrightElv Technology LLC for excellence in Surveillance,
                Audio-Visual, Home Automation, and Building Management solutions
                with our 1000+ product lines.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4"
            >
              <h3 className="text-sm sm:text-base leading-relaxed text-gray-600">
                We operate around global
              </h3>
            </motion.div>

            {/* COUNTER SECTION - Fixed display */}
            <div ref={statsRef} className="mt-2 grid grid-cols-3 gap-x-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-900 text-lg font-bold">
                  +{count.employees}
                </div>
                <div className="text-gray-600 text-xs">Employees</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-900 text-lg font-bold">
                  +{count.projects}
                </div>
                <div className="text-gray-600 text-xs">Projects</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-900 text-lg font-bold">
                  +{count.products}
                </div>
                <div className="text-gray-600 text-xs">Product Lines</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
