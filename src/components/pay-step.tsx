import { useEffect, useState } from "react";
import { get, post } from "../api";
import { AD_LIFETIME, formatPrice, roomName, type City, type Price, type Room } from "../lib/publish";
import { formatUtc } from "../lib/format";

type Props = { content: string; city: City; room: Room; when: string };

export default function PayStep({ content, city, room, when }: Props) {
  const [price, setPrice] = useState<Price | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    get<Price>(`/ads/price?room_id=${room.id}`, ctrl.signal)
      .then(setPrice)
      .catch((e) => {
        if (!ctrl.signal.aborted) setError(e.message);
      });
    return () => ctrl.abort();
  }, [room.id]);

  const label = price ? formatPrice(price) : "...";

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const { url } = await post<{ url: string }>("/ads", {
        content,
        room_id: room.id,
        publish_at: when,
      });
      // Only ever send the browser to Stripe's checkout
      if (new URL(url).origin !== "https://checkout.stripe.com") throw new Error("Unexpected payment URL");
      window.location.assign(url);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <>
      <div className="column gap-sm">
        <p>Summary</p>
        <ul>
          <li>City: {city.title}</li>
          <li>Room: {roomName(room.title)}</li>
          <li>Goes live: {formatUtc(new Date(when))}</li>
          <li>Ends at: {formatUtc(new Date(new Date(when).getTime() + AD_LIFETIME))}</li>
          <li>Price: {label}</li>
        </ul>
      </div>
      {error && <p className="error">{error}</p>}
      <button type="button" disabled={busy || !price} onClick={pay}>
        {busy ? "Redirecting..." : `Pay - ${label}`}
      </button>
    </>
  );
}