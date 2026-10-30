import { LazyMotion, MotionConfig } from "motion/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import About from "./components/About";
import ServiceStack from "./components/ServiceStack";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import TextMe from "./components/TextMe";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

// Framer Motion's animation features load in a separate chunk after the page is up.
const loadFeatures = () => import("./lib/motion-features").then((mod) => mod.default);

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <TrustStrip />
          <About />
          <ServiceStack />
          <Work />
          <Testimonials />
          <Pricing />
          <Process />
          <FAQ />
          <Contact />
          <TextMe />
        </main>
        <Footer />
        <FloatingContact />
      </MotionConfig>
    </LazyMotion>
  );
}
