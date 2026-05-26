import { AnimatePresence } from "framer-motion";

import { IntroEnvelope } from "./components/IntroEnvelope";
import type { Stage } from "../../pages/HomePage";

interface IntroEnvelopeProps {
  stage: Stage;
  onOpen: () => void;
  onFinish: () => void;
}

export const FirstScreenConvert = ({
  stage,
  onOpen,
  onFinish,
}: IntroEnvelopeProps) => {
  return (
    <AnimatePresence>
      {stage !== "page" && (
        <IntroEnvelope state={stage} onOpen={onOpen} onFinish={onFinish} />
      )}
    </AnimatePresence>
  );
};
