import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SearchBar = function () {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSearchToggle = function () {
    setIsOpen(!isOpen);
  };
  const handleSearch = function (e) {
    e.preventDefault();
    // TODO: Implement search functionality using the searchTerm
    dispatch(setFilters({search: searchTerm}));
    dispatch(fetchProductsByFilters({search:searchTerm}));
    console.log(`Searching for: ${searchTerm}`);
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full ">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* search icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          {/* close button */}
          <button
            type="submit"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text=gray-600"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
// import { useState } from "react";
// import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

// const SearchBar=function(){
// const [searchTerm,setSearchTerm]=useState("");
// const [isOpen,setIsOpen]=useState(false);

// const handleSearchToggle=function(){
//     setIsOpen(!isOpen);
// };

//     return (
    
//     <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?
//         "absolute top-0 left-0 w-full bg-white h-24 z-50" :"w-auto"}`}>
//         {isOpen ? 
//         (<from  className="relative flex items-center justify-center w-full ">
//             <div className="relative w-1/2">
//                 <input  type="text"
//                         placeholder="Search"
//                         value={searchTerm} 
//                         className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full
//                         placeholder:text-gray-700"
//                         />
//                         {/* search icon */}
//                         <button type="submit" 
//                                 className="absolute right-2 top-1/2 transform -translate-y-1/2
//                          text-gray-600 hover:text-gray-800"> 
//                             <HiMagnifyingGlass className="h-6 w-6 text-gray-600"/>
//                         </button>
                       

//             </div>
//              {/* close button */}
//              <button type= "submit" 
//                     onClick={handleSearchToggle}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text=gray-600">
//                 <HiMiniXMark className="h-6 w-6"/>
//              </button>
//         </from>)
//         :
//         (
//             <button onClick={handleSearchToggle}>
//                 <HiMagnifyingGlass className="h-6 w-6"/>
//             </button>
//         )}
//     </div>
//     );
// }
// export default SearchBar;


// // import { useState } from "react";
// // import { HiMagnifyingGlass } from "react-icons/hi2";

// // const SearchBar=function(){
// // // const [searchTerm,setSearchTerm]=useState("");
// // const [isOpen,setIsOpen]=useState(false);

// // const handleSearchToggle=()=>{
// //     setIsOpen(!isOpen);
// // };
// //     return (
    
// //     <div >
// //         {isOpen ? 
// //         (<from className="relative flex items-center justify-center w-full ">

// //         </from>)
// //         :
// //         (
// //             <button onClick={handleSearchToggle}>
// //                 <HiMagnifyingGlass className="h-6 w-6"/>
// //             </button>
// //         )}
// //     </div>
// //     );
// // }
// // export default SearchBar;