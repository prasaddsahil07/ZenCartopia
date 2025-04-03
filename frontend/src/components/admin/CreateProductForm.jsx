import { useState } from "react";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProduct } from "../../context/ProductContext";

// const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_price: "",
    product_category_name_english: "",
    product_photos: "",
  });

  const { createProduct, loading } = useProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ 
        product_name: "", 
        product_description: "", 
        product_price: "", 
        product_category_name_english: "", 
        product_photos: "" 
      });
    } catch {
      console.log("error creating a product");
    }
  };

  return (
    <div className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
            Product Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={newProduct.product_name}
            onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            required
          />
        </div>

        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-300'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={newProduct.product_description}
            onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
            rows='3'
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            required
          />
        </div>

        <div>
          <label htmlFor='price' className='block text-sm font-medium text-gray-300'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={newProduct.product_price}
            onChange={(e) => setNewProduct({ ...newProduct, product_price: e.target.value })}
            step='0.01'
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            required
          />
        </div>

        <div>
          <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
            Category
          </label>
          <input
            id='category'
            name='category'
            value={newProduct.product_category_name_english}
            onChange={(e) => setNewProduct({ ...newProduct, product_category_name_english: e.target.value })}
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            required
          />
        </div>

        <div className='mt-1 flex items-center'>
          <label
            htmlFor='image'
            className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm 
            text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
          >
            <Upload className='h-5 w-5 inline-block mr-2' />
            Upload Image
          </label>
          {newProduct.product_photos && <span className='ml-3 text-sm text-gray-400'>Image uploaded</span>}
        </div>

        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
          shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className='mr-2 h-5 w-5' />
              Create Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;