import express from 'express';
import {
  getRecentOrders,
  getProducts,
  getOrder,
  getPayouts,
} from '../services/shopifyService.js';

const router = express.Router();

router.get('/orders', async (req, res) => {
  try {
    const orders = await getRecentOrders(30, 50);
    console.log(`✅ Fetched ${orders.length} orders from Shopify`);
    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    // THIS WILL SHOW THE EXACT PROBLEM IN TERMINAL
    console.error('🛑 SHOPIFY ORDERS ERROR DETAILS:');
    console.error('Message:', error.message);
    console.error('Status Code:', error.response?.status);  // e.g., 401, 404, 403
    console.error('Shopify Error Response:', error.response?.data);
    console.error('Full Config:', error.config?.url);

    res.status(500).json({
      success: false,
      error: error.message,
      shopifyStatus: error.response?.status,
      shopifyDetails: error.response?.data,
    });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await getProducts();
    console.log(`✅ Fetched ${products.length} products`);
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('🛑 SHOPIFY PRODUCTS ERROR DETAILS:');
    console.error('Message:', error.message);
    console.error('Status Code:', error.response?.status);
    console.error('Shopify Error Response:', error.response?.data);
    console.error('Full Config:', error.config?.url);

    res.status(500).json({
      success: false,
      error: error.message,
      shopifyStatus: error.response?.status,
      shopifyDetails: error.response?.data,
    });
  }
});

// Keep the other routes as they are (or add similar logging if needed)
router.get('/order/:id', async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    res.json({ success: true, order });
  } catch (error) {
    console.error('🛑 SINGLE ORDER ERROR:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/payouts', async (req, res) => {
  try {
    const payouts = await getPayouts();
    res.json({ success: true, count: payouts.length, payouts });
  } catch (error) {
    console.error('🛑 PAYOUTS ERROR:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;