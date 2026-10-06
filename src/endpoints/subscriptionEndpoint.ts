import { apiRequest } from "../services/api";

const API_SUBSCRIPTION_BASE = `/api/v1/subscriptions`;

export const SUBSCRIPTION_ENDPOINTS = {
  CREATE: `/`,
  MY_SUBSCRIPTION: `/my-subscription`,
  BY_ID: (id: string) => `/${id}`,
};

export const createSubscription = (payload: any) =>
  apiRequest(`${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.CREATE}`, {
    method: "POST",
    body: payload,
  });

export const getMySubscription = () =>
  apiRequest(`${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.MY_SUBSCRIPTION}`, {
    method: "GET",
  });

export const getSubscriptionById = (id: string) =>
  apiRequest(`${API_SUBSCRIPTION_BASE}${SUBSCRIPTION_ENDPOINTS.BY_ID(id)}`, {
    method: "GET",
  });