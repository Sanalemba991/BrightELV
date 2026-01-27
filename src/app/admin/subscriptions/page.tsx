'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiMail, FiTrash2, FiX, FiSearch, FiUsers, FiDownload } from 'react-icons/fi';

interface Subscription {
    _id: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const fetchSubscriptions = async () => {
        try {
            const response = await fetch('/api/subscriptions');
            if (response.ok) {
                const data = await response.json();
                setSubscriptions(data);
            }
        } catch (error) {
            toast.error('Failed to fetch subscriptions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/subscriptions/${id}`, { method: 'DELETE' });
            if (response.ok) {
                toast.success('Subscription deleted!');
                setSubscriptions(prev => prev.filter(s => s._id !== id));
                setShowDeleteModal(false);
                setDeleteId(null);
            }
        } catch (error) {
            toast.error('Failed to delete subscription');
        }
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        try {
            const response = await fetch(`/api/subscriptions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !isActive })
            });
            if (response.ok) {
                toast.success(`Subscription ${!isActive ? 'activated' : 'deactivated'}!`);
                setSubscriptions(prev => prev.map(s => 
                    s._id === id ? { ...s, isActive: !isActive } : s
                ));
            }
        } catch (error) {
            toast.error('Failed to update subscription');
        }
    };

    const handleSelectAll = () => {
        if (selectedEmails.length === filteredSubscriptions.length) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(filteredSubscriptions.map(s => s.email));
        }
    };

    const handleSelectEmail = (email: string) => {
        setSelectedEmails(prev => 
            prev.includes(email) 
                ? prev.filter(e => e !== email)
                : [...prev, email]
        );
    };

    const exportEmails = () => {
        const emailsToExport = selectedEmails.length > 0 
            ? selectedEmails 
            : subscriptions.filter(s => s.isActive).map(s => s.email);
        
        const csvContent = emailsToExport.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'subscribers.csv';
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Exported ${emailsToExport.length} emails!`);
    };

    const filteredSubscriptions = subscriptions.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeCount = subscriptions.filter(s => s.isActive).length;

    return (
        <div className="min-h-screen py-8">
            {/* Header */}
            <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Email Subscriptions</h1>
                    <p className="text-gray-400">
                        {subscriptions.length} total • {activeCount} active subscribers
                    </p>
                </div>
                <motion.button
                    onClick={exportEmails}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiDownload className="w-5 h-5" />
                    Export {selectedEmails.length > 0 ? `(${selectedEmails.length})` : 'All'}
                </motion.button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="rounded-2xl bg-linear-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <FiUsers className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Subscribers</p>
                            <p className="text-2xl font-bold text-white">{subscriptions.length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-linear-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <FiMail className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Active Subscribers</p>
                            <p className="text-2xl font-bold text-white">{activeCount}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-linear-to-br from-red-500/20 to-rose-500/20 border border-red-500/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                            <FiX className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Unsubscribed</p>
                            <p className="text-2xl font-bold text-white">{subscriptions.length - activeCount}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Search & Select */}
            <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="relative flex-1 max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by email..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                    />
                </div>
                <button
                    onClick={handleSelectAll}
                    className={`px-6 py-3 rounded-xl border transition-colors ${
                        selectedEmails.length === filteredSubscriptions.length && filteredSubscriptions.length > 0
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                            : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                >
                    {selectedEmails.length === filteredSubscriptions.length && filteredSubscriptions.length > 0 ? 'Deselect All' : 'Select All'}
                </button>
            </motion.div>

            {/* Subscriptions Table */}
            <motion.div
                className="rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">
                                    <input
                                        type="checkbox"
                                        checked={selectedEmails.length === filteredSubscriptions.length && filteredSubscriptions.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-5 h-5 rounded border-white/20 bg-slate-700 text-orange-500 focus:ring-orange-500"
                                    />
                                </th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Email</th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                                <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                                <th className="text-right py-4 px-6 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td colSpan={5} className="py-4 px-6">
                                            <div className="h-8 bg-slate-700 rounded animate-pulse"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredSubscriptions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-gray-500">
                                        <FiMail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No subscriptions found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscriptions.map((sub, index) => (
                                    <motion.tr
                                        key={sub._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <input
                                                type="checkbox"
                                                checked={selectedEmails.includes(sub.email)}
                                                onChange={() => handleSelectEmail(sub.email)}
                                                className="w-5 h-5 rounded border-white/20 bg-slate-700 text-orange-500 focus:ring-orange-500"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm font-medium">
                                                    {sub.email.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-white">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => handleToggleActive(sub._id, sub.isActive)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                                    sub.isActive 
                                                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                                                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                }`}
                                            >
                                                {sub.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="py-4 px-6 text-gray-400">
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => { setDeleteId(sub._id); setShowDeleteModal(true); }}
                                                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-2xl bg-slate-800 border border-white/10 p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Delete Subscription</h2>
                            <p className="text-gray-400 mb-6">Are you sure you want to delete this subscription? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteId && handleDelete(deleteId)}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
