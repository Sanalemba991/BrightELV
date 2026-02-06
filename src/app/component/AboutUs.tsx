"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';

export default function AboutUs() {
    // Improved container variants with better timing
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    // Completely new animation variants with better easing
    const slideInLeft:Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const slideInRight:Variants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const fadeInUp:Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <div className='bg-blue-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-10'>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center text-white mb-8 sm:mb-12 lg:mb-20"
            >
                Best ELV Company In Dubai
            </motion.h1>
            <div className="bg-white rounded-3xl sm:rounded-[50px] lg:rounded-[75px] overflow-hidden">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative m-4 sm:m-8 lg:m-14 h-auto min-h-[300px] sm:h-[350px] lg:h-[400px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlN2ZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] overflow-hidden"
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center relative z-10 py-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="w-full lg:w-1/2 py-4 sm:py-6 bg-white px-4 sm:px-6"
                        >
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center lg:text-left text-slate-900 mb-4 leading-tight">
                                WE ARE
                            </h1>
                            <p className="text-[#2b1b4a] text-xs sm:text-sm md:text-base leading-5 sm:leading-6 md:leading-7 text-justify lg:text-left font-medium">
                                A Leading Authority In CCTV Services And Proven In The Middle 
                                East Particularly In Dubai, Known For Two Ideals, Durability And
                                Reliability In All Our Services. Specializing In Customizing
                                Security System Blueprints, Upholding Customer Satisfaction, And
                                Committing To Client Privacy. As A Result We Are Distinguished For
                                Our Commitment To Excellence, We Provide Not Just Products But
                                Peace Of Mind. Setting The Benchmark In Surveillance Technology,
                                Our Systematic Approach Includes Thorough Expertise In
                                Maintenance Plans Guarantee Ongoing Support And Underline A
                                Client Culture Through Reliable Security Offering.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0"
                        >
                            <div className="relative w-full max-w-md lg:max-w-none">
                                <img
                                    src="https://brightelv.com/wp-content/uploads/2023/11/elv-600x400.jpg"
                                    alt="ELV Services"
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Why Choose Us Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="bg-white py-8 sm:py-12 m-4 sm:m-8 lg:m-14 px-4 sm:px-6"
                >
                    {/* Main Content - Left Sidebar + Right Grid */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Left Side - Why Choose Us - Dark Navy */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="w-full lg:w-1/3 bg-[#0A1F44] rounded-lg p-5 sm:p-6 lg:p-7 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-5 tracking-wide">
                                WHY CHOOSE US
                            </h2>
                            <div className="space-y-3 text-white text-sm sm:text-base leading-6 sm:leading-7 font-medium">
                                <p>
                                    <span className="font-semibold text-base sm:text-lg">
                                        Choose BrightElv for unparalleled expertise in CCTV brackets and poles in the UAE. Our products are tailored to withstand the harshest desert conditions, ensuring durability and performance. With a focus on innovation and custom solutions, we provide not just equipment but confidence and peace of mind. Our exceptional after-sales support and maintenance services guarantee your security system remains at the cutting edge, backed by robust warranties for lasting assurance. Partner with us for a safer future.
                                    </span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Side - 2x2 Grid */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                        >
                            {/* Specialized Expertise */}
                            <motion.div
                                variants={slideInLeft}
                                className="bg-gray-50 border-b-4 border-blue-950 p-4 sm:p-5 lg:p-7 hover:shadow-lg transition-all duration-300 rounded"
                            >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-950 mb-3 lg:mb-4 tracking-wide">
                                    SPECIALIZED EXPERTISE
                                </h3>
                                <p className="text-[#2b1b4a] text-xs sm:text-sm leading-5 sm:leading-6 font-medium">
                                    At BrightElv we are the leading company in Dubai and the Middle East specializing exclusively in CCTV brackets and poles. Our team of skilled technicians work relentlessly to ensure we deliver state-of-the-art surveillance equipment, establishing us as the premier provider in the UAE.
                                </p>
                            </motion.div>

                            {/* Custom Solutions */}
                            <motion.div
                                variants={slideInRight}
                                className="bg-gray-50 border-b-4 border-blue-950 p-4 sm:p-5 lg:p-7 hover:shadow-lg transition-all duration-300 rounded"
                            >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-950 mb-3 lg:mb-4 tracking-wide">
                                    CUSTOM SOLUTIONS
                                </h3>
                                <p className="text-[#2b1b4a] text-xs sm:text-sm leading-5 sm:leading-6 font-medium">
                                    We understand that each client has unique security needs. This is why we offer bespoke CCTV solutions, customizing our products to match specific height, location, and aesthetic requirements. We don't just sell products; we create security solutions tailored to your specific needs.
                                </p>
                            </motion.div>

                            {/* Trust and Integrity */}
                            <motion.div
                                variants={slideInLeft}
                                className="bg-gray-50 border-b-4 border-blue-950 p-4 sm:p-5 lg:p-7 hover:shadow-lg transition-all duration-300 rounded"
                            >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-950 mb-3 lg:mb-4 tracking-wide">
                                    TRUST & INTEGRITY
                                </h3>
                                <p className="text-[#2b1b4a] text-xs sm:text-sm leading-5 sm:leading-6 font-medium">
                                    Our reputation in the Middle East and Dubai has been built on a foundation of trust and integrity. Our clients know they can rely on us for superior surveillance products that meet the highest standards of quality and performance. At BrightELv your security is our priority.Integrity And Openness. Our Ethical Foundation Is Central To Our Operations, Making Your Security Our Top Priority.
                                </p>
                            </motion.div>

                            {/* Elevating Surveillance Standards */}
                            <motion.div
                                variants={slideInRight}
                                className="bg-gray-50 border-b-4 border-blue-950 p-4 sm:p-5 lg:p-7 hover:shadow-lg transition-all duration-300 rounded"
                            >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-950 mb-3 lg:mb-4 tracking-wide">
                                    ELEVATED STANDARDS
                                </h3>
                                <p className="text-[#2b1b4a] text-xs sm:text-sm leading-5 sm:leading-6 font-medium">
                                    As a top ELV company in Dubai, we provide specialized CCTV brackets and poles, crafted for the UAE's climate, with a commitment to tailored solutions, excellence, and integrity.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}