import { Link } from "react-router"

const links = [
  { to: "/my-ads", label: "My ads" },
  { to: "/contact", label: "Contact" },
  { to: "/terms", label: "Terms" }
]

export default function Home() {
  return (
    <section className="page width-sm column">
      <p>Welcome to <strong>M - Herds Ads.</strong> You can advertise across cities here.</p>
      <div>
        {links.map(({ to, label }) => (
          <p key={to}>
            <Link to={to}>{label}</Link>
          </p>
        ))}
      </div>
    </section>
  )
}