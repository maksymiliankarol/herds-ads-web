import { useState, type SubmitEvent } from "react";
import { get } from "../api";
import type { City } from "../lib/publish";

export default function CityStep({ onPick }: { onPick: (city: City) => void }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[] | null>(null);
  const [error, setError] = useState("");

  async function search(e: SubmitEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    try {
      setCities(await get<City[]>(`/cities?q=${encodeURIComponent(q)}`));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <>
      <form className="column" onSubmit={search}>
        <label>
          City
          <input placeholder="Warsaw..." maxLength={100} value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <button>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {cities?.length === 0 && <p>No cities found</p>}
      {cities && cities.length > 0 && (
        <div className="column gap-sm">
          {cities.map((c) => (
            <button 
              key={c.id}
              type="button" 
              onClick={() => onPick(c)}
              className="city-button secondary"
            >
              {c.title} ({c.country_code})
            </button>
          ))}
        </div>
      )}
    </>
  );
}