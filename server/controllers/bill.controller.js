const Bill = require('../models/bill.model.js');
const Product = require('../models/product.model.js');
const asyncHandler = require('../utilities/asyncHandler.utility.js');
const errorHandler = require('../utilities/errorHandler.utility.js');

// Controller to create a bill
const createBill = asyncHandler(async (req, res, next) => {
    const { customerName, products, totalAmount } = req.body;

    // Validate request body
    if (!customerName || !products || !totalAmount) {
        return next(new errorHandler("customerName, products, totalAmount must be provided"));
    }

    // Trim the customerName and make it case-insensitive
    const trimmedCustomerName = customerName.trim().toLowerCase();

    // Count the number of existing bills to determine the next bill number
    const billCount = await Bill.countDocuments();
    const billNumber = billCount + 1;

    // Create a new bill instance
    const responseData = await Bill.create({
        billNumber,
        customerName: trimmedCustomerName,
        products,
        totalAmount,
    });

    // Product quantity updation from inventory
    if (responseData) {
        for (const product of products) {
            const singleProduct = await Product.findById(product?.productID);
            if (singleProduct) {
                singleProduct.quantity -= product.quantity;
                await singleProduct.save();
            }
        }
    }

    // Respond with the saved bill
    res.status(201).send({
        success: true,
        responseData,
    });
});


// Controller to get all bills
const getAllBills = asyncHandler(async (req, res, next) => {
    // Fetch all bills from the database
    const bills = await Bill.find().sort({ createdAt: -1 });

    // Check if there are any bills
    if (!bills || bills.length === 0) {
        return next(new errorHandler("No bills found", 404));
    }

    // Respond with the list of bills
    res.status(200).send({
        success: true,
        responseData: bills,
    });
});

module.exports = {
    createBill,
    getAllBills
};
