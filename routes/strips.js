const cors = require('cors');
const express = require('express');
//       Add a stripe key
const stripe = require('stripe')('sk_test_51LL7u6SFApoQBYjoeQWWIgLmLJ8bGVJE9nrpqfc4VwwceSsolBKUdEweko72Zav1kch2QKtqcQVgOBzzq8SgG33S0062qVCJbV');
const uuid = require('uuid/v4');

const app = express();

//  Middleware
app.use(express.json());
app.use(cors());

//  Routers
app.get("/", (req, res) => {
    res.send("It works...");
});


app.post('/payment', (req, res) => {
    const {product, token} = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_emal: token.email,
            description: `Purchase Of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey});
    }).then(result => res.status(200).json(result)).catch(err => console.log(err));

});

//  Listen
app.listen(8282, () => console.log("LISTENING AT PORT 8282"));

module.exports =  app;
// export default app