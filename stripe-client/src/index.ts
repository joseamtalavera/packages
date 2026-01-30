export type CreatePaymentIntentRequest = {
  amount: number;
  currency: string;
  tenant?: string;
  reference: string;
  description?: string;
  customerEmail?: string;
  idempotencyKey?: string;
};

export type CreatePaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
};

export type CreatePaymentLinkRequest = {
  amount: number;
  currency: string;
  tenant?: string;
  reference: string;
  productName: string;
  quantity?: number;
  successUrl: string;
  cancelUrl: string;
  idempotencyKey?: string;
};

export type CreatePaymentLinkResponse = {
  paymentLinkId: string;
  url: string;
};

export type WebhookEventAck = {
  status: string;
  type?: string;
  eventId?: string;
  outcome?: string;
  paymentIntentId?: string;
};

export class StripeClient {
  private readonly baseUrl: string;

  constructor(options: { baseUrl: string }) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
  }

  async createPaymentIntent(
    payload: CreatePaymentIntentRequest,
    init?: RequestInit
  ): Promise<CreatePaymentIntentResponse> {
    const res = await fetch(`${this.baseUrl}/api/payment-intents`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      body: JSON.stringify({
        amount: payload.amount,
        currency: payload.currency,
        tenant: payload.tenant,
        reference: payload.reference,
        description: payload.description,
        customer_email: payload.customerEmail,
        idempotency_key: payload.idempotencyKey,
      }),
      ...init,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`createPaymentIntent failed: ${res.status} ${text}`);
    }
    return (await res.json()) as CreatePaymentIntentResponse;
  }

  async createPaymentLink(
    payload: CreatePaymentLinkRequest,
    init?: RequestInit
  ): Promise<CreatePaymentLinkResponse> {
    const res = await fetch(`${this.baseUrl}/api/payment-links`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      body: JSON.stringify({
        amount: payload.amount,
        currency: payload.currency,
        tenant: payload.tenant,
        reference: payload.reference,
        product_name: payload.productName,
        quantity: payload.quantity ?? 1,
        success_url: payload.successUrl,
        cancel_url: payload.cancelUrl,
        idempotency_key: payload.idempotencyKey,
      }),
      ...init,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`createPaymentLink failed: ${res.status} ${text}`);
    }
    return (await res.json()) as CreatePaymentLinkResponse;
  }
}
