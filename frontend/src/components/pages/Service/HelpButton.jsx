import { motion } from "motion/react";
import { MdHelp } from "react-icons/md";

export default function HelpButton() {
  return (
    <motion.button
      className="fixed bottom-4 right-4 bg-(--color-primary) text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:opacity-90 transition-colors z-50"
      aria-label="Help button for customer support"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <MdHelp />
      <span className="hidden sm:inline">Help</span>
    </motion.button>
  );
}
