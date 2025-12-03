import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Database, Globe, Cpu, X } from 'lucide-react';

const Hotspot = ({ x, y, label, onClick }) => (
    <div
        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
        style={{ left: x, top: y }}
        onClick={onClick}
    >
        <div className="relative">
            <div className="w-4 h-4 bg-neon-500 rounded-full animate-ping absolute inset-0 opacity-75" />
            <div className="w-4 h-4 bg-neon-500 rounded-full relative border-2 border-forest-900 shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-transform group-hover:scale-125" />
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-3 py-1 rounded text-xs text-neon-400 font-mono pointer-events-none border border-neon-500/30">
            {label}
        </div>
    </div>
);

const DetailPanel = ({ data, onClose }) => (
    <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-forest-900/95 backdrop-blur-xl border-l border-white/10 p-8 z-50 shadow-2xl"
    >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
        </button>

        <div className="mt-12">
            <div className="w-16 h-16 rounded-2xl bg-neon-500/10 flex items-center justify-center mb-6 text-neon-400">
                {data.icon}
            </div>
            <h3 className="text-3xl font-display font-bold mb-2">{data.title}</h3>
            <p className="text-neon-400 font-mono text-sm mb-8">{data.subtitle}</p>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">The Tech</h4>
                    <p className="text-gray-300 leading-relaxed">{data.tech}</p>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Business Value</h4>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-gray-300 text-sm italic">"{data.benefit}"</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Source File</h4>
                    <code className="block bg-black/30 p-3 rounded text-xs text-gray-400 font-mono break-all">
                        {data.source}
                    </code>
                </div>
            </div>
        </div>
    </motion.div>
);

const CoreArchitecture = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });
    const [activeDetail, setActiveDetail] = useState(null);

    const details = {
        ssr: {
            title: "Server-Side Rendering",
            subtitle: "Next.js / Vite SSR",
            icon: <Globe size={32} />,
            tech: "Pre-rendering pages on the server for instant First Contentful Paint (FCP) and SEO dominance.",
            benefit: "Google indexes our content immediately. Users see the page in <0.8s.",
            source: "e:/1/Madagascar Project/server.js"
        },
        api: {
            title: "Optimized API",
            subtitle: "Express + Node.js",
            icon: <Cpu size={32} />,
            tech: "Restful endpoints with middleware for rate limiting, CORS, and compression.",
            benefit: "Handles 10,000+ concurrent requests without degradation.",
            source: "e:/1/Madagascar Project/api/sendEmail.js"
        },
        db: {
            title: "Data Persistence",
            subtitle: "Vercel KV / Redis",
            icon: <Database size={32} />,
            tech: "In-memory key-value store for lightning-fast session management and caching.",
            benefit: "Zero-latency user personalization and state retention.",
            source: "e:/1/Madagascar Project/js/database.js"
        }
    };

    return (
        <section ref={containerRef} className="min-h-screen bg-forest-900 relative flex items-center justify-center overflow-hidden py-24">
            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold mb-4"
                    >
                        The <span className="text-gradient">Core</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        A visual map of the infrastructure powering the ecosystem.
                    </p>
                </div>

                <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black/20 rounded-3xl border border-white/5 backdrop-blur-sm p-8">
                    {/* SVG Diagram */}
                    <svg viewBox="0 0 800 450" className="w-full h-full">
                        {/* Paths */}
                        <motion.path
                            d="M 400 50 L 400 150"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                        <motion.path
                            d="M 400 150 L 200 250"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                        <motion.path
                            d="M 400 150 L 600 250"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                        {/* Nodes */}
                        <motion.circle
                            cx="400" cy="50" r="8" fill="#4ade80"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0 }}
                            viewport={{ once: true }}
                        />
                        <motion.circle
                            cx="400" cy="150" r="12" fill="#14532d" stroke="#4ade80" strokeWidth="2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.5 }}
                            viewport={{ once: true }}
                        />
                        <motion.circle
                            cx="200" cy="250" r="12" fill="#14532d" stroke="#4ade80" strokeWidth="2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: 1 }}
                            viewport={{ once: true }}
                        />
                        <motion.circle
                            cx="600" cy="250" r="12" fill="#14532d" stroke="#4ade80" strokeWidth="2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", delay: 1 }}
                            viewport={{ once: true }}
                        />
                    </svg>

                    {/* Hotspots Layer */}
                    <div className="absolute inset-0">
                        {/* Client/SSR Hotspot (50/450 = 11.11%) */}
                        <Hotspot x="50%" y="11.11%" label="Client / SSR" onClick={() => setActiveDetail(details.ssr)} />

                        {/* API Gateway Hotspot (150/450 = 33.33%) */}
                        <Hotspot x="50%" y="33.33%" label="API Gateway" onClick={() => setActiveDetail(details.api)} />

                        {/* Database Hotspot (250/450 = 55.55%) */}
                        <Hotspot x="25%" y="55.55%" label="Database" onClick={() => setActiveDetail(details.db)} />

                        {/* Services Hotspot (250/450 = 55.55%) */}
                        <Hotspot x="75%" y="55.55%" label="Microservices" onClick={() => setActiveDetail(details.api)} />
                    </div>

                    {/* Labels - Centered and Offset */}
                    <div className="absolute top-[11.11%] left-1/2 ml-6 -translate-y-1/2 text-xs text-gray-500 font-mono">Frontend</div>
                    <div className="absolute top-[33.33%] left-1/2 ml-6 -translate-y-1/2 text-xs text-gray-500 font-mono">Orchestration</div>
                    <div className="absolute top-[55.55%] left-[25%] mt-6 -translate-x-1/2 text-xs text-gray-500 font-mono">Storage</div>
                    <div className="absolute top-[55.55%] left-[75%] mt-6 -translate-x-1/2 text-xs text-gray-500 font-mono">Logic</div>

                </div>

            </div>

            {/* Slide-over Panel */}
            {activeDetail && (
                <DetailPanel data={activeDetail} onClose={() => setActiveDetail(null)} />
            )}
        </section>
    );
};

export default CoreArchitecture;
