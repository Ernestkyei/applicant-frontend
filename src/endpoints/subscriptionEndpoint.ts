import { apiRequest } from "../services/api";

const API_SUBSCRIPTION_BASE = "/api/v1/subscriptions";

export const SUBSCRIPTION_ENDPOINTS = {
  CREATE: "/",
  AVAILABLE_PACKAGES: "/packages",
  MY_SUBSCRIPTION: "/my-subscription",
  BY_ID: (id: string) => `/${id}`,
} as const;

export const getAvailablePackages = () =>
  apiRequest(
    `${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.AVAILABLE_PACKAGES}`,
    { method: "GET" }
  );

export const createSubscription = (payload: any) =>
  apiRequest(`${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.CREATE}`, {
    method: "POST",
    body: payload,
  });

export const getMySubscription = () =>
  apiRequest(
    `${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.MY_SUBSCRIPTION}`,
    { method: "GET" }
  );

export const getSubscriptionById = (id: string) =>
  apiRequest(`${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.BY_ID(id)}`, {
    method: "GET",
  });