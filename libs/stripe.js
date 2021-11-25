const { SECRET_STRIPE_KEY } = process.env;
const stripe = require('stripe')(SECRET_STRIPE_KEY);


// const createAccount = async (type, email) => {
//     try {
//       const StripeAccountCreated = await stripe.accounts.create({
//         type: type,
//         email: email
//       });
//       const accountCreated = {
//         accountId: StripeAccountCreated.id,
//         accountType: StripeAccountCreated.type,
//         accountEmail: StripeAccountCreated.email
//     }
//       return accountCreated;
//     } catch (err) {
//         throw err;
//     }
// };

// const getAllAccounts = async _ => {
//   try {
//       const accounts = await stripe.accounts.list();
//       return accounts;
//   } catch (err) {
//       throw err;
//   }
// };

// const getAccount = async accountId => {
//   try {
//       const account = await stripe.accounts.retrieve(accountId);
//       return account
//   } catch (err) {
//       throw err;
//   }
// };

// const deleteAccount = async accountId => {
//   try {
//       const account = await stripe.accounts.del(accountId);
//       return account;
//   } catch (err) {
//       throw err;
//   }
// };

const createCustomer = async (email, lastName) => {
  try {    
      const customerCreated = await stripe.customers.create({
          email,
          name: lastName
      });
      return {
      // customerDetails: customer,
      customerId: customerCreated.id,
      customerEmail: customerCreated.email,
      customerName: customerCreated.name
      }   
  } catch (err) {
      throw err;
  }
};

const getAllCustomers = async () => {
  try {
      const customers = [];
      const savedCustomers = await stripe.customers.list();     
      const customerDetails  = Object.values(savedCustomers.data);

      customerDetails.forEach((customerData) => {
        const obj = {
          customerId: customerData.id,
          customerEmail: customerData.email,
          customerName: customerData.name,
          customerType: customerData.type
        };
        customers.push(obj);
      });
      return customers;
  } catch (err) {
      throw err;
  }
};

const getCustomer = async (customerId) => {
    try {
        const customer = await stripe.customers.retrieve(customerId);
        return customer; 
    } catch (err) {
        throw err;
    }
};

const updateCustomer = async (customerId, updates) => {
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

const deleteCustomer = async (customerId) => {
    try {
        const customer = await stripe.customers.del(customerId);
        return customer;   
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

const createCardToken = async (newCard) => {
  try {
    if (!newCard.cardNumber || !newCard.cardExpMonth || !newCard.cardExpYear || !newCard.cardCVC) {
        return { error: "Please Provide All Necessary Details to create the card token" };
    }
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

const addNewCardToCustomer = async (newCard, stripeId) => {
  try {
      if (!(await customerExists(stripeId))) return { error: "Given customer doesn't exists" };
      const cardToken = await createCardToken(newCard);
      if (cardToken.error) return { error: cardToken.error };
      const card = await stripe.customers.createSource(stripeId, {
        source: `${cardToken.id}`
      });
      //TODO controllo su card
      return card;
  } catch (err) {
      throw err;
  }
};

const deleteCardFromCustomer = async (stripeId, cardId) => {
  try {     
      if (!(await customerExists(stripeId))) return { error: "Given customer doesn't exists" };
      const deletedCard = await stripe.customers.deleteSource(stripeId, cardId);
      return deletedCard;
  } catch (err) {
      throw err;
  }
};

const getAllUserCards = async (stripeId) => {
  try {
      const cards = [];
      if (!(await customerExists(stripeId))) return { error: "Given customer doesn't exists" };
      const savedCards = await stripe.customers.listSources(stripeId, {
        object: "card",
      });
      const cardDetails = Object.values(savedCards.data);
  
      cardDetails.forEach((cardData) => {
        let obj = {
          cardId: cardData.id,
          cardType: cardData.brand,
          cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
          cardLast4: cardData.last4,
        };
        cards.push(obj);
      });
      return cards;
  } catch (err) {
      throw err;
  }
};

const charge = async (params) => {
  try {     
    //TODO: controlla amount in ingresso
    const charged = await stripe.charges.create(params);
    return charged;
  } catch (err) {
      throw err;
  }
};


const createNewProduct = async product => {
  try {    
    const productCreated = await stripe.products.create(product);
    return productCreated;
  } catch (err) {
      throw err;
    }
};

const retrieveProduct = async productId => {
  try {    
    const product = await stripe.products.retrieve(productId);
    return product;
  } catch (err) {
      throw err;
    }
};

const retrieveAllProducts = async _ => {
  try {    
    const products = await stripe.products.list();
    return products;
  } catch (err) {
      throw err;
    }
};

const deleteProduct = async productId => {
  try {    
    const deleted = await stripe.products.del(productId);
    return deleted;
  } catch (err) {
      throw err;
    }
};


const createPrice = async body => {
  try {
    if(!body.unit_amount || !body.currency  || !body.recurring || !body.product) return { error: "Missing information" };
    const newBody = {
      unit_amount: body.unit_amount * 100,
      currency: body.currency,
      recurring: body.recurring,
      product: body.product
    }
    const price = await stripe.prices.create(newBody);
    if(!price) return { err: "Price creation failed" };
    return price;
  } catch (err) {
      throw err;
    }
};

const retrievePrice = async priceId => {
  try {    
    const price = await stripe.prices.retrieve(priceId);
    return price;
  } catch (err) {
      throw err;
    }
};


const retrieveAllPrices = async _ => {
  try {    
    const prices = await stripe.prices.list();
    return prices;
  } catch (err) {
      throw err;
    }
};

const createSubscription = async subscription => {
  try {    
    const subCreated = await stripe.subscriptions.create(subscription);
    return subCreated;
  } catch (err) {
      throw err;
    }
};

const retrieveSubscription = async subId => {
  try {    
    const subscription = await stripe.subscriptions.retrieve(subId);
    return subscription;
  } catch (err) {
      throw err;
    }
};

const retrieveAllSubscriptions = async _ => {
  try {    
    const subscriptions = await stripe.subscriptions.list();
    return subscriptions;
  } catch (err) {
      throw err;
    }
};

const deleteSubscription = async subId => {
  try {    
    const deleted = await stripe.subscriptions.del(subId);
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

module.exports = {
  createCustomer,
  createCardToken,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  addNewCardToCustomer,
  deleteCardFromCustomer,
  getAllUserCards,
  charge,
  createNewProduct,
  retrieveProduct,
  retrieveAllProducts,
  deleteProduct,
  createPrice,
  retrievePrice,
  retrieveAllPrices,
  createSubscription,
  retrieveSubscription,
  retrieveAllSubscriptions,
  deleteSubscription,
  getAllInvoices,
  getInvoice
}