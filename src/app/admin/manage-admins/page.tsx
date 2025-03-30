import AdminDetails from "@/components/AdminDetails";

const AdminsPage = () => {
  // const [adminUsers, setAdminUsers] = useState<AdminDataType[]>(mockUsers);

  // useEffect(() => {
  //   const collectionRef = collection(db, "admins");
  //   const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
  //     const usersDataArr = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     })) as AdminDataType[];

  //     setAdminUsers(usersDataArr);
  //   });

  //   return unsubscribe;
  // }, []);

  // const toggleAdmin = (id: string) => {
  //   setAdminUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
  //     )
  //   );
  // };

  return (
    <div className="p-2 sm:p-10 flex flex-col">
      <AdminDetails />
    </div>
  );
};

export default AdminsPage;
