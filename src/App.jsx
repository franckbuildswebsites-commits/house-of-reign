import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import DesignServices from "./components/DesignServices";
import Note from "./components/Note";
import Services from "./components/Services";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CallToAction from "./components/CallToAction";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Marquee />
        <Note />
        <Services />
        <Work />
        <Testimonials />
        <DesignServices />
        <Process />
        <FAQ />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
