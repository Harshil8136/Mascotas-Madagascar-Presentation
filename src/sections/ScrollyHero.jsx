import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import useMobile from '../hooks/useMobile';

const ScrollyHero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const isMobile = useMobile();

    // Mouse Tilt Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);
    const gradientBg = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, x => x * 100 + 50)}% ${useTransform(mouseY, y => y * 100 + 50)}%, rgba(74, 222, 128, 0.15), transparent 50%)`;

    // Mobile overrides
    const finalRotateX = isMobile ? 0 : rotateX;
    const finalRotateY = isMobile ? 0 : rotateY;
    const finalBrightness = isMobile ? 1 : brightness;

    return (
        <section
            ref={ref}
            className="h-screen relative flex items-center justify-center overflow-hidden perspective-1000 bg-forest-900"
            onMouseMove={handleMouseMove}
            style={{ position: 'relative' }} // Explicitly set position relative to satisfy Framer Motion warning
        >
            {/* Background Layers */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-neon-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-forest-700/20 rounded-full blur-[120px]" />
            </motion.div>

            {/* 3D Tilt Container */}
            <motion.div
                style={{
                    rotateX: finalRotateX,
                    rotateY: finalRotateY,
                    filter: useMotionTemplate`brightness(${finalBrightness})`
                }}
                className="relative z-10 container mx-auto px-6 text-center transform-style-3d"
            >
                {/* Floating Elements */}
                <motion.div
                    className="absolute -top-32 -left-20 w-24 h-24 border border-neon-500/20 rounded-full"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 90, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-20 -right-10 w-40 h-40 border border-white/5 rounded-full"
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -45, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Main Typography */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, z: -100 }}
                    animate={{ opacity: 1, scale: 1, z: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <motion.div
                        style={{ background: gradientBg }}
                        className="absolute -inset-20 blur-3xl -z-10"
                    />

                    <h2 className="text-neon-400 font-mono text-sm md:text-base tracking-[0.5em] uppercase mb-6">
                        Mascotas Madagascar
                    </h2>

                    <h1 className="text-4xl md:text-8xl lg:text-9xl font-display font-bold leading-tight mb-8 text-white mix-blend-screen">
                        Beyond a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            Pet Store.
                        </span>
                    </h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        A Digital Ecosystem.
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <span className="text-xs uppercase tracking-widest text-gray-600">Explore Anatomy</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-neon-500 to-transparent" />
                </motion.div>

            </motion.div>
        </section>
    );
};

export default ScrollyHero;
