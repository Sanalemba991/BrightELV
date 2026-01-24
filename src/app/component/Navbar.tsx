"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, MessageCircle, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  displayType: string;
  subcategories: SubCategory[];
  image?: string;
}

interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdown?: string;
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products", hasDropdown: true, dropdown: 'products' },
  { name: "Customized Solution", href: "/customised-solution", hasDropdown: true, dropdown: 'custom' },
  { name: "ELV Solution", href: "/elv-solution", hasDropdown: true, dropdown: 'elv' },
];

const CUSTOM_SOLUTIONS = [
  { name: "AV Racks", href: "/customised-solution/av-racks" },
  { name: "CCTV", href: "/customised-solution/cctv" },
  { name: "Custom Face Plates", href: "/customised-solution/custom-face-plates" },
  { name: "Flight Wooden Podium", href: "/customised-solution/custom-flight-wooden-podium" },
  { name: "Pop-up Box", href: "/customised-solution/custom-pop-up-box" },
  { name: "Projector Stand", href: "/customised-solution/custom-projector-stand" },
  { name: "Kiosk Stand", href: "/customised-solution/kiosk-stand-maker" },
  { name: "View All Customized Solutions", href: "/customised-solution", isViewAll: true },
];

const ELV_SOLUTIONS = [
  { name: "Audio Visual Solution", href: "/elv-solution/audio-visual-solution" },
  { name: "CCTV Installation", href: "/elv-solution/cctv-installation" },
  { name: "CCTV Maintenance", href: "/elv-solution/cctv-maintenance" },
  { name: "PABX", href: "/elv-solution/pabx" },
  { name: "Structure Cabling", href: "/elv-solution/structure-cabling" },
  { name: "View All ELV Solutions", href: "/elv-solution", isViewAll: true },
];

const CONTACT_INFO = [
  { icon: Phone, href: "tel:+971565022960", text: "+971 565022960", color: "text-blue-900" },
  {
    icon: MessageCircle,
    href: "https://wa.me/971508813601",
    text: "+971 50 881 3601",
    color: "text-green-600",
  },
  { icon: Mail, href: "mailto:sales@brightelv.com", text: "sales@brightelv.com", color: "text-blue-900" },
];

interface DropdownProps {
  items: { name: string; href: string; isViewAll?: boolean }[];
  isOpen: boolean;
  closeMenu?: () => void;
}

const DropdownMenu = ({ items, isOpen, closeMenu }: DropdownProps) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="ml-4 mt-1 border-l-2 border-blue-100 pl-4 space-y-1 overflow-hidden"
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block py-2 text-gray-600 hover:text-blue-900 text-sm transition-colors duration-200"
          onClick={closeMenu}
        >
          {item.name}
        </Link>
      ))}
    </motion.div>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/subcategories')
        ]);
        
        if (catRes.ok && subRes.ok) {
          const cats = await catRes.json();
          const subs = await subRes.json();
          
          setCategories(cats.map((cat: Category) => ({
            ...cat,
            subcategories: subs.filter((sub: SubCategory) => sub.category === cat._id)
          })));
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // Close dropdowns when pathname changes
  useEffect(() => {
    setOpenDropdown(null);
    setOpenMobileSubmenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const isDropdownActive = (dropdownType: string) => {
    if (dropdownType === 'products') return pathname.startsWith('/products');
    if (dropdownType === 'custom') return pathname.startsWith('/customised-solution');
    if (dropdownType === 'elv') return pathname.startsWith('/elv-solution');
    return false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              {CONTACT_INFO.map(({ icon: Icon, href, text }) => (
                <a key={href} href={href} className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                  <Icon className="w-3 h-3" />
                  <span>{text}</span>
                </a>
              ))}
            </div>
            <div className="text-blue-200">Leading ELV Solutions Provider in UAE</div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-1.5 text-black" : "bg-white py-2 text-black"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-6">
              <Image src="/logo.png" alt="Bright ELV" width={100} height={100} className="" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center">
              {NAV_LINKS.map((link) => (
                <DesktopNavItem 
                  key={link.name} 
                  link={link} 
                  openDropdown={openDropdown} 
                  setOpenDropdown={setOpenDropdown} 
                  categories={categories} 
                  isScrolled={isScrolled}
                  isActive={isActive(link.href)}
                  isDropdownActive={link.dropdown ? isDropdownActive(link.dropdown) : false}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/contact" className="px-5 py-2 bg-blue-900 text-white text-xs rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/25 hover:shadow-blue-900/40">
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu 
              navLinks={NAV_LINKS} 
              categories={categories} 
              openMobileSubmenu={openMobileSubmenu} 
              setOpenMobileSubmenu={setOpenMobileSubmenu} 
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              pathname={pathname}
              isActive={isActive}
              isDropdownActive={isDropdownActive}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

interface DesktopNavItemProps {
  link: NavLink;
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  categories: Category[];
  isScrolled: boolean;
  isActive: boolean;
  isDropdownActive: boolean;
}

const DesktopNavItem = ({ link, openDropdown, setOpenDropdown, categories, isScrolled, isActive, isDropdownActive }: DesktopNavItemProps) => {
  const dropdownConfig: Record<string, { component: any; props: any }> = {
    products: { component: ProductsTextDropdown, props: { categories } },
    custom: { component: SimpleTextDropdown, props: { items: CUSTOM_SOLUTIONS } },
    elv: { component: SimpleTextDropdown, props: { items: ELV_SOLUTIONS } },
  };

  const isOpen = link.dropdown && openDropdown === link.dropdown;
  const Dropdown = isOpen && link.dropdown ? dropdownConfig[link.dropdown]?.component : null;
  const isCurrentlyActive = link.dropdown ? isDropdownActive : isActive;

  return (
    <div 
      className="static" 
      onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.dropdown || null)} 
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <Link 
        href={link.href} 
        className={`px-3 py-2 font-medium transition-all duration-200 flex items-center gap-2 text-xs relative group ${
          isCurrentlyActive 
            ? "text-blue-900" 
            : "text-black hover:text-blue-900"
        }`}
      >
        {link.name}
        {link.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.dropdown ? 'rotate-180' : ''}`} />}
        <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-blue-900 transition-all duration-300 ${isCurrentlyActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`}></span>
      </Link>
      <AnimatePresence>
        {Dropdown && isOpen && <Dropdown {...dropdownConfig[link.dropdown!].props} />}
      </AnimatePresence>
    </div>
  );
};

const ProductsTextDropdown = ({ categories }: { categories: Category[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 bg-white shadow-2xl border-t-2 border-blue-900 z-50 max-w-5xl"
    >
      <div className="px-8 py-6 h-[200px] overflow-y-auto">
        {categories.length === 0 ? (
          <div className="flex gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-6 w-24 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-4">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products/${category.slug}`}
                  className="py-2 px-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 text-sm transition-all duration-200 rounded-md whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="border-t pt-3">
              <Link
                href="/products"
                className="text-blue-900 font-semibold text-sm hover:text-blue-700 transition-all inline-flex items-center gap-1 group"
              >
                All Products <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SimpleTextDropdown = ({ items }: { items: { name: string; href: string; isViewAll?: boolean }[] }) => {
  const regularItems = items.filter(item => !item.isViewAll);
  const viewAllItem = items.find(item => item.isViewAll);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 bg-white shadow-2xl border-t-2 border-blue-900 z-50 max-w-5xl"
    >
      <div className="px-8 py-6 h-[200px] overflow-y-auto">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-4">
            {regularItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-2 px-3 text-gray-700 hover:text-blue-900 hover:bg-blue-50 text-sm transition-all duration-200 rounded-md whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {viewAllItem && (
            <div className="border-t pt-3">
              <Link
                href={viewAllItem.href}
                className="text-blue-900 font-semibold text-sm hover:text-blue-700 transition-all inline-flex items-center gap-1 group"
              >
                {viewAllItem.name.replace('View All ', 'All ')} <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface MobileMenuProps {
  navLinks: NavLink[];
  categories: Category[];
  openMobileSubmenu: string | null;
  setOpenMobileSubmenu: (dropdown: string | null) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  pathname: string;
  isActive: (href: string) => boolean;
  isDropdownActive: (dropdownType: string) => boolean;
}

const MobileMenu = ({ navLinks, categories, openMobileSubmenu, setOpenMobileSubmenu, setIsMobileMenuOpen, pathname, isActive, isDropdownActive }: MobileMenuProps) => (
  <motion.div 
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
  >
    <div className="py-4 px-4 space-y-1">
      {navLinks.map((link) => {
        const isCurrentlyActive = link.dropdown ? isDropdownActive(link.dropdown!) : isActive(link.href);
        
        return (
          <div key={link.name}>
            <div className="flex items-center justify-between">
              <Link 
                href={link.href} 
                className={`flex-1 px-4 py-3 font-medium rounded-lg text-sm relative transition-all duration-200 ${
                  isCurrentlyActive 
                    ? "text-blue-900 bg-blue-50" 
                    : "text-gray-700 hover:bg-blue-50"
                }`} 
                onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-blue-900 transition-all duration-300 ${isCurrentlyActive ? 'w-1/2' : 'w-0'}`}></span>
              </Link>
              {link.hasDropdown && (
                <button onClick={() => setOpenMobileSubmenu(openMobileSubmenu === link.dropdown ? null : link.dropdown || null)} className="p-3 text-gray-500">
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openMobileSubmenu === link.dropdown ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {link.dropdown === 'products' && openMobileSubmenu === 'products' && (
                <DropdownMenu items={categories.map(c => ({ name: c.name, href: `/products/${c.slug}` }))} isOpen closeMenu={() => setIsMobileMenuOpen(false)} />
              )}
              {link.dropdown === 'custom' && openMobileSubmenu === 'custom' && (
                <DropdownMenu items={CUSTOM_SOLUTIONS} isOpen closeMenu={() => setIsMobileMenuOpen(false)} />
              )}
              {link.dropdown === 'elv' && openMobileSubmenu === 'elv' && (
                <DropdownMenu items={ELV_SOLUTIONS} isOpen closeMenu={() => setIsMobileMenuOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        );
      })}
      
      {/* Mobile Contact Info */}
      <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
        {CONTACT_INFO.map(({ icon: Icon, href, text, color }) => (
          <a key={href} href={href} className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-blue-900 text-sm transition-colors duration-200">
            <Icon className={`w-5 h-5 ${color}`} />
            <span>{text}</span>
          </a>
        ))}
        <Link href="/contact" className={`block mx-4 mt-4 px-6 py-3 font-medium rounded-full text-center text-sm transition-all duration-200 ${
          pathname === "/contact" 
            ? "bg-blue-900 text-white" 
            : "bg-blue-900 text-white hover:bg-blue-700"
        }`} onClick={() => setIsMobileMenuOpen(false)}>
          Get Quote
        </Link>
      </div>
    </div>
  </motion.div>
);