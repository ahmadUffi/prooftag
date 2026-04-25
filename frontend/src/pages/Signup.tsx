import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  User,
  Building2,
  Wallet,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SignupRole = "user" | "brand" | null;

type SignupStep = 0 | 1 | 2 | 3;

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>(0);
  const [role, setRole] = useState<SignupRole>(null);
  const [username, setUsername] = useState("");
  const [brandName, setBrandName] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [accepted, setAccepted] = useState(false);

  const steps = ["Choose", "Details", "Connect", "Confirm"];

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const nextStep = () =>
    setStep((prev) => (prev < 3 ? ((prev + 1) as SignupStep) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 0 ? ((prev - 1) as SignupStep) : prev));

  const canContinueFromRole = !!role;
  const canContinueFromDetails =
    role === "user"
      ? username.trim().length > 0
      : brandName.trim().length > 0 &&
        location.trim().length > 0 &&
        !!businessType;
  const canContinueFromWallet = isConnected;
  const canSubmit = accepted;

  const handleConnectWallet = async (connector: any) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
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
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </Button>
      </nav>

      <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              Step {step + 1} of 4
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Create your Proof Tag account
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              One wallet equals one role. Choose carefully — roles cannot be
              changed later.
            </p>

            <div className="flex items-center gap-3 mb-10">
              {steps.map((label, index) => (
                <div key={label} className="flex-1">
                  <div
                    className={`h-1 rounded-full ${
                      index <= step ? "bg-primary" : "bg-slate-200"
                    }`}
                  />
                  <p
                    className={`text-xs mt-2 font-semibold tracking-wide uppercase ${
                      index <= step ? "text-primary" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {step > 0 && (
                <Button variant="ghost" onClick={prevStep}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                className="shadow-lg shadow-primary/20"
                onClick={step === 3 ? () => navigate("/dashboard") : nextStep}
                disabled={
                  (step === 0 && !canContinueFromRole) ||
                  (step === 1 && !canContinueFromDetails) ||
                  (step === 2 && !canContinueFromWallet) ||
                  (step === 3 && !canSubmit)
                }
              >
                {step === 3 ? "Create Account" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <Card className="border-2 border-slate-100 shadow-sm">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step-role"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Choose your role
                      </h2>
                      <p className="text-slate-600 text-sm">
                        This wallet can only be registered once and the role
                        cannot be changed later.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRole("user")}
                        className={`text-left border-2 rounded-xl p-5 transition-all ${
                          role === "user"
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 hover:border-primary/40"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold">User</h3>
                        <p className="text-sm text-slate-600">
                          Verify products and claim ownership.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole("brand")}
                        className={`text-left border-2 rounded-xl p-5 transition-all ${
                          role === "brand"
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 hover:border-primary/40"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold">Brand</h3>
                        <p className="text-sm text-slate-600">
                          Protect products and manage authenticity.
                        </p>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step-details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Account details
                      </h2>
                      <p className="text-slate-600 text-sm">
                        Provide your account information before connecting a
                        wallet.
                      </p>
                    </div>

                    {role === "user" ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            placeholder="Choose a unique username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="brandName">Brand name</Label>
                          <Input
                            id="brandName"
                            placeholder="Company or brand name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Business address</Label>
                          <Input
                            id="address"
                            placeholder="Headquarters or office address"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="businessType">Business type</Label>
                          <Select
                            value={businessType}
                            onValueChange={(value) =>
                              setBusinessType(value || "")
                            }
                          >
                            <SelectTrigger id="businessType">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturing">
                                Manufacturing
                              </SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="logistics">
                                Logistics
                              </SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="luxury">
                                Luxury Goods
                              </SelectItem>
                              <SelectItem value="pharma">
                                Pharmaceuticals
                              </SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-wallet"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Connect your wallet
                      </h2>
                      <p className="text-slate-600 text-sm">
                        Wallet connection is mandatory for identity and
                        ownership tracking.
                      </p>
                    </div>

                    <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center space-y-4">
                      <Wallet className="w-10 h-10 text-primary mx-auto" />

                      <p className="text-sm text-slate-600">
                        {isConnected
                          ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
                          : "Connect your wallet to continue."}
                      </p>

                      {!isConnected ? (
                        <div className="space-y-2">
                          {connectors.map((connector) => (
                            <Button
                              key={connector.uid}
                              onClick={() => handleConnectWallet(connector)}
                              className="w-full"
                            >
                              Connect {connector.name}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <Button
                          variant="destructive"
                          onClick={() => disconnect()}
                        >
                          Disconnect
                        </Button>
                      )}
                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <p className="text-sm text-amber-700">
                        This wallet can only be registered once. You will not be
                        able to change roles later.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Confirm your account
                      </h2>
                      <p className="text-slate-600 text-sm">
                        Review your details before creating the account.
                      </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Role</span>
                        <span className="font-semibold text-slate-900">
                          {role === "user" ? "User" : "Brand"}
                        </span>
                      </div>
                      {role === "user" ? (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Username</span>
                          <span className="font-semibold text-slate-900">
                            {username || "-"}
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Brand</span>
                            <span className="font-semibold text-slate-900">
                              {brandName || "-"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Address</span>
                            <span className="font-semibold text-slate-900">
                              {address || "-"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">
                              Business Type
                            </span>
                            <span className="font-semibold text-slate-900">
                              {businessType || "-"}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Wallet</span>
                        <span className="font-semibold text-emerald-600">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        id="accept"
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-1"
                      />
                      <label
                        htmlFor="accept"
                        className="text-sm text-slate-600"
                      >
                        I understand this wallet will be permanently linked to
                        my role and cannot be changed.
                      </label>
                    </div>

                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <p className="text-sm text-emerald-700">
                        You are ready to create your Proof Tag account.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
