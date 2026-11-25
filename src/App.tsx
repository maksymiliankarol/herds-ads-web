import { Link, Route, Routes } from "react-router";
import logo from "./assets/logo.svg";
import Home from "./pages/home";
import Success from "./pages/success";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";
import NewAd from "./pages/new-ad";
import SavoirVivre from "./pages/savoir-vivre";
import EditorGuide from "./pages/editor-guide";
import Legal from "./pages/legal";

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
          <Route path="/editor-guide" element={<EditorGuide />} />
          <Route path="/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}