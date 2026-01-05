import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToneProvider from "./theme/ToneProvider";
import AnimatedWallpaper from "./components/visual/AnimatedWallpaper";
import MouseSpotlight from "./components/visual/MouseSpotlight";
import ScrollLuxuryBottom from "./components/system/ScrollLuxuryBottom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Insights from "./pages/Insights";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Privacy from "./pages/Privacy";
import Aksarben from "./pages/work/Aksarben";
import ClassyRoofs from "./pages/work/ClassyRoofs";
import TripleWRentals from "./pages/work/TripleWRentals";
import RocketBaller from "./pages/work/RocketBaller";
import CentreDentaire from "./pages/work/CentreDentaire";
import EliteBarbershop from "./pages/work/EliteBarbershop";
import CultureBarbershop from "./pages/work/CultureBarbershop";

function App() {
  return (
    <Router>
      <ScrollLuxuryBottom />
      <ToneProvider>
        <div className="viewport-floor" aria-hidden="true" />
        <AnimatedWallpaper />
        <MouseSpotlight />
        <div className="depth-grain" aria-hidden="true" />
        <div className="depth-vignette" aria-hidden="true" />
        <div className="min-h-screen relative z-10 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/aksarben-locksmiths" element={<Aksarben />} />
            <Route path="/work/classy-roofs" element={<ClassyRoofs />} />
            <Route path="/work/triple-w-rentals" element={<TripleWRentals />} />
            <Route path="/work/rocket-baller" element={<RocketBaller />} />
            <Route path="/work/centre-dentaire" element={<CentreDentaire />} />
            <Route path="/work/elite-barbershop" element={<EliteBarbershop />} />
            <Route path="/work/culture-barbershop" element={<CultureBarbershop />} />
            <Route path="/services" element={<Services />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
          <Footer />
        </div>
      </ToneProvider>
    </Router>
  );
}

export default App;
