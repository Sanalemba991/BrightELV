'use client'
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiZap, FiShield, FiArrowRight } from 'react-icons/fi';

// Animation variants for better performance
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6 }
    }
};

// Particle component for background
const Particle = ({ index }: { index: number }) => {
    const style = useMemo(() => ({
        top: `${(index * 5) % 100}%`,
        left: `${(index * 7) % 100}%`,
    }), [index]);

    return (
        <motion.div
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={style}
            animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.3, 1],
            }}
            transition={{
                duration: 3 + (index % 3),
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
            }}
        />
    );
};

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Welcome back! Redirecting...');
                setTimeout(() => router.push('/admin'), 800);
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch {
            toast.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    // Memoize particles to prevent re-renders
    const particles = useMemo(() => (
        Array.from({ length: 15 }, (_, i) => <Particle key={i} index={i} />)
    ), []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                        background: 'rgba(23, 23, 23, 0.95)',
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                    },
                }}
            />
            
            {/* Optimized Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Orbs - Using CSS animations for better performance */}
                <div 
                    className="absolute w-[500px] h-[500px] rounded-full orb-1"
                    style={{
                        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
                        top: '-10%',
                        right: '-10%',
                    }}
                />
                <div 
                    className="absolute w-[600px] h-[600px] rounded-full orb-2"
                    style={{
                        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)',
                        bottom: '-20%',
                        left: '-10%',
                    }}
                />
                <div 
                    className="absolute w-[400px] h-[400px] rounded-full orb-3"
                    style={{
                        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, transparent 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Optimized Particles */}
                {particles}
            </div>

            {/* Global Styles for CSS Animations */}
            <style jsx global>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, 20px) scale(1.1); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1.1); }
                    50% { transform: translate(-20px, -30px) scale(1); }
                }
                @keyframes pulse-orb {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.25; }
                }
                .orb-1 { animation: float1 8s ease-in-out infinite; }
                .orb-2 { animation: float2 10s ease-in-out infinite; }
                .orb-3 { animation: pulse-orb 4s ease-in-out infinite; }
            `}</style>

            {/* Login Card */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md"
                >
                    {/* Glass Card */}
                    <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-orange-500/20 shadow-2xl shadow-orange-500/10 overflow-hidden">
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-orange-600/5 pointer-events-none" />
                        
                        {/* Top Accent */}
                        <div className="h-1 bg-linear-to-r from-orange-500 via-orange-400 to-orange-600" />

                        <motion.div 
                            className="relative p-8 md:p-10"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Logo & Title */}
                            <motion.div 
                                className="text-center mb-8"
                                variants={itemVariants}
                            >
                                <motion.div 
                                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 shadow-lg shadow-orange-500/30 p-2"
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <img src="/logo.png" alt="Bright ELV" className="w-full h-full object-contain" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Bright <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-500">ELV</span>
                                </h1>
                                <p className="text-gray-400 text-sm">Admin Control Panel</p>
                            </motion.div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Username Field */}
                                <motion.div variants={itemVariants}>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Username
                                    </label>
                                    <div className={`relative group transition-transform duration-200 ${focusedField === 'username' ? 'scale-[1.01]' : ''}`}>
                                        <div className={`absolute -inset-0.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 opacity-0 transition-opacity duration-300 blur-sm ${focusedField === 'username' ? 'opacity-75' : 'group-hover:opacity-50'}`} />
                                        <div className="relative flex items-center">
                                            <div className={`absolute left-4 transition-colors duration-200 ${focusedField === 'username' ? 'text-orange-400' : 'text-gray-400 group-hover:text-orange-400'}`}>
                                                <FiUser className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                value={credentials.username}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('username')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="Enter username"
                                                autoComplete="username"
                                                className="w-full pl-12 pr-4 py-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-black/80 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Password Field */}
                                <motion.div variants={itemVariants}>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className={`relative group transition-transform duration-200 ${focusedField === 'password' ? 'scale-[1.01]' : ''}`}>
                                        <div className={`absolute -inset-0.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 opacity-0 transition-opacity duration-300 blur-sm ${focusedField === 'password' ? 'opacity-75' : 'group-hover:opacity-50'}`} />
                                        <div className="relative flex items-center">
                                            <div className={`absolute left-4 transition-colors duration-200 ${focusedField === 'password' ? 'text-orange-400' : 'text-gray-400 group-hover:text-orange-400'}`}>
                                                <FiLock className="w-5 h-5" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={credentials.password}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('password')}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="Enter password"
                                                autoComplete="current-password"
                                                className="w-full pl-12 pr-12 py-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-black/80 transition-all duration-200"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 text-gray-400 hover:text-orange-400 transition-colors duration-200"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants}>
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full group overflow-hidden rounded-xl"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
                                        <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-orange-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                                        <div className="relative flex items-center justify-center gap-3 w-full py-4 text-white font-semibold">
                                            <AnimatePresence mode="wait">
                                                {loading ? (
                                                    <motion.div
                                                        key="loading"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <motion.div
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                        />
                                                        <span>Authenticating...</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="submit"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span>Sign In</span>
                                                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.button>
                                </motion.div>
                            </form>

                            {/* Security Badge */}
                            <motion.div 
                                className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm"
                                variants={itemVariants}
                            >
                                <FiShield className="w-4 h-4 text-orange-400" />
                                <span>Secured with JWT Authentication</span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Bottom Text */}
                    <motion.p 
                        className="text-center text-gray-500 text-sm mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        © 2026 Bright ELV Solutions. All rights reserved.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
