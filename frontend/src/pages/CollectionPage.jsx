//GIAO DIEN  DS SAN PHAM
import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FilterSidebar from '../components/Product/FilterSidebar';
import SortOption from '../components/Product/SortOption';
import ProductGrid from '../components/Product/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProductsByFilters} from "../redux/slices/productsSlice"
const CollectionPage = () => {
    const  {collection}=useParams();
    const [searchParams]=useSearchParams();
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products);
    const queryParams=Object.fromEntries([...searchParams]);
    useEffect(()=>{
        dispatch(fetchProductsByFilters({collection, ...queryParams}));
    },[dispatch,collection,searchParams]);
    // const [products,setProducts]=useState([]);
    const sidebarRef=useRef(null);
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);
    const toggleSidebar=()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }
    const handleClickOutside=(e)=>{
        if(sidebarRef.current &&!sidebarRef.current.contains(e.target)){
            setIsSidebarOpen(false);
        }
    }
    useEffect(()=>{
        //add event listner for click
       document.addEventListener("mousedown",handleClickOutside);
       //clean event listene
       return()=>{
         document.removeEventListener("mousedown", handleClickOutside);
       }
    },[]);
    // useEffect(() => {  // Fixed syntax by removing extra curly brace
    //     setTimeout(() => {
    //         const fetchedProducts = [
    //             {
    //                 _id: 5,
    //                 name: "Product 1",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=5"}],
    //             },
    //             {
    //                 _id: 6,
    //                 name: "Product 2",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=6"}],
    //             },
    //             {
    //                 _id: 7,
    //                 name: "Product 3",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=7"}],
    //             },
    //             {
    //                 _id: 9,
    //                 name: "Product 4",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=8"}],
    //             },
    //             {
    //                 _id: 1,
    //                 name: "Product 1",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=9"}],
    //             },
    //             {
    //                 _id: 2,
    //                 name: "Product 2",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=1"}],
    //             },
    //             {
    //                 _id: 3,
    //                 name: "Product 3",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=2"}],
    //             },
    //             {
    //                 _id: 4,
    //                 name: "Product 4",
    //                 price: 100,
    //                 images: [{url: "https://picsum.photos/500/500?random=5"}],
    //             },
    //         ];
    //         setProducts(fetchedProducts);        
    //     }, 1000)
    // }, []);  // Fixed closing bracket
    
    return (
    <div className='flex flex-col lg:flex-row'>
        {/* Nút lọc cho thiết bị di động */}
        <button
                onClick={toggleSidebar}
                className="lg:hidden border p-2 flex justify-center items-center"
            >
                <FaFilter className="mr-2" /> Filter
            </button>

            {/* Thanh bên bộ lọc */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>
            <div className='flex-grow p-4'>
            <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">ALL COLLECTION</h2>


                {/* sort option */}
                <SortOption/>
                {/* product grid */}
                <ProductGrid products={products} loading={loading} error={error}/>

            </div>
    
    </div>
  )
}

export default CollectionPage