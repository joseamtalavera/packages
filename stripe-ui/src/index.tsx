import React from 'react'
import {loadStripe, Stripe} from '@stripe/stripe-js'
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'

type StripeProviderProps = {
  publishableKey: string
  clientSecret: string
  children: React.ReactNode
}

export const StripeProvider: React.FC<StripeProviderProps> = ({publishableKey, clientSecret, children}) => {
  const stripePromise = React.useMemo(() => loadStripe(publishableKey), [publishableKey])

  return (
    <Elements stripe={stripePromise} options={{clientSecret}}>
      {children}
    </Elements>
  )
}

type PaymentIntentFormProps = {
  onSuccess?: (piId: string) => void
  onError?: (message: string) => void
  submitLabel?: string
}

export const PaymentIntentForm: React.FC<PaymentIntentFormProps> = ({onSuccess, onError, submitLabel = 'Pay'}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError(null)

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    })

    setLoading(false)

    if (result.error) {
      const msg = result.error.message || 'Payment failed'
      setError(msg)
      onError?.(msg)
    } else if (result.paymentIntent) {
      onSuccess?.(result.paymentIntent.id)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
      <button type="submit" disabled={!stripe || loading} style={{marginTop: 12}}>
        {loading ? 'Processing…' : submitLabel}
      </button>
    </form>
  )
}

type PaymentLinkButtonProps = {
  url: string
  label?: string
}

export const PaymentLinkButton: React.FC<PaymentLinkButtonProps> = ({url, label = 'Pay'}) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <button type="button">{label}</button>
    </a>
  )
}

export type StripeComponents = {
  stripe: Stripe | null
}
