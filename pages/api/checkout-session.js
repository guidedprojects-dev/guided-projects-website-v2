import nc from "next-connect";
import Stripe from "stripe";
import { getSession } from "next-auth/client";
import { getClient } from "../../lib/sanity.server";
import { projectCheckoutDataQuery } from "../../lib/queries";
import { urlForImage } from "../../lib/sanity";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = nc().post(async (req, res) => {
  const { projectId, returnTo } = req.body;

  try {
    const project = await getClient(false).fetch(projectCheckoutDataQuery, {
      projectId,
    });
    const userSession = await getSession({ req });
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: project.title,
              images: [urlForImage(project.mainImage).url()],
            },
            unit_amount: project.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        projectSlug: project.slug.current,
        userId: userSession.user.userId,
      },
      success_url: `${returnTo}?canceled=false`,
      cancel_url: `${returnTo}?canceled=true`,
    });
    res.json({ id: checkoutSession.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default handler;
