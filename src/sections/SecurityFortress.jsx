import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Lock, Key, Eye, FileCheck, ScanLine } from 'lucide-react';

const SecurityFeature = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-neon-500/30 transition-colors group"
    >
        <div className="p-3 bg-forest-800 rounded-xl text-neon-500 group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const SecurityFortress = () => {
    const containerRef = useRef(null);

    // Mouse tilt logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="min-h-screen bg-forest-950 relative flex items-center justify-center py-24 overflow-hidden perspective-1000">

            {/* Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-500/20 rounded-full"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100 + "%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Background Abstract */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="w-[800px] h-[800px] border-[1px] border-dashed border-neon-500 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[600px] h-[600px] border-[1px] border-neon-500/30 rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Visual Side (Interactive Shield) */}
                    <div
                        className="lg:w-1/2 relative flex justify-center perspective-1000"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        ref={containerRef}
                    >
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-80 h-96 cursor-pointer"
                        >
                            {/* Shield Layers */}
                            <motion.div
                                style={{ transform: "translateZ(20px)" }}
                                className="absolute inset-0 bg-gradient-to-b from-neon-500/20 to-transparent rounded-[3rem] blur-xl"
                            />

                            <motion.div
                                style={{ transform: "translateZ(50px)" }}
                                className="absolute inset-0 border-2 border-neon-500/50 rounded-[3rem] bg-forest-900/80 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(74,222,128,0.2)]"
                            >
                                {/* Scanning Laser Effect */}
                                <motion.div
                                    animate={{ top: ['-10%', '110%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-2 bg-neon-500/50 blur-md z-10"
                                />
                                <motion.div
                                    animate={{ top: ['-10%', '110%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[1px] bg-neon-400 z-10"
                                />

                                <Shield size={120} className="text-neon-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] relative z-20" />
                            </motion.div>

                            {/* Floating Badges */}
                            <motion.div
                                style={{ transform: "translateZ(80px)" }}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-forest-800 border border-neon-500/30 px-4 py-2 rounded-lg shadow-xl backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-2 text-xs font-mono text-neon-400">
                                    <Lock size={12} />
                                    <span>AES-256</span>
                                </div>
                            </motion.div>

                            <motion.div
                                style={{ transform: "translateZ(80px)" }}
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-6 bg-forest-800 border border-neon-500/30 px-4 py-2 rounded-lg shadow-xl backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-2 text-xs font-mono text-neon-400">
                                    <FileCheck size={12} />
                                    <span>GDPR Ready</span>
                                </div>
                            </motion.div>

                            {/* Scan Status */}
                            <motion.div
                                style={{ transform: "translateZ(60px)" }}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-neon-500/20"
                            >
                                <div className="w-2 h-2 bg-neon-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-mono text-neon-400 uppercase tracking-widest">System Secure</span>
                            </motion.div>

                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-display font-bold mb-6"
                        >
                            Bank-Grade <br />
                            <span className="text-gradient">Security Protocol</span>
                        </motion.h2>

                        <p className="text-gray-400 text-lg mb-12 max-w-lg">
                            We don't just store data; we fortify it. Every interaction is wrapped in layers of enterprise-grade encryption and validation logic.
                        </p>

                        <div className="grid gap-4">
                            <SecurityFeature
                                icon={Key}
                                title="JWT Authentication"
                                desc="Stateless, secure session management ensuring zero unauthorized access to admin routes."
                                delay={0.2}
                            />
                            <SecurityFeature
                                icon={Eye}
                                title="Input Sanitization"
                                desc="Custom heuristic engine (Sanitizer.js) strips malicious code before it ever touches the server."
                                delay={0.4}
                            />
                            <SecurityFeature
                                icon={Lock}
                                title="Helmet.js Headers"
                                desc="Advanced HTTP header configuration preventing XSS, clickjacking, and other common attack vectors."
                                delay={0.6}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SecurityFortress;
