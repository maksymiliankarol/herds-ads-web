import { Link } from "react-router";

export default function SavoirVivre() {
  return (
    <section className="page width-md column">
      <nav><Link to="/">Back</Link></nav>
      <h1>Savoir Vivre</h1>
      <p>
        Here&apos;s what we consider a good ad and what we consider a bad one.
        {" "}We hope you&apos;ll publish a good one. It&apos;s a matter of taste.
      </p>
      <div className="column gap-sm">
        <strong>Bad</strong>
        <p className="savoir-card">
          <i>
            🔥🔥🔥 JAZZ!!! ONLY TODAY!!! 🔥🔥🔥 YOU CAN&apos;T MISS THIS!!! BEST CONCERT EVER IN KRAKÓW!!!
            RYNEK!!! 7:30PM!!! BE THERE OR BE SQUARE!!!
          </i>
        </p>
      </div>
      <div className="column gap-sm">
        <strong>Good</strong>
        <p className="savoir-card">
          <i>
            Jazz at the Rynek, Saturday 14 June, 7:30 pm. The Kraków Jazz Quartet plays
            standards and originals under the Town Hall Tower. Free entry.
          </i>
        </p>
      </div>
    </section>
  );
}