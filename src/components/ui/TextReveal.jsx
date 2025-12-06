import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`${className} relative overflow-hidden`}>
      <motion.div
        variants={{
          hidden: { y: "100%" },
          visible: { y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} // "Quart" easing for premium feel
      >
        {children}
      </motion.div>
    </div>
  );
};