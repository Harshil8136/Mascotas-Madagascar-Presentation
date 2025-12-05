import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Smartphone, Globe, Clock, Database, Mail, ShieldAlert, Activity, TrendingUp, Zap } from 'lucide-react';

// Simple Sparkline - CSS only, no Framer Motion animation
const SparklineChart = React.memo(({ data, color, height = 40 }) => {
    const points = useMemo(() => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;
        return data.map((val, i) => ({
            x: (i / (data.length - 1)) * 100,
            y: 100 - ((val - min) / range) * 100
        }));
    }, [data]);

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full" style={{ height }} preserveAspectRatio="none">
            <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <circle cx={points[points.length - 1]?.x || 0} cy={points[points.length - 1]?.y || 0} r="3" fill={color} />
        </svg>
    );
});

// Simple Counter with CSS transition
const Counter = React.memo(({ value, label, color, icon: Icon, chartData }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const end = parseFloat(value) || 0;
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * end));

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [value]);

    const unit = value.replace(/[0-9.]/g, '');

    return (
        <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 text-center hover:border-white/10 transition-colors group">
            {Icon && (
                <div className={`mx-auto mb-3 p-2 rounded-lg w-fit ${color.replace('text-', 'bg-').replace('-400', '-500/10')}`}>
                    <Icon size={20} className={color} />
                </div>
            )}
            <div className={`text-4xl font-mono font-bold mb-2 ${color}`}>
                {count}{unit}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-4">{label}</div>
            {chartData && (
                <div className="opacity-50 group-hover:opacity-80 transition-opacity">
                    <SparklineChart
                        data={chartData}
                        color={color.includes('neon') ? '#4ade80' : color.includes('blue') ? '#3b82f6' : color.includes('yellow') ? '#eab308' : '#22c55e'}
                    />
                </div>
            )}
        </div>
    );
});

// Progress Ring - CSS animation
const ProgressRing = React.memo(({ progress, size = 60, strokeWidth = 4, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle className="text-white/5" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
                <circle
                    className={`${color} transition-all duration-1000`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-bold ${color}`}>{progress}%</span>
            </div>
        </div>
    );
});

const AnalyticsDashboard = () => {
    const chartData = {
        accuracy: [85, 88, 91, 89, 94, 96, 98],
        messages: [8, 9, 10, 11, 10, 12, 12],
        response: [500, 480, 450, 420, 410, 400, 400],
        uptime: [99, 100, 100, 100, 100, 100, 100],
    };

    return (
        <section className="min-h-screen bg-forest-900 py-24 relative overflow-hidden">
            {/* Simple background - static */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-6"
                    >
                        <Activity size={16} />
                        <span>Business Intelligence</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Data That <span className="text-gradient">Drives Growth</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Every interaction is analyzed and delivered as actionable intelligence.
                    </motion.p>
                </div>

                {/* Metrics Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Counter value="98%" label="Intent Accuracy" color="text-neon-400" icon={Zap} chartData={chartData.accuracy} />
                    <Counter value="12k" label="Messages Processed" color="text-blue-400" icon={Mail} chartData={chartData.messages} />
                    <Counter value="400ms" label="Avg Response Time" color="text-yellow-400" icon={Clock} chartData={chartData.response} />
                    <Counter value="100%" label="Uptime" color="text-green-400" icon={TrendingUp} chartData={chartData.uptime} />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Payload Visualization - simplified */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Database size={24} className="text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">The Perfect Payload</h3>
                        </div>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Our <span className="text-white font-mono">EmailService</span> constructs rich JSON with deep context about the user and conversation.
                        </p>

                        {/* Static JSON display */}
                        <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden font-mono text-sm">
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <span className="text-gray-500 text-xs">payload.json</span>
                            </div>
                            <pre className="p-6 text-gray-300 leading-relaxed overflow-x-auto">
                                {`{
  customer: {
    name: 'Harshil',
    pet: 'Max (Golden Retriever)'
  },
  metadata: {
    device: 'iPhone 14 Pro',
    location: 'Mexico City, MX'
  },
  analysis: {
    intent: 'book_service',
    confidence: 0.98,
    sentiment: 'positive'
  }
}`}
                            </pre>
                        </div>
                    </motion.div>

                    {/* Right: Session Forensics */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <div className="p-2 bg-neon-500/20 rounded-lg">
                                <ShieldAlert size={24} className="text-neon-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Session Forensics</h3>
                        </div>

                        <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                        <Smartphone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Device Fingerprinting</h4>
                                        <p className="text-sm text-gray-400">Know your audience</p>
                                    </div>
                                </div>
                                <ProgressRing progress={94} color="text-blue-400" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                We capture screen size, OS version, and browser type to optimize for your customers' devices.
                            </p>
                        </div>

                        <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-neon-500/30 transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-neon-500/20 rounded-lg text-neon-400">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-neon-400 transition-colors">Zero-Cookie Tracking</h4>
                                        <p className="text-sm text-gray-400">Privacy first</p>
                                    </div>
                                </div>
                                <ProgressRing progress={100} color="text-neon-400" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                We use ephemeral <span className="font-mono text-neon-400">SessionStorage</span> to track journeys without invasive cookies.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
