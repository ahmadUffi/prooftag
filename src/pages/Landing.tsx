import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  RefreshCcw, 
  Zap, 
  ArrowRight,
  Fingerprint,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AnimatedFlow from '@/components/AnimatedFlow';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 overflow-x-hidden text-pretty">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span>Shieldtag</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#problem" className="hover:text-primary transition-colors">Problem</a>
          <a href="#solution" className="hover:text-primary transition-colors">Solution</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">Method</a>
          <Button variant="ghost" className="hover:bg-primary/5 hover:text-primary" onClick={() => navigate('/dashboard')}>Login</Button>
          <Button onClick={() => navigate('/dashboard')} className="shadow-lg shadow-primary/20">Launch App</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto overflow-hidden">
        <Hero />

        {/* Animated Flow */}
        <div className="mt-40" id="how-it-works">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">The Shieldtag Process</h2>
            <p className="text-3xl md:text-4xl font-bold tracking-tight">Seamlessly connecting atoms and bits</p>
          </div>
          <AnimatedFlow />
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="px-8 py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">The Global Counterfeit Crisis</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Traditional supply chains are opaque, leaving brands and consumers vulnerable to massive fraud and trust decay.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<AlertTriangle className="w-10 h-10 text-red-500" />} 
              title="Fakes Everywhere" 
              description="$2.3T in annual losses due to counterfeit goods across all global industries." 
            />
            <FeatureCard 
              icon={<Eye className="w-10 h-10 text-orange-500" />} 
              title="Zero Visibility" 
              description="Brands lose track of products as soon as they leave the factory gate, leading to distribution data gaps." 
            />
            <FeatureCard 
              icon={<RefreshCcw className="w-10 h-10 text-blue-500" />} 
              title="Broken Resale" 
              description="No way for consumers to prove ownership or authenticity in secondary markets, destroying asset value." 
            />
          </div>
        </div>
      </section>

      {/* Dual Model Section */}
      <section className="px-8 py-32 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">Dual Engine Ownership</h2>
          <p className="text-slate-500">Optimized for every product lifecycle.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-3xl bg-white border-2 border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Consumable Model</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Designed for products used once (Pharma, Food, Beauty). Each scan verifies authenticity, and the digital token is burned upon claim to prevent reuse.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Single-use Verification
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Anti-Refill Protection
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Instant Burning Logic
              </li>
            </ul>
            <Button variant="outline" className="w-full">Explore Use Cases</Button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -z-10 group-hover:bg-white/10 transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8">
              <Fingerprint className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Durable Model</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Perfect for high-value items (Luxury, Electronics, Collector items). Digital twin NFT allows ownership transfer and full lifecycle traceability.
            </p>
            <ul className="space-y-4 mb-10 text-slate-400">
              <li className="flex items-center gap-3 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Transferable Digital Twin
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Resale Market Authentication
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Historical Ownership Log
              </li>
            </ul>
            <Button variant="secondary" className="w-full bg-white text-slate-900 border-none">Explore Use Cases</Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span>Shieldtag</span>
            </div>
            <p className="text-slate-500 max-w-sm">The world's most advanced phygital infrastructure for product protection and brand integrity.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <a href="#">Features</a>
              <a href="#">For Brands</a>
              <a href="#">For Consumers</a>
              <a href="#">API</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Shieldtag Systems Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
