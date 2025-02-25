import { INITIAL_DATA_CONTEXT } from "@/constants";
import { UserDataType, DataContextType } from "@/types";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext<DataContextType>(INITIAL_DATA_CONTEXT);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUserData, setCurrentUserData] = useState<UserDataType | null>(
    null
  );

  console.log(currentUserData);

  const value = {
    currentUserData,
    setCurrentUserData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export default DataContextProvider;
