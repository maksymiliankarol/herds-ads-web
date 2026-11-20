import { Link, Route, Routes } from "react-router";
import logo from "./assets/logo.svg";
import Home from "./pages/home";
import Editor from "./pages/editor";
import Publish from "./pages/publish";
import Success from "./pages/success";
import Contact from "./pages/contact";
import Terms from "./pages/terms";
import NotFound from "./pages/not-found";
import Ads from "./pages/ads";

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
          <Route path="/ads" element={<Ads />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/publish/:id" element={<Publish />} />
          <Route path="/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}