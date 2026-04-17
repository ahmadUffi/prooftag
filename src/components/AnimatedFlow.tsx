import { motion } from 'motion/react';
import { Box, QrCode, Shield, CheckCircle } from 'lucide-react';

export default function AnimatedFlow() {
  const nodes = [
    { icon: <Box className="w-8 h-8" />, label: "Product", x: 10, y: 50 },
    { icon: <QrCode className="w-8 h-8" />, label: "QR / Hologram", x: 40, y: 50 },
    { icon: <Shield className="w-8 h-8" />, label: "Blockchain", x: 70, y: 50 },
    { icon: <CheckCircle className="w-8 h-8" />, label: "Verified", x: 100, y: 50 },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[300px] flex items-center justify-between px-10">
      {/* Background Line */}
      <svg className="absolute inset-0 w-full h-full -z-10" preserveAspectRatio="none">
        <motion.path
          d="M 100 150 L 900 150"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 100 150 L 900 150"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeDasharray="20 10"
          animate={{ strokeDashoffset: -60 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center gap-4 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-white border-2 border-primary/20 shadow-xl flex items-center justify-center text-primary"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{ 
              boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.3)", "0 0 0px rgba(59,130,246,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {node.icon}
          </motion.div>
          <span className="text-sm font-semibold text-slate-600 absolute -bottom-8 whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
