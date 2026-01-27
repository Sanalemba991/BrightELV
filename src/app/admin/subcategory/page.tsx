'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiLayers, FiImage, FiSearch, FiFilter, FiEye, FiEyeOff } from 'react-icons/fi';

interface Category {
    _id: string;
    name: string;
    displayType?: 'subcategories' | 'products';
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    category: string;
    isActive: boolean;
    createdAt: string;
}

export default function SubCategoriesPage() {
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState<SubCategory | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        isActive: true,
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const fetchSubcategories = async () => {
        try {
            let url = '/api/subcategories';
            if (selectedCategory) {
                url += `?category=${selectedCategory}`;
            }
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setSubcategories(data);
            }
        } catch (error) {
            toast.error('Failed to fetch subcategories');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchSubcategories();
    }, [selectedCategory]);

    const filteredSubcategories = subcategories.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sub.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || 
                            (filterStatus === 'active' && sub.isActive) ||
                            (filterStatus === 'inactive' && !sub.isActive);
        return matchesSearch && matchesStatus;
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('description', formData.description);
            submitData.append('category', formData.category);
            submitData.append('isActive', String(formData.isActive));
            submitData.append('seoTitle', formData.seoTitle);
            submitData.append('seoDescription', formData.seoDescription);
            submitData.append('seoKeywords', formData.seoKeywords);
            if (imageFile) {
                submitData.append('image', imageFile);
            }

            const url = editingSubcategory 
                ? `/api/subcategories/${editingSubcategory._id}` 
                : '/api/subcategories';
            const method = editingSubcategory ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                body: submitData,
            });

            if (response.ok) {
                toast.success(editingSubcategory ? 'Subcategory updated!' : 'Subcategory created!');
                closeModal();
                fetchSubcategories();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to save subcategory');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const handleEdit = (subcategory: SubCategory) => {
        setEditingSubcategory(subcategory);
        setFormData({
            name: subcategory.name,
            description: subcategory.description || '',
            category: subcategory.category,
            isActive: subcategory.isActive,
            seoTitle: '',
            seoDescription: '',
            seoKeywords: ''
        });
        setImagePreview(subcategory.image || '');
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this subcategory?')) return;
        
        try {
            const response = await fetch(`/api/subcategories/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Subcategory deleted!');
                fetchSubcategories();
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to delete subcategory');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSubcategory(null);
        setFormData({ name: '', description: '', category: '', isActive: true, seoTitle: '', seoDescription: '', seoKeywords: '' });
        setImageFile(null);
        setImagePreview('');
    };

    return (
        <div className="min-h-screen py-8">
            {/* Header */}
            <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">SubCategories</h1>
                    <p className="text-gray-400">Manage your product subcategories</p>
                </div>
                <motion.button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiPlus className="w-5 h-5" />
                    Add SubCategory
                </motion.button>
            </motion.div>

            {/* Filter */}
            <motion.div 
                className="mb-6 flex flex-col md:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search subcategories by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-orange-500/50"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                        className="px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-orange-500/50"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </motion.div>

            {/* Results Count */}
            <div className="mb-4 text-gray-400 text-sm">
                Showing {filteredSubcategories.length} of {subcategories.length} subcategories
            </div>

            {/* SubCategories Table */}
            <motion.div 
                className="rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading subcategories...</p>
                    </div>
                ) : filteredSubcategories.length === 0 ? (
                    <div className="p-16 text-center">
                        <FiLayers className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <p className="text-lg font-medium text-gray-400 mb-2">
                            {searchTerm || selectedCategory || filterStatus !== 'all' ? 'No subcategories match your filters' : 'No subcategories yet'}
                        </p>
                        {(searchTerm || selectedCategory || filterStatus !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('');
                                    setFilterStatus('all');
                                }}
                                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-700/50 border-b border-white/10">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Image</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Name</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Slug</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Category</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Created</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredSubcategories.map((subcategory, index) => (
                                    <motion.tr
                                        key={subcategory._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-700/50 overflow-hidden">
                                                {subcategory.image ? (
                                                    <img src={subcategory.image} alt={subcategory.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FiImage className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{subcategory.name}</p>
                                                {subcategory.description && (
                                                    <p className="text-sm text-gray-400 line-clamp-1 max-w-xs">{subcategory.description}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="px-2 py-1 rounded bg-slate-700 text-gray-300 text-sm">/{subcategory.slug}</code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
                                                {categories.find(c => c._id === subcategory.category)?.name || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                                subcategory.isActive 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {subcategory.isActive ? (
                                                    <><FiEye className="w-3 h-3" /> Active</>
                                                ) : (
                                                    <><FiEyeOff className="w-3 h-3" /> Inactive</>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(subcategory.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(subcategory)}
                                                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(subcategory._id)}
                                                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg rounded-2xl bg-slate-800 border border-white/10 p-6 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">
                                    {editingSubcategory ? 'Edit SubCategory' : 'Create SubCategory'}
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white focus:outline-none focus:border-orange-500/50"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories
                                            .filter((cat) => cat.displayType !== 'products')
                                            .map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                                        placeholder="SubCategory name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none"
                                        placeholder="SubCategory description"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer"
                                    />
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-xl" />
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-white/10 bg-slate-700 text-orange-500 focus:ring-orange-500"
                                    />
                                    <label htmlFor="isActive" className="text-gray-300">Active</label>
                                </div>
                                
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium"
                                    >
                                        <FiSave className="w-5 h-5" />
                                        {editingSubcategory ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
