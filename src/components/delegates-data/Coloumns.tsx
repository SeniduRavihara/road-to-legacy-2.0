import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DelegatesTableType, DelegatesType } from "@/types";

export const columns: (
  delegatesData: DelegatesType[],
  toggleArrived: (selectedDelegate: DelegatesType | null) => void,
  toggleSelect: (selectedDelegate: DelegatesType | null) => void,
  sendConfirmationEmail: (selectedDelegate: DelegatesType | null) => void,
  emailSendding: boolean
) => ColumnDef<DelegatesTableType>[] = (
  delegatesData,
  toggleArrived,
  toggleSelect,
  sendConfirmationEmail,
  emailSendding
) => [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
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
            const selectedDelegate = delegatesData.find(
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
  {
    accessorKey: "selected",
    header: "Selected Status",
    cell: ({ row }) => {
      const delegateInRow = row.original;

      return (
        <Button
          className="text-white w-[50%] bg-blue-500"
          onClick={() => {
            const selectedDelegate = delegatesData.find(
              (deligate) => deligate.email === delegateInRow.email
            );

            if (!selectedDelegate) {
              console.warn("Deligate not found:", delegateInRow.email);
              return;
            }

            // Show a confirmation dialog before toggling
            const confirmToggle = window.confirm(
              `Are you sure you want to mark ${selectedDelegate.email} as ${
                selectedDelegate.selected ? "not Selected" : "Selected"
              }`
            );

            if (confirmToggle) {
              toggleSelect(selectedDelegate);
            }
          }}
        >
          {delegateInRow.selected ? "Selected" : "Not Selected"}
        </Button>
      );
    },
  },
  {
    accessorKey: "sendEmail",
    header: "Send Email",
    cell: ({ row }) => {
      const delegateInRow = row.original;

      return (
        <Button
          className="text-white w-[50%] bg-green-500"
          onClick={async () => {
            const selectedDelegate = delegatesData.find(
              (delegate) => delegate.email === delegateInRow.email
            );

            if (!selectedDelegate) {
              console.warn("Delegate not found:", delegateInRow.email);
              return;
            }

            if (!selectedDelegate.selected) {
              alert(
                `${selectedDelegate.email} is not selected. Please select the delegate first.`
              );
              return;
            }

            if (selectedDelegate.confirmationEmailSended) {
              alert(
                `${selectedDelegate.email} has already been sent the confirmation email.`
              );
              return;
            }

            const confirmSend = window.confirm(
              `Are you sure you want to send a confirmation email to ${selectedDelegate.email}?`
            );

            if (confirmSend) {
              try {
                await sendConfirmationEmail(selectedDelegate); // Now awaits a Promise
                alert("Confirmation email sent successfully!");
              } catch (error) {
                console.error("Error sending confirmation email:", error);
                alert(
                  "There was an error sending the email. Please try again later."
                );
              }
            }
          }}
        >
          {emailSendding ? (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Sending...</span>
            </div>
          ) : (
            "Send Email"
          )}
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
          delegatesData?.find(
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
