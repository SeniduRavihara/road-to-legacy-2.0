import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Agenda from "./Agenda";

const AgendaSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        className="z-[1000] w-[90%] md:w-[80%] lg:w-[90%] bg-[#191b1f]"

      >
        <SheetHeader className="hidden">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-3 ">
          <Agenda />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default AgendaSheet;
