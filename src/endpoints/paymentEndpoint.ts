import { apiRequest } from "../services/api";

const API_PAYMENT_BASE = `/api/v1/payments`;

export const PAYMENT_ENDPOINTS = {
  VERIFY: `/verify`,
  INITIALIZE: `/initialize`,
  MY_PAYMENTS: `/my-payments`,
} as const;

export const verifyPayment = (params?: Record<string, any>) =>
  apiRequest(`${API_PAYMENT_BASE}${PAYMENT_ENDPOINTS.VERIFY}`, {
    method: "GET",
    params,
  });

export const initializePayment = (payload: any) =>
  apiRequest(`${API_PAYMENT_BASE}${PAYMENT_ENDPOINTS.INITIALIZE}`, {
    method: "POST",
    body: payload,
  });

export const getMyPayments = (params?: Record<string, any>) =>
  apiRequest(`${API_PAYMENT_BASE}${PAYMENT_ENDPOINTS.MY_PAYMENTS}`, {
    method: "GET",
    params,
  });