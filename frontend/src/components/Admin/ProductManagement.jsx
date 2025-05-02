import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, fetchAdminProducts, createProduct } from '../../redux/slices/adminProductSlice';
import Loading from '../Common/Loading';
import { toast } from 'sonner';
import axios from 'axios';
import { FiXCircle } from 'react-icons/fi'; // Import delete icon

const ProductManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading } = useSelector((state) => state.adminProducts);
    
    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);
    
    // Delete product
    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            try {
                dispatch(deleteProduct(id));
                toast.success('Product deleted successfully.');
            } catch (error) {
                toast.error(error.message || "Failed to delete product.");
            }
        }
    }

    // Form display state
    const [isShowForm, setIsShowForm] = useState(false);
    
    const handleToggleForm = () => {
        setIsShowForm(!isShowForm);
    };
    
    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isPublished: true,
        tags: [],
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        weight: 0
    });
    
    const [uploading, setUploading] = useState(false);
    
    // Handle form data changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        // Handle dimensions fields
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: Number(value)
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    // Handle array fields (sizes, colors, tags)
    const handleArrayChange = (e, field) => {
        const value = e.target.value.split(',').map(item => item.trim());
        setFormData({ ...formData, [field]: value });
    };
    
    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };
    
    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Validate data
        const requiredFields = ['name', 'price', 'countInStock', 'sku', 'category'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }
        
        if (formData.countInStock < 0) {
            toast.error("Invalid stock quantity!");
            return;
        }
        
        if (formData.price < 0) {
            toast.error("Invalid price!");
            return;
        }
        
        if (formData.images.length === 0) {
            toast.error("Please add at least one product image!");
            return;
        }
        
        if (uploading) {
            return toast.error("Image is still uploading, please wait!");
        }
        
        // Convert numeric fields to Number type
        const productData = {
            ...formData,
            price: Number(formData.price),
            discountPrice: Number(formData.discountPrice),
            countInStock: Number(formData.countInStock),
            weight: Number(formData.weight),
            dimensions: {
                length: Number(formData.dimensions.length),
                width: Number(formData.dimensions.width),
                height: Number(formData.dimensions.height)
            }
        };
        
        console.log("Sending data:", productData);
        
        try {
            await dispatch(createProduct(productData));
            toast.success("Product created successfully!");
            setIsShowForm(false);
            
            // Reset form after successful creation
            setFormData({
                name: "",
                description: "",
                price: 0,
                discountPrice: 0,
                countInStock: 0,
                sku: "",
                category: "",
                brand: "",
                sizes: [],
                colors: [],
                collections: "",
                material: "",
                gender: "",
                images: [],
                rating: 0,
                numReviews: 0,
                isFeatured: false,
                isPublished: true,
                tags: [],
                dimensions: {
                    length: 0,
                    width: 0,
                    height: 0
                },
                weight: 0
            });
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product: " + (error.message || "An error occurred"));
        }
    };
    
    // Handle image upload
    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            const imagesData = new FormData();
            imagesData.append("image", file);
            setUploading(true);
            
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                imagesData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            
            setFormData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }],
            }));
            
            setUploading(false);
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error("Failed to upload image!");
        }
    };
    
    // Handle image removal
    // const handleRemoveImage = (index) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         images: prevData.images.filter((_, i) => i !== index),
    //     }));
    // };
    
    if (loading) {
        return <Loading />;
    }
    
    // Product categories list
    const categories = [
        "Shirts", "Pants", "Shoes", "Accessories", "Sportswear", "Sleepwear", "Bags", "Other"
    ];
    
    // Gender options list
    const genders = ["Men", "Women", "Unisex"];
    
    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold mb-6">Products Management</h2>
                <button 
                    onClick={handleToggleForm}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {isShowForm ? "Close Form" : "Add New Product"}
                </button>
            </div>
            
            {isShowForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code *</label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter SKU code"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter price"
                                        min="0"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
                                    <input
                                        type="number"
                                        name="discountPrice"
                                        value={formData.discountPrice}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter discount price"
                                        min="0"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                                    <input
                                        type="number"
                                        name="countInStock"
                                        value={formData.countInStock}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter stock quantity"
                                        min="0"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">-- Select Category --</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter brand name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags.join(', ')}
                                        onChange={(e) => handleArrayChange(e, 'tags')}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Example: fashion, men, winter"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter product weight"
                                        step="0.1"
                                        min="0"
                                    />
                                </div>
                            </div>
                            
                            {/* Detailed Information */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        rows="4"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter product description"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.sizes.join(', ')}
                                        onChange={(e) => handleArrayChange(e, 'sizes')}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Example: S, M, L, XL"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={formData.colors.join(', ')}
                                        onChange={(e) => handleArrayChange(e, 'colors')}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Example: Red, Blue, Black"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Collection</label>
                                    <input
                                        type="text"
                                        name="collections"
                                        value={formData.collections}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter collection name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={formData.material}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter material"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">-- Select Gender --</option>
                                        {genders.map((gender, index) => (
                                            <option key={index} value={gender}>
                                                {gender}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Length (cm)</label>
                                        <input
                                            type="number"
                                            name="dimensions.length"
                                            value={formData.dimensions.length}
                                            onChange={handleFormChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
                                        <input
                                            type="number"
                                            name="dimensions.width"
                                            value={formData.dimensions.width}
                                            onChange={handleFormChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                        <input
                                            type="number"
                                            name="dimensions.height"
                                            value={formData.dimensions.height}
                                            onChange={handleFormChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            min="0"
                                            step="0.1"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isFeatured"
                                            name="isFeatured"
                                            checked={formData.isFeatured}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                                            Featured Product
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isPublished"
                                            name="isPublished"
                                            checked={formData.isPublished}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                                            Published
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Image Upload Section */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>
                            
                            <div className="mb-2">
                                <input 
                                    type="file" 
                                    onChange={handleImageUpload} 
                                    className="text-sm text-gray-700"
                                    accept="image/*"
                                />
                            </div>
                            
                            {uploading && (
                                <p className="text-sm text-blue-600 flex items-center my-2">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading image...
                                </p>
                            )}
                            
                            <div className="flex flex-wrap gap-4 mt-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img 
                                            src={image.url} 
                                            alt={image.altText || 'Product'} 
                                            className="w-20 h-20 object-cover rounded-md shadow-md" 
                                        />
                                        {/* Image delete button */}
                                        <button
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                images: formData.images.filter((_, i) => i !== index)
                                            })}
                                            className="text-white absolute top-0 right-0 p-1 bg-red-500 rounded-full cursor-pointer"
                                        >
                                            <FiXCircle />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={uploading}
                                className={`flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                Create Product
                            </button>
                            <button
                                type="button"
                                onClick={handleToggleForm}
                                className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>ID</th>
                            <th className='py-3 px-4'>Image</th>
                            <th className='py-3 px-4'>Product Name</th>
                            <th className='py-3 px-4'>Price</th>
                            <th className='py-3 px-4'>SKU</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ?
                            products.map((product) => (
                                <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td 
                                        onClick={() => {navigate(`/product/${product._id}`);}}
                                        className="px-4 py-3 cursor-pointer text-blue-600 underline"
                                    >
                                        {product._id.substring(0, 3)}...
                                        {product._id.substring(product._id.length - 4)}
                                    </td>
                                    <td className='p-4'>
                                        {product.images && product.images.length > 0 ? (
                                            <img 
                                                src={product.images[0].url} 
                                                alt={product.name} 
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                                                <span className="text-gray-400 text-xs">No image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{product.name}</td> 
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{product.price}</td> 
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{product.sku}</td> 
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                        <Link 
                                            to={`/admin/products/${product._id}/edit`} 
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                                        >
                                            Delete
                                        </button>
                                    </td> 
                                </tr>
                            ))
                            :
                            (<tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement