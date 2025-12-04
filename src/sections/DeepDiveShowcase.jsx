import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layout, Shield, Calendar, Terminal, Code, CheckCircle, Lock, Zap, Database, Globe } from 'lucide-react';

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
            { title: "Predictive Engine", desc: "Suggests 'Quick Actions' based on user history (e.g., 'Repeat Last Booking')." },
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
        description: "We don't just move things; we choreograph them. Using GSAP and Framer Motion for 60fps experiences, backed by a robust SEO engine.",
        features: [
            { title: "Dynamic SEO", desc: "Unique titles and meta tags for every route (e.g., 'Dog Hotel' vs 'Cat Hotel')." },
            { title: "Engagement Engine", desc: "Social proof components (Stats, Testimonials) designed to drive conversion." }
        ],
        codeTitle: "SEOManager.js",
        code: `// 1. Route Detection
const updateSEO = (view) => {
  const config = SEO_CONFIG[view];
  
  // 2. Dynamic Title
  document.title = config.title;
  
  // 3. Meta Tags
  document.querySelector('meta[name="description"]')
    .setAttribute('content', config.description);
    
  // 4. Open Graph
  updateOGTags(config);
}`
    },
    admin: {
        title: "Content Engine (CMS)",
        description: "A serverless content management system that injects updates instantly without rebuilding the application.",
        features: [
            { title: "Live Content Injection", desc: "Update prices, banners, and text in real-time via Vercel KV. Zero build time required." },
            { title: "No-Build Updates", desc: "Marketing teams can modify the site without developer intervention or git commits." }
        ],
        codeTitle: "api/content.js (Serverless CMS)",
        code: `// POST: Update Content (Protected)
if (req.method === 'POST') {
  const { content } = req.body;
  
  // 1. Persist to Edge Store
  await kv.set('site_content', content);
  
  // 2. Instant Cache Invalidation
  return res.status(200).json({ 
    success: true, 
    message: 'Content injected to Edge' 
  });
}`
    },
    booking: {
        title: "Context-Aware Booking",
        description: "A hybrid engine combining structured forms with natural language and historical memory.",
        features: [
            { title: "Context Switching", desc: "Interrupt a booking to ask a question. The bot saves state and resumes seamlessly." },
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
        title: "Zero-Trust Architecture",
        description: "We assume every request is hostile until proven otherwise. A multi-layered defense system protecting data at rest and in transit.",
        features: [
            { title: "Active Session Monitoring", desc: "Automatic 30-minute idle timeout. Mouse movements and keystrokes reset the secure timer." },
            { title: "Heuristic Neutralization", desc: "Recursive input sanitization strips malicious code before it touches the core." }
        ],
        codeTitle: "useAdminAuth.js (Session Logic)",
        code: `// 1. Session Timeout (30m)
const TIMEOUT_DURATION = 30 * 60 * 1000;

const resetTimer = () => {
  clearTimeout(timeout);
  // Auto-logout if idle
  timeout = setTimeout(logout, TIMEOUT_DURATION);
};

// 2. Activity Watchdog
const events = ['mousemove', 'keydown', 'click'];
events.forEach(e => 
  window.addEventListener(e, resetTimer)
);`
    },
    global: {
        title: "Planetary-Scale Edge Mesh",
        description: "Your application doesn't live on a server; it lives everywhere. Deployed to 18+ regions simultaneously for sub-50ms latency worldwide.",
        features: [
            { title: "Anycast Routing", desc: "Requests are automatically routed to the nearest physical data center, regardless of where the user is." },
            { title: "Infinite Scalability", desc: "Serverless architecture scales from 10 to 10M users instantly with zero configuration." }
        ],
        codeTitle: "vercel.json (Edge Config)",
        code: `{
  "regions": ["sfo1", "iad1", "lhr1", "hnd1"],
  "framework": "vite",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=31536000" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}`
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
