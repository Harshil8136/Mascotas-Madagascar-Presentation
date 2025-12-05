import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layout, Shield, Calendar, Terminal, Code, CheckCircle, Lock, Globe, Copy, Check } from 'lucide-react';

const tabs = [
    { id: 'ai', label: 'Neural Core', icon: Brain },
    { id: 'ui', label: 'UI & Motion', icon: Layout },
    { id: 'admin', label: 'Admin Power', icon: Terminal },
    { id: 'booking', label: 'Booking Logic', icon: Calendar },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'global', label: 'Global Infra', icon: Globe },
];

const content = {
    ai: {
        title: "The Neural Core",
        description: "Our IntentParser engine combines rule-based precision with fuzzy logic to understand natural language with 95% accuracy.",
        features: [
            { title: "Predictive Engine", desc: "Suggests 'Quick Actions' based on user history." },
            { title: "Sentiment Adaptation", desc: "The bot detects frustration and adapts its tone in real-time." }
        ],
        codeTitle: "intentParser.js",
        code: `// Entity Boosting
if (rule.intent === 'book_service' && hasServiceEntity) {
    confidence = 1.0;
}

// Fuzzy Matching
const fuse = new Fuse(data, { threshold: 0.4 });

// Sentiment Detection
if (lower.includes('angry')) {
    return 'frustrated';
}`
    },
    ui: {
        title: "Fluid Motion & SEO",
        description: "Using GSAP and Framer Motion for 60fps experiences, backed by a robust SEO engine.",
        features: [
            { title: "Dynamic SEO", desc: "Unique titles and meta tags for every route." },
            { title: "Engagement Engine", desc: "Social proof components drive conversion." }
        ],
        codeTitle: "SEOManager.js",
        code: `const updateSEO = (view) => {
  const config = SEO_CONFIG[view];
  document.title = config.title;
  
  document.querySelector('meta[name="description"]')
    .setAttribute('content', config.description);
}`
    },
    admin: {
        title: "Content Engine (CMS)",
        description: "A serverless CMS that injects updates instantly without rebuilding.",
        features: [
            { title: "Live Content Injection", desc: "Update prices via Vercel KV. Zero build time." },
            { title: "No-Build Updates", desc: "Marketing teams modify without developers." }
        ],
        codeTitle: "api/content.js",
        code: `if (req.method === 'POST') {
  const { content } = req.body;
  await kv.set('site_content', content);
  
  return res.status(200).json({ 
    success: true 
  });
}`
    },
    booking: {
        title: "Context-Aware Booking",
        description: "A hybrid engine combining forms with natural language and memory.",
        features: [
            { title: "Context Switching", desc: "Interrupt a booking, bot saves state and resumes." },
            { title: "Schema Validation", desc: "Every input validated against Zod-like schemas." }
        ],
        codeTitle: "BookingSlotManager.js",
        code: `if (message.includes('same as last time')) {
  const profile = this.dm.memory.getUserProfile();
  
  if (profile.bookingHistory?.length > 0) {
    const lastBooking = profile.bookingHistory[0];
    entity = { type: 'date', value: lastBooking.date };
  }
}`
    },
    security: {
        title: "Zero-Trust Architecture",
        description: "Multi-layered defense protecting data at rest and in transit.",
        features: [
            { title: "Session Monitoring", desc: "Automatic 30-minute idle timeout." },
            { title: "Input Neutralization", desc: "Recursive sanitization strips malicious code." }
        ],
        codeTitle: "useAdminAuth.js",
        code: `const TIMEOUT = 30 * 60 * 1000;

const resetTimer = () => {
  clearTimeout(timeout);
  timeout = setTimeout(logout, TIMEOUT);
};

['mousemove', 'keydown'].forEach(e => 
  window.addEventListener(e, resetTimer)
);`
    },
    global: {
        title: "Edge Mesh",
        description: "Deployed to 18+ regions for sub-50ms latency worldwide.",
        features: [
            { title: "Anycast Routing", desc: "Requests routed to nearest data center." },
            { title: "Infinite Scale", desc: "Serverless scales from 10 to 10M users." }
        ],
        codeTitle: "vercel.json",
        code: `{
  "regions": ["sfo1", "iad1", "lhr1", "hnd1"],
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "Cache-Control", "value": "s-maxage=31536000" }
    ]
  }]
}`
    }
};

// Simple syntax highlighting
const highlightSyntax = (code) => {
    return code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
        .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
        .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
        .replace(/\b(const|let|if|return|new|async|await)\b/g, '<span class="text-purple-400">$1</span>')
        .replace(/\b(console|window|document)\b/g, '<span class="text-yellow-400">$1</span>');
};

// Copy button
const CopyButton = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
            {copied ? <><Check size={14} className="text-green-400" /><span className="text-green-400">Copied!</span></> : <><Copy size={14} /><span>Copy</span></>}
        </button>
    );
};

const DeepDiveShowcase = () => {
    const [activeTab, setActiveTab] = useState('ai');

    return (
        <section className="min-h-screen bg-forest-900 py-24 relative overflow-hidden">
            {/* Simple background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[400px] h-[400px] bg-neon-500/5 rounded-full blur-[80px]" style={{ top: '10%', left: '10%' }} />
                <div className="absolute w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" style={{ bottom: '20%', right: '10%' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Technical <span className="text-gradient">Deep Dive</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Explore the engineering excellence behind every component.
                    </motion.p>
                </div>

                {/* Tabs Navigation - simplified */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-mono transition-all duration-200 border ${activeTab === tab.id
                                    ? 'bg-neon-500/10 border-neon-500/50 text-neon-400'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                        >
                            {/* Left: Text Content */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{content[activeTab].title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">{content[activeTab].description}</p>
                                </div>

                                <div className="space-y-4">
                                    {content[activeTab].features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-4 p-5 bg-white/[0.03] rounded-xl border border-white/5 hover:border-neon-500/30 transition-colors cursor-pointer group"
                                        >
                                            <div className="mt-0.5 text-neon-400">
                                                <CheckCircle size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1 group-hover:text-neon-400 transition-colors">{feature.title}</h4>
                                                <p className="text-sm text-gray-400">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Code Window - simplified, no typing animation */}
                            <div className="relative">
                                <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-xl">
                                    {/* Window Header */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                                                <Code size={12} />
                                                {content[activeTab].codeTitle}
                                            </div>
                                            <CopyButton code={content[activeTab].code} />
                                        </div>
                                    </div>

                                    {/* Code Content - static, no animation */}
                                    <div className="p-6 overflow-x-auto">
                                        <pre className="font-mono text-sm leading-relaxed">
                                            {content[activeTab].code.split('\n').map((line, i) => (
                                                <div key={i} className="table-row">
                                                    <span className="table-cell text-gray-600 select-none pr-4 text-right w-8">{i + 1}</span>
                                                    <span
                                                        className="table-cell whitespace-pre-wrap text-gray-300"
                                                        dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
                                                    />
                                                </div>
                                            ))}
                                        </pre>
                                    </div>

                                    {/* Status bar */}
                                    <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                                        <span>JavaScript</span>
                                        <span>{content[activeTab].code.split('\n').length} lines</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default DeepDiveShowcase;
