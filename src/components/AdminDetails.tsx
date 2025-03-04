"use client";

import { AdminToggle } from "@/firebase/api";
import { db } from "@/firebase/config";
import { AdminDataType } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./admins-data/Coloumns";
import { DataTable } from "./admins-data/DataTable";
import { Card, CardContent } from "./ui/card";

const AdminDetails = () => {
  const [adminUsers, setAdminUsers] = useState<AdminDataType[]>([]);

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

  const toggleAdmin = async (id: string) => {
    if (!adminUsers) return;

    try {
      const user = adminUsers.find((admin) => admin.id === id);

      if (!user) {
        console.warn(`User with id ${id} not found.`);
        return;
      }

      await AdminToggle(id, user.isAdmin);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  return (
    <div className="mb-20">
      <Card>
        <CardContent>
          {adminUsers && (
            <DataTable
              columns={columns(adminUsers, toggleAdmin)}
              data={adminUsers?.map((admins) => ({
                name: admins.name,
                email: admins.email,
                isAdmin: admins.isAdmin,
              }))}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminDetails;
