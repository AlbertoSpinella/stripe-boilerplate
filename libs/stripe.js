import util from "util";
const {
	SECRET_STRIPE_KEY,
	STRIPE_WEBHOOK_SIGNATURE
} = process.env;
import Stripe from 'stripe';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2020-08-27'
});

export const createCustomer = async (email, lastName) => {
	try {    
		const customerCreated = await stripe.customers.create({
			email,
			name: lastName
		});
		return customerCreated;
	} catch (err) {
		throw err;
	}
};

export const getAllCustomers = async () => {
	try {
		const savedCustomers = await stripe.customers.list();
		const customerDetails = Object.values(savedCustomers.data);
		return customerDetails;
	} catch (err) {
		throw err;
	}
};

const customerExists = async (customerId) => {
	try {
		const customers = await stripe.customers.list();
		const found = customers.data.find(customer => customer.id == customerId);
		return found ? true : false;
	} catch (err) {
		throw err;
	}
};

export const getCustomer = async (customerId) => {
	try {
		if (!(await customerExists(customerId))) return { error: "Given customer doesn't exists" };
		const customer = await stripe.customers.retrieve(customerId);
		return customer; 
	} catch (err) {
		throw err;
	}
};

export const updateCustomer = async (customerId, updates) => {
	try {
		if (!updates.name) return { error: "Can't find name param" };
		if (!updates.email) return { error: "Can't find name param" };
		const customerUpdated = await stripe.customers.update(customerId, {
			name: updates.name,
			email: updates.email
		});
		return customerUpdated;
	} catch (err) {
		throw err;
	}
};

export const deleteCustomer = async (customerId) => {
	try {
		if (!(await customerExists(customerId))) return { error: "Given customer doesn't exists" };
		const customer = await stripe.customers.del(customerId);
		return customer;   
	} catch (err) {
		throw err;
	}
};

const createCardToken = async (newCard) => {
	try {
		if (!newCard.cardNumber || !newCard.cardExpMonth || !newCard.cardExpYear || !newCard.cardCVC)
			return { error: "Please provide all necessary details to create the card token" };
		const cardToken = await stripe.tokens.create({
			card: {
				number: newCard.cardNumber,
				exp_month: newCard.cardExpMonth,
				exp_year: newCard.cardExpYear,
				cvc: newCard.cardCVC
			}
		});
		return cardToken;
	} catch (err) {
		throw err;
	}
};

export const addNewCardToCustomer = async (newCard, customerId) => {
	try {
		if (!(await customerExists(customerId))) return { error: "Given customer doesn't exists" };
		const cardToken = await createCardToken(newCard);
		if (cardToken.error) return { error: cardToken.error };
		const card = await stripe.customers.createSource(customerId, {
			source: `${cardToken.id}`
		});
		//TODO controllo su card
		return card;
	} catch (err) {
		throw err;
	}
};

export const deleteCardFromCustomer = async (customerId, cardId) => {
	try {     
		if (!(await customerExists(customerId))) return { error: "Given customer doesn't exists" };
		const deletedCard = await stripe.customers.deleteSource(customerId, cardId);
		return deletedCard;
	} catch (err) {
		throw err;
	}
};

export const getAllUserCards = async (customerId) => {
	try {
		if (!(await customerExists(customerId))) return { error: "Given customer doesn't exists" };
		const savedCards = await stripe.customers.listSources(customerId, {
			object: "card"
		});
		const cardDetails = Object.values(savedCards.data);
		return cardDetails;
	} catch (err) {
		throw err;
	}
};

export const chargeCustomer = async (params, customerId) => {
	try {
		const {
			amount
		} = params;

		const customer = await getCustomer(customerId);
		const cardId = customer.default_source;
		const email = customer.email;

		const fixed = {
			amount: amount * 100,
			currency: "eur",
			receipt_email: email,
			customer: customerId,
			card: cardId,
			description: `Stripe Charge Of Amount ${amount} eur Payment for customer`,
		};

		const charged = await stripe.charges.create(fixed);
		return charged;
	} catch (err) {
			throw err;
	}
};

export const createProduct = async (product) => {
	try {    
		const productCreated = await stripe.products.create(product);
		return productCreated;
	} catch (err) {
		throw err;
	}
};

export const getAllProducts = async () => {
	try {    
		const products = await stripe.products.list();
		const productsDetails = Object.values(products.data);
		return productsDetails;
	} catch (err) {
		throw err;
	}
};

export const getProduct = async (productId) => {
	try {    
		const product = await stripe.products.retrieve(productId);
		return product;
	} catch (err) {
			throw err;
		}
};

export const deleteProduct = async (productId) => {
	try {    
		const deleted = await stripe.products.del(productId);
		return deleted;
	} catch (err) {
		throw err;
	}
};

export const createPrice = async (body) => {
	try {
		const {
			unit_amount,
			recurring,
			product
		} = body;

		if(!unit_amount  || !recurring || !product) return { error: "Missing information" };

		const newBody = {
			unit_amount: unit_amount * 100,
			currency: "eur",
			recurring: recurring,
			product: product
		}

		const price = await stripe.prices.create(newBody);
		if (!price) return { err: "Price creation failed" };
		return price;
	} catch (err) {
		throw err;
	}
};

export const getAllPrices = async () => {
	try {    
		const prices = await stripe.prices.list();
		const pricesDetails = Object.values(prices.data);
		return pricesDetails;
	} catch (err) {
		throw err;
	}
};

export const getPrice = async (priceId) => {
	try {    
		const price = await stripe.prices.retrieve(priceId);
		return price;
	} catch (err) {
		throw err;
	}
};

export const webhook = async (request) => {
	try {
		const { rawBody, headers } = request;
		const signature = headers["stripe-signature"];

		const event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			STRIPE_WEBHOOK_SIGNATURE
		);

		if (event.type == "charge.succeeded") {
			const receipt_url = event.data?.object?.receipt_url;
			console.log("RECEIPT_URL", receipt_url);
			return "ok";
		}

		const date = new Date();
		console.log(date + ` ${event.type}:`);
		// console.log(util.inspect(event, true, null, true));
		console.log("");

		return "ok";
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const createSubscription = async (body, customerId) => {
	try {
		body.customer = customerId;
		const subCreated = await stripe.subscriptions.create(body);
		return subCreated;
	} catch (err) {
		throw err;
	}
};

export const getAllSubscriptions = async () => {
	try {
		const subscriptions = await stripe.subscriptions.list();
		const subscriptionsDetails = Object.values(subscriptions.data);
		return subscriptionsDetails;
	} catch (err) {
		throw err;
	}
};

export const getSubscription = async (subId) => {
	try {
		const subscription = await stripe.subscriptions.retrieve(subId);
		return subscription;
	} catch (err) {
		throw err;
	}
};

export const deleteSubscription = async (subscriptionId) => {
	try {    
		const deleted = await stripe.subscriptions.del(subscriptionId);
		return deleted;
	} catch (err) {
		throw err;
	}
};

const getAllInvoices = async _ => {
	try {    
			const invoices = await stripe.invoices.list();
			return invoices;
	} catch (err) {
			throw err;
	}
};

const getInvoice = async (invoiceId) => {
	try {
		const invoice = await stripe.invoices.retrieve(invoiceId);
		return invoice;
	} catch (err) {
		throw err;
	}
};

export const getSession = async (sessionId) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		// console.log(session.customer);
		const customer = await getCustomer(session.customer);
		console.log({customer});
		return session;
	} catch (err) {
		throw err;
	}
};

export const createPaymentMethod = async (body) => {
	try {
		const pm = await stripe.paymentMethods.create(body);
		return pm;
	} catch (err) {
		throw err;
	}
};

export const getPaymentMethod = async (paymentMethodId) => {
	try {
		const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
		return pm;
	} catch (err) {
		throw err;
	}
};


export const getAllUserPaymentMethods = async (customerId) => {
	try {
		if (!(await customerExists(customerId))) return { error: "Given customer doesn't exists" };
		const savedCards = await stripe.customers.listPaymentMethods(customerId, {
			type: "card"
		});
		const cardDetails = Object.values(savedCards.data);
		return cardDetails;
	} catch (err) {
		throw err;
	}
};
