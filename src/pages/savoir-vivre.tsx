import { Link } from "react-router";

export default function SavoirVivre() {
  return (
    <section className="page width-md column">
      <nav><Link to="/">Back</Link></nav>
      <p>
        Here&apos;s what we consider a good ad and what we consider a bad one.
        {" "}We hope you&apos;ll publish a good one. It&apos;s a matter of taste.
      </p>
      <div className="column gap-sm">
        <strong>Bad</strong>
        <p className="savoir-card">
          <i>
            🔥🔥🔥 JAZZ!!! ONLY TODAY!!! 🔥🔥🔥<br />
            YOU CAN&apos;T MISS THIS!!! BEST CONCERT EVER IN KRAKÓW!!!<br />
            RYNEK!!! 7:30PM!!! BE THERE OR BE SQUARE!!!<br />
            ❗❗❗ LIMITED SPACE ❗❗❗<br />
            HURRY!!! SHARE WITH 10 FRIENDS!!! NEVER AGAIN!!!<br />
            🎷🎷🎷 CLICK NOW!!! 🎷🎷🎷
          </i>
        </p>
      </div>
      <div className="column gap-sm">
        <strong>Good</strong>
        <p className="savoir-card">
          <i>
            Jazz at the Rynek<br />
            An evening under the Town Hall Tower<br />
            <br />
            Saturday, 14 June, 7:30 pm<br />
            Main Square, Kraków<br />
            <br />
            The Kraków Jazz Quartet plays standards and originals as the sun
            sets over the Cloth Hall. Bring a friend, find a seat on the steps,
            and let the music do the rest. Free entry.<br />
          </i>
        </p>
      </div>
    </section>
  );
}