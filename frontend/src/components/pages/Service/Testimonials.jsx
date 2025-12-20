import { motion } from "motion/react";

const testimonials = [
  {
    text: `"The care I received was exceptional. The doctors were attentive, knowledgeable, and truly cared about my recovery. I'm grateful for their expertise."`,
    name: "Jennifer Martinez",
    role: "Cardiology Patient",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCGYTkp8MUbAnbB2iFRf4g0WQyFgdJs_tnrKibPtKb4kz-znjsXD7eoVd8OdcUwtvvBPEmkxRNUj6Lff7p_lcqdz1oI4vzAdM4xGT4pYAgZRF6x3coQGB9XdClBGyxpX01U9_xW0_mCOjzWaKecc9T1sSuxXDqicTy0mtgAhBwprd-AvADGx1zhkWrEjSuSHRH1f4k7DkmOICzznX1s99RtNH9YHixQ93-P76d27s8_Jz7PhlVSxzlOOLvHtFSZ483LivFTFdLMpU",
  },
  {
    text: `"From scheduling to treatment, everything was seamless. The staff made me feel comfortable and the facilities are world-class. Highly recommend!"`,
    name: "David Thompson",
    role: "Orthopedic Patient",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsUa126Zl0SwtucESeaPgBhu72Vm61yvb1xKW1DNanMkWX20gcezdczy9ezJPIr73Kcfq0aE4mdSI4Jtnbmiyz7oteQplHfi1fqe9-uwx_Abb60ISz0d0Ljea0xMlao76yMOHKbd89KmBhqVDuIsLutpvLBgmbm3S8c-OKPRE_P6RnVFU9Z-IwqDDaJjmHylgCNTaWHLHjyTFhfLsAFcB0XpM1abdWz--j9JLfWRwZTgOmQIv8VQpM21rRoqLcthFs_Pav4F1ZzU",
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-pill">Testimonials</span>
          <h2 className="section-title mt-4 text-(--color-heading-light)">
            What Our Patients Say
          </h2>
          <p className="section-subtitle text-(--color-text-light)">
            Real stories from real patients about their healthcare journey with
            us
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="card-base p-8"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex text-yellow-400">★ ★ ★ ★ ★</div>
              <motion.blockquote
                className="text-(--color-text-light) mt-4 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t.text}
              </motion.blockquote>

              <motion.div
                className="flex items-center gap-4 mt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.img
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                  src={t.img}
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p className="font-bold text-(--color-heading-light)">
                    {t.name}
                  </p>
                  <p className="text-(--color-text-light) text-sm">{t.role}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
