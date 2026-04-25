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
            onClick={() => navigate("/signup")}
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
        <div className="relative z-10 p-4">
          <svg
            viewBox="0 0 640 480"
            className="w-full h-auto rounded-2xl bg-white"
          >
            <defs>
              <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="640" height="480" rx="24" fill="#fff" />

            {/* BLOCKCHAIN CONNECTION LINES */}
            <g stroke="#94a3b8" strokeWidth="1.5" opacity="0.6">
              <line x1="120" y1="100" x2="220" y2="160" />
              <line x1="520" y1="120" x2="420" y2="180" />
              <line x1="500" y1="360" x2="400" y2="300" />
            </g>

            {/* BLOCKCHAIN NODES */}
            <g fill="#38bdf8">
              <circle cx="120" cy="100" r="6">
                <animate
                  attributeName="r"
                  values="6;9;6"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="520" cy="120" r="6">
                <animate
                  attributeName="r"
                  values="6;9;6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="500" cy="360" r="6">
                <animate
                  attributeName="r"
                  values="6;9;6"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* FLOATING CUBES */}
            <g fill="#22c55e" opacity="0.8">
              <rect x="100" y="140" width="18" height="18">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 10 -10; 0 0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect x="520" y="200" width="18" height="18">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; -10 10; 0 0"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>

            {/* QR BOX */}
            <g transform="translate(220,100)">
              <rect
                width="200"
                height="200"
                rx="16"
                fill="white"
                stroke="#cbd5f5"
                strokeWidth="2"
              />

              {/* Fake QR */}
              <g fill="#0f172a">
                <rect x="20" y="20" width="40" height="40" />
                <rect x="140" y="20" width="40" height="40" />
                <rect x="20" y="140" width="40" height="40" />

                <rect x="80" y="40" width="20" height="20" />
                <rect x="110" y="70" width="20" height="20" />
                <rect x="80" y="110" width="20" height="20" />
                <rect x="120" y="120" width="30" height="30" />
              </g>

              {/* SCAN LINE */}
              <rect width="200" height="40" fill="url(#scanGrad)">
                <animate
                  attributeName="y"
                  values="-40;200"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>

            {/* CHECK ICON */}
            <g transform="translate(320,210)">
              <circle r="35" fill="#22c55e" opacity="0.15" />
              <circle r="26" fill="#22c55e" />

              <path
                d="M -8 0 L -2 8 L 12 -6"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 50;50 50"
                  dur="1s"
                  fill="freeze"
                />
              </path>
            </g>

            {/* TEXT (ENGLISH, LOWER, BLACK) */}
            <text
              x="320"
              y="380"
              textAnchor="middle"
              fontSize="26"
              fontWeight="bold"
              fill="#000000"
            ></text>
          </svg>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
      </motion.div>
    </div>
  );
}
