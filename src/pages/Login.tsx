import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Wallet,
  ArrowRight,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setConnected(true);
    setIsConnecting(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 overflow-x-hidden">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 font-bold text-2xl tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span>Proof Tag</span>
        </div>
        <Button
          variant="ghost"
          className="hover:bg-primary/5 hover:text-primary"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </nav>

      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Lock className="w-3 h-3" />
              Wallet Login Required
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Welcome back to <span className="text-primary">Proof Tag</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Connect your wallet to access your account. Each wallet is linked
              to exactly one role and cannot be changed later.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-12 px-8 font-semibold"
                onClick={handleConnect}
                disabled={isConnecting || connected}
              >
                {connected ? (
                  "Wallet Connected"
                ) : isConnecting ? (
                  "Connecting..."
                ) : (
                  <>
                    Connect Wallet <Wallet className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 font-semibold"
                onClick={() => navigate("/signup")}
              >
                New here? Create account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {connected && (
              <div className="mt-6 text-sm text-slate-500">
                If this wallet is not registered, you will be redirected to
                signup.
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 border-slate-100 shadow-sm">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Login Rules
                    </p>
                    <p className="text-lg font-bold">One wallet, one role</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-primary" />
                    Wallet connect is mandatory to access your account.
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-primary" />
                    Each wallet can only be registered once.
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-primary" />
                    Role cannot be changed after signup.
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-700">
                    If your wallet is not registered, you will need to create a
                    new account.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
