import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DelegatesTableType, DelegatesType } from "@/types";

export const columns: (
  delegatesData: DelegatesType[],
  toggleArrived: (selectedDelegate: DelegatesType | null) => void
) => ColumnDef<DelegatesTableType>[] = (deldelegatesData, toggleArrived) => [
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
    accessorKey: "arrived",
    header: "Status",
    cell: ({ row }) => {
      const delegateInRow = row.original;

      return (
        <Button
          className="text-white w-[50%] bg-blue-500"
          onClick={() => {
            const selectedDelegate = deldelegatesData.find(
              (admin) => admin.email === delegateInRow.email
            );

            if (!selectedDelegate) {
              console.warn("Admin not found:", delegateInRow.email);
              return;
            }

            // Show a confirmation dialog before toggling
            const confirmToggle = window.confirm(
              `Are you sure you want to mark ${selectedDelegate.email} as ${
                selectedDelegate.arrived ? "not arrived" : "arrived"
              }`
            );

            if (confirmToggle) {
              toggleArrived(selectedDelegate);
            }
          }}
        >
          {delegateInRow.arrived ? "Arrived" : "Not Arrived"}
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
        const selectedDelegate =
          deldelegatesData?.find(
            (delegate) => delegate.email === delegateInRow.email
          ) || null;
        toggleArrived(selectedDelegate);
      }}
    >
      Arrived
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>; */
}
