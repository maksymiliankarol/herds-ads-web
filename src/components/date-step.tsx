import { useState } from "react";
import { PUBLISH_HOUR_UTC, publishSlots } from "../lib/publish";

// Shown in UTC so the date always matches the go-live instant
const formatDay = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const HOUR_LABEL = `${String(PUBLISH_HOUR_UTC).padStart(2, "0")}:00 UTC`;

export default function DateStep({ onPick }: { onPick: (when: string) => void }) {
  const [slots] = useState(publishSlots);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <fieldset className="radio-list">
        <legend>Goes live at {HOUR_LABEL}</legend>
        {slots.map((d) => {
          const iso = d.toISOString();
          return (
            <label key={iso} className="radio">
              <input type="radio" name="date" checked={iso === selected} onChange={() => setSelected(iso)} />
              {formatDay(d)}
            </label>
          );
        })}
      </fieldset>
      <button type="button" disabled={!selected} onClick={() => selected && onPick(selected)}>Next</button>
    </>
  );
}