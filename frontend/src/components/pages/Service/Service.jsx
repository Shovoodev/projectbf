import { motion } from "motion/react";
import { GiTooth } from "react-icons/gi";
import {
  MdBiotech,
  MdChildCare,
  MdLocalHospital,
  MdMedicalServices,
  MdVisibility,
} from "react-icons/md";

const cards = [
  {
    icon: <MdLocalHospital className="text-4xl text-white" />,
    title: "Cardiology",
    desc: "Advanced heart care with cutting-edge diagnostic tools and expert cardiologists for optimal cardiovascular health.",
  },
  {
    icon: <MdBiotech className="text-4xl text-white" />,
    title: "Neurology",
    desc: "Comprehensive neurological care for disorders of the brain, spine, and nervous system with experienced specialists.",
  },
  {
    icon: <MdMedicalServices className="text-4xl text-white" />,
    title: "Orthopedics",
    desc: "Expert treatment for bone, joint, and muscle conditions with advanced surgical and non-surgical options.",
  },
  {
    icon: <MdChildCare className="text-4xl text-white" />,
    title: "Pediatrics",
    desc: "Compassionate care for children from infancy through adolescence with specialized pediatric expertise.",
  },
  {
    icon: <MdVisibility className="text-4xl text-white" />,
    title: "Ophthalmology",
    desc: "Complete eye care services including vision correction, cataract surgery, and advanced retinal treatments.",
  },
  {
    icon: <GiTooth className="text-4xl text-white" />,
    title: "Dentistry",
    desc: "Full-service dental care from routine cleanings to cosmetic procedures and oral surgery treatments.",
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 md:py-24 bg-(--color-surface-light)">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-pill">Our Services</span>

          <h2 className="section-title mt-4">
            Comprehensive Healthcare Solutions
          </h2>

          <p className="section-subtitle">
            From preventive care to specialized treatments, we offer a full
            spectrum of medical services.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              className="card-base p-8 group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-(--color-primary-dark) text-white w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {c.icon}
              </div>

              <h3 className="text-2xl font-bold text-(--color-heading-light) mt-6">
                {c.title}
              </h3>

              <p className="text-(--color-text-light) mt-2">{c.desc}</p>

              <motion.a
                className="text-(--color-primary) font-medium flex items-center gap-2 mt-6 group"
                href="#"
                whileHover={{ x: 5 }}
              >
                Learn More{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
