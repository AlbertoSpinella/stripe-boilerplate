# Stripe boilerplate

## Content
- Stripe APIs.

## Events to intercept w/ webhook
- Customer creation (from BE):
    - `customer.created`
- Customer update (from BE):
    - `customer.updated`
- Customer delete (from BE):
    - `customer.deleted`
- Customer add card (from BE):
    - `customer.source.created`
    - `payment_method.attached`
    - `customer.updated`
- Customer remove card (from BE):
    - `customer.source.deleted`
    - `payment_method.detached`
    - `customer.updated`
- Subscription create (from BE):
    - `charge.succeeded`
    - `invoice.created`
    - `invoice.finalized`
    - `invoice.paid`
    - `invoice.payment_succeeded`
    - `customer.subscription.created`
    - `payment_intent.created`
    - `payment_intent.succeeded`
- Subscription delete (from BE):
    - `customer.subscription.deleted`
- Subscription AUTO renewal (invoice not confirmed):
    - `invoice.created`, with billing_reason: subscription_cycle
    - `customer.subscription.updated`
    - More incoming

- Payment from FE (create customer, add payment method, create subscription):
    - `customer.created`
    - `payment_method.attached`
    - `checkout.session.completed`
    - `customer.updated`
    - `invoice.created`
    - `invoice.finalized`
    - `customer.subscription.created`
    - `invoice.updated`
    - `customer.subscription.updated`
    - `invoice.paid`
    - `invoice.payment_succeeded`
    - `payment_intent.succeeded`
    - `payment_intent.created`
    - `charge.succeeded`