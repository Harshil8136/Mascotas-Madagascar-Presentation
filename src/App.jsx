import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ScrollyHero from './sections/ScrollyHero';
import CoreArchitecture from './sections/CoreArchitecture';
import ChatbotIntelligence from './sections/ChatbotIntelligence';
import DeepDiveShowcase from './sections/DeepDiveShowcase';
import AnalyticsDashboard from './sections/AnalyticsDashboard';
import SecurityFortress from './sections/SecurityFortress';
import ExperienceShowcase from './sections/ExperienceShowcase';
import Footer from './sections/Footer';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-neon-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-500 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(74, 222, 128, 0.2)' : 'transparent'
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
    >
      <div className="absolute inset-0 bg-neon-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

function App() {
  return (
    <div className="bg-forest-950 min-h-screen text-white selection:bg-neon-500/30 overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <ScrollyHero />
      <CoreArchitecture />
      <ChatbotIntelligence />
      <DeepDiveShowcase />
      <AnalyticsDashboard />
      <SecurityFortress />
      <ExperienceShowcase />
      <Footer />
    </div>
  );
}

export default App;
