"use client";

import { db } from "@/firebase/config";
import { AdminDataType } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const mockUsers: AdminDataType[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", isAdmin: true },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    isAdmin: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    isAdmin: true,
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    isAdmin: false,
  },
];

const AdminsPage = () => {
  const [adminUsers, setAdminUsers] = useState<AdminDataType[]>(mockUsers);

  useEffect(() => {
    const collectionRef = collection(db, "admins");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const usersDataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as AdminDataType[];

      setAdminUsers(usersDataArr);
    });

    return unsubscribe;
  }, []);

  const toggleAdmin = (id: string) => {
    setAdminUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admins Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => toggleAdmin(user.id)}
                  className={`px-4 py-2 rounded ${
                    user.isAdmin
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsPage;
