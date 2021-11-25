import {
    stripeCreateCustomer,
    stripeGetAllCustomers,
    stripeGetCustomer,
    stripeUpdateCustomer,
    stripeDeleteCustomer,
    stripeAddCardToCustomer,
    stripeRemoveCardFromCustomer,
    stripeGetAllCardsOfCustomer,
    stripeCharge,
    stripeCreateProduct,
    stripeGetAllProducts,
    stripeGetProduct,
    stripeDeleteProduct,
    stripeCreatePrice,
    stripeGetAllPrices,
    stripeGetPrice,
    stripeWebhook,
    stripeCreateSubscription,
    stripeGetAllSubscriptions,
    stripeGetSubscription,
    stripeDeleteSubscription
} from "./controller.js";

const paramsCustomerId = {
    type: "object",
    required: ["customerId"],
    properties: {
        customerId: { type: "string" }
    },
    additionalProperties: false
};

const paramsProductId = {
    type: "object",
    required: ["productId"],
    properties: {
        productId: { type: "string" }
    },
    additionalProperties: false
};

const paramsPriceId = {
    type: "object",
    required: ["priceId"],
    properties: {
        priceId: { type: "string" }
    },
    additionalProperties: false
};

const paramsSubscriptionId = {
    type: "object",
    required: ["subscriptionId"],
    properties: {
        subscriptionId: { type: "string" }
    },
    additionalProperties: false
};

const paramsCustomerIdCardId = JSON.parse(JSON.stringify(paramsCustomerId));
paramsCustomerIdCardId.required.push("cardId");
paramsCustomerIdCardId.properties.cardId = { type: "string" };

export const stripeCreateCustomerOpts = {
    schema:  {
        body: {
            type: "object",
            required: ["email", "lastName"],
            properties: {
                email: { type: "string" },
                lastName: { type: "string" }
            },
            additionalProperties: false
        }
    },
    handler: stripeCreateCustomer
};

export const stripeGetAllCustomersOpts = {
    handler: stripeGetAllCustomers
};

export const stripeGetCustomerOpts = {
    schema:  {
        params: paramsCustomerId
    },
    handler: stripeGetCustomer
};

export const stripeUpdateCustomerOpts = {
    schema:  {
        params: paramsCustomerId,
        body: {
            type: "object",
            required: ["name", "email"],
            properties: {
                name: { type: "string" },
                email: { type: "string" }
            },
            additionalProperties: false
        }
    },
    handler: stripeUpdateCustomer
};

export const stripeDeleteCustomerOpts = {
    schema:  {
        params: paramsCustomerId
    },
    handler: stripeDeleteCustomer
};

export const stripeAddCardToCustomerOpts = {
    schema:  {
        params: paramsCustomerId,
        body: {
            type: "object",
            required: ["cardNumber", "cardExpMonth", "cardExpYear", "cardCVC"],
            properties: {
                cardNumber: { type: "string" },
                cardExpMonth: { type: "string" },
                cardExpYear: { type: "string" },
                cardCVC: { type: "string" }
            }
        }
    },
    handler: stripeAddCardToCustomer
};

export const stripeRemoveCardFromCustomerOpts = {
    schema: {
        params: paramsCustomerIdCardId
    },
    handler: stripeRemoveCardFromCustomer
};

export const stripeGetAllCardsOfCustomerOpts = {
    schema:  {
        params: paramsCustomerId
    },
    handler: stripeGetAllCardsOfCustomer
};

export const stripeChargeOpts = {
    schema:  {
        params: paramsCustomerId,
        body: {
            type: "object",
            required: ["amount"],
            properties: {
                amount: { type: "number" }
            }
        },
        additionalProperties: false
    },
    handler: stripeCharge
};

export const stripeCreateProductOpts = {
    schema: {
        body: {
            type: "object",
            required: ["name", "description"],
            properties: {
                name: { type: "string" },
                description: { type: "string" }
            },
            additionalProperties: false
        }
    },
    handler: stripeCreateProduct
};

export const stripeGetAllProductsOpts = {
    handler: stripeGetAllProducts
};

export const stripeGetProductOpts = {
    schema: {
        params: paramsProductId
    },
    handler: stripeGetProduct
};

export const stripeDeleteProductOpts = {
    schema: {
        params: paramsProductId
    },
    handler: stripeDeleteProduct
};

export const stripeCreatePriceOpts = {
    schema: {
        body: {
            type: "object",
            required: ["unit_amount", "product", "recurring"],
            properties: {
                unit_amount: { type: "number" },
                product: { type: "string" },
                recurring: {
                    type: "object",
                    required: ["interval"],
                    properties: {
                        interval: { type: "string" }
                    },
                    additionalProperties: false
                }
            },
            additionalProperties: false
        }
    },
    handler: stripeCreatePrice
};

export const stripeGetAllPricesOpts = {
    handler: stripeGetAllPrices
};

export const stripeGetPriceOpts = {
    schema: {
        params: paramsPriceId
    },
    handler: stripeGetPrice
};

export const stripeWebhookOpts = {
    config: {
        rawBody: true
    },
    handler: stripeWebhook
};

export const stripeCreateSubscriptionOpts = {
    schema:  {
        params: paramsCustomerId,
        body: {
            type: "object",
            required: ["items"],
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["price"],
                        properties: {
                            price: { type: "string" }
                        }
                    }
                }
            },
            additionalProperties: false
        }
    },
    handler: stripeCreateSubscription
};

export const stripeGetAllSubscriptionsOpts = {
    handler: stripeGetAllSubscriptions
};

export const stripeGetSubscriptionOpts = {
    schema:  {
        params: paramsSubscriptionId
    },
    handler: stripeGetSubscription
};

export const stripeDeleteSubscriptionOpts = {
    schema:  {
        params: paramsSubscriptionId
    },
    handler: stripeDeleteSubscription
};