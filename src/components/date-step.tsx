import { DAY, toInput } from "../lib/publish";

type Props = { when: string; onChange: (when: string) => void; onNext: () => void };

export default function DateStep({ when, onChange, onNext }: Props) {
  return (
    <>
      <label>
        Goes live
        <input
          type="datetime-local"
          value={when}
          min={toInput(new Date())}
          max={toInput(new Date(Date.now() + 89 * DAY))} // the API allows 90
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <p className="muted">Your ad stays up for 7 days.</p>
      <button type="button" disabled={!when} onClick={onNext}>Next</button>
    </>
  );
}