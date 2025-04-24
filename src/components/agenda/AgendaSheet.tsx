// AgendaSheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import Agenda from "./Agenda";

const AgendaSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <button className="text-white bg-[#262930] px-6 py-3 rounded-full shadow-lg text-xl font-bold hover:bg-[#333] transition duration-300 cursor-pointer">
            Full Agenda
          </button>
        </motion.div>
      </SheetTrigger>
      <SheetContent
        className="z-[1000] pr-0 w-[90%] md:w-[80%] lg:w-[90%] bg-[#191b1f] border-l border-[#2c3039] overflow-hidden"
        side="right"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="bg-[#4a7bbd] h-6 w-1 rounded-full"></span>
            Event Schedule
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 h-[calc(100vh-100px)]">
          <Agenda />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AgendaSheet;
