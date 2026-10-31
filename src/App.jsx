import { useEffect } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ServicePanels from "./components/ServicePanels";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import { startSmoothScroll } from "./lib/scroll";

// Hairline between white sections, inside the same container as everything else.
const Divider = () => (
  <div aria-hidden="true" className="site-wrap">
    <div className="h-px bg-line" />
  </div>
);

// Framer Motion's animation features load in a separate chunk after the page is up.
const loadFeatures = () => import("./lib/motion-features").then((mod) => mod.default);

// Section order follows the reference: hero → services → work → process → FAQ → closing call
// to action → footer, with our testimonial, note, pricing and contact form in between.
export default function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-page"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Divider />
          <ServicePanels />
          <Divider />
          <Work />
          <Divider />
          <Testimonials />
          <Divider />
          <About />
          <Divider />
          <Pricing />
          <Divider />
          <Process />
          <Divider />
          <FAQ />
          <Divider />
          <Contact />
          <ClosingCTA />
        </main>
        <Footer />
        <FloatingContact />
      </MotionConfig>
    </LazyMotion>
  );
}
