// routes/payments.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // ou axios
require("dotenv").config();

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL; // ex: http://localhost:3000

// POST /api/payments/checkout
router.post("/checkout", async (req, res) => {
  const { amount, currency = "XOF", phone, email, name } = req.body;
  try {
    const body = {
      tx_ref: `premium_${Date.now()}`,
      amount: amount,
      currency: currency,
      payment_options: "mobilemoney,card",
      customer: {
        email: email,
        phonenumber: phone,
        name: name || email.split("@")[0]
      },
      redirect_url: `${FRONTEND_URL}/premium/success`,
      meta: {
        premium: true
      }
    };

    const r = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FLW_SECRET_KEY}`
      },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    if (data.status === "success") {
      return res.json({ link: data.data.link });
    } else {
      return res.status(400).json({ message: "Erreur création paiement", detail: data });
    }
  } catch (error) {
    console.error("Erreur création session paiement:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// POST /api/payments/webhook
router.post("/webhook", async (req, res) => {
  try {
    const event = req.body;
    // Optionnel : vérifier signature etc.
    if (event.data && event.data.status === "successful" && event.data.meta && event.data.meta.premium) {
      const email = event.data.customer.email;
      // Mettre à jour l’utilisateur : rôle -> premium
      const User = require("../models/User");
      await User.findOneAndUpdate({ email: email }, { role: "premium" });
    }
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ message: "Erreur webhook", error });
  }
});

module.exports = router;
