import {
    getAllCustomers,
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    addNewCardToCustomer,
    deleteCardFromCustomer,
    getAllUserCards,
    getAllUserPaymentMethods,
    chargeCustomer,
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    createPrice,
    getAllPrices,
    getPrice,
    webhook,
    createSubscription,
    getAllSubscriptions,
    getSubscription,
    deleteSubscriptionAtEnd,
    deleteSubscription,
    verifySession,
    createPaymentMethod,
    getPaymentMethod
} from "../../libs/stripe.js";

export const stripeCreateCustomer = async (req, res) => {
    try {
        const { body: { email, lastName } } = req;
        const customer = await createCustomer(email, lastName);
        return res.send({ customer });
    } catch (err) {
        throw err;
    }
};

export const stripeGetAllCustomers = async (req, res) => {
    try {
        const customers = await getAllCustomers();
        return res.send({ customers });
    } catch (err) {
        throw err;
    }
};

export const stripeGetCustomer = async (req, res) => {
    try {
        const { params: { customerId } } = req;
        const customer = await getCustomer(customerId);
        return res.send({ customer });
    } catch (err) {
        throw err;
    }
};

export const stripeUpdateCustomer = async (req, res) => {
    try {
        const { params: { customerId }, body } = req;
        const customer = await updateCustomer(customerId, body);
        return res.send({ customer });
    } catch (err) {
        throw err;
    }
};

export const stripeDeleteCustomer = async (req, res) => {
    try {
        const { params: { customerId } } = req;
        const customer = await deleteCustomer(customerId);
        return res.send({ customer });
    } catch (err) {
        throw err;
    }
};

export const stripeAddCardToCustomer = async (req, res) => {
    try {
        const { params: { customerId }, body } = req;
        const card = await addNewCardToCustomer(body, customerId);
        return res.send({ card });
    } catch (err) {
        throw err;
    }
};

export const stripeRemoveCardFromCustomer = async (req, res) => {
    try {
        const { params: { customerId, cardId } } = req;
        const card = await deleteCardFromCustomer(customerId, cardId);
        return res.send({ card });
    } catch (err) {
        throw err;
    }
};

export const stripeGetAllCardsOfCustomer = async (req, res) => {
    try {
        const { params: { customerId } } = req;
        const cards = await getAllUserCards(customerId);
        return res.send({ cards });
    } catch (err) {
        throw err;
    }
};

export const stripeGetAllPaymentMethodsOfCustomer = async (req, res) => {
    try {
        const { params: { customerId } } = req;
        const pm = await getAllUserPaymentMethods(customerId);
        return res.send({ pm });
    } catch (err) {
        throw err;
    }
};

export const stripeCharge = async (req, res) => {
    try {
        const { params: { customerId }, body } = req;
        const charge = await chargeCustomer(body, customerId);
        return res.send({ charge });
    } catch (err) {
        throw err;
    }
};

export const stripeCreateProduct = async (req, res) => {
    try {
        const { body } = req;
        const product = await createProduct(body);
        return res.send({ product });
    } catch (err) {
        throw err;
    }
};

export const stripeGetAllProducts = async (req, res) => {
    try {
        const { body } = req;
        const products = await getAllProducts();
        return res.send({ products });
    } catch (err) {
        throw err;
    }
};

export const stripeGetProduct = async (req, res) => {
    try {
        const { params: { productId } } = req;
        const product = await getProduct(productId);
        return res.send({ product });
    } catch (err) {
        throw err;
    }
};

export const stripeDeleteProduct = async (req, res) => {
    try {
        const { params: { productId } } = req;
        const product = await deleteProduct(productId);
        return res.send({ product });
    } catch (err) {
        throw err;
    }
};

export const stripeCreatePrice = async (req, res) => {
    try {
        const { body } = req;
        const price = await createPrice(body);
        return res.send({ price });
    } catch (err) {
        throw err;
    }
};

export const stripeGetAllPrices = async (req, res) => {
    try {
        const prices = await getAllPrices();
        return res.send({ prices });
    } catch (err) {
        throw err;
    }
};

export const stripeGetPrice = async (req, res) => {
    try {
        const { params: { priceId } } = req;
        const price = await getPrice(priceId);
        return res.send({ price });
    } catch (err) {
        throw err;
    }
};

export const stripeWebhook = async (req, res) => {
    try {
        const wh = await webhook(req);
        return res.send({ wh });
    } catch (err) {
        throw err;
    }
};

export const stripeCreateSubscription = async (req, res) => {
    try {
        const { params: { customerId }, body } = req;
        const subscription = await createSubscription(body, customerId);
        return res.send({ subscription });
    } catch (err) {
        throw err;
    }
};

export const stripeGetAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await getAllSubscriptions();
        return res.send({ subscriptions });
    } catch (err) {
        throw err;
    }
};

export const stripeGetSubscription = async (req, res) => {
    try {
        const { params: { subscriptionId } } = req;
        const subscription = await getSubscription(subscriptionId);
        return res.send({ subscription });
    } catch (err) {
        throw err;
    }
};

export const stripeDeleteSubscriptionAtEnd = async (req, res) => {
    try {
        const { params: { subscriptionId } } = req;
        const subscription = await deleteSubscriptionAtEnd(subscriptionId);
        return res.send({ subscription });
    } catch (err) {
        throw err;
    }
};;

export const stripeDeleteSubscription = async (req, res) => {
    try {
        const { params: { subscriptionId } } = req;
        const subscription = await deleteSubscription(subscriptionId);
        return res.send({ subscription });
    } catch (err) {
        throw err;
    }
};

export const stripeVerifySession = async (req, res) => {
    try {
        const { params: { sessionId } } = req;
        const session = await verifySession(sessionId);
        return res.send({ session });
    } catch (err) {
        throw err;
    }
};

export const stripeCreatePaymentMethod = async (req, res) => {
    try {
        const { body } = req;
        const paymentMethod = await createPaymentMethod(body);
        return res.send({ paymentMethod });
    } catch (err) {
        throw err;
    }
};

export const stripeGetPaymentMethod = async (req, res) => {
    try {
        const { params: { paymentMethodId } } = req;
        const paymentMethod = await getPaymentMethod(paymentMethodId);
        return res.send({ paymentMethod });
    } catch (err) {
        throw err;
    }
};