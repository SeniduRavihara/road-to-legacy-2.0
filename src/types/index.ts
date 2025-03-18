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
  university: string;
  faculty: string;
  department: string;
  regNumber: string;
  alYear: string;
  contactNumber: string;
  email: string;
  emergencyContact: string;
  mealPreference: string;
  tshirt: string;
  howHeard: string;
  certificateName: string;
  suggestions?: string;
};