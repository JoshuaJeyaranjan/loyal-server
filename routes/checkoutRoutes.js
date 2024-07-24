// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PfmXg2NGMtBaXU0lGGmv3YGgThcvTu5K75TJcRA8HIk1SyMkBdeKGSJfYODhg8AWEyqa0DsbBGzsT4xprv7RFex00mVxs4vYd'); // Replace with your Stripe secret key

router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert price to integer
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
