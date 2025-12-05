import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Code, MousePointer2, LayoutTemplate, Box, TouchpadOff, Sparkles } from 'lucide-react';
import useMobile from '../hooks/useMobile';

const ExperienceShowcase = () => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const isMobile = useMobile();

    const toggleDeconstruct = () => {
        if (isMobile) setIsHovered(!isHovered);
    };

    return (
        <section className="min-h-screen bg-forest-900 py-24 relative overflow-hidden">
            {/* Simple grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-6"
                >
                    <Layers size={16} />
                    <span>Architectural X-Ray</span>
                </motion.div>

                <motion.h2
                    className="text-4xl md:text-6xl font-display font-bold mb-6"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    The <span className="text-gradient">Deconstruction</span>
                </motion.h2>
                <motion.p
                    className="text-gray-400 max-w-2xl mx-auto text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Hover to separate the concerns. See how the polished UI sits atop wireframes and clean code.
                </motion.p>
            </div>

            <div className="container mx-auto px-6 flex justify-center">
                <div
                    ref={containerRef}
                    className="relative w-full max-w-4xl aspect-[16/9] cursor-pointer"
                    onMouseEnter={() => !isMobile && setIsHovered(true)}
                    onMouseLeave={() => !isMobile && setIsHovered(false)}
                    onClick={toggleDeconstruct}
                    style={{ perspective: '1500px' }}
                >
                    {/* LAYER 1: CODE (Background) */}
                    <motion.div
                        animate={{
                            z: isHovered ? -80 : 0,
                            opacity: isHovered ? 0.7 : 0,
                            scale: isHovered ? 0.9 : 0.95,
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                        className="absolute inset-0 bg-black/90 border border-gray-800 rounded-xl p-8 overflow-hidden will-change-transform"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                            <Code size={18} className="text-blue-500" />
                            <span className="font-mono text-sm text-gray-500">CoreLogic.jsx</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 opacity-50">
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-gray-700 rounded" />
                                <div className="h-2 w-1/2 bg-gray-700 rounded" />
                                <div className="h-2 w-full bg-gray-700 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-gray-700 rounded" />
                                <div className="h-2 w-5/6 bg-gray-700 rounded" />
                            </div>
                        </div>
                        <pre className="mt-8 text-xs font-mono text-blue-400/70">
                            {`const BookingFlow = () => {
  const [state, send] = useMachine(bookingMachine);
  return <Provider value={state}>...</Provider>;
}`}
                        </pre>
                    </motion.div>

                    {/* LAYER 2: WIREFRAME (Middle) */}
                    <motion.div
                        animate={{
                            z: isHovered ? 0 : 0,
                            opacity: isHovered ? 0.8 : 0,
                            y: isHovered ? -25 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                        className="absolute inset-0 bg-blue-900/20 border-2 border-dashed border-blue-400/30 rounded-xl p-8 will-change-transform"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="flex items-center gap-2 mb-6 border-b border-blue-400/20 pb-4">
                            <LayoutTemplate size={18} className="text-blue-400" />
                            <span className="font-mono text-sm text-blue-400">Wireframe</span>
                        </div>
                        <div className="grid grid-cols-12 gap-4 h-full pb-8">
                            <div className="col-span-4 border-2 border-dashed border-blue-400/20 rounded-lg p-4 flex flex-col gap-4">
                                <div className="h-8 w-full border border-blue-400/20 rounded bg-blue-400/5" />
                                <div className="h-24 w-full border border-blue-400/20 rounded bg-blue-400/5" />
                            </div>
                            <div className="col-span-8 border-2 border-dashed border-blue-400/20 rounded-lg p-4 grid grid-cols-2 gap-4">
                                <div className="h-full w-full border border-blue-400/20 rounded bg-blue-400/5" />
                                <div className="h-full w-full border border-blue-400/20 rounded bg-blue-400/5" />
                            </div>
                        </div>
                    </motion.div>

                    {/* LAYER 3: UI (Top) */}
                    <motion.div
                        animate={{
                            z: isHovered ? 80 : 0,
                            y: isHovered ? -50 : 0,
                            scale: isHovered ? 1.02 : 1
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                        className="absolute inset-0 bg-forest-800 border border-white/10 rounded-xl overflow-hidden shadow-xl will-change-transform"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Mock UI Header */}
                        <div className="h-12 bg-forest-900/80 border-b border-white/5 flex items-center justify-between px-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex gap-4 text-sm font-medium text-gray-400">
                                <span className="text-white">Dashboard</span>
                                <span>Settings</span>
                            </div>
                        </div>

                        {/* Mock UI Body */}
                        <div className="p-6 grid grid-cols-12 gap-4 h-full">
                            <div className="col-span-4 space-y-3">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-neon-500/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-neon-500/20 flex items-center justify-center text-neon-400">
                                            <Box size={16} />
                                        </div>
                                        <span className="font-bold text-white group-hover:text-neon-400 transition-colors">New Booking</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="h-4 w-1/2 bg-gray-700 rounded mb-2" />
                                    <div className="h-2 w-full bg-gray-700/50 rounded" />
                                </div>
                            </div>
                            <div className="col-span-8 grid grid-cols-2 gap-3">
                                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10 p-5">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 mb-3" />
                                    <div className="h-5 w-20 bg-white/20 rounded mb-2" />
                                    <div className="h-3 w-28 bg-white/10 rounded" />
                                </div>
                                <div className="bg-gradient-to-br from-neon-500/10 to-emerald-500/10 rounded-xl border border-white/10 p-5">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 mb-3" />
                                    <div className="h-5 w-20 bg-white/20 rounded mb-2" />
                                    <div className="h-3 w-28 bg-white/10 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Hover Hint Overlay */}
                        <AnimatePresence>
                            {!isHovered && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="bg-black/80 text-white px-6 py-3 rounded-full border border-white/20 flex items-center gap-3">
                                        {isMobile ? <TouchpadOff size={16} /> : <MousePointer2 size={16} />}
                                        <span className="text-sm font-medium">{isMobile ? "Tap to Deconstruct" : "Hover to Deconstruct"}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ExperienceShowcase;
