// backend/server.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

app.use(express.json());

// Connect to MySQL database
const sequelize = new Sequelize('ecommerce', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Product model
const Product = sequelize.define('Product', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_name: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL(10, 2) },
  stock_level: { type: DataTypes.INTEGER },
});

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// API endpoint to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});