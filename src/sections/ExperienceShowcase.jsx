import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layers, Code, MousePointer2, LayoutTemplate, Box } from 'lucide-react';

const ExperienceShowcase = () => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    // Mouse position for 3D tilt
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
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <section className="min-h-screen bg-forest-900 py-24 relative overflow-hidden perspective-2000">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-6"
                >
                    <Layers size={16} />
                    <span>Architectural X-Ray</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    The <span className="text-gradient">Deconstruction</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Hover to separate the concerns. See how the polished UI sits atop a rigorous wireframe structure, powered by clean, modular code.
                </p>
            </div>

            <div className="container mx-auto px-6 flex justify-center">
                <div
                    ref={containerRef}
                    className="relative w-full max-w-5xl aspect-[16/9] cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ perspective: '2000px' }}
                >
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                        className="relative w-full h-full"
                    >

                        {/* LAYER 1: CODE (Foundation) */}
                        <motion.div
                            animate={{
                                z: isHovered ? -100 : 0,
                                opacity: isHovered ? 0.6 : 0,
                                scale: isHovered ? 0.9 : 0.95
                            }}
                            className="absolute inset-0 bg-black/90 border border-gray-800 rounded-xl p-8 overflow-hidden shadow-2xl backdrop-blur-xl"
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
                                    <div className="h-2 w-2/3 bg-gray-700 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-700 rounded" />
                                    <div className="h-2 w-5/6 bg-gray-700 rounded" />
                                    <div className="h-2 w-4/5 bg-gray-700 rounded" />
                                </div>
                            </div>
                            <pre className="mt-8 text-xs font-mono text-blue-400/80 leading-relaxed">
                                {`const BookingFlow = () => {
  const [state, send] = useMachine(bookingMachine);
  
  // Pure functional logic
  const submit = async (data) => {
    await api.post('/book', data);
    send('CONFIRM');
  };

  return <Provider value={state}>...</Provider>;
}`}
                            </pre>
                        </motion.div>


                        {/* LAYER 2: WIREFRAME (Structure) */}
                        <motion.div
                            animate={{
                                z: isHovered ? 0 : 0,
                                opacity: isHovered ? 0.8 : 0,
                                y: isHovered ? -20 : 0
                            }}
                            className="absolute inset-0 bg-blue-900/20 border-2 border-dashed border-blue-400/30 rounded-xl p-8 shadow-xl backdrop-blur-sm"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="flex items-center gap-2 mb-6 border-b border-blue-400/20 pb-4">
                                <LayoutTemplate size={18} className="text-blue-400" />
                                <span className="font-mono text-sm text-blue-400">Wireframe / Layout</span>
                            </div>
                            <div className="grid grid-cols-12 gap-4 h-full pb-8">
                                <div className="col-span-4 border-2 border-dashed border-blue-400/20 rounded-lg p-4 flex flex-col gap-4">
                                    <div className="h-8 w-full border border-blue-400/20 rounded bg-blue-400/5" />
                                    <div className="h-32 w-full border border-blue-400/20 rounded bg-blue-400/5" />
                                    <div className="h-12 w-full border border-blue-400/20 rounded bg-blue-400/5 mt-auto" />
                                </div>
                                <div className="col-span-8 border-2 border-dashed border-blue-400/20 rounded-lg p-4 grid grid-cols-2 gap-4">
                                    <div className="h-full w-full border border-blue-400/20 rounded bg-blue-400/5" />
                                    <div className="h-full w-full border border-blue-400/20 rounded bg-blue-400/5" />
                                </div>
                            </div>
                        </motion.div>


                        {/* LAYER 3: UI (Surface) */}
                        <motion.div
                            animate={{
                                z: isHovered ? 100 : 0,
                                y: isHovered ? -40 : 0
                            }}
                            className="absolute inset-0 bg-forest-800 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Mock UI Header */}
                            <div className="h-14 bg-forest-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex gap-4 text-sm font-medium text-gray-400">
                                    <span className="text-white">Dashboard</span>
                                    <span>Settings</span>
                                    <span>Profile</span>
                                </div>
                            </div>

                            {/* Mock UI Body */}
                            <div className="p-8 grid grid-cols-12 gap-6 h-full">
                                {/* Sidebar */}
                                <div className="col-span-4 space-y-4">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-neon-500/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-neon-500/20 flex items-center justify-center text-neon-400">
                                                <Box size={16} />
                                            </div>
                                            <span className="font-bold text-white">New Booking</span>
                                        </div>
                                        <div className="h-2 w-2/3 bg-gray-700 rounded group-hover:bg-gray-600 transition-colors" />
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="h-4 w-1/2 bg-gray-700 rounded mb-2" />
                                        <div className="h-2 w-full bg-gray-700/50 rounded" />
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="col-span-8 grid grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10 p-6 flex flex-col justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 mb-4" />
                                        <div>
                                            <div className="h-6 w-24 bg-white/20 rounded mb-2" />
                                            <div className="h-3 w-32 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-neon-500/10 to-emerald-500/10 rounded-xl border border-white/10 p-6 flex flex-col justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 mb-4" />
                                        <div>
                                            <div className="h-6 w-24 bg-white/20 rounded mb-2" />
                                            <div className="h-3 w-32 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Hint */}
                            {!isHovered && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="bg-black/80 text-white px-6 py-3 rounded-full border border-white/20 flex items-center gap-2 shadow-xl"
                                    >
                                        <MousePointer2 size={16} />
                                        <span className="text-sm font-medium">Hover to Deconstruct</span>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceShowcase;
