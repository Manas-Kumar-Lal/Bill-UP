const mongoose = require('mongoose');

// Define the schema for a Bill
const BillSchema = new mongoose.Schema({
    billNumber: {
        type: String,
        required: true,
        trim: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    products: [
        {
            productID: {
                type: String,
                required: true,
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema and export it
const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;
