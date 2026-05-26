import { motion } from "framer-motion";

const photos = [
  "/heart/heartnew/serred1-Photoroom.png",
  "/heart/heartnew/serred2-Photoroom.png",
  "/heart/heartnew/serred3-Photoroom.png",
  "/heart/heartnew/serred4-Photoroom.png",
  "/heart/heartnew/serred5-Photoroom.png",
  "/heart/heartnew/serred6-Photoroom.png",
  "/heart/heartnew/serred7-Photoroom.png",
  "/heart/heartnew/serred8-Photoroom.png",
  "/heart/heartnew/serred9-Photoroom.png",

  "/heart/heartnew/serred10-Photoroom.svg",
  "/heart/heartnew/serred11-Photoroom.svg",
  "/heart/heartnew/serred12-Photoroom.svg",
  "/heart/heartnew/serred13-Photoroom.svg",
  "/heart/heartnew/serred14-Photoroom.svg",
];
const animatedIndexes = new Set([0, 3, 7, 10]);

const positions = [
  // TOP
  { top: "1%", left: "-8%", rotate: -20, width: 115 },
  { top: "20%", left: "22%", rotate: 10, width: 95 },
  { top: "2%", right: "-6%", rotate: 18, width: 115 },

  // UPPER
  { top: "16%", left: "-12%", rotate: 12, width: 120 },
  { bottom: "10%", right: "5%", rotate: -8, width: 95 },
  { top: "24%", right: "-10%", rotate: -15, width: 120 },

  // CENTER
  { top: "38%", left: "-10%", rotate: 14, width: 120 },
  { bottom: "-3%", right: "5%", rotate: 12, width: 115 },
  { top: "44%", right: "-12%", rotate: -12, width: 120 },

  // LOWER
  { bottom: "30%", left: "-8%", rotate: -10, width: 120 },
  { top: "25%", right: "20%", rotate: 8, width: 95 },
  { bottom: "28%", right: "-10%", rotate: 14, width: 120 },

  // REAL BOTTOM FILL
  { bottom: "2%", left: "-15%", rotate: -18, width: 130 },
  { top: "35%", left: "40%", rotate: -5, width: 100 },
];

const getY = (i: number, state: boolean) => {
  if (state) return -120;
  if (animatedIndexes.has(i)) return [0, -8, 0];
  return 0;
};

export const FloatingPhotosBackground = ({ state }: { state: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      animate={{
        opacity: state ? 0 : 1,
        scale: state ? 1.15 : 1,
        y: state ? -250 : 0,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {photos.map((src, i) => {
        const pos = positions[i];

        return (
          <motion.img
            key={src}
            src={src}
            loading="lazy"
            draggable={false}
            className="absolute select-none"
            style={{
              opacity: 0.84,
              filter: "blur(0.1px)",
              ...pos,
            }}
            initial={{
              opacity: 0,
              scale: 0.7,
              rotate: pos.rotate - 10,
              y: 30,
            }}
            animate={{
              opacity: state ? 0 : 0.84,
              scale: state ? 0.8 : 1,
              rotate: pos.rotate,

              y: getY(i, state),
            }}
            transition={{
              opacity: {
                duration: 1,
                delay: i * 0.08,
              },

              scale: {
                duration: 1,
                delay: i * 0.08,
              },

              rotate: {
                duration: 1,
                delay: i * 0.08,
              },

              y: {
                repeat: state ? 0 : animatedIndexes.has(i) ? Infinity : 0,
                duration: 5 + i * 0.4,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}
    </motion.div>
  );
};
