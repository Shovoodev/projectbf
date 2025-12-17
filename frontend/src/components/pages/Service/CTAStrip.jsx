import { motion } from "motion/react";

export default function CTAStrip() {
  return (
    <motion.div
      className="w-full py-6 bg-(--color-primary) text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-bold text-lg  text-white">
            Want priority appointments?
          </h3>
          <p className="text-sm">
            Create an account and book with a single click.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.a
            className="inline-block bg-white text-(--color-primary) px-5 py-2 rounded-lg font-medium"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Priority
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
