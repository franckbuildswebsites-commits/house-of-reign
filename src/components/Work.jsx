import FeaturedCaseStudy from "./FeaturedCaseStudy";

// The featured case study (data in src/data/projects.js).
export default function Work() {
  return (
    <section id="featured" aria-label="Featured project" className="section-y">
      <div className="site-wrap">
        <FeaturedCaseStudy />
      </div>
    </section>
  );
}
