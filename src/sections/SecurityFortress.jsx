import React, { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Lock, Key, Eye, ShieldCheck } from 'lucide-react';

// Simple security feature card
const SecurityFeature = React.memo(({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="flex items-start gap-4 p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-neon-500/30 transition-colors group cursor-pointer"
    >
        <div className="p-3 bg-forest-800 rounded-xl text-neon-500 group-hover:scale-105 transition-transform">
            <Icon size={24} />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-400 transition-colors">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>
    </motion.div>
));

const SecurityFortress = () => {
    const containerRef = useRef(null);

    // Mouse tilt logic - simplified
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 20 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="min-h-screen bg-forest-950 relative flex items-center justify-center py-24 overflow-hidden">
            {/* Simple grid background - CSS only */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade8010_1px,transparent_1px),linear-gradient(to_bottom,#4ade8010_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Simple rotating circles - CSS animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[600px] h-[600px] border border-dashed border-neon-500 rounded-full animate-spin-slow" />
                <div className="absolute w-[400px] h-[400px] border border-neon-500/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Visual Side (Shield) */}
                    <div
                        className="lg:w-1/2 relative flex justify-center"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        ref={containerRef}
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div
                            style={{ rotateX, rotateY }}
                            className="relative w-72 h-80 cursor-pointer will-change-transform"
                        >
                            {/* Shield glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-neon-500/15 to-transparent rounded-[3rem] blur-xl" />

                            {/* Shield body */}
                            <div className="absolute inset-0 border-2 border-neon-500/50 rounded-[3rem] bg-forest-900/80 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(74,222,128,0.15)]">
                                {/* Scanning line - CSS animation */}
                                <div className="absolute left-0 right-0 h-[1px] bg-neon-400 animate-scan" />

                                {/* Shield icon */}
                                <Shield size={100} className="text-neon-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                            </div>

                            {/* Terminal - simplified */}
                            <motion.div
                                className="absolute -bottom-10 -right-10 bg-[#0d1117] border border-neon-500/30 rounded-xl p-4 shadow-xl w-56 font-mono text-[10px]"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-gray-500 ml-auto flex items-center gap-1">
                                        <ShieldCheck size={10} />
                                        LOGS
                                    </span>
                                </div>
                                <div className="space-y-1 text-neon-400/80">
                                    <div>{'> SESSION_TIMER [30m]'}</div>
                                    <div>{'> ACTIVITY [ACTIVE]'}</div>
                                    <div>{'> SIGNATURE [VALID]'}</div>
                                    <div className="text-green-400">{'> SYSTEM_SECURE ✓'}</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-500/10 border border-neon-500/20 text-neon-400 text-sm font-mono mb-6"
                        >
                            <Lock size={14} />
                            <span>Enterprise Security</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display font-bold mb-6"
                        >
                            Bank-Grade <br />
                            <span className="text-gradient">Security Protocol</span>
                        </motion.h2>

                        <motion.p
                            className="text-gray-400 text-lg mb-12 max-w-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Every interaction is wrapped in layers of enterprise-grade encryption and validation logic.
                        </motion.p>

                        <div className="grid gap-4">
                            <SecurityFeature icon={Key} title="Zero-Trust Sessions" desc="Stateless JWTs with automatic 30-minute idle timeout." delay={0.15} />
                            <SecurityFeature icon={Eye} title="Threat Neutralization" desc="Advanced sanitization strips malicious payloads before they reach the core." delay={0.25} />
                            <SecurityFeature icon={Lock} title="Helmet.js Shielding" desc="Hardened HTTP headers preventing XSS, clickjacking, and other attacks." delay={0.35} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SecurityFortress;
