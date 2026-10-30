import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{children}</m.span>{" "}
    </>
  );
}

// A paragraph whose words brighten one after another as it scrolls through the screen.
// With reduced motion the CSS in index.css (.scrub span) keeps every word at full strength.
export default function ScrubText({ text, as: Tag = "p", className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`scrub ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}
