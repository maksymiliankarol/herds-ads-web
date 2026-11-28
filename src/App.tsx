import { Link, Route, Routes } from "react-router";
import logo from "./assets/logo.svg";
import Home from "./pages/home";
import NewAd from "./pages/new-ad";
import SavoirVivre from "./pages/savoir-vivre";
import Settings from "./pages/settings";
import Success from "./pages/success";
import Contact from "./pages/contact";
import Legal from "./pages/legal";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <>
      <header>
        <nav>
          <a href="https://metalogrom.com" target="_blank" rel="noopener">
            <img src={logo} width="24" alt="Metalogrom" />
          </a>
          {"/"}
          <Link to="/">M - Herds Ads</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-ad" element={<NewAd />} />
          <Route path="/savoir-vivre" element={<SavoirVivre />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}