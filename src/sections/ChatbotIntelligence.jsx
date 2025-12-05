import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, MessageSquare, Zap, Layers, GitBranch, Terminal } from 'lucide-react';

// Simplified Neural Network Background - fewer nodes, CSS animations
const NeuralNetworkBg = React.memo(() => {
    const nodes = useMemo(() =>
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: 15 + (i % 4) * 22,
            y: 20 + Math.floor(i / 4) * 35,
            size: 3 + (i % 2) * 2,
        })),
        []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            <svg className="w-full h-full">
                {/* Simple connection lines */}
                {nodes.slice(0, 4).map((node, i) => (
                    <line
                        key={`line-${i}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${nodes[i + 4]?.x || 50}%`}
                        y2={`${nodes[i + 4]?.y || 60}%`}
                        stroke="rgba(74, 222, 128, 0.3)"
                        strokeWidth="1"
                    />
                ))}
                {/* Static nodes with CSS pulse */}
                {nodes.map((node) => (
                    <circle
                        key={node.id}
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={node.size}
                        fill="rgba(74, 222, 128, 0.4)"
                        className="animate-pulse-slow"
                    />
                ))}
            </svg>
        </div>
    );
});

// Processing step - simplified animation
const ProcessingStep = React.memo(({ label, status, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex items-center gap-3 mb-3"
    >
        <div
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${status === 'active' ? 'bg-neon-500 animate-pulse' :
                    status === 'done' ? 'bg-green-500' : 'bg-gray-700'
                }`}
        />
        <span className={`text-xs font-mono transition-colors duration-300 ${status === 'active' ? 'text-neon-400' :
                status === 'done' ? 'text-green-400' : 'text-gray-500'
            }`}>
            {label}
        </span>
        {status === 'done' && <span className="text-green-400 text-xs">✓</span>}
    </motion.div>
));

// Simple probability bar - CSS transitions instead of Framer Motion
const ProbabilityBar = React.memo(({ label, score, color, isWinner }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">{label}</span>
            <span className={color}>{score}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${color.replace('text-', 'bg-')}`}
                style={{ width: `${score}%` }}
            />
        </div>
    </div>
));

// Entity highlighting - simplified
const HighlightedEntity = ({ children, colorClass }) => (
    <span className={`px-1 rounded ${colorClass}`}>{children}</span>
);

const ChatbotIntelligence = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [inputText, setInputText] = useState('');
    const fullText = "I want to book boarding for my dog tomorrow";

    // Optimized typing effect - faster, simpler
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i <= fullText.length) {
                setInputText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 35);
        return () => clearInterval(timer);
    }, []);

    // Step progression
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 5);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const getStepStatus = (stepIndex) => {
        if (stepIndex < activeStep) return 'done';
        if (stepIndex === activeStep) return 'active';
        return 'pending';
    };

    const isTypingDone = inputText.length >= fullText.length;

    return (
        <section className="min-h-screen bg-forest-950 relative flex items-center justify-center py-24 overflow-hidden">
            <NeuralNetworkBg />

            {/* Simple grid background - CSS only */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-500/10 border border-neon-500/20 text-neon-400 text-sm font-mono mb-6"
                    >
                        <Brain size={16} />
                        <span>Zero-Latency Cognitive Engine</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Deterministic <span className="text-gradient">Intelligence</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        No expensive API calls. No hallucinations. Just pure, client-side heuristic logic.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Engine Visualization */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative bg-forest-900/80 border border-white/10 rounded-2xl p-8 overflow-hidden backdrop-blur-sm">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <Terminal size={18} className="text-gray-400" />
                                    <span className="font-mono text-sm text-gray-400">Live Processing</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Input with typing */}
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">
                                        Input Vector
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-sm min-h-[60px]">
                                        <span className="text-gray-400">"</span>
                                        {isTypingDone ? (
                                            <>
                                                <span className="text-gray-400">I want to book </span>
                                                <HighlightedEntity colorClass="text-neon-400 bg-neon-500/20">boarding</HighlightedEntity>
                                                <span className="text-gray-400"> for my </span>
                                                <HighlightedEntity colorClass="text-blue-400 bg-blue-500/20">dog</HighlightedEntity>
                                                <span className="text-gray-400"> </span>
                                                <HighlightedEntity colorClass="text-purple-400 bg-purple-500/20">tomorrow</HighlightedEntity>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-gray-300">{inputText}</span>
                                                <span className="inline-block w-2 h-4 bg-neon-400 animate-pulse ml-0.5" />
                                            </>
                                        )}
                                        <span className="text-gray-400">"</span>
                                    </div>
                                </div>

                                {/* Probability Bars - simple CSS transitions */}
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">
                                        Probability Matrix
                                    </div>
                                    <ProbabilityBar label="Intent: book_service" score={98} color="text-neon-400" isWinner={true} />
                                    <ProbabilityBar label="Intent: question" score={12} color="text-gray-500" />
                                    <ProbabilityBar label="Sentiment: Neutral" score={85} color="text-blue-400" />
                                </div>

                                {/* Pipeline Steps */}
                                <div className="border-t border-white/5 pt-6">
                                    <ProcessingStep label="1. Sanitizer.js: Noise Removal" status={getStepStatus(0)} delay={0.1} />
                                    <ProcessingStep label="2. EntityExtractor: [Service, Pet, Date]" status={getStepStatus(1)} delay={0.15} />
                                    <ProcessingStep label="3. Fuse.js: Fuzzy Match (0.4)" status={getStepStatus(2)} delay={0.2} />
                                    <ProcessingStep label="4. FlowStackManager: Push 'BookingFlow'" status={getStepStatus(3)} delay={0.25} />
                                    <ProcessingStep label="5. ResponseGenerator: Build Reply" status={getStepStatus(4)} delay={0.3} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Feature Grid */}
                    <div className="space-y-6">
                        {[
                            { icon: Zap, title: 'Predictive Engine', desc: 'Suggests "Quick Actions" based on user history, reducing friction by 80%.', color: 'neon' },
                            { icon: GitBranch, title: 'Context Switching', desc: 'Interrupt a booking to ask a question, and the bot resumes exactly where you left off.', color: 'blue' },
                            { icon: Layers, title: 'Adaptive System', desc: 'Detects frustration and adjusts wait times dynamically.', color: 'purple' },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-${feature.color}-500/30 transition-colors group cursor-pointer`}
                            >
                                <div className={`p-3 bg-${feature.color}-500/10 rounded-xl h-fit text-${feature.color}-400 group-hover:scale-105 transition-transform`}>
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-${feature.color}-400 transition-colors`}>{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatbotIntelligence;
