import {
    stripeCreateCustomerOpts,
    stripeGetAllCustomersOpts,
    stripeGetCustomerOpts,
    stripeUpdateCustomerOpts,
    stripeDeleteCustomerOpts,
    stripeAddCardToCustomerOpts,
    stripeRemoveCardFromCustomerOpts,
    stripeGetAllCardsOfCustomerOpts,
    stripeChargeOpts,
    stripeCreateProductOpts,
    stripeGetAllProductsOpts,
    stripeGetProductOpts,
    stripeDeleteProductOpts,
    stripeCreatePriceOpts,
    stripeGetAllPricesOpts,
    stripeGetPriceOpts,
    stripeWebhookOpts,
    stripeCreateSubscriptionOpts,
    stripeGetAllSubscriptionsOpts,
    stripeGetSubscriptionOpts,
    stripeDeleteSubscriptionOpts
} from "./schema.js";

export const stripePlugin = (fastify, options, done) => {
    try {
        fastify.post("/customer", stripeCreateCustomerOpts);
        fastify.get("/customer/all", stripeGetAllCustomersOpts);
        fastify.get("/customer/:customerId", stripeGetCustomerOpts);
        fastify.patch("/customer/:customerId", stripeUpdateCustomerOpts);
        fastify.delete("/customer/:customerId", stripeDeleteCustomerOpts);
        fastify.post("/customer/:customerId/addCard", stripeAddCardToCustomerOpts);
        fastify.delete("/customer/:customerId/removeCard/:cardId", stripeRemoveCardFromCustomerOpts);
        fastify.get("/customer/:customerId/cards", stripeGetAllCardsOfCustomerOpts);

        fastify.post("/charge/:customerId", stripeChargeOpts);

        fastify.post("/product", stripeCreateProductOpts);
        fastify.get("/product/all", stripeGetAllProductsOpts);
        fastify.get("/product/:productId", stripeGetProductOpts);
        fastify.delete("/product/:productId", stripeDeleteProductOpts);

        fastify.post("/price", stripeCreatePriceOpts);
        fastify.get("/price/all", stripeGetAllPricesOpts);
        fastify.get("/price/:priceId", stripeGetPriceOpts);

        fastify.post("/subscription/:customerId", stripeCreateSubscriptionOpts);
        fastify.get("/subscription/all", stripeGetAllSubscriptionsOpts);
        fastify.get("/subscription/:subscriptionId", stripeGetSubscriptionOpts);
        fastify.delete("/subscription/:subscriptionId", stripeDeleteSubscriptionOpts);

        fastify.post("/webhook", stripeWebhookOpts);

        done();
    } catch (err) {
        throw err;
    }
};