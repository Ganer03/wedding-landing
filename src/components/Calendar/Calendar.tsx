import { motion } from "framer-motion";

export const Calendar = () => {
  return (
    <section className="py-12 px-4 flex flex-col gap-8 max-w-[450px] mx-auto overflow-hidden">
      {/* ROW 1 */}
      <motion.div
        className=""
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <span className="title text-[#790013] text-5xl font-light">Когда?</span>
      </motion.div>

      {/* ROW 2 */}
      <motion.div
        className="flex items-center justify-center gap-3 title text-white"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <img className="w-full object-cover" src="/calendar.png" width={80} />
      </motion.div>
    </section>
  );
};
