import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';
import { Parallax } from '../ui/Parallax';
import { triggerHaptic } from '../../utils/triggerHaptic';
import { cn } from '../../utils/cn';
import { GradientButton } from '../ui/GradientButton'; // Import the new button

// --- 1. COMPONENT: Spotlight Card Effect ---
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(14, 165, 233, 0.15)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-slate-800 bg-slate-900/50 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- 2. COMPONENT: Staggered Features List ---
const StaggeredList = ({ items, isPopular }) => {
  return (
    <ul className="space-y-4 mb-8 flex-1">
      {items.map((feature, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex items-start gap-3 text-sm text-slate-300"
        >
          <CheckIcon className={cn("w-5 h-5 shrink-0", isPopular ? "text-sky-400" : "text-slate-500")} />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
  );
};

const packages = [
  {
    name: "Digital Identity",
    package: "Package A",
    price: "₹3,499",
    range: "₹3,499 – ₹4,999",
    bestFor: "Freelancers, Students, Personal Portfolios",
    description: "A modern, scrolling landing page that tells your story.",
    features: [
      "Single-Page Architecture",
      "Signature Dark Mode",
      "Fully Responsive Mobile/Tablet",
      "Contact Form + Social Links",
      "High-Speed Performance",
      "Free Deployment Setup"
    ],
    isPopular: true,
    buttonText: "Start Your Website",
    // Passed to GradientButton to create the colorful border effect
    gradient: "from-sky-500 via-blue-500 to-sky-500", 
    glowColor: "rgba(14, 165, 233, 0.2)"
  },
  {
    name: "Business Growth",
    package: "Package B",
    price: "₹8,999",
    range: "₹8,999 – ₹14,999",
    bestFor: "Local Shops, Clinics, Small Agencies",
    description: "Multi-page custom build to grow your local presence.",
    features: [
      "5-Page Custom Build",
      "Client Admin Panel (CMS)",
      "Local SEO Setup",
      "Responsive Design",
      "Scalable MERN Stack",
      "1 Month Free Maintenance"
    ],
    isPopular: false,
    buttonText: "Request a Quote",
    gradient: "from-purple-500 via-pink-500 to-purple-500",
    glowColor: "rgba(168, 85, 247, 0.2)"
  },
  {
    name: "Custom System",
    package: "Package C",
    price: "₹17,999",
    range: "₹17,999 – ₹25,999",
    bestFor: "Retail Stores, Startups, Warehouses",
    description: "Full-scale inventory and shop management systems.",
    features: [
      "Real-Time Stock Tracking",
      "Role-Based Security (Admin/Staff)",
      "Analytics Dashboard",
      "Cloud Database (Firebase)",
      "Digital Invoicing",
      "3 Months Priority Support"
    ],
    isPopular: false,
    buttonText: "Discuss Requirements",
    gradient: "from-amber-500 via-orange-500 to-amber-500",
    glowColor: "rgba(245, 158, 11, 0.2)"
  }
];

const CheckIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Services = () => {
  return (
    <section id="services" className="my-16 sm:my-32 relative z-10 w-full scroll-mt-20">
      
      {/* Background Number */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Parallax
          speed={-0.2}
          className="absolute top-[5%] right-4 text-slate-800/50 text-6xl font-bold font-mono opacity-20"
        >
          07
        </Parallax>
      </div>

      <div className="w-full px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <TextReveal className="flex justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Services & Pricing
            </h2>
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Professional web solutions tailored to your needs. Transparent pricing, premium quality.
            </p>
          </Reveal>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 0.1} className="h-full">
              <SpotlightCard 
                spotlightColor={pkg.glowColor}
                className={cn(
                  "flex flex-col h-full p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm",
                  pkg.isPopular 
                    ? "border-sky-500/50 shadow-sky-500/10" 
                    : "border-slate-800 hover:border-slate-700"
                )}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6 relative z-10">
                  <h3 className="text-lg font-medium text-slate-300 mb-2">{pkg.package}</h3>
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <p className="text-sm text-slate-400 h-10">{pkg.bestFor}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-800 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    <span className="text-sm text-slate-500">/ starting</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Range: {pkg.range}</p>
                </div>

                <StaggeredList items={pkg.features} isPopular={pkg.isPopular} />

                {/* --- NEW GRADIENT BUTTON --- */}
                {/* We pass the custom gradient string from the package object to colorize the border */}
                <div className="relative z-10 mt-auto">
                    <GradientButton 
                        href="#contact" 
                        onClick={triggerHaptic}
                        className={cn(
                          // Override border gradient logic handled inside component via 'gradient' prop? 
                          // Or we can pass the specific gradient class via a custom prop if needed.
                          // The component above uses a prop `gradient`.
                        )}
                        gradient={pkg.gradient}
                    >
                        {pkg.buttonText}
                    </GradientButton>
                </div>

              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-center text-slate-500 text-sm mt-12">
            * Customization available. Extra charges applied based on specific requirements.
          </p>
        </Reveal>

      </div>
    </section>
  );
};

export default Services;