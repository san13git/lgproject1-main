const express = require('express');
const router = express.Router();
const Order = require('../models/bill');

// Create a new order
router.post('/confirm', async (req, res) => {
  const { items, totalPrice, email } = req.body;
  const order = new Order({ items, totalPrice, email });
  try {
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
