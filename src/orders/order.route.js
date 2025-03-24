const express = require('express');
const order = require('./order.model');
const { createOrder, getSingleOrder, getOrdersByUserEmail } = require('./order.controller');
const router = express.Router();

//create order
router.post('/create-order',createOrder)

//get orders by user email
router.get('/get-orders/:email',getOrdersByUserEmail) 

//get single order
router.get('/:id',getSingleOrder)

module.exports = router;