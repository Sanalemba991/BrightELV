"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
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
      src: "/link/link1.png",
      alt: "Customized Solutions",
      title: "CUSTOMIZED SOLUTIONS",
      description:
        "Tailored custom solutions including CCTV poles, kiosks, AV racks, and more for your specific needs.",
      link: "/customised-solution",
      linkText: "Learn More",
    },
    {
      id: 2,
      src: "/link/link2.png",
      alt: "CCTV Installation",
      title: "CCTV INSTALLATION",
      description:
        "Professional CCTV installation services to ensure comprehensive surveillance and security.",
      link: "/elv-solution/cctv-installation",
      linkText: "Learn More",
    },
    {
      id: 3,
      src: "/link/link3.png",
      alt: "Structure Cabling",
      title: "STRUCTURE CABLING",
      description:
        "Reliable network infrastructure and structured cabling solutions for seamless connectivity.",
      link: "/elv-solution/structure-cabling",
      linkText: "Learn More",
    },
  ];

  const [activeId, setActiveId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) setActiveId(null);
  }, [isMobile]);

  return (
    <div className="w-full bg-white">
      <div className="px-0 sm:px-6 md:px-8 lg:px-0">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_60%] gap-0  ">
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
            className="flex  flex-col bg-blue-900 h-full"
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
                  className="relative group overflow-hidden shadow-sm h-40 sm:h-48 md:h-56 lg:h-[38vh] cursor-pointer "
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (isMobile) setActiveId((prev) => (prev === card.id ? null : card.id));
                  }}
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
                     </div>

                  {/* Default State - Title */}
                  {(() => {
                    const isActive = isMobile && activeId === card.id;
                    const titleClass = isActive
                      ? 'absolute inset-0 flex items-center justify-center opacity-0 z-0 transition-opacity duration-300'
                      : 'absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0';
                    return (
                      <div className={titleClass}>
                        <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-center px-3 sm:px-4 tracking-wider drop-shadow-md">
                          {card.title}
                        </h3>
                      </div>
                    );
                  })()}

                  {/* Hover State - Description and Button */}
                  {(() => {
                    const isActive = isMobile && activeId === card.id;
                    const overlayClass = isActive
                      ? 'absolute inset-0 flex items-center justify-center p-0 opacity-100 translate-y-0 z-20 transition-all duration-300'
                      : 'absolute inset-0 flex items-center justify-center p-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0';
                    return (
                      <div className={overlayClass}>
                        <div className="w-full h-full bg-[#2b2f6b] text-white flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-10 text-center transform transition-transform duration-300">
                          <p className="text-white text-sm sm:text-base md:text-lg font-medium mb-4 sm:mb-6 leading-relaxed max-w-[900px]">
                            {card.description}
                          </p>
                          <NextLink href={card.link}>
                            <motion.button
                              whileHover={{ scale: 1 }}
                              onClick={(e) => e.stopPropagation()}
                              className="px-4 sm:px-6 py-2 border-2 border-white text-white rounded-md hover:bg-white hover:text-[#2b2f6b] font-semibold transition-colors duration-300 text-xs sm:text-sm"
                            >
                              {card.linkText}
                            </motion.button>
                          </NextLink>
                        </div>
                      </div>
                    );
                  })()}
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
            className="relative flex flex-col justify-center mr-5 py-4 md:py-5 lg:py-10 xl:py-12 h-full px-2 md:px-4 lg:px-8 xl:px-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 md:space-y-4 lg:space-y-6 w-full"
            >
              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-2 md:space-y-2 lg:space-y-3"
              >
                <p className="text-xs md:text-xs lg:text-base text-blue-900 font-semibold tracking-widest">
                  WELCOME TO
                </p>
                {/* Logo Image */}
                <div className="mb-2 md:mb-2 lg:mb-4">
                  <Image
                    src="/logo2.png"
                    alt="I-Link Logo"
                    width={160}
                    height={80}
                    className="object-contain h-10 md:h-10 lg:h-16 w-auto"
                    sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 160px"
                  />
                </div>
                {/* Underline Divider */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-0.5 md:h-0.5 lg:h-1 bg-blue-900 rounded-full"
                />
                {/* Tagline with dots */}
                <p className="text-xs md:text-xs lg:text-sm text-blue-500 font-medium tracking-wider pt-1 md:pt-1 lg:pt-2">
                  PROFESSION . TRUST . SAFETY . INNOVATIVE
                </p>
              </motion.div>

              {/* Main Description */}
              <div className="space-y-3 md:space-y-3 lg:space-y-4 text-[#2b1b4a] text-xs md:text-xs lg:text-base leading-5 md:leading-5 lg:leading-7 text-left pr-0 md:pr-2 lg:pr-4 font-medium">
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
                className="pt-2 md:pt-2 lg:pt-4"
              >
                <NextLink href="/contact">
                  <motion.button
                    className="w-full md:w-auto px-1 md:px-2 lg:px-4 py-1.5 md:py-1.5 lg:py-2 bg-[#2b1b4a] text-white hover:bg-[#3a2b6b] font-semibold transition-all duration-300 text-sm md:text-sm lg:text-lg cursor-pointer shadow-lg hover:shadow-xl rounded-lg md:rounded-lg lg:rounded-xl"
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
