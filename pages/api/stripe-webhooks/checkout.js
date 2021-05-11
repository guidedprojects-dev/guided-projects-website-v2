import { buffer } from "micro";
import Stripe from "stripe";
import { connectToDB, updateUserProject } from "../../../database";

const { STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY);

// prevent next js from parsing the body automatically
export const config = {
  api: {
    bodyParser: false,
  },
};

// We can't use next-connect here becasue stripe requires the raw unparsed request body.
// Next-connect will automatically parse the body and there is nothing we can do to prevent that
// besides not using next-connect.
async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    try {
      var event = stripe.webhooks.constructEvent(
        buf,
        sig,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object;
        const { userId, projectSlug } = checkoutSession.metadata;
        // Confirm the payment went through before fulfilling the order
        if (checkoutSession.payment_status === "paid") {
          try {
            const { db } = await connectToDB();
            await updateUserProject({
              db,
              userId,
              projectSlug,
              data: { purchased: true },
            });
          } catch (error) {
            console.log(`error`, error);
          }
        }
      }
    }

    res.json({ recieved: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default handler;
