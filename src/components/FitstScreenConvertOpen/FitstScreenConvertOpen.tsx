import { motion } from "framer-motion";
import type { Stage } from "../../pages/HomePage";
import { ConvertOpen } from "../../svg/ConvertOpen";
import { useState } from "react";
import { FloatingPhotosBackground } from "../FloatingPhotosBackground/FloatingPhotosBackground";

export const FitstScreenConvertOpen = ({ stage }: { stage: Stage }) => {
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <div className="min-h-screen m-auto w-full relative overflow-hidden">
      <FloatingPhotosBackground state={stage !== "page"} />
      <motion.div
        className="relative min-h-screen flex flex-col justify-evenly h-full px-4 py-4 gap-10"
        animate={{
          opacity: stage === "page" ? 1 : 0,
          y: stage === "page" ? 0 : 60,
          scale: stage === "page" ? 1 : 0.98,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* TITLE */}
        <motion.div
          animate={{
            opacity: stage === "page" ? 1 : 0,
            y: stage === "page" ? 0 : 30,
          }}
          transition={{
            duration: 0.5,
            delay: 0.05,
          }}
        >
          <div className="flex flex-col align-center gap-4 text-[#790013] pt-6">
            <div className="title text-6xl pr-8 w-fit mx-auto">Тили-Тили</div>
            <div className="title text-6xl pl-16 w-fit mx-auto">Тесто!</div>
          </div>
        </motion.div>

        {/* HEARTS */}
        <div></div>

        {/* HEARTS */}
        <div></div>

        {/* CONVERT + IMAGE BLOCK */}
        <motion.div
          animate={{
            opacity: stage === "page" ? 1 : 0,
            y: stage === "page" ? 0 : 80,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          onAnimationComplete={() => {
            if (stage === "page") {
              setShowPhotos(true);
            }
          }}
        >
          <div className="relative">
            {showPhotos && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute w-full h-full -mt-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-evenly title text-5xl text-[#790013]">
                      <div className="-rotate-15">жених</div>
                      <div className="rotate-15">невеста</div>
                    </div>
                    <div className="flex justify-center items-start pb-6 relative">
                      <img
                        src="/ivan1.png"
                        width={150}
                        height={150}
                        className="pt-4"
                        style={{ maxWidth: "110px" }}
                      />

                      <img
                        src="/alina1.png"
                        width={150}
                        height={150}
                        style={{ maxWidth: "110px" }}
                      />
                      <div className="absolute bottom-0 bg-[#790013] max-w-[230px] w-full py-2 px-4 rounded-md">
                        <div className="title text-3xl text-white  text-center">
                          мы женимся!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <ConvertOpen className="m-auto w-full" />
          </div>
        </motion.div>
        {/* ТЕКСТ */}
        <motion.div
          animate={{
            opacity: stage === "page" ? 1 : 0,
            y: stage === "page" ? 0 : 80,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
        >
          <div className="flex flex-col gap-6 text-center ">
            <div className="title text-5xl text-center text-[#790013]">
              Узнали?
            </div>
            <p className="text-lg font-light text-[#5d5145]">
              Да да, это мы!
              <br />
              Время пронеслось незаметно и у этих двух милых деток скоро свадьба
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
