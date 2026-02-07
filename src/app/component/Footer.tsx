"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, Smartphone, MessageSquare, Facebook, Instagram, Linkedin } from "lucide-react";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M20.5 3.5A12.12 12.12 0 0 0 12 0 12 12 0 0 0 0 12a11.8 11.8 0 0 0 2.1 6.7L0 24l5.3-2.1A12 12 0 0 0 12 24a12 12 0 0 0 12-12 12.12 12.12 0 0 0-3.5-8.5zM12 22a9.9 9.9 0 0 1-5-1.3l-.4-.2-3.7.9.9-3.6-.2-.4A10 10 0 1 1 12 22zm5.5-7.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.3-.7.1a10.3 10.3 0 0 1-3-1.8 11.2 11.2 0 0 1-2-2.5c-.2-.3 0-.5.2-.7.2-.2.3-.3.5-.5a2.2 2.2 0 0 0 .3-.5.6.6 0 0 0 0-.5c0-.2-.5-1.2-.7-1.6-.2-.5-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3a3.6 3.6 0 0 0-1.1 2.7A6 6 0 0 0 9 15.5a13.7 13.7 0 0 0 5 2.7 5.7 5.7 0 0 0 3.5-.4 4.6 4.6 0 0 0 1.9-1.8c.2-.3.2-.6.1-.7-.1-.2-.4-.2-.8-.4z"/>
  </svg>
);

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Social media and contact links
  const socialLinks = {
    facebook: "https://www.facebook.com/brightelvtech/",
    instagram: "https://www.instagram.com/brightelv_technology_llc/",
    linkedin: "https://www.linkedin.com/company/brightelv-l-l-c/",
    whatsapp: "https://wa.me/971508813601",
    email: "mailto:sales@brightelv.com",
    phone1: "tel:+97146652233",
    phone2: "tel:+971565022960",
    whatsappNumber: "tel:+971508813601",
  };

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data: Category[] = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Primary navigation links
  const primaryLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  // ELV Solution links
  const elvSolutionLinks = [
    { name: "Audio Visual Solution", href: "/solution/audio-visual-solution" },
    { name: "CCTV Installation", href: "/solution/cctv-installation" },
    { name: "CCTV Maintenance", href: "/solution/cctv-maintenance" },
    { name: "PABX", href: "/solution/pabx" },
    { name: "Structure Cabling", href: "/solution/structure-cabling" },
  ];

  // Customized Solution links
  const customizedSolutionLinks = [
    { name: "AV Racks", href: "/solution/av-racks" },
    { name: "CCTV", href: "/solution/cctv-customized" },
    { name: "Custom Face Plates", href: "/solution/custom-face-plates" },
    { name: "Flight Wooden Podium", href: "/solution/flight-wooden-podium" },
    { name: "Pop-up Box", href: "/solution/pop-up-box" },
    { name: "Projector Stand", href: "/solution/projector-stand" },
    { name: "Kiosk Stand", href: "/solution/kiosk-stand" },
  ];

  // Group categories into two columns
  const firstColumnProducts = categories.slice(0, Math.ceil(categories.length / 2));
  const secondColumnProducts = categories.slice(Math.ceil(categories.length / 2));

  return (
    <footer className="bg-[#020035] text-white py-8 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Branding and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand/Logo Area */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="border-2 border-blue-400 p-2 inline-block">
                <Link href="/">
                  <img
                    src="/logo.png"
                    alt="Bright ELV Technology Logo"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-300 pr-4">
              BrightElv Leads In Providing Innovative, Durable CCTV Brackets And Poles In Dubai And Middle East, Designed For Harsh Climates. We Assure Enhanced Security And Peace Of Mind.
            </p>
          </div>

          {/* Primary Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">PRIMARY</h3>
            <ul className="space-y-3 text-sm font-medium">
              {primaryLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="hover:text-blue-400 transition block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">PRODUCTS</h3>
            <ul className="space-y-3 text-sm font-medium">
              {isLoading ? (
                <li className="text-gray-400">Loading...</li>
              ) : firstColumnProducts.length > 0 ? (
                firstColumnProducts.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/products/${category.slug}`}
                      className="hover:text-blue-400 transition block uppercase"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No products available</li>
              )}
            </ul>
          </div>

          {/* ELV Solution Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">ELV SOLUTION</h3>
            <ul className="space-y-3 text-sm font-medium">
              {elvSolutionLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="hover:text-blue-400 uppercase transition block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customized Solution Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider whitespace-nowrap">
              CUSTOMIZED SOLUTION
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {customizedSolutionLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="hover:text-blue-400 uppercase transition block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Contact and Socials */}
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="space-y-3">
              <p className="font-bold text-sm tracking-wide">BRIGHT ELV TECHNOLOGY L.L.C</p>
              <p className="text-sm text-gray-300">PB NO: 381108, Dubai UAE</p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-[13px]">
                {/* Email */}
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={16} className="text-white" /> 
                  sales@brightelv.com
                </a>

                {/* Phone 1 */}
                <a
                  href={socialLinks.phone1}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition"
                >
                  <Phone size={16} /> 
                  +971 466 52 233
                </a>

                {/* Phone 2 */}
                <a
                  href={socialLinks.phone2}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition"
                >
                  <Smartphone size={16} /> 
                  +971 56 5022960
                </a>

                {/* WhatsApp with custom icon */}
                <a
                  href={socialLinks.whatsapp}
                  className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={16} className="text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-white group-hover:text-green-500">+971 50 8813601</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
              <div className="flex gap-5">
                {/* Facebook */}
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 cursor-pointer transition hover:scale-110 duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>

                {/* Instagram */}
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 cursor-pointer transition hover:scale-110 duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>

                {/* LinkedIn */}
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 cursor-pointer transition hover:scale-110 duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                
              </div>
              
              <p className="text-[10px] text-gray-400 tracking-[0.2em] font-bold uppercase">
                All Copyright Reserved © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;