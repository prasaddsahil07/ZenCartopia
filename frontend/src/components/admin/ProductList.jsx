import { Trash } from "lucide-react";
import { useProduct } from "../../context/ProductContext";

const ProductsList = () => {
  const { deleteProduct, products, loading, error } = useProduct();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 text-red-400 p-4 rounded-lg max-w-4xl mx-auto">
        Error loading products: {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-800 text-gray-400 p-8 text-center rounded-lg max-w-4xl mx-auto">
        No products found
      </div>
    );
  }

  return (
    <div className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'>
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='bg-gray-700'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Product
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Price
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Category
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {products.map((product) => (
            <tr key={product._id || product.product_id} className='hover:bg-gray-700'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <img
                      className='h-10 w-10 rounded-full object-cover'
                      src={product.product_photos || '/placeholder-product.png'}
                      alt={product.product_name || 'Product image'}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.png';
                      }}
                    />
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-white'>
                      {product.product_name || 'Unnamed Product'}
                    </div>
                    <div className='text-xs text-gray-400'>
                      ID: {product.product_id || 'N/A'}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>
                  ${(product.product_price || 0).toFixed(2)}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>
                  {product.product_category_name_english || 'Uncategorized'}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => deleteProduct(product.product_id)}
                  className='text-red-400 hover:text-red-300 transition-colors'
                  title="Delete product"
                >
                  <Trash className='h-5 w-5' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;