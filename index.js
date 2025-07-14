const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
// Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB connection function
async function connectDB() {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connected');
}

connectDB();

const productschema = new mongoose.Schema({
    name : String,
    price: Number,
    category: String
});
const product = mongoose.model('product', productschema);

// ✅ POST - Create
app.post('/product', async(req, res) => {
   
    await product.create(req.body)
    res.send("product added succesfully")
});

// ✅ GET - Read
app.get('/product', async (req, res) => {
    const products = await product.find();
    res.send(products);
});

// ✅ PUT - Update (optional implementation)
app.put('/product/:id', async (req, res) => { 
    console.log(req.params.id);
   await product.updateOne({ _id: req.params.id }, req.body);
   res.send('product updated successfully')
});


// ✅ DELETE - Delete (optional implementation)
app.delete('/product/:id',async (req, res) => { 
    await product.findByIdAndDelete({ _id: req.params.id });
   res.send('product deleted successfully')
});

// ✅ Start server
app.listen(3000, 'localhost', () => {
    console.log('🚀 Server started on http://localhost:3000');
});




