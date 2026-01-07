'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FiBox, FiGrid, FiLayers, FiMessageSquare, FiMail, 
    FiUsers, FiTrendingUp, FiRefreshCw, FiActivity
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

interface StatsData {
    products: number;
    categories: number;
    subcategories: number;
    subscriptions: {
        total: number;
        active: number;
        inactive: number;
    };
    contacts: {
        total: number;
        new: number;
        read: number;
        replied: number;
    };
    productInquiries: {
        total: number;
        new: number;
        contacted: number;
        closed: number;
    };
}

const initialStats: StatsData = {
    products: 0,
    categories: 0,
    subcategories: 0,
    subscriptions: { total: 0, active: 0, inactive: 0 },
    contacts: { total: 0, new: 0, read: 0, replied: 0 },
    productInquiries: { total: 0, new: 0, contacted: 0, closed: 0 }
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<StatsData>(initialStats);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/dashboard-stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(() => {
            setLastUpdated(new Date());
            fetchStats();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        setLastUpdated(new Date());
        fetchStats();
    };

    const statCards = [
        { title: 'Products', value: stats.products, icon: FiBox, gradient: 'from-orange-500 to-orange-600', shadowColor: 'shadow-orange-500/25' },
        { title: 'Categories', value: stats.categories, icon: FiGrid, gradient: 'from-orange-400 to-amber-500', shadowColor: 'shadow-amber-500/25' },
        { title: 'SubCategories', value: stats.subcategories, icon: FiLayers, gradient: 'from-orange-600 to-red-500', shadowColor: 'shadow-orange-600/25' },
        { title: 'Contact Enquiry', value: stats.contacts.total, icon: FiMessageSquare, gradient: 'from-purple-500 to-purple-600', shadowColor: 'shadow-purple-500/25', newCount: stats.contacts.new },
        { title: 'Product Enquiry', value: stats.productInquiries.total, icon: FiBox, gradient: 'from-blue-500 to-blue-600', shadowColor: 'shadow-blue-500/25', newCount: stats.productInquiries.new },
    ];

    const contactChartData = [
        { name: 'New', value: stats.contacts.new, color: '#f59e0b' },
        { name: 'Read', value: stats.contacts.read, color: '#8b5cf6' },
        { name: 'Replied', value: stats.contacts.replied, color: '#10b981' },
    ];

    const productInquiryChartData = [
        { name: 'New', value: stats.productInquiries.new, color: '#f59e0b' },
        { name: 'Contacted', value: stats.productInquiries.contacted, color: '#3b82f6' },
        { name: 'Closed', value: stats.productInquiries.closed, color: '#10b981' },
    ];

    const subscriptionChartData = [
        { name: 'Active', value: stats.subscriptions.active, color: '#10b981' },
        { name: 'Inactive', value: stats.subscriptions.inactive, color: '#ef4444' },
    ];

    const barChartData = [
        { name: 'Products', value: stats.products, fill: 'url(#purpleGradient)' },
        { name: 'Categories', value: stats.categories, fill: 'url(#orangeGradient)' },
        { name: 'SubCategories', value: stats.subcategories, fill: 'url(#greenGradient)' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-orange-500/20"></div>
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            {/* Header */}
            <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                        <p className="text-gray-400">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </p>
                    </div>
                    <motion.button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            animate={{ rotate: refreshing ? 360 : 0 }}
                            transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
                        >
                            <FiRefreshCw className="w-5 h-5" />
                        </motion.div>
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <div className={`relative overflow-hidden rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-orange-500/10 p-6 hover:border-orange-500/30 transition-all duration-300 ${card.shadowColor} hover:shadow-xl`}>
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                            
                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${card.gradient} shadow-lg mb-4`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                            
                            {/* Value */}
                            <motion.div
                                className="text-4xl font-bold text-white mb-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                            >
                                {card.value}
                            </motion.div>
                            
                            {/* Title */}
                            <p className="text-gray-400">{card.title}</p>
                            
                            {/* Trend Indicator or New Badge */}
                            <div className="absolute top-6 right-6 flex items-center gap-1 text-sm">
                                {'newCount' in card && card.newCount && card.newCount > 0 ? (
                                    <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
                                        {card.newCount} new
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-green-400">
                                        <FiTrendingUp className="w-4 h-4" />
                                        Active
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Content Overview Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-orange-500/10 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FiActivity className="w-5 h-5 text-orange-400" />
                        Content Overview
                    </h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData}>
                                <defs>
                                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f97316" />
                                        <stop offset="100%" stopColor="#ea580c" />
                                    </linearGradient>
                                    <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fb923c" />
                                        <stop offset="100%" stopColor="#f97316" />
                                    </linearGradient>
                                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ea580c" />
                                        <stop offset="100%" stopColor="#c2410c" />
                                    </linearGradient>
                                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fbbf24" />
                                        <stop offset="100%" stopColor="#f59e0b" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                <YAxis stroke="#9ca3af" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(23, 23, 23, 0.95)',
                                        border: '1px solid rgba(249, 115, 22, 0.3)',
                                        borderRadius: '12px',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    labelStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="value" fill="url(#purpleGradient)" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Contact Stats */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-orange-500/10 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FiMessageSquare className="w-5 h-5 text-orange-400" />
                        Contact Messages
                    </h2>
                    <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={contactChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {contactChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(23, 23, 23, 0.95)',
                                        border: '1px solid rgba(249, 115, 22, 0.3)',
                                        borderRadius: '12px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {contactChartData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-gray-400 text-sm">{item.name}: {item.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Subscriptions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-orange-500/10 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FiMail className="w-5 h-5 text-orange-400" />
                        Subscriptions
                    </h2>
                    <div className="text-5xl font-bold text-white mb-4">{stats.subscriptions.total}</div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Active</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 rounded-full bg-slate-700 overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-green-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.subscriptions.total ? (stats.subscriptions.active / stats.subscriptions.total) * 100 : 0}%` }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    />
                                </div>
                                <span className="text-green-400 font-medium">{stats.subscriptions.active}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Inactive</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 rounded-full bg-slate-700 overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-red-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.subscriptions.total ? (stats.subscriptions.inactive / stats.subscriptions.total) * 100 : 0}%` }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                    />
                                </div>
                                <span className="text-red-400 font-medium">{stats.subscriptions.inactive}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-orange-500/10 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Contact Stats</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                            <div className="text-2xl font-bold text-orange-400">{stats.contacts.total}</div>
                            <div className="text-gray-400 text-sm">Total Contacts</div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="text-2xl font-bold text-amber-400">{stats.contacts.new}</div>
                            <div className="text-gray-400 text-sm">New</div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                            <div className="text-2xl font-bold text-green-400">{stats.contacts.replied}</div>
                            <div className="text-gray-400 text-sm">Replied</div>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <div className="text-2xl font-bold text-purple-400">{stats.contacts.read}</div>
                            <div className="text-gray-400 text-sm">Read</div>
                        </div>
                    </div>
                </motion.div>

                {/* Product Enquiry Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-orange-500/10 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FiBox className="w-5 h-5 text-blue-400" />
                        Product Enquiry Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <div className="text-2xl font-bold text-blue-400">{stats.productInquiries.total}</div>
                            <div className="text-gray-400 text-sm">Total Enquiries</div>
                        </div>
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                            <div className="text-2xl font-bold text-yellow-400">{stats.productInquiries.new}</div>
                            <div className="text-gray-400 text-sm">New</div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/20">
                            <div className="text-2xl font-bold text-blue-300">{stats.productInquiries.contacted}</div>
                            <div className="text-gray-400 text-sm">Contacted</div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                            <div className="text-2xl font-bold text-green-400">{stats.productInquiries.closed}</div>
                            <div className="text-gray-400 text-sm">Closed</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
