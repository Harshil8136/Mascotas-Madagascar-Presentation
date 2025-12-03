import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BarChart3, Smartphone, Globe, Clock, Database, Mail, ShieldAlert, Activity } from 'lucide-react';

const Counter = ({ value, label, color }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value.substring(0, value.length - 1)) || 0; // Handle "98%" or "10k"
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm text-center group hover:border-neon-500/30 transition-colors">
            <div className={`text-4xl font-mono font-bold mb-2 ${color}`}>
                {count}{value.includes('%') ? '%' : value.includes('k') ? 'k' : ''}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
    );
};

const PayloadViewer = () => {
    return (
        <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl font-mono text-xs md:text-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-gray-500">payload.json</div>
            </div>
            <div className="p-6 overflow-x-auto text-gray-300 leading-relaxed">
                <pre>
                    <span className="text-purple-400">const</span> <span className="text-blue-400">emailData</span> = {'{'}{'\n'}
                    &nbsp;&nbsp;<span className="text-gray-500">// 1. Customer Context</span>{'\n'}
                    &nbsp;&nbsp;<span className="text-red-400">customer</span>: {'{'}{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;name: <span className="text-green-400">'Harshil'</span>,{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;pet: <span className="text-green-400">'Max (Golden Retriever)'</span>{'\n'}
                    &nbsp;&nbsp;{'}'},{'\n'}
                    {'\n'}
                    &nbsp;&nbsp;<span className="text-gray-500">// 2. Session Forensics</span>{'\n'}
                    &nbsp;&nbsp;<span className="text-red-400">metadata</span>: {'{'}{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;device: <span className="text-green-400">'iPhone 14 Pro'</span>,{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;location: <span className="text-green-400">'Mexico City, MX'</span>,{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;ip: <span className="text-green-400">'192.168.1.1'</span>{'\n'}
                    &nbsp;&nbsp;{'}'},{'\n'}
                    {'\n'}
                    &nbsp;&nbsp;<span className="text-gray-500">// 3. AI Analysis</span>{'\n'}
                    &nbsp;&nbsp;<span className="text-red-400">analysis</span>: {'{'}{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;intent: <span className="text-green-400">'book_service'</span>,{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;confidence: <span className="text-yellow-400">0.98</span>,{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;sentiment: <span className="text-green-400">'positive'</span>{'\n'}
                    &nbsp;&nbsp;{'}'}{'\n'}
                    {'}'};
                </pre>
            </div>
        </div>
    );
};

const AnalyticsDashboard = () => {
    return (
        <section className="min-h-screen bg-forest-900 py-24 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-6"
                    >
                        <Activity size={16} />
                        <span>Business Intelligence</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Data That <span className="text-gradient">Drives Growth</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We don't just process bookings; we generate insights. Every interaction is analyzed, categorized, and delivered as actionable intelligence.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    <Counter value="98%" label="Intent Accuracy" color="text-neon-400" />
                    <Counter value="12k" label="Messages Processed" color="text-blue-400" />
                    <Counter value="0.4s" label="Avg Response Time" color="text-yellow-400" />
                    <Counter value="100%" label="Uptime" color="text-green-400" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Payload Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <Database size={24} className="text-blue-400" />
                            <h3 className="text-2xl font-bold text-white">The Perfect Payload</h3>
                        </div>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Forget basic email notifications. Our <span className="text-white font-mono">EmailService</span> constructs a rich JSON payload containing deep context about the user, their device, and the conversation history.
                        </p>
                        <PayloadViewer />
                    </motion.div>

                    {/* Right: Session Forensics */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <ShieldAlert size={24} className="text-neon-400" />
                            <h3 className="text-2xl font-bold text-white">Session Forensics</h3>
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Device Fingerprinting</h4>
                                    <p className="text-sm text-gray-400">Know your audience</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                We capture screen size, OS version, and browser type to help you optimize your services for the devices your customers actually use.
                            </p>
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-neon-500/20 rounded-lg text-neon-400">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Zero-Cookie Tracking</h4>
                                    <p className="text-sm text-gray-400">Privacy first</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                We use ephemeral <span className="font-mono text-neon-400">SessionStorage</span> to track user journeys without invasive persistent cookies, ensuring GDPR compliance.
                            </p>
                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AnalyticsDashboard;
