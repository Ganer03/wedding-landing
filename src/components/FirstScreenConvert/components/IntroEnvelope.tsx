import { motion } from "framer-motion";
import { ConverClose } from "../../../svg/ConvertClose";
import { StampConvert } from "../../../svg/StampConvert";
import type { Stage } from "../../../pages/HomePage";
import { FloatingPhotosBackground } from "../../FloatingPhotosBackground/FloatingPhotosBackground";

interface IntroEnvelopeProps {
  state: Stage;
  onOpen: () => void;
  onFinish: () => void;
}

const childVariants = {
  intro: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },

  opening: {
    y: -300,
    opacity: 0,
    scale: 1.2,
    rotate: -10,
  },
};

export const IntroEnvelope = ({
  state,
  onOpen,
  onFinish,
}: IntroEnvelopeProps) => {
  return (
    <section
      className="fixed inset-0 z-50 mx-auto max-w-[450px] bg-[#fbf5e9]"
      onClick={() => {
        if (state === "intro") {
          onOpen();
        }
      }}
    >
      <FloatingPhotosBackground state={state === "opening"} />
      <div className="relative mx-auto flex flex-col justify-evenly h-full max-w-[450px] overflow-hidden px-4 py-4">
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
            scale: 0.85,
          }}
          variants={childVariants}
          animate={state}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={state === "intro" ? { scale: 1.03 } : undefined}
          whileTap={state === "intro" ? { scale: 0.97 } : undefined}
        >
          <div className="flex flex-col align-center gap-4 text-[#790013]">
            <div className="title text-6xl pr-8 w-fit mx-auto">Тили-Тили</div>
            <div className="title text-6xl pl-16 w-fit mx-auto">Тесто!</div>
          </div>
        </motion.div>
        {/* HEARTS */}
        <div></div>

        {/* HEARTS */}
        <div></div>
        {/* КОНВЕРТ */}
        <div className="flex flex-col gap-6">
          <div className="relative cursor-pointer mx-auto">
            <motion.div
              initial={{
                y: 700,
                opacity: 0,
                scale: 0.85,
              }}
              variants={childVariants}
              animate={state}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={state === "intro" ? { scale: 1.03 } : undefined}
              whileTap={state === "intro" ? { scale: 0.97 } : undefined}
            >
              <ConverClose />
            </motion.div>
            {/* ШТАМП */}
            <motion.div
              className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2"
              variants={childVariants}
              initial={{
                y: 700,
                opacity: 0,
                scale: 0.85,
              }}
              animate={state}
              transition={{
                duration: 0.9,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <StampConvert />
            </motion.div>
          </div>

          {/* ТЕКСТ */}
          <motion.div
            className="mx-auto"
            variants={childVariants}
            initial={{
              y: 700,
              opacity: 0,
              scale: 0.85,
            }}
            animate={state}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              if (state === "opening") {
                onFinish();
              }
            }}
          >
            <p className="text-center text-lg font-light text-[#5d5145]">
              Нажмите чтобы открыть
            </p>
          </motion.div>
        </div>
        <div></div>
      </div>
    </section>
  );
};
