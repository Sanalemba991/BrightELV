'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Mail, Menu, X, ChevronDown } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

// Hardcoded ELV Solution items
const elvSolutionItems = [
  { name: 'CCTV INSTALLATION', href: '/elv-solution/cctv-installation', image: '/cctvintallation/cctv.png' },
  { name: 'CCTV MAINTENANCE', href: '/elv-solution/cctv-maintenance', image: '/cctvmaintenance/main.png' },
  { name: 'STRUCTURE CABLING', href: '/elv-solution/structure-cabling', image: '/strucutrurecabling/struc.png' },
  { name: 'PABX', href: '/elv-solution/pabx', image: '/pabx/pabx.png' },
  { name: 'AUDIO VISUAL SOLUTION', href: '/elv-solution/audio-visual-solution', image: '/images/audio/audio.jpg' },
];

// Hardcoded Customized Solution items with images
const customizedSolutionItems = [
 
  { 
    name: 'CUSTOM KIOSK & PODIUM', 
    href: '/customised-solution/kiosk-stand-maker',
    image: '/customised/customised2.png'
  },
  { 
    name: 'CUSTOM CCTV CONSOLES.', 
    href: '/customised-solution/cctv',
    image: '/customised/customised4.png'
  },
  { 
    name: 'CUSTOM POPUP BOX/ CABLE CUBBY', 
    href: '/customised-solution/custom-pop-up-box',
    image: '/popup/pop.jpg'
  },
  { 
    name: 'CUSTOM FACE PLATES', 
    href: '/customised-solution/custom-face-plates',
    image: '/customised/customised.png'
  },
  { 
    name: 'CUSTOM PORTABLE MIXER RACKS/ AV RACKS', 
    href: '/customised-solution/av-racks',
    image: '/customised/customised2.png'
  },
  { 
    name: 'CUSTOM FLIGHT CASE/ WOODEN PODIUM', 
    href: '/customised-solution/custom-flight-wooden-podium',
    image: '/popup/pop3.jpg'
  },
  { 
    name: 'CUSTOM PROJECTOR STAND/ CEILING MOUNT', 
    href: '/customised-solution/custom-projector-stand',
    image: '/customised/customised4.png'
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [hoveredCustomItem, setHoveredCustomItem] = useState<number>(0);
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Function to check if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
    // Reset to first item when entering customized dropdown
    if (dropdown === 'customized') {
      setHoveredCustomItem(0);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (dropdown: string) => {
    setMobileDropdown(mobileDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 mx-auto mt-2 max-w-[97%] lg:max-w-8xl rounded-xl bg-[#020035] backdrop-blur-md border border-blue-900/30 shadow-xl shadow-blue-900/20">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-22">
          {/* Logo */}
         <Link href="/" className="relative block w-[100px] h-[45px] lg:w-[120px] lg:h-[50px]">
              <motion.div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                animate={{ rotateY: [0, 180, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                {/* Front Logo */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Bright ELV Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Back Logo */}
                <div
                  className="absolute inset-0 rounded-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src="/logo2.png"
                    alt="Bright ELV Logo Back"
                    width={80}
                    height={80}
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-400'
                  : 'text-white hover:text-blue-300'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-blue-400'
                  : 'text-white hover:text-blue-300'
              }`}
            >
              About Us
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/products')
                  ? 'text-blue-400'
                  : 'text-white hover:text-blue-300'
              }`}>
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Customized Solution Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('customized')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/customised-solution')
                  ? 'text-blue-400'
                  : 'text-white hover:text-blue-300'
              }`}>
                <span>Customized Solution</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'customized' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* ELV Solution Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('elv')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/elv-solution')
                  ? 'text-blue-400'
                  : 'text-white hover:text-blue-300'
              }`}>
                <span>ELV Solution</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'elv' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-blue-400'
                  : 'text-white hover:text-blue-300'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Contact Info (stacked on desktop) */}
          <div className="hidden lg:flex flex-col items-end space-y-1">
            <a
              href="tel:+971565022960"
              className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="text-xs font-medium">+971 565022960</span>
            </a>

            <a
              href="https://wa.me/971508813601"
              className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="text-xs font-medium">+971 508813601</span>
            </a>

            <a
              href="mailto:sales@brightelv.com"
              className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span className="text-xs font-medium">sales@brightelv.com</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-blue-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Full-width Products Dropdown */}
        <AnimatePresence>
          {activeDropdown === 'products' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block w-full overflow-hidden mt-4"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative pt-6 pb-8 px-4">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a1628] to-transparent" />
                <div className="flex justify-center items-start gap-6 lg:gap-10 flex-wrap">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/products/${category.slug}`}
                      className="flex flex-col items-center group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-white/10 mb-3 group-hover:scale-105 transition-transform shadow-lg">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50 bg-blue-900/30">
                            <span className="text-2xl">📦</span>
                          </div>
                        )}
                      </div>
                      <span className="text-white text-xs lg:text-sm text-center font-semibold uppercase tracking-wide group-hover:text-blue-300 transition-colors max-w-[100px]">
                        {category.name}
                      </span>
                      <span className="text-blue-400 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More →
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center mt-6 pt-4 border-t border-blue-900/30">
                  <Link
                    href="/products"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider flex items-center gap-2 group"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View All Products
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-width Customized Solution Dropdown */}
        <AnimatePresence>
          {activeDropdown === 'customized' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block w-full overflow-hidden mt-4"
              onMouseEnter={() => handleMouseEnter('customized')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative pt-6 pb-10 px-8 bg-[#0f1f35]/60">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a1628] to-transparent" />
                
                {/* Flex container for menu items and images */}
                <div className="flex items-center justify-between gap-12 max-w-7xl mx-auto">
                  {/* Left side - Menu items in 2 columns */}
                  <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-4">
                    {customizedSolutionItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onMouseEnter={() => setHoveredCustomItem(index)}
                        className="text-white hover:text-blue-400 transition-all duration-200 text-sm font-medium uppercase tracking-wide py-2.5"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Vertical separator */}
                  <div className="w-px h-56 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent shrink-0" />
                  
                  {/* Right side - Single Product image with transition */}
                  <div className="flex items-center shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={hoveredCustomItem}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-56 h-48 rounded-lg overflow-hidden shadow-xl bg-white/5 hover:scale-105 transition-transform">
                          <Image
                            src={customizedSolutionItems[hoveredCustomItem].image}
                            alt={customizedSolutionItems[hoveredCustomItem].name}
                            width={224}
                            height={192}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex justify-center mt-6 pt-4 border-t border-blue-900/30">
                  <Link
                    href="/customised-solution"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider flex items-center gap-2 group"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View All Customised Solutions
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-width ELV Solution Dropdown */}
        <AnimatePresence>
          {activeDropdown === 'elv' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block w-full overflow-hidden mt-4"
              onMouseEnter={() => handleMouseEnter('elv')}
              onMouseLeave={handleMouseLeave}
            >
              {/* Curved top section */}
              <div className="relative pt-6 pb-8 px-4">
                {/* Wave/curved design at top */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a1628] to-transparent" />
                
                {/* Items container */}
                <div className="flex justify-center items-start gap-6 lg:gap-10">
                  {elvSolutionItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex flex-col items-center group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="w-32 h-28 lg:w-40 lg:h-32 rounded-2xl overflow-hidden bg-white/10 mb-3 group-hover:scale-105 transition-transform shadow-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={160}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-xs lg:text-sm text-center font-semibold uppercase tracking-wide group-hover:text-blue-300 transition-colors max-w-[140px]">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center mt-6 pt-4 border-t border-blue-900/30">
                  <Link
                    href="/elv-solution"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider flex items-center gap-2 group"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View All ELV Solutions
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-3 border-t border-blue-900/20"
          >
            <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className={`block transition-colors text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5 ${
                isActive('/')
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`block transition-colors text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5 ${
                isActive('/about')
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-white hover:text-blue-300'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown('products')}
                className={`flex items-center justify-between w-full transition-colors text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5 ${
                  isActive('/products')
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 mt-1 space-y-1"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/products/${category.slug}`}
                        className="block text-white/80 hover:text-blue-300 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-white/5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className="block text-cyan-400 hover:text-cyan-300 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-white/5 font-semibold mt-2 border-t border-blue-900/20 pt-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Products →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Customized Solution Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown('customized')}
                className={`flex items-center justify-between w-full transition-colors text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5 ${
                  isActive('/customised-solution')
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <span>Customized Solution</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'customized' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileDropdown === 'customized' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 mt-1 space-y-1"
                  >
                    {customizedSolutionItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block text-white/80 hover:text-blue-300 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-white/5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/customised-solution"
                      className="block text-cyan-400 hover:text-cyan-300 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-white/5 font-semibold mt-2 border-t border-blue-900/20 pt-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Customised Solutions →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile ELV Solution Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown('elv')}
                className={`flex items-center justify-between w-full transition-colors text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5 ${
                  isActive('/elv-solution')
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <span>ELV Solution</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'elv' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileDropdown === 'elv' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 mt-1 space-y-1"
                  >
                    {elvSolutionItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block text-white/80 hover:text-blue-300 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-white/5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/elv-solution"
                      className="block text-cyan-400 hover:text-cyan-300 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-white/5 font-semibold mt-2 border-t border-blue-900/20 pt-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All ELV Solutions →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className={`block transition-colors text-sm font-medium py-2 px-2 rounded-lg hover:bg-white/5 ${
                isActive('/contact')
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-white hover:text-blue-300'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* Mobile Contact Info */}
            <div className="space-y-3 pt-3 border-t border-blue-900/20 px-2">
              <a 
                href="tel:+971565022960" 
                className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+971 565022960</span>
              </a>
              
              <a 
                href="https://wa.me/971508813601" 
                className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">+971 508813601</span>
              </a>
              
              <a 
                href="mailto:sales@brightelv.com" 
                className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">sales@brightelv.com</span>
              </a>
            </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </nav>
  );
}