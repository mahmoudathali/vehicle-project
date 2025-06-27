import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0a192f]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="w-16 h-16 border-4 border-[#ffd700] rounded-full"
        animate={{
          rotate: 360,
          borderRadius: ["50%", "40%", "50%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};