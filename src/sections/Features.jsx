import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sun, Sparkles, Stethoscope, ShieldCheck, Truck } from 'lucide-react';
import Card from '../components/Card';

const features = [
    {
        id: 'boarding',
        title: 'Premium Boarding',
        subtitle: '26 Private Suites',
        description: 'Individual care model with zero forced socialization. 24/7 monitoring and climate control.',
        icon: Home,
        colSpan: 'md:col-span-2',
        bgGradient: 'from-forest-800 to-forest-900',
    },
    {
        id: 'daycare',
        title: 'Social Daycare',
        subtitle: 'Supervised Play',
        description: 'Structured socialization groups based on size and temperament.',
        icon: Sun,
        colSpan: 'md:col-span-1',
        bgGradient: 'from-forest-800 to-forest-900',
    },
    {
        id: 'grooming',
        title: 'Luxury Spa',
        subtitle: 'Full Grooming',
        description: 'Professional styling, bathing, and hygienic care.',
        icon: Sparkles,
        colSpan: 'md:col-span-1',
        bgGradient: 'from-forest-800 to-forest-900',
    },
    {
        id: 'vet',
        title: 'Veterinary',
        subtitle: '24/7 On-Site',
        description: 'Immediate medical attention and health monitoring.',
        icon: Stethoscope,
        colSpan: 'md:col-span-2',
        bgGradient: 'from-forest-800 to-forest-900',
    },
];

const Features = () => {
    return (
        <section id="features" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The <span className="text-gradient">Ecosystem</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        A comprehensive suite of pet care services, integrated into a single seamless platform.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={feature.id}
                            className={`${feature.colSpan} min-h-[300px] flex flex-col justify-between hover:border-neon-500/30 transition-colors`}
                            delay={index * 0.1}
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-xl bg-neon-500/10 flex items-center justify-center mb-4 text-neon-400">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-neon-400 font-medium tracking-wide text-sm uppercase">{feature.subtitle}</p>
                            </div>

                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>

                            <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-10 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <feature.icon size={120} />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
