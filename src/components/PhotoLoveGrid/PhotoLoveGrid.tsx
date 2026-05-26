import { motion } from "framer-motion";

export const PhotoLoveGrid = () => {
  return (
    <section className="py-12 px-4 flex flex-col gap-8 max-w-[450px] mx-auto bg-[#790013] overflow-hidden">
      {/* ROW 1 */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="border-2 border-white p-2 bg-[#fff] max-w-[60%] -rotate-15">
          <img src="/first.jpg" className=" object-cover" />
        </div>

        {/* HEARTS */}
        <div className="flex flex-col justify-between h-full gap-7 h-full">
          <img
            src="/heart/serd1-Photoroom1.png"
            className="-rotate-70 pb-6 w-20"
            width={60}
          />
          <img
            src="/heart/serd1-Photoroom1.png"
            className="rotate-10 pr-4 w-20"
            width={60}
          />
        </div>
      </motion.div>

      {/* ROW 2 */}
      <motion.div
        className="flex items-center justify-center gap-3 title text-white"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <span className="text-5xl font-light">Ваня</span>

        <span className="text-5xl font-light">+</span>

        <span className="text-5xl font-light">Алина</span>
        <span className="text-5xl font-light">=</span>
        <img
          className="rotate-5 pt-3"
          src="/heart/serd2-Photoroom1.png"
          width={80}
        />
      </motion.div>

      {/* ROW 3 */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* HEARTS */}
        <div className="flex flex-col justify-around gap-7 h-full">
          <img
            className="rotate-5 pl-7 w-20"
            src="/heart/serd4-Photoroom1.png"
            width={60}
          />
          <img
            src="/heart/serd5-Photoroom1.png"
            className="-rotate-15 pb-5 w-20"
            width={60}
          />
        </div>

        <div className="border-2 border-white p-2 bg-[#fff] rotate-15 max-w-[60%]">
          <img src="/second.jpg" className=" object-cover" />
        </div>
      </motion.div>
    </section>
  );
};
