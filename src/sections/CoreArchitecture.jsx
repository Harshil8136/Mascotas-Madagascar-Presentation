import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Globe, Cpu, Code2, Zap } from 'lucide-react';
import useMobile from '../hooks/useMobile';

// Data Flow Particles - Animated dots flowing through connectors
const DataFlowParticle = ({ delay, duration, isFilled, isVertical }) => {
    if (!isFilled) return null;

    return (
        <motion.div
            className="absolute rounded-full bg-neon-400 shadow-[0_0_10px_rgba(74,222,128,0.8),0_0_20px_rgba(74,222,128,0.4)]"
            style={{
                width: 6,
                height: 6,
                [isVertical ? 'left' : 'top']: '50%',
                transform: isVertical ? 'translateX(-50%)' : 'translateY(-50%)',
            }}
            initial={{
                [isVertical ? 'top' : 'left']: '-10%',
                opacity: 0,
                scale: 0.5
            }}
            animate={{
                [isVertical ? 'top' : 'left']: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.5]
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
};

// Enhanced Connector with gradient glow and data flow particles
const EnhancedConnector = ({ isFilled, isVertical }) => {
    const particles = useMemo(() => 
        Array.from({ length: 4 }, (_, i) => ({
            id: i,
            delay: i * 0.4,
            duration: 1.8
        })), 
    []);

    return (
        <div 
            className={`flex-1 relative ${isVertical ? 'w-[3px] h-10 my-[-12px] ml-[31px]' : 'h-[3px] mx-3'} z-0`}
            style={{ minWidth: isVertical ? 'auto' : '60px' }}
        >
            {/* Background track */}
            <div className={`absolute inset-0 ${isVertical ? '' : ''} bg-white/5 rounded-full`} />
            
            {/* Gradient glow track */}
            <motion.div
                initial={isVertical ? { scaleY: 0 } : { scaleX: 0 }}
                animate={isVertical ? { scaleY: isFilled ? 1 : 0 } : { scaleX: isFilled ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ 
                    transformOrigin: isVertical ? 'top' : 'left',
                }}
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-neon-500 via-neon-400 to-neon-500
                    shadow-[0_0_15px_rgba(74,222,128,0.5),0_0_30px_rgba(74,222,128,0.3)]`}
            />
            
            {/* Data flow particles */}
            {particles.map((particle) => (
                <DataFlowParticle
                    key={particle.id}
                    delay={particle.delay}
                    duration={particle.duration}
                    isFilled={isFilled}
                    isVertical={isVertical}
                />
            ))}
        </div>
    );
};

// Orbiting particles around active node
const OrbitingParticles = ({ isActive }) => {
    if (!isActive) return null;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-neon-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                    style={{
                        left: '50%',
                        top: '50%',
                    }}
                    animate={{
                        x: [
                            Math.cos((i * Math.PI * 2) / 3) * 40,
                            Math.cos((i * Math.PI * 2) / 3 + Math.PI * 2) * 40
                        ],
                        y: [
                            Math.sin((i * Math.PI * 2) / 3) * 40,
                            Math.sin((i * Math.PI * 2) / 3 + Math.PI * 2) * 40
                        ],
                        opacity: [0.6, 1, 0.6],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

// Multi-ring pulse effect
const MultiRingPulse = ({ isActive }) => {
    if (!isActive) return null;

    return (
        <>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-2xl border-2 border-neon-500 pointer-events-none"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ 
                        scale: [1, 1.4 + i * 0.15], 
                        opacity: [0.8 - i * 0.2, 0] 
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            ))}
        </>
    );
};

const PipelineNode = ({ data, isActive, isPassed, onClick, isMobile, index, totalNodes }) => (
    <motion.div
        layout
        onClick={onClick}
        className={`relative flex ${isMobile ? 'flex-row w-full text-left gap-6 p-4' : 'flex-col items-center gap-4'} cursor-pointer group z-10`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        {/* Node Icon Container */}
        <motion.div
            layout
            className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border-2 shrink-0 overflow-visible
                ${isActive
                    ? 'bg-forest-900/80 border-neon-500 text-neon-400'
                    : isPassed
                        ? 'bg-forest-900 border-neon-500/50 text-neon-500/60'
                        : 'bg-forest-800 border-white/10 text-gray-500 group-hover:border-white/30 group-hover:text-gray-400'
                }`}
            animate={{
                scale: isActive ? 1.1 : 1,
                boxShadow: isActive 
                    ? '0 0 40px rgba(74,222,128,0.4), 0 0 80px rgba(74,222,128,0.2), inset 0 0 20px rgba(74,222,128,0.1)' 
                    : isPassed 
                        ? '0 0 15px rgba(74,222,128,0.2)' 
                        : 'none'
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Inner glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-500/20 to-transparent pointer-events-none"
                animate={{
                    opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Icon */}
            <motion.div
                animate={{
                    scale: isActive ? 1.15 : 1,
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(74,222,128,0.8))' : 'none'
                }}
                transition={{ duration: 0.3 }}
            >
                {data.icon}
            </motion.div>

            {/* Multi-ring pulse effect */}
            <MultiRingPulse isActive={isActive} />
            
            {/* Orbiting particles */}
            <OrbitingParticles isActive={isActive} />
        </motion.div>

        {/* Label */}
        <motion.div
            className={`${isMobile ? 'flex flex-col justify-center' : 'text-center absolute top-20 w-48 left-1/2 -translate-x-1/2'}`}
        >
            <motion.h3 
                className={`font-bold font-display transition-all duration-300 ${isActive ? 'text-white text-lg' : isPassed ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}`}
                animate={{
                    textShadow: isActive ? '0 0 20px rgba(74,222,128,0.5)' : 'none'
                }}
            >
                {data.title}
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="text-neon-400 text-xs font-mono mt-1 overflow-hidden"
            >
                {data.subtitle}
            </motion.p>
        </motion.div>
    </motion.div>
);

const DetailCard = ({ data }) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl w-full max-w-4xl mx-auto mt-12 overflow-hidden"
    >
        {/* Animated background glow */}
        <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 bg-neon-500/10 rounded-full blur-3xl pointer-events-none"
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-3xl border border-neon-500/20 pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
                <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="p-2 bg-neon-500/10 rounded-lg text-neon-400 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                        <Code2 size={20} />
                    </div>
                    <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Technical Specs</h4>
                </motion.div>
                <motion.h3 
                    className="text-2xl font-bold text-white mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    {data.techTitle}
                </motion.h3>
                <motion.p 
                    className="text-gray-300 leading-relaxed mb-6"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {data.techDesc}
                </motion.p>
                <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    {data.tags.map((tag, i) => (
                        <motion.span 
                            key={i} 
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:bg-neon-500/10 hover:border-neon-500/30 hover:text-neon-400 transition-all duration-300 cursor-default"
                            whileHover={{ scale: 1.05 }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>
            </div>

            <div className="border-l border-white/10 pl-12">
                <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Zap size={20} />
                    </div>
                    <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Performance Impact</h4>
                </motion.div>
                <div className="space-y-6">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div 
                            className="text-3xl font-bold text-white mb-1"
                            animate={{
                                textShadow: ['0 0 10px rgba(74,222,128,0)', '0 0 20px rgba(74,222,128,0.3)', '0 0 10px rgba(74,222,128,0)']
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {data.stat1.value}
                        </motion.div>
                        <div className="text-sm text-gray-500">{data.stat1.label}</div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div 
                            className="text-3xl font-bold text-white mb-1"
                            animate={{
                                textShadow: ['0 0 10px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.3)', '0 0 10px rgba(59,130,246,0)']
                            }}
                            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                        >
                            {data.stat2.value}
                        </motion.div>
                        <div className="text-sm text-gray-500">{data.stat2.label}</div>
                    </motion.div>
                </div>
            </div>
        </div>
    </motion.div>
);

const CoreArchitecture = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const isMobile = useMobile();

    const nodes = [
        {
            id: 'client',
            title: 'Client Layer',
            subtitle: 'Next.js / React',
            icon: <Globe size={24} />,
            techTitle: 'Server-Side Rendering',
            techDesc: 'Hybrid rendering strategy delivering instant First Contentful Paint (FCP) via server-generated HTML, followed by client-side hydration for interactivity.',
            tags: ['React 18', 'Hydration', 'Tailwind'],
            stat1: { value: '< 1.2s', label: 'LCP Score' },
            stat2: { value: '0.01', label: 'CLS Stability' }
        },
        {
            id: 'gateway',
            title: 'API Gateway',
            subtitle: 'Express / Node',
            icon: <Server size={24} />,
            techTitle: 'Edge Routing & Security',
            techDesc: 'Centralized entry point managing rate limiting, CORS policies, and request validation before traffic reaches the core logic.',
            tags: ['Middleware', 'Rate Limiting', 'Helmet'],
            stat1: { value: '10k+', label: 'Req/Sec Capacity' },
            stat2: { value: '5ms', label: 'Processing Overhead' }
        },
        {
            id: 'logic',
            title: 'Neural Core',
            subtitle: 'Heuristic Engine',
            icon: <Cpu size={24} />,
            techTitle: 'Deterministic NLP',
            techDesc: 'Custom regex-based intent classification engine running locally. Zero latency, zero external API costs, maximum privacy.',
            tags: ['Fuse.js', 'Regex', 'State Machine'],
            stat1: { value: '0ms', label: 'Network Latency' },
            stat2: { value: '98%', label: 'Intent Accuracy' }
        },
        {
            id: 'storage',
            title: 'Persistence',
            subtitle: 'Vercel KV',
            icon: <Database size={24} />,
            techTitle: 'Ephemeral State',
            techDesc: 'High-performance key-value store for session management and caching. Ensures data availability across distributed serverless functions.',
            tags: ['Redis', 'In-Memory', 'Atomic'],
            stat1: { value: '< 2ms', label: 'Read/Write Latency' },
            stat2: { value: '99.9%', label: 'Uptime SLA' }
        },
        {
            id: 'admin',
            title: 'Admin Console',
            subtitle: 'Operational Layer',
            icon: <Database size={24} />,
            techTitle: 'Zero-Build Architecture',
            techDesc: 'A lightweight, offline-first admin interface built with Preact and IndexedDB. Allows for instant content updates via Vercel KV without full deployments.',
            tags: ['Preact', 'IndexedDB', 'Vercel KV'],
            stat1: { value: '100%', label: 'Offline Capable' },
            stat2: { value: '< 50kb', label: 'Bundle Size' }
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % nodes.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="min-h-screen bg-forest-950 py-24 relative overflow-hidden flex flex-col justify-center">
            {/* Background ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] bg-neon-500/5 rounded-full blur-[120px]"
                    animate={{
                        x: ['-20%', '10%', '-20%'],
                        y: ['-10%', '20%', '-10%'],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ top: '20%', left: '10%' }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"
                    animate={{
                        x: ['20%', '-10%', '20%'],
                        y: ['10%', '-20%', '10%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ bottom: '10%', right: '10%' }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2 
                        className="text-4xl md:text-6xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        The <span className="text-gradient">Pulse Pipeline</span>
                    </motion.h2>
                    <motion.p 
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Follow the data journey. From the user's click to the neural core and back.
                    </motion.p>
                </div>

                {/* Pipeline Visualization */}
                <motion.div
                    className="mb-24 max-w-5xl mx-auto w-full"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'}`}>
                        {nodes.map((node, index) => (
                            <React.Fragment key={node.id}>
                                <PipelineNode
                                    data={node}
                                    isActive={index === activeIndex}
                                    isPassed={index < activeIndex}
                                    onClick={() => setActiveIndex(index)}
                                    isMobile={isMobile}
                                    index={index}
                                    totalNodes={nodes.length}
                                />
                                {index < nodes.length - 1 && (
                                    <EnhancedConnector
                                        isFilled={index < activeIndex}
                                        isVertical={isMobile}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Detail Panel */}
                <div className="min-h-[400px] flex items-start justify-center">
                    <AnimatePresence mode="wait">
                        <DetailCard key={nodes[activeIndex].id} data={nodes[activeIndex]} />
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default CoreArchitecture;
