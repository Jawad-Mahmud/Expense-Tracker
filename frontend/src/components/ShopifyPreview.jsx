// src/components/ShopifyPreview.jsx
import { useState, useEffect } from 'react';

export const ShopifyPreview =()=> {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch orders
      const ordersRes = await fetch('http://localhost:5000/api/shopify/orders');
      if (!ordersRes.ok) throw new Error('Failed to fetch orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData.orders || []);
      console.log('📦 Full Orders Data (check this in console):', ordersData.orders);

      // Fetch products
      const productsRes = await fetch('http://localhost:5000/api/shopify/products');
      if (!productsRes.ok) throw new Error('Failed to fetch products');
      const productsData = await productsRes.json();
      setProducts(productsData.products || []);
      console.log('🛍️ Full Products Data (check this in console):', productsData.products);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
      setLoading(false);
    }
  };

  fetchData();
}, []);  
if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading your Shopify data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Your Shopify Store Data
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Open browser console (F12) → Console tab to see full raw JSON data
        </p>

        {/* Orders Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
            Orders ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found (maybe add a test order in Shopify)</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="p-4 text-left">Order #</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-left">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{order.name}</td>
                      <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="p-4">{order.customer?.email || 'Guest'}</td>
                      <td className="p-4 text-right font-bold text-green-600">
                        ${parseFloat(order.total_price).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.financial_status === 'paid' ? 'bg-green-200 text-green-800' :
                          order.financial_status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {order.financial_status}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {order.line_items.map(item => `${item.title} (x${item.quantity})`).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
            Products ({products.length})
          </h2>
          {products.length === 0 ? (
            <p className="text-gray-600">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                  {product.images?.[0]?.src ? (
                    <img
                      src={product.images[0].src}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4" />
                  )}
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-600 mt-2">
                    {product.variants[0]?.price ? `$${product.variants[0].price}` : 'No price set'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-16 text-center">
          <p className="text-xl font-medium text-green-600">
            ✅ You are now seeing live data from your Shopify store!
          </p>
          <p className="mt-6 text-lg">
            When you're ready to save these orders as expenses in your tracker, just say:
          </p>
          <p className="mt-4 text-2xl font-bold text-indigo-600">
            "Now save Shopify orders as expenses in Firestore"
          </p>
        </div>
      </div>
    </div> 
  );
}