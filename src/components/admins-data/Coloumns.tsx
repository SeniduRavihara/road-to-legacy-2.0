import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminDataType, AdminTableType } from "@/types";

export const columns: (
  adminUsers: AdminDataType[],
  toggleAdmin: (id: string) => void
) => ColumnDef<AdminTableType>[] = (adminUsers, toggleAdmin) => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const adminInRow = row.original; // AdminTableType

      return (
        <Button
          className="text-white w-[50%] bg-blue-500"
          onClick={() => {
            const selectedAdmin = adminUsers.find(
              (admin) => admin.email === adminInRow.email
            );

            if (!selectedAdmin) {
              console.warn("Admin not found:", adminInRow.email);
              return;
            }

            // Show a confirmation dialog before toggling
            const confirmToggle = window.confirm(
              `Are you sure you want to ${
                selectedAdmin.isAdmin ? "remove admin rights from" : "make"
              } ${selectedAdmin.email} an admin?`
            );

            if (confirmToggle) {
              toggleAdmin(selectedAdmin.id);
            }
          }}
        >
          {adminInRow.isAdmin ? "Admin" : "User"}
        </Button>
      );
    },
  },
];

{
  /* <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Open menu</span>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem
      onClick={() => {
        const selectedAdmin =
          adminUsers?.find((admin) => admin.email === AdminInRow.email) || null;

        if (selectedAdmin) toggleAdmin(selectedAdmin?.id);
      }}
    >
      Arrived
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>; */
}
