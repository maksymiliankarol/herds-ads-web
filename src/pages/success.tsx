import { Link, useSearchParams } from "react-router";

export default function Success() {
  const cancelled = useSearchParams()[0].has("cancelled");

  return (
    <section className="page width-sm column">
      <nav><Link to="/">Back</Link></nav>
      <p>{cancelled ? "Payment cancelled. You were not charged." : "Payment received. Your ad is scheduled."}</p>
      <Link to="/">{cancelled ? "Back" : "Create another ad"}</Link>
    </section>
  );
}