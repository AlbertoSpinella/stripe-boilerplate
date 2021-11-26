# Stripe boilerplate

## Content
- Stripe APIs.

## Events to intercept w/ webhook
- Customer creation:
    - `customer.created`
- Customer update:
    - `customer.updated`
- Customer delete:
    - `customer.deleted`
- Customer add card:
    - `customer.source.created`
    - `payment_method.attached`
    - `customer.updated`
- Customer remove card:
    - `customer.source.deleted`
    - `payment_method.detached`
    - `customer.updated`
- Subscription create:
    - `charge.succeeded`
    - `invoice.created`
    - `invoice.finalized`
    - `invoice.paid`
    - `invoice.payment_succeeded`
    - `customer.subscription.created`
    - `payment_intent.created`
    - `payment_intent.succeeded`
- Subscription delete:
    - `customer.subscription.deleted`
- Subscription AUTO renewal (invoice not confirmed):
    - `invoice.created`, with billing_reason: subscription_cycle
    - `customer.subscription.updated`
    - More incoming