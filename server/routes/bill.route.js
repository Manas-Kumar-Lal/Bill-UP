const express = require('express');
const router = express.Router();
const { createBill, getAllBills } = require('../controllers/bill.controller.js');

router.post('/bill/create', createBill);
router.get('/bill/getallbills', getAllBills);

module.exports = router;