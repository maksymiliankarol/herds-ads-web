import { capitalize } from "./format";

export type City = { id: number; title: string; country_code: string };
export type Room = { id: number; title: string };

export const PRICE = "$5.00"; // keep in sync with AD_PRICE in the API
export const MINUTE = 60_000;
export const DAY = 24 * 60 * MINUTE;

// <input type="datetime-local"> wants local time as YYYY-MM-DDTHH:mm
export const toInput = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * MINUTE).toISOString().slice(0, 16);

// The API rejects past dates, so default to a few minutes ahead
export const defaultWhen = () => toInput(new Date(Date.now() + 10 * MINUTE));

export const roomName = (title: string) => title.split("_").map(capitalize).join(" / ");