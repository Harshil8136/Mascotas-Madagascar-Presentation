import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { systemModules } from '../data/systemData';
import DetailModal from './DetailModal';
import { Search, Terminal } from 'lucide-react';

const InspectorDashboard = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [hoveredModule, setHoveredModule] = useState(null);

    return (
        <div className="min-h-screen bg-forest-900 text-white p-6 md:p-12 font-sans relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 rounded-full bg-neon-500 animate-pulse" />
                            <span className="text-neon-400 text-xs font-mono uppercase tracking-widest">System Architecture Inspector v2.0</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold">
                            Mascotas <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Madagascar</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
                        <Terminal size={18} className="text-gray-400" />
                        <span className="font-mono text-sm text-gray-400">scanning_root_dir...</span>
                        <span className="text-neon-500 font-mono text-sm">Done</span>
                    </div>
                </header>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {systemModules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            layoutId={`card-${module.id}`}
                            onClick={() => setSelectedModule(module)}
                            onMouseEnter={() => setHoveredModule(module.id)}
                            onMouseLeave={() => setHoveredModule(null)}
                            className="group relative bg-glass-100 backdrop-blur-md border border-white/10 rounded-3xl p-8 cursor-pointer overflow-hidden hover:border-white/20 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Hover Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-3 rounded-xl bg-white/5 ${module.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <module.icon size={24} />
                                    </div>
                                    <div className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">
                                        MOD-{index + 1}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-400 transition-colors">{module.title}</h3>
                                <p className="text-gray-400 text-sm mb-6">{module.subtitle}</p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Status</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-500" />
                                        <span className="text-sm font-medium text-white">Active</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            <DetailModal
                module={selectedModule}
                isOpen={!!selectedModule}
                onClose={() => setSelectedModule(null)}
            />
        </div>
    );
};

export default InspectorDashboard;
