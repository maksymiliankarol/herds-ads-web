import { useState } from "react";
import { Link, useParams } from "react-router";
import { getAd } from "../lib/ads";
import { defaultWhen, type City, type Room } from "../lib/publish";
import AdStep from "../components/ad-step";
import CityStep from "../components/city-step";
import RoomStep from "../components/room-step";
import DateStep from "../components/date-step";
import PayStep from "../components/pay-step";


const STEPS = 5;

export default function Publish() {
  const { id } = useParams();
  const [ad] = useState(() => getAd(id!));
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<City | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [when, setWhen] = useState(defaultWhen);

  if (!ad?.text.trim()) {
    return (
      <section className="page width-sm column">
        <Link to="/ads">Back</Link>
        <p>Nothing to publish. Write something first.</p>
      </section>
    );
  }

  return (
    <section className="page width-sm column">
      {step === 0 ? (
        <Link to="/ads">Back</Link>
      ) : (
        <button type="button" onClick={() => setStep(step - 1)}>Back</button>
      )}
      <small>Step {step + 1} of {STEPS}</small>

      {step === 0 && <AdStep text={ad.text} onNext={() => setStep(1)} />}
      {step === 1 && (
        <CityStep
          onPick={(c) => {
            setCity(c);
            setRoom(null); // a new city means a new room
            setStep(2);
          }}
        />
      )}
      {step === 2 && city && (
        <RoomStep
          city={city}
          onPick={(r) => {
            setRoom(r);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <DateStep when={when} onChange={setWhen} onNext={() => setStep(4)} />}
      {step === 4 && city && room && <PayStep adId={id!} content={ad.text} city={city} room={room} when={when} />}
    </section>
  );
}