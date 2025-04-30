import { AdminDataType, FormDataType, GameResult } from "@/types";
import { signInWithPopup, signOut, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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
    const delegatesQuery = query(
      collection(db, "delegates"),
      where("email", "==", data)
    );

    const querySnapshot = await getDocs(delegatesQuery);

    if (querySnapshot.empty) {
      return { success: false, email: "", discription: "Not Registerd!" };
    }

    const delegateDoc = querySnapshot.docs[0];
    const delegateData = delegateDoc.data();

    const { email, arrived } = delegateData;

    if (arrived) {
      return { success: false, email, discription: "Already Arrived" };
    }

    await updateDoc(doc(db, "delegates", delegateDoc.id), {
      arrived: true,
    });

    return { success: true, email };
  } catch (error) {
    console.error("Error approving QR:", error);
    return { success: false, email: "" };
  }
};

// --------------------------------------------------------------------

export const AdminToggle = async (id: string, isAdmin: boolean) => {
  try {
    const adminDocRef = doc(db, "admins", id);
    await updateDoc(adminDocRef, {
      isAdmin: !isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

// --------------------------------------------------------------------

export const ArrivalConfirmationToggle = async (
  email: string,
  confirmArrival: boolean
) => {
  try {
    const id = await getIdfromEmail(email);

    // console.log("Delegate ID:", id);

    if (id) {
      const delegateDocRef = doc(db, "delegates", id);
      await updateDoc(delegateDocRef, {
        confirmArrival: confirmArrival, // ✅ just set it directly
      });
      console.log("Arrival confirmation updated successfully.");
    } else {
      console.log("No delegate found with this email.");
    }
  } catch (error) {
    console.error("Error updating arrival confirmation:", error);
  }
};

// --------------------------------------------------------------------

export const getIdfromEmail = async (email: string) => {
  try {
    const q = query(
      collection(db, "delegates"), // 👈 your collection name here
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // not found
    }

    // Assuming you want the first matching document's ID
    const docSnap = querySnapshot.docs[0];
    return docSnap.id; // 🔥 Return document ID
  } catch (error) {
    console.error("Error getting ID from email:", error);
    return null;
  }
};

// --------------------------------------------------------------------

export const registerDelegates = async (formData: FormDataType) => {
  try {
    const delegatesQuery = query(
      collection(db, "delegates"),
      where("email", "==", formData.email)
    );

    const querySnapshot = await getDocs(delegatesQuery);

    if (!querySnapshot.empty) {
      return { success: false, error: "User is already registered." };
    }

    const documentRef = doc(collection(db, "delegates"));

    const confirmationUrl = `https://roadtolegacy.team/confirm?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.firstName)}&uni=${encodeURIComponent(formData.university)}`;

    await setDoc(documentRef, {
      ...formData,
      arrived: false,
      confirmArrival: false,
      selected: false,
      createdAt: new Date().toISOString(),
      confirmationUrl,
      confirmationEmailSended: false,
    });

    console.log("Delegate registered successfully.");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error registering delegate:", error);
    return { success: false, error: error.message };
  }
};

// ---------------------------------------------------------

export const sendEmail = async (to: string, subject: string, html: string) => {
  const response = await fetch(
    "https://us-central1-roadtolecacy.cloudfunctions.net/api/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Error sending email:", data);
  } else {
    console.log("Email sent successfully:", data);
  }
};

// ------------------------------------------------------------------------

export const registerTeam = async (teamData: {
  teamName: string;
  leaderEmail: string;
  members: string[];
}) => {
  try {
    const teamRef = doc(db, "teams", teamData.teamName);

    const existingTeam = await getDoc(teamRef);

    if (existingTeam.exists()) {
      return { success: false, message: "Team already registered" };
    }

    await setDoc(teamRef, {
      name: teamData.teamName,
      leaderEmail: teamData.leaderEmail,
      members: teamData.members,
      createdAt: new Date().toISOString(),
    });
    console.log("Team registered with ID: ", teamRef.id);

    return { success: true };
  } catch (e) {
    console.error("Error creating document: ", e);
    return { success: false, message: "Failed to register team" };
  }
};

// ------------------------------------------------------------------------

export const loginTeam = async (loginData: {
  teamName: string;
  email: string;
}) => {
  try {
    const team = await getTeamData(loginData.teamName);
    if (!team) {
      return { success: false, message: "Team not found" };
    }

    if (team.leaderEmail === loginData.email) {
      return { success: true, leader: true };
    } else if (team.members.includes(loginData.email)) {
      return { success: true, leader: false };
    } else {
      return { success: false, message: "You are not a member of this team" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
};

// ------------------------------------------------------------------------

export const getTeamData = async (teamName: string) => {
  try {
    const teamRef = doc(db, "teams", teamName);
    const teamDoc = await getDoc(teamRef);
    if (teamDoc.exists()) {
      return teamDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};

// ------------------------------------------------------------------------

export const setGameResultsApi = async (
  teamName: string,
  result: GameResult[],
  totalTimeTaken: number
) => {
  try {
    const gameResultsRef = doc(db, "teams", teamName);

    console.log("Game Results:", result);
    

    await updateDoc(gameResultsRef, { gameResults: result, totalTimeTaken });
    console.log("Game results updated successfully.");
  } catch (error) {
    console.error("Error updating game results:", error);
  }
};
