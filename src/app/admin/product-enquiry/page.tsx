'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiMail, FiPhone, FiEye, FiTrash2, FiX, FiShoppingCart, FiCheck, FiClock, FiSearch, FiPackage } from 'react-icons/fi';

interface ProductEnquiry {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    productName: string;
    productId?: string;
    message: string;
    status: 'new' | 'contacted' | 'closed';
    createdAt: string;
}

export default function ProductEnquiryPage() {
    const [enquiries, setEnquiries] = useState<ProductEnquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState<ProductEnquiry | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEnquiries = async () => {
        try {
            let url = '/api/product-inquiries';
            if (filterStatus) url += `?status=${filterStatus}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setEnquiries(data);
            }
        } catch (error) {
            toast.error('Failed to fetch product enquiries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, [filterStatus]);

    const handleView = async (enquiry: ProductEnquiry) => {
        setSelectedEnquiry(enquiry);
        setShowModal(true);
        
        // Mark as contacted if new
        if (enquiry.status === 'new') {
            try {
                const response = await fetch(`/api/product-inquiries/${enquiry._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'contacted' })
                });
                if (response.ok) {
                    setEnquiries(prev => prev.map(e => 
                        e._id === enquiry._id ? { ...e, status: 'contacted' } : e
                    ));
                }
            } catch (error) {
                console.error('Failed to update status');
            }
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/product-inquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                toast.success('Status updated!');
                setEnquiries(prev => prev.map(e => 
                    e._id === id ? { ...e, status: status as ProductEnquiry['status'] } : e
                ));
                if (selectedEnquiry?._id === id) {
                    setSelectedEnquiry({ ...selectedEnquiry, status: status as ProductEnquiry['status'] });
                }
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this enquiry?')) return;
        
        try {
            const response = await fetch(`/api/product-inquiries/${id}`, { method: 'DELETE' });
            if (response.ok) {
                toast.success('Enquiry deleted!');
                setEnquiries(prev => prev.filter(e => e._id !== id));
                if (selectedEnquiry?._id === id) {
                    setShowModal(false);
                    setSelectedEnquiry(null);
                }
            }
        } catch (error) {
            toast.error('Failed to delete enquiry');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'closed': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <FiClock className="w-3 h-3" />;
            case 'contacted': return <FiPhone className="w-3 h-3" />;
            case 'closed': return <FiCheck className="w-3 h-3" />;
            default: return null;
        }
    };

    const filteredEnquiries = enquiries.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const newCount = enquiries.filter(e => e.status === 'new').length;

    return (
        <div className="min-h-screen py-8">
            {/* Header */}
            <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        Product Enquiries
                        {newCount > 0 && (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                                {newCount} new
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-400">Manage product inquiries from customers</p>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="relative flex-1 max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search enquiries..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-orange-500/50"
                >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                </select>
            </motion.div>

            {/* Enquiries List */}
            <div className="space-y-4">
                {loading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="rounded-2xl bg-slate-800/50 border border-white/10 p-6 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-5 bg-slate-700 rounded w-1/4 mb-2"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : filteredEnquiries.length === 0 ? (
                    <motion.div 
                        className="flex flex-col items-center justify-center py-16 text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <FiShoppingCart className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-lg">No product enquiries found</p>
                    </motion.div>
                ) : (
                    filteredEnquiries.map((enquiry, index) => (
                        <motion.div
                            key={enquiry._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group rounded-2xl bg-slate-800/50 backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
                                enquiry.status === 'new' 
                                    ? 'border-yellow-500/30 hover:border-yellow-500/50' 
                                    : 'border-white/10 hover:border-orange-500/30'
                            }`}
                            onClick={() => handleView(enquiry)}
                        >
                            <div className="p-6 flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                                    enquiry.status === 'new' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                    {enquiry.name.charAt(0).toUpperCase()}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-semibold text-white">{enquiry.name}</h3>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(enquiry.status)}`}>
                                            {getStatusIcon(enquiry.status)}
                                            {enquiry.status}
                                        </span>
                                    </div>
                                    <p className="text-orange-400 text-sm mb-2 flex items-center gap-1">
                                        <FiPackage className="w-4 h-4" />
                                        {enquiry.productName}
                                    </p>
                                    <p className="text-gray-500 text-sm line-clamp-1">{enquiry.message}</p>
                                    
                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <FiMail className="w-4 h-4" />
                                            {enquiry.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FiPhone className="w-4 h-4" />
                                            {enquiry.mobile}
                                        </span>
                                        <span>
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleView(enquiry); }}
                                        className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                                    >
                                        <FiEye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(enquiry._id); }}
                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* View Modal */}
            <AnimatePresence>
                {showModal && selectedEnquiry && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl rounded-2xl bg-slate-800 border border-white/10 p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Product Enquiry Details</h2>
                                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Sender Info */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30">
                                    <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl font-semibold text-orange-400">
                                        {selectedEnquiry.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{selectedEnquiry.name}</h3>
                                        <div className="flex items-center gap-3 text-gray-400 text-sm mt-1">
                                            <span className="flex items-center gap-1"><FiMail /> {selectedEnquiry.email}</span>
                                            <span className="flex items-center gap-1"><FiPhone /> {selectedEnquiry.mobile}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <h4 className="text-sm font-medium text-orange-400 mb-1">Product Interested</h4>
                                    <p className="text-lg font-semibold text-white flex items-center gap-2">
                                        <FiPackage className="w-5 h-5 text-orange-400" />
                                        {selectedEnquiry.productName}
                                    </p>
                                </div>

                                {/* Message */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">Message</h4>
                                    <p className="text-gray-300 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                                </div>

                                {/* Meta & Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="text-gray-500 text-sm">
                                        Received: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={selectedEnquiry.status}
                                            onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                                            className={`px-4 py-2 rounded-lg border text-sm font-medium ${getStatusColor(selectedEnquiry.status)}`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                        <a
                                            href={`mailto:${selectedEnquiry.email}?subject=Re: Enquiry for ${selectedEnquiry.productName}`}
                                            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors text-sm font-medium"
                                        >
                                            Reply via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
