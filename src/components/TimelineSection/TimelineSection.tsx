import { motion } from "framer-motion";

type TimelineItem = {
  time: string;
  title: string;
  desc: string;
  media?: React.ReactNode;
};

const timeline: TimelineItem[] = [
  {
    time: "15:00",
    title: "Сбор гостей в ЗАГСе",
    desc: "Не опаздываем",
    media: <img src="/location.svg" className="w-14 h-14" />,
  },
  {
    time: "15:30",
    title: "Церемония",
    desc: "Трогательная часть и да-да",
    media: <img src="/ring.svg" className="w-14 h-14" />,
  },
  {
    time: "16:00",
    title: "Фотосессия возле загса",
    desc: "Частичка памяти для всех",
    media: (
      <img src="/camera.svg" className="w-14 h-14 object-cover rounded-md" />
    ),
  },
  {
    time: "17:00",
    title: "Банкет",
    desc: "Еда, тосты и танцы",
    media: <img src="/champagne.svg" className="w-14 h-14" />,
  },
];

export const TimelineSection = () => {
  return (
    <section className="relative max-w-[450px] mx-auto py-12 px-4">
      {/* TITLE */}
      <motion.h2
        className="text-[#790013] text-5xl text-center mb-16 title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[#790013] text-5xl text-center mb-8 title">
          Во сколько?
        </div>
      </motion.h2>

      {/* LINE */}
      <div className="absolute left-1/2 top-32 bottom-10 w-[2px] bg-[#790013] -translate-x-1/2" />

      <div className="flex flex-col gap-8 relative">
        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              className="relative flex items-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
              }}
            >
              {/* DOT */}
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#790013] rounded-full" />

              {/* LEFT */}
              {isLeft && (
                <div className="w-1/2 pr-6 text-right flex flex-col items-end gap-1 text-[#790013]">
                  {item.media && <div className="mb-1">{item.media}</div>}

                  <div className="text-3xl sm-title">{item.time}</div>
                  <div className="text-2xl leading-5 sm-title">
                    {item.title}
                  </div>
                  <div className="text-sm">{item.desc}</div>
                </div>
              )}

              {/* RIGHT */}
              {!isLeft && (
                <div className="w-1/2 pl-6 ml-auto text-left flex flex-col items-start gap-1  text-[#790013]">
                  {item.media && <div className="mb-1">{item.media}</div>}

                  <div className="text-3xl sm-title">{item.time}</div>
                  <div className="text-2xl leading-5 sm-title">
                    {item.title}
                  </div>
                  <div className="text-sm">{item.desc}</div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
