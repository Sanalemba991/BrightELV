'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiBox, FiImage, FiSearch, FiEye, FiEyeOff, FiFileText, FiDownload } from 'react-icons/fi';

interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    keyFeatures: string[];
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    pdfUrl?: string;
    category: { _id: string; name: string };
    subcategory?: { _id: string; name: string };
    createdAt: string;
}

interface Category { _id: string; name: string; }
interface SubCategory { _id: string; name: string; category: string; }

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [formData, setFormData] = useState({
        name: '', description: '', keyFeaturesText: '',
        category: '', subcategory: '',
        seoTitle: '', seoDescription: '', seoKeywords: ''
    });
    const [images, setImages] = useState<{ [key: string]: File | null }>({
        image1: null, image2: null, image3: null, image4: null
    });
    const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({
        image1: '', image2: '', image3: '', image4: ''
    });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfPreview, setPdfPreview] = useState<string>('');

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [catRes, subRes] = await Promise.all([
                fetch('/api/categories'),
                fetch('/api/subcategories')
            ]);
            if (catRes.ok) setCategories(await catRes.json());
            if (subRes.ok) setSubcategories(await subRes.json());
        } catch (error) {
            console.error('Failed to fetch dropdown data');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchDropdownData();
    }, []);

    useEffect(() => {
        if (formData.category) {
            setFilteredSubcategories(subcategories.filter(s => s.category === formData.category));
        } else {
            setFilteredSubcategories([]);
        }
    }, [formData.category, subcategories]);

    const handleImageChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImages(prev => ({ ...prev, [field]: file }));
            setImagePreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Parse key features from text (each line is a feature)
            const keyFeatures = formData.keyFeaturesText
                .split('\n')
                .map(f => f.trim())
                .filter(f => f.length > 0);

            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('description', formData.description);
            submitData.append('keyFeatures', JSON.stringify(keyFeatures));
            submitData.append('category', formData.category);
            if (formData.subcategory) submitData.append('subcategory', formData.subcategory);
            submitData.append('seoTitle', formData.seoTitle);
            submitData.append('seoDescription', formData.seoDescription);
            submitData.append('seoKeywords', formData.seoKeywords);
            
            Object.entries(images).forEach(([key, file]) => {
                if (file) submitData.append(key, file);
            });

            // Append PDF if present
            if (pdfFile) {
                submitData.append('pdf', pdfFile);
            }

            const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
            const method = editingProduct ? 'PUT' : 'POST';
            
            const response = await fetch(url, { method, body: submitData });

            if (response.ok) {
                const action = editingProduct ? 'Product updated' : 'Product created';
                const pdfMsg = pdfFile ? ' with PDF' : '';
                toast.success(`${action}${pdfMsg} successfully!`);
                closeModal();
                fetchProducts();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to save product');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            keyFeaturesText: product.keyFeatures.join('\n'),
            category: product.category._id,
            subcategory: product.subcategory?._id || '',
            seoTitle: '', seoDescription: '', seoKeywords: ''
        });
        setImagePreviews({
            image1: product.image1 || '',
            image2: product.image2 || '',
            image3: product.image3 || '',
            image4: product.image4 || ''
        });
        setPdfPreview(product.pdfUrl || '');
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (response.ok) {
                toast.success('Product deleted!');
                fetchProducts();
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            name: '', description: '', keyFeaturesText: '',
            category: '', subcategory: '',
            seoTitle: '', seoDescription: '', seoKeywords: ''
        });
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setImagePreviews({ image1: '', image2: '', image3: '', image4: '' });
        setPdfFile(null);
        setPdfPreview('');
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen py-8">
            {/* Header */}
            <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
                    <p className="text-gray-400">Manage your products ({products.length} total)</p>
                </div>
                <motion.button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiPlus className="w-5 h-5" />
                    Add Product
                </motion.button>
            </motion.div>

            {/* Search */}
            <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                </div>
            </motion.div>

            {/* Products Table */}
            <motion.div 
                className="rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-16 text-center">
                        <FiBox className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <p className="text-lg font-medium text-gray-400 mb-2">No products found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-700/50 border-b border-white/10">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 w-20">Image</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 min-w-[200px]">Product Name</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 w-40">Category</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 w-40">SubCategory</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300 w-24">Features</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 w-28">Created</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300 w-28">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProducts.map((product, index) => (
                                    <motion.tr
                                        key={product._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-700/50 overflow-hidden flex-shrink-0">
                                                {product.image1 ? (
                                                    <img src={product.image1} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FiImage className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-[280px]">
                                                <p className="font-medium text-white truncate">{product.name}</p>
                                                <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 whitespace-nowrap">
                                                {product.category?.name || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.subcategory ? (
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 whitespace-nowrap">
                                                    {product.subcategory.name}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex px-2 py-1 rounded-lg text-xs font-medium bg-slate-600/50 text-gray-300">
                                                {product.keyFeatures?.length || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                                            {new Date(product.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl rounded-2xl bg-slate-800 border border-white/10 p-6 my-8 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-800 py-2">
                                <h2 className="text-xl font-bold text-white">
                                    {editingProduct ? 'Edit Product' : 'Create Product'}
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Category Dropdowns */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                                            required
                                        >
                                            <option value="">Select</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">SubCategory</label>
                                        <select
                                            value={formData.subcategory}
                                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50"
                                            disabled={!formData.category}
                                        >
                                            <option value="">Select (Optional)</option>
                                            {filteredSubcategories.map((sub) => (
                                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                                        placeholder="Product name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                                        placeholder="Product description"
                                        rows={4}
                                        required
                                    />
                                </div>

                                {/* Key Features */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Key Features
                                        <span className="text-gray-500 font-normal ml-2">(Each line becomes a feature)</span>
                                    </label>
                                    <textarea
                                        value={formData.keyFeaturesText}
                                        onChange={(e) => setFormData({ ...formData, keyFeaturesText: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none font-mono text-sm"
                                        placeholder="Enter key features (one per line)&#10;Example:&#10;High resolution display&#10;Energy efficient&#10;5 year warranty"
                                        rows={6}
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Tip: Copy and paste your features list. Each new line will be a separate feature.
                                    </p>
                                </div>

                                {/* Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Images</label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {['image1', 'image2', 'image3', 'image4'].map((field) => (
                                            <div key={field} className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(field, e)}
                                                    className="hidden"
                                                    id={field}
                                                />
                                                <label
                                                    htmlFor={field}
                                                    className="block h-24 rounded-xl border-2 border-dashed border-white/20 hover:border-cyan-500/50 cursor-pointer overflow-hidden transition-colors"
                                                >
                                                    {imagePreviews[field] ? (
                                                        <img src={imagePreviews[field]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                                                            <FiImage className="w-6 h-6" />
                                                            <span className="text-xs mt-1">{field === 'image1' ? 'Main*' : 'Optional'}</span>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* PDF Upload (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Product PDF
                                        <span className="text-gray-500 font-normal ml-2">(Optional - Brochure/Documentation)</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setPdfFile(file);
                                                    setPdfPreview(file.name);
                                                    toast.success('PDF added successfully');
                                                }
                                            }}
                                            className="hidden"
                                            id="pdfFile"
                                        />
                                        <label
                                            htmlFor="pdfFile"
                                            className="flex-1 h-16 rounded-xl border-2 border-dashed border-white/20 hover:border-cyan-500/50 cursor-pointer flex items-center justify-center gap-3 transition-colors"
                                        >
                                            {pdfPreview ? (
                                                <div className="flex items-center gap-2 text-cyan-400">
                                                    <FiFileText className="w-5 h-5" />
                                                    <span className="text-sm truncate max-w-[200px]">{pdfPreview}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <FiFileText className="w-5 h-5" />
                                                    <span className="text-sm">Click to upload PDF</span>
                                                </div>
                                            )}
                                        </label>
                                        {pdfPreview && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPdfFile(null);
                                                    setPdfPreview('');
                                                }}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                title="Remove PDF"
                                            >
                                                <FiX className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
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
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-medium"
                                    >
                                        <FiSave className="w-5 h-5" />
                                        {editingProduct ? 'Update' : 'Create'}
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
