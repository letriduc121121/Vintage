// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchProductDetails } from '../../redux/slices/productsSlice';
// import axios from 'axios';
// import { updateProduct } from '../../redux/slices/adminProductSlice';
// import Loading from '../Common/Loading';

// const EditProductPage = () => {
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const {id}=useParams();
//     const {selectedProduct,loading,error}=useSelector((state)=>state.products);
//     const [productData,setProductData] =useState({
//         name: '',
//         description: '',
//         price: 0,
//         countInStock: 0,
//         sku:"",
//         category:"",
//         brand:"",
//         sizes:[],
//         colors:[],
//         collections:"",
//         material:"",
//         gender:"",
//         images:[],
//       });
    
//     useEffect(()=>{
//         if(id){
//             dispatch(fetchProductDetails(id));
//         }
//     },[dispatch,id]);

//     useEffect(()=>{
//         if(selectedProduct){
//             setProductData(selectedProduct)
//         }
//     },[selectedProduct])
//     const handleChange=(e)=>{
//         const {name,value}  = e.target;
//         setProductData((prevData)=>({...prevData,[name]:value}));
//     }


//     const [uploading,setUploading]=useState(false);
//     const handleImageUpLoad=async(e)=>{
//         const file=e.target.files[0];
//         console.log(file);
//         const formData=new FormData();
//         formData.append("image",file);
//         try{
//             setUploading(true);
//             const {data}=await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
//                 formData,
//                 {
//                     headers:{"Content-Type":"multipart/form-data"},
//                 }
//             );
//             setProductData((prevData)=>({
//                 ...prevData,
//                 images: [...prevData.images,{url:data.imageUrl,altText:""}],

//             }));
//             setUploading(false);
//         }
//         catch(error){
//             console.error(error);
//             setUploading(false);
//         }
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         console.log(productData);
//         dispatch(updateProduct({id,productData}));
//         navigate("/admin/products");

//     }
//     if(loading){
//         return <Loading/>
//     }
//     if(error){
//         return <p>Error: {error}...</p>
//     }
//   return (
//     <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
//         <h2 className='text-3xl  font-bold mb-6'>Edit Product</h2>
//         <form onSubmit={handleSubmit}>
//             {/* name */}
//             <div className='mb-6'>
//                 <label  className='block font-semibold mb-2'>Product Name</label>
//                 <input 
//                     type="text" 
//                     name='name' 
//                     value={productData.name} 
//                     onChange={handleChange}
//                     className='w-full border border-gray-300 rounded-md p-2'
//                     required
//                 />
//             </div>
//             {/* description */}
//             <div className='mb-6'>
//                 <label  className='block font-semibold mb-2'>Description </label>
//                 <textarea 
//                     name="description" 
//                     value={productData.description} 
//                     onChange={handleChange}
//                     className='w-full border border-gray-300 rounded-md p-2' id=""
//                     rows={4}
//                     required
//                 ></textarea>
//             </div>

//             {/* price */}
//             <div className="mb-6">
//                 <label htmlFor="" className='block font-semibold mb-2'>Price</label>
//                 <input 
//                     type="number" 
//                     name='price'  
//                     value={productData.price} 
//                     onChange={handleChange}
//                     className='w-full border border-gray-300 rounded-md p-2'
//                 />
//             </div>

//             {/* count in stock */}
//             <div className="mb-6">
//                 <label htmlFor="" className='block font-semibold mb-2'>Count in Stock</label>
//                 <input 
//                     type="number" 
//                     name='countInStock'  
//                     value={productData.countInStock} 
//                     onChange={handleChange}
//                     className='w-full border border-gray-300 rounded-md p-2'
//                 />
//             </div>

//             {/* SKU */}
//             <div className="mb-6">
//                 <label htmlFor="" className='block font-semibold mb-2'>SKU</label>
//                 <input 
//                     type="text" 
//                     name='sku'  
//                     value={productData.sku} 
//                     onChange={handleChange}
//                     className='w-full border border-gray-300 rounded-md p-2'
//                 />
//             </div>

//             {/* size */}
//             <div className="mb-6">
//                 <label htmlFor="" className='block font-semibold mb-2'>Sizes (comma-separated)</label>
//                 <input 
//                     type="text" 
//                     name='sizes'  
//                     value={productData.sizes.join(",")} 
//                     onChange={(e) => 
//                         setProductData({
//                             ...productData,
//                             sizes: e.target.value.split(",").map((size) => size.trim())
//                         })
//                     }
//                     className='w-full border border-gray-300 rounded-md p-2'
//                 />
//             </div>
//             {/* colorcolor */}
//             <div className="mb-6">
//                 <label htmlFor="" className='block font-semibold mb-2'>Colors (comma-separated)</label>
//                 <input 
//                     type="text" 
//                     name='colors'  
//                     value={productData.colors.join(",")} 
//                     onChange={(e) => 
//                         setProductData({
//                             ...productData,
//                             colors: e.target.value.split(",").map((color) => color.trim())
//                         })
//                     }
//                     className='w-full border border-gray-300 rounded-md p-2'
//                 />
//             </div>
//             {/* image upload */}
//             <div className='mb-6'>
//                 <label htmlFor="" className='block font-semibold mb-2'>Upload Image</label>
//                 <input type="file" onChange={handleImageUpLoad } />
//                 {uploading && <p>Uploading image....</p>}
//                 <div className='flex gap-4 mt-4'>
//                     {productData.images.map((image,index) =>(
//                         <div className="" key={index}>
//                             <img 
//                                 src={image.url} 
//                                 alt={image.altText||'Product Image'}
//                                 className='w-20 h-20 object-cover rounded-md shadow-md'
//                             />
                            
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <button  type="submit" className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 '
//             >
//                 Update Product
//             </button>
//         </form>

//     </div>
//   )
// }

// export default EditProductPage

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/slices/productsSlice';
import axios from 'axios';
import { updateProduct } from '../../redux/slices/adminProductSlice';
import Loading from '../Common/Loading';
import { FiXCircle } from 'react-icons/fi'; // Thêm import cho icon

const EditProductPage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();
    const {selectedProduct,loading,error}=useSelector((state)=>state.products);
    const [productData,setProductData] =useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        sku:"",
        category:"",
        brand:"",
        sizes:[],
        colors:[],
        collections:"",
        material:"",
        gender:"",
        images:[],
      });
    
    useEffect(()=>{
        if(id){
            dispatch(fetchProductDetails(id));
        }
    },[dispatch,id]);

    useEffect(()=>{
        if(selectedProduct){
            setProductData(selectedProduct)
        }
    },[selectedProduct])
    const handleChange=(e)=>{
        const {name,value}  = e.target;
        setProductData((prevData)=>({...prevData,[name]:value}));
    }


    const [uploading,setUploading]=useState(false);
    const handleImageUpLoad=async(e)=>{
        const file=e.target.files[0];
        console.log(file);
        const formData=new FormData();
        formData.append("image",file);
        try{
            setUploading(true);
            const {data}=await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers:{"Content-Type":"multipart/form-data"},
                }
            );
            setProductData((prevData)=>({
                ...prevData,
                images: [...prevData.images,{url:data.imageUrl,altText:""}],

            }));
            setUploading(false);
        }
        catch(error){
            console.error(error);
            setUploading(false);
        }
    }


    // Hàm xử lý xóa ảnh
    // const handleDeleteImage = (indexToDelete) => {
    //     setProductData((prevData) => ({
    //         ...prevData,
    //         images: prevData.images.filter((_, index) => index !== indexToDelete)
    //     }));
    // }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(productData);
        dispatch(updateProduct({id,productData}));
        navigate("/admin/products");

    }
    if(loading){
        return <Loading/>
    }
    if(error){
        return <p>Error: {error}...</p>
    }
  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
        <h2 className='text-2xl font-bold mb-6'>Edit Product</h2>
        <form onSubmit={handleSubmit}>
            {/* name */}
            <div className='mb-6'>
                <label  className='block font-semibold mb-2'>Product Name</label>
                <input 
                    type="text" 
                    name='name' 
                    value={productData.name} 
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md p-2'
                    required
                />
            </div>
            {/* description */}
            <div className='mb-6'>
                <label  className='block font-semibold mb-2'>Description </label>
                <textarea 
                    name="description" 
                    value={productData.description} 
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md p-2' id=""
                    rows={4}
                    required
                ></textarea>
            </div>

            {/* price */}
            <div className="mb-6">
                <label htmlFor="" className='block font-semibold mb-2'>Price</label>
                <input 
                    type="number" 
                    name='price'  
                    value={productData.price} 
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>

            {/* count in stock */}
            <div className="mb-6">
                <label htmlFor="" className='block font-semibold mb-2'>Count in Stock</label>
                <input 
                    type="number" 
                    name='countInStock'  
                    value={productData.countInStock} 
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>

            {/* SKU */}
            <div className="mb-6">
                <label htmlFor="" className='block font-semibold mb-2'>SKU</label>
                <input 
                    type="text" 
                    name='sku'  
                    value={productData.sku} 
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>

            {/* size */}
            <div className="mb-6">
                <label htmlFor="" className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                <input 
                    type="text" 
                    name='sizes'  
                    value={productData.sizes.join(",")} 
                    onChange={(e) => 
                        setProductData({
                            ...productData,
                            sizes: e.target.value.split(",").map((size) => size.trim())
                        })
                    }
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>
            {/* colorcolor */}
            <div className="mb-6">
                <label htmlFor="" className='block font-semibold mb-2'>Colors (comma-separated)</label>
                <input 
                    type="text" 
                    name='colors'  
                    value={productData.colors.join(",")} 
                    onChange={(e) => 
                        setProductData({
                            ...productData,
                            colors: e.target.value.split(",").map((color) => color.trim())
                        })
                    }
                    className='w-full border border-gray-300 rounded-md p-2'
                />
            </div>
            {/* image upload */}
            <div className='mb-6'>
                <label htmlFor="" className='block font-semibold mb-2'>Upload Image</label>
                <input type="file" onChange={handleImageUpLoad } />
                {uploading && <p>Uploading image....</p>}
                <div className='flex flex-wrap gap-4 mt-4'>
                    {productData.images.map((image,index) =>(
                        <div className="relative" key={index}>
                            <img 
                                src={image.url} 
                                alt={image.altText||'Product Image'}
                                className='w-20 h-20 object-cover rounded-md shadow-md'
                            />
                            {/* Nút xóa ảnh */}
                            <button
                                type="button"
                                onClick={() =>
                                  setProductData({
                                    ...productData,
                                    images: productData.images.filter((_, i) => i !== index),
                                  })
                                }
                                className="text-white absolute top-0 right-0 p-1 bg-red-500 rounded-full cursor-pointer"
                            >
                                <FiXCircle />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-4">
                <button type="submit" className='flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600'>
                    Update Product
                </button>
                <button 
                    type="button" 
                    onClick={() => navigate('/admin/products')} 
                    className='flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500'
                >
                    Hủy
                </button>
            </div>
        </form>

    </div>
  )
}

export default EditProductPage