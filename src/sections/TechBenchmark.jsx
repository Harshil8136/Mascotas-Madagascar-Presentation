import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Shield, Database } from 'lucide-react';
import Card from '../components/Card';

const ComparisonRow = ({ label, agency, us, delay }) => (
    <motion.div
        className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 last:border-0 items-center"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
    >
        <div className="text-gray-400 font-medium">{label}</div>
        <div className="text-gray-500 text-sm flex items-center gap-2">
            <X size={16} className="text-red-500" />
            {agency}
        </div>
        <div className="text-neon-400 font-bold text-sm flex items-center gap-2">
            <Check size={16} className="text-neon-500" />
            {us}
        </div>
    </motion.div>
);

const StatCard = ({ icon: Icon, value, label, delay }) => (
    <Card className="flex flex-col items-center justify-center text-center py-12" delay={delay}>
        <div className="w-16 h-16 rounded-full bg-neon-500/10 flex items-center justify-center mb-4 text-neon-400">
            <Icon size={32} />
        </div>
        <motion.div
            className="text-4xl font-display font-bold text-white mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: delay + 0.2 }}
        >
            {value}
        </motion.div>
        <div className="text-gray-400 uppercase tracking-wider text-xs">{label}</div>
    </Card>
);

const TechBenchmark = () => {
    return (
        <section id="benchmarks" className="py-24 relative bg-forest-900/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl md:text-5xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Technical <span className="text-gradient">Benchmark</span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Where the industry settles for "good enough", we engineer for excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Comparison Table */}
                    <Card className="p-0">
                        <div className="p-8 border-b border-white/10 bg-white/5">
                            <h3 className="text-xl font-bold text-white">Ownership vs Renting</h3>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-3 gap-4 mb-4 text-xs uppercase tracking-widest text-gray-500 font-bold">
                                <div>Metric</div>
                                <div>Generic Agency</div>
                                <div className="text-neon-500">Mascotas Asset</div>
                            </div>
                            <ComparisonRow
                                label="Monthly AI Cost"
                                agency="$0.10 / msg"
                                us="$0.00 / month"
                                delay={0.1}
                            />
                            <ComparisonRow
                                label="Response Latency"
                                agency="~1.5s"
                                us="~12ms"
                                delay={0.2}
                            />
                            <ComparisonRow
                                label="Data Privacy"
                                agency="3rd Party Servers"
                                us="Local Device"
                                delay={0.3}
                            />
                            <ComparisonRow
                                label="Uptime SLA"
                                agency="99.0%"
                                us="99.99% (Edge)"
                                delay={0.4}
                            />
                        </div>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard
                            icon={Zap}
                            value="12ms"
                            label="Response Time"
                            delay={0.2}
                        />
                        <StatCard
                            icon={Shield}
                            value="100%"
                            label="GDPR Compliant"
                            delay={0.3}
                        />
                        <StatCard
                            icon={Database}
                            value="0"
                            label="API Costs"
                            delay={0.4}
                        />
                        <Card className="flex flex-col items-center justify-center text-center bg-neon-500 text-forest-900" delay={0.5}>
                            <div className="text-4xl font-bold mb-2">A+</div>
                            <div className="text-forest-800 uppercase tracking-wider text-xs font-bold">Security Grade</div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechBenchmark;
