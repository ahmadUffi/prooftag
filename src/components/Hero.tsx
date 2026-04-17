import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3" />
          Next-Gen Product Identity
        </div>
        <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
          Protect your products, <span className="text-primary">own your value.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
          Shieldtag combines physical NFC/QR tech with blockchain digital twins to eliminate counterfeiting and enable true ownership tracking for any product.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-14 px-8 text-md font-bold" onClick={() => navigate('/dashboard')}>
            Request Demo <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-md font-bold">
            See Documentation
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        className="hidden lg:block relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative z-10 p-4 bg-white rounded-3xl shadow-2xl border border-slate-100">
          <img 
            src="https://picsum.photos/seed/shield/800/600" 
            alt="Product Protection" 
            className="rounded-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
      </motion.div>
    </div>
  );
}
