import nc from "next-connect";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = nc().post((req, res) => {
  const event = req.body;

  console.log(`event`, event);

  res.json({ received: true });
});

export default handler;
