const KEY = "herds-ads";
const PENDING = "herds-pending"; // sessionStorage: the publication being paid for right now

// at = go-live time in ms
export type Publication = { city: string; room: string; at: number };
export type Ad = { id: string; title: string; text: string; updated: number; published: Publication[] };

const isPublication = (p: unknown): p is Publication =>
  typeof (p as Publication)?.city === "string" &&
  typeof (p as Publication).room === "string" &&
  typeof (p as Publication).at === "number";

// localStorage can hold anything (or be edited by hand), so keep only well-formed entries
function read(): Ad[] {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(data)) return [];
    return data
      .filter((a) => typeof a?.id === "string" && typeof a.text === "string" && typeof a.updated === "number")
      .map((a) => ({
        id: a.id,
        title: typeof a.title === "string" ? a.title : "",
        text: a.text,
        updated: a.updated,
        published: Array.isArray(a.published) ? a.published.filter(isPublication) : [],
      }));
  } catch {
    return [];
  }
}

function write(ads: Ad[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ads));
  } catch {
    // Storage full or blocked (private mode): the editor keeps working, it just won't persist
  }
}

export const listAds = () => read().sort((a, b) => b.updated - a.updated);
export const getAd = (id: string) => read().find((a) => a.id === id);

export function saveAd(ad: Pick<Ad, "id" | "title" | "text">) {
  const published = getAd(ad.id)?.published ?? [];
  write([...read().filter((a) => a.id !== ad.id), { ...ad, updated: Date.now(), published }]);
}

export const deleteAd = (id: string) => write(read().filter((a) => a.id !== id));

// --- Publishing: pending before Stripe, committed after /success ---

export function startPublish(adId: string, publication: Publication) {
  try {
    sessionStorage.setItem(PENDING, JSON.stringify({ adId, ...publication }));
  } catch {
    // Blocked storage: the ad still gets published, we just can't list it
  }
}

export function cancelPublish() {
  try {
    sessionStorage.removeItem(PENDING);
  } catch {
    // ignore
  }
}

export function finishPublish() {
  try {
    const pending = JSON.parse(sessionStorage.getItem(PENDING) ?? "null");
    cancelPublish();
    if (typeof pending?.adId !== "string" || !isPublication(pending)) return;

    const { adId, city, room, at } = pending;
    write(read().map((a) => (a.id === adId ? { ...a, published: [...a.published, { city, room, at }] } : a)));
  } catch {
    // ignore a corrupted pending value
  }
}