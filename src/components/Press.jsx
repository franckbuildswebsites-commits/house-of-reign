import { m } from "motion/react";

// The site's two springs. SPRING is for things under the finger or cursor (quick, slightly elastic);
// SPRING_SOFT is for bigger moves: menus, layout changes, the header.
export const SPRING = { type: "spring", stiffness: 340, damping: 22, mass: 0.7 };
export const SPRING_SOFT = { type: "spring", stiffness: 170, damping: 22, mass: 0.9 };

// A button, link or card that lifts on hover and presses in on tap. Touch screens only get the
// press (Framer Motion ignores hover on touch), and reduced motion turns both off (MotionConfig in App.jsx).
export default function Press({ as = "a", lift = 2, press = 0.97, ...rest }) {
  const Tag = m[as];
  return <Tag whileHover={{ y: -lift }} whileTap={{ scale: press }} transition={SPRING} {...rest} />;
}
