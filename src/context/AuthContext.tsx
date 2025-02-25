import { INITIAL_AUTH_CONTEXT } from "@/constants";
import { featchCurrentUserData } from "@/firebase/api";
import { auth} from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { AuthContextType } from "@/types";
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(INITIAL_AUTH_CONTEXT);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { setCurrentUserData } = useData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Auth state is changed: LoggedOut");
        return;
      }

      const userData = await featchCurrentUserData(user);
      setCurrentUserData(userData);

      setCurrentUser(user);

      const accessToken = await user.getIdToken();

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Auth state is changed: loggedIn");
    });

    return unsubscribe;
  }, [setCurrentUserData]);

  // useEffect(() => {
  //   if (currentUser) {
  //     const documentRef = doc(db, "users", currentUser.uid);

  //     const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
  //       if (documentSnapshot.exists()) {
  //         const userData = documentSnapshot.data() as CurrentUserDataType;
  //         setCurrentUserData(userData);
  //         console.log("Current user data fetched successfully");
  //       } else {
  //         setCurrentUserData(null);
  //         console.log("Document does not exist.");
  //       }
  //     });
  //     return unsubscribe;
  //   } else {
  //     setCurrentUserData(null);
  //     console.log("currentUser is not available.");
  //   }
  // }, [currentUser, setCurrentUserData]);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
