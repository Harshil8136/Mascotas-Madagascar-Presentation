import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const MockBookingWidget = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="relative w-full max-w-md mx-auto perspective-1000 group">
            {/* Deconstructed Layers */}
            <motion.div
                className="absolute inset-0 bg-neon-500/20 rounded-2xl blur-xl -z-10 transition-transform duration-500 group-hover:scale-110"
            />

            {/* Logic Layer (Back) */}
            <motion.div
                className="absolute inset-0 bg-forest-800 rounded-2xl border border-neon-500/30 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-12 group-hover:-translate-y-12 -z-10"
            >
                <div className="font-mono text-xs text-neon-400">
                    <div>// Logic Layer</div>
                    <div className="mt-2 text-gray-400">
                        if (availability) {'{'}<br />
                        &nbsp;&nbsp;confirmBooking();<br />
                        {'}'} else {'{'}<br />
                        &nbsp;&nbsp;suggestAlternative();<br />
                        {'}'}
                    </div>
                </div>
            </motion.div>

            {/* UI Layer (Front) */}
            <div className="bg-forest-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white">Book Stay</h3>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={clsx("w-2 h-2 rounded-full", i <= step ? "bg-neon-500" : "bg-gray-700")} />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold">Dates</label>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center gap-2 text-sm transition-colors border border-white/5 hover:border-neon-500/50">
                                <Calendar size={16} className="text-neon-400" />
                                <span>Check-in</span>
                            </button>
                            <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center gap-2 text-sm transition-colors border border-white/5 hover:border-neon-500/50">
                                <Clock size={16} className="text-neon-400" />
                                <span>Check-out</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold">Guest</label>
                        <button className="w-full bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center justify-between text-sm transition-colors border border-white/5 hover:border-neon-500/50">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-neon-400" />
                                <span>Select Pet Profile</span>
                            </div>
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>
                    </div>

                    <button
                        onClick={() => setStep(prev => prev < 3 ? prev + 1 : 1)}
                        className="w-full py-3 bg-neon-500 hover:bg-neon-400 text-forest-900 font-bold rounded-lg transition-colors mt-4 flex items-center justify-center gap-2"
                    >
                        {step === 3 ? <CheckCircle size={18} /> : null}
                        {step === 3 ? 'Confirmed' : 'Check Availability'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ChevronDown = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const ComponentLab = () => {
    return (
        <section id="lab" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-500/10 border border-neon-500/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-neon-500 animate-pulse" />
                                <span className="text-xs font-medium tracking-widest uppercase text-neon-400">
                                    Component Lab
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                Atomic <span className="text-gradient">Precision</span>
                            </h2>

                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Every interaction is micro-engineered for delight. Our components aren't just pixels; they are intelligent, state-aware organisms that adapt to user intent.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-neon-400 font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">State-Aware Animations</h4>
                                        <p className="text-sm text-gray-500">Fluid transitions between loading, error, and success states.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-neon-400 font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Accessibility First</h4>
                                        <p className="text-sm text-gray-500">Full keyboard navigation and screen reader support built-in.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full flex justify-center">
                        <MockBookingWidget />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComponentLab;
