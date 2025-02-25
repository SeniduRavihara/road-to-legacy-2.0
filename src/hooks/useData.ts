import { DataContext } from "@/context/DataContext";
import { useContext } from "react";

export const useData = () => {
  return useContext(DataContext);
};
