import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, FileText, Download, ExternalLink, Heart } from 'lucide-react';

// Simple download card - no complex animations
const DownloadCard = React.memo(({ href, icon: Icon, iconColor, title, subtitle, delay }) => (
    <motion.a
        href={href}
        download
        className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-xl transition-all group"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
    >
        <Icon className={iconColor} size={22} />
        <div className="text-left">
            <div className="text-white font-medium">{title}</div>
            <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        <Download size={16} className="ml-auto text-gray-500 group-hover:text-white transition-colors" />
    </motion.a>
));

// Simple social icon
const SocialIcon = React.memo(({ href, icon: Icon, delay }) => (
    <motion.a
        href={href}
        className="p-3 hover:bg-white/10 rounded-full transition-colors hover:text-neon-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
    >
        <Icon size={20} />
    </motion.a>
));

const Footer = () => {
    return (
        <footer className="py-24 border-t border-white/10 bg-forest-900 relative overflow-hidden">
            {/* Simple gradient background */}
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-neon-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-bold mb-8"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Project <span className="text-gradient">Documentation</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Access the complete project documentation and view the live deployment.
                    </motion.p>

                    {/* Download Cards */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
                        <DownloadCard href="/downloads/Madagascar.md" icon={FileText} iconColor="text-neon-400" title="Documentation.md" subtitle="Markdown" delay={0.15} />
                        <DownloadCard href="/downloads/Madagascar.docx" icon={FileText} iconColor="text-blue-400" title="Documentation.docx" subtitle="Word" delay={0.2} />
                        <DownloadCard href="/downloads/Madagascar.pdf" icon={FileText} iconColor="text-red-400" title="Documentation.pdf" subtitle="PDF" delay={0.25} />
                    </div>

                    {/* CTA Button - simplified */}
                    <motion.a
                        href="https://mascotas-madagascar.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-neon-500 text-forest-900 font-bold rounded-full hover:bg-neon-400 transition-colors shadow-[0_0_30px_rgba(74,222,128,0.3)]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-lg">Live Preview</span>
                        <ExternalLink size={20} />
                    </motion.a>
                </motion.div>

                {/* Bottom section */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="mb-4 md:mb-0 flex items-center gap-2">
                        <span>&copy; 2025 Mascotas Madagascar.</span>
                        <span>Made with <Heart size={12} className="text-red-400 inline" /></span>
                    </div>

                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                        {['System Status', 'Privacy', 'Docs'].map((item) => (
                            <a key={item} href="#" className="hover:text-neon-400 transition-colors">{item}</a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <SocialIcon href="#" icon={Github} delay={0.45} />
                        <SocialIcon href="#" icon={Twitter} delay={0.5} />
                        <SocialIcon href="#" icon={Linkedin} delay={0.55} />
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
