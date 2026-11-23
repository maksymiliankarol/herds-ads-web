import { useEffect, useState } from "react";
import { get } from "../api";
import { PUBLISH_HOUR_UTC, publishSlots } from "../lib/publish";

// Shown in UTC so the date always matches the go-live instant
const formatDay = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const HOUR_LABEL = `${String(PUBLISH_HOUR_UTC).padStart(2, "0")}:00 UTC`;

type Props = { roomId: number; onPick: (when: string) => void };

export default function DateStep({ roomId, onPick }: Props) {
  const [slots] = useState(publishSlots);
  const [full, setFull] = useState<string[] | null>(null); // days like "2026-11-24"
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    get<string[]>(`/ads/availability?room_id=${roomId}`, ctrl.signal)
      .then(setFull)
      .catch((e) => {
        if (!ctrl.signal.aborted) setError(e.message);
      });
    return () => ctrl.abort();
  }, [roomId]);

  if (!full) return error ? <p className="error">{error}</p> : <p>Loading...</p>;

  return (
    <>
      <fieldset className="radio-list">
        <legend>Goes live at {HOUR_LABEL}</legend>
        {slots.map((d) => {
          const iso = d.toISOString();
          const isFull = full.includes(iso.slice(0, 10));
          return (
            <label key={iso} className="radio">
              <input
                type="radio"
                name="date"
                disabled={isFull}
                checked={iso === selected}
                onChange={() => setSelected(iso)}
              />
              {formatDay(d)}{isFull && " - full"}
            </label>
          );
        })}
      </fieldset>
      <button type="button" disabled={!selected} onClick={() => selected && onPick(selected)}>Next</button>
    </>
  );
}