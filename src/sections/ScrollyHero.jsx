import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import useMobile from '../hooks/useMobile';

// Simplified text animation - words only, no letters
const AnimatedText = ({ text, className, delay = 0 }) => {
    const words = text.split(' ');

    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: delay + i * 0.08,
                        duration: 0.4,
                        ease: 'easeOut'
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

// Reduced and optimized floating particles - only 8 particles
const FloatingParticles = React.memo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="absolute rounded-full bg-neon-500/40 animate-float"
                style={{
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                    left: `${10 + i * 11}%`,
                    top: `${15 + (i * 9) % 70}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${12 + i * 2}s`,
                }}
            />
        ))}
    </div>
));

// Simplified gradient orbs - CSS only, no Framer Motion
const GradientOrbs = React.memo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
            className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow"
            style={{
                background: 'radial-gradient(circle, rgba(74, 222, 128, 0.12) 0%, transparent 70%)',
                top: '-15%',
                left: '-5%',
            }}
        />
        <div
            className="absolute w-[400px] h-[400px] rounded-full animate-pulse-slow"
            style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                bottom: '-10%',
                right: '-5%',
                animationDelay: '1.5s',
            }}
        />
    </div>
));

// Simple scroll indicator without complex SVG
const ScrollIndicator = () => (
    <motion.div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
    >
        <span className="text-xs uppercase tracking-widest text-gray-600">Explore</span>
        <motion.div
            className="w-6 h-10 border border-neon-500/30 rounded-full flex justify-center pt-2"
        >
            <motion.div
                className="w-1 h-2 bg-neon-500 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-500/50 to-transparent" />
    </motion.div>
);

const ScrollyHero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Simplified parallax - just opacity fade
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const isMobile = useMobile();

    // Simplified mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    };

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 30 });

    const finalRotateX = isMobile ? 0 : rotateX;
    const finalRotateY = isMobile ? 0 : rotateY;

    return (
        <section
            ref={ref}
            className="h-screen relative flex items-center justify-center overflow-hidden bg-forest-900"
            onMouseMove={handleMouseMove}
        >
            {/* Simplified Background */}
            <motion.div style={{ opacity }} className="absolute inset-0 z-0">
                <GradientOrbs />
                <FloatingParticles />
            </motion.div>

            {/* 3D Tilt Container - simplified */}
            <motion.div
                style={{ rotateX: finalRotateX, rotateY: finalRotateY }}
                className="relative z-10 container mx-auto px-6 text-center will-change-transform"
            >
                {/* Decorative elements - simplified, no complex animations */}
                <div className="absolute -top-32 -left-20 w-20 h-20 border border-neon-500/20 rounded-full opacity-50" />
                <div className="absolute -bottom-20 -right-10 w-32 h-32 border border-white/5 rounded-full" />

                {/* Main Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    {/* Subtitle */}
                    <h2 className="text-neon-400 font-mono text-sm md:text-base tracking-[0.5em] uppercase mb-6">
                        <AnimatedText text="Mascotas Madagascar" delay={0.2} />
                    </h2>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-8xl lg:text-9xl font-display font-bold leading-tight mb-8 text-white">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="block"
                        >
                            Beyond a
                        </motion.span>
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            Pet Store.
                        </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        A Digital Ecosystem.
                    </motion.p>
                </motion.div>

                <ScrollIndicator />
            </motion.div>
        </section>
    );
};

export default ScrollyHero;
