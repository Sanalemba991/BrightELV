'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { 
    FiHome, FiBox, FiGrid, FiMessageSquare,
    FiMail, FiLogOut, FiChevronLeft, FiLayers, FiShoppingCart
} from 'react-icons/fi';

interface AdminSidebarProps {
    onCollapsedChange?: (collapsed: boolean) => void;
}

const AdminSidebar = ({ onCollapsedChange }: AdminSidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        onCollapsedChange?.(isCollapsed);
    }, [isCollapsed, onCollapsedChange]);

    const menuItems = [
        { icon: FiHome, label: 'Dashboard', href: '/admin', color: 'from-orange-500 to-orange-600' },
        { icon: FiGrid, label: 'Categories', href: '/admin/category', color: 'from-orange-500 to-orange-600' },
        { icon: FiLayers, label: 'SubCategories', href: '/admin/subcategory', color: 'from-orange-500 to-orange-600' },
        { icon: FiBox, label: 'Products', href: '/admin/products', color: 'from-orange-500 to-orange-600' },
        { icon: FiMessageSquare, label: 'Contact Enquiry', href: '/admin/contact', color: 'from-orange-500 to-orange-600' },
        { icon: FiShoppingCart, label: 'Product Enquiry', href: '/admin/product-enquiry', color: 'from-orange-500 to-orange-600' },
        { icon: FiMail, label: 'Subscriptions', href: '/admin/subscriptions', color: 'from-orange-500 to-orange-600' },
    ];

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                toast.success('Logged out successfully');
                router.push('/auth/login');
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            toast.error('An error occurred during logout');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <motion.div 
            className={`fixed left-0 top-0 h-screen z-50 ${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300`}
            initial={false}
        >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl border-r border-orange-500/10" />
            
            {/* Gradient Accent - hidden when collapsed */}
            {!isCollapsed && (
                <div className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-orange-500 via-orange-400 to-orange-600" />
            )}

            <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-orange-500/10">
                    <div className="flex items-center justify-between">
                        <motion.div 
                            className="flex items-center gap-3"
                            animate={{ opacity: isCollapsed ? 0 : 1 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-lg shadow-orange-500/30 p-1">
                                <img src="/logo.png" alt="Bright ELV" className="w-full h-full object-contain" />
                            </div>
                            {!isCollapsed && (
                                <div>
                                    <h1 className="text-lg font-bold text-white">Bright ELV</h1>
                                    <p className="text-xs text-gray-400">Admin Panel</p>
                                </div>
                            )}
                        </motion.div>
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                        >
                            <motion.div
                                animate={{ rotate: isCollapsed ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FiChevronLeft className="w-5 h-5" />
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500/20 scrollbar-track-transparent">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        const isHovered = hoveredItem === item.href;
                        
                        return (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onHoverStart={() => setHoveredItem(item.href)}
                                onHoverEnd={() => setHoveredItem(null)}
                            >
                                <Link href={item.href}>
                                    <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                                        ${isActive 
                                            ? 'bg-linear-to-r ' + item.color + ' shadow-lg' 
                                            : 'hover:bg-white/5'
                                        }`}
                                    >
                                        {/* Hover Glow Effect */}
                                        {!isActive && isHovered && (
                                            <motion.div
                                                className={`absolute inset-0 rounded-xl bg-linear-to-r ${item.color} opacity-10`}
                                                layoutId="hover-bg"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                        
                                        <div className={`relative z-10 p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                                        </div>
                                        
                                        {!isCollapsed && (
                                            <span className={`relative z-10 font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`}>
                                                {item.label}
                                            </span>
                                        )}

                                        {/* Active Indicator */}
                                        {isActive && !isCollapsed && (
                                            <motion.div
                                                className="absolute right-3 w-2 h-2 rounded-full bg-white"
                                                layoutId="active-indicator"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Footer - Logout */}
                <div className="p-4 border-t border-orange-500/10">
                    <motion.button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 group-hover:bg-linear-to-r group-hover:from-red-500 group-hover:to-rose-600 group-hover:border-transparent transition-all duration-300">
                            {isLoggingOut ? (
                                <motion.div
                                    className="w-5 h-5 border-2 border-red-400/30 border-t-red-400 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            ) : (
                                <FiLogOut className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
                            )}
                            {!isCollapsed && (
                                <span className="font-medium text-red-400 group-hover:text-white transition-colors">
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </span>
                            )}
                        </div>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminSidebar;
