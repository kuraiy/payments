const express = require('express');
const router = express.Router();

const stripeSecret = 'sk_test_51NPQ7cC0MhuyErbAM0hSv85lSU7yDgciGq95pXOacciz7FpcOENQ336hLKZOUBWP46ciMHw1ChHV4C0kdCKgR07T000rljbiZj'
const stripe = require('stripe')(stripeSecret);

router.post('/keys', async (req, res) => {
    const {
        amount,
        customerId,
        email
    } = req.body

    try {
        const ephemeralKey = await stripe.ephemeralKeys.create({
            customer: customerId,
        }, {
          apiVersion: '2022-11-15',
        });

        const charged = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"],
            customer: customerId,
            receipt_email: email,
        });
        
        return res.status(200).send({
            ephemeralKey: ephemeralKey,
            client_secret: charged.client_secret
        })
    } catch(err) {
        return res.status(400).send({
            Error: err
        });
    }
})


router.post('/newCustomer', async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            email: req.body.email
        });

        return res.status(200).send({
            customerId: customer.id,
            customerEmail: customer.email
        });
    } catch (err) {
        return res.status(400).send({
            Error: err
        });
    }
});

module.exports = router;

