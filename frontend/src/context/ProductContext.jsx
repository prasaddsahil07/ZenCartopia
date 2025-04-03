import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add initial data fetch
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/product/getAllProducts');
      setProducts(response.data.products);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
      toast.error(err.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Create a new product
  const createProduct = async (productData) => {
    setLoading(true);
    try {
      const res = await axios.post('/product/createProduct', productData);
      setProducts(prev => [...prev, res.data]);
      toast.success('Product created successfully');
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
      toast.error(err.response?.data?.error || 'Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`/product/getProductsByCategory/${category}`);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products by category');
      toast.error(err.response?.data?.error || 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`/product/deleteProduct/${productId}`);
      setProducts(prev => prev.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete product');
      toast.error(err.response?.data?.error || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get('/products/searchProducts', {
        params: { query }
      });
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search products');
      toast.error(err.response?.data?.error || 'Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/product/getProductById/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch product');
      toast.error(err.response?.data?.error || 'Failed to fetch product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (productId, productData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/product/updateProduct/${productId}`, productData);
      setProducts(prev => 
        prev.map(product => 
          product._id === productId ? response.data : product
        )
      );
      toast.success('Product updated successfully');
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update product');
      toast.error(err.response?.data?.error || 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    loading,
    error,
    fetchAllProducts,
    createProduct,
    fetchProductsByCategory,
    deleteProduct,
    searchProducts,
    getProductById,
    updateProduct,
    setProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);
export {useProduct};

