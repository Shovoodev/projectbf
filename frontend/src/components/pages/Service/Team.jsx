import { motion } from "motion/react";

const docs = [
  {
    name: "Dr. Michael Chen",
    title: "Cardiologist",
    exp: "15+ years experience in cardiovascular medicine",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSoMCGxU32O6TDUdn83Smg152lh5ThcU-Kt3emw23ydOCtRkkcn5RsTgNlYTZLPJT0OPTQn9jj7As3EHMIjHPmLsoNoKXhsIcfedA52K2eVjDuH0inU6aAHBTFRDGUnNUQYtNnlPg_iFGmfM3nSbfX-kuJhHEP9uLrwPMxcQWC-ETABhu58-SA9-kaDXxOO_rfQ4la-94HW9LARuxE2dcXBITAaEBGhLPIrvkT82wntKsaplImzZIIQkH_VaCD_6RrpIkHc-qPdJU",
  },
  {
    name: "Dr. Sarah Johnson",
    title: "Neurologist",
    exp: "Specialized in brain & spine disorders",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRqiAI84KO4RdfqFwAyDE23x3y_G11e7Tn6ReY-sgeXaIowyHPzowswxet096O5lZNcoL47ghpDS022OIsq7oyoLFUlN3uEn_U5tw_f4pg6u7XQNgsRiNOvL7NsgYgZKVDFI9XIn8iZchcF7CZKTa85Y7kBGXk9GjG7pn_WG9lu1EVBol13Qq1Oeya3fiZJJNXTOyGlCNd82LLmvuW1xXUyBJW-gTDV-3e7izE5yKDzAQwnE2TUbFLQBgZ4QCKhk3f7UiAwlj_TR4",
  },
  {
    name: "Dr. James Wilson",
    title: "Orthopedic Surgeon",
    exp: "Expert in joint replacement surgery",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCQIW0wT2SZvaGiAR39keKuNX26CiAw677_BzIJkQN9Hn_wetKAFCzlpNHH62oPeowEJ6UpT1RW5buaGUMgMyyFIix5vAZtQlXcO-K49_PZzWwW9BhgiIHF0OAjoBf8m8pv55OnXDn-QWoLqJwYe6sTWZLoPERN6fl8pJv5Y13pYZ0V2Dzs_68ohHbRjGYRerPAP0e9oOOS6kRJZINhCZGPfQSOS3siL02qWy7vARFcvDl-UuRWRof7f0X_GhYF3IB6yUzEsAR6O4",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Pediatrician",
    exp: "Compassionate care for children",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN9JP6VfUG96bSAwSnX6ggIy5Wcnqrm94a1jwDvhdz-7CpNaRci2dyoSkltV_5BU9JutpWLT1ac9nhxGm4Jq7DY217zdruWGQOjNAE-L5Ro_2J5F8_UCZqwPLf5WnNTRWPxfS1qdixOVYupnr-tUan6y9lgiHCjPKH6yRvve-uUBZwpoKP2_vCSldv8ARVIn5L0NkFPdAqLVe19krkshbTncNcAqVo00fqhdEHSuPF6eNNvDp5w9mTr3tumnES-a94IAbzGOxeVlY",
  },
];

export default function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
          <span className="badge-pill">Our Team</span>
          <h2 className="section-title mt-4 text-(--color-heading-light)">
            Meet Our Expert Doctors
          </h2>
          <p className="section-subtitle text-(--color-text-light)">
            Highly qualified medical professionals dedicated to your health and
            wellbeing.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {docs.map((d) => (
            <motion.div
              key={d.name}
              className="card-base rounded-2xl overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                alt={d.name}
                className="w-full h-64 object-cover"
                src={d.img}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-(--color-heading-light)">
                  {d.name}
                </h3>
                <p className="text-(--color-primary) font-medium mt-1">
                  {d.title}
                </p>
                <p className="text-(--color-text-light) text-sm mt-3">
                  {d.exp}
                </p>
                <div className="flex justify-center text-yellow-400 mt-4">
                  <span>★ ★ ★ ★ ★</span>
                </div>
                <motion.a
                  className="text-(--color-primary) font-semibold mt-4 inline-block"
                  href="#"
                  whileHover={{ scale: 1.05 }}
                >
                  Book Now
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            className="btn-primary"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Doctors →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
