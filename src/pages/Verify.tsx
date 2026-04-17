import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Loader2, CheckCircle2, AlertTriangle, Package, History, MapPin, User, ChevronRight, Camera, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { web3Service } from '@/lib/web3';
import { analyzeProductImage } from '@/lib/gemini';
import { toast } from 'sonner';

export default function Verify() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);

  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      setProduct({
        id: id || 'ST-94021',
        name: 'OxyPure Pack B-12',
        model: 'CONSUMABLE',
        status: 'ACTIVE',
        origin: 'Guangdong, CN',
        batch: 'B-001',
        scans: 1
      });
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [id]);

  const handleClaim = async () => {
    setClaiming(true);
    // Simulate Web3 operation (Burn for consumable)
    await new Promise(r => setTimeout(r, 2000));
    await web3Service.burnToken(product.id);
    setClaimed(true);
    setClaiming(false);
    toast.success("Product claimed and identity burned!");
  };

  const handleAiAnalysis = async () => {
    setAnalyzing(true);
    try {
      // Small simulated image for the prompt
      const mockBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
      const result = await analyzeProductImage(mockBase64);
      setAiReport(result);
      toast.success("AI Analysis Complete");
    } catch (err) {
      console.error(err);
      toast.error("AI Analysis failed. Check API key.");
      // Fallback for demo
      setAiReport(JSON.stringify({ 
        product: "Authentic OxyPure Pack", 
        hologramDetected: true, 
        authenticityScore: 98, 
        notes: "Packaging matches manufacturer specifications perfectly." 
      }, null, 2));
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <ShieldCheck className="w-16 h-16 text-primary opacity-20" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Verifying Product Authenticity</h1>
        <p className="text-slate-500">Connecting to Shieldtag Protocol...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 font-bold text-xl" onClick={() => navigate('/')}>
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span>Shieldtag</span>
          </div>
        </div>

        {claimed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-none shadow-xl bg-green-600 text-white overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Authenticated & Claimed!</h2>
                <p className="text-white/80 text-sm mb-8">This consumable product identity has been burned to prevent reuse. You are the verified owner.</p>
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full bg-white text-green-700 hover:bg-slate-100 font-bold border-none" onClick={() => navigate('/')}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-none shadow-xl overflow-hidden mb-6">
              <div className="h-2 bg-green-500" />
              <CardContent className="p-0">
                <div className="bg-green-50 p-6 text-center border-b border-green-100">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-green-800">Verified Authentic</h2>
                  <p className="text-xs text-green-600 font-medium uppercase tracking-widest mt-1">Token ID: {product.id}</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Product</p>
                      <p className="font-bold">{product.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Origin</p>
                      <p className="text-sm font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {product.origin}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Batch</p>
                      <p className="text-sm font-bold flex items-center gap-1">
                        <History className="w-3 h-3" /> {product.batch}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button 
                      className="w-full h-14 font-bold text-md gap-2 shadow-lg shadow-primary/20" 
                      onClick={handleClaim}
                      disabled={claiming || analyzing}
                    >
                      {claiming ? <Loader2 className="w-5 h-5 animate-spin" /> : <><User className="w-5 h-5" /> Claim Ownership</>}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-12 font-semibold gap-2"
                      onClick={handleAiAnalysis}
                      disabled={analyzing || claiming}
                    >
                      {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><BrainCircuit className="w-5 h-5" /> AI Visual Scan</>}
                    </Button>

                    {aiReport && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-slate-900 text-slate-300 rounded-xl text-[10px] font-mono whitespace-pre-wrap mt-4"
                      >
                        <div className="flex items-center gap-2 text-white mb-2 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-green-400" /> AI VERIFICATION REPORT
                        </div>
                        {aiReport}
                      </motion.div>
                    )}

                    <p className="text-[10px] text-slate-400 text-center mt-4 px-4 leading-relaxed italic">
                      Claiming will link this product to your digital identity and burn the one-time verification token.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white p-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                     <AlertTriangle className="w-4 h-4 text-orange-400" />
                   </div>
                   <div>
                     <p className="text-sm font-bold">First Scan</p>
                     <p className="text-xs text-slate-400">This code was never scanned before today.</p>
                   </div>
                 </div>
                 <Badge variant="outline">Secure</Badge>
               </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
