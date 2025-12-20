import { motion } from "motion/react";
import {
  MdApartment,
  MdCalendarMonth,
  MdCall,
  MdGroups,
  MdLocalHospital,
} from "react-icons/md";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className="py-16 md:py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.div
            className="badge-primary self-center lg:self-start"
            variants={itemVariants}
          >
            <MdLocalHospital className="text-lg" />
            <span>Trusted by 50,000+ Patients</span>
          </motion.div>

          <motion.h1 className="heading-one" variants={itemVariants}>
            Your Health is Our{" "}
            <span className="text-(--color-primary)">Priority</span>
          </motion.h1>

          <motion.p
            className="text-lg text-(--color-text-light) max-w-xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            Experience world-class healthcare with our team of expert doctors
            and state-of-the-art facilities. Your wellness journey starts here.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
            variants={itemVariants}
          >
            <motion.a
              className="btn-primary"
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdCalendarMonth />
              Schedule Appointment
            </motion.a>

            <motion.a
              className="btn-secondary"
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdCall />
              Emergency: 911
            </motion.a>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start mt-8"
            variants={itemVariants}
          >
            <div className="stat-box">
              <div className="icon-badge">
                <MdGroups className="text-(--color-primary) text-3xl" />
              </div>
              <div>
                <p className="stat-number">200+</p>
                <p className="stat-label">Expert Doctors</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="icon-badge">
                <MdApartment className="text-(--color-primary) text-3xl" />
              </div>
              <div>
                <p className="stat-number">15+</p>
                <p className="stat-label">Departments</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="relative" variants={itemVariants}>
          <motion.img
            alt="Hospital corridor with modern medical facilities and equipment"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7NU_d49v0uWKhpIAEUI41S-mdH58IP1msq1qpixSkcdKAzhTmXxAebxQw4H6SVm9qvGhePQe1pDsN26JHYElaLMs8jSCAe7OswxgeCK72_vS-S1tCppIywV5TG1bVuN3Kn6elVAZd-Pq9MDdYwc3zSCyR_nZDDTFsuQhhHosIK0Qh42Ky0gE9pHU39mbJM-xCidVIomuxC28sHWOp72J3UmaumR7s478zEinHdKZVfspbRZyKC9PSVTY3pRewPmdAoKsdbAu4Ixk"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute -bottom-6 -left-6 card-sm flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
              <p className="text-sm text-(--color-text-light)">Success Rate</p>
              <p className="text-xl font-bold text-(--color-heading-light)">
                98.5%
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
