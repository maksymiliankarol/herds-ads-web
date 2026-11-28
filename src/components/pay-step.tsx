import { useEffect, useState } from "react";
import { get, post } from "../api";
import { AD_LIFETIME, formatPrice, roomName, type City, type Price, type Room } from "../lib/publish";
import { formatUtc } from "../lib/format";

type Props = { content: string; url: string; urlText: string; city: City; room: Room; when: string };

export default function PayStep({ content, url, urlText, city, room, when }: Props) {
  const [price, setPrice] = useState<Price | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
      const { url: checkoutUrl } = await post<{ url: string }>("/ads", {
        content,
        url,
        url_text: urlText,
        room_id: room.id,
        publish_at: when,
      });
      // Only ever send the browser to Stripe's checkout
      if (new URL(checkoutUrl).origin !== "https://checkout.stripe.com") throw new Error("Unexpected payment URL");
      window.location.assign(checkoutUrl);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <>
      <div className="column gap-sm">
        <p>Preview</p>
        <aside className="pinned-ad expandable column" onClick={() => setExpanded((e) => !e)}>
          <small className="muted">Sponsored</small>
          <button type="button" className="pinned-ad-toggle" aria-expanded={expanded}>
            <span className={expanded ? "pinned-ad-text expanded" : "pinned-ad-text"}>{content}</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            onClick={(e) => e.stopPropagation()}
          >
            {urlText}
          </a>
        </aside>
      </div>
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