import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Parallax = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // speed > 0: Moves faster than scroll
  // speed < 0: Moves slower (drags behind)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};