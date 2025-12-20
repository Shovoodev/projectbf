import { motion } from "motion/react";
import {
  MdBiotech,
  MdHandshake,
  MdSchedule,
  MdWorkspacePremium,
} from "react-icons/md";

export default function WhyChoose() {
  const items = [
    {
      icon: <MdWorkspacePremium />,
      title: "Accredited Excellence",
      desc: "Internationally recognized certifications and awards for quality healthcare standards.",
    },
    {
      icon: <MdSchedule />,
      title: "24/7 Emergency Care",
      desc: "Round-the-clock emergency services with rapid response teams and advanced life support.",
    },
    {
      icon: <MdBiotech />,
      title: "Advanced Technology",
      desc: "State-of-the-art medical equipment and cutting-edge diagnostic capabilities.",
    },
    {
      icon: <MdHandshake />,
      title: "Patient-Centered Care",
      desc: "Personalized treatment plans tailored to individual needs and preferences.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span
            className="badge-pill self-start"
            variants={itemVariants}
          >
            Why Choose Us
          </motion.span>

          <motion.h2 className="section-title" variants={itemVariants}>
            Excellence in Healthcare Delivery
          </motion.h2>

          <motion.p className="section-subtitle" variants={itemVariants}>
            We combine medical expertise with compassionate care to provide the
            best possible outcomes.
          </motion.p>

          <motion.div className="space-y-6 mt-4" variants={containerVariants}>
            {items.map((it) => (
              <motion.div
                key={it.title}
                className="flex items-start gap-4"
                variants={itemVariants}
              >
                <div className="bg-(--color-primary) text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  {it.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-(--color-heading-light)">
                    {it.title}
                  </h4>
                  <p className="text-(--color-text-light) mt-1">{it.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            alt="Medical imaging room with advanced diagnostic equipment"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfE8u5AxO8CqWccdpTeBfkRP2_9zHcX5MyekZ4pUAvWGXEdukrZwkKRLiSxsMI6MT-8w3YyCpVpw-BKBmAabyysyac09yhWmNsMJmk189axyeQdSKuVY3IQ5YbxrOytinv66g_cwhZUIYLcyZHh7FeOwkW84h7Jf92jyw7JC3PfsyWxj6OwZzcjFEBCeC9AGJaNqIkCz5ALN2yMEeWkY7QMt38ZRdVOezKwpDKk0ErkmrHwxzl58VZCk6wAGe4ZboFancIEN5RAPo"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute -top-6 -left-6 card-sm flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="success-badge">
              <svg
                className="w-6 h-6 text-(--color-success)"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-(--color-text-light)">
                Patients Treated
              </p>
              <p className="text-xl font-bold text-(--color-heading-light)">
                500K+
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
