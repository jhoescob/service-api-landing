"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataApi = {
  group: "Auth" | "User" | "TimeSlot" | "Reservation";
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  description: string;
};

const data: DataApi[] = [
  {
    group: "Auth",
    endpoint: "/api/auth/register",
    method: "POST",
    description: "Register a new user. Receives username, email, password.",
  },
  {
    group: "Auth",
    endpoint: "/api/auth/login",
    method: "POST",
    description:
      "Log in a user. Receives email, password. Returns a JWT token.",
  },
  {
    group: "Auth",
    endpoint: "/api/auth/logout",
    method: "POST",
    description: "Log out a user. Invalidates the JWT token.",
  },
  {
    group: "User",
    endpoint: "/api/users/me",
    method: "GET",
    description: "Get authenticated user information.",
  },
  {
    group: "TimeSlot",
    endpoint: "/api/timeslots",
    method: "GET",
    description: "Get all available timeslots.",
  },
  {
    group: "TimeSlot",
    endpoint: "/api/timeslots/:id",
    method: "GET",
    description: "Get a specific timeslot.",
  },
  {
    group: "TimeSlot",
    endpoint: "/api/timeslots",
    method: "POST",
    description:
      "Create a new timeslot. Receives date, start_time, end_time, available.",
  },
  {
    group: "TimeSlot",
    endpoint: "/api/timeslots/:id",
    method: "PUT",
    description: "Update an existing timeslot.",
  },
  {
    group: "TimeSlot",
    endpoint: "/api/timeslots/:id",
    method: "DELETE",
    description: "Delete a timeslot.",
  },
  {
    group: "Reservation",
    endpoint: "/api/reservations",
    method: "GET",
    description: "Get all reservations of the authenticated user.",
  },
  {
    group: "Reservation",
    endpoint: "/api/reservations/:id",
    method: "GET",
    description: "Get a specific reservation of the authenticated user.",
  },
  {
    group: "Reservation",
    endpoint: "/api/reservations",
    method: "POST",
    description:
      "Create a new reservation. Receives time_slot_id, number_of_people.",
  },
  {
    group: "Reservation",
    endpoint: "/api/reservations/:id",
    method: "PUT",
    description: "Update an existing reservation.",
  },
  {
    group: "Reservation",
    endpoint: "/api/reservations/:id",
    method: "DELETE",
    description: "Cancel a reservation.",
  },
];

export const columns: ColumnDef<DataApi>[] = [
  {
    accessorKey: "group",
    header: "Group",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("group")}</div>
    ),
  },
  {
    accessorKey: "endpoint",
    header: "Endpoint",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("endpoint")}</div>
    ),
  },
  {
    accessorKey: "method",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="upercase">{row.getValue("method")}</div>,
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter End-point..."
          value={
            (table.getColumn("endpoint")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("endpoint")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
