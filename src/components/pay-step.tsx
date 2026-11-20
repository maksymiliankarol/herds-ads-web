import { useState } from "react";
import { post } from "../api";
import { PRICE, roomName, type City, type Room } from "../lib/publish";
import { startPublish } from "../lib/ads";

type Props = { adId: string; content: string; city: City; room: Room; when: string };

export default function PayStep({ adId, content, city, room, when }: Props) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const { url } = await post<{ url: string }>("/ads", {
        content,
        room_id: room.id,
        publish_at: new Date(when).toISOString(),
      });
      // Only ever send the browser to Stripe's checkout
      if (new URL(url).origin !== "https://checkout.stripe.com") throw new Error("Unexpected payment URL");
      startPublish(adId, { city: city.title, room: roomName(room.title), at: new Date(when).getTime() });
      window.location.assign(url);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <>
      <p>Summary</p>
      <ul>
        <li>City: {city.title}</li>
        <li>Room: {roomName(room.title)}</li>
        <li>Goes live: {new Date(when).toLocaleString()}</li>
        <li>Stays up for 7 days</li>
        <li>Price: {PRICE}</li>
      </ul>
      {error && <p className="error">{error}</p>}
      <button type="button" disabled={busy} onClick={pay}>
        {busy ? "Redirecting..." : `Pay ${PRICE}`}
      </button>
    </>
  );
}