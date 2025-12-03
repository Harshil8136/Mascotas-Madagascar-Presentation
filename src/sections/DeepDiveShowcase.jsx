import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layout, Shield, Calendar, Terminal, Code, CheckCircle, Lock, Zap, Database } from 'lucide-react';

const tabs = [
    { id: 'ai', label: 'Neural Core', icon: Brain },
    { id: 'ui', label: 'UI & Motion', icon: Layout },
    { id: 'admin', label: 'Admin Power', icon: Terminal },
    { id: 'booking', label: 'Booking Logic', icon: Calendar },
    { id: 'security', label: 'Security', icon: Shield },
];

const content = {
    ai: {
        title: "The Neural Core",
        description: "Our IntentParser engine combines rule-based precision with fuzzy logic to understand natural language with 95% accuracy.",
        features: [
            { title: "Fuzzy Logic & Entity Boosting", desc: "Typos? No problem. 'Groomng for Max' is recognized instantly. Detected entities boost intent confidence." },
            { title: "Sentiment Adaptation", desc: "The bot detects frustration or anxiety and adapts its tone in real-time." }
        ],
        codeTitle: "intentParser.js (Neural Core)",
        code: `// 1. Entity Boosting
if (rule.intent === 'book_service' && hasServiceEntity) {
    console.log('🚀 Boosting confidence due to Entity');
    confidence = 1.0;
}

// 2. Fuzzy Matching (Fuse.js)
const fuse = new window.Fuse(fuseData, {
    threshold: 0.4, // Tolerates typos
    includeScore: true
});

// 3. Sentiment Detection
if (lower.includes('angry') || lower.includes('worst')) {
    return 'frustrated'; // Triggers empathetic response
}`
    },
    ui: {
        title: "Fluid Motion & SEO",
        description: "We don't just move things; we choreograph them. Using GSAP and Framer Motion for 60fps experiences.",
        features: [
            { title: "ScrollTrigger Precision", desc: "Animations fire exactly when they enter the viewport, creating a storytelling experience." },
            { title: "Tailwind Architecture", desc: "Utility-first styling ensures consistency and reduces bundle size." }
        ],
        codeTitle: "Animation Logic",
        code: `// GSAP / Framer Motion Implementation
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <FeatureCard />
</motion.div>

// Tailwind Utility Classes
<button className="group p-8 rounded-2xl 
  border-2 border-white/10 
  hover:border-neon-500 
  hover:bg-neon-500/10 
  transition-all duration-300">`
    },
    admin: {
        title: "Mission Control",
        description: "A secure, intelligent panel to manage bookings, analyze AI conversations, and test communications.",
        features: [
            { title: "Email Simulation Engine", desc: "Generates complex scenarios (e.g., 'Difficult Customer') to test notification templates." },
            { title: "Deep Learning Analytics", desc: "Visual Confusion Matrices and Sentiment Trend Analysis." }
        ],
        codeTitle: "Simulation Engine Output",
        code: `{
  "scenario": "difficult_customer",
  "red_flags": [
    { "type": "Negative Sentiment", "msg": "Too expensive" },
    { "type": "Policy Violation", "msg": "Can I pay later?" }
  ],
  "outcome": "confirmed",
  "confidence": 0.94
}`
    },
    booking: {
        title: "Context-Aware Booking",
        description: "A hybrid engine combining structured forms with natural language and historical memory.",
        features: [
            { title: "Historical Intelligence", desc: "Instantly retrieves previous preferences. 'Same as last time' auto-fills the form." },
            { title: "Strict Schema Validation", desc: "Every input is sanitized and validated against rigorous Zod-like schemas." }
        ],
        codeTitle: "BookingSlotManager.js",
        code: `if (message.includes('same as last time')) {
  const profile = this.dm.memory.getUserProfile();
  
  if (profile.bookingHistory?.length > 0) {
    const lastBooking = profile.bookingHistory[0];
    
    // Auto-fill slots from history
    entity = { 
      type: 'date', 
      value: lastBooking.date 
    };
    
    console.log(\`📅 Found smart default: \${lastBooking.date}\`);
  }
}`
    },
    security: {
        title: "Fortified Architecture",
        description: "Defense-in-depth from day one. AES encryption, Bcrypt hashing, and zero-trust infrastructure.",
        features: [
            { title: "Secure Local Storage", desc: "Data is AES-256 encrypted before it ever touches the browser's disk." },
            { title: "Zero-Trust Auth", desc: "Passwords are never hashed on the client. Server-side Bcrypt verification only." }
        ],
        codeTitle: "SecureStorage.js",
        code: `setItem(key, value) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value), 
    this.secretKey
  ).toString();
  
  localStorage.setItem(key, encrypted);
}

// Result in Browser:
// "U2FsdGVkX1+..." (Unreadable garbage)`
    }
};

const DeepDiveShowcase = () => {
    const [activeTab, setActiveTab] = useState('ai');

    return (
        <section className="min-h-screen bg-forest-900 py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Technical <span className="text-gradient">Deep Dive</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore the engineering excellence behind every component of the ecosystem.
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-mono transition-all duration-300 border ${activeTab === tab.id
                                    ? 'bg-neon-500/10 border-neon-500 text-neon-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                        >
                            {/* Left: Text Content */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{content[activeTab].title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        {content[activeTab].description}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {content[activeTab].features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 + 0.2 }}
                                            className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-neon-500/30 transition-colors"
                                        >
                                            <div className="mt-1 text-neon-400">
                                                <CheckCircle size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                                                <p className="text-sm text-gray-400">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Code Window */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-br from-neon-500/10 to-blue-500/10 blur-2xl rounded-3xl opacity-50" />
                                <div className="relative bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                                    {/* Window Header */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                                            <Code size={12} />
                                            {content[activeTab].codeTitle}
                                        </div>
                                    </div>

                                    {/* Code Content */}
                                    <div className="p-6 overflow-x-auto">
                                        <pre className="font-mono text-sm leading-relaxed">
                                            <code className="text-gray-300">
                                                {content[activeTab].code.split('\n').map((line, i) => (
                                                    <div key={i} className="table-row">
                                                        <span className="table-cell text-gray-600 select-none pr-4 text-right w-8">{i + 1}</span>
                                                        <span className="table-cell whitespace-pre-wrap" dangerouslySetInnerHTML={{
                                                            __html: line
                                                                .replace(/</g, '&lt;')
                                                                .replace(/>/g, '&gt;')
                                                                .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
                                                                .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
                                                                .replace(/(`.*?`)/g, '<span class="text-green-400">$1</span>')
                                                                .replace(/\b(const|let|var|if|return|new|class|import|from|export|default|function|async|await)\b/g, '<span class="text-purple-400">$1</span>')
                                                                .replace(/\b(console|window|localStorage|JSON|Math|Object|Array)\b/g, '<span class="text-yellow-400">$1</span>')
                                                                .replace(/\b(log|setItem|getItem|parse|stringify|encrypt|toString|map|filter|reduce)\b/g, '<span class="text-blue-400">$1</span>')
                                                        }} />
                                                    </div>
                                                ))}
                                            </code>
                                        </pre>
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
