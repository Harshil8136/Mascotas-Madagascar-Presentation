import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Server, Shield, Zap } from 'lucide-react';

const DetailModal = ({ module, isOpen, onClose }) => {
    if (!module) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="bg-forest-900 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto relative flex flex-col md:flex-row">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>

                            {/* Sidebar / Header */}
                            <div className={`p-8 md:w-1/3 bg-gradient-to-br ${module.bgGradient} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 ${module.color}`}>
                                            <module.icon size={32} />
                                        </div>
                                        <h2 className="text-3xl font-display font-bold text-white mb-2">{module.title}</h2>
                                        <p className="text-white/70 font-medium">{module.subtitle}</p>
                                    </div>

                                    <div className="mt-12">
                                        <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Key Metric</div>
                                        <div className="text-5xl font-display font-bold text-white">{module.stats.value}</div>
                                        <div className="text-sm text-white/70">{module.stats.label}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:w-2/3 bg-forest-900">
                                <div className="space-y-8">

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                                            <Server size={16} /> The Code Reality
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {module.details.techStack.map((tech, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/5 rounded-lg p-3">
                                                    <div className={`font-bold text-sm ${module.color}`}>{tech.name}</div>
                                                    <div className="text-xs text-gray-400">{tech.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Business Benefit */}
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                                            <Zap size={16} /> Business Benefit
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed border-l-2 border-neon-500 pl-4">
                                            {module.details.businessBenefit}
                                        </p>
                                    </div>

                                    {/* Benchmark */}
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                                            <Shield size={16} /> Industry Benchmark
                                        </h3>
                                        <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                            <p className="text-gray-400 text-sm">
                                                <span className="text-red-400 font-bold">VS Standard:</span> {module.details.industryBenchmark}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Security/Perf Footer */}
                                    <div className="pt-6 border-t border-white/5 flex items-start gap-3">
                                        <CheckCircle size={20} className="text-neon-500 shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-400">
                                            <span className="text-white font-bold">Verified:</span> {module.details.securityPerf}
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DetailModal;
