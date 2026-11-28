import { capitalize } from "./format";

export type City = { id: number; title: string; country_code: string };
export type Room = { id: number; title: string };
export type Price = { amount: number; currency: string };

const HOUR = 60 * 60_000;
const DAY = 24 * HOUR;

export const AD_MIN_LENGTH = 10; // keep in sync with the API schema
export const AD_MAX_LENGTH = 200; // keep in sync with the API schema
export const AD_URL_MAX_LENGTH = 2000; // keep in sync with the API schema
export const AD_URL_TEXT_MAX_LENGTH = 30; // keep in sync with the API schema

// Every ad goes live at midnight UTC (the API rejects any other time) and is pinned for 24h.
// One ad per room per day.
export const PUBLISH_HOUR_UTC = 0;
export const AD_LIFETIME = DAY; // keep in sync with AD_LIFETIME_DAYS in the API

// The next 7 go-live times. Today counts only if it is still at least an hour away,
// so the API (which rejects past dates) never sees a stale pick
export function publishSlots(now = new Date()): Date[] {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), PUBLISH_HOUR_UTC);
  const start = today - now.getTime() >= HOUR ? today : today + DAY;
  return Array.from({ length: 7 }, (_, i) => new Date(start + i * DAY));
}

export const roomName = (title: string) => title.split("_").map(capitalize).join(" / ");

export const formatPrice = ({ amount, currency }: Price) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount / 100);