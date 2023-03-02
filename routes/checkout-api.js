const pkg = require("stripe");
const stripe = pkg || process.env.STRIPE_KEY;

const checkoutApi = async (req, res) => {
    const { totalAmount, cancelRoute, productIds, currentRoute } = req.body;
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "Rs",
              product_data: {
                name: "Mobile Store",
                images: [""],
              },
              unit_amount: parseInt(totalAmount, 10) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${
          req.headers.origin
        }?is_stripe=true&is_cart=${currentRoute.includes(
          "cart"
        )}&product_ids=${productIds}`,
        cancel_url: `${req.headers.origin}${cancelRoute}`,
      });

      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
};
module.exports = checkoutApi;