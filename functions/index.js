const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KoryQSGBRJuCHBJPOZzKSgLbLuh28kjQSHlz3UbS69iKbSJgkHuby5X8xKrR13u9Sh0XKrh53JgYKOzkCf9Unai00JXAgex3q");

/* To setup API we need 4 things
    1. App Configuration
    2. Middlewares
    3. API Routes
    4. Listen Command
*/

// App configuration
const app = express();

// Middlewares
// need this command to do some safe things
app.use(cors({ origin: true }));
// to send and receive data in json format
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world!!2'));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment request received BOOM!! ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// Listen Command
exports.api = functions.https.onRequest(app);