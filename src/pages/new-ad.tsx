import { useState } from "react";
import type { City, Room } from "../lib/publish";
import EditorStep from "../components/editor-step";
import CityStep from "../components/city-step";
import RoomStep from "../components/room-step";
import DateStep from "../components/date-step";
import PayStep from "../components/pay-step";

const STEPS = 5;

export default function NewAd() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const [city, setCity] = useState<City | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [when, setWhen] = useState<string | null>(null);

  // Steps stay mounted and are only hidden, so each keeps its own state when you go back
  return (
    <>
      <div hidden={step !== 0}>
        <EditorStep text={text} onChange={setText} onNext={() => setStep(1)} />
      </div>

      <section className="page width-sm column" hidden={step === 0}>
        <nav>
          <button type="button" className="text" onClick={() => setStep(step - 1)}>Back</button>
        </nav>
        <small className="muted">Step {step + 1} of {STEPS}</small>

        <div className="column" hidden={step !== 1}>
          <CityStep
            onPick={(c) => {
              if (c.id !== city?.id) setRoom(null); // a different city means a different room
              setCity(c);
              setStep(2);
            }}
          />
        </div>

        <div className="column" hidden={step !== 2}>
          {/* key: a different city remounts the step, which clears its selection */}
          {city && (
            <RoomStep
              key={city.id}
              city={city}
              onPick={(r) => {
                setRoom(r);
                setStep(3);
              }}
            />
          )}
        </div>

        <div className="column" hidden={step !== 3}>
          {room && (
            <DateStep
              key={room.id}
              roomId={room.id}
              onPick={(w) => {
                setWhen(w);
                setStep(4);
              }}
            />
          )}
        </div>

        {step === 4 && city && room && when && (
          <PayStep content={text} city={city} room={room} when={when} />
        )}
      </section>
    </>
  );
}