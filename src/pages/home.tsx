import { Link } from "react-router"

const links = [
  { to: "/new-ad", label: "New ad" },
  { to: "/savoir-vivre", label: "Savoir vivre" },
  { to: "/editor-guide", label: "Editor guide" },
  { to: "/contact", label: "Contact" },
  { to: "/legal", label: "Legal" }
]

export default function Home() {
  return (
    <section className="page width-sm column">
      <h1>M - Herds Ads</h1>
      <p>Reach people in your city from one place.</p>
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