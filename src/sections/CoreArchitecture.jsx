import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Globe, Cpu, Code2, Zap } from 'lucide-react';

const Connector = ({ isFilled }) => (
    <div className="flex-1 h-[2px] bg-white/10 relative mx-2 overflow-hidden rounded-full">
        <motion.div
            initial={{ x: '-100%' }}
            animate={{
                x: isFilled ? '0%' : '-100%',
                opacity: isFilled ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-neon-500 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
        />
    </div>
);

const PipelineNode = ({ data, isActive, isPassed, onClick }) => (
    <motion.div
        layout
        onClick={onClick}
        className={`relative flex flex-col items-center gap-4 cursor-pointer group z-10`}
    >
        {/* Node Icon */}
        <motion.div
            layout
            className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 relative
                ${isActive
                    ? 'bg-forest-900 border-neon-500 text-neon-400 shadow-[0_0_30px_rgba(74,222,128,0.3)] scale-110'
                    : isPassed
                        ? 'bg-forest-900 border-neon-500/50 text-neon-500/50'
                        : 'bg-forest-800 border-white/10 text-gray-500 group-hover:border-white/30'
                }`}
        >
            {data.icon}

            {/* Active Pulse Ring */}
            {isActive && (
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-neon-500"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}
        </motion.div>

        {/* Label */}
        <motion.div layout className="text-center absolute top-20 w-32 left-1/2 -translate-x-1/2">
            <h3 className={`font-bold font-display transition-colors duration-300 ${isActive ? 'text-white text-lg' : 'text-gray-500 text-sm'}`}>
                {data.title}
            </h3>
            <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                className="text-neon-400 text-xs font-mono mt-1 overflow-hidden"
            >
                {data.subtitle}
            </motion.p>
        </motion.div>
    </motion.div>
);

const DetailCard = ({ data }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden w-full max-w-4xl mx-auto mt-12"
    >
        <div className="absolute top-0 right-0 p-32 bg-neon-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-neon-500/10 rounded-lg text-neon-400">
                        <Code2 size={20} />
                    </div>
                    <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Technical Specs</h4>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{data.techTitle}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                    {data.techDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-l border-white/10 pl-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Zap size={20} />
                    </div>
                    <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Performance Impact</h4>
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">{data.stat1.value}</div>
                        <div className="text-sm text-gray-500">{data.stat1.label}</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">{data.stat2.value}</div>
                        <div className="text-sm text-gray-500">{data.stat2.label}</div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const CoreArchitecture = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
        }, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="min-h-screen bg-forest-950 py-24 relative overflow-hidden flex flex-col justify-center">

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        The <span className="text-gradient">Pulse Pipeline</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Follow the data journey. From the user's click to the neural core and back.
                    </p>
                </div>

                {/* Pipeline Visualization */}
                <div
                    className="mb-24 max-w-5xl mx-auto w-full"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="flex items-center justify-between">
                        {nodes.map((node, index) => (
                            <React.Fragment key={node.id}>
                                <PipelineNode
                                    data={node}
                                    isActive={index === activeIndex}
                                    isPassed={index < activeIndex}
                                    onClick={() => setActiveIndex(index)}
                                />
                                {index < nodes.length - 1 && (
                                    <Connector
                                        isFilled={index < activeIndex}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="h-[400px] flex items-start justify-center">
                    <AnimatePresence mode="wait">
                        <DetailCard key={nodes[activeIndex].id} data={nodes[activeIndex]} />
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default CoreArchitecture;
