import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Linkedin, FileText, Download, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-20 border-t border-white/10 bg-forest-900 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-neon-500 to-transparent opacity-50" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                        Project <span className="text-gradient">Documentation</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        Access the complete project documentation and view the live deployment.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                        <a href="/downloads/Madagascar.md" download className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group">
                            <FileText className="text-neon-400 group-hover:scale-110 transition-transform" size={20} />
                            <div className="text-left">
                                <div className="text-white font-medium">Documentation.md</div>
                                <div className="text-xs text-gray-500">Markdown File</div>
                            </div>
                            <Download size={16} className="text-gray-500 group-hover:text-white ml-2" />
                        </a>

                        <a href="/downloads/Madagascar.docx" download className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group">
                            <FileText className="text-blue-400 group-hover:scale-110 transition-transform" size={20} />
                            <div className="text-left">
                                <div className="text-white font-medium">Documentation.docx</div>
                                <div className="text-xs text-gray-500">Word Document</div>
                            </div>
                            <Download size={16} className="text-gray-500 group-hover:text-white ml-2" />
                        </a>

                        <a href="/downloads/Madagascar.pdf" download className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group">
                            <FileText className="text-red-400 group-hover:scale-110 transition-transform" size={20} />
                            <div className="text-left">
                                <div className="text-white font-medium">Documentation.pdf</div>
                                <div className="text-xs text-gray-500">PDF Document</div>
                            </div>
                            <Download size={16} className="text-gray-500 group-hover:text-white ml-2" />
                        </a>
                    </div>

                    <a href="https://mascotas-madagascar.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-glow text-lg px-10 py-4 inline-flex items-center gap-2">
                        Live Preview <ExternalLink size={20} />
                    </a>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-sm text-gray-500">
                    <div className="mb-4 md:mb-0">
                        &copy; 2025 Mascotas Madagascar. All rights reserved.
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-neon-400 transition-colors">System Status</a>
                        <a href="#" className="hover:text-neon-400 transition-colors">Privacy Protocol</a>
                        <a href="#" className="hover:text-neon-400 transition-colors">Documentation</a>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
