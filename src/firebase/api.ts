import { AdminDataType } from "@/types";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, provider } from "./config";

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ------------------------------------------------------------------

export const googleSignIn = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    console.log(userCredential);

    const user = userCredential.user;
    const userDocRef = doc(db, "admins", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const payload = {
        id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        isAdmin: false,
      };

      await setDoc(userDocRef, payload);
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ------------------------------------------------------------

export const getIsAdmin = async (uid: string) => {
  const documentRef = doc(db, "admins", uid);
  const userData = await getDoc(documentRef);

  return userData?.data()?.isAdmin;
};

// ---------------------------------------------------------------

export const featchCurrentUserData = async (currentUser: User) => {
  try {
    const documentRef = doc(db, "admins", currentUser.uid);
    const userDataDoc = await getDoc(documentRef);

    if (userDataDoc.exists()) {
      const userData = userDataDoc.data() as AdminDataType;
      console.log("Current user data fetched successfully");
      return userData;
    } else {
      console.log("Document does not exist.");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ----------------------------------------------------------------

export const isAlreadyRegistered = async (uid: string) => {
  try {
    const documentRef = doc(db, "delegates", uid);
    const document = await getDoc(documentRef);

    return document.exists();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ----------------------------------------------------------------

export const approveQr = async (
  data: string
): Promise<{ success: boolean; email: string; discription?: string }> => {
 try {
   const delegatesRef = collection(db, "delegates");
   const q = query(delegatesRef, where("email", "==", data));
   const querySnapshot = await getDocs(q);

   if (querySnapshot.empty) {
     return { success: false, email: "", discription: "Not Registerd!" };
   }

   const delegateDoc = querySnapshot.docs[0];
   const delegateData = delegateDoc.data();
   const { email, haveArrived } = delegateData;

   if (haveArrived) {
     return { success: false, email, discription: "Already Arrived" };
   }

   await updateDoc(doc(db, "delegates", delegateDoc.id), { haveArrived: true });

   return { success: true, email };
 } catch (error) {
   console.error("Error approving QR:", error);
   return { success: false, email: "" };
 }
};
