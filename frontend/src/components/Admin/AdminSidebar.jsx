import React from 'react';
import { FaBoxOpen, FaClipboard, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';
import { logout } from '../../redux/slices/authSlice';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="p-6 w-64 text-white min-h-screen">
      <div className="mb-6">
      <Link to="/" className="inline-block text-2xl italic font-serif text-white-800 hover:scale-105 transition-transform duration-300 relative">
                    <span className="font-bold tracking-wide">VINTAGE</span>
                    <span className="absolute -bottom-3 right-0 text-[8px] font-serif tracking-widest opacity-70">EST. 2004</span>
                </Link>
      </div>
      <h2 className="text-xl font-semibold mb-6 text-center">Administrator</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center space-x-2"
              : "text-gray-300 font-semibold hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2"
          }
        >
          <FaUser />
          <span className="rounded-md">Home</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center space-x-2"
              : "text-gray-300 font-semibold hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2"
          }
        >
          <FaUser />
          <span className="rounded-md">Manage Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center space-x-2"
              : "text-gray-300 font-semibold hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span className="rounded-md">Manage Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center space-x-2"
              : "text-gray-300 font-semibold hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2"
          }
        >
          <FaClipboard />
          <span className="rounded-md">Manage Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center space-x-2"
              : "text-gray-300 font-semibold hover:bg-gray-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2"
          }
        >
          <FaStore />
          <span className="rounded-md">Store Settings</span>
        </NavLink>
      </nav>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
