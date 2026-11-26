import { capitalize } from "./format";

export type City = { id: number; title: string; country_code: string };
export type Room = { id: number; title: string };
export type Price = { amount: number; currency: string };

const HOUR = 60 * 60_000;
const DAY = 24 * HOUR;
export const AD_MIN_LENGTH = 20; // keep in sync with the API schema
export const AD_MAX_LENGTH = 500; // keep in sync with the API schema

// Every ad goes live at this hour (UTC); the API cron publishes it within 30 minutes
export const PUBLISH_HOUR_UTC = 0;
export const AD_LIFETIME = 7 * DAY; // keep in sync with AD_LIFETIME_DAY in the API

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