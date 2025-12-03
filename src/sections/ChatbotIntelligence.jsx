import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, MessageSquare, Zap, Layers, GitBranch, Terminal } from 'lucide-react';

const ProcessingStep = ({ label, status, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex items-center gap-3 mb-2"
    >
        <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-neon-500 animate-pulse' : status === 'done' ? 'bg-green-500' : 'bg-gray-700'}`} />
        <span className={`text-xs font-mono ${status === 'active' ? 'text-neon-400' : 'text-gray-500'}`}>{label}</span>
    </motion.div>
);

const ProbabilityBar = ({ label, score, color, delay }) => (
    <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ delay, duration: 1 }}
        className="mb-3"
    >
        <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">{label}</span>
            <span className={color}>{score}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${score}%` }}
                transition={{ delay, duration: 1.5, ease: "easeOut" }}
                className={`h-full ${color.replace('text-', 'bg-')}`}
            />
        </div>
    </motion.div>
);

const ChatbotIntelligence = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen bg-forest-950 relative flex items-center justify-center py-24 overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-500/10 border border-neon-500/20 text-neon-400 text-sm font-mono mb-6"
                    >
                        <Brain size={16} />
                        <span>Zero-Latency Cognitive Engine</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Deterministic <span className="text-gradient">Intelligence</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        No expensive API calls. No hallucinations. Just pure, client-side heuristic logic that processes natural language in milliseconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: The Engine Visualization */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-neon-500/20 to-blue-500/20 blur-2xl opacity-50 rounded-3xl" />
                        <div className="relative bg-forest-900 border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <Terminal size={20} className="text-gray-400" />
                                    <span className="font-mono text-sm text-gray-400">Live Processing Stream</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                            </div>

                            {/* Simulation */}
                            <div className="space-y-8">

                                {/* Input Analysis */}
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Input Vector</div>
                                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-sm">
                                        <span className="text-gray-400">"I want to book </span>
                                        <span className="text-neon-400 bg-neon-500/10 px-1 rounded">boarding</span>
                                        <span className="text-gray-400"> for my </span>
                                        <span className="text-blue-400 bg-blue-500/10 px-1 rounded">dog</span>
                                        <span className="text-gray-400"> </span>
                                        <span className="text-purple-400 bg-purple-500/10 px-1 rounded">tomorrow</span>
                                        <span className="text-gray-400">"</span>
                                    </div>
                                </div>

                                {/* Probability Matrix */}
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Probability Matrix</div>
                                    <ProbabilityBar label="Intent: book_service" score={98} color="text-neon-400" delay={0.2} />
                                    <ProbabilityBar label="Intent: question" score={12} color="text-gray-500" delay={0.4} />
                                    <ProbabilityBar label="Sentiment: Neutral" score={85} color="text-blue-400" delay={0.6} />
                                </div>

                                {/* Pipeline Steps */}
                                <div className="border-t border-white/5 pt-6">
                                    <ProcessingStep label="1. Sanitizer.js: Noise Removal" status="done" delay={0.1} />
                                    <ProcessingStep label="2. EntityExtractor: [Service, Pet, Date]" status="done" delay={0.3} />
                                    <ProcessingStep label="3. Fuse.js: Fuzzy Match (Threshold 0.4)" status="done" delay={0.5} />
                                    <ProcessingStep label="4. FlowStackManager: Push 'BookingFlow'" status="active" delay={0.7} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right: Feature Grid */}
                    <div className="space-y-8">

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4"
                        >
                            <div className="p-3 bg-neon-500/10 rounded-xl h-fit text-neon-400">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Zero-Cost Architecture</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Unlike OpenAI wrappers that cost per token, our solution runs entirely in the browser using <span className="text-white font-mono">Fuse.js</span> and Regex heuristics. Infinite scale, zero marginal cost.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-4"
                        >
                            <div className="p-3 bg-blue-500/10 rounded-xl h-fit text-blue-400">
                                <GitBranch size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">State Machine Logic</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Powered by <span className="text-white font-mono">FlowStackManager</span>, the bot handles context switching gracefully. Interrupt a booking to ask a question, and it resumes exactly where you left off.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-4"
                        >
                            <div className="p-3 bg-purple-500/10 rounded-xl h-fit text-purple-400">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Bilingual Native</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Dual-core processing with <span className="text-white font-mono">fuseInstanceEn</span> and <span className="text-white font-mono">fuseInstanceEs</span> ensures native-level understanding in English and Spanish without translation lag.
                                </p>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ChatbotIntelligence;
