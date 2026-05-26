import { Calendar } from "../components/Calendar/Calendar";
import { FitstScreenConvertOpen } from "../components/FitstScreenConvertOpen/FitstScreenConvertOpen";
import { LocationGallery } from "../components/LocationGallery/LocationGallery";
import { PhotoLoveGrid } from "../components/PhotoLoveGrid/PhotoLoveGrid";
import { TimelineSection } from "../components/TimelineSection/TimelineSection";
import type { Stage } from "../pages/HomePage";
import RsvpForm from "./RsvpForm/RsvpForm";

export const HomePageScroll = ({ stage }: { stage: Stage }) => {
  return (
    <>
      <main>
        <div
          className={
            stage === "page"
              ? "relative"
              : "fixed inset-0 invisible pointer-events-none"
          }
        >
          <FitstScreenConvertOpen stage={stage} />
          <PhotoLoveGrid />
          <Calendar />
          <LocationGallery />
          <TimelineSection />
          <RsvpForm />
        </div>
      </main>
    </>
  );
};
