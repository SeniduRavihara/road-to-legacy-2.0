import { User } from "firebase/auth";

export type DataContextType = {
  currentUserData: AdminDataType | null;
  setCurrentUserData: React.Dispatch<
    React.SetStateAction<AdminDataType | null>
  >;
};

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type DelegatesType = {
  id: string;
  name: string;
  email: string;
  arrived: boolean;
  role?: "ADMIN" | "USER";
};

export type DelegatesTableType = {
  name: string;
  email: string;
  arrived: boolean
};

export type AdminDataType = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export type AdminTableType = {
  name: string;
  email: string;
  isAdmin: boolean
};

export type FormDataType = {
  firstName: string;
  lastName: string;
  certificateName: string;
  nic: string;
  university: string;
  faculty: string;
  department: string;
  universityRegNo: string;
  alYear: string;
  contactNumber: string;
  email: string;
  emergencyContact: string;
  mealPreference: string;
  tShirt: boolean;
  hearAbout: string;
  hearAboutOther: string;
  suggestions: string;
};