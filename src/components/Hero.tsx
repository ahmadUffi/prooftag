import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
          Protect your products,{" "}
          <span className="text-primary">own your value.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
          Shieldtag combines physical NFC/QR tech with blockchain digital twins
          to eliminate counterfeiting and enable true ownership tracking for any
          product.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="h-14 px-8 text-md font-bold"
            onClick={() => navigate("/dashboard")}
          >
            Request Demo <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-md font-bold"
          >
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
          <svg
            viewBox="0 0 640 480"
            className="w-full h-auto rounded-2xl bg-slate-50"
            role="img"
            aria-label="Animated product protection diagram"
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <radialGradient id="glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#f8fafc" />
              </radialGradient>
            </defs>

            <rect width="640" height="480" rx="24" fill="url(#glow)" />

            <g>
              <circle
                cx="320"
                cy="240"
                r="150"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2"
                strokeDasharray="6 10"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 320 240"
                  to="360 320 240"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="320"
                cy="240"
                r="120"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="3 8"
                opacity="0.7"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 320 240"
                  to="0 320 240"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <g>
              <circle cx="160" cy="140" r="6" fill="#22c55e">
                <animate
                  attributeName="r"
                  values="6;10;6"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="500" cy="130" r="5" fill="#0ea5e9">
                <animate
                  attributeName="r"
                  values="5;9;5"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="520" cy="360" r="6" fill="#38bdf8">
                <animate
                  attributeName="r"
                  values="6;11;6"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <g>
              <path
                d="M320 120 L420 160 V260 C420 320 370 370 320 400 C270 370 220 320 220 260 V160 Z"
                fill="url(#shieldGrad)"
                stroke="#0f172a"
                strokeWidth="2"
                opacity="0.95"
              />
              <path
                d="M280 250 L312 282 L360 230"
                fill="none"
                stroke="#0f172a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 200;120 200;0 200"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            <g opacity="0.85">
              <rect
                x="110"
                y="300"
                width="54"
                height="54"
                rx="8"
                fill="#0f172a"
              />
              <rect x="122" y="312" width="10" height="10" fill="#e2e8f0" />
              <rect x="138" y="312" width="10" height="10" fill="#e2e8f0" />
              <rect x="122" y="328" width="10" height="10" fill="#e2e8f0" />
              <rect x="138" y="328" width="18" height="18" fill="#e2e8f0" />
            </g>
          </svg>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
      </motion.div>
    </div>
  );
}
