import { useEffect, useState } from "react";
import { get } from "../api";
import { roomName, type City, type Room } from "../lib/publish";

type Props = { city: City; onPick: (room: Room) => void };

export default function RoomStep({ city, onPick }: Props) {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    get<Room[]>(`/rooms?city_id=${city.id}`, ctrl.signal)
      .then((list) => setRooms(list.sort((a, b) => a.title.localeCompare(b.title))))
      .catch((e) => {
        if (!ctrl.signal.aborted) setError(e.message);
      });
    return () => ctrl.abort();
  }, [city.id]);

  return (
    <>
      <p>Pick a room in <strong>{city.title}</strong>:</p>
      {error && <p className="error">{error}</p>}
      {!rooms && !error && <p>Loading...</p>}
      {rooms?.length === 0 && <p>No rooms yet</p>}
      <ul>
        {rooms?.map((r) => (
          <li key={r.id}>
            <button type="button" onClick={() => onPick(r)}>{roomName(r.title)}</button>
          </li>
        ))}
      </ul>
    </>
  );
}