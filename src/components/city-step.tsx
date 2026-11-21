import { useEffect, useState } from "react";
import { get } from "../api";
import type { City } from "../lib/publish";

export default function CityStep({ onPick }: { onPick: (city: City) => void }) {
  const [q, setQ] = useState("");
  const [cities, setCities] = useState<City[] | null>(null); // null = nothing searched yet
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState("");

  // If new results don't include the selected city, there is no selection
  const city = cities?.find((c) => c.id === selected);

  useEffect(() => {
    const query = q.trim();
    if (!query) {
      setCities(null);
      setError("");
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      get<City[]>(`/cities?q=${encodeURIComponent(query)}`, ctrl.signal)
        .then((result) => {
          setCities(result);
          setError("");
        })
        .catch((e) => {
          if (!ctrl.signal.aborted) setError(e.message);
        });
    }, 300);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [q]);

  return (
    <>
      <label>
        City
        <input placeholder="Warsaw..." maxLength={100} value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      {error && <p className="error">{error}</p>}
      {cities?.length === 0 && <p>No cities found</p>}
      {cities && cities.length > 0 && (
        <>
          <fieldset className="radio-list">
            {cities.map((c) => (
              <label key={c.id} className="radio">
                <input
                  type="radio"
                  name="city"
                  checked={c.id === selected}
                  onChange={() => setSelected(c.id)}
                />
                {c.title} ({c.country_code})
              </label>
            ))}
          </fieldset>
        </>
      )}
      <button 
        type="button" 
        disabled={!city} 
        onClick={() => city && onPick(city)}
      >
        Next
      </button>
    </>
  );
}