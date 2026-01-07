'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiGrid, FiImage, FiSearch, FiFilter, FiEye, FiEyeOff } from 'react-icons/fi';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    displayType: 'subcategories' | 'products';
    isActive: boolean;
    createdAt: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        displayType: 'subcategories' as 'subcategories' | 'products',
        isActive: true
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            category.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || 
                            (filterStatus === 'active' && category.isActive) ||
                            (filterStatus === 'inactive' && !category.isActive);
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
            submitData.append('displayType', formData.displayType);
            submitData.append('isActive', String(formData.isActive));
            if (imageFile) {
                submitData.append('image', imageFile);
            }

            const url = editingCategory 
                ? `/api/categories/${editingCategory._id}` 
                : '/api/categories';
            const method = editingCategory ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                body: submitData,
            });

            if (response.ok) {
                toast.success(editingCategory ? 'Category updated!' : 'Category created!');
                closeModal();
                fetchCategories();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to save category');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || '',
            displayType: category.displayType || 'subcategories',
            isActive: category.isActive
        });
        setImagePreview(category.image || '');
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Category deleted!');
                fetchCategories();
            } else {
                toast.error('Failed to delete category');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '', displayType: 'subcategories', isActive: true });
        setImageFile(null);
        setImagePreview('');
    };

    const openCreateModal = () => {
        closeModal();
        setShowModal(true);
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
                    <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
                    <p className="text-gray-400">Manage your product categories</p>
                </div>
                <motion.button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiPlus className="w-5 h-5" />
                    Add Category
                </motion.button>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div 
                className="mb-6 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search categories by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FiFilter className="text-gray-400 w-5 h-5" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                        className="px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </motion.div>

            {/* Results Count */}
            <div className="mb-4 text-gray-400 text-sm">
                Showing {filteredCategories.length} of {categories.length} categories
            </div>

            {/* Categories Table */}
            <motion.div 
                className="rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading categories...</p>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="p-16 text-center">
                        <FiGrid className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <p className="text-lg font-medium text-gray-400 mb-2">
                            {searchTerm || filterStatus !== 'all' ? 'No categories match your filters' : 'No categories yet'}
                        </p>
                        {(searchTerm || filterStatus !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
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
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Display Type</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Created</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredCategories.map((category, index) => (
                                    <motion.tr
                                        key={category._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-700/50 overflow-hidden">
                                                {category.image ? (
                                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FiImage className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{category.name}</p>
                                                {category.description && (
                                                    <p className="text-sm text-gray-400 line-clamp-1 max-w-xs">{category.description}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="px-2 py-1 rounded bg-slate-700 text-gray-300 text-sm">/{category.slug}</code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                category.displayType === 'products' 
                                                    ? 'bg-blue-500/20 text-blue-400' 
                                                    : 'bg-purple-500/20 text-purple-400'
                                            }`}>
                                                {category.displayType === 'products' ? '📦 Products' : '📁 SubCategories'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                                category.isActive 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {category.isActive ? (
                                                    <><FiEye className="w-3 h-3" /> Active</>
                                                ) : (
                                                    <><FiEyeOff className="w-3 h-3" /> Inactive</>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(category.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
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
                                    {editingCategory ? 'Edit Category' : 'Create Category'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                                        placeholder="Category name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none"
                                        placeholder="Category description"
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category Page Display</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, displayType: 'subcategories' })}
                                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                formData.displayType === 'subcategories'
                                                    ? 'border-orange-500 bg-orange-500/10'
                                                    : 'border-white/10 hover:border-white/30'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                    formData.displayType === 'subcategories' ? 'border-orange-500' : 'border-gray-500'
                                                }`}>
                                                    {formData.displayType === 'subcategories' && (
                                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                                    )}
                                                </div>
                                                <span className="text-white font-medium">Show SubCategories</span>
                                            </div>
                                            <p className="text-gray-400 text-sm pl-8">Category page will list all subcategories first</p>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, displayType: 'products' })}
                                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                formData.displayType === 'products'
                                                    ? 'border-orange-500 bg-orange-500/10'
                                                    : 'border-white/10 hover:border-white/30'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                    formData.displayType === 'products' ? 'border-orange-500' : 'border-gray-500'
                                                }`}>
                                                    {formData.displayType === 'products' && (
                                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                                    )}
                                                </div>
                                                <span className="text-white font-medium">Show Products</span>
                                            </div>
                                            <p className="text-gray-400 text-sm pl-8">Category page will directly show products</p>
                                        </button>
                                    </div>
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
                                        {editingCategory ? 'Update' : 'Create'}
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
