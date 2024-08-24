const express = require('express');
const router = express.Router();
const { createBill } = require('../controllers/bill.controller.js');

router.post('/bill/create', createBill);

module.exports = router;