const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add product to cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, products: [] });
  }

  const productIndex = cart.products.findIndex(p => p.productId === productId);
  if (productIndex > -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

module.exports = router;
