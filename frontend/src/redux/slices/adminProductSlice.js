import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Helper function to get token (ensures fresh token each time)
const getToken = () => `Bearer ${localStorage.getItem('userToken')}`;

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/products`,
        {
          headers: {
            Authorization: getToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to fetch products"
      );
    }
  }
);

// Async function to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products`, // Fixed API endpoint
        productData,
        {
          headers: {
            Authorization: getToken(),
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to create product"
      );
    }
  }
);

// Async function to update a product
export const updateProduct = createAsyncThunk(
  "adminProduct/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: getToken(),
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to update product"
      );
    }
  }
);

// Async function to delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: getToken(),
          }
        }
      );
      return id;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to delete product"
      );
    }
  }
);

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;