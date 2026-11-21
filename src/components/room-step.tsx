import { useEffect, useState } from "react";
import { get } from "../api";
import { capitalize } from "../lib/format";
import { roomName, type City, type Room } from "../lib/publish";

type Node = Room & { label: string; children: Node[] };

// `food_child` is a child of `food`. A child whose parent doesn't exist
// is shown at the top level with its full name.
function buildTree(rooms: Room[]): Node[] {
  const nodes = new Map(rooms.map((r) => [r.title, { ...r, label: "", children: [] as Node[] }]));
  const roots: Node[] = [];

  for (const node of nodes.values()) {
    const cut = node.title.lastIndexOf("_");
    const parent = cut === -1 ? undefined : nodes.get(node.title.slice(0, cut));

    if (parent) {
      node.label = capitalize(node.title.slice(cut + 1));
      parent.children.push(node);
    } else {
      node.label = roomName(node.title);
      roots.push(node);
    }
  }

  return roots;
}

type OptionsProps = { nodes: Node[]; selected: number | null; onSelect: (id: number) => void; root?: boolean };

function Options({ nodes, selected, onSelect, root }: OptionsProps) {
  return (
    <ul className={root ? "tree" : undefined}>
      {nodes.map((n) => (
        <li key={n.id}>
          <label className="radio">
            <input type="radio" name="room" checked={n.id === selected} onChange={() => onSelect(n.id)} />
            {n.label}
          </label>
          {n.children.length > 0 && <Options nodes={n.children} selected={selected} onSelect={onSelect} />}
        </li>
      ))}
    </ul>
  );
}

type Props = { city: City; onPick: (room: Room) => void };

export default function RoomStep({ city, onPick }: Props) {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
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

  const room = rooms?.find((r) => r.id === selected);

  return (
    <>
      {error && <p className="error">{error}</p>}
      {!rooms && !error && <p>Loading...</p>}
      {rooms?.length === 0 && <p>No rooms yet</p>}
      {rooms && rooms.length > 0 && (
        <>
          <fieldset className="radio-list">
            <legend>Pick a room in <strong>{city.title}</strong></legend>
            <Options nodes={buildTree(rooms)} selected={selected} onSelect={setSelected} root />
          </fieldset>
          <button type="button" disabled={!room} onClick={() => room && onPick(room)}>Next</button>
        </>
      )}
    </>
  );
}