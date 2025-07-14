const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB connection function
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
    }
}

connectDB();

// MongoDB Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Product = mongoose.model('product', productSchema);

// ✅ POST - Create
app.post('/product', async (req, res) => {
    await Product.create(req.body);
    res.send("Product added successfully");
});

// ✅ GET - Read
app.get('/product', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// ✅ PUT - Update
app.put('/product/:id', async (req, res) => {
    await Product.updateOne({ _id: req.params.id }, req.body);
    res.send('Product updated successfully');
});

// ✅ DELETE - Delete
app.delete('/product/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id); // ✅ cleaned up the object
    res.send('Product deleted successfully');
});

// ✅ Start server
app.listen(3000, () => {
    console.log('🚀 Server started on http://localhost:3000');
});
