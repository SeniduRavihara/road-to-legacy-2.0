// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventDividerBar = ({ scrollToSection, rtl1Ref, rtl2Ref }: any) => {
  return (
    <div className="w-full absolute bottom-0 bg-green-600 h-[100px] flex gap-10 items-center justify-center">
      <div className="cursor-pointer" onClick={() => scrollToSection(rtl1Ref)}>
        RTL1
      </div>
      <div className="cursor-pointer" onClick={() => scrollToSection(rtl2Ref)}>
        RTL2
      </div>
    </div>
  );
};

export default EventDividerBar;
