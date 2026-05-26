import { motion } from "framer-motion";

const locations = [
  {
    title: "ЗАГС",
    img: "/zags.png",
    link: "https://yandex.ru/maps/-/CPDVAEp1",
  },
  {
    title: "БАНКЕТ",
    img: "/besedka.png",
    link: "https://yandex.ru/profile/-/CPDV4H2f",
  },
];

export const LocationGallery = () => {
  return (
    <section className="py-12 bg-[#790013] flex flex-col gap-8 max-w-[450px] mx-auto overflow-hidden">
      {/* TITLE */}
      <motion.h2
        className="text-white text-5xl text-center mb-8 font-light"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <span className="title text-white text-5xl font-light">Локации</span>
      </motion.h2>

      {/* SCROLL ROW */}
      <motion.div
        className="
        flex gap-6 overflow-x-auto px-4 pb-6
        snap-x snap-mandatory
        scrollbar-hide
      "
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {locations.map((item, i) => (
          <div
            key={i}
            className="
              min-w-[85%]
              snap-center
              bg-white
              p-3
              flex flex-col gap-4
              rotate-[-1deg]
            "
          >
            {/* IMAGE */}
            <div className="border-2 border-[#790013] p-2 bg-white">
              <img
                src={item.img}
                className="w-full h-[180px] object-cover"
                loading="lazy"
              />
            </div>

            {/* TITLE */}
            <div className="text-center text-[#790013] text-2xl title">
              {item.title}
            </div>

            {/* BUTTON */}
            <a
              href={item.link}
              target="_blank"
              className="
                bg-[#790013]
                text-white
                text-center
                py-2
                rounded-md
                active:scale-95
                transition
              "
            >
              Открыть на карте
            </a>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
