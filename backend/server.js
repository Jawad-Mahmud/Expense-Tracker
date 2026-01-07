
// backend/server.js (or index.js)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shopifyRoutes from './routes/shopifyRoutes.js';  // ← Add this import

dotenv.config();

const app = express();

// Middleware
app.use(cors());           // Allows your React frontend to call backend
app.use(express.json());

// Routes
app.use('/api/shopify', shopifyRoutes);  // ← All Shopify endpoints under /api/shopify

// Optional: Test route
app.get('/', (req, res) => {
  res.send('Backend is running! Shopify integration active.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});