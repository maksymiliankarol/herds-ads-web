import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { cancelPublish, finishPublish } from "../lib/ads";

export default function Success() {
  const [params] = useSearchParams();
  const cancelled = params.has("cancelled");

  useEffect(() => {
    if (cancelled) cancelPublish();
    else finishPublish();
  }, [cancelled]);

  return (
    <section className="page width-sm column">
      <p>{cancelled ? "Payment cancelled. You were not charged." : "Payment received. Your ad is scheduled."}</p>
      <Link to="/ads">Back to my ads</Link>
    </section>
  );
}