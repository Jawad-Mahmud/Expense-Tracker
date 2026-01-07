// backend/services/shopifyService.js
import axios from 'axios';

const SHOPIFY_STORE = process.env.SHOPIFY_STORE; // expense-tracker-3.myshopify.com
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;  // shpat_xxxxx
const API_VERSION = '2026-01';
const shopifyApi = axios.create({
  baseURL: `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}`,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_TOKEN,
    'Content-Type': 'application/json',
  },
});

// 1. Get Recent Orders (Primary for expenses)
export async function getRecentOrders(days = 30, limit = 50) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const response = await shopifyApi.get(`/orders.json?limit=${limit}&status=any&created_at_min=${since}`);
  return response.data.orders;
}

// 2. Get Products (Inventory costs)
export async function getProducts() {
  const response = await shopifyApi.get('/products.json?limit=250');
  return response.data.products;
}

// 3. Get Order by ID (details for expense breakdown)
export async function getOrder(orderId) {
  const response = await shopifyApi.get(`/orders/${orderId}.json`);
  return response.data.order;
}

// 4. Get Payouts (Shopify Payments expenses/fees)
export async function getPayouts() {
  const response = await shopifyApi.get('/payouts.json?limit=10');
  return response.data.payouts;
}