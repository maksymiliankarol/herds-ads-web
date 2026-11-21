export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatUtc = (d: Date) =>
  d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC";