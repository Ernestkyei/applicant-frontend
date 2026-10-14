
import { apiRequest } from "../services/api";

const API_PAYMENT_BASE = "/api/v1/payments";

export const PAYMENT_ENDPOINTS = {
  VERIFY: "/verify",
  INITIALIZE: "/initialize",
  MY_PAYMENTS: "/my-payments",
} as const;

export interface InitializePaymentPayload {
  [key: string]: unknown;
}

export interface VerifyPaymentParams {
  reference?: string;
  transaction_reference?: string;
}

export const verifyPayment = (params?: VerifyPaymentParams) =>
  apiRequest(
    `${API_PAYMENT_BASE}${PAYMENT_ENDPOINTS.VERIFY}`,
    {
      method: "GET",
      params,
    }
  );

export const initializePayment = (
  payload: InitializePaymentPayload
) =>
  apiRequest(
    `${API_PAYMENT_BASE}${PAYMENT_ENDPOINTS.INITIALIZE}`,
    {
      method: "POST",
      body: payload,
    }
  );

export const getMyPayments = (
  params?: Record<string, unknown>
) =>
  apiRequest(
    `${API_PAYMENT_BASE}${PAYMENT_ENDPOINTS.MY_PAYMENTS}`,
    {
      method: "GET",
      params,
    }
  );