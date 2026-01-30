# @beworking/stripe-ui

Embeddable Stripe components for Beworking apps. Use with the Beworking Stripe service and the `@beworking/stripe-client` SDK.

## Install
```bash
npm install @beworking/stripe-ui @stripe/react-stripe-js @stripe/stripe-js
```

## Usage (PaymentIntent)
```tsx
import {StripeProvider, PaymentIntentForm} from '@beworking/stripe-ui'

// Fetch clientSecret using @beworking/stripe-client from your backend

<StripeProvider publishableKey={process.env.NEXT_PUBLIC_STRIPE_KEY!} clientSecret={clientSecret}>
  <PaymentIntentForm onSuccess={(pi) => console.log('paid', pi)} />
</StripeProvider>
```

## Usage (Payment Link)
```tsx
import {PaymentLinkButton} from '@beworking/stripe-ui'

<PaymentLinkButton url={paymentLinkUrl} />
```

Components are minimal and headless-friendly; style or wrap as needed.
