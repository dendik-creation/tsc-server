"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  DatabaseZapIcon,
  Layers3Icon,
  SearchIcon,
  SearchXIcon,
} from "lucide-react";
import * as React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchParam,
  searchDisplay,
  fetching,
  moreAction,
  rowActions,
}: DataTableProps<TData, TValue> & {
  searchParam: string;
  searchDisplay: string;
  fetching: boolean;
  moreAction: React.ReactNode;
  rowActions?: (data: TData) => React.ReactNode;
}) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (rowActions ? rowActions(row.original) : null),
      },
    ],
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col lg:gap-0 gap-3 items-start lg:items-center justify-between py-4">
        <div className="flex-1 relative lg:max-w-sm w-full">
          <Input
            placeholder={`Cari berdasarkan ${searchDisplay}`}
            value={
              (table.getColumn(searchParam)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchParam)?.setFilterValue(event.target.value)
            }
            className="lg:max-w-sm w-full"
          />
          <SearchIcon className="absolute w-4 right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        {moreAction}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="bg-lime-100 font-semibold">
                  {fetching ? <Skeleton className="h-4 w-full" /> : "#"}
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    header.id !== "id" && (
                      <TableHead
                        className="bg-lime-100 font-semibold"
                        key={header.id}
                      >
                        {fetching ? (
                          <Skeleton className="h-4 w-full" />
                        ) : header.isPlaceholder ? null : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </TableHead>
                    )
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {fetching ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: columns.length + 1 }, (_, i) => (
                    <TableCell key={i}>
                      <Skeleton className="h-6" key={i} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell>{row.index + 1}</TableCell>
                  {row
                    .getVisibleCells()
                    .map(
                      (cell) =>
                        cell.column.id !== "id" && (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                    )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  <div className="w-full flex flex-col items-center justify-center h-full gap-2">
                    <SearchXIcon width={64} className="text-red-400" />
                    <span>Tidak ada data</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {!fetching && table.getRowCount() > 0 && (
          <div className="flex-1 flex gap-6 text-sm text-muted-foreground">
            <div className="mb-1 flex justify-start items-center gap-2">
              <Layers3Icon width={16} />
              <span>
                Page {table.getState().pagination.pageIndex + 1} {"/ "}
                {table.getPageCount()}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <DatabaseZapIcon width={16} />
              <span>{table.getRowCount()} Baris Data</span>
            </div>
          </div>
        )}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
