"use client"

import { useRef } from "react";
import EventDividerBar from "@/components/events/EventDividerBar";
import RTL1 from "@/components/events/RTL1";
import RTL2 from "@/components/events/RTL2";

const EventsPage = () => {
  const rtl1Ref = useRef(null);
  const rtl2Ref = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full h-full">
      <EventDividerBar
        scrollToSection={scrollToSection}
        rtl1Ref={rtl1Ref}
        rtl2Ref={rtl2Ref}
      />

      <div className="flex overflow-x-auto snap-x snap-mandatory">
        <div
          ref={rtl1Ref}
          className="w-screen h-screen flex-shrink-0 snap-center"
        >
          <RTL1 />
        </div>
        <div
          ref={rtl2Ref}
          className="w-screen h-screen flex-shrink-0 snap-center"
        >
          <RTL2 />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
