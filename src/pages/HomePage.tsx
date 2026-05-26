import { useState, useEffect } from "react";
import { FirstScreenConvert } from "../components/FirstScreenConvert/FirstScreenConvert";
import { HomePageScroll } from "../widgets/HomePageScroll";

export type Stage = "intro" | "opening" | "page";

export const HomePage = () => {
  const [stage, setStage] = useState<Stage>("intro");

  useEffect(() => {
    document.body.style.overflow = stage === "page" ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [stage]);
  return (
    <>
      <FirstScreenConvert
        stage={stage}
        onOpen={() => setStage("opening")}
        onFinish={() => setStage("page")}
      />
      <HomePageScroll stage={stage} />
    </>
  );
};
