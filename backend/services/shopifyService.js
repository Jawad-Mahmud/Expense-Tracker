import axios from 'axios';

const API_VERSION = '2026-01';

// Lazy-load Axios client to prevent reading env variables at import time
// Previously, Axios was created at module load, before dotenv ran, so SHOPIFY_STORE was undefined.
function createShopifyClient() {
  const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
  const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

  if (!SHOPIFY_STORE || !SHOPIFY_TOKEN) {
    // This error now clearly explains why Axios would fail
    throw new Error('SHOPIFY_STORE or SHOPIFY_TOKEN missing. This was the cause of ENOTFOUND undefined.');
  }

  return axios.create({
    baseURL: `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}`,
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_TOKEN,
      'Content-Type': 'application/json',
    },
  });
}

export async function getRecentOrders(days = 30, limit = 50) {
  const shopifyApi = createShopifyClient();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  return (await shopifyApi.get(`/orders.json?limit=${limit}&status=any&created_at_min=${since}`)).data.orders;
}

export async function getProducts() {
  const shopifyApi = createShopifyClient();
  return (await shopifyApi.get('/products.json?limit=250')).data.products;
}

export async function getOrder(orderId) {
  const shopifyApi = createShopifyClient();
  return (await shopifyApi.get(`/orders/${orderId}.json`)).data.order;
}

export async function getPayouts() {
  const shopifyApi = createShopifyClient();
  return (await shopifyApi.get('/payouts.json?limit=10')).data.payouts;
}