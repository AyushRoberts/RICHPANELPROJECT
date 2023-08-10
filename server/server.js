const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const stripe = require("stripe")(
  "sk_test_51NdCoiSFgNssnXOVeOPbujpmoi8A7aiMQzzdzqA9AYux8dMG8AHLEDZ4ru0unUr6kDShvmKbCy3m3uu7t7UOSR2F00GpvRYY89"
);

app.get("/secret", async (req, res) => {
  const cost = req.header("Cost") + "00";
  console.log(cost);
  const intent = await stripe.paymentIntents.create({
    amount: cost,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.json({ client_secret: intent.client_secret });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
