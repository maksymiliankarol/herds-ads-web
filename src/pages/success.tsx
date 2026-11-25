import { Link, useSearchParams } from "react-router";

export default function Success() {
  const cancelled = useSearchParams()[0].has("cancelled");

  return (
    <section className="page width-sm column">
      <nav><Link to="/">Back</Link></nav>
      <h1>{cancelled ? "Canceled" : "Success!"}</h1>
      <p>{cancelled ? "Payment cancelled. You were not charged." : "Payment received. Your ad is scheduled."}</p>
    </section>
  );
}