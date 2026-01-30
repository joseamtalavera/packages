# @beworking/stripe-client

Typed client for the Beworking Stripe service.

## Install
```bash
npm install @beworking/stripe-client
```

## Usage
```ts
import { StripeClient } from '@beworking/stripe-client'

const client = new StripeClient({ baseUrl: 'https://payments.example.com' })

const intent = await client.createPaymentIntent({
  amount: 5000,
  currency: 'eur',
  reference: 'order-123',
  tenant: 'tenant-a',
})

console.log(intent.clientSecret)
```

```ts
const link = await client.createPaymentLink({
  amount: 5000,
  currency: 'eur',
  reference: 'order-123',
  tenant: 'tenant-a',
  productName: 'Desk booking',
  successUrl: 'https://app.example.com/success',
  cancelUrl: 'https://app.example.com/cancel',
})

console.log(link.url)
```

Configure `baseUrl` to point at your FastAPI Stripe service deployment.
